import { NextResponse } from 'next/server'
import { getAllUrls, getBaseUrl } from '@/lib/sitemap/sources'
import { 
  chunkUrls, 
  buildSitemapIndexXml
} from '@/lib/sitemap/builders'
import { createSitemapLogger } from '@/lib/sitemap/utils'

// Revalidar a cada 1 hora (3600 segundos) - ISR
export const revalidate = 3600

// Configuração de runtime para melhor performance
export const runtime = 'nodejs'

// Limite de URLs por sitemap conforme Google (50.000)
const URLS_PER_SITEMAP = 50000

const logger = createSitemapLogger('sitemap-index')

export async function GET() {
  try {
    logger.info('Iniciando geração do sitemap index')
    const startTime = Date.now()
    const baseUrl = getBaseUrl()

    // Coleta todas as URLs
    const allUrls = await getAllUrls()
    
    if (allUrls.length === 0) {
      logger.error('Nenhuma URL encontrada')
      return new NextResponse('Nenhuma URL encontrada para o sitemap index', { 
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      })
    }

    // Se temos poucas URLs, redireciona para sitemap único
    if (allUrls.length <= URLS_PER_SITEMAP) {
      logger.info('Poucas URLs, redirecionando para sitemap único', { count: allUrls.length })
      
      return NextResponse.redirect(`${baseUrl}/sitemap.xml`, 301)
    }

    // Divide em chunks para múltiplos sitemaps
    const chunks = chunkUrls(allUrls, URLS_PER_SITEMAP)
    const now = new Date()

    // Cria entradas do index apontando para cada sitemap paginado
    const sitemapIndexEntries = chunks.map((chunk) => ({
      url: `${baseUrl}/sitemaps/sitemap-${chunk.index}.xml`,
      lastModified: now,
    }))

    // Gera XML do sitemap index
    const result = buildSitemapIndexXml(sitemapIndexEntries, baseUrl)

    if (!result.isValid) {
      logger.error('Sitemap index inválido', result.errors)
      return new NextResponse(
        `Erro na geração do sitemap index: ${result.errors.join(', ')}`, 
        { 
          status: 500,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      )
    }

    // Log de avisos se houver
    if (result.warnings.length > 0) {
      logger.warn('Avisos na geração do sitemap index', result.warnings)
    }

    const generationTime = Date.now() - startTime
    
    logger.info('Sitemap index gerado com sucesso', {
      totalUrls: allUrls.length,
      totalSitemaps: chunks.length,
      sizeFormatted: result.stats.sizeFormatted,
      generationTime: `${generationTime}ms`
    })

    return new NextResponse(result.xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Sitemap-URLs': allUrls.length.toString(),
        'X-Sitemap-Count': chunks.length.toString(),
        'X-Generation-Time': generationTime.toString(),
        'X-Sitemap-Type': 'index',
        // Headers adicionais para SEO
        'X-Robots-Tag': 'noindex', // Sitemap index não deve ser indexado
      },
    })

  } catch (error) {
    logger.error('Erro crítico na geração do sitemap index', error)
    
    return new NextResponse(
      `Erro interno na geração do sitemap index: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 
      { 
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    )
  }
}
