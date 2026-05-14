import { prisma } from '@/lib/prisma'
import { CertificatesManager } from '@/components/admin/CertificatesManager'

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold">Сертификаты и грамоты</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Управление галереей сертификатов на странице &quot;Об адвокате&quot;
        </p>
      </div>
      <CertificatesManager initialCertificates={certificates} />
    </div>
  )
}
