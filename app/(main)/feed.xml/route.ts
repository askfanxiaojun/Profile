import RSS from 'rss'

import { getAllBlogPosts } from '~/lib/mdx'
import { seo } from '~/lib/seo'

export const dynamic = 'force-static'

export async function GET() {
  const feed = new RSS({
    title: seo.title,
    description: seo.description,
    site_url: seo.url.href,
    feed_url: `${seo.url.href}feed.xml`,
    language: 'zh-CN',
    image_url: `${seo.url.href}opengraph-image.png`,
  })

  const posts = getAllBlogPosts()

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      guid: post.slug,
      url: `${seo.url.href}blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      enclosure: {
        url: `${seo.url.href}${post.coverImage.replace(/^\//, '')}`,
      },
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'content-type': 'application/xml',
    },
  })
}
