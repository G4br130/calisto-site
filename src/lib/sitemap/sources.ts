import { services, additionalServices, type Service } from '@/content/services'
import { normalizeUrl, validateAbsoluteUrl, createSitemapLogger } from './utils'

export interface SitemapUrl {
  url: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternates?: Array<{
    hreflang: string
    href: string
  }>
  images?: Array<{
    url: string
    title?: string
    caption?: string
  }>
  videos?: Array<{
    url: string
    title?: string
    description?: string
    thumbnailUrl?: string
  }>
}

const logger = createSitemapLogger('sources')

/**
 * Retorna a URL base do site baseada nas variáveis de ambiente
 * Garante URLs absolutas conforme especificação Google
 * Evita erros: "URL not allowed", "Path mismatch", "Invalid URL"
 */
export function getBaseUrl(): string {
  // Prioriza SITE_URL, depois NEXT_PUBLIC_SITE_URL, depois VERCEL_URL
  let siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL
  
  if (siteUrl) {
    // Remove barra final
    siteUrl = siteUrl.replace(/\/+$/, '')
    
    // Valida se é URL absoluta válida
    if (!validateAbsoluteUrl(siteUrl)) {
      logger.error('SITE_URL inválida configurada', { siteUrl })
      throw new Error(`URL base inválida: ${siteUrl}`)
    }
    
    return siteUrl
  }

  // Em produção na Vercel
  if (process.env.VERCEL_URL) {
    const vercelUrl = `https://${process.env.VERCEL_URL}`
    
    if (!validateAbsoluteUrl(vercelUrl)) {
      logger.error('VERCEL_URL inválida', { vercelUrl })
      throw new Error(`URL da Vercel inválida: ${vercelUrl}`)
    }
    
    return vercelUrl
  }

  // Fallback para desenvolvimento (apenas se permitido)
  const devUrl = 'http://localhost:3010'
  
  if (process.env.NODE_ENV === 'production') {
    logger.error('URL base não configurada em produção')
    throw new Error('SITE_URL deve ser configurada em produção')
  }
  
  logger.warn('Usando URL de desenvolvimento', { devUrl })
  return devUrl
}

/**
 * Coleta todas as rotas estáticas do site garantindo URLs absolutas
 * Evita erros: "URL not allowed", "Path mismatch", "Invalid URL"
 */
