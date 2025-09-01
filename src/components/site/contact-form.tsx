'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  company: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  acceptLgpd: z.boolean().refine(val => val === true, 'Você deve aceitar os termos da LGPD'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const acceptLgpd = watch('acceptLgpd')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.')
        reset()
      } else {
        throw new Error(result.error || 'Erro ao enviar mensagem')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(
        error instanceof Error 
          ? error.message 
          : 'Erro ao enviar mensagem. Tente novamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return value
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">Entre em Contato</CardTitle>
        <p className="text-muted-foreground">
          Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Seu nome completo"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="seu@email.com"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone/WhatsApp *</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="(99) 99999-9999"
              onChange={(e) => {
                const formatted = formatPhone(e.target.value)
                e.target.value = formatted
                setValue('phone', formatted)
              }}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-destructive flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Empresa */}
          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              {...register('company')}
              placeholder="Nome da sua empresa (opcional)"
            />
          </div>

          {/* Mensagem */}
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem *</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Conte-nos sobre seu projeto ou necessidade..."
              rows={5}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && (
              <p className="text-sm text-destructive flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message.message}
              </p>
            )}
          </div>

          {/* LGPD Checkbox */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="acceptLgpd"
                checked={acceptLgpd}
                onCheckedChange={(checked) => setValue('acceptLgpd', !!checked)}
                className={errors.acceptLgpd ? 'border-destructive' : ''}
              />
              <Label 
                htmlFor="acceptLgpd" 
                className="text-sm leading-relaxed cursor-pointer"
              >
                Aceito que meus dados sejam utilizados conforme a{' '}
                <a 
                  href="/privacidade" 
                  className="text-brand hover:underline"
                  target="_blank"
                >
                  Política de Privacidade
                </a>{' '}
                e autorizo o contato para fins comerciais. *
              </Label>
            </div>
            {errors.acceptLgpd && (
              <p className="text-sm text-destructive flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.acceptLgpd.message}
              </p>
            )}
          </div>

          {/* Submit Status */}
          {submitStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg flex items-center ${
                submitStatus === 'success'
                  ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
                  : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
              }`}
            >
              {submitStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              )}
              <p className="text-sm">{submitMessage}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="brand"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Campos obrigatórios
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
