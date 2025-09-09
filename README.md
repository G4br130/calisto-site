# Calisto A.I. - Site Institucional

Site institucional da Calisto A.I., empresa especializada em inteligência artificial e automação para o agronegócio em Balsas-MA.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones SVG
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **NodeMailer** - Envio de emails
- **Vitest** - Framework de testes
- **ESLint + Prettier** - Linting e formatação
- **Sistema de Sitemaps Profissional** - SEO otimizado com suporte a paginação

## 🎨 Design System

### Paleta de Cores

```css
--brand: #0DC9B8 (primária)
--brand-700: #0AA596
--ink: #0B1F24
--bg: #0A0F12
--muted: #0F1A1F
```

### Identidade Visual

- **Estética**: Tecnológica, limpa e moderna
- **Efeitos**: Glow sutil e gradientes com a cor primária
- **Tema**: Dark mode por padrão com toggle para light
- **Tipografia**: Inter (Google Fonts)

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── (site)/            # Grupo de rotas do site
│   │   ├── page.tsx       # Home
│   │   ├── servicos/      # Página de serviços
│   │   ├── sobre/         # Página sobre
│   │   ├── contato/       # Página de contato
│   │   └── privacidade/   # Política de privacidade
│   ├── api/               # API Routes
│   │   └── contact/       # Endpoint de contato
│   ├── layout.tsx         # Layout raiz
│   ├── sitemap.ts         # Sitemap XML
│   └── robots.ts          # Robots.txt
├── components/
│   ├── ui/                # Componentes shadcn/ui
│   └── site/              # Componentes específicos do site
├── content/               # Dados estruturados
├── lib/                   # Utilitários e configurações
├── styles/                # Estilos globais
└── test/                  # Configuração de testes
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/calisto-site.git
cd calisto-site

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

### Configuração de Ambiente

Crie o arquivo `.env.local` com as seguintes variáveis:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Calisto A.I."

# Email Configuration (NodeMailer)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM=contato@calisto.ai
MAIL_TO=contato@calisto.ai

# Contact Information
NEXT_PUBLIC_WHATSAPP=+5599999999999
NEXT_PUBLIC_TELEGRAM=@calisto_ai
NEXT_PUBLIC_EMAIL=contato@calisto.ai
NEXT_PUBLIC_ADDRESS="Balsas - MA, Brasil"
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build e Deploy

```bash
# Build para produção
pnpm build

# Inicie o servidor de produção
pnpm start
```

## 🧪 Testes

```bash
# Execute os testes
pnpm test

# Execute os testes em modo watch
pnpm test --watch

# Execute os testes com coverage
pnpm test:coverage

# Execute os testes com interface visual
pnpm test:ui
```

## 🎯 Funcionalidades

### Páginas Implementadas

- **Home** (`/`) - Hero, serviços em destaque, região e tecnologias
- **Serviços** (`/servicos`) - Detalhamento completo dos serviços
- **Sobre** (`/sobre`) - Missão, visão, timeline e equipe
- **Contato** (`/contato`) - Formulário, informações e mapa
- **Privacidade** (`/privacidade`) - Política LGPD

### Serviços em Destaque

1. **Automação para Cartórios** - Extração inteligente de dados
2. **Detecção de Fogo e Fumaça** - Visão computacional em tempo real
3. **Integrações & Dashboards** - ERPs, Oracle, BI e relatórios
4. **Monitoramento em Tempo Real** - Agentes, alertas e mapas

### Características Técnicas

- ✅ Responsivo (mobile-first)
- ✅ SEO otimizado
- ✅ Performance otimizada
- ✅ Acessibilidade (WCAG)
- ✅ LGPD compliance
- ✅ PWA ready
- ✅ Dark/Light theme
- ✅ Animações suaves
- ✅ Rate limiting
- ✅ Validação de formulários
- ✅ Envio de emails
- ✅ Schema.org markup

## 📧 Configuração de Email

O sistema de contato usa NodeMailer para envio de emails. Configure suas credenciais SMTP:

### Gmail (recomendado)

1. Ative a autenticação de 2 fatores
2. Gere uma senha de app específica
3. Use as credenciais no `.env.local`

### Outros Provedores

Ajuste `MAIL_HOST` e `MAIL_PORT` conforme necessário.

## 🎨 Customização

### Alterando a Paleta de Cores

1. Edite as variáveis CSS em `src/styles/globals.css`
2. Atualize as cores no `tailwind.config.ts`
3. Substitua as referências nos componentes

### Substituindo o Logo

1. Substitua `/public/logo-calisto.png`
2. Atualize as referências nos componentes
3. Regenere os favicons se necessário

### Adicionando Novos Serviços

1. Edite `src/content/services.ts`
2. Adicione novos ícones se necessário
3. Os cards serão gerados automaticamente

## 🔧 Scripts Disponíveis

```bash
pnpm dev          # Desenvolvimento
pnpm build        # Build de produção
pnpm start        # Servidor de produção
pnpm lint         # Linting
pnpm lint:fix     # Fix automático de lint
pnpm format       # Formatação com Prettier
pnpm format:check # Verificação de formatação
pnpm test         # Testes
pnpm test:ui      # Testes com interface
pnpm test:coverage # Testes com coverage
```

## 📱 PWA (Progressive Web App)

