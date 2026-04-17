import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { PracticeContent } from '@/components/practice/PracticeContent'

export const metadata: Metadata = {
  title: 'Практика — Области специализации',
  description:
    'Основные направления адвокатской практики Мордвинцева Р.Ф.: уголовное право, гражданские споры, арбитраж, семейное и жилищное право. Реальный опыт и статистика.',
}

export default function PracticePage() {
  return (
    <>
      <PageHero
        title="Практика"
        subtitle="Направления, в которых я наиболее эффективен"
        breadcrumbs={[{ label: 'Практика' }]}
      />
      <PracticeContent />
    </>
  )
}
