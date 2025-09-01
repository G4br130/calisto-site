import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail, type ContactFormData } from '@/lib/mail'
import { validateEmail, validatePhone } from '@/lib/utils'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido').refine(validateEmail, 'Formato de email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos').refine(validatePhone, 'Formato de telefone inválido'),
  company: z.string().max(100, 'Nome da empresa muito longo').optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000, 'Mensagem muito longa'),
  acceptLgpd: z.boolean().refine(val => val === true, 'Você deve aceitar os termos da LGPD'),
})

// Rate limiting (simple in-memory store - in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5 // max 5 requests per window

function getRateLimitKey(request: NextRequest): string {
  // Use IP address and user agent for rate limiting
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  return `${ip}-${userAgent.slice(0, 50)}`
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    // Create new record or reset expired record
    const newRecord = { count: 1, resetTime: now + RATE_LIMIT_WINDOW }
    rateLimitStore.set(key, newRecord)
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime: newRecord.resetTime }
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  record.count++
  rateLimitStore.set(key, record)
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count, resetTime: record.resetTime }
}

// Clean up expired rate limit records periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of Array.from(rateLimitStore.entries())) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000) // Clean every 5 minutes

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    const rateLimit = checkRateLimit(rateLimitKey)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Muitas tentativas. Tente novamente em alguns minutos.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(rateLimit.resetTime / 1000).toString(),
          }
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    
    // Validate data
    const validatedData = contactSchema.parse(body)

    // Additional security checks
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /\[url\]/i,
      /\[link\]/i,
      /viagra|cialis|pharmacy/i,
      /crypto|bitcoin|investment/i
    ]

    const textToCheck = `${validatedData.name} ${validatedData.email} ${validatedData.message} ${validatedData.company || ''}`
    
    if (suspiciousPatterns.some(pattern => pattern.test(textToCheck))) {
      console.warn('Suspicious content detected:', { 
        ip: getRateLimitKey(request),
        data: validatedData 
      })
      
      return NextResponse.json(
        { error: 'Conteúdo suspeito detectado. Entre em contato diretamente conosco.' },
        { status: 400 }
      )
    }

    // Prepare data for email
    const contactData: ContactFormData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      phone: validatedData.phone.trim(),
      company: validatedData.company?.trim(),
      message: validatedData.message.trim(),
      acceptLgpd: validatedData.acceptLgpd
    }

    // Send email
    await sendContactEmail(contactData)

    // Log successful contact (without sensitive data)
    console.log('Contact form submitted successfully:', {
      name: contactData.name,
      email: contactData.email.replace(/(.{2}).*(@.*)/, '$1***$2'),
      hasCompany: !!contactData.company,
      messageLength: contactData.message.length,
      timestamp: new Date().toISOString(),
      ip: getRateLimitKey(request).split('-')[0]
    })

    return NextResponse.json(
      { 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        success: true
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': Math.ceil(rateLimit.resetTime / 1000).toString(),
        }
      }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      // Don't expose internal errors to client
      if (error.message.includes('Failed to send email')) {
        return NextResponse.json(
          { error: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente conosco.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  )
}
