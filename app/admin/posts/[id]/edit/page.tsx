import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PostEditor } from '@/components/admin/PostEditor'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold mb-6">Редактировать пост</h2>
      <PostEditor post={post} />
    </div>
  )
}
