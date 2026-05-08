'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { CASES, CATEGORY_LABELS, type CaseCategory } from '@/lib/cases-data'
import { cn } from '@/lib/utils'

const FILTERS: { value: CaseCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Все дела' },
  { value: 'criminal', label: 'Уголовные' },
  { value: 'administrative', label: 'Административные' },
]

export function CasesFilter() {
  const [active, setActive] = useState<CaseCategory | 'all'>('all')

  const filtered = active === 'all' ? CASES : CASES.filter((c) => c.category === active)

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
              active === f.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground',
            )}
          >
            {f.label}
            <span className="ml-1.5 text-xs opacity-60">
              {f.value === 'all' ? CASES.length : CASES.filter((c) => c.category === f.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'rounded-xl border bg-card p-5 flex flex-col gap-3',
                item.category === 'criminal'
                  ? 'border-l-4 border-l-destructive/50'
                  : 'border-l-4 border-l-primary/50',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span
                    className={cn(
                      'text-xs font-medium uppercase tracking-wide',
                      item.category === 'criminal'
                        ? 'text-destructive/80'
                        : 'text-primary',
                    )}
                  >
                    {CATEGORY_LABELS[item.category]}
                  </span>
                  {item.date && (
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  )}
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-full shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  {item.outcome}
                </span>
              </div>

              <p className="text-xs text-muted-foreground font-medium">{item.article}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
