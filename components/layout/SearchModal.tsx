'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { Search, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SearchResultItem } from '@/app/api/search/route'

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TYPE_ORDER: SearchResultItem['type'][] = ['practice', 'case', 'post', 'service']

const TYPE_LABELS: Record<SearchResultItem['type'], string> = {
  practice: 'Практика',
  case: 'Дела',
  post: 'Блог',
  service: 'Услуги',
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setActiveIndex(-1)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results ?? [])
        setActiveIndex(-1)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false)
      router.push(href)
    },
    [onOpenChange, router],
  )

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      navigate(results[activeIndex].href)
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return
    const item = listRef.current.children[activeIndex] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  // Group results by type in defined order
  const grouped = TYPE_ORDER.reduce<Record<string, SearchResultItem[]>>((acc, type) => {
    const items = results.filter((r) => r.type === type)
    if (items.length) acc[type] = items
    return acc
  }, {})

  // Flat index for keyboard nav
  const flatResults = TYPE_ORDER.flatMap((t) => grouped[t] ?? [])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          onKeyDown={handleKeyDown}
          className="fixed left-1/2 top-[10vh] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border bg-background shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2"
        >
          <Dialog.Title className="sr-only">Поиск по сайту</Dialog.Title>

          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            {loading ? (
              <Loader2 className="w-4 h-4 shrink-0 text-muted-foreground animate-spin" />
            ) : (
              <Search className="w-4 h-4 shrink-0 text-muted-foreground" />
            )}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по сайту..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
            {query.length < 2 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                Начните вводить запрос...
              </p>
            )}

            {query.length >= 2 && !loading && results.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                Ничего не найдено по запросу «{query}»
              </p>
            )}

            {results.length > 0 && (
              <ul ref={listRef}>
                {Object.entries(grouped).map(([type, items]) => (
                  <li key={type}>
                    <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {TYPE_LABELS[type as SearchResultItem['type']]}
                    </p>
                    {items.map((item) => {
                      const flatIdx = flatResults.indexOf(item)
                      return (
                        <button
                          key={`${item.type}-${item.href}-${item.title}`}
                          onClick={() => navigate(item.href)}
                          className={cn(
                            'w-full text-left px-3 py-2.5 rounded-md transition-colors flex items-start gap-3',
                            activeIndex === flatIdx
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-muted',
                          )}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          <span className="shrink-0 mt-0.5 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            {item.badge}
                          </span>
                        </button>
                      )
                    })}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer hint */}
          {results.length > 0 && (
            <div className="border-t border-border px-4 py-2 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span><kbd className="font-sans">↑↓</kbd> навигация</span>
              <span><kbd className="font-sans">Enter</kbd> перейти</span>
              <span><kbd className="font-sans">Esc</kbd> закрыть</span>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
