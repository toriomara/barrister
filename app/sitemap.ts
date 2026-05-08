import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { PRACTICE_AREAS } from '@/lib/practice-areas'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  return [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/cases`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/contacts`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/practice`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: 'weekly' },
    ...PRACTICE_AREAS.map((area) => ({
      url: `${BASE_URL}/practice/${area.slug}`,
      priority: 0.7 as const,
      changeFrequency: 'monthly' as const,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      priority: 0.6 as const,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
