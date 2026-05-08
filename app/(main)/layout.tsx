import { MainLayout } from '@/components/layout/MainLayout'
import { LegalServiceSchema } from '@/components/seo/LegalServiceSchema'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LegalServiceSchema />
      <MainLayout>{children}</MainLayout>
    </>
  )
}
