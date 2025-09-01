'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Lightbulb } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const values = [
  {
    icon: Target,
    title: 'Missão',
    description:
      'Aplicar IA e automação para resolver problemas reais — do campo ao escritório — elevando eficiência, segurança e sustentabilidade em empresas e instituições.',
    color: '#0DC9B8',
  },
  {
    icon: Eye,
    title: 'Visão',
    description:
      'Ser referência em IA aplicada no Brasil, reconhecida por entregas com impacto mensurável, implantação ágil e respeito ao contexto local — de Balsas-MA para todo o país.',
    color: '#0AA596',
  },
  {
    icon: Heart,
    title: 'Valores',
    description:
      'Resultados acima de hype • Inovação contínua • Ética e transparência • Segurança e privacidade (LGPD) • Sustentabilidade • Proximidade com o cliente • Excelência com simplicidade.',
    color: '#087B73',
  },
  {
    icon: Lightbulb,
    title: 'Propósito',
    description:
      'Conectar tradição e tecnologia para transformar dados e processos em decisões melhores, respeitando o meio ambiente e potencializando pessoas e negócios.',
    color: '#065651',
  },
]

const principles = [
  {
    title: 'Inovação Contínua',
    description: 'Sempre buscando as mais avançadas tecnologias para criar soluções de ponta.'
  },
  {
    title: 'Sustentabilidade',
    description: 'Desenvolvemos soluções que respeitam e protegem o meio ambiente.'
  },
  {
    title: 'Excelência Técnica',
    description: 'Compromisso com a qualidade e precisão em cada projeto entregue.'
  },
  {
    title: 'Parceria Local',
    description: 'Conhecimento profundo da região e proximidade com nossos clientes.'
  },
  {
    title: 'Transparência',
    description: 'Comunicação clara e honesta em todos os aspectos do nosso trabalho.'
  },
  {
    title: 'Impacto Social',
    description: 'Contribuindo para o desenvolvimento econômico e social da região.'
  }
]

export function AboutMission() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Mission, Vision, Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Nossos <span className="gradient-text">Valores</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Os princípios que guiam nossa jornada na transformação do negócio 
            através da tecnologia e inovação.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-brand-glow/30 transition-all duration-300 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div 
                      className="p-4 rounded-xl w-fit mx-auto mb-4"
                      style={{ 
                        backgroundColor: `${value.color}20`,
                        color: value.color 
                      }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-muted/30 rounded-2xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Nossos <span className="gradient-text">Princípios</span>
            </h3>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Os fundamentos que orientam nossa atuação e garantem a excelência 
              em cada projeto desenvolvido.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05 
                }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-6 rounded-xl bg-background/50 border border-border/50 hover:border-brand/50 transition-all duration-300 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 group-hover:text-brand transition-colors">
                        {principle.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">
            Nossa <span className="gradient-text">História</span>
          </h3>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              A Calisto A.I. nasceu da visão de que a inteligência artificial poderia 
              revolucionar o negócio, especialmente na região de Balsas-MA, 
              conhecida como o coração da produção de grãos do Maranhão.
            </p>
            
            <p>
              Fundada por especialistas em tecnologia com profundo conhecimento do 
              setor, nossa empresa combina expertise técnica com compreensão 
              das necessidades reais dos produtores rurais.
            </p>
            
            <p>
              Desde o início, nossa missão tem sido clara: desenvolver soluções 
              tecnológicas que não apenas otimizem processos, mas também protejam 
              cultivos e contribuam para um negócio mais sustentável e produtivo.
            </p>
            
            <p className="text-brand font-medium">
              "Tecnologia que protege negócios e agiliza processos" - este é nosso 
              compromisso com cada cliente e com o futuro da economia brasileira.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
