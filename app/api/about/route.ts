import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { aboutSchema } from '@/schemas/about'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    const about = await prisma.about.findFirst()
    return NextResponse.json(about)
  } catch (error) {
    logger.error('GET /api/about error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = aboutSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const existing = await prisma.about.findFirst()
    const data = {
      ...parsed.data,
      photo: parsed.data.photo || null,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      address: parsed.data.address || null,
    }

    let about
    if (existing) {
      about = await prisma.about.update({ where: { id: existing.id }, data })
    } else {
      about = await prisma.about.create({ data })
    }

    return NextResponse.json(about)
  } catch (error) {
    logger.error('PUT /api/about error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
