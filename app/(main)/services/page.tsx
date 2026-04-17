import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServicesFullPage } from '@/components/services/ServicesFullPage'

export const metadata: Metadata = {
  title: 'Юридические услуги — полный спектр правовой помощи',
  description:
    'Уголовные дела, гражданские и арбитражные споры, семейное право, защита бизнеса, трудовые и жилищные споры, представление в государственных органах. Профессиональная юридическая помощь физическим и юридическим лицам.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Юридические услуги"
        subtitle="Полный спектр правовой помощи — физическим и юридическим лицам"
        breadcrumbs={[{ label: 'Услуги' }]}
      />
      <ServicesFullPage />
    </>
  )
}