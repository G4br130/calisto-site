import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/sitemap/sources'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()
  
  // Detecta se deve bloquear indexação (ambientes de preview/desenvolvimento)
  const shouldDisallowIndex = 
    process.env.DISALLOW_INDEX === 'true' ||
    process.env.VERCEL_ENV === 'preview' ||
    (process.env.NODE_ENV === 'development' && !process.env.ALLOW_DEV_INDEXING)

  if (shouldDisallowIndex) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/_vercel/',
          '/sitemap*.xml', // Evita indexar os próprios sitemaps
        ],
      },
      // Regras específicas para bots de SEO
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
