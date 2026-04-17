import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { PageHero } from '@/components/shared/PageHero'
import { BlogGrid } from '@/components/blog/BlogGrid'

export const metadata: Metadata = {
  title: 'Блог — Юридические статьи',
  description:
    'Полезные статьи о праве, правах граждан, судебной практике и актуальных изменениях в законодательстве.',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
    },
  })

  return (
    <>
      <PageHero
        title="Юридический блог"
        subtitle="Статьи о праве, правах граждан и судебной практике"
        breadcrumbs={[{ label: 'Блог' }]}
      />
      <BlogGrid posts={posts} />
    </>
  )
}
