import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { PostContent } from "@/components/blog/PostContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    select: {
      title: true,
      metaTitle: true,
      metaDesc: true,
      excerpt: true,
      coverImage: true,
      coverImageCaption: true,
    },
  });

  if (!post) return { title: "Пост не найден" };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      type: "article",
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export const revalidate = 60;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: 'Мордвинцев Роман Фёдорович' },
    publisher: { '@type': 'Organization', name: 'Адвокат Мордвинцев Р.Ф.', url: APP_URL },
    ...(post.coverImage && { image: post.coverImage }),
    url: `${APP_URL}/blog/${post.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PageHero
        title={post.title}
        breadcrumbs={[{ label: "Блог", href: "/blog" }, { label: post.title }]}
      />
      <PostContent post={post} />
    </>
  );
}
