'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Scale, Shield, Users, Lock, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const missionItems = [
  {
    number: 1,
    icon: Scale,
    title: 'Справедливость',
    description:
      'Стремлюсь обеспечить справедливое рассмотрение дел, выступая на стороне закона и помогая клиентам отстаивать их права в любых правовых спорах.',
  },
  {
    number: 2,
    icon: Shield,
    title: 'Правовая защита',
    description:
      'Главная задача — защищать интересы клиента, будь то в суде, при заключении сделок или в других правовых ситуациях. Это включает подготовку документов, консультации и представительство.',
  },
  {
    number: 3,
    icon: Users,
    title: 'Доступ к правосудию',
    description:
      'Содействую тому, чтобы каждый мой клиент имел возможность получить квалифицированную юридическую помощь, независимо от своего положения или обстоятельств.',
  },
  {
    number: 4,
    icon: Lock,
    title: 'Этика и конфиденциальность',
    description:
      'Соблюдение профессиональной этики и сохранение адвокатской тайны — обязательные элементы моей работы, гарантирующие клиенту безопасность и доверие.',
  },
  {
    number: 5,
    icon: BookOpen,
    title: 'Правовая культура',
    description:
      'Не только решаю конкретные дела, но и способствую формированию правовой грамотности в обществе, объясняя гражданам их права и обязанности.',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

export function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            Принципы работы
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Миссия</h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            Моя глобальная цель заключается в защите прав, свобод и законных интересов граждан
            и организаций
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {missionItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.number}
                custom={i}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={cardVariant}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-4xl font-serif font-bold text-gold/30 dark:text-gold/20 leading-none">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="font-serif font-semibold text-sm mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
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
