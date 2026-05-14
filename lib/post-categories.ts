export const POST_CATEGORIES = {
  informational: 'Информационная',
  practice: 'Практика',
  faq: 'FAQ / Совет',
  local: 'Локальная',
} as const

export type PostCategory = keyof typeof POST_CATEGORIES

export const FILTER_LABELS: Array<{ key: string; label: string }> = [
  { key: 'all', label: 'Все статьи' },
  { key: 'informational', label: 'Информационные' },
  { key: 'practice', label: 'Практика' },
  { key: 'faq', label: 'FAQ / Советы' },
  { key: 'local', label: 'Локальные' },
]
