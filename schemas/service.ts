import { z } from 'zod'

export const serviceSchema = z.object({
  title: z.string().min(2, 'Минимум 2 символа').max(100, 'Максимум 100 символов'),
  description: z.string().min(10, 'Минимум 10 символов').max(500, 'Максимум 500 символов'),
  details: z.string().optional().or(z.literal('')),
  icon: z.string().optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  published: z.boolean().default(true),
})

export type ServiceInput = z.infer<typeof serviceSchema>
