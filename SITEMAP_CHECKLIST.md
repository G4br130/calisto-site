# 📋 Checklist de Validação de Sitemaps - Google Search Console

Este checklist segue rigorosamente a documentação oficial do Google para evitar todos os erros comuns reportados no Search Console.

## 🏁 Checklist Rápido - Testes Locais

### 1. Configuração Inicial
```bash
# Configure a URL base (OBRIGATÓRIO)
echo "SITE_URL=https://www.seudominio.com" >> .env.local

# Inicie o servidor
npm run dev
```

### 2. Testes Básicos com curl
```bash
# Teste robots.txt
curl -I http://localhost:3010/robots.txt
# ✅ Deve retornar: 200 OK, Content-Type: text/plain

# Teste sitemap principal
curl -I http://localhost:3010/sitemap.xml
# ✅ Deve retornar: 200 OK, Content-Type: application/xml

# Visualize conteúdo do sitemap
curl http://localhost:3010/sitemap.xml | head -20
# ✅ Deve mostrar XML válido com <?xml version="1.0" encoding="UTF-8"?>
```

### 3. Validação com Scripts Internos
```bash
# Validação completa
npm run sitemap:validate
# ✅ Deve mostrar "Validação concluída com sucesso!"

# Teste rápido
npm run sitemap:test
# ✅ Deve mostrar primeiras linhas do XML
```

## 🔍 Validações Detalhadas por Erro do Google

### ❌ "URL not allowed" / "Path mismatch"
**Causa:** URLs fora do escopo do domínio ou inconsistência de protocolo/domínio.

**Validação:**
```bash
# Verifique se todas as URLs começam com sua SITE_URL
curl http://localhost:3010/sitemap.xml | grep -o '<loc>[^<]*</loc>' | head -5
# ✅ Todas devem começar com https://www.seudominio.com
```

**Código que previne:** `normalizeUrl()` e `validateDomainConsistency()` em `utils.ts`

### ❌ "Invalid date"
**Causa:** Formato de data não conforme W3C Datetime.

**Validação:**
```bash
# Verifique formato das datas
curl http://localhost:3010/sitemap.xml | grep -o '<lastmod>[^<]*</lastmod>' | head -3
# ✅ Deve mostrar formato: 2024-01-15T10:30:45.000Z
```

**Código que previne:** `formatW3CDate()` em `utils.ts`

### ❌ "Invalid XML: too many tags"
**Causa:** Tags duplicadas dentro do mesmo `<url>`.

**Validação:**
```bash
# Conte tags por URL (deve haver exatamente 1 <loc> por <url>)
curl http://localhost:3010/sitemap.xml | grep -c '<url>'
curl http://localhost:3010/sitemap.xml | grep -c '<loc>'
# ✅ Os números devem ser iguais
```

**Código que previne:** `buildUrlEntry()` com validação em `builders.ts`

### ❌ "Unsupported format" / "Invalid XML"
**Causa:** XML malformado ou namespace incorreto.

**Validação:**
```bash
# Verifique declaração XML e namespace
curl http://localhost:3010/sitemap.xml | head -5
# ✅ Deve conter:
# <?xml version="1.0" encoding="UTF-8"?>
# <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
```

**Código que previne:** `validateSitemapXml()` em `utils.ts`

### ❌ "Too many URLs/Sitemaps"
**Causa:** Mais de 50.000 URLs por sitemap ou 50.000 sitemaps por index.

**Validação:**
```bash
# Conte URLs no sitemap
curl http://localhost:3010/sitemap.xml | grep -c '<url>'
# ✅ Deve ser ≤ 50.000

# Se for sitemap index, conte sitemaps
curl http://localhost:3010/sitemap.xml | grep -c '<sitemap>'
# ✅ Deve ser ≤ 50.000
```

**Código que previne:** `chunkUrls()` e validação de limites em `builders.ts`

### ❌ "Compression error"
**Causa:** Arquivo maior que 50MB descompactado.

