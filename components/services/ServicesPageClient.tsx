'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Shield, ShieldCheck,
  Scale,
  Briefcase,
  FileText, ScrollText,
  Users,
  MessageSquare,
  Gavel,
  Home,
  ShoppingCart,
  Car,
  Banknote,
  Handshake,
  UserSearch,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Shield, ShieldCheck, Scale, Briefcase, FileText, ScrollText,
  Users, MessageSquare, Gavel, Home, ShoppingCart, Car,
  Banknote, Handshake, UserSearch,
  House: Home,
}

interface Service {
  id: string
  title: string
  slug: string
  description: string
  details: string | null
  icon: string | null
}

interface ServicesPageClientProps {
  services: Service[]
}

export function ServicesPageClient({ services }: ServicesPageClientProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon || 'Scale'] || Scale
            const isOpen = openId === service.id

            return (
              <motion.div
                key={service.id}
                id={service.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card
                  className={cn(
                    'overflow-hidden transition-shadow',
                    isOpen && 'shadow-lg ring-1 ring-primary/20 dark:ring-primary/20'
                  )}
                >
                  <CardContent className="p-0">
                    <button
                      className="w-full p-6 text-left flex items-start gap-4 hover:bg-muted/50 transition-colors"
                      onClick={() => setOpenId(isOpen ? null : service.id)}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary dark:text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-lg mb-1">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      {service.details && (
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-muted-foreground shrink-0 mt-1 transition-transform',
                            isOpen && 'rotate-180'
                          )}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && service.details && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0 border-t border-border">
                            <p className="text-sm text-muted-foreground leading-relaxed pt-4">
                              {service.details}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
