'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Save } from 'lucide-react'
import { aboutSchema, type AboutInput } from '@/schemas/about'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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

  const onSubmit = async (data: AboutInput) => {
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, education, certificates, experience }),
      })
      if (!res.ok) throw new Error()
      toast({ title: 'Информация сохранена' })
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
            <Label>Фото (URL)</Label>
            <Input placeholder="https://..." {...register('photo')} />
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
