import { type MetadataRoute } from 'next'

import { url } from '~/lib'
import { getAllBlogSlugs } from '~/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticMap: MetadataRoute.Sitemap = [
    { url: url('/').href, lastModified: new Date() },
    { url: url('/blog').href, lastModified: new Date() },
    { url: url('/projects').href, lastModified: new Date() },
  ]

  const slugs = getAllBlogSlugs()
  const dynamicMap: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: url(`/blog/${slug}`).href,
    lastModified: new Date(),
  }))

  return [...staticMap, ...dynamicMap]
}
