'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Edit, Trash2, X, Check } from 'lucide-react'
import { serviceSchema, type ServiceInput } from '@/schemas/service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

interface Service {
  id: string
  title: string
  slug: string
  description: string
  details: string | null
  icon: string | null
  order: number
  published: boolean
}

interface ServicesManagerProps {
  initialServices: Service[]
}

const ICONS = ['Shield', 'Scale', 'Briefcase', 'FileText', 'Users', 'MessageSquare', 'Gavel', 'BookOpen']

function ServiceForm({
  defaultValues,
  onSave,
  onCancel,
  isLoading,
}: {
  defaultValues?: Partial<ServiceInput>
  onSave: (data: ServiceInput) => void
  onCancel: () => void
  isLoading: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultValues || { order: 0, published: true },
  })

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 space-y-1">
          <Label>Название *</Label>
          <Input placeholder="Название услуги" {...register('title')} />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Краткое описание *</Label>
          <Textarea placeholder="Краткое описание..." rows={2} {...register('description')} />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Подробное описание</Label>
          <Textarea placeholder="Полное описание (раскрывается при клике)..." rows={3} {...register('details')} />
        </div>
        <div className="space-y-1">
          <Label>Иконка</Label>
          <Input placeholder="Shield, Scale, Briefcase..." {...register('icon')} />
          <p className="text-xs text-muted-foreground">
            {ICONS.join(', ')}
          </p>
        </div>
        <div className="space-y-1">
          <Label>Порядок</Label>
          <Input type="number" {...register('order', { valueAsNumber: true })} />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <X className="w-4 h-4 mr-1" /> Отмена
        </Button>
        <Button type="submit" size="sm" disabled={isLoading}>
          <Check className="w-4 h-4 mr-1" /> Сохранить
        </Button>
      </div>
    </form>
  )
}

export function ServicesManager({ initialServices }: ServicesManagerProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [showNew, setShowNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCreate = async (data: ServiceInput) => {
    setLoading(true)
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast({ title: 'Услуга создана' })
      setShowNew(false)
      router.refresh()
    } catch {
      toast({ title: 'Ошибка', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: string, data: ServiceInput) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast({ title: 'Услуга обновлена' })
      setEditingId(null)
      router.refresh()
    } catch {
      toast({ title: 'Ошибка', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить услугу?')) return
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast({ title: 'Услуга удалена' })
      router.refresh()
    } catch {
      toast({ title: 'Ошибка', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      {/* New service form */}
      {showNew ? (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Новая услуга</h3>
            <ServiceForm
              onSave={handleCreate}
              onCancel={() => setShowNew(false)}
              isLoading={loading}
            />
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setShowNew(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить услугу
        </Button>
      )}

      {/* Services list */}
      {initialServices.map((service) => (
        <Card key={service.id}>
          <CardContent className="p-4">
            {editingId === service.id ? (
              <ServiceForm
                defaultValues={{
                  title: service.title,
                  description: service.description,
                  details: service.details || '',
                  icon: service.icon || '',
                  order: service.order,
                  published: service.published,
                }}
                onSave={(data) => handleUpdate(service.id, data)}
                onCancel={() => setEditingId(null)}
                isLoading={loading}
              />
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{service.title}</span>
                    <Badge variant={service.published ? 'gold' : 'secondary'} className="text-xs">
                      {service.published ? 'Опубликована' : 'Скрыта'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">#{service.order}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => setEditingId(service.id)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
