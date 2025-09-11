'use client'
import { Hero } from '@/components/site/hero'
import { ServiceGrid } from '@/components/site/service-card'
import { VideoCarousel } from '@/components/site/video-carousel'
import { RegionBanner } from '@/components/site/region-banner'
import { TechStack } from '@/components/site/tech-stack'
import { services } from '@/content/services'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServiceGrid
        services={services}
        title="Serviços em Destaque"
        subtitle="Soluções completas em IA e automação para revolucionar seu negócio"
      />

      {/* Video Carousel */}
      <VideoCarousel 
        title="Vídeos em Destaque" 
        subtitle="Veja como nossas soluções de IA e automação estão transformando negócios" 
      />

      {/* Region Banner */}
      <RegionBanner mode="regional" />

      {/* Tech Stack */}
      <TechStack />
    </>
  )
}
