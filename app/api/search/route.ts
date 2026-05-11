import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PRACTICE_AREAS } from '@/lib/practice-areas'
import { CASES, CATEGORY_LABELS } from '@/lib/cases-data'

export interface SearchResultItem {
  type: 'practice' | 'case' | 'post' | 'service'
  title: string
  description: string
  href: string
  badge: string
}

const LIMIT = 5

function matches(text: string, q: string) {
  return text.toLowerCase().includes(q)
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.toLowerCase().trim() ?? ''

  if (q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const results: SearchResultItem[] = []

  // Practice areas
  for (const area of PRACTICE_AREAS) {
    if (results.filter((r) => r.type === 'practice').length >= LIMIT) break
    if (
      matches(area.title, q) ||
      matches(area.subtitle, q) ||
      matches(area.paragraphs[0] ?? '', q)
    ) {
      results.push({
        type: 'practice',
        title: area.title,
        description: area.subtitle,
        href: `/practice/${area.slug}`,
        badge: 'Практика',
      })
    }
  }

  // Cases
  for (const item of CASES) {
    if (results.filter((r) => r.type === 'case').length >= LIMIT) break
    if (
      matches(item.article, q) ||
      matches(item.outcome, q) ||
      matches(item.description, q)
    ) {
      results.push({
        type: 'case',
        title: item.article,
        description: item.outcome,
        href: '/cases',
        badge: CATEGORY_LABELS[item.category],
      })
    }
  }

  // Blog posts
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { excerpt: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: LIMIT,
      select: { title: true, slug: true, excerpt: true },
    })
    for (const post of posts) {
      results.push({
        type: 'post',
        title: post.title,
        description: post.excerpt,
        href: `/blog/${post.slug}`,
        badge: 'Блог',
      })
    }
  } catch {
    // DB unavailable — skip
  }

  // Services
  try {
    const services = await prisma.service.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: LIMIT,
      select: { title: true, slug: true, description: true },
    })
    for (const svc of services) {
      results.push({
        type: 'service',
        title: svc.title,
        description: svc.description,
        href: `/services#${svc.slug}`,
        badge: 'Услуга',
      })
    }
  } catch {
    // DB unavailable — skip
  }

  return NextResponse.json({ results })
}
