'use client'

import { clsxm } from '@zolplay/utils'
import { motion, useScroll, type Variants } from 'framer-motion'
import React from 'react'

type Heading = {
  id: string
  text: string
  level: number
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delay: 0.255,
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
} satisfies Variants

const itemVariants = {
  hidden: { opacity: 0, y: 5, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
} satisfies Variants

export function BlogPostTableOfContents({ headings }: { headings: Heading[] }) {
  const { scrollY } = useScroll()
  const [highlightedId, setHighlightedId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      const articleElement = document.querySelector<HTMLElement>('article[data-post]')
      if (!articleElement) return

      const headingEls = headings.map(({ id }) =>
        document.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
      )

      if (scrollY.get() > articleElement.scrollHeight) {
        setHighlightedId(null)
        return
      }

      const visibleIdx = headingEls.findIndex((el) => {
        if (!el) return false
        return el.getBoundingClientRect().top > 0
      })

      if (visibleIdx === -1) {
        setHighlightedId(headings[headings.length - 1]?.id ?? null)
      } else {
        setHighlightedId(headings[visibleIdx]?.id ?? null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings, scrollY])

  if (headings.length === 0) return null

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className="group pointer-events-auto flex flex-col space-y-2 text-zinc-500"
    >
      {headings.map((node) => (
        <motion.li
          key={node.id}
          variants={itemVariants}
          className={clsxm(
            'text-[12px] font-medium leading-[18px] transition-colors duration-300',
            node.level === 3 && 'ml-1',
            node.level === 4 && 'ml-2',
            node.id === highlightedId
              ? 'text-zinc-900 dark:text-zinc-200'
              : 'hover:text-zinc-700 dark:hover:text-zinc-400 group-hover:[&:not(:hover)]:text-zinc-400 dark:group-hover:[&:not(:hover)]:text-zinc-600'
          )}
        >
          <a href={`#${node.id}`} className="block w-full">
            {node.text}
          </a>
        </motion.li>
      ))}
    </motion.ul>
  )
}
