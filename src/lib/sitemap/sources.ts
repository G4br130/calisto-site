import { services, additionalServices, type Service } from '@/content/services'

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

/**
 * Retorna a URL base do site baseada nas variáveis de ambiente
 */
export function getBaseUrl(): string {
  // Prioriza SITE_URL, depois NEXT_PUBLIC_SITE_URL, depois VERCEL_URL
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL
  
  if (siteUrl) {
    return siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl
  }

  // Em produção na Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Fallback para desenvolvimento
  return 'http://localhost:3010'
}

/**
 * Coleta todas as rotas estáticas do site
 */
export async function getStaticRoutes(): Promise<SitemapUrl[]> {
  const baseUrl = getBaseUrl()
  const now = new Date()

  const staticRoutes: SitemapUrl[] = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Se houver i18n configurado, adicione as variantes de idioma aqui
  // Exemplo para português e inglês:
  // const languages = ['pt', 'en']
  // staticRoutes.forEach(route => {
  //   route.alternates = languages.map(lang => ({
  //     hreflang: lang,
  //     href: lang === 'pt' ? route.url : `${route.url}/${lang}`
  //   }))
  // })

  return staticRoutes
}

/**
 * Coleta rotas dinâmicas do site (serviços individuais, posts do blog, etc.)
 */
export async function getDynamicRoutes(): Promise<SitemapUrl[]> {
  const baseUrl = getBaseUrl()
  const now = new Date()
  const dynamicRoutes: SitemapUrl[] = []

  try {
    // Rotas de serviços individuais
    const allServices = [...services, ...additionalServices]
    
    for (const service of allServices) {
      dynamicRoutes.push({
        url: `${baseUrl}/servicos/${service.id}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        // Exemplo de imagem para o serviço (se houver)
        // images: [{
        //   url: `${baseUrl}/images/services/${service.id}.jpg`,
        //   title: service.title,
        //   caption: service.subtitle
        // }]
      })
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

    // Exemplo para buscar de API externa:
    // try {
    //   const response = await fetch(`${baseUrl}/api/sitemap-data`, {
    //     headers: { 'Authorization': `Bearer ${process.env.API_SECRET}` }
    //   })
    //   if (response.ok) {
    //     const apiData = await response.json()
    //     dynamicRoutes.push(...apiData.urls)
    //   }
    // } catch (error) {
    //   console.warn('Erro ao buscar dados dinâmicos da API:', error)
    // }

  } catch (error) {
    console.error('Erro ao gerar rotas dinâmicas:', error)
    // Em produção, não deixe o sitemap quebrar por erro em dados dinâmicos
    // Continue com as rotas que conseguiu coletar
  }

  return dynamicRoutes
}

/**
 * Função principal que coleta todas as URLs do sitemap
 */
export async function getAllUrls(): Promise<SitemapUrl[]> {
  try {
    const [staticUrls, dynamicUrls] = await Promise.all([
      getStaticRoutes(),
      getDynamicRoutes(),
    ])

    const allUrls = [...staticUrls, ...dynamicUrls]

    // Log para desenvolvimento (removido em produção)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Sitemap] Geradas ${allUrls.length} URLs:`)
      console.log('- Estáticas:', staticUrls.length)
      console.log('- Dinâmicas:', dynamicUrls.length)
      console.log('Exemplos:', allUrls.slice(0, 3).map(u => u.url))
    }

    return allUrls
  } catch (error) {
    console.error('Erro ao coletar URLs do sitemap:', error)
    // Em caso de erro, retorna pelo menos as rotas estáticas
    return await getStaticRoutes()
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