O site está configurado como PWA com:

- Manifest configurado
- Service worker (automático via Next.js)
- Ícones para diferentes dispositivos
- Tema colors configurados

## 🔒 Segurança

### Implementações de Segurança

- Rate limiting na API de contato
- Validação rigorosa de dados
- Sanitização de inputs
- Headers de segurança
- Proteção contra spam/bot
- HTTPS enforced (produção)

## 📊 SEO e Analytics

### SEO Implementado

- Meta tags otimizadas
- Open Graph tags
- Twitter Cards
- Schema.org markup
- Sitemap XML
- Robots.txt
- Canonical URLs

### Para adicionar Analytics

1. Adicione o Google Analytics no `layout.tsx`
2. Configure eventos personalizados
3. Implemente tracking de conversões

## 🗺️ Sistema de Sitemaps

O projeto inclui um sistema completo de sitemaps profissionais com:

- **Geração automática** de sitemaps XML
- **Suporte a paginação** (até 50.000 URLs por arquivo)
- **Robots.txt inteligente** com controle de ambiente
- **Revalidação ISR** configurável
- **Suporte a multilíngue** (hreflang)
- **Metadados de imagem e vídeo**
- **Scripts de validação e notificação**

### 📋 Configuração Inicial

1. **Configure as variáveis de ambiente**:
   ```bash
   # Copie o arquivo de exemplo
   cp env.example .env.local
   
   # Configure pelo menos estas variáveis:
   SITE_URL=https://www.seudominio.com
   DISALLOW_INDEX=false  # true para ambientes de teste
   ```

2. **Variáveis importantes**:
   - `SITE_URL`: URL principal do site (obrigatória)
   - `DISALLOW_INDEX`: Controla indexação (true/false)
   - `API_SECRET`: Para proteger APIs de dados dinâmicos
   - `SITEMAP_REVALIDATE`: Tempo de revalidação em segundos (padrão: 3600)

### 🔧 Conectando Fontes de Dados Reais

Para conectar suas APIs e banco de dados, edite o arquivo `src/lib/sitemap/sources.ts`:

```typescript
// Exemplo para buscar posts de blog
const blogPosts = await fetch(`${baseUrl}/api/blog/posts`).then(r => r.json())
for (const post of blogPosts) {
  dynamicRoutes.push({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  })
}

// Exemplo para produtos
const products = await fetch(`${baseUrl}/api/products`).then(r => r.json())
for (const product of products) {
  dynamicRoutes.push({
    url: `${baseUrl}/produtos/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
    images: product.images?.map(img => ({
      url: img.url,
      title: product.name,
      caption: img.alt
    }))
  })
}
```

### 🚀 Scripts Disponíveis

```bash
# Testar sitemap localmente
npm run sitemap:test

# Validar formato e conteúdo
npm run sitemap:validate

# Notificar motores de busca (após deploy)
npm run sitemap:ping
```

### 📍 URLs Geradas

- **Sitemap principal**: `/sitemap.xml`
- **Sitemaps paginados**: `/sitemaps/sitemap-1.xml`, `/sitemaps/sitemap-2.xml`, etc.
- **Robots.txt**: `/robots.txt`

### 🔍 Testando Localmente

```bash
# Inicie o servidor
npm run dev

# Teste o sitemap
curl http://localhost:3010/sitemap.xml

# Ou no navegador
http://localhost:3010/sitemap.xml
http://localhost:3010/robots.txt
```

### 🌍 Suporte a Multilíngue

Para sites multilíngues, descomente e adapte o código em `sources.ts`:

```typescript
// Exemplo para português e inglês
const languages = ['pt', 'en']
staticRoutes.forEach(route => {
  route.alternates = languages.map(lang => ({
    hreflang: lang,
    href: lang === 'pt' ? route.url : `${route.url}/${lang}`
  }))
})
```

### ⚡ Performance e Limites

- **Máximo 50.000 URLs** por arquivo de sitemap
- **Paginação automática** quando necessário
- **Cache ISR** de 1 hora (configurável)
- **Geração assíncrona** para melhor performance
- **Fallback gracioso** em caso de erro

### 🐛 Troubleshooting

**Sitemap não aparece:**
- Verifique se `SITE_URL` está configurada
- Confirme que o servidor está rodando
- Teste com `npm run sitemap:validate`

**Muitas URLs:**
- O sistema automaticamente pagina em múltiplos arquivos
- Verifique `/sitemap.xml` para ver o índice

**Dados dinâmicos não aparecem:**
- Verifique as funções em `src/lib/sitemap/sources.ts`
- Teste suas APIs de dados
- Veja os logs no console durante desenvolvimento

**Em produção (Vercel):**
- Configure `SITE_URL` nas variáveis de ambiente
- Use `npm run sitemap:ping` após deploy
- Monitore os logs de função serverless

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outros Provedores

O projeto é compatível com qualquer provedor que suporte Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Calisto A.I. Todos os direitos reservados.

## 📞 Suporte

Para dúvidas ou suporte:

- **Email**: contato@calisto.ai
- **WhatsApp**: +55 (99) 99999-9999
- **Telegram**: @calisto_ai
- **Endereço**: Balsas - MA, Brasil

---

**Calisto A.I.** - Tecnologia que protege lavouras e agiliza processos 🚀
