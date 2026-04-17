import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Введите ваше имя').max(100, 'Слишком длинное имя'),
  email: z.string().email('Введите корректный email'),
  phone: z
    .string()
    .regex(/^[\d\s\+\-\(\)]*$/, 'Введите корректный номер телефона')
    .optional()
    .or(z.literal('')),
  subject: z.string().min(3, 'Укажите тему сообщения').max(200, 'Слишком длинная тема'),
  message: z.string().min(10, 'Сообщение слишком короткое').max(2000, 'Сообщение слишком длинное'),
})

export type ContactInput = z.infer<typeof contactSchema>
