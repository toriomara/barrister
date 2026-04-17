import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL_NOTIFY || process.env.SMTP_USER

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Сайт адвоката" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `Новое сообщение: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Новое сообщение с сайта</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 120px;">Имя:</td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 8px; font-weight: bold;">Телефон:</td>
            <td style="padding: 8px;">${data.phone}</td>
          </tr>` : ''}
          <tr style="background: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold;">Тема:</td>
            <td style="padding: 8px;">${data.subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Сообщение:</td>
            <td style="padding: 8px;">${data.message.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
      </div>
    `,
  })

  // Auto-reply to client
  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Адвокат Мордвинцев Р.Ф." <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: 'Ваше сообщение получено',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Спасибо за обращение, ${data.name}!</h2>
        <p>Ваше сообщение получено. Я свяжусь с вами в ближайшее время.</p>
        <p style="color: #666;">Обычно время ответа составляет 1-2 рабочих дня.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">
          Это автоматическое уведомление, пожалуйста, не отвечайте на него.
        </p>
      </div>
    `,
  })
}
