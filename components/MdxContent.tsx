'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

import { PeekabooLink } from '~/components/links/PeekabooLink'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function MdxContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          if (!href) return <>{children}</>
          const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
          return (
            <PeekabooLink href={href} rel={rel}>
              {children}
            </PeekabooLink>
          )
        },
        h1: ({ children }) => {
          const id = slugify(String(children))
          return <h1 id={id}>{children}</h1>
        },
        h2: ({ children }) => {
          const id = slugify(String(children))
          return <h2 id={id}>{children}</h2>
        },
        h3: ({ children }) => {
          const id = slugify(String(children))
          return <h3 id={id}>{children}</h3>
        },
        h4: ({ children }) => {
          const id = slugify(String(children))
          return <h4 id={id}>{children}</h4>
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code: ({ className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '')
          const isInline = !match
          if (isInline) {
            return (
              <code
                className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                {...props}
              >
                {children}
              </code>
            )
          }
          return (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              className="!rounded-xl !text-sm"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
