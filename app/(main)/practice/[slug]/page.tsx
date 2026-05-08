import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/shared/PageHero'
import { PracticeAreaContent } from '@/components/practice/PracticeAreaContent'
import { PRACTICE_AREAS, getPracticeArea } from '@/lib/practice-areas'

export function generateStaticParams() {
  return PRACTICE_AREAS.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area = getPracticeArea(slug)
  if (!area) return {}
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return {
    title: `${area.title} — Адвокат Мордвинцев Р.Ф.`,
    description: area.paragraphs[0],
    openGraph: {
      title: `${area.title} — Адвокат Мордвинцев Р.Ф.`,
      description: area.paragraphs[0],
      type: 'article',
      url: `${APP_URL}/practice/${slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const area = getPracticeArea(slug)
  if (!area) notFound()

  return (
    <>
      <PageHero
        title={area.title}
        subtitle={area.subtitle}
        breadcrumbs={[
          { label: 'Практика', href: '/practice' },
          { label: area.title },
        ]}
      />
      <PracticeAreaContent area={area} />
    </>
  )
}
