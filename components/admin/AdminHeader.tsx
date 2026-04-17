'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/button'

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <h1 className="font-semibold text-sm">Панель управления</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-1" />
          Выйти
        </Button>
      </div>
    </header>
  )
}
