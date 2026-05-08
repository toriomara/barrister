'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HIGHLIGHTED_CASES, CATEGORY_LABELS } from '@/lib/cases-data'
import { cn } from '@/lib/utils'

export function CasesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Из практики
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Успешные дела
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/cases">
                Все дела <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HIGHLIGHTED_CASES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className={cn(
                'rounded-xl border bg-card p-5 flex flex-col gap-3',
                item.category === 'criminal'
                  ? 'border-l-4 border-l-destructive/50'
                  : 'border-l-4 border-l-primary/50',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={cn(
                      'text-xs font-medium uppercase tracking-wide',
                      item.category === 'criminal' ? 'text-destructive/80' : 'text-primary',
                    )}
                  >
                    {CATEGORY_LABELS[item.category]}
                  </span>
                  {item.date && (
                    <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                  )}
                </div>
              </div>

              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full w-fit">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                {item.outcome}
              </span>

              <p className="text-xs text-muted-foreground font-medium">{item.article}</p>
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-4">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
