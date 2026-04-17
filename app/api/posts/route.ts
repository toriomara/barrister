import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { postSchema } from '@/schemas/post'
import { slugify } from '@/lib/utils'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') !== 'false'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = publishedOnly ? { published: true } : {}

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          published: true,
          publishedAt: true,
          createdAt: true,
        },
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({ posts, total, page, limit })
  } catch (error) {
    logger.error('GET /api/posts error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = postSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { title, excerpt, content, coverImage, published, metaTitle, metaDesc } = parsed.data

    let slug = slugify(title)
    const existing = await prisma.post.findUnique({ where: { slug } })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: coverImage || null,
        published,
        publishedAt: published ? new Date() : null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
      },
    })

    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    logger.info('Post created', { id: post.id, slug: post.slug })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    logger.error('POST /api/posts error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
