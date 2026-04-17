'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Scale, Briefcase, FileText, Users, MessageSquare, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, React.ElementType> = {
  Shield, Scale, Briefcase, FileText, Users, MessageSquare,
}

const services = [
  { icon: 'Shield', title: 'Уголовные дела', desc: 'Защита на стадии следствия и в суде', href: '/services#ugolovnye-dela' },
  { icon: 'Scale', title: 'Гражданские споры', desc: 'Взыскание долгов, недвижимость, наследство', href: '/services#grazhdanskie-spory' },
  { icon: 'Briefcase', title: 'Арбитражные дела', desc: 'Защита бизнеса в арбитражных судах', href: '/services#arbitrazhnye-dela' },
  { icon: 'FileText', title: 'Административные', desc: 'Обжалование постановлений и санкций', href: '/services#administrativnye-dela' },
  { icon: 'Users', title: 'Семейное право', desc: 'Развод, алименты, раздел имущества', href: '/services#semeynoe-pravo' },
  { icon: 'MessageSquare', title: 'Консультации', desc: 'Устные и письменные по всем вопросам', href: '/services#yuridicheskie-konsultacii' },
]

export function ServicesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="py-20 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            Направления
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Юридические услуги</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оказываю полный спектр юридической помощи. Каждое дело требует индивидуального подхода.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Shield
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={service.href}>
                  <Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary dark:text-primary" />
                      </div>
                      <h3 className="font-serif font-semibold text-lg mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              Все услуги и цены
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
