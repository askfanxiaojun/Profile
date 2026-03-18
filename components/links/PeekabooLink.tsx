'use client'

import { clsxm } from '@zolplay/utils'
import Link, { type LinkProps } from 'next/link'
import React from 'react'

import { RichLink } from '~/components/links/RichLink'

type PeekabooLinkProps = LinkProps &
  React.ComponentPropsWithoutRef<'a'> & {
    children: React.ReactNode
  }
export function PeekabooLink({
  href,
  children,
  className,
  ...props
}: PeekabooLinkProps) {
  // if it's a relative link, use a fallback Link
  if (!href.startsWith('http')) {
    return (
      <Link href={href} className={clsxm(className)} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <RichLink
      href={href}
      className={clsxm(
        'font-semibold text-zinc-800 hover:underline dark:text-zinc-100',
        className
      )}
      target="_blank"
      {...props}
    >
      {children}
    </RichLink>
  )
}
