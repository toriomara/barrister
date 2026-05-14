import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest, isAuthenticated } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
]

const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!isAuthenticated(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Файл не передан' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Неподдерживаемый формат. Используйте JPG, PNG, WebP или PDF' },
      { status: 400 }
    )
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: 'Файл слишком большой. Максимум 10 МБ' },
      { status: 400 }
    )
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const folder = (formData.get('folder') as string | null) || 'diplomas'
  const allowedFolders = ['diplomas', 'photos']
  const safeFolder = allowedFolders.includes(folder) ? folder : 'diplomas'

  const prefix = safeFolder === 'photos' ? 'photo' : 'cert'
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const filename = `${prefix}_${Date.now()}.${ext}`
  const uploadDir = path.join(process.cwd(), 'public', safeFolder)

  await mkdir(uploadDir, { recursive: true })
  await writeFile(path.join(uploadDir, filename), buffer)

  const fileType = file.type === 'application/pdf' ? 'pdf' : 'image'

  return NextResponse.json({ url: `/${safeFolder}/${filename}`, fileType })
}