**Validação:**
```bash
# Verifique tamanho do arquivo
curl http://localhost:3010/sitemap.xml | wc -c
# ✅ Deve ser < 52.428.800 bytes (50MB)
```

**Código que previne:** `validateSitemapLimits()` em `utils.ts`

### ❌ "Sitemap blocked by robots.txt"
**Causa:** robots.txt bloqueia acesso ao sitemap.

**Validação:**
```bash
# Verifique se robots.txt permite sitemap
curl http://localhost:3010/robots.txt | grep -i sitemap
# ✅ Deve mostrar: Sitemap: https://www.seudominio.com/sitemap.xml

# Verifique se não há Disallow: /sitemap
curl http://localhost:3010/robots.txt | grep -i "disallow.*sitemap"
# ✅ Não deve retornar nada
```

**Código que previne:** Lógica em `robots.txt/route.ts` que permite sitemap mesmo com DISALLOW_INDEX=true

### ❌ "Couldn't fetch"
**Causa:** Erro HTTP, timeout ou redirecionamento.

**Validação:**
```bash
# Teste resposta HTTP completa
curl -v http://localhost:3010/sitemap.xml
# ✅ Deve retornar 200 OK sem redirecionamentos
# ✅ Content-Type: application/xml; charset=utf-8
```

**Código que previne:** Headers corretos e tratamento de erro em todas as rotas

### ❌ "Nested index"
**Causa:** Sitemap index aponta para outro sitemap index.

**Validação:**
```bash
# Se houver sitemap index, verifique se não aponta para outros índices
curl http://localhost:3010/sitemap.xml | grep -i "sitemap-index\|sitemapindex"
# ✅ Não deve aparecer em <loc> tags
```

**Código que previne:** Validação em `buildSitemapIndexXml()` em `builders.ts`

### ❌ "Incomplete URL"
**Causa:** URLs no sitemap index sem protocolo ou malformadas.

**Validação:**
```bash
# Se houver sitemap index, verifique URLs dos sitemaps
curl http://localhost:3010/sitemap.xml | grep -o '<loc>[^<]*</loc>' | head -3
# ✅ Todas devem ser URLs absolutas (https://...)
```

**Código que previne:** `normalizeUrl()` para todas as URLs de sitemap

## 🎯 Testes Específicos por Funcionalidade

### Teste de Paginação (se > 50k URLs)
```bash
# Se houver muitas URLs, teste sitemap index
curl http://localhost:3010/sitemap.xml | grep -q "sitemapindex"
if [ $? -eq 0 ]; then
  echo "✅ Sitemap index detectado"
  # Teste primeiro sitemap paginado
  curl -I http://localhost:3010/sitemaps/sitemap-1.xml
  # ✅ Deve retornar 200 OK
fi
```

### Teste de Vídeos (se houver)
```bash
# Verifique namespace de vídeo
curl http://localhost:3010/sitemap.xml | grep -q "xmlns:video"
if [ $? -eq 0 ]; then
  echo "✅ Namespace de vídeo detectado"
  # Verifique campos obrigatórios
  curl http://localhost:3010/sitemap.xml | grep -A5 "<video:video>" | grep -q "video:thumbnail_loc"
  # ✅ Deve conter thumbnail_loc obrigatório
fi
```

### Teste de Imagens (se houver)
```bash
# Verifique namespace de imagem
curl http://localhost:3010/sitemap.xml | grep -q "xmlns:image"
if [ $? -eq 0 ]; then
  echo "✅ Namespace de imagem detectado"
  # Verifique estrutura
  curl http://localhost:3010/sitemap.xml | grep -A3 "<image:image>" | grep -q "image:loc"
  # ✅ Deve conter image:loc obrigatório
fi
```

