import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { AboutPreview } from '@/components/home/AboutPreview'
import { StatsSection } from '@/components/home/StatsSection'
import { TrustSection } from '@/components/home/TrustSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { CtaSection } from '@/components/home/CtaSection'

export const metadata: Metadata = {
  title: 'Адвокат Мордвинцев Р.Ф. — Квалифицированная юридическая помощь',
  description:
    'Опытный адвокат в Москве. Уголовные дела, гражданские споры, арбитраж, семейное право. Более 15 лет практики. Запишитесь на консультацию.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <TrustSection />
      <AboutPreview />
      <ReviewsSection />
      <CtaSection />
    </>
  )
}
