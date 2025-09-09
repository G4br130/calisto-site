import type { SitemapUrl } from './sources'

export interface SitemapChunk {
  urls: SitemapUrl[]
  index: number
}

/**
 * Constrói uma entrada XML para uma URL do sitemap
 */
export function buildUrlEntry(sitemapUrl: SitemapUrl): string {
  const { url, lastModified, changeFrequency, priority, alternates, images, videos } = sitemapUrl

  let entry = `  <url>\n`
  entry += `    <loc>${escapeXml(url)}</loc>\n`

  if (lastModified) {
    entry += `    <lastmod>${lastModified.toISOString()}</lastmod>\n`
  }

  if (changeFrequency) {
    entry += `    <changefreq>${changeFrequency}</changefreq>\n`
  }

  if (priority !== undefined) {
    entry += `    <priority>${priority.toFixed(1)}</priority>\n`
  }

  // Alternativas de idioma (hreflang)
  if (alternates && alternates.length > 0) {
    alternates.forEach(alt => {
      entry += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}" />\n`
    })
  }

  // Imagens (se houver)
  if (images && images.length > 0) {
    images.forEach(img => {
      entry += `    <image:image>\n`
      entry += `      <image:loc>${escapeXml(img.url)}</image:loc>\n`
      if (img.title) {
        entry += `      <image:title>${escapeXml(img.title)}</image:title>\n`
      }
      if (img.caption) {
        entry += `      <image:caption>${escapeXml(img.caption)}</image:caption>\n`
      }
      entry += `    </image:image>\n`
    })
  }

  // Vídeos (se houver)
  if (videos && videos.length > 0) {
    videos.forEach(video => {
      entry += `    <video:video>\n`
      entry += `      <video:content_loc>${escapeXml(video.url)}</video:content_loc>\n`
      if (video.title) {
        entry += `      <video:title>${escapeXml(video.title)}</video:title>\n`
      }
      if (video.description) {
        entry += `      <video:description>${escapeXml(video.description)}</video:description>\n`
      }
      if (video.thumbnailUrl) {
        entry += `      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>\n`
      }
      entry += `    </video:video>\n`
    })
  }

  entry += `  </url>\n`
  return entry
}

/**
 * Divide uma lista de URLs em chunks de tamanho específico
 */
export function chunkUrls(urls: SitemapUrl[], chunkSize: number = 50000): SitemapChunk[] {
  const chunks: SitemapChunk[] = []
  
  for (let i = 0; i < urls.length; i += chunkSize) {
    chunks.push({
      urls: urls.slice(i, i + chunkSize),
      index: Math.floor(i / chunkSize) + 1
    })
  }
  
  return chunks
}

/**
 * Constrói o XML completo de um sitemap
 */
export function buildSitemapXml(urls: SitemapUrl[]): string {
  const hasImages = urls.some(url => url.images && url.images.length > 0)
  const hasVideos = urls.some(url => url.videos && url.videos.length > 0)
  const hasAlternates = urls.some(url => url.alternates && url.alternates.length > 0)

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  
  // Namespaces dinâmicos baseados no conteúdo
  let namespaces = [`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`]
  
  if (hasAlternates) {
    namespaces.push(`xmlns:xhtml="http://www.w3.org/1999/xhtml"`)
  }
  if (hasImages) {
    namespaces.push(`xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`)
  }
  if (hasVideos) {
    namespaces.push(`xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"`)
  }

  xml += `<urlset ${namespaces.join(' ')}>\n`

  // Adiciona todas as URLs
  urls.forEach(url => {
    xml += buildUrlEntry(url)
  })

  xml += `</urlset>`
  
  return xml
}

/**
 * Constrói o XML do sitemap index (quando há múltiplos sitemaps)
 */
export function buildSitemapIndexXml(sitemaps: Array<{ url: string; lastModified?: Date }>): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  sitemaps.forEach(sitemap => {
    xml += `  <sitemap>\n`
    xml += `    <loc>${escapeXml(sitemap.url)}</loc>\n`
    if (sitemap.lastModified) {
      xml += `    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>\n`
    }
    xml += `  </sitemap>\n`
  })

  xml += `</sitemapindex>`
  
  return xml
}

/**
 * Escapa caracteres especiais para XML
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Normaliza uma URL removendo barras duplas e garantindo formato correto
 */
export function normalizeUrl(baseUrl: string, path: string): string {
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  
  return `${cleanBase}${cleanPath}`.replace(/\/+/g, '/').replace(':/', '://')
}

/**
 * Valida se uma URL está no formato correto
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Calcula estatísticas do sitemap para logs/debugging
 */
export function calculateSitemapStats(urls: SitemapUrl[]): {
  total: number
  withImages: number
  withVideos: number
  withAlternates: number
  priorities: Record<string, number>
  changeFrequencies: Record<string, number>
} {
  const stats = {
    total: urls.length,
    withImages: 0,
    withVideos: 0,
    withAlternates: 0,
    priorities: {} as Record<string, number>,
    changeFrequencies: {} as Record<string, number>
  }

  urls.forEach(url => {
    if (url.images && url.images.length > 0) stats.withImages++
    if (url.videos && url.videos.length > 0) stats.withVideos++
    if (url.alternates && url.alternates.length > 0) stats.withAlternates++
    
    const priority = url.priority?.toString() || 'undefined'
    stats.priorities[priority] = (stats.priorities[priority] || 0) + 1
    
    const changeFreq = url.changeFrequency || 'undefined'
    stats.changeFrequencies[changeFreq] = (stats.changeFrequencies[changeFreq] || 0) + 1
  })

  return stats
}
