import { prisma } from '@/lib/prisma'
import { FileText, Briefcase, MessageSquare, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [postsCount, publishedPosts, servicesCount, unreadMessages] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.service.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ])

  const stats = [
    { icon: FileText, label: 'Всего постов', value: postsCount, sub: `${publishedPosts} опубликовано`, href: '/admin/posts', color: 'text-blue-500' },
    { icon: Briefcase, label: 'Услуги', value: servicesCount, sub: 'в списке', href: '/admin/services', color: 'text-green-500' },
    { icon: MessageSquare, label: 'Новых сообщений', value: unreadMessages, sub: 'непрочитанных', href: '/admin/messages', color: 'text-orange-500' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold">Обзор</h2>
        <p className="text-muted-foreground text-sm mt-1">Общая статистика сайта</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="font-serif text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/posts/new" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted transition-colors">
              <FileText className="w-4 h-4 text-primary" />
              Написать новый пост
            </Link>
            <Link href="/admin/services" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted transition-colors">
              <Briefcase className="w-4 h-4 text-primary" />
              Управление услугами
            </Link>
            <Link href="/admin/about" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted transition-colors">
              <FileText className="w-4 h-4 text-primary" />
              Редактировать «Об адвокате»
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
