import Link from 'next/link'
import Image from 'next/image'
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  Send,
  ExternalLink,
  Shield
} from 'lucide-react'

import { Button } from '@/components/ui/button'

const navigation = {
  company: [
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Contato', href: '/contato' },
  ],
  services: [
    { name: 'Automação para Cartórios', href: '/servicos#automacao-cartorios' },
    { name: 'Detecção de Fogo e Fumaça', href: '/servicos#deteccao-fogo-fumaca' },
    { name: 'Integrações & Dashboards', href: '/servicos#integracoes-dashboards' },
    { name: 'Monitoramento em Tempo Real', href: '/servicos#monitoramento-tempo-real' },
  ]
}

const contactInfo = {
  email: process.env.NEXT_PUBLIC_EMAIL || 'contato@calistoai.com.br',
  phone: process.env.NEXT_PUBLIC_WHATSAPP || '+55 (99) 98853-8865',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '+559988538865',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM || '@calisto_ai',
  address: process.env.NEXT_PUBLIC_ADDRESS || 'Balsas - MA, Brasil',
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo-calisto-white.webp"
                  alt="Calisto A.I."
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">
                  Calisto A.I.
                </span>
              </div>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tecnologia que protege e melhora negócios e agiliza processos. 
              Especialistas em IA, visão computacional e automação 
              para o negócio de Balsas-MA.
            </p>

            <div className="flex items-center space-x-4">
              <Button variant="brand-outline" size="sm" asChild>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Telegram
                </a>
              </Button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-brand transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Serviços</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-brand transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-0.5 text-brand flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-brand transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 text-brand flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-muted-foreground hover:text-brand transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-brand flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {contactInfo.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>
                © {currentYear} Calisto A.I. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacidade"
                className="text-muted-foreground hover:text-brand transition-colors flex items-center"
              >
                <Shield className="w-4 h-4 mr-1" />
                LGPD
              </Link>
              
              <span className="text-muted-foreground">
                Feito com ❤️ em Balsas-MA
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
