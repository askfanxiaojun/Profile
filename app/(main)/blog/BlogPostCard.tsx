import { parseDateTime } from '@zolplay/utils'
import Image from 'next/image'
import Link from 'next/link'

import { CalendarIcon, HourglassIcon, ScriptIcon } from '~/assets'
import { type BlogPost } from '~/lib/mdx'

export function BlogPostCard({ post }: { post: BlogPost }) {
  const { title, slug, coverImage, date, categories, readingTime } = post

  return (
    <Link
      href={`/blog/${slug}`}
      prefetch={false}
      className="group relative flex w-full transform-gpu flex-col rounded-3xl bg-transparent ring-2 ring-zinc-200/50 transition-transform hover:-translate-y-0.5 dark:ring-zinc-700/50"
    >
      <div className="relative aspect-[240/135] w-full">
        <Image
          src={coverImage}
          alt={title}
          className="rounded-t-3xl object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
      </div>
      <span className="flex w-full flex-1 shrink-0 flex-col justify-between gap-0.5 rounded-b-[calc(1.5rem+1px)] bg-white/90 p-4 dark:bg-zinc-900/90 md:p-5">
        <h2 className="text-base font-bold tracking-tight text-zinc-800 opacity-80 transition-opacity group-hover:opacity-100 dark:text-zinc-100 md:text-xl">
          {title}
        </h2>

        <span className="mt-2 flex items-center justify-between opacity-50 transition-opacity group-hover:opacity-80">
          <span className="inline-flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1 text-[12px] font-medium text-zinc-600 dark:text-zinc-400 md:text-sm">
              <CalendarIcon />
              <span>
                {parseDateTime({ date: new Date(date) })?.format('YYYY/MM/DD')}
              </span>
            </span>

            {Array.isArray(categories) && categories.length > 0 && (
              <span className="inline-flex items-center space-x-1 text-[12px] font-medium text-zinc-600 dark:text-zinc-400 md:text-sm">
                <ScriptIcon />
                <span>{categories.join(', ')}</span>
              </span>
            )}
          </span>
          <span className="inline-flex items-center space-x-1 text-[12px] font-medium text-zinc-600 dark:text-zinc-400 md:text-xs">
            <HourglassIcon />
            <span>{readingTime.toFixed(0)}分钟阅读</span>
          </span>
        </span>
      </span>
    </Link>
  )
}
