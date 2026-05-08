'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, UserCircle2, Quote } from 'lucide-react'
import { useInView } from 'framer-motion'
import { TESTIMONIALS, type Testimonial } from '@/lib/testimonials-data'
import { cn } from '@/lib/utils'

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const initial = testimonial.name.charAt(0).toUpperCase()

  if (testimonial.avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover"
      />
    )
  }

  return (
    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 flex items-center justify-center shrink-0">
      {initial ? (
        <span className="text-lg font-semibold text-primary">{initial}</span>
      ) : (
        <UserCircle2 className="w-6 h-6 text-primary/60" />
      )}
    </div>
  )
}

const SLIDE_HEIGHT = 'min-h-[220px] sm:min-h-[190px] md:min-h-[170px]'

export function TestimonialsSlider({ items = TESTIMONIALS }: { items?: Testimonial[] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback(
    (idx: number, dir: 1 | -1) => {
      setDirection(dir)
      setCurrent((idx + items.length) % items.length)
    },
    [items.length],
  )

  const prev = () => go(current - 1, -1)
  const next = useCallback(() => go(current + 1, 1), [current, go])

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next])

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 6000)
  }

  const handlePrev = () => { prev(); resetTimer() }
  const handleNext = () => { next(); resetTimer() }
  const handleDot = (i: number) => { go(i, i > current ? 1 : -1); resetTimer() }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Отзывы
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Что говорят клиенты
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          {/* Slider card */}
          <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <Quote className="absolute top-5 right-6 w-8 h-8 text-primary/10" />

            <div className={cn('overflow-hidden', SLIDE_HEIGHT)}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex flex-col gap-4"
                >
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar testimonial={items[current]} />
                    <span className="font-semibold text-foreground">{items[current].name}</span>
                  </div>
                  {/* Text */}
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {items[current].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrows */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrev}
                aria-label="Предыдущий"
                className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    aria-label={`Отзыв ${i + 1}`}
                    className={cn(
                      'rounded-full transition-all duration-300',
                      i === current
                        ? 'w-5 h-2 bg-primary'
                        : 'w-2 h-2 bg-border hover:bg-primary/40',
                    )}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Следующий"
                className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
