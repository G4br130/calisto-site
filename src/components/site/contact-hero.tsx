'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

export function ContactHero() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 mb-6"
          >
            <div className="p-2 bg-brand/10 rounded-lg">
              <MessageCircle className="w-6 h-6 text-brand" />
            </div>
            <Badge variant="brand" className="text-sm">
              🚀 Consultoria Gratuita Disponível
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            Vamos <span className="gradient-text">Conversar</span>?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-muted-foreground leading-relaxed mb-12 text-balance"
          >
            Entre em contato conosco para descobrir como a Calisto A.I. pode 
            transformar seu negócio com soluções inteligentes e inovadoras.
          </motion.p>

          {/* Quick Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Phone,
                title: 'Telefone',
                value: '+55 (99) 98853-8865',
                href: 'tel:+559988538865',
                color: '#0DC9B8'
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                value: 'Chat Direto',
                href: 'https://wa.me/559988538865',
                color: '#0AA596'
              },
              {
                icon: Mail,
                title: 'Email',
                value: 'contato@calistoai.com.br',
                href: 'mailto:contato@calistoai.com.br',
                color: '#087B73'
              },
              {
                icon: MapPin,
                title: 'Localização',
                value: 'Balsas - MA',
                href: '#mapa',
                color: '#065651'
              }
            ].map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.a
                  key={contact.title}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + index * 0.1 
                  }}
                  whileHover={{ y: -5 }}
                  className="group p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 hover:border-brand/50 hover:shadow-brand-glow/30 transition-all duration-300"
                >
                  <div 
                    className="p-3 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform"
                    style={{ 
                      backgroundColor: `${contact.color}20`,
                      color: contact.color 
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-brand transition-colors">
                      {contact.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 p-6 bg-brand/5 rounded-xl border border-brand/10 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  Atendimento Online
                </span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span className="text-sm text-muted-foreground">
                Resposta em até 2 horas
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
