export interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  benefits: string[]
  technologies?: string[]   // opcional
  icon: string
  category: 'automation' | 'detection' | 'integration' | 'monitoring' | 'support'
}

export const services: Service[] = [
  {
    id: 'automacao-cartorios',
    title: 'Automação para Cartórios',
    subtitle: 'Extração inteligente de dados',
    description: 'Automatizamos rotinas documentais com extração estruturada, validações e integração aos sistemas do cartório, reduzindo tempo e erros em processos repetitivos.',
    features: [
      'Extração automática de dados (inclusive manuscritos)',
      'Validação e padronização de campos',
      'Classificação e organização documental',
      'Integração com sistemas existentes',
      'Processamento em lote e auditoria'
    ],
    benefits: [
      'Grande redução no tempo de processamento',
      'Menos erros e retrabalho',
      'Equipes mais produtivas',
      'Conformidade operacional',
      'Escalabilidade conforme a demanda'
    ],
    icon: 'FileText',
    category: 'automation'
  },
  {
    id: 'deteccao-fogo-fumaca',
    title: 'Detecção de Fogo e Fumaça',
    subtitle: 'Visão computacional em tempo real',
    description: 'Detecção antecipada de fumaça/incêndio em áreas rurais com monitoramento contínuo e alertas para resposta rápida.',
    features: [
      'Monitoramento contínuo',
      'Alertas multi-canal',
      'Acompanhamento por evidências visuais',
      'Ajustes finos ao ambiente local',
      'Painel de eventos e histórico'
    ],
    benefits: [
      'Resposta mais rápida a incidentes',
      'Proteção de ativos e cultivos',
      'Redução de perdas operacionais',
      'Visibilidade centralizada',
      'Escalonamento conforme a área'
    ],
    icon: 'Flame',
    category: 'detection'
  },
  {
    id: 'integracoes-dashboards',
    title: 'Integrações & Dashboards',
    subtitle: 'Dados unificados para decisão',
    description: 'Conectamos sistemas e construímos painéis para transformar dados dispersos em indicadores acionáveis.',
    features: [
      'Integração com ERPs e bases legadas',
      'Dashboards interativos',
      'Relatórios automatizados',
      'Camadas de API seguras',
      'Modelos preditivos sob demanda'
    ],
    benefits: [
      'Visão única do negócio',
      'Decisões baseadas em dados',
      'Automação de relatórios',
      'Menos silos de informação',
      'ROI mensurável'
    ],
    icon: 'BarChart3',
    category: 'integration'
  },
  {
    id: 'monitoramento-tempo-real',
    title: 'Monitoramento em Tempo Real',
    subtitle: 'Agentes, alertas e mapas',
    description: 'Plataforma de monitoramento com agentes, geolocalização e alertas para operação contínua.',
    features: [
      'Agentes autônomos de monitoramento',
      'Alertas por canais oficiais',
      'Mapas e telemetria',
      'Dashboard de status',
      'Histórico e trilha de auditoria'
    ],
    benefits: [
      'Visibilidade operacional',
      'Resposta imediata',
      'Menos downtime',
      'Uso eficiente de recursos',
      'Controle remoto'
    ],
    icon: 'Activity',
    category: 'monitoring'
  }
]

export const additionalServices = [
  {
    id: 'implantacao-suporte',
    title: 'Implantação & Suporte',
    subtitle: 'Acompanhamento completo',
    description: 'Planejamento, implantação assistida, treinamento e suporte contínuo para maximizar resultados.',
    features: [
      'Levantamento de requisitos',
      'Pilotos e implantação assistida',
      'Treinamento de equipe',
      'Suporte técnico (plantão sob demanda)',
      'Manutenção preventiva e evolutiva',
      'Melhorias contínuas'
    ],
    benefits: [
      'Entrada em produção segura',
      'Time capacitado',
      'Menos riscos operacionais',
      'Resultados sustentáveis',
      'Evolução baseada em uso real'
    ],
    icon: 'Wrench',
    category: 'support' as const
  }
]

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id)
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return services.filter(service => service.category === category)
}
