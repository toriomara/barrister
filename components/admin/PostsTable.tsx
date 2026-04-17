'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface Post {
  id: string
  title: string
  slug: string
  published: boolean
  publishedAt?: Date | null
  createdAt: Date
}

export function PostsTable({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const { toast } = useToast()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const handleTogglePublish = async (id: string) => {
    setTogglingId(id)
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'PATCH' })
      if (!res.ok) throw new Error()
      router.refresh()
    } catch {
      toast({ title: 'Ошибка', variant: 'destructive' })
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить пост? Это действие нельзя отменить.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast({ title: 'Пост удалён', variant: 'default' })
      router.refresh()
    } catch {
      toast({ title: 'Ошибка удаления', variant: 'destructive' })
    } finally {
      setDeletingId(null)
    }
  }

  if (posts.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        Постов пока нет. Создайте первый!
      </Card>
    )
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-muted-foreground">Заголовок</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Статус</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Дата</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Действия</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="p-4">
                  <div className="font-medium line-clamp-1">{post.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">/blog/{post.slug}</div>
                </td>
                <td className="p-4">
                  {post.published ? (
                    <Badge variant="gold" className="gap-1">
                      <Eye className="w-3 h-3" />
                      Опубликован
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <EyeOff className="w-3 h-3" />
                      Черновик
                    </Badge>
                  )}
                </td>
                <td className="p-4 text-muted-foreground">
                  {formatDate(post.publishedAt || post.createdAt)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title={post.published ? 'Снять с публикации' : 'Опубликовать'}
                      disabled={togglingId === post.id}
                      onClick={() => handleTogglePublish(post.id)}
                    >
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      disabled={deletingId === post.id}
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
