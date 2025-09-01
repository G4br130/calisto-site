// app/(ou src)/components/ServiceDetailView.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  FileText,
  Flame,
  BarChart3,
  Activity,
  Wrench,
  Zap,
  Shield,
  TrendingUp,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

// 🔒 Flag: só mostra tecnologias se estiver 1 (padrão: escondido)
const SHOW_TECH = process.env.NEXT_PUBLIC_SHOW_TECH === '1'

interface ServiceDetailViewProps {
  services: Service[]
  /** opcional: força exibição/ocultação por página (prioridade sobre env var) */
  showTechOverride?: boolean
}

export function ServiceDetailView({ services, showTechOverride }: ServiceDetailViewProps) {
  // prioridade para o override do componente; senão usa a env var
  const CAN_SHOW_TECH =
    typeof showTechOverride === 'boolean' ? showTechOverride : SHOW_TECH

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          {services.map((service, index) => {
            const Icon =
              iconMap[service.icon as keyof typeof iconMap] || FileText
            const isEven = index % 2 === 0

            // ✅ evita crash quando não houver technologies
            const techs = service.technologies ?? []
            const showTechCard = CAN_SHOW_TECH && techs.length > 0

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="scroll-mt-24"
              >
                <div
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Content */}
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-brand/10 rounded-xl">
                          <Icon className="w-6 h-6 text-brand" />
                        </div>
                        <Badge variant="brand" className="text-sm">
                          {service.category === 'automation' && 'Automação'}
                          {service.category === 'detection' && 'Detecção'}
                          {service.category === 'integration' && 'Integração'}
                          {service.category === 'monitoring' && 'Monitoramento'}
                          {service.category === 'support' && 'Suporte'}
                        </Badge>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        {service.title}
                      </h2>

                      <p className="text-xl text-brand/80 font-medium mb-6">
                        {service.subtitle}
                      </p>

                      <p className="text-muted-foreground leading-relaxed mb-8">
                        {service.description}
                      </p>

                      {/* Key Features */}
                      <div className="mb-8">
                        <h3 className="font-semibold text-foreground mb-4 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-brand" />
                          Principais Recursos
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {service.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.3 + featureIndex * 0.05,
                              }}
                              viewport={{ once: true }}
                              className="flex items-start space-x-3"
                            >
                              <Check className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <Button variant="brand" size="lg" className="group" asChild>
                        <Link href="/contato">
                          Solicitar Orçamento
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Info Cards */}
                  <div className={isEven ? 'lg:col-start-2' : ''}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      {/* Benefits Card */}
                      <Card className="hover:shadow-brand-glow/30 transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <TrendingUp className="w-5 h-5 mr-2 text-brand" />
                            Benefícios
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, benefitIndex) => (
                              <li
                                key={benefitIndex}
                                className="flex items-start space-x-3 text-sm"
                              >
                                <div className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">
                                  {benefit}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* 🔄 Card condicional: Stack Tecnológica OU Capacidades-chave */}
                      {showTechCard ? (
                        <Card className="hover:shadow-brand-glow/30 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                              <Shield className="w-5 h-5 mr-2 text-brand" />
                              Stack Tecnológica
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {techs.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-xs border-border hover:border-brand hover:text-brand transition-colors"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="hover:shadow-brand-glow/30 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                              <Shield className="w-5 h-5 mr-2 text-brand" />
                              Benefícios
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {service.benefits?.slice(0, 4)
                                .map((benefit) => (
                                  <Badge
                                    key={benefit}
                                    variant="outline"
                                    className="text-xs border-border"
                                  >
                                    {benefit}
                                  </Badge>
                                ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* CTA Card */}
                      <Card className="bg-brand/5 border-brand/20 hover:shadow-brand-glow/30 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <h3 className="font-semibold text-brand mb-2">
                              Interessado neste serviço?
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Entre em contato para uma consulta gratuita e
                              descubra como podemos ajudar seu negócio.
                            </p>
                            <Button variant="brand-outline" size="sm" asChild>
                              <Link href="/contato">Falar com Especialista</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>

                {/* Divider */}
                {index < services.length - 1 && (
                  <div className="mt-20 border-t border-border/50" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-border/50"
        >
          <Card className="bg-gradient-to-br from-brand/5 to-brand/10 border-brand/20">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Pronto para transformar seu negócio?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
                Nossa equipe está pronta para desenvolver a solução perfeita
                para suas necessidades específicas. Entre em contato hoje mesmo!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brand" size="lg" asChild>
                  <Link href="/contato">Solicitar Consultoria Gratuita</Link>
                </Button>
                <Button variant="brand-outline" size="lg" asChild>
                  <Link href="/sobre">Conhecer a Calisto</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
