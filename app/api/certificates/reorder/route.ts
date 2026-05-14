import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { logger } from '@/lib/logger'

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Ожидается массив [{id, order}]' }, { status: 400 })
    }

    await Promise.all(
      body.map(({ id, order }: { id: string; order: number }) =>
        prisma.certificate.update({ where: { id }, data: { order } })
      )
    )

    return NextResponse.json({ ok: true })
  } catch (error) {
    logger.error('PUT /api/certificates/reorder error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
