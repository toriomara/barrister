'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Plus, Trash2, FileText, Upload, X, GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

interface Certificate {
  id: string
  title: string | null
  fileUrl: string
  fileType: string
  order: number
}

interface CertificatesManagerProps {
  initialCertificates: Certificate[]
}

export function CertificatesManager({ initialCertificates }: CertificatesManagerProps) {
  const { toast } = useToast()
  const [certificates, setCertificates] = useState(initialCertificates)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [pendingTitle, setPendingTitle] = useState('')
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const activeCert = activeId ? certificates.find((c) => c.id === activeId) : null

  const selectFile = (file: File) => {
    setPendingFile(file)
    setPreviewUrl(file.type !== 'application/pdf' ? URL.createObjectURL(file) : null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) selectFile(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) selectFile(file)
  }, [])

  const clearPending = () => {
    setPendingFile(null)
    setPreviewUrl(null)
    setPendingTitle('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleUpload = async () => {
    if (!pendingFile) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', pendingFile)

      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) {
        const err = await uploadRes.json()
        throw new Error(err.error || 'Ошибка загрузки')
      }
      const { url, fileType } = await uploadRes.json()

      const createRes = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: pendingTitle || null, fileUrl: url, fileType }),
      })
      if (!createRes.ok) throw new Error('Ошибка создания записи')

      const newCert = await createRes.json()
      setCertificates((prev) => [...prev, newCert])
      clearPending()
      toast({ title: 'Сертификат добавлен', variant: 'success' })
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Ошибка загрузки',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить сертификат?')) return
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setCertificates((prev) => prev.filter((c) => c.id !== id))
      toast({ title: 'Сертификат удалён', variant: 'success' })
    } catch {
      toast({ title: 'Ошибка удаления', variant: 'destructive' })
    }
  }

  const handleTitleChange = async (id: string, title: string) => {
    try {
      await fetch(`/api/certificates/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      setCertificates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, title: title || null } : c))
      )
    } catch {
      toast({ title: 'Ошибка сохранения', variant: 'destructive' })
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = certificates.findIndex((c) => c.id === active.id)
    const newIndex = certificates.findIndex((c) => c.id === over.id)
    const reordered = arrayMove(certificates, oldIndex, newIndex).map((c, i) => ({
      ...c,
      order: i,
    }))

    setCertificates(reordered)

    try {
      await fetch('/api/certificates/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reordered.map(({ id, order }) => ({ id, order }))),
      })
    } catch {
      toast({ title: 'Не удалось сохранить порядок', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Добавить сертификат</h3>

          {!pendingFile ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
                ${dragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'}
              `}
            >
              <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium">Перетащите файл или нажмите для выбора</p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP, PDF — до 10 МБ</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-32 h-40 rounded-lg border border-border overflow-hidden bg-muted flex items-center justify-center shrink-0">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Предпросмотр"
                      width={128}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground p-4">
                      <FileText className="w-8 h-8" />
                      <span className="text-xs text-center">PDF файл</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm font-medium">{pendingFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(pendingFile.size / 1024 / 1024).toFixed(2)} МБ
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="cert-title" className="text-sm">
                      Название <span className="text-muted-foreground">(необязательно)</span>
                    </Label>
                    <Input
                      id="cert-title"
                      value={pendingTitle}
                      onChange={(e) => setPendingTitle(e.target.value)}
                      placeholder="Например: Сертификат 2024"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleUpload} disabled={uploading} className="flex-1">
                  {uploading ? 'Загрузка...' : 'Загрузить'}
                </Button>
                <Button variant="outline" onClick={clearPending} disabled={uploading}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sortable certificates grid */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-1">
            Текущие сертификаты{' '}
            <span className="text-muted-foreground font-normal">({certificates.length})</span>
          </h3>
          {certificates.length > 1 && (
            <p className="text-xs text-muted-foreground mb-4">
              Перетащите карточки для изменения порядка
            </p>
          )}

          {certificates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Plus className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Сертификаты ещё не добавлены</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={certificates.map((c) => c.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {certificates.map((cert) => (
                    <SortableCertCard
                      key={cert.id}
                      cert={cert}
                      onDelete={handleDelete}
                      onTitleChange={handleTitleChange}
                      isDragging={activeId === cert.id}
                    />
                  ))}
                </div>
              </SortableContext>

              <DragOverlay>
                {activeCert && (
                  <CertCardContent cert={activeCert} overlay />
                )}
              </DragOverlay>
            </DndContext>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SortableCertCard({
  cert,
  onDelete,
  onTitleChange,
  isDragging,
}: {
  cert: Certificate
  onDelete: (id: string) => void
  onTitleChange: (id: string, title: string) => void
  isDragging: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(cert.title || '')

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: cert.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  }

  const saveTitle = () => {
    setEditing(false)
    onTitleChange(cert.id, title)
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div className="aspect-[3/4] rounded-xl border border-border overflow-hidden bg-muted relative">
        <CertCardContent cert={cert} />

        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 w-7 h-7 bg-black/40 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing touch-none"
          aria-label="Перетащить"
        >
          <GripVertical className="w-4 h-4 text-white" />
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(cert.id)}
          className="absolute top-2 right-2 w-7 h-7 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Удалить"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-1.5">
        {editing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => e.key === 'Enter' && saveTitle()}
            className="h-7 text-xs px-2"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-muted-foreground hover:text-foreground w-full text-left truncate transition-colors"
            title={cert.title || 'Нажмите для добавления названия'}
          >
            {cert.title || <span className="italic opacity-50">Без названия</span>}
          </button>
        )}
      </div>
    </div>
  )
}

function CertCardContent({ cert, overlay }: { cert: Certificate; overlay?: boolean }) {
  return (
    <div
      className={`w-full h-full ${overlay ? 'aspect-[3/4] rounded-xl border border-border overflow-hidden bg-muted shadow-2xl rotate-2' : ''}`}
    >
      {cert.fileType === 'pdf' ? (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground p-3">
          <FileText className="w-10 h-10" />
          <span className="text-xs text-center break-words">
            {cert.title || 'PDF документ'}
          </span>
        </div>
      ) : (
        <Image
          src={cert.fileUrl}
          alt={cert.title || 'Сертификат'}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      )}
    </div>
  )
}
