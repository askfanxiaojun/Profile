'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { SocialLink } from '~/components/links/SocialLink'
import { siteConfig } from '~/content/site-config'

export function Headline() {
  const { headline, social } = siteConfig

  return (
    <div className="max-w-2xl">
      <motion.h1
        className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 100, duration: 0.3 }}
      >
        {headline.roles.join('，')}
      </motion.h1>
      <motion.p
        className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 85, duration: 0.3, delay: 0.1 }}
      >
        <Balancer>{headline.bio}</Balancer>
      </motion.p>
      <motion.div
        className="mt-6 flex gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 50, stiffness: 90, duration: 0.35, delay: 0.25 }}
      >
        {social.twitter && (
          <SocialLink href={social.twitter} aria-label="我的推特" platform="twitter" />
        )}
        {social.youtube && (
          <SocialLink href={social.youtube} aria-label="我的 YouTube" platform="youtube" />
        )}
        {social.bilibili && (
          <SocialLink href={social.bilibili} aria-label="我的 Bilibili" platform="bilibili" />
        )}
        {social.github && (
          <SocialLink href={social.github} aria-label="我的 GitHub" platform="github" />
        )}
        {social.telegram && (
          <SocialLink href={social.telegram} aria-label="我的 Telegram" platform="telegram" />
        )}
        <SocialLink href="/feed.xml" platform="rss" aria-label="RSS 订阅" />
        {social.email && (
          <SocialLink href={`mailto:${social.email}`} aria-label="我的邮箱" platform="mail" />
        )}
      </motion.div>
    </div>
  )
}
