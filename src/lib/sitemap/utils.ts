/**
 * Utilitários para sitemaps seguindo estritamente a documentação do Google
 * https://support.google.com/webmasters/answer/183668
 */

/**
 * Normaliza uma URL garantindo formato absoluto e coerência de domínio
 * Evita erros: "URL not allowed", "Path mismatch", "Invalid URL"
 */
export function normalizeUrl(baseUrl: string, path: string): string {
  // Remove barras finais do baseUrl
  const cleanBase = baseUrl.replace(/\/+$/, '')
  
  // Garante que o path comece com /
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  
  // Constrói URL absoluta
  let fullUrl = `${cleanBase}${cleanPath}`
  
  // Remove barras duplas, mas preserva :// do protocolo
  fullUrl = fullUrl.replace(/([^:]\/)\/+/g, '$1')
  
  // Valida se a URL resultante está no mesmo domínio do baseUrl
  try {
    const baseUrlObj = new URL(baseUrl)
    const fullUrlObj = new URL(fullUrl)
    
    // Verifica coerência de protocolo, domínio e porta
    if (
      baseUrlObj.protocol !== fullUrlObj.protocol ||
      baseUrlObj.hostname !== fullUrlObj.hostname ||
      baseUrlObj.port !== fullUrlObj.port
    ) {
      throw new Error(`URL fora do escopo: ${fullUrl} não corresponde ao domínio base ${baseUrl}`)
    }
    
    return fullUrl
  } catch (error) {
    throw new Error(`URL inválida: ${fullUrl} - ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
  }
}

/**
 * Converte uma data para formato W3C Datetime conforme especificação
 * Formatos aceitos: YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss+00:00
 * Evita erro: "Invalid date"
 */
export function formatW3CDate(date: Date): string {
  if (!date || isNaN(date.getTime())) {
    throw new Error('Data inválida fornecida')
  }
  
  // Usa formato ISO 8601 completo que é compatível com W3C
  return date.toISOString()
}

/**
 * Escapa caracteres especiais para XML conforme especificação
 * Evita erros: "Invalid XML", parsing errors
 */
export function escapeXml(text: string): string {
  if (typeof text !== 'string') {
    return String(text)
  }
  
  return text
    .replace(/&/g, '&amp;')   // & deve ser escapado primeiro
    .replace(/</g, '&lt;')    // <
    .replace(/>/g, '&gt;')    // >
    .replace(/"/g, '&quot;')  // "
    .replace(/'/g, '&apos;')  // '
}

/**
 * Valida se uma URL é absoluta e válida
 * Evita erros: "Invalid URL", "URL not allowed"
 */
export function validateAbsoluteUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    
    // Deve ter protocolo http ou https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }
    
    // Deve ter hostname válido
    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return false
    }
    
    return true
  } catch {
    return false
  }
}

/**
 * Valida coerência de domínio entre URLs
 * Evita erros: "Path mismatch", "URL not allowed"
 */
export function validateDomainConsistency(baseUrl: string, urls: string[]): string[] {
  const errors: string[] = []
  
  try {
    const baseUrlObj = new URL(baseUrl)
    
    for (const url of urls) {
      try {
        const urlObj = new URL(url)
        
        // Verifica protocolo
        if (baseUrlObj.protocol !== urlObj.protocol) {
          errors.push(`Protocolo inconsistente: ${url} (esperado: ${baseUrlObj.protocol})`)
        }
        
        // Verifica hostname
        if (baseUrlObj.hostname !== urlObj.hostname) {
          errors.push(`Domínio inconsistente: ${url} (esperado: ${baseUrlObj.hostname})`)
        }
        
        // Verifica porta (se especificada)
        if (baseUrlObj.port !== urlObj.port) {
          errors.push(`Porta inconsistente: ${url} (esperado: ${baseUrlObj.port || 'padrão'})`)
        }
        
      } catch (urlError) {
        errors.push(`URL inválida: ${url}`)
      }
    }
  } catch (baseError) {
    errors.push(`URL base inválida: ${baseUrl}`)
  }
  
  return errors
}

/**
 * Calcula o tamanho em bytes de uma string (para validar limite de 50MB)
 * Evita erro: "Compression error", "Too many URLs/Sitemaps"
 */
export function calculateByteSize(content: string): number {
  // Usa TextEncoder para calcular tamanho real em UTF-8
  return new TextEncoder().encode(content).length
}

/**
 * Formata tamanho em bytes para leitura humana
 */
export function formatByteSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`
}

/**
 * Valida se o conteúdo XML está dentro dos limites do Google
 * Limites: 50MB descompactado, 50.000 URLs por sitemap, 50.000 sitemaps por index
 */
export function validateSitemapLimits(content: string, urlCount: number, type: 'sitemap' | 'sitemapindex' = 'sitemap'): {
  isValid: boolean
  errors: string[]
  warnings: string[]
  stats: {
    sizeBytes: number
    sizeFormatted: string
    urlCount: number
  }
} {
  const errors: string[] = []
  const warnings: string[] = []
  const sizeBytes = calculateByteSize(content)
  const sizeFormatted = formatByteSize(sizeBytes)
  
  // Limite de 50MB (52,428,800 bytes)
  const MAX_SIZE_BYTES = 50 * 1024 * 1024
  if (sizeBytes > MAX_SIZE_BYTES) {
    errors.push(`Tamanho excede 50MB: ${sizeFormatted}`)
  } else if (sizeBytes > MAX_SIZE_BYTES * 0.9) {
    warnings.push(`Tamanho próximo do limite (90%): ${sizeFormatted}`)
  }
  
  // Limite de 50.000 URLs/sitemaps
  const MAX_ITEMS = 50000
  if (urlCount > MAX_ITEMS) {
    errors.push(`${type === 'sitemap' ? 'URLs' : 'Sitemaps'} excedem 50.000: ${urlCount}`)
  } else if (urlCount > MAX_ITEMS * 0.9) {
    warnings.push(`${type === 'sitemap' ? 'URLs' : 'Sitemaps'} próximas do limite (90%): ${urlCount}`)
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      sizeBytes,
      sizeFormatted,
      urlCount
    }
  }
}

/**
 * Valida estrutura básica de XML do sitemap
 * Evita erros: "Invalid XML", "Unsupported format", "Invalid XML: too many tags"
 */
export function validateSitemapXml(xmlContent: string): {
  isValid: boolean
  errors: string[]
  warnings: string[]
  type: 'sitemap' | 'sitemapindex' | 'unknown'
} {
  const errors: string[] = []
  const warnings: string[] = []
  let type: 'sitemap' | 'sitemapindex' | 'unknown' = 'unknown'
  
  // Verifica declaração XML
  if (!xmlContent.includes('<?xml version="1.0"')) {
    errors.push('Declaração XML ausente ou inválida')
  }
  
  // Verifica encoding UTF-8
  if (!xmlContent.includes('encoding="UTF-8"')) {
    warnings.push('Encoding UTF-8 não especificado explicitamente')
  }
  
  // Determina tipo de sitemap
  if (xmlContent.includes('<urlset')) {
    type = 'sitemap'
    
    // Verifica namespace obrigatório
    if (!xmlContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      errors.push('Namespace obrigatório ausente: http://www.sitemaps.org/schemas/sitemap/0.9')
    }
    
    // Verifica se há tags <url>
    const urlTags = xmlContent.match(/<url>/g)
    if (!urlTags || urlTags.length === 0) {
      warnings.push('Nenhuma tag <url> encontrada')
    }
    
    // Verifica duplicação de tags obrigatórias dentro de <url>
    const locTags = xmlContent.match(/<loc>/g)
    if (urlTags && locTags && locTags.length !== urlTags.length) {
      errors.push('Número inconsistente de tags <loc> em relação a <url>')
    }
    
  } else if (xmlContent.includes('<sitemapindex')) {
    type = 'sitemapindex'
    
    // Verifica namespace obrigatório
    if (!xmlContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      errors.push('Namespace obrigatório ausente: http://www.sitemaps.org/schemas/sitemap/0.9')
    }
    
    // Verifica se há tags <sitemap>
    const sitemapTags = xmlContent.match(/<sitemap>/g)
    if (!sitemapTags || sitemapTags.length === 0) {
      warnings.push('Nenhuma tag <sitemap> encontrada')
    }
    
    // Verifica nested index (não permitido)
    if (xmlContent.includes('sitemap-index.xml') || xmlContent.includes('sitemapindex')) {
      errors.push('Nested sitemap index detectado (não permitido)')
    }
    
  } else {
    errors.push('Tipo de sitemap não reconhecido (deve conter <urlset> ou <sitemapindex>)')
  }
  
  // Verifica fechamento correto de tags
  const openTags = xmlContent.match(/<[^\/!?][^>]*>/g) || []
  const closeTags = xmlContent.match(/<\/[^>]*>/g) || []
  
  if (openTags.length !== closeTags.length + 1) { // +1 para a declaração XML
    warnings.push('Possível problema no fechamento de tags XML')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    type
  }
}

/**
 * Extrai e valida todas as URLs de um sitemap XML
 */
export function extractUrlsFromSitemap(xmlContent: string): string[] {
  const urls: string[] = []
  const locRegex = /<loc>(.*?)<\/loc>/g
  let match
  
  while ((match = locRegex.exec(xmlContent)) !== null) {
    const url = match[1].trim()
    if (url && validateAbsoluteUrl(url)) {
      urls.push(url)
    }
  }
  
  return urls
}

/**
 * Valida formato de data W3C em lastmod
 */
export function validateW3CDate(dateString: string): boolean {
  // Formatos aceitos pelo W3C:
  // YYYY-MM-DD
  // YYYY-MM-DDTHH:mm:ssZ
  // YYYY-MM-DDTHH:mm:ss+00:00
  
  const w3cDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2}))?$/
  
  if (!w3cDateRegex.test(dateString)) {
    return false
  }
  
  // Testa se a data é válida
  try {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  } catch {
    return false
  }
}

/**
 * Utilitário para debug e logs estruturados
 */
export function createSitemapLogger(context: string) {
  const isDev = process.env.NODE_ENV === 'development'
  
  return {
    info: (message: string, data?: any) => {
      if (isDev) {
        console.log(`[Sitemap:${context}] ${message}`, data || '')
      }
    },
    warn: (message: string, data?: any) => {
      console.warn(`[Sitemap:${context}] ⚠️ ${message}`, data || '')
    },
    error: (message: string, error?: any) => {
      console.error(`[Sitemap:${context}] ❌ ${message}`, error || '')
    }
  }
}
