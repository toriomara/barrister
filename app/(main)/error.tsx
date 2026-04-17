'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-bold mb-2">Что-то пошло не так</h2>
        <p className="text-muted-foreground mb-6">Произошла ошибка при загрузке страницы.</p>
        <Button onClick={reset}>Попробовать снова</Button>
      </div>
    </div>
  )
}
