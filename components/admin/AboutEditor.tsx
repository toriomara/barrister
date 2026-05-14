'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Save, Upload, X } from 'lucide-react'
import { aboutSchema, type AboutInput } from '@/schemas/about'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

interface AboutData {
  name: string
  title: string
  bio: string
  photo?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  education?: unknown
  certificates?: unknown
  experience?: unknown
}

interface AboutEditorProps {
  about: AboutData | null
}

type EducationItem = { year: string; institution: string; degree: string }
type CertificateItem = { year: string; title: string; issuer: string }
type ExperienceItem = { period: string; position: string; description: string }

export function AboutEditor({ about }: AboutEditorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [photoUploading, setPhotoUploading] = useState(false)

  const [education, setEducation] = useState<EducationItem[]>(
    (about?.education as EducationItem[]) || []
  )
  const [certificates, setCertificates] = useState<CertificateItem[]>(
    (about?.certificates as CertificateItem[]) || []
  )
  const [experience, setExperience] = useState<ExperienceItem[]>(
    (about?.experience as ExperienceItem[]) || []
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AboutInput>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      name: about?.name || '',
      title: about?.title || '',
      bio: about?.bio || '',
      photo: about?.photo || '',
      phone: about?.phone || '',
      email: about?.email || '',
      address: about?.address || '',
    },
  })

  const photoValue = watch('photo')

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'photos')
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Ошибка загрузки')
      }
      const { url } = await res.json()
      setValue('photo', url, { shouldValidate: true })
      toast({ title: 'Фото загружено', variant: 'success' })
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Ошибка загрузки фото',
        variant: 'destructive',
      })
    } finally {
      setPhotoUploading(false)
      if (photoInputRef.current) photoInputRef.current.value = ''
    }
  }

  const onSubmit = async (data: AboutInput) => {
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, education, certificates, experience }),
      })
      if (!res.ok) throw new Error()
      toast({ title: 'Информация сохранена', variant: 'success' })
      router.refresh()
    } catch {
      toast({ title: 'Ошибка', variant: 'destructive' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>ФИО *</Label>
              <Input {...register('name')} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Должность/Специализация *</Label>
              <Input {...register('title')} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Биография *</Label>
            <Textarea rows={6} {...register('bio')} />
            {errors.bio && <p className="text-xs text-destructive">{errors.bio.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Фото</Label>
            <div className="flex gap-3 items-start">
              {/* Preview */}
              {photoValue && (
                <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoValue}
                    alt="Фото"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setValue('photo', '', { shouldValidate: true })}
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center text-white"
                    aria-label="Удалить фото"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}
              <div className="flex-1 space-y-2">
                <Input placeholder="https://..." {...register('photo')} />
                <div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={photoUploading}
                    onClick={() => photoInputRef.current?.click()}
                  >
                    <Upload className="w-3.5 h-3.5 mr-1.5" />
                    {photoUploading ? 'Загрузка...' : 'Загрузить'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Контакты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Телефон</Label>
              <Input {...register('phone')} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" {...register('email')} />
            </div>
            <div className="space-y-1.5">
              <Label>Адрес</Label>
              <Input {...register('address')} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Образование
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEducation([...education, { year: '', institution: '', degree: '' }])}
            >
              <Plus className="w-3 h-3 mr-1" /> Добавить
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {education.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <Input
                className="w-20 shrink-0"
                placeholder="Год"
                value={item.year}
                onChange={(e) => {
                  const updated = [...education]
                  updated[i].year = e.target.value
                  setEducation(updated)
                }}
              />
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="ВУЗ"
                  value={item.institution}
                  onChange={(e) => {
                    const updated = [...education]
                    updated[i].institution = e.target.value
                    setEducation(updated)
                  }}
                />
                <Input
                  placeholder="Степень/специальность"
                  value={item.degree}
                  onChange={(e) => {
                    const updated = [...education]
                    updated[i].degree = e.target.value
                    setEducation(updated)
                  }}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive shrink-0"
                onClick={() => setEducation(education.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {education.length === 0 && (
            <p className="text-sm text-muted-foreground">Нажмите «Добавить» для добавления записи</p>
          )}
        </CardContent>
      </Card>

      {/* Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Лицензии и сертификаты
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCertificates([...certificates, { year: '', title: '', issuer: '' }])}
            >
              <Plus className="w-3 h-3 mr-1" /> Добавить
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {certificates.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <Input
                className="w-20 shrink-0"
                placeholder="Год"
                value={item.year}
                onChange={(e) => {
                  const updated = [...certificates]
                  updated[i].year = e.target.value
                  setCertificates(updated)
                }}
              />
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Название"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...certificates]
                    updated[i].title = e.target.value
                    setCertificates(updated)
                  }}
                />
                <Input
                  placeholder="Выдавший орган"
                  value={item.issuer}
                  onChange={(e) => {
                    const updated = [...certificates]
                    updated[i].issuer = e.target.value
                    setCertificates(updated)
                  }}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive shrink-0"
                onClick={() => setCertificates(certificates.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Опыт работы
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setExperience([...experience, { period: '', position: '', description: '' }])}
            >
              <Plus className="w-3 h-3 mr-1" /> Добавить
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {experience.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Период (2010 — н.в.)"
                    value={item.period}
                    onChange={(e) => {
                      const updated = [...experience]
                      updated[i].period = e.target.value
                      setExperience(updated)
                    }}
                  />
                  <Input
                    placeholder="Должность"
                    value={item.position}
                    onChange={(e) => {
                      const updated = [...experience]
                      updated[i].position = e.target.value
                      setExperience(updated)
                    }}
                  />
                </div>
                <Input
                  placeholder="Описание"
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...experience]
                    updated[i].description = e.target.value
                    setExperience(updated)
                  }}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive shrink-0"
                onClick={() => setExperience(experience.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </div>
    </form>
  )
}
