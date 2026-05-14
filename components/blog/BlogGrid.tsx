'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { FILTER_LABELS, POST_CATEGORIES } from '@/lib/post-categories'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: string | null
  category?: string | null
  publishedAt?: Date | null
}

interface BlogGridProps {
  posts: Post[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? posts
    : posts.filter((p) => p.category === activeFilter)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTER_LABELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                activeFilter === key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground/70 border-border hover:border-primary/50 hover:text-foreground',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Публикации в этой категории пока не добавлены
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
                    {/* Cover */}
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 dark:from-muted dark:to-card flex items-center justify-center">
                          <span className="text-4xl">⚖️</span>
                        </div>
                      )}
                      {post.category && POST_CATEGORIES[post.category as keyof typeof POST_CATEGORIES] && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/90 text-primary-foreground">
                          {POST_CATEGORIES[post.category as keyof typeof POST_CATEGORIES]}
                        </span>
                      )}
                    </div>

                    <CardContent className="p-5">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.publishedAt)}
                        </div>
                      )}
                      <h3 className="font-serif font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-sm font-medium text-primary">
                        Читать далее
                        <ArrowRight className="ml-1 w-3.5 h-3.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
