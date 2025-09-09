import type { Metadata } from 'next'
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da Calisto A.I. conforme a Lei Geral de Proteção de Dados (LGPD). Saiba como protegemos seus dados pessoais.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-brand/10 rounded-lg">
                <Shield className="w-6 h-6 text-brand" />
              </div>
              <span className="text-brand font-semibold">LGPD</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Política de <span className="gradient-text">Privacidade</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-brand" />
                  Introdução
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  A Calisto A.I. está comprometida com a proteção da privacidade e dos dados pessoais de nossos usuários, 
                  clientes e visitantes, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
                </p>
                <p>
                  Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações 
                  pessoais quando você utiliza nossos serviços ou entra em contato conosco.
                </p>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-brand" />
                  Dados que Coletamos
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <h4>Dados fornecidos diretamente por você:</h4>
                <ul>
                  <li>Nome completo</li>
                  <li>Endereço de email</li>
                  <li>Número de telefone/WhatsApp</li>
                  <li>Nome da empresa (opcional)</li>
                  <li>Mensagens e comunicações</li>
                </ul>

                <h4>Dados coletados automaticamente:</h4>
                <ul>
                  <li>Endereço IP</li>
                  <li>Informações do navegador</li>
                  <li>Data e hora de acesso</li>
                  <li>Páginas visitadas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-brand" />
                  Como Utilizamos seus Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>Utilizamos seus dados pessoais para:</p>
                <ul>
                  <li>Responder às suas solicitações e dúvidas</li>
                  <li>Fornecer informações sobre nossos serviços</li>
                  <li>Realizar contato comercial autorizado</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                  <li>Proteger nossos direitos e prevenir fraudes</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Compartilhamento de Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais, 
                  exceto nas seguintes situações:
                </p>
                <ul>
                  <li>Com seu consentimento explícito</li>
                  <li>Para cumprimento de obrigações legais</li>
                  <li>Para proteção de direitos, propriedade ou segurança</li>
                  <li>Com prestadores de serviços que nos auxiliam (sob contrato de confidencialidade)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle>Segurança dos Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados:</p>
                <ul>
                  <li>Criptografia SSL/TLS para transmissão de dados</li>
                  <li>Controle de acesso restrito aos dados</li>
                  <li>Monitoramento de segurança contínuo</li>
                  <li>Backup regular e seguro dos dados</li>
                  <li>Treinamento da equipe sobre proteção de dados</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Seus Direitos</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>Conforme a LGPD, você tem os seguintes direitos:</p>
                <ul>
                  <li><strong>Acesso:</strong> Saber quais dados temos sobre você</li>
                  <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
                  <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados</li>
                  <li><strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-brand" />
                  Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco:
                </p>
                <div className="not-prose">
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-brand" />
                      <a href="mailto:contato@calistoai.com.br" className="text-brand hover:underline">
                        contato@calistoai.com.br
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-brand" />
                      <a href="tel:+5599985516617" className="text-brand hover:underline">
                        +55 (99) 98551-6617
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Alterações na Política</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você 
                  revise esta página regularmente para se manter informado sobre nossas práticas de privacidade.
                </p>
                <p>
                  Em caso de alterações significativas, notificaremos você através dos canais de comunicação 
                  disponíveis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
