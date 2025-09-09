import { NextResponse } from 'next/server'
import { getAllUrls } from '@/lib/sitemap/sources'
import { 
  chunkUrls, 
  buildSitemapXml, 
  buildSitemapIndexXml, 
  calculateSitemapStats 
} from '@/lib/sitemap/builders'
import { getBaseUrl } from '@/lib/sitemap/sources'

// Revalidar a cada 1 hora (3600 segundos)
export const revalidate = 3600

// Configuração de runtime para melhor performance
export const runtime = 'nodejs'

// Limite de URLs por sitemap (protocolo permite até 50.000)
const URLS_PER_SITEMAP = 50000

export async function GET() {
  try {
    console.log('[Sitemap] Iniciando geração do sitemap...')
    const startTime = Date.now()

    // Coleta todas as URLs
    const allUrls = await getAllUrls()
    
    if (allUrls.length === 0) {
      console.warn('[Sitemap] Nenhuma URL encontrada')
      return new NextResponse('Nenhuma URL encontrada para o sitemap', { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    const baseUrl = getBaseUrl()
    const now = new Date()

    // Se temos poucas URLs, retorna um sitemap único
    if (allUrls.length <= URLS_PER_SITEMAP) {
      const sitemapXml = buildSitemapXml(allUrls)
      
      // Log de estatísticas em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        const stats = calculateSitemapStats(allUrls)
        console.log('[Sitemap] Estatísticas:', {
          ...stats,
          generationTime: `${Date.now() - startTime}ms`
        })
      }

      return new NextResponse(sitemapXml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          'X-Sitemap-URLs': allUrls.length.toString(),
          'X-Generation-Time': (Date.now() - startTime).toString(),
        },
      })
    }

    // Se temos muitas URLs, retorna um sitemap index
    const chunks = chunkUrls(allUrls, URLS_PER_SITEMAP)
    const sitemapIndexEntries = chunks.map((chunk, index) => ({
      url: `${baseUrl}/sitemaps/sitemap-${chunk.index}.xml`,
      lastModified: now,
    }))

    const sitemapIndexXml = buildSitemapIndexXml(sitemapIndexEntries)

    // Log de estatísticas
    if (process.env.NODE_ENV === 'development') {
      const stats = calculateSitemapStats(allUrls)
      console.log('[Sitemap Index] Estatísticas:', {
        ...stats,
        totalChunks: chunks.length,
        generationTime: `${Date.now() - startTime}ms`
      })
    }

    return new NextResponse(sitemapIndexXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Sitemap-URLs': allUrls.length.toString(),
        'X-Sitemap-Chunks': chunks.length.toString(),
        'X-Generation-Time': (Date.now() - startTime).toString(),
      },
    })

  } catch (error) {
    console.error('[Sitemap] Erro ao gerar sitemap:', error)
    
    return new NextResponse(
      `Erro interno ao gerar sitemap: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 
      { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      }
    )
  }
}
