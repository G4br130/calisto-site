'use client'

import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  Clock,
  ExternalLink
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const contactInfo = {
  address: {
    street: 'Av. Bernardo Sayão, 1000',
    neighborhood: 'Centro',
    city: 'Balsas',
    state: 'MA',
    zip: '65800-000',
    full: 'Balsas - MA, Brasil'
  },
  phone: '+55 (99) 98853-8865',
  email: 'contato@calistoai.com.br',
  whatsapp: '+559988538865',
  telegram: '@calisto_ai',
  hours: {
    weekdays: 'Segunda a Sexta: 8:00 - 18:00',
    saturday: 'Sábado: 8:00 - 12:00',
    sunday: 'Domingo: Plantão via WhatsApp'
  }
}

const services = [
  'Consultoria gratuita inicial',
  'Análise de requisitos',
  'Desenvolvimento de MVP',
  'Implementação completa',
  'Suporte técnico 24/7',
  'Treinamento da equipe'
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Main Contact Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="hover:shadow-brand-glow/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <MapPin className="w-5 h-5 mr-2 text-brand" />
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Address */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Endereço</h4>
              <div className="text-muted-foreground text-sm leading-relaxed">
                <p>{contactInfo.address.street}</p>
                <p>{contactInfo.address.neighborhood}</p>
                <p>{contactInfo.address.city} - {contactInfo.address.state}</p>
                <p>CEP: {contactInfo.address.zip}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <Phone className="w-4 h-4 mr-2 text-brand" />
                Telefone
              </h4>
              <a
                href={`tel:${contactInfo.phone.replace('+55', '')}`}
                className="text-muted-foreground hover:text-brand transition-colors text-sm"
              >
                {contactInfo.phone}
              </a>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <Mail className="w-4 h-4 mr-2 text-brand" />
                Email
              </h4>
              <a
                href={`mailto:${contactInfo.email.replace('+55', '')}`}
                className="text-muted-foreground hover:text-brand transition-colors text-sm"
              >
                {contactInfo.email}
              </a>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="brand" size="sm" className="flex-1" asChild>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace('+55', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="brand-outline" size="sm" className="flex-1" asChild>
                  <a
                    href={`https://t.me/${contactInfo.telegram.replace('@', '').replace('+55', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Telegram
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="hover:shadow-brand-glow/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Clock className="w-5 h-5 mr-2 text-brand" />
              Horário de Atendimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Segunda a Sexta</span>
              <span className="text-sm font-medium text-foreground">8:00 - 18:00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-border/30">
              <span className="text-sm text-muted-foreground">Sábado</span>
              <span className="text-sm font-medium text-foreground">8:00 - 12:00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-border/30">
              <span className="text-sm text-muted-foreground">Domingo</span>
              <span className="text-sm font-medium text-brand">Plantão WhatsApp</span>
            </div>
            
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">
                  Atendimento de emergência 24h via WhatsApp
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card className="hover:shadow-brand-glow/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl">O que Oferecemos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.5 + index * 0.05 
                  }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        id="mapa"
      >
        <Card className="hover:shadow-brand-glow/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              <span className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-brand" />
                Localização
              </span>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://maps.google.com/?q=Balsas,MA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-700"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Abrir no Maps
                </a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video bg-muted/50 rounded-b-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.35267428785!2d-46.11636485!3d-7.5361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9323b3a7d5b9b3b7%3A0x1a3b3b3b3b3b3b3b!2sBalsas%20-%20MA!5e0!3m2!1spt-BR!2sbr!4v1634567890123!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Calisto A.I. em Balsas-MA, Brasil"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
