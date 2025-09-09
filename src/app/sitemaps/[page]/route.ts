import { NextRequest, NextResponse } from 'next/server'
import { getAllUrls } from '@/lib/sitemap/sources'
import { chunkUrls, buildSitemapXml, calculateSitemapStats } from '@/lib/sitemap/builders'

// Revalidar a cada 1 hora (3600 segundos)
export const revalidate = 3600

// Configuração de runtime para melhor performance
export const runtime = 'nodejs'

// Limite de URLs por sitemap (protocolo permite até 50.000)
const URLS_PER_SITEMAP = 50000

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
    const pageNumber = parseInt(params.page.replace('sitemap-', '').replace('.xml', ''), 10)
    
    if (isNaN(pageNumber) || pageNumber < 1) {
      return new NextResponse('Número de página inválido', { 
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    console.log(`[Sitemap ${pageNumber}] Iniciando geração...`)
    const startTime = Date.now()

    // Coleta todas as URLs
    const allUrls = await getAllUrls()
    
    if (allUrls.length === 0) {
      return new NextResponse('Nenhuma URL encontrada', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Divide em chunks
    const chunks = chunkUrls(allUrls, URLS_PER_SITEMAP)
    
    // Verifica se a página solicitada existe
    const requestedChunk = chunks.find(chunk => chunk.index === pageNumber)
    
    if (!requestedChunk) {
      return new NextResponse(`Sitemap ${pageNumber} não encontrado. Páginas disponíveis: 1-${chunks.length}`, { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Gera o XML para este chunk específico
    const sitemapXml = buildSitemapXml(requestedChunk.urls)

    // Log de estatísticas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      const stats = calculateSitemapStats(requestedChunk.urls)
      console.log(`[Sitemap ${pageNumber}] Estatísticas:`, {
        ...stats,
        chunkIndex: requestedChunk.index,
        totalChunks: chunks.length,
        generationTime: `${Date.now() - startTime}ms`
      })
    }

    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Sitemap-Page': pageNumber.toString(),
        'X-Sitemap-URLs': requestedChunk.urls.length.toString(),
        'X-Total-Pages': chunks.length.toString(),
        'X-Generation-Time': (Date.now() - startTime).toString(),
      },
    })

  } catch (error) {
    console.error(`[Sitemap ${params.page}] Erro ao gerar:`, error)
    
    return new NextResponse(
      `Erro interno ao gerar sitemap: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 
      { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      }
    )
  }
}

// Função para gerar parâmetros estáticos (opcional, para melhor performance)
export async function generateStaticParams() {
  try {
    const allUrls = await getAllUrls()
    const chunks = chunkUrls(allUrls, URLS_PER_SITEMAP)
    
    return chunks.map(chunk => ({
      page: `sitemap-${chunk.index}.xml`
    }))
  } catch (error) {
    console.warn('Erro ao gerar parâmetros estáticos para sitemaps:', error)
    return []
  }
}
