'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  FileText, 
  Flame, 
  BarChart3, 
  Activity,
  Wrench
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Service } from '@/content/services'

const iconMap = {
  FileText,
  Flame,
  BarChart3,
  Activity,
  Wrench,
}

interface ServiceCardProps {
  service: Service
  index?: number
}


export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] || FileText

    // só mostra se NEXT_PUBLIC_SHOW_TECH=1
  const SHOW_TECH = process.env.NEXT_PUBLIC_SHOW_TECH === '1'
  const techs = service.technologies ?? []
  const showTechs = SHOW_TECH && techs.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="h-full"
    >
      <Card className="h-full flex flex-col group hover:shadow-brand-glow/50 hover:border-brand/50 transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-xl bg-brand/10 group-hover:bg-brand/20 transition-colors"
            >
              <Icon className="w-6 h-6 text-brand" />
            </motion.div>
            
            <Badge 
              variant="brand-outline" 
              className="text-xs opacity-70 group-hover:opacity-100 transition-opacity"
            >
              {service.category === 'automation' && 'Automação'}
              {service.category === 'detection' && 'Detecção'}
              {service.category === 'integration' && 'Integração'}
              {service.category === 'monitoring' && 'Monitoramento'}
              {service.category === 'support' && 'Suporte'}
            </Badge>
          </div>
          
          <CardTitle className="text-xl group-hover:text-brand transition-colors">
            {service.title}
          </CardTitle>
          
          <CardDescription className="text-brand/80 font-medium">
            {service.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-muted-foreground leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Key Features */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground/80 uppercase tracking-wide">
              Principais Recursos
            </h4>
            <ul className="space-y-2">
              {service.features.slice(0, 3).map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + featureIndex * 0.1 }}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-brand rounded-full mr-3 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
              {service.features.length > 3 && (
                <li className="text-sm text-brand/70 font-medium">
                  +{service.features.length - 3} recursos adicionais
                </li>
              )}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t border-border/50">
          <div className="w-full space-y-4">
            {/* Technologies (condicional) */}
            {showTechs && (
              <div className="flex flex-wrap gap-2">
                {techs.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {techs.length > 3 && (
                  <span className="px-2 py-1 bg-brand/10 text-brand text-xs rounded-md">
                    +{techs.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <Button variant="brand-outline" className="w-full group/btn" asChild>
              <Link href={`/servicos#${service.id}`}>
                Saiba Mais
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface ServiceGridProps {
  services: Service[]
  title?: string
  subtitle?: string
}

export function ServiceGrid({ services, title, subtitle }: ServiceGridProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
