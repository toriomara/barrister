'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PRACTICE_AREAS, type PracticeAreaData } from '@/lib/practice-areas'

export function PracticeAreaContent({ area }: { area: PracticeAreaData }) {
  const others = PRACTICE_AREAS.filter((a) => a.slug !== area.slug)

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {area.paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Other areas */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-xl font-bold mb-6">Другие направления практики</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {others.map((a) => (
              <Link
                key={a.slug}
                href={`/practice/${a.slug}`}
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <span className="text-sm font-medium">{a.title}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Ваше дело — в надёжных руках
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Расскажите о своей ситуации — и я найду оптимальное решение.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="gold">
              <Link href="/contacts">
                Записаться на консультацию
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-popover text-primary hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="tel:+79608670139">
                <Phone className="mr-2 w-4 h-4" />
                Позвонить
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
