import { prisma } from '@/lib/prisma'
import { AboutEditor } from '@/components/admin/AboutEditor'

export default async function AdminAboutPage() {
  const about = await prisma.about.findFirst()

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold">Об адвокате</h2>
        <p className="text-muted-foreground text-sm mt-1">Редактирование информации об адвокате</p>
      </div>
      <AboutEditor about={about} />
    </div>
  )
}
