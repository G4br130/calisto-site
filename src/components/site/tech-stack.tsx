'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Database, 
  Eye, 
  Zap, 
  Cloud,
  Shield,
  BarChart,
  Cpu,
  LucideIcon,
  Brain,
  Cog,
  Headphones,
  BarChart3
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


export type Capability = {
  category: string
  icon: LucideIcon
  color: string          // pode trocar por token da marca
  tagline: string        // frase curta
  weDo: string[]         // o que fazemos (sem citar libs)
  outcomes: string[]     // resultados/benefícios
  bestFor: string[]      // onde se aplica
}

export const capabilities: Capability[] = [
  {
    category: 'IA Aplicada',
    icon: Brain,
    color: '#0DC9B8',
    tagline: 'Visão computacional e OCR para problemas reais',
    weDo: [
      'OCR (inclui manuscritos) e extração de campos',
      'Classificação e organização de documentos',
      'Detecção de eventos em vídeo/imagens'
    ],
    outcomes: [
      'Menos retrabalho e erros',
      'Decisões mais rápidas com evidências',
      'Padronização e auditoria'
    ],
    bestFor: ['Cartórios', 'Operações administrativas', 'Fazendas']
  },
  {
    category: 'Automação & RPA',
    icon: Cog,
    color: '#0AA596',
    tagline: 'Robôs de processo e integração de rotinas',
    weDo: [
      'Automação de tarefas repetitivas',
      'Coleta, validação e lançamento de dados',
      'Fluxos com regras e checkpoints'
    ],
    outcomes: [
      'Tempo de ciclo menor',
      'Equipe focada no que importa',
      'Rastreabilidade completa'
    ],
    bestFor: ['Cartórios', 'Back-office', 'Operações de campo']
  },
  {
    category: 'Integrações & Dados',
    icon: Database,
    color: '#087B73',
    tagline: 'Seu dado, limpo e utilizável',
    weDo: [
      'Integração com ERPs/legados',
      'ETL/ELT e padronização',
      'Relatórios e indicadores'
    ],
    outcomes: [
      'Visão única do negócio',
      'Relatórios automáticos',
      'Qualidade e consistência'
    ],
    bestFor: ['Diretoria', 'Financeiro', 'Operações']
  },
  {
    category: 'Monitoramento & Alertas',
    icon: BarChart3,
    color: '#043A38',
    tagline: 'Acompanhe o que importa em tempo real',
    weDo: [
      'Status e telemetria em painéis',
      'Alertas por canais oficiais',
      'Histórico e trilhas de auditoria'
    ],
    outcomes: [
      'Resposta rápida a incidentes',
      'Redução de downtime',
      'Transparência operacional'
    ],
    bestFor: ['Operações', 'Segurança patrimonial', 'Times de campo']
  },
  {
    category: 'Cloud & Operações',
    icon: Cloud,
    color: '#065651',
    tagline: 'Implantações confiáveis e observáveis',
    weDo: [
      'Versionamento e entrega contínua',
      'Backups e recuperação',
      'Observabilidade (métricas, logs, tracing)'
    ],
    outcomes: [
      'Menos risco em produção',
      'Evolução contínua',
      'Custos sob controle'
    ],
    bestFor: ['Ambientes produtivos', 'Pilotos e POCs', 'Operações críticas']
  },
  {
    category: 'Segurança & Conformidade',
    icon: Shield,
    color: '#032F2D',
    tagline: 'Boas práticas e privacidade desde o início',
    weDo: [
      'Gestão de acessos e permissões',
      'Criptografia em trânsito e repouso',
      'Políticas alinhadas à LGPD'
    ],
    outcomes: [
      'Confiança e conformidade',
      'Redução de exposição',
      'Governança de dados'
    ],
    bestFor: ['Dados sensíveis', 'Documentos oficiais', 'Ambientes multiusuário']
  },
  {
    category: 'Implantação & Suporte',
    icon: Headphones,
    color: '#066A64',
    tagline: 'Adoção assistida e evolução por uso real',
    weDo: [
      'Pilotos com dados do cliente',
      'Treinamento e handover',
      'Suporte próximo (plantão sob demanda)'
    ],
    outcomes: [
      'Entrada em produção segura',
      'Time capacitado',
      'Resultados sustentáveis'
    ],
    bestFor: ['Novos projetos', 'Escalonamento', 'Melhorias contínuas']
  }
]

const certifications = []

export function TechStack() {
  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230DC9B8' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
              <Cpu className="w-6 h-6 text-brand" />
            </div>
            <span className="text-brand font-semibold">Como Atuamos</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Como Atuamos
          </h2>

          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Como atuamos para resolver problemas reais
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-brand-glow/30 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    {/* Header do card */}
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${cap.color}20`, color: cap.color }}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <h3 className="font-semibold text-foreground">{cap.category}</h3>
                    </div>
                    {cap.tagline && (
                      <p className="text-sm text-brand/80 mb-4">{cap.tagline}</p>
                    )}

                    {/* O que fazemos / Resultados */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">O que fazemos</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {cap.weDo.map((t) => (
                            <li key={t}>• {t}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Resultados</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {cap.outcomes.map((t) => (
                            <li key={t}>• {t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Indicada para */}
                    {cap.bestFor?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cap.bestFor.map((b) => (
                          <Badge key={b} variant="outline" className="text-xs border-border">
                            {b}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
