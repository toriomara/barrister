'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, type PostInput } from '@/schemas/post'
import { TiptapEditor } from './TiptapEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Save, Eye, EyeOff } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage?: string | null
  published: boolean
  metaTitle?: string | null
  metaDesc?: string | null
}

interface PostEditorProps {
  post?: Post
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPublished, setIsPublished] = useState(post?.published ?? false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? '',
      excerpt: post?.excerpt ?? '',
      content: post?.content ?? '',
      coverImage: post?.coverImage ?? '',
      published: post?.published ?? false,
      metaTitle: post?.metaTitle ?? '',
      metaDesc: post?.metaDesc ?? '',
    },
  })

  const onSubmit = async (data: PostInput) => {
    const payload = { ...data, published: isPublished }
    try {
      const url = post ? `/api/posts/${post.id}` : '/api/posts'
      const method = post ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
      }
      toast({ title: post ? 'Пост обновлён' : 'Пост создан', variant: 'default' })
      router.push('/admin/posts')
      router.refresh()
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: err instanceof Error ? err.message : 'Попробуйте ещё раз',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Заголовок *</Label>
            <Input id="title" placeholder="Заголовок поста" {...register('title')} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="excerpt">Краткое описание *</Label>
            <Textarea
              id="excerpt"
              placeholder="Краткое описание для превью..."
              rows={3}
              {...register('excerpt')}
            />
            {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Содержимое *</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  content={field.value}
                  onChange={field.onChange}
                  placeholder="Начните писать..."
                />
              )}
            />
            {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm font-semibold">Публикация</Label>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium border transition-colors ${
                  isPublished
                    ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                    : 'bg-muted border-border text-muted-foreground'
                }`}
              >
                {isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {isPublished ? 'Опубликован' : 'Черновик'}
              </button>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          </Card>

          {/* Cover image */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <Label htmlFor="coverImage">Обложка (URL)</Label>
              <Input id="coverImage" placeholder="https://..." {...register('coverImage')} />
              {errors.coverImage && <p className="text-xs text-destructive">{errors.coverImage.message}</p>}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm font-semibold">SEO</Label>
              <div className="space-y-1.5">
                <Label htmlFor="metaTitle" className="text-xs">Meta Title</Label>
                <Input id="metaTitle" placeholder="SEO заголовок (до 70 символов)" {...register('metaTitle')} />
                {errors.metaTitle && <p className="text-xs text-destructive">{errors.metaTitle.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="metaDesc" className="text-xs">Meta Description</Label>
                <Textarea
                  id="metaDesc"
                  placeholder="Мета-описание (до 160 символов)"
                  rows={3}
                  {...register('metaDesc')}
                />
                {errors.metaDesc && <p className="text-xs text-destructive">{errors.metaDesc.message}</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
