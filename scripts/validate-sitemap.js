#!/usr/bin/env node

/**
 * Script para validar sitemaps localmente
 * Uso: npm run sitemap:validate
 */

const https = require('https')
const http = require('http')

// Configuração
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`

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
          headers: response.headers,
          data: data
        })
      })
    })
    
    request.on('error', (error) => {
      reject(error)
    })
    
    request.setTimeout(15000, () => {
      request.destroy()
      reject(new Error('Timeout'))
    })
  })
}

/**
 * Valida o formato XML básico
 */
function validateXmlFormat(xmlContent) {
  const errors = []
  const warnings = []
  
  // Verifica declaração XML
  if (!xmlContent.includes('<?xml version="1.0"')) {
    errors.push('Declaração XML ausente ou inválida')
  }
  
  // Verifica encoding UTF-8
  if (!xmlContent.includes('encoding="UTF-8"')) {
    warnings.push('Encoding UTF-8 não especificado')
  }
  
  // Verifica se é sitemap ou sitemap index
  const isSitemap = xmlContent.includes('<urlset')
  const isSitemapIndex = xmlContent.includes('<sitemapindex')
  
  if (!isSitemap && !isSitemapIndex) {
    errors.push('Não é um sitemap válido (falta <urlset> ou <sitemapindex>)')
    return { errors, warnings, type: 'unknown' }
  }
  
  const type = isSitemap ? 'sitemap' : 'sitemapindex'
  
  // Verifica namespace
  if (isSitemap && !xmlContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push('Namespace do sitemap ausente ou inválido')
  }
  
  if (isSitemapIndex && !xmlContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push('Namespace do sitemap index ausente ou inválido')
  }
  
  return { errors, warnings, type }
}

/**
 * Conta URLs em um sitemap
 */
function countUrls(xmlContent, type) {
  if (type === 'sitemap') {
    const urlMatches = xmlContent.match(/<url>/g)
    return urlMatches ? urlMatches.length : 0
  } else if (type === 'sitemapindex') {
    const sitemapMatches = xmlContent.match(/<sitemap>/g)
    return sitemapMatches ? sitemapMatches.length : 0
  }
  return 0
}

/**
 * Extrai URLs de exemplo
 */
function extractSampleUrls(xmlContent, type, limit = 5) {
  const samples = []
  
  if (type === 'sitemap') {
    const urlRegex = /<loc>(.*?)<\/loc>/g
    let match
    while ((match = urlRegex.exec(xmlContent)) && samples.length < limit) {
      samples.push(match[1])
    }
  } else if (type === 'sitemapindex') {
    const sitemapRegex = /<loc>(.*?)<\/loc>/g
    let match
    while ((match = sitemapRegex.exec(xmlContent)) && samples.length < limit) {
      samples.push(match[1])
    }
  }
  
  return samples
}

/**
 * Valida um sitemap individual
 */
async function validateSitemap(url) {
  try {
    console.log(`🔍 Validando: ${url}`)
    
    const response = await makeRequest(url)
    
    // Verifica status HTTP
    if (response.statusCode !== 200) {
      console.log(`❌ Status HTTP: ${response.statusCode} ${response.statusMessage}`)
      return false
    }
    
    // Verifica Content-Type
    const contentType = response.headers['content-type'] || ''
    if (!contentType.includes('xml')) {
      console.log(`⚠️  Content-Type: ${contentType} (esperado: application/xml)`)
    }
    
    // Verifica tamanho
    const sizeKB = Math.round(response.data.length / 1024)
    console.log(`📏 Tamanho: ${sizeKB} KB`)
    
    if (sizeKB > 50000) { // 50MB em KB
      console.log(`⚠️  Arquivo muito grande (>${50000} KB)`)
    }
    
    // Valida formato XML
    const validation = validateXmlFormat(response.data)
    
    if (validation.errors.length > 0) {
      console.log(`❌ Erros de formato:`)
      validation.errors.forEach(error => console.log(`   - ${error}`))
      return false
    }
    
    if (validation.warnings.length > 0) {
      console.log(`⚠️  Avisos:`)
      validation.warnings.forEach(warning => console.log(`   - ${warning}`))
    }
    
    // Conta URLs
    const urlCount = countUrls(response.data, validation.type)
    const itemType = validation.type === 'sitemap' ? 'URLs' : 'sitemaps'
    console.log(`📊 ${urlCount} ${itemType} encontradas`)
    
    if (validation.type === 'sitemap' && urlCount > 50000) {
      console.log(`⚠️  Muitas URLs (>${50000}). Considere usar sitemap index.`)
    }
    
    // Mostra exemplos
    const samples = extractSampleUrls(response.data, validation.type, 3)
    if (samples.length > 0) {
      console.log(`📋 Exemplos:`)
      samples.forEach(sample => console.log(`   - ${sample}`))
    }
    
    // Verifica headers específicos
    const headers = response.headers
    if (headers['x-sitemap-urls']) {
      console.log(`📈 URLs reportadas: ${headers['x-sitemap-urls']}`)
    }
    if (headers['x-generation-time']) {
      console.log(`⏱️  Tempo de geração: ${headers['x-generation-time']}ms`)
    }
    
    console.log(`✅ Sitemap válido (${validation.type})`)
    return true
    
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`)
    return false
  }
}

/**
 * Valida robots.txt
 */
async function validateRobots() {
  try {
    const robotsUrl = `${SITE_URL}/robots.txt`
    console.log(`🤖 Validando robots.txt: ${robotsUrl}`)
    
    const response = await makeRequest(robotsUrl)
    
    if (response.statusCode !== 200) {
      console.log(`❌ robots.txt não encontrado: ${response.statusCode}`)
      return false
    }
    
    const robotsContent = response.data
    
    // Verifica se menciona o sitemap
    if (robotsContent.includes('Sitemap:')) {
      const sitemapMatch = robotsContent.match(/Sitemap:\s*(.+)/i)
      if (sitemapMatch) {
        console.log(`✅ Sitemap referenciado: ${sitemapMatch[1].trim()}`)
      }
    } else {
      console.log(`⚠️  Sitemap não referenciado no robots.txt`)
    }
    
    // Verifica regras básicas
    if (robotsContent.includes('User-agent:')) {
      console.log(`✅ User-agent definido`)
    } else {
      console.log(`⚠️  User-agent não encontrado`)
    }
    
    console.log(`📄 Conteúdo do robots.txt:`)
    console.log(robotsContent.split('\n').map(line => `   ${line}`).join('\n'))
    
    return true
    
  } catch (error) {
    console.log(`❌ Erro ao validar robots.txt: ${error.message}`)
    return false
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🔍 Validação de Sitemaps')
  console.log(`🌐 Site: ${SITE_URL}`)
  console.log('')
  
  // Valida robots.txt
  await validateRobots()
  console.log('')
  
  // Valida sitemap principal
  const isValid = await validateSitemap(SITEMAP_URL)
  
  if (!isValid) {
    console.log('')
    console.log('❌ Validação falhou')
    process.exit(1)
  }
  
  console.log('')
  console.log('🎉 Validação concluída com sucesso!')
}

// Executa apenas se chamado diretamente
if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Erro fatal:', error)
    process.exit(1)
  })
}

module.exports = { main, validateSitemap, validateRobots }
