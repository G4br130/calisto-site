'use client'

import { motion } from 'framer-motion'
import { MapPin, Wheat, TrendingUp, Users, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

type RegionBannerProps = {
  mode?: 'factual' | 'regional' // 'factual' = alinhado à sua empresa; 'regional' = contexto da região (com disclaimer)
  clientsCount?: number         // para factual; default = 2
}

export function RegionBanner({
  mode = 'factual',
  clientsCount = 2,
}: RegionBannerProps) {
  const factualStats = [
    {
      icon: Users,
      value: String(clientsCount),
      label: 'Clientes ativos',
      description: 'Operações em cartório e fazenda' // antes: "Cartório e fazenda"
    },
    {
      icon: Wheat,
      value: 'Balsas-MA',
      label: 'Presença local',
      description: 'Atuação no Cerrado maranhense'
    },
    {
      icon: TrendingUp,
      value: 'Implantação ágil',
      label: 'Projetos piloto',
      description: 'Evolução guiada por uso real'
    },
  ]

  // Se quiser reusar os números de contexto regional, mantenha separado e com aviso claro:
  const regionalStats = [
    { icon: Wheat,       value: '1.5M', label: 'Hectares de Soja',   description: 'Área cultivada na região' },
    { icon: TrendingUp,  value: 'R$ 8B', label: 'PIB Agropecuário',  description: 'Contribuição anual' },
    { icon: Users,       value: '100+',  label: 'Produtores',        description: 'Dados setoriais (região)' },
  ]

  const stats = mode === 'regional' ? regionalStats : factualStats

  return (
    <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230DC9B8' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-brand/10 rounded-lg">
                <MapPin className="w-6 h-6 text-brand" />
              </div>
              <span className="text-brand font-semibold">Nossa Região</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Por que <span className="gradient-text">Balsas-MA</span>?
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Estar em Balsas nos coloca perto de quem precisa resolver problemas reais — no campo,
              em cartórios e em outras organizações da região. Atuamos com automação, visão
              computacional e dados para diferentes demandas, do agronegócio às rotinas
              administrativas especializadas.
            </p>

            <p>
              Entregamos soluções sob medida: RPA e integração com sistemas/ERPs, OCR avançado
              (incluindo <strong>manuscritos</strong>) com extração estruturada, classificação e
              organização de documentos, além de monitoramento e detecção de eventos por visão
              computacional. Projetamos e evoluímos com base no uso real de cada cliente.
            </p>
          </div>

            <div className="mt-8 p-6 bg-brand/5 rounded-xl border border-brand/10">
              <h3 className="font-semibold text-brand mb-3">
                Vantagens da operação local
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Atendimento presencial sob demanda e resposta rápida',
                  'Implantação ágil com pilotos usando dados do cliente',
                  'Adaptação às particularidades regionais e aos processos internos',
                  'OCR de manuscritos, RPA e integrações com ERPs/legados',
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-brand mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon as any
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6 hover:shadow-brand-glow/30 transition-all duration-300 bg-card/80 backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-brand/10 rounded-xl">
                        <Icon className="w-6 h-6 text-brand" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-baseline space-x-2 mb-1">
                          <span className="text-2xl lg:text-3xl font-bold text-brand">
                            {stat.value}
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {stat.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}

            {/* Contexto regional opcional, sem sugerir que é métrica da empresa */}
            {mode === 'regional' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-gradient-to-br from-brand/5 to-brand/10 border-brand/20">
                  <div>
                    <h3 className="font-semibold text-brand mb-2">
                      Contexto do ecossistema regional
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A região de Balsas vive um movimento crescente de iniciativas em agro & tecnologia.
                      Acompanhamos esse ecossistema para transformar oportunidades em soluções práticas
                      para produtores, cartórios e outras organizações. <span className="italic">
                      (Os números exibidos no modo regional são setoriais, não representam a carteira da empresa.)
                      </span>
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
