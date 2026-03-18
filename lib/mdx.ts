import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  categories?: string[]
  coverImage: string
  readingTime: number
}

export type BlogPostDetail = BlogPost & {
  content: string
  headings: { id: string; text: string; level: number }[]
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 300
  const wordCount = content.length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm
  const headings: { id: string; text: string; level: number }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ id, text, level })
  }
  return headings
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.(mdx|md)$/, ''))
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs()
  const posts = slugs
    .map((slug) => {
      const filePath = fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`))
        ? path.join(BLOG_DIR, `${slug}.mdx`)
        : path.join(BLOG_DIR, `${slug}.md`)

      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        categories: data.categories || [],
        coverImage: data.coverImage || '/blog/default-cover.jpg',
        readingTime: calculateReadingTime(content),
      } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getBlogPost(slug: string): BlogPostDetail | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const mdPath = path.join(BLOG_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    categories: data.categories || [],
    coverImage: data.coverImage || '/blog/default-cover.jpg',
    readingTime: calculateReadingTime(content),
    content,
    headings: extractHeadings(content),
  }
}
