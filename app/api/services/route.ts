import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { serviceSchema } from '@/schemas/service'
import { slugify } from '@/lib/utils'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') !== 'false'

    const where = publishedOnly ? { published: true } : {}
    const services = await prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(services)
  } catch (error) {
    logger.error('GET /api/services error', error)
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
    const parsed = serviceSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { title, description, details, icon, order, published } = parsed.data

    let slug = slugify(title)
    const existing = await prisma.service.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${Date.now()}`

    const service = await prisma.service.create({
      data: { title, slug, description, details: details || null, icon: icon || null, order, published },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    logger.error('POST /api/services error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
