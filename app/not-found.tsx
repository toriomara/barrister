import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Scale } from 'lucide-react'

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/10 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-10 h-10 text-primary dark:text-primary" />
          </div>
          <h1 className="font-serif text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="font-serif text-2xl font-semibold mb-2">Страница не найдена</h2>
          <p className="text-muted-foreground mb-8">
            Запрашиваемая страница не существует или была перемещена.
          </p>
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
