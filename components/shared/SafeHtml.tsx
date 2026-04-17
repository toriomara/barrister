'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface SafeHtmlProps {
  html: string
  className?: string
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const [sanitized, setSanitized] = useState('')

  useEffect(() => {
    // Dynamic import of DOMPurify (client-side only)
    import('dompurify').then((DOMPurify) => {
      const clean = DOMPurify.default.sanitize(html, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's',
          'ul', 'ol', 'li',
          'a', 'blockquote', 'code', 'pre',
          'img', 'hr', 'figure', 'figcaption',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'mark', 'span', 'div',
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel', 'style'],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      })
      setSanitized(clean)
    })
  }, [html])

  if (!sanitized) {
    // Fallback: render raw but strip scripts (SSR-safe)
    const stripped = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    return <div className={cn(className)} dangerouslySetInnerHTML={{ __html: stripped }} />
  }

  return <div className={cn(className)} dangerouslySetInnerHTML={{ __html: sanitized }} />
}
