import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const ADMIN_PATHS = ['/admin']
const PUBLIC_ADMIN_PATHS = ['/admin/login']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p))
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))

  if (isAdminPath && !isPublicAdminPath) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
