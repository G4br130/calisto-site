'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Code, Brain, Shield, ArrowRight, Database, Cog, Headphones, LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type TeamArea = {
  icon: LucideIcon
  title: string
  description: string
  color: string // ideal: mover para tokens (ex.: var(--brand-500))
}

const teamAreas: TeamArea[] = [
  {
    icon: Brain,
    title: 'Inteligência Artificial',
    description: 'Entusiastas em IA aplicada, visão computacional e aprendizado de máquina para resolver problemas reais.',
    color: '#0DC9B8'
  },
  {
    icon: Code,
    title: 'Desenvolvimento',
    description: 'Construção de soluções escaláveis (APIs, apps e painéis) com foco em confiabilidade e evolução contínua.',
    color: '#0AA596'
  },
  {
    icon: Database,
    title: 'Integrações & Dados',
    description: 'Unificação de fontes, automação de fluxos e indicadores para decisões mais rápidas e seguras.',
    color: '#0AA596'
  },
  {
    icon: Cog,
    title: 'Automação & RPA',
    description: 'Robôs de processos e orquestração para reduzir tarefas repetitivas e aumentar a produtividade.',
    color: '#089287'
  },
  {
    icon: Shield,
    title: 'Segurança & Infra',
    description: 'Boas práticas de segurança, monitoramento e operação em nuvem alinhadas ao crescimento do cliente.',
    color: '#087B73'
  },
  {
    icon: Headphones,
    title: 'Implantação & Suporte',
    description: 'Pilotos assistidos, treinamento e acompanhamento próximo para garantir adoção e resultados.',
    color: '#066A64'
  }
]

const values = [
  {
    title: 'Experiência Diversificada',
    description: 'Nossa equipe combina profissionais com experiência em grandes empresas de tecnologia e conhecimento profundo do agronegócio regional.'
  },
  {
    title: 'Formação Continuada',
    description: 'Investimos constantemente na capacitação da nossa equipe, mantendo-nos atualizados com as mais recentes inovações tecnológicas.'
  },
  {
    title: 'Paixão por Inovação',
    description: 'Cada membro da nossa equipe compartilha a paixão por criar soluções que fazem a diferença no dia a dia dos nossos clientes.'
  },
  {
    title: 'Compromisso Local',
    description: 'Vivemos e trabalhamos na região, conhecendo de perto os desafios e oportunidades do agronegócio local.'
  }
]

export function AboutTeam() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-brand/10 rounded-lg">
              <Users className="w-6 h-6 text-brand" />
            </div>
            <span className="text-brand font-semibold">Nossa Equipe</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Talentos <span className="gradient-text">Especializados</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Uma equipe multidisciplinar de especialistas apaixonados por tecnologia 
            e comprometidos com a excelência em cada projeto.
          </p>
        </motion.div>

        {/* Team Areas */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {teamAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <motion.div
                key={area.title}
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
                  <CardContent className="p-6 lg:p-8">
                    <div 
                      className="p-4 rounded-xl w-fit mb-6"
                      style={{ 
                        backgroundColor: `${area.color}20`,
                        color: area.color 
                      }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {area.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Team Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-muted/30 rounded-2xl p-8 lg:p-12 mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              O que nos <span className="gradient-text">Diferencia</span>
            </h3>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Nossa equipe é formada por profissionais que combinam excelência 
              técnica com profundo conhecimento do mercado local.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-brand/5 to-brand/10 border-brand/20 max-w-2xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-brand mb-4">
                Fale com a Calisto
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Conte rapidamente seu cenário e receba uma orientação inicial sem custo.
                Atendemos empresas, cartórios e operações em diferentes setores.
              </p>

              {/* Contatos rápidos */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand" aria-hidden="true"><title>Telefone</title></svg>
                  <a
                    href="https://wa.me/5599988538865?text=Ol%C3%A1%20Calisto!%20Quero%20falar%20sobre%20uma%20solu%C3%A7%C3%A3o."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline-offset-2 hover:underline"
                  >
                    (99) 9 8853-8865
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand" aria-hidden="true"><title>E-mail</title></svg>
                  <a
                    href="mailto:contato@calistoai.com.br?subject=Contato%20-%20Site%20Calisto&body=Oi%2C%20preciso%20de%20ajuda%20com..."
                    className="text-sm underline-offset-2 hover:underline"
                  >
                    contato@calistoai.com.br
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand" aria-hidden="true"><title>Horário</title></svg>
                  <span className="text-sm text-muted-foreground">
                    Seg–Sex, 9h–18h
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brand" asChild>
                  <a
                    href="https://wa.me/5599988538865?text=Ol%C3%A1%20Calisto!%20Quero%20falar%20sobre%20uma%20solu%C3%A7%C3%A3o."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir WhatsApp"
                    className="inline-flex items-center"
                  >
                    Falar no WhatsApp
                    <span className="ml-2">💬</span>
                  </a>
                </Button>

                <Button variant="brand-outline" asChild>
                  <a
                    href="mailto:contato@calistoai.com.br?subject=Contato%20-%20Site%20Calisto&body=Oi%2C%20preciso%20de%20ajuda%20com..."
                    aria-label="Enviar e-mail"
                    className="inline-flex items-center"
                  >
                    Enviar E-mail
                  </a>
                </Button>

                <Button variant="ghost" asChild>
                  <Link href="/contato" aria-label="Ir para a página de contato">
                    Página de Contato
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
