'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/site/theme-toggle'

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-effect shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/logo-calisto-white.webp"
                alt="Calisto A.I."
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-bold gradient-text">
                Calisto
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200 hover:text-brand',
                  pathname === item.href
                    ? 'text-brand'
                    : 'text-foreground/80'
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="brand" asChild>
              <Link href="/contato">
                <Phone className="w-4 h-4 mr-2" />
                Falar com a Calisto
              </Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-2">
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 pb-6 border-b border-border">
                    <div className="relative w-10 h-10">
                      <Image
                        src="/logo-calisto-white.webp"
                        alt="Calisto A.I."
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xl font-bold gradient-text">
                      Calisto
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4 py-6 flex-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'text-lg font-medium py-2 px-4 rounded-lg transition-all duration-200',
                          pathname === item.href
                            ? 'text-brand bg-brand/10'
                            : 'text-foreground/80 hover:text-brand hover:bg-brand/5'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Contact Info */}
                  <div className="pt-6 border-t border-border">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>+55 (99) 98853-8865</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>contato@calistoai.com.br</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>Balsas - MA, Brasil</span>
                      </div>
                    </div>
                    
                    <Button variant="brand" className="w-full mt-6" asChild>
                      <Link 
                        href="/contato"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Falar com a Calisto
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
