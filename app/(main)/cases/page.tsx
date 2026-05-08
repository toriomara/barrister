import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { CasesFilter } from '@/components/cases/CasesFilter'

export const metadata: Metadata = {
  title: 'Судебная практика — Адвокат Мордвинцев Р.Ф.',
  description:
    'Примеры успешно завершённых дел: оправдательные приговоры, прекращение уголовного преследования, отмена административных постановлений.',
}

export default function CasesPage() {
  return (
    <>
      <PageHero
        title="Судебная практика"
        subtitle="Примеры успешно завершённых дел по уголовным и административным делам"
        breadcrumbs={[{ label: 'Судебная практика' }]}
      />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <CasesFilter />
        </div>
      </section>
    </>
  )
}
