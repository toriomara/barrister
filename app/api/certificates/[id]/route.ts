import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { logger } from '@/lib/logger'
import { unlink } from 'fs/promises'
import path from 'path'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(request)
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, order } = body

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: title || null }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(certificate)
  } catch (error) {
    logger.error('PATCH /api/certificates/[id] error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(request)
    if (!isAuthenticated(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const certificate = await prisma.certificate.findUnique({ where: { id } })

    if (!certificate) {
      return NextResponse.json({ error: 'Не найден' }, { status: 404 })
    }

    await prisma.certificate.delete({ where: { id } })

    // Удаляем файл из public/diplomas только если он загружен через наш API
    if (certificate.fileUrl.startsWith('/diplomas/cert_')) {
      const filePath = path.join(process.cwd(), 'public', certificate.fileUrl)
      try {
        await unlink(filePath)
      } catch {
        // файл уже удалён — не критично
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    logger.error('DELETE /api/certificates/[id] error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
