import { getAllBlogPosts } from '~/lib/mdx'

import { BlogPostCard } from './BlogPostCard'

export async function BlogPosts({ limit = 5 }) {
  const posts = (await getAllBlogPosts()).slice(0, limit)

  return (
    <>
      {posts.map((post) => (
        <BlogPostCard post={post} key={post.slug} />
      ))}
    </>
  )
}
