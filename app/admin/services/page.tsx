import { prisma } from '@/lib/prisma'
import { ServicesManager } from '@/components/admin/ServicesManager'

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold">Услуги</h2>
        <p className="text-muted-foreground text-sm mt-1">Управление разделом услуг</p>
      </div>
      <ServicesManager initialServices={services} />
    </div>
  )
}
