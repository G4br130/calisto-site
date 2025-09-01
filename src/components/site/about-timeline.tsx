'use client'

import { motion } from 'framer-motion'
import { Calendar, Rocket, Award, TrendingUp, Target, Users } from 'lucide-react'

export const milestones = [
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Calisto AI — Prova de Conceito',
    description: 'Início dos testes em Balsas-MA com detecção de fumaça/fogo via câmeras e alertas com evidências visuais.',
    icon: Rocket,
    achievements: [
      'MVP funcional em campo',
      'Envio de alertas com imagem',
      'Primeiros cenários validados'
    ]
  },
  {
    year: '2024',
    quarter: 'Q2',
    title: 'Piloto em Fazenda',
    description: 'Implantação assistida em ambiente real e ajustes para reduzir falsos positivos.',
    icon: Award,
    achievements: [
      'Piloto ativo em fazenda',
      'Ajustes finos por cenário',
      'Painel básico de eventos'
    ]
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'Automação Documental (Cartório)',
    description: 'Fluxos de OCR e extração estruturada, incluindo manuscritos, com validação e processamento em lote.',
    icon: TrendingUp,
    achievements: [
      'Pipeline de OCR/extração',
      'Validação de campos',
      'Processamento em lote'
    ]
  },
  {
    year: '2024',
    quarter: 'Q4',
    title: 'Primeiros Contratos Ativos',
    description: 'Carteira ativa com um cartório e uma fazenda em Balsas-MA.',
    icon: Target,
    achievements: [
      'Implantação assistida',
      'Rotina de suporte próxima',
      'Evolução guiada pelo uso'
    ]
  },
  {
    year: '2025',
    quarter: 'Q1–Q2',
    title: 'Confiabilidade & Operação',
    description: 'Refinos no monitoramento para evitar alertas duplicados e melhoria no envio de evidências e status.',
    icon: Users,
    achievements: [
      'Tracking/re-ID para reduzir duplicidade',
      'Status de detecção persistente',
      'Vídeo do início ao fim da ocorrência'
    ]
  },
  {
    year: '2025',
    quarter: 'Q3',
    title: 'Integrações & Painéis sob Demanda',
    description: 'Entregas pontuais de integrações e dashboards para clientes, mantendo foco regional.',
    icon: TrendingUp,
    achievements: [
      'Integrações e relatórios sob demanda',
      'Melhorias no site e comunicação',
      'Preparação para novos pilotos'
    ]
  }
]

export function AboutTimeline() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-brand/10 rounded-lg">
              <Calendar className="w-6 h-6 text-brand" />
            </div>
            <span className="text-brand font-semibold">Nossa Jornada</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Linha do <span className="gradient-text">Tempo</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Acompanhe os principais marcos da nossa trajetória de inovação 
            e crescimento no mercado de tecnologia para o agronegócio.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand-700 to-brand/50 transform lg:-translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={`${milestone.year}-${milestone.quarter}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1 
                  }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isEven 
                      ? 'lg:flex-row' 
                      : 'lg:flex-row-reverse'
                  } flex-col lg:space-x-0`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 lg:left-1/2 w-4 h-4 bg-brand rounded-full border-4 border-background transform lg:-translate-x-1/2 z-10 shadow-brand-glow" />

                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ml-16 lg:ml-0 ${
                    isEven ? 'lg:pr-16' : 'lg:pl-16'
                  }`}>
                    <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-border/50 hover:border-brand/50 hover:shadow-brand-glow/30 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-brand/10 rounded-xl">
                          <Icon className="w-6 h-6 text-brand" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-brand">
                            {milestone.year} • {milestone.quarter}
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            {milestone.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {milestone.description}
                      </p>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                          Principais Conquistas
                        </h4>
                        <ul className="space-y-2">
                          {milestone.achievements.map((achievement, achievementIndex) => (
                            <motion.li
                              key={achievementIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ 
                                duration: 0.4, 
                                delay: 0.2 + achievementIndex * 0.1 
                              }}
                              viewport={{ once: true }}
                              className="flex items-center space-x-3 text-sm"
                            >
                              <div className="w-1.5 h-1.5 bg-brand rounded-full flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {achievement}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for lg screens */}
                  <div className="hidden lg:block w-2/12" />
                </motion.div>
              )
            })}
          </div>

          {/* Future Goals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 lg:mt-20 relative"
          >
            <div className="absolute left-8 lg:left-1/2 w-4 h-4 bg-gradient-to-r from-brand to-brand-700 rounded-full border-4 border-background transform lg:-translate-x-1/2 z-10 animate-pulse shadow-brand-glow-lg" />
            
            <div className="ml-16 lg:ml-0 lg:max-w-2xl lg:mx-auto">
              <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-xl p-6 lg:p-8 border border-brand/20">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-brand mb-3">
                    O Futuro da Calisto A.I.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Continuamos investindo em pesquisa e desenvolvimento, expandindo 
                    nosso portfólio de soluções e fortalecendo nossa presença no 
                    mercado nacional de tecnologia para o agronegócio.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
