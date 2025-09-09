import { NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/sitemap/sources'

export async function GET() {
  try {
    const baseUrl = getBaseUrl()
    
    // Detecta se deve bloquear indexação conforme Google guidelines
    // Evita erro: "Sitemap blocked by robots.txt"
    const shouldDisallowIndex = 
      process.env.DISALLOW_INDEX === 'true' ||
      process.env.VERCEL_ENV === 'preview' ||
      (process.env.NODE_ENV === 'development' && !process.env.ALLOW_DEV_INDEXING)

    let robotsContent = ''

    if (shouldDisallowIndex) {
      // Bloqueia indexação do site mas permite acesso aos sitemaps
      robotsContent = `User-agent: *
Disallow: /

# Permitir acesso aos sitemaps mesmo com indexação bloqueada
Allow: /sitemap*.xml
Allow: /robots.txt

# Sitemap sempre acessível para motores de busca
Sitemap: ${baseUrl}/sitemap.xml`
    } else {
      // Configuração padrão para produção
      robotsContent = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /_vercel/

# Regras específicas para Googlebot
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Regras específicas para Bingbot
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Sitemap principal
Sitemap: ${baseUrl}/sitemap.xml

# Host canônico (ajuda com domínios múltiplos)
Host: ${baseUrl.replace(/^https?:\/\//, '')}`
    }

    return new NextResponse(robotsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 horas
        'X-Robots-Tag': 'noindex', // robots.txt não deve ser indexado
      },
    })

  } catch (error) {
    console.error('[Robots.txt] Erro na geração:', error)
    
    // Fallback seguro em caso de erro
    const fallbackContent = `User-agent: *
Disallow: /

# Fallback em caso de erro na configuração
Sitemap: https://www.calistoai.com.br/sitemap.xml`

    return new NextResponse(fallbackContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Robots-Tag': 'noindex',
      },
    })
  }
}
