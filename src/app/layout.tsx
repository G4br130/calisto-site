import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Calisto A.I. | Tecnologia aplicada ao campo e serviços inteligentes',
    template: '%s | Calisto A.I.'
  },
  description: 'Especialistas em IA, visão computacional e automação para o agronegócio. Detecção de incêndios, automação de cartórios, integrações e monitoramento em tempo real em Balsas-MA.',
  keywords: [
    'inteligência artificial',
    'negócio',
    'detecção de incêndio',
    'automação cartório',
    'visão computacional',
    'Balsas MA',
    'YOLOv8',
    'monitoramento',
    'dashboards',
    'integração ERP'
  ],
  authors: [{ name: 'Calisto A.I.', url: 'https://calisto.ai' }],
  creator: 'Calisto A.I.',
  publisher: 'Calisto A.I.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'Calisto A.I. | Tecnologia aplicada ao campo e serviços inteligentes',
    description: 'Especialistas em IA, visão computacional e automação para o negócio. Detecção de incêndios, automação de cartórios, integrações e monitoramento em tempo real em Balsas-MA.',
    siteName: 'Calisto A.I.',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'Calisto A.I. - Tecnologia aplicada ao negócio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calisto A.I. | Tecnologia aplicada ao negócio e serviços inteligentes',
    description: 'Especialistas em IA, visão computacional e automação para o negócio. Detecção de incêndios, automação de cartórios, integrações e monitoramento em tempo real em Balsas-MA.',
    images: ['/favicon.ico'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0DC9B8' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#0DC9B8',
    'theme-color': '#0DC9B8',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`,
                  name: 'Calisto A.I.',
                  url: process.env.NEXT_PUBLIC_SITE_URL,
                  logo: {
                    '@type': 'ImageObject',
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo-calisto.png`,
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: process.env.NEXT_PUBLIC_WHATSAPP,
                    contactType: 'customer service',
                    availableLanguage: 'Portuguese',
                  },
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Balsas',
                    addressRegion: 'MA',
                    addressCountry: 'BR',
                  },
                  sameAs: [
                    `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, '')}`,
                    `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM?.replace('@', '')}`,
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#website`,
                  url: process.env.NEXT_PUBLIC_SITE_URL,
                  name: 'Calisto A.I.',
                  description: 'Tecnologia aplicada ao negócio e serviços inteligentes',
                  publisher: {
                    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`,
                  },
                  inLanguage: 'pt-BR',
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
