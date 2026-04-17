// Рейтинги на внешних платформах.
// Обновляй вручную при изменении оценок.

export interface PlatformReview {
  name: string
  rating: number
  reviews: number
  url: string
  updatedAt: string // ISO-дата последней проверки
}

export const platformReviews: PlatformReview[] = [
  {
    name: 'Яндекс Карты',
    rating: 4.4,
    reviews: 7,
    url: 'https://yandex.com/maps/org/advokat_mordvintsev_r_f_/149778884753/',
    updatedAt: '2026-04-14',
  },
  {
    name: '2ГИС',
    rating: 5.0,
    reviews: 14,
    url: 'https://2gis.ru/volgograd/firm/70000001050244313/',
    updatedAt: '2026-04-14',
  },
  {
    name: 'Harant.ru',
    rating: 9.1,
    reviews: 11,
    url: 'https://harant.ru/lawyers/volgograd/mordvinczev-roman-fedorovich/',
    updatedAt: '2026-04-14',
  },
  {
    name: '9111.ru',
    rating: 4.7,
    reviews: 45,
    url: 'https://9111.ru/advokat-5262423/',
    updatedAt: '2026-04-14',
  },
  {
    name: 'Zoon.ru',
    rating: 5.0,
    reviews: 2,
    url: 'https://zoon.ru/volgograd/law/advokat_mordvintsev_rf/',
    updatedAt: '2026-04-14',
  },
]
