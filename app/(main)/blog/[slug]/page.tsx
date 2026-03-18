import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogPostPage } from '~/app/(main)/blog/BlogPostPage'
import { getAllBlogSlugs, getBlogPost } from '~/lib/mdx'

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}

  const { title, description, coverImage } = post

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: coverImage }],
      type: 'article',
    },
  }
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  return <BlogPostPage post={post} />
}
