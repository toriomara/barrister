'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { contactSchema, type ContactInput } from '@/schemas/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export function ContactForm() {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Ошибка отправки')
      }
      setSubmitted(true)
      reset()
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: err instanceof Error ? err.message : 'Попробуйте ещё раз',
        variant: 'destructive',
      })
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="font-serif text-2xl font-bold mb-2">Сообщение отправлено!</h3>
        <p className="text-muted-foreground mb-6">
          Я свяжусь с вами в ближайшее время. Обычно в течение 1-2 рабочих дней.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Отправить ещё одно
        </Button>
      </motion.div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Написать сообщение</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Имя *</Label>
              <Input id="name" placeholder="Ваше имя" {...register('name')} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" type="tel" placeholder="+7 (999) 000-00-00" {...register('phone')} />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" placeholder="email@example.com" {...register('email')} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject">Тема *</Label>
            <Input id="subject" placeholder="Тема обращения" {...register('subject')} />
            {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Сообщение *</Label>
            <Textarea
              id="message"
              placeholder="Опишите вашу ситуацию..."
              rows={5}
              {...register('message')}
            />
            {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
          </div>

          <p className="text-xs text-muted-foreground">
            Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
          </p>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              'Отправка...'
            ) : (
              <>
                <Send className="mr-2 w-4 h-4" />
                Отправить сообщение
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
