import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { serviceSchema } from '@/schemas/service'
import { slugify } from '@/lib/utils'
import { logger } from '@/lib/logger'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const service = await prisma.service.findUnique({ where: { id } })
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(service)
  } catch (error) {
    logger.error('GET /api/services/[id] error', error)
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
    const parsed = serviceSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const existing = await prisma.service.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const { title, description, details, icon, order, published } = parsed.data
    let slug = existing.slug
    if (title !== existing.title) {
      slug = slugify(title)
      const conflict = await prisma.service.findFirst({ where: { slug, NOT: { id } } })
      if (conflict) slug = `${slug}-${Date.now()}`
    }

    const service = await prisma.service.update({
      where: { id },
      data: { title, slug, description, details: details || null, icon: icon || null, order, published },
    })

    return NextResponse.json(service)
  } catch (error) {
    logger.error('PUT /api/services/[id] error', error)
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

    await prisma.service.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('DELETE /api/services/[id] error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}