import { NextResponse } from 'next/server'
import { getAllUrls, getBaseUrl } from '@/lib/sitemap/sources'
import { 
  chunkUrls, 
  buildSitemapXml, 
  buildSitemapIndexXml, 
  validateSitemapData
} from '@/lib/sitemap/builders'
import { createSitemapLogger } from '@/lib/sitemap/utils'

// Revalidar a cada 1 hora (3600 segundos) - ISR conforme Google
export const revalidate = 3600

// Configuração de runtime para melhor performance
export const runtime = 'nodejs'

// Limite de URLs por sitemap conforme especificação Google (50.000)
const URLS_PER_SITEMAP = 50000

const logger = createSitemapLogger('sitemap-main')

export async function GET() {
  try {
    logger.info('Iniciando geração do sitemap principal')
    const startTime = Date.now()
    const baseUrl = getBaseUrl()

    // Coleta todas as URLs com validação completa
    const allUrls = await getAllUrls()
    
    if (allUrls.length === 0) {
      logger.error('Nenhuma URL encontrada')
      return new NextResponse('Nenhuma URL encontrada para o sitemap', { 
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      })
    }

    // Validação prévia dos dados antes da geração
    const validation = validateSitemapData(allUrls, baseUrl)
    
    if (!validation.isValid) {
      logger.error('Dados do sitemap inválidos', validation.errors)
      return new NextResponse(
        `Erro de validação do sitemap: ${validation.errors.join(', ')}`, 
        { 
          status: 500,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      )
    }

    if (validation.warnings.length > 0) {
      logger.warn('Avisos na validação dos dados', validation.warnings)
    }

    // Se temos poucas URLs, retorna um sitemap único
    if (allUrls.length <= URLS_PER_SITEMAP) {
      const result = buildSitemapXml(allUrls, baseUrl)
      
      if (!result.isValid) {
        logger.error('Sitemap XML inválido', result.errors)
        return new NextResponse(
          `Erro na geração do sitemap XML: ${result.errors.join(', ')}`, 
          { 
            status: 500,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          }
        )
      }

      const generationTime = Date.now() - startTime
      
      logger.info('Sitemap único gerado com sucesso', {
        urlCount: allUrls.length,
        sizeFormatted: result.stats.sizeFormatted,
        generationTime: `${generationTime}ms`,
        warnings: result.warnings.length
      })

      return new NextResponse(result.xml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          'X-Sitemap-URLs': allUrls.length.toString(),
          'X-Generation-Time': generationTime.toString(),
          'X-Sitemap-Type': 'single',
          'X-Sitemap-Size': result.stats.sizeBytes.toString(),
          // Headers adicionais para SEO
          'Last-Modified': new Date().toUTCString(),
          'X-Robots-Tag': 'noindex', // Sitemap não deve ser indexado
        },
      })
    }

    // Se temos muitas URLs, retorna um sitemap index
    const chunks = chunkUrls(allUrls, URLS_PER_SITEMAP)
    const now = new Date()
    
    const sitemapIndexEntries = chunks.map((chunk) => ({
      url: `${baseUrl}/sitemaps/sitemap-${chunk.index}.xml`,
      lastModified: now,
    }))

    const indexResult = buildSitemapIndexXml(sitemapIndexEntries, baseUrl)

    if (!indexResult.isValid) {
      logger.error('Sitemap Index XML inválido', indexResult.errors)
      return new NextResponse(
        `Erro na geração do sitemap index: ${indexResult.errors.join(', ')}`, 
        { 
          status: 500,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      )
    }

    const generationTime = Date.now() - startTime
    
    logger.info('Sitemap index gerado com sucesso', {
      totalUrls: allUrls.length,
      totalSitemaps: chunks.length,
      sizeFormatted: indexResult.stats.sizeFormatted,
      generationTime: `${generationTime}ms`,
      warnings: indexResult.warnings.length
    })

    return new NextResponse(indexResult.xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Sitemap-URLs': allUrls.length.toString(),
        'X-Sitemap-Count': chunks.length.toString(),
        'X-Generation-Time': generationTime.toString(),
        'X-Sitemap-Type': 'index',
        'X-Sitemap-Size': indexResult.stats.sizeBytes.toString(),
        // Headers adicionais para SEO
        'Last-Modified': new Date().toUTCString(),
        'X-Robots-Tag': 'noindex', // Sitemap index não deve ser indexado
      },
    })

  } catch (error) {
    logger.error('Erro crítico na geração do sitemap', error)
    
    return new NextResponse(
      `Erro interno na geração do sitemap: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 
      { 
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    )
  }
}
