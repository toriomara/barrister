'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { platformReviews } from '@/lib/reviews-config'

const logos: Record<string, React.ReactNode> = {
  'Яндекс Карты': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#FC3F1D"/>
      <path d="M13.44 6.2h-1.08c-1.92 0-2.94.96-2.94 2.4 0 1.32.6 2.04 1.8 2.88l1.02.72-2.88 4.68H7.5l2.64-4.26C8.82 11.7 8.1 10.68 8.1 9.12c0-2.1 1.44-3.48 4.26-3.48H15v10.32h-1.56V6.2z" fill="#fff"/>
    </svg>
  ),
  '2ГИС': (
    <svg viewBox="0 0 40 40" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1BA049"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">2ГИС</text>
    </svg>
  ),
  'Harant.ru': (
    <svg viewBox="0 0 40 40" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#2563EB"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">HAR</text>
    </svg>
  ),
  '9111.ru': (
    <svg viewBox="0 0 40 40" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#E53E3E"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">9111</text>
    </svg>
  ),
  'Zoon.ru': (
    <svg viewBox="0 0 40 40" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#FF6B00"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">ZOON</text>
    </svg>
  ),
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i <= Math.round(rating) ? '#F59E0B' : 'none'}
          stroke={i <= Math.round(rating) ? '#F59E0B' : '#D1D5DB'}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            Оценки в агрегаторах
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Доверители рекомендуют — убедитесь сами на независимых платформах
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {platformReviews.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card className="h-full hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                      {logos[p.name]}
                    </div>
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-3xl font-bold font-serif">{p.rating.toFixed(1)}</div>
                    <StarRating rating={p.rating} />
                    <div className="text-xs text-muted-foreground">{p.reviews} отзывов</div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
