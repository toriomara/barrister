const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const YEARS = new Date().getFullYear() - 2008

const schema = {
  '@context': 'https://schema.org',
  '@type': ['LegalService', 'LocalBusiness'],
  name: 'Адвокат Мордвинцев Роман Фёдорович',
  description: `Профессиональная юридическая помощь по уголовным, гражданским и административным делам. Более ${YEARS} лет успешной практики.`,
  url: APP_URL,
  telephone: '+79608670139',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Волгоград',
    addressRegion: 'Волгоградская область',
    addressCountry: 'RU',
  },
  areaServed: {
    '@type': 'City',
    name: 'Волгоград',
  },
  priceRange: '$$',
  knowsAbout: [
    'Уголовное право',
    'Гражданское право',
    'Административное право',
    'Семейное право',
    'Трудовое право',
  ],
  founder: {
    '@type': 'Person',
    name: 'Мордвинцев Роман Фёдорович',
    jobTitle: 'Адвокат',
  },
}

export function LegalServiceSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
