import { NextRequest, NextResponse } from 'next/server'
import { getAllUrls, getBaseUrl } from '@/lib/sitemap/sources'
import { 
  chunkUrls, 
  buildSitemapXml, 
  validateSitemapData
} from '@/lib/sitemap/builders'
import { createSitemapLogger } from '@/lib/sitemap/utils'

// Revalidar a cada 1 hora (3600 segundos) - ISR conforme Google
export const revalidate = 3600

// Configuração de runtime para melhor performance
export const runtime = 'nodejs'

// Limite de URLs por sitemap conforme especificação Google (50.000)
const URLS_PER_SITEMAP = 50000

const logger = createSitemapLogger('sitemap-paginated')

interface RouteParams {
  params: {
    page: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Parse do número da página com validação rigorosa
    const pageParam = params.page.replace('sitemap-', '').replace('.xml', '')
    const pageNumber = parseInt(pageParam, 10)
    
    if (isNaN(pageNumber) || pageNumber < 1) {
      logger.error('Número de página inválido', { pageParam, pageNumber })
      return new NextResponse('Número de página inválido', { 
        status: 400,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      })
    }

    logger.info(`Iniciando geração do sitemap paginado ${pageNumber}`)
    const startTime = Date.now()
    const baseUrl = getBaseUrl()

    // Coleta todas as URLs com validação
    const allUrls = await getAllUrls()
    
    if (allUrls.length === 0) {
      logger.error('Nenhuma URL encontrada para sitemap paginado')
      return new NextResponse('Nenhuma URL encontrada', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      })
    }

    // Validação dos dados antes da paginação
    const validation = validateSitemapData(allUrls, baseUrl)
    
    if (!validation.isValid) {
      logger.error('Dados inválidos para sitemap paginado', validation.errors)
      return new NextResponse(
        `Erro de validação: ${validation.errors.join(', ')}`, 
        { 
          status: 500,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      )
    }

    // Divide em chunks
    const chunks = chunkUrls(allUrls, URLS_PER_SITEMAP)
    
    // Verifica se a página solicitada existe
    const requestedChunk = chunks.find(chunk => chunk.index === pageNumber)
    
    if (!requestedChunk) {
      logger.warn('Página de sitemap não encontrada', { 
        requested: pageNumber, 
        available: chunks.length 
      })
      
      return new NextResponse(
        `Sitemap ${pageNumber} não encontrado. Páginas disponíveis: 1-${chunks.length}`, 
        { 
          status: 404,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      )
    }

    // Gera o XML para este chunk específico com validação
    const result = buildSitemapXml(requestedChunk.urls, baseUrl)

    if (!result.isValid) {
      logger.error('XML do sitemap paginado inválido', result.errors)
      return new NextResponse(
        `Erro na geração do XML: ${result.errors.join(', ')}`, 
        { 
          status: 500,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      )
    }

    const generationTime = Date.now() - startTime
    
    logger.info(`Sitemap paginado ${pageNumber} gerado com sucesso`, {
      urlCount: requestedChunk.urls.length,
      chunkIndex: requestedChunk.index,
      totalChunks: chunks.length,
      sizeFormatted: result.stats.sizeFormatted,
      generationTime: `${generationTime}ms`,
      warnings: result.warnings.length
    })

    return new NextResponse(result.xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Sitemap-Page': pageNumber.toString(),
        'X-Sitemap-URLs': requestedChunk.urls.length.toString(),
        'X-Total-Pages': chunks.length.toString(),
        'X-Generation-Time': generationTime.toString(),
        'X-Sitemap-Type': 'paginated',
        'X-Sitemap-Size': result.stats.sizeBytes.toString(),
        // Headers adicionais para SEO
        'Last-Modified': new Date().toUTCString(),
        'X-Robots-Tag': 'noindex', // Sitemaps paginados não devem ser indexados
      },
    })

  } catch (error) {
    logger.error('Erro crítico na geração do sitemap paginado', { page: params.page, error })
    
    return new NextResponse(
      `Erro interno na geração do sitemap: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 
      { 
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    )
  }
}

// Função para gerar parâmetros estáticos (opcional, para melhor performance)
export async function generateStaticParams() {
  try {
    const allUrls = await getAllUrls()
    const chunks = chunkUrls(allUrls, URLS_PER_SITEMAP)
    
    const params = chunks.map(chunk => ({
      page: `sitemap-${chunk.index}.xml`
    }))
    
    logger.info('Parâmetros estáticos gerados', { count: params.length })
    return params
    
  } catch (error) {
    logger.warn('Erro ao gerar parâmetros estáticos', error)
    // Retorna array vazio em caso de erro para não quebrar o build
    return []
  }
}
