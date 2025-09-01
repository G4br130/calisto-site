import type { Metadata } from 'next'
import { ContactHero } from '@/components/site/contact-hero'
import { ContactInfo } from '@/components/site/contact-info'
import { ContactForm } from '@/components/site/contact-form'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a Calisto A.I. para saber mais sobre nossas soluções em IA e automação para o negócio. Atendimento especializado em Balsas-MA.',
  keywords: [
    'contato Calisto AI',
    'orçamento',
    'consultoria',
    'Balsas MA',
    'WhatsApp',
    'Telegram',
    'email',
    'atendimento'
  ],
  openGraph: {
    title: 'Contato | Calisto A.I.',
    description: 'Entre em contato com a Calisto A.I. para saber mais sobre nossas soluções em IA e automação para o negócio. Atendimento especializado em Balsas-MA.',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactHero />
      
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <ContactInfo />
            
            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
