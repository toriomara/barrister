import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(certificates)
  } catch (error) {
    logger.error('GET /api/certificates error', error)
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
    const { title, fileUrl, fileType } = body

    if (!fileUrl) {
      return NextResponse.json({ error: 'fileUrl обязателен' }, { status: 400 })
    }

    const last = await prisma.certificate.findFirst({ orderBy: { order: 'desc' } })
    const order = (last?.order ?? -1) + 1

    const certificate = await prisma.certificate.create({
      data: { title: title || null, fileUrl, fileType: fileType || 'image', order },
    })

    return NextResponse.json(certificate, { status: 201 })
  } catch (error) {
    logger.error('POST /api/certificates error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
