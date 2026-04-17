import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { contactSchema } from '@/schemas/contact'
import { sendContactEmail } from '@/lib/mail'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { name, email, phone, subject, message } = parsed.data

    // Save to database
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, subject, message },
    })

    // Send email notification (non-blocking)
    sendContactEmail({ name, email, phone, subject, message }).catch((err) => {
      logger.error('Failed to send contact email', err)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('POST /api/contact error', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
