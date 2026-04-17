'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Review {
  id: number
  name: string
  initials: string
  avatarColor: string
  position: string
  rating: number
  text: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Андрей Михайлов',
    initials: 'АМ',
    avatarColor: 'bg-primary',
    position: 'Клиент по уголовному делу',
    rating: 5,
    text: 'Профессиональный подход и глубокое знание закона позволили добиться оправдательного приговора. Адвокат вёл дело чётко, всегда был на связи и объяснял каждый шаг. Безмерно благодарен за защиту.',
  },
  {
    id: 2,
    name: 'Елена Соколова',
    initials: 'ЕС',
    avatarColor: 'bg-navy',
    position: 'Клиент по семейному спору',
    rating: 5,
    text: 'Помогли разрешить сложный спор о разделе имущества в мою пользу. Всё грамотно, без лишних эмоций — только факты и закон. Очень довольна результатом и отношением к клиенту.',
  },
  {
    id: 3,
    name: 'ООО «Стройгрупп»',
    initials: 'СГ',
    avatarColor: 'bg-gold',
    position: 'Корпоративный клиент',
    rating: 5,
    text: 'Оказывают юридическое сопровождение нашего бизнеса уже несколько лет. Всегда оперативная реакция, чёткие рекомендации и надёжная защита интересов компании в судах и переговорах.',
  },
  {
    id: 4,
    name: 'Игорь Петренко',
    initials: 'ИП',
    avatarColor: 'bg-primary',
    position: 'Клиент по административному делу',
    rating: 5,
    text: 'Обратился с административным нарушением — думал, всё пропало. Адвокат нашёл процессуальные нарушения со стороны обвинения и дело было прекращено. Настоящий профессионал.',
  },
  {
    id: 5,
    name: 'Наталья Воронова',
    initials: 'НВ',
    avatarColor: 'bg-navy',
    position: 'Клиент по гражданскому делу',
    rating: 5,
    text: 'Помогли взыскать долг с недобросовестного застройщика. Процесс занял несколько месяцев, но результат превзошёл ожидания. Чувствовалась полная уверенность в каждом действии.',
  },
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export function ReviewsSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1)
    setCurrent(next)
  }
  const prev = () => go((current - 1 + reviews.length) % reviews.length)
  const next = () => go((current + 1) % reviews.length)

  const review = reviews[current]

  return (
    <section ref={ref} className="py-16 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            Отзывы клиентов
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Что говорят клиенты</h2>
        </motion.div>

        {/* Slider row */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Предыдущий отзыв"
            className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Card area */}
          <div className="flex-1 overflow-hidden relative min-h-[280px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full"
              >
                <Card>
                  <CardContent className="p-6 md:p-8">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i < review.rating
                              ? 'text-gold fill-gold'
                              : 'text-muted-foreground'
                          )}
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0',
                          review.avatarColor
                        )}
                      >
                        {review.initials}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{review.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {review.position}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Следующий отзыв"
            className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Отзыв ${i + 1}`}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-colors',
                i === current
                  ? 'bg-primary'
                  : 'bg-muted-foreground/25 hover:bg-muted-foreground/50'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
