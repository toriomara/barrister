import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { postSchema } from '@/schemas/post'
import { slugify } from '@/lib/utils'
import { logger } from '@/lib/logger'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const post = await prisma.post.findUnique({ where: { id } })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    logger.error('GET /api/posts/[id] error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await getSessionFromRequest(request)
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = postSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { title, excerpt, content, coverImage, published, metaTitle, metaDesc } = parsed.data

    const existing = await prisma.post.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    let slug = existing.slug
    if (title !== existing.title) {
      slug = slugify(title)
      const conflict = await prisma.post.findFirst({ where: { slug, NOT: { id } } })
      if (conflict) slug = `${slug}-${Date.now()}`
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: coverImage || null,
        published,
        publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
      },
    })

    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    logger.info('Post updated', { id: post.id })
    return NextResponse.json(post)
  } catch (error) {
    logger.error('PUT /api/posts/[id] error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await getSessionFromRequest(request)
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existing = await prisma.post.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const published = !existing.published
    const post = await prisma.post.update({
      where: { id },
      data: {
        published,
        publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    })

    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    logger.info('Post publish toggled', { id: post.id, published })
    return NextResponse.json(post)
  } catch (error) {
    logger.error('PATCH /api/posts/[id] error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await getSessionFromRequest(request)
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } })
    await prisma.post.delete({ where: { id } })
    if (existing) {
      revalidatePath('/blog')
      revalidatePath(`/blog/${existing.slug}`)
    }
    logger.info('Post deleted', { id })
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('DELETE /api/posts/[id] error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}