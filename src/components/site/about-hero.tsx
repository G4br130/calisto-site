'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Users, Calendar, Award } from 'lucide-react'

import { Card } from '@/components/ui/card'

export const stats = [
  { icon: Calendar, label: 'Em operação', value: 'Desde 2024', description: 'Implantação e suporte' },
  { icon: Users,    label: 'Clientes',    value: 'Carteira ativa', description: 'Atendimento dedicado' },
  { icon: Award,    label: 'Projetos',    value: 'Em produção',     description: 'Resultados mensuráveis' },
  { icon: MapPin,   label: 'Região',      value: 'Balsas-MA',       description: 'Presença local' },
]

export function AboutHero() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-3 mb-6"
            >
              <div className="p-2 bg-brand/10 rounded-lg">
                <Users className="w-6 h-6 text-brand" />
              </div>
              <span className="text-brand font-semibold">Sobre Nós</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Inovação em <span className="gradient-text">IA</span> para o
              <br />
              <span className="text-foreground">Negócio</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-muted-foreground leading-relaxed mb-8 text-balance"
            >
              Desenvolvemos soluções de IA, visão computacional e automação que eliminam tarefas repetitivas, integram sistemas e aceleram decisões em múltiplos setores.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand" />
                <span>Balsas - MA, Brasil</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Fundada em 2024</span>
            </motion.div>
          </motion.div>

          {/* Visual/Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + index * 0.1 
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="p-6 text-center hover:shadow-brand-glow/30 transition-all duration-300 bg-card/80 backdrop-blur-sm">
                      <div className="p-3 bg-brand/10 rounded-xl w-fit mx-auto mb-4">
                        <Icon className="w-6 h-6 text-brand" />
                      </div>
                      <div className="text-2xl font-bold text-brand mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.description}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Central Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                <div className="absolute inset-0 bg-brand/20 rounded-full animate-pulse" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/logo-calisto.png"
                    alt="Calisto A.I."
                    width={40}
                    height={40}
                    className="object-contain opacity-80"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
