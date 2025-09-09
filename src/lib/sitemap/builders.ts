import type { SitemapUrl } from './sources'
import { 
  escapeXml, 
  formatW3CDate, 
  validateSitemapLimits, 
  validateSitemapXml,
  validateDomainConsistency,
  createSitemapLogger 
} from './utils'

export interface SitemapChunk {
  urls: SitemapUrl[]
  index: number
}

export interface SitemapValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  stats: {
    sizeBytes: number
    sizeFormatted: string
    urlCount: number
  }
}

const logger = createSitemapLogger('builders')

/**
 * Constrói uma entrada XML para uma URL do sitemap seguindo especificação Google
 * Evita erros: "Invalid XML: too many tags", "Invalid date", "Invalid URL"
 */
export function buildUrlEntry(sitemapUrl: SitemapUrl, baseUrl?: string): string {
  const { url, lastModified, changeFrequency, priority, alternates, images, videos } = sitemapUrl

  // Validação da URL
  if (!url) {
    throw new Error('URL é obrigatória para entrada do sitemap')
  }

  // Validação de domínio se baseUrl fornecida
  if (baseUrl) {
    const domainErrors = validateDomainConsistency(baseUrl, [url])
    if (domainErrors.length > 0) {
      logger.warn('URL com domínio inconsistente', { url, errors: domainErrors })
    }
  }

  let entry = `  <url>\n`
  entry += `    <loc>${escapeXml(url)}</loc>\n`

  // LastMod com formato W3C obrigatório
  if (lastModified) {
    try {
      entry += `    <lastmod>${formatW3CDate(lastModified)}</lastmod>\n`
    } catch (error) {
      logger.error('Data inválida ignorada', { url, error })
    }
  }

  // ChangeFreq com valores válidos apenas
  if (changeFrequency) {
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    if (validFrequencies.includes(changeFrequency)) {
      entry += `    <changefreq>${changeFrequency}</changefreq>\n`
    } else {
      logger.warn('Frequência inválida ignorada', { url, changeFrequency })
    }
  }

  // Priority com validação de range (0.0 a 1.0)
  if (priority !== undefined) {
    if (priority >= 0 && priority <= 1) {
      entry += `    <priority>${priority.toFixed(1)}</priority>\n`
    } else {
      logger.warn('Priority fora do range ignorada', { url, priority })
    }
  }

  // Alternativas de idioma (hreflang)
  if (alternates && alternates.length > 0) {
    alternates.forEach(alt => {
      if (alt.hreflang && alt.href) {
        entry += `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />\n`
      }
    })
  }

  // Imagens com validação de campos obrigatórios
  if (images && images.length > 0) {
    images.forEach(img => {
      if (img.url) {
        entry += `    <image:image>\n`
        entry += `      <image:loc>${escapeXml(img.url)}</image:loc>\n`
        if (img.title) {
          entry += `      <image:title>${escapeXml(img.title)}</image:title>\n`
        }
        if (img.caption) {
          entry += `      <image:caption>${escapeXml(img.caption)}</image:caption>\n`
        }
        entry += `    </image:image>\n`
      }
    })
  }

  // Vídeos com campos obrigatórios conforme Google
  if (videos && videos.length > 0) {
    videos.forEach(video => {
      if (video.url && video.thumbnailUrl && video.title) {
        entry += `    <video:video>\n`
        entry += `      <video:content_loc>${escapeXml(video.url)}</video:content_loc>\n`
        entry += `      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>\n`
        entry += `      <video:title>${escapeXml(video.title)}</video:title>\n`
        if (video.description) {
          entry += `      <video:description>${escapeXml(video.description)}</video:description>\n`
        }
        entry += `    </video:video>\n`
      } else {
        logger.warn('Vídeo com campos obrigatórios ausentes ignorado', { url, video })
      }
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
 * Constrói o XML completo de um sitemap seguindo especificação Google
 * Evita erros: "Unsupported format", "Invalid XML", "Too many URLs/Sitemaps"
 */
export function buildSitemapXml(urls: SitemapUrl[], baseUrl?: string): SitemapValidationResult & { xml: string } {
  if (!urls || urls.length === 0) {
    throw new Error('Lista de URLs não pode estar vazia')
  }

  // Validação prévia das URLs
  const allUrls = urls.map(u => u.url)
  const domainErrors = baseUrl ? validateDomainConsistency(baseUrl, allUrls) : []
  
  if (domainErrors.length > 0) {
    logger.warn('URLs com domínio inconsistente detectadas', domainErrors)
  }

  const hasImages = urls.some(url => url.images && url.images.length > 0)
  const hasVideos = urls.some(url => url.videos && url.videos.length > 0)
  const hasAlternates = urls.some(url => url.alternates && url.alternates.length > 0)

  // Declaração XML obrigatória com encoding UTF-8
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  
  // Namespaces obrigatórios e opcionais baseados no conteúdo
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

  // Adiciona todas as URLs com validação individual
  urls.forEach(url => {
    try {
      xml += buildUrlEntry(url, baseUrl)
    } catch (error) {
      logger.error('Erro ao processar URL, ignorando', { url: url.url, error })
    }
  })

  xml += `</urlset>`
  
  // Validação final do XML gerado
  const xmlValidation = validateSitemapXml(xml)
  const limitsValidation = validateSitemapLimits(xml, urls.length, 'sitemap')

  const result: SitemapValidationResult & { xml: string } = {
    xml,
    isValid: xmlValidation.isValid && limitsValidation.isValid,
    errors: [...xmlValidation.errors, ...limitsValidation.errors, ...domainErrors],
    warnings: [...xmlValidation.warnings, ...limitsValidation.warnings],
    stats: limitsValidation.stats
  }

  if (!result.isValid) {
    logger.error('Sitemap XML gerado com erros', result.errors)
  }

  // Durante build, só mostra warnings realmente importantes
  if (result.warnings.length > 0) {
    const criticalWarnings = result.warnings.filter(w => 
      !w.includes('Possível problema no fechamento de tags XML') &&
      !w.includes('balanceamento de tags')
    )
    
    if (criticalWarnings.length > 0) {
      logger.warn('Sitemap XML gerado com avisos críticos', criticalWarnings)
    }
  }

  return result
}

/**
 * Constrói o XML do sitemap index seguindo especificação Google
 * Evita erros: "nested index", "incomplete URL", "Too many URLs/Sitemaps"
 */
export function buildSitemapIndexXml(sitemaps: Array<{ url: string; lastModified?: Date }>, baseUrl?: string): SitemapValidationResult & { xml: string } {
  if (!sitemaps || sitemaps.length === 0) {
    throw new Error('Lista de sitemaps não pode estar vazia')
  }

  // Validação de limite (máximo 50.000 sitemaps por index)
  if (sitemaps.length > 50000) {
    throw new Error(`Muitos sitemaps: ${sitemaps.length} (máximo 50.000)`)
  }

  // Validação de URLs absolutas e domínio
  const sitemapUrls = sitemaps.map(s => s.url)
  const domainErrors = baseUrl ? validateDomainConsistency(baseUrl, sitemapUrls) : []

  // Verifica nested index (não permitido)
  const hasNestedIndex = sitemaps.some(s => 
    s.url.includes('sitemap-index.xml') || 
    s.url.includes('sitemapindex')
  )

  if (hasNestedIndex) {
    throw new Error('Nested sitemap index detectado (não permitido pelo Google)')
  }

  // Declaração XML obrigatória
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  sitemaps.forEach(sitemap => {
    if (!sitemap.url) {
      logger.warn('Sitemap sem URL ignorado', sitemap)
      return
    }

    xml += `  <sitemap>\n`
    xml += `    <loc>${escapeXml(sitemap.url)}</loc>\n`
    
    if (sitemap.lastModified) {
      try {
        xml += `    <lastmod>${formatW3CDate(sitemap.lastModified)}</lastmod>\n`
      } catch (error) {
        logger.error('Data inválida no sitemap index ignorada', { url: sitemap.url, error })
      }
    }
    
    xml += `  </sitemap>\n`
  })

  xml += `</sitemapindex>`
  
  // Validação final
  const xmlValidation = validateSitemapXml(xml)
  const limitsValidation = validateSitemapLimits(xml, sitemaps.length, 'sitemapindex')

  const result: SitemapValidationResult & { xml: string } = {
    xml,
    isValid: xmlValidation.isValid && limitsValidation.isValid,
    errors: [...xmlValidation.errors, ...limitsValidation.errors, ...domainErrors],
    warnings: [...xmlValidation.warnings, ...limitsValidation.warnings],
    stats: limitsValidation.stats
  }

  if (!result.isValid) {
    logger.error('Sitemap Index XML gerado com erros', result.errors)
  }

  // Durante build, só mostra warnings realmente importantes
  if (result.warnings.length > 0) {
    const criticalWarnings = result.warnings.filter(w => 
      !w.includes('Possível problema no fechamento de tags XML') &&
      !w.includes('balanceamento de tags')
    )
    
    if (criticalWarnings.length > 0) {
      logger.warn('Sitemap Index XML gerado com avisos críticos', criticalWarnings)
    }
  }

  return result
}

/**
 * Calcula estatísticas detalhadas do sitemap para logs/debugging e validação
 */
export function calculateSitemapStats(urls: SitemapUrl[]): {
  total: number
  withImages: number
  withVideos: number
  withAlternates: number
  withLastMod: number
  priorities: Record<string, number>
  changeFrequencies: Record<string, number>
  domainDistribution: Record<string, number>
} {
  const stats = {
    total: urls.length,
    withImages: 0,
    withVideos: 0,
    withAlternates: 0,
    withLastMod: 0,
    priorities: {} as Record<string, number>,
    changeFrequencies: {} as Record<string, number>,
    domainDistribution: {} as Record<string, number>
  }

  urls.forEach(url => {
    if (url.images && url.images.length > 0) stats.withImages++
    if (url.videos && url.videos.length > 0) stats.withVideos++
    if (url.alternates && url.alternates.length > 0) stats.withAlternates++
    if (url.lastModified) stats.withLastMod++
    
    const priority = url.priority?.toString() || 'undefined'
    stats.priorities[priority] = (stats.priorities[priority] || 0) + 1
    
    const changeFreq = url.changeFrequency || 'undefined'
    stats.changeFrequencies[changeFreq] = (stats.changeFrequencies[changeFreq] || 0) + 1

    // Distribuição por domínio para detectar inconsistências
    try {
      const urlObj = new URL(url.url)
      const domain = urlObj.hostname
      stats.domainDistribution[domain] = (stats.domainDistribution[domain] || 0) + 1
    } catch {
      stats.domainDistribution['invalid'] = (stats.domainDistribution['invalid'] || 0) + 1
    }
  })

  return stats
}

/**
 * Função de validação completa para debugging antes da geração
 */
export function validateSitemapData(urls: SitemapUrl[], baseUrl: string): {
  isValid: boolean
  errors: string[]
  warnings: string[]
  stats: ReturnType<typeof calculateSitemapStats>
} {
  const errors: string[] = []
  const warnings: string[] = []
  const stats = calculateSitemapStats(urls)

  // Validações básicas
  if (urls.length === 0) {
    errors.push('Lista de URLs vazia')
  }

  if (urls.length > 50000) {
    errors.push(`Muitas URLs: ${urls.length} (máximo 50.000 por sitemap)`)
  }

  // Validação de domínio
  const domainErrors = validateDomainConsistency(baseUrl, urls.map(u => u.url))
  errors.push(...domainErrors)

  // Validação de URLs duplicadas
  const urlSet = new Set()
  const duplicates: string[] = []
  urls.forEach(url => {
    if (urlSet.has(url.url)) {
      duplicates.push(url.url)
    } else {
      urlSet.add(url.url)
    }
  })

  if (duplicates.length > 0) {
    warnings.push(`URLs duplicadas encontradas: ${duplicates.length}`)
  }

  // Validação de priorities fora do range
  const invalidPriorities = urls.filter(url => 
    url.priority !== undefined && (url.priority < 0 || url.priority > 1)
  )
  if (invalidPriorities.length > 0) {
    warnings.push(`URLs com priority inválida: ${invalidPriorities.length}`)
  }

  // Validação de changeFrequency inválida
  const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
  const invalidFrequencies = urls.filter(url => 
    url.changeFrequency && !validFrequencies.includes(url.changeFrequency)
  )
  if (invalidFrequencies.length > 0) {
    warnings.push(`URLs com changeFrequency inválida: ${invalidFrequencies.length}`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats
  }
}
