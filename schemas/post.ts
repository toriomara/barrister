import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(3, 'Минимум 3 символа').max(200, 'Максимум 200 символов'),
  excerpt: z.string().min(10, 'Минимум 10 символов').max(500, 'Максимум 500 символов'),
  content: z.string().min(10, 'Добавьте содержимое поста'),
  coverImage: z.string().url('Введите корректный URL').optional().or(z.literal('')),
  published: z.boolean().default(false),
  metaTitle: z.string().max(70, 'Максимум 70 символов').optional().or(z.literal('')),
  metaDesc: z.string().max(160, 'Максимум 160 символов').optional().or(z.literal('')),
})

export type PostInput = z.infer<typeof postSchema>
