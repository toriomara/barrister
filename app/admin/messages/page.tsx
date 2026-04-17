import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, Calendar } from 'lucide-react'

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold">Сообщения</h2>
        <p className="text-muted-foreground text-sm mt-1">{messages.length} сообщений</p>
      </div>

      {messages.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">Сообщений пока нет</Card>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <Card key={msg.id} className={msg.read ? '' : 'ring-1 ring-primary/30'}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{msg.name}</span>
                      {!msg.read && (
                        <Badge variant="gold" className="text-xs">Новое</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${msg.email}`} className="hover:text-foreground">{msg.email}</a>
                      </span>
                      {msg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {msg.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium mb-1">{msg.subject}</div>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{msg.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
