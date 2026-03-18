import { siteConfig } from '~/content/site-config'

export const seo = {
  name: siteConfig.name,
  title: `${siteConfig.name} | ${siteConfig.title}`,
  description: siteConfig.description,
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? siteConfig.url
      : 'http://localhost:3000'
  ),
} as const