export async function getStaticRoutes(): Promise<SitemapUrl[]> {
  const baseUrl = getBaseUrl()
  const now = new Date()

  // Definição das rotas estáticas com paths relativos
  const routePaths = [
    { path: '/', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/servicos', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/sobre', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/contato', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacidade', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const staticRoutes: SitemapUrl[] = []

  for (const route of routePaths) {
    try {
      // Normaliza URL garantindo formato absoluto e consistência de domínio
      const normalizedUrl = normalizeUrl(baseUrl, route.path)
      
      staticRoutes.push({
        url: normalizedUrl,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
      
    } catch (error) {
      logger.error('Erro ao normalizar rota estática', { path: route.path, error })
      // Continua processamento sem interromper por uma URL problemática
    }
  }

  // Se houver i18n configurado, adicione as variantes de idioma aqui
  // Exemplo para português e inglês:
  // const languages = ['pt', 'en']
  // staticRoutes.forEach(route => {
  //   const alternates = languages.map(lang => {
  //     const href = lang === 'pt' ? route.url : normalizeUrl(baseUrl, `/${lang}${new URL(route.url).pathname}`)
  //     return {
  //       hreflang: lang,
  //       href
  //     }
  //   })
  //   route.alternates = alternates
  // })

  logger.info(`Coletadas ${staticRoutes.length} rotas estáticas`)
  return staticRoutes
}

/**
 * Coleta rotas dinâmicas do site garantindo URLs absolutas e válidas
 * Evita erros: "URL not allowed", "Path mismatch", "Invalid URL", "URLs not followed"
 */
export async function getDynamicRoutes(): Promise<SitemapUrl[]> {
  const baseUrl = getBaseUrl()
  const now = new Date()
  const dynamicRoutes: SitemapUrl[] = []

  try {
    // Rotas de serviços individuais
    const allServices = [...services, ...additionalServices]
    
    for (const service of allServices) {
      try {
        // Normaliza URL do serviço garantindo consistência
        const serviceUrl = normalizeUrl(baseUrl, `/servicos/${service.id}`)
        
        dynamicRoutes.push({
          url: serviceUrl,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
          // Exemplo de imagem para o serviço (se houver)
          // images: [{
          //   url: normalizeUrl(baseUrl, `/images/services/${service.id}.jpg`),
          //   title: service.title,
          //   caption: service.subtitle
          // }]
        })
      } catch (error) {
        logger.error('Erro ao processar serviço', { serviceId: service.id, error })
      }
    }

    // ========================================
    // CONECTE SUAS FONTES REAIS DE DADOS AQUI
    // ========================================
    
    // Exemplo para posts de blog (descomente e adapte quando tiver blog):
    // const blogPosts = await fetchBlogPosts() // Sua função para buscar posts
    // for (const post of blogPosts) {
    //   dynamicRoutes.push({
    //     url: `${baseUrl}/blog/${post.slug}`,
    //     lastModified: new Date(post.updatedAt),
    //     changeFrequency: 'monthly',
    //     priority: 0.5,
    //     images: post.featuredImage ? [{
    //       url: post.featuredImage.url,
    //       title: post.title,
    //       caption: post.excerpt
    //     }] : undefined
    //   })
    // }

    // Exemplo para produtos (descomente e adapte se tiver e-commerce):
    // const products = await fetchProducts() // Sua função para buscar produtos
    // for (const product of products) {
    //   dynamicRoutes.push({
    //     url: `${baseUrl}/produtos/${product.id}`,
    //     lastModified: new Date(product.updatedAt),
    //     changeFrequency: 'weekly',
    //     priority: 0.7,
    //     images: product.images?.map(img => ({
    //       url: img.url,
    //       title: product.name,
    //       caption: img.alt
    //     }))
    //   })
    // }

    // Exemplo para buscar de API externa com URLs absolutas:
    // try {
    //   const response = await fetch(`${baseUrl}/api/sitemap-data`, {
    //     headers: { 'Authorization': `Bearer ${process.env.API_SECRET}` },
    //     // Timeout para evitar travamento
    //     signal: AbortSignal.timeout(10000)
    //   })
    //   
    //   if (response.ok) {
    //     const apiData = await response.json()
    //     
    //     for (const item of apiData.urls) {
    //       try {
    //         // Sempre normalizar URLs vindas de APIs externas
    //         const normalizedUrl = normalizeUrl(baseUrl, item.path)
    //         
    //         dynamicRoutes.push({
    //           url: normalizedUrl,
    //           lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
    //           changeFrequency: item.changeFreq || 'monthly',
    //           priority: item.priority || 0.5,
    //           // Normalizar URLs de imagens também
    //           images: item.images?.map(img => ({
    //             url: normalizeUrl(baseUrl, img.path),
    //             title: img.title,
    //             caption: img.caption
    //           }))
    //         })
    //       } catch (urlError) {
    //         logger.warn('URL da API ignorada por ser inválida', { item, error: urlError })
    //       }
    //     }
    //   }
    // } catch (error) {
    //   logger.warn('Erro ao buscar dados dinâmicos da API', error)
    //   // Não interrompe o processo por erro de API externa
    // }

  } catch (error) {
    logger.error('Erro ao gerar rotas dinâmicas', error)
    // Em produção, não deixe o sitemap quebrar por erro em dados dinâmicos
    // Continue com as rotas que conseguiu coletar
  }

  logger.info(`Coletadas ${dynamicRoutes.length} rotas dinâmicas`)
  return dynamicRoutes
}

/**
 * Função principal que coleta todas as URLs do sitemap com validação completa
 * Evita erros: "URL not allowed", "Path mismatch", "Invalid URL"
 */
export async function getAllUrls(): Promise<SitemapUrl[]> {
  const baseUrl = getBaseUrl()
  
  try {
    const [staticUrls, dynamicUrls] = await Promise.all([
      getStaticRoutes(),
      getDynamicRoutes(),
    ])

    let allUrls = [...staticUrls, ...dynamicUrls]

    // Remove URLs duplicadas (comparação por URL)
    const urlSet = new Set<string>()
    const uniqueUrls: SitemapUrl[] = []
    
    for (const url of allUrls) {
      if (!urlSet.has(url.url)) {
        urlSet.add(url.url)
        uniqueUrls.push(url)
      } else {
        logger.warn('URL duplicada removida', { url: url.url })
      }
    }

    allUrls = uniqueUrls

    // Validação final de todas as URLs
    const validUrls: SitemapUrl[] = []
    
    for (const url of allUrls) {
      // Valida se URL é absoluta
      if (!validateAbsoluteUrl(url.url)) {
        logger.error('URL inválida removida', { url: url.url })
        continue
      }

      // Valida consistência de domínio
      try {
        const urlObj = new URL(url.url)
        const baseUrlObj = new URL(baseUrl)
        
        if (
          urlObj.protocol !== baseUrlObj.protocol ||
          urlObj.hostname !== baseUrlObj.hostname ||
          urlObj.port !== baseUrlObj.port
        ) {
          logger.error('URL com domínio inconsistente removida', { 
            url: url.url, 
            expected: baseUrl 
          })
          continue
        }
        
        validUrls.push(url)
        
      } catch (error) {
        logger.error('URL malformada removida', { url: url.url, error })
      }
    }

    // Log detalhado para desenvolvimento
    logger.info('URLs coletadas e validadas', {
      total: validUrls.length,
      static: staticUrls.length,
      dynamic: dynamicUrls.length,
      duplicatesRemoved: allUrls.length - validUrls.length,
      examples: validUrls.slice(0, 3).map(u => u.url)
    })

    if (validUrls.length === 0) {
      logger.error('Nenhuma URL válida coletada')
      throw new Error('Nenhuma URL válida foi coletada para o sitemap')
    }

    return validUrls
    
  } catch (error) {
    logger.error('Erro crítico ao coletar URLs', error)
    
    // Em caso de erro crítico, tenta pelo menos as rotas estáticas
    try {
      const fallbackUrls = await getStaticRoutes()
      logger.warn('Usando apenas rotas estáticas como fallback', { count: fallbackUrls.length })
      return fallbackUrls
    } catch (fallbackError) {
      logger.error('Falha total na coleta de URLs', fallbackError)
      throw new Error('Não foi possível coletar nenhuma URL para o sitemap')
    }
  }
}

/**
 * Função para buscar dados de uma API externa (exemplo)
 * Adapte conforme sua necessidade
 */
async function fetchFromApi<T>(endpoint: string): Promise<T[]> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_SECRET || ''}`,
        'Content-Type': 'application/json',
      },
      // Cache por 5 minutos em desenvolvimento, 1 hora em produção
      next: { 
        revalidate: process.env.NODE_ENV === 'development' ? 300 : 3600 
      }
    })

    if (!response.ok) {
      throw new Error(`API retornou ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.warn(`Erro ao buscar ${endpoint}:`, error)
    return []
  }
}
