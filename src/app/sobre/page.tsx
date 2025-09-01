import type { Metadata } from 'next'
import { AboutHero } from '@/components/site/about-hero'
import { AboutMission } from '@/components/site/about-mission'
import { AboutTimeline } from '@/components/site/about-timeline'
import { AboutTeam } from '@/components/site/about-team'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a Calisto A.I., empresa especializada em inteligência artificial e automação para o agronegócio em Balsas-MA. Nossa missão, visão e história.',
  keywords: [
    'Calisto AI',
    'sobre empresa',
    'Balsas MA',
    'inteligência artificial',
    'agronegócio',
    'missão',
    'visão',
    'história',
    'equipe'
  ],
  openGraph: {
    title: 'Sobre | Calisto A.I.',
    description: 'Conheça a Calisto A.I., empresa especializada em inteligência artificial e automação para o agronegócio em Balsas-MA. Nossa missão, visão e história.',
  },
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutHero />
      <AboutMission />
      <AboutTimeline />
      <AboutTeam />
    </div>
  )
}
