#!/usr/bin/env node

/**
 * Script para notificar motores de busca sobre atualizações no sitemap
 * Uso: npm run sitemap:ping
 */

const https = require('https')
const http = require('http')

// Configuração
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.calistoai.com.br'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`

// URLs de ping dos motores de busca
const PING_URLS = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  // Yandex (opcional)
  // {
  //   name: 'Yandex',
  //   url: `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  // },
]

/**
 * Faz uma requisição HTTP/HTTPS
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https:') ? https : http
    
    const request = lib.get(url, (response) => {
      let data = ''
      
      response.on('data', (chunk) => {
        data += chunk
      })
      
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          data: data.trim()
        })
      })
    })
    
    request.on('error', (error) => {
      reject(error)
    })
    
    request.setTimeout(10000, () => {
      request.destroy()
      reject(new Error('Timeout'))
    })
  })
}

/**
 * Pinga um motor de busca
 */
async function pingSearchEngine(searchEngine) {
  try {
    console.log(`🔔 Notificando ${searchEngine.name}...`)
    
    const response = await makeRequest(searchEngine.url)
    
    if (response.statusCode === 200) {
      console.log(`✅ ${searchEngine.name}: Sucesso`)
      if (response.data && response.data.length > 0 && response.data.length < 200) {
        console.log(`   Resposta: ${response.data}`)
      }
    } else {
      console.log(`⚠️  ${searchEngine.name}: ${response.statusCode} ${response.statusMessage}`)
      if (response.data) {
        console.log(`   Resposta: ${response.data}`)
      }
    }
    
    return true
  } catch (error) {
    console.log(`❌ ${searchEngine.name}: Erro - ${error.message}`)
    return false
  }
}

/**
 * Valida se o sitemap existe antes de fazer ping
 */
async function validateSitemap() {
  try {
    console.log(`🔍 Validando sitemap: ${SITEMAP_URL}`)
    
    const response = await makeRequest(SITEMAP_URL)
    
    if (response.statusCode === 200) {
      console.log(`✅ Sitemap encontrado e acessível`)
      
      // Verifica se é XML válido
      if (response.data.includes('<?xml') && response.data.includes('<urlset')) {
        console.log(`✅ Formato XML válido`)
        return true
      } else if (response.data.includes('<?xml') && response.data.includes('<sitemapindex')) {
        console.log(`✅ Sitemap Index válido`)
        return true
      } else {
        console.log(`⚠️  Conteúdo pode não ser um sitemap válido`)
        return false
      }
    } else {
      console.log(`❌ Sitemap não acessível: ${response.statusCode} ${response.statusMessage}`)
      return false
    }
  } catch (error) {
    console.log(`❌ Erro ao validar sitemap: ${error.message}`)
    return false
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🚀 Iniciando notificação de sitemaps...')
  console.log(`📍 Site: ${SITE_URL}`)
  console.log(`🗺️  Sitemap: ${SITEMAP_URL}`)
  console.log('')
  
  // Valida o sitemap primeiro
  const isValid = await validateSitemap()
  
  if (!isValid) {
    console.log('')
    console.log('❌ Sitemap inválido ou inacessível. Abortando.')
    process.exit(1)
  }
  
  console.log('')
  
  // Faz ping em todos os motores de busca
  const results = await Promise.allSettled(
    PING_URLS.map(searchEngine => pingSearchEngine(searchEngine))
  )
  
  console.log('')
  
  // Resumo
  const successful = results.filter(result => result.status === 'fulfilled' && result.value === true).length
  const total = PING_URLS.length
  
  console.log(`📊 Resumo: ${successful}/${total} notificações enviadas com sucesso`)
  
  if (successful === total) {
    console.log('🎉 Todos os motores de busca foram notificados!')
  } else if (successful > 0) {
    console.log('⚠️  Algumas notificações falharam. Verifique os logs acima.')
  } else {
    console.log('❌ Nenhuma notificação foi enviada com sucesso.')
    process.exit(1)
  }
}

// Executa apenas se chamado diretamente
if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Erro fatal:', error)
    process.exit(1)
  })
}

module.exports = { main, validateSitemap, pingSearchEngine }
