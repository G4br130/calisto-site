'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Shield, Zap, Target } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: 'Em operação', value: 'Desde 2024', icon: Target, description: 'Evolução contínua' },
  { label: 'Clientes', value: 'Carteira ativa', icon: Shield, description: 'Atendimento dedicado' },
  { label: 'Implantações', value: 'Em produção', icon: Zap, description: 'Casos reais: cartório e fazendas' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex mb-6"
            >
              <Badge variant="brand" className="px-4 py-2 text-sm">
                Inovação em IA para o Negócio
              </Badge>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center lg:justify-start mb-8"
            >
              <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                <Image
                  src="/logo-calisto-white.webp"
                  alt="Calisto A.I."
                  fill
                  className="object-contain pointer-events-none select-none
               [filter:drop-shadow(0_0_12px_rgba(13,201,184,.55))_drop-shadow(0_0_24px_rgba(13,201,184,.25))]"
                  priority
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Calisto A.I.</span>
              <br />
              <span className="text-foreground">
                Protege & Automatiza
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed text-balance"
            >
              Tecnologia aplicada ao negócio e serviços inteligentes.
              <br />
              <span className="text-brand font-medium">
                Tecnologia que protege negócios e agiliza processos.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                variant="brand"
                size="lg"
                className="group shadow-brand-glow hover:shadow-brand-glow-lg animate-glow"
                asChild
              >
                <Link href="/contato">
                  Falar com a Calisto
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                variant="brand-outline"
                size="lg"
                className="group"
                asChild
              >
                <Link href="/servicos">
                  <Play className="mr-2 h-4 w-4" />
                  Conhecer Serviços
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-6 md:gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start mb-2">
                      <Icon className="w-5 h-5 text-brand mr-2" />
                      <span className="text-2md md:text-3md font-bold text-brand">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border border-brand/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 border border-brand/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 border border-brand/40 rounded-full"
              />

              {/* Central Content */}
              <div className="absolute inset-12 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                  className="w-full h-full bg-brand/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-brand/20"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-brand/20 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-brand rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-brand">IA Ativa</p>
                      <p className="text-xs text-muted-foreground">
                        Monitorando 24/7
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              {[
                { icon: '🔥', position: 'top-0 right-8', delay: 0 },
                { icon: '📊', position: 'bottom-8 left-0', delay: 1 },
                { icon: '🤖', position: 'top-8 left-8', delay: 2 },
                { icon: '📱', position: 'bottom-0 right-0', delay: 3 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.2 + item.delay * 0.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 4
                  }}
                  className={`absolute ${item.position} w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-lg shadow-lg`}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-brand/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-brand rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
