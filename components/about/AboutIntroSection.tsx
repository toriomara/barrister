'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Target, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const helpItems = [
  'Консультации по правовым вопросам',
  'Подготовка исков, жалоб, заявлений и договоров',
  'Представительство в суде',
  'Сопровождение споров с работодателем, контрагентами, родственниками, государственными органами',
  'Анализ документов и оценка перспектив дела',
]

const approachItems = [
  'Точность и аккуратность',
  'Конфиденциальность',
  'Понятное объяснение сложных юридических вопросов',
  'Индивидуальный подход к каждому делу',
  'Максимальная защита интересов клиента',
]

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
}

export function AboutIntroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 bg-muted/20 dark:bg-muted/5">
      <div className="container mx-auto px-4">

        {/* Intro paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-3">
            О себе
          </p>
          <p className="text-foreground leading-relaxed text-base mb-4">
            Я — адвокат, специализирующийся на защите интересов клиентов в гражданских, семейных,
            трудовых и иных правовых спорах. Моя задача — не просто дать формальный ответ на
            вопрос, а найти практическое и понятное решение, которое действительно поможет в вашей
            ситуации.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base mb-4">
            В работе я опираюсь на внимательный анализ документов, оценку рисков и выстраивание
            понятной стратегии защиты. Для меня важно, чтобы клиент понимал, что происходит на
            каждом этапе: какие есть варианты, какие последствия у каждого решения и что можно
            сделать уже сейчас.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base">
            Я сопровождаю дела от первичной консультации до полного завершения процесса: помогаю
            подготовить документы, веду переговоры, представляю интересы в суде и иных
            инстанциях. При необходимости подключаюсь к делу срочно и помогаю быстро
            сориентироваться в сложной правовой ситуации.
          </p>
        </motion.div>

        {/* Three-column info blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Чем могу помочь */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={cardVariant}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4 text-primary" />
                  </div>
                  Чем я могу помочь
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {helpItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Мой подход */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={cardVariant}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  Мой подход
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {approachItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Почему обращаются */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={cardVariant}
          >
            <Card className="h-full border-primary/30 bg-primary/5 dark:bg-primary/10">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className="w-9 h-9 rounded-lg bg-primary/15 dark:bg-primary/25 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  Почему ко мне обращаются
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Клиенту важны не только знания закона, но и практический опыт, умение быстро
                  ориентироваться в ситуации и предлагать рабочие решения. Я стараюсь выстраивать
                  взаимодействие так, чтобы человек чувствовал уверенность и понимал, что его
                  вопрос находится под контролем.
                </p>
                <p className="text-sm text-foreground font-medium leading-relaxed">
                  Если вам нужна помощь адвоката — свяжитесь для консультации, вместе мы разберём
                  ситуацию и найдём оптимальный путь решения.
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
