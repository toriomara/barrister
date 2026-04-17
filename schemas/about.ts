import { z } from 'zod'

const educationItemSchema = z.object({
  year: z.string(),
  institution: z.string(),
  degree: z.string(),
})

const certificateItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  issuer: z.string(),
})

const experienceItemSchema = z.object({
  period: z.string(),
  position: z.string(),
  description: z.string(),
})

export const aboutSchema = z.object({
  name: z.string().min(2, 'Введите имя').max(200),
  title: z.string().min(2, 'Введите должность').max(200),
  bio: z.string().min(10, 'Введите биографию').max(5000),
  photo: z.string().url('Введите корректный URL').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  email: z.string().email('Введите корректный email').optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  education: z.array(educationItemSchema).optional(),
  certificates: z.array(certificateItemSchema).optional(),
  experience: z.array(experienceItemSchema).optional(),
})

export type AboutInput = z.infer<typeof aboutSchema>
