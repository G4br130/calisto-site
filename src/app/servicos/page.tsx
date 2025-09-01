import type { Metadata } from 'next'
import { ServiceDetailView } from '@/components/site/service-detail-view'
import { services, additionalServices } from '@/content/services'

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Conheça nossos serviços especializados em IA, automação e tecnologia para o agronegócio. Automação de cartórios, detecção de incêndios, integrações e monitoramento em tempo real.',
  keywords: [
    'automação cartório',
    'detecção incêndio',
    'integrações ERP',
    'monitoramento tempo real',
    'dashboards',
    'visão computacional',
    'YOLOv8',
    'IA negócio',
    'IA agronegócio'
  ],
  openGraph: {
    title: 'Serviços | Calisto A.I.',
    description: 'Conheça nossos serviços especializados em IA, automação e tecnologia para o negócio. Automação de cartórios, detecção de incêndios, integrações e monitoramento em tempo real.',
  },
}

export default function ServicesPage() {
  const allServices = [...services, ...additionalServices]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Nossos <span className="gradient-text">Serviços</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              Soluções completas em inteligência artificial, automação e tecnologia 
              para revolucionar seu negócio e otimizar seus processos.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <ServiceDetailView services={allServices} />
    </div>
  )
}