### Teste de hreflang (se multilíngue)
```bash
# Verifique alternativas de idioma
curl http://localhost:3010/sitemap.xml | grep -q "hreflang"
if [ $? -eq 0 ]; then
  echo "✅ hreflang detectado"
  # Verifique namespace
  curl http://localhost:3010/sitemap.xml | grep -q "xmlns:xhtml"
  # ✅ Deve conter namespace xhtml
fi
```

## 🚀 Testes de Produção

### Antes do Deploy
```bash
# Configure variáveis de produção
export SITE_URL=https://www.seudominio.com
export DISALLOW_INDEX=false

# Build de produção
npm run build

# Teste local da build
npm run start
```

### Após Deploy
```bash
# Teste URLs de produção
curl -I https://www.seudominio.com/robots.txt
curl -I https://www.seudominio.com/sitemap.xml

# Notifique motores de busca
npm run sitemap:ping
# ✅ Deve mostrar sucessos para Google e Bing
```

## 📊 Monitoramento no Google Search Console

### 1. Submissão Inicial
1. Acesse [Google Search Console](https://search.google.com/search-console/)
2. Vá para **Sitemaps** no menu lateral
3. Adicione: `https://www.seudominio.com/sitemap.xml`
4. Clique em **Enviar**

### 2. Status Esperados
- ✅ **Success**: Sitemap processado com sucesso
- ⚠️ **Has errors**: Algumas URLs com problemas (mas sitemap funcional)
- ❌ **Couldn't fetch**: Erro crítico na busca do sitemap

### 3. Interpretação de Erros
- **URL not allowed**: Verifique `SITE_URL` e consistência de domínio
- **Invalid date**: Verifique formato W3C das datas
- **Invalid XML**: Verifique estrutura e namespaces
- **Too many URLs**: Ative paginação automática
- **Sitemap blocked**: Verifique robots.txt

### 4. URL Inspection Tool
Para debugar URLs específicas:
1. Use a ferramenta **URL Inspection**
2. Cole a URL específica
3. Verifique se está no sitemap
4. Veja status de indexação

## 🛠️ Troubleshooting Avançado

### Debug de URLs Problemáticas
```bash
# Encontre URLs que podem causar problemas
curl http://localhost:3010/sitemap.xml | grep -o '<loc>[^<]*</loc>' | while read url; do
  clean_url=$(echo $url | sed 's/<loc>//g' | sed 's/<\/loc>//g')
  status=$(curl -o /dev/null -s -w "%{http_code}" "$clean_url")
  if [ "$status" != "200" ]; then
    echo "❌ $clean_url retorna $status"
  fi
done
```

### Validação de XML com xmllint (se disponível)
```bash
# Valide estrutura XML
curl http://localhost:3010/sitemap.xml | xmllint --format -
# ✅ Deve formatar sem erros
```

### Teste de Performance
```bash
# Meça tempo de geração
time curl -o /dev/null -s http://localhost:3010/sitemap.xml
# ✅ Deve ser < 30 segundos
```

## 📝 Checklist Final

- [ ] SITE_URL configurada corretamente
- [ ] robots.txt acessível e contém linha Sitemap
- [ ] sitemap.xml retorna 200 OK com Content-Type correto
- [ ] Todas as URLs são absolutas e do mesmo domínio
- [ ] Datas em formato W3C (se presentes)
- [ ] XML bem formado com namespaces corretos
- [ ] Menos de 50.000 URLs por sitemap
- [ ] Menos de 50MB por arquivo
- [ ] Sem nested sitemap index
- [ ] Scripts de validação passam
- [ ] Teste de ping para motores de busca funciona
- [ ] Google Search Console aceita o sitemap

## 🆘 Comandos de Emergência

Se algo der errado:

```bash
# Reset completo
rm -rf .next
npm run build
npm run sitemap:validate

# Teste mínimo
curl -f http://localhost:3010/sitemap.xml > /dev/null && echo "✅ OK" || echo "❌ ERRO"

# Debug de erro específico
curl -v http://localhost:3010/sitemap.xml 2>&1 | grep -E "(HTTP|Content-Type|error)"
```
