'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { SafeHtml } from '@/components/shared/SafeHtml'

interface Post {
  id: string
  title: string
  content: string
  publishedAt?: Date | null
  excerpt: string
  coverImage?: string | null
}

interface PostContentProps {
  post: Post
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function PostContent({ post }: PostContentProps) {
  const readTime = estimateReadTime(post.content)

  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-sm text-muted-foreground mb-8"
          >
            {post.publishedAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime} мин. чтения
            </div>
          </motion.div>

          {/* Cover image */}
          {post.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-10 shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SafeHtml html={post.content} className="prose-content" />
          </motion.div>
        </div>
      </div>
    </article>
  )
}
