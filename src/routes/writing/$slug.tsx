import { useEffect, useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getPost } from '~/lib/posts'
import { componentRegistry } from '~/lib/mdx-components'

const fetchPost = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return getPost(slug)
  })

export const Route = createFileRoute('/writing/$slug')({
  component: PostPage,
  loader: ({ params }) => fetchPost({ data: params.slug }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} — Josh Matz`
          : 'Josh Matz',
      },
      ...(loaderData
        ? [
            ...(loaderData.description
              ? [
                  {
                    name: 'description',
                    content: loaderData.description,
                  },
                ]
              : []),
            { property: 'og:title', content: loaderData.title },
            ...(loaderData.description
              ? [
                  {
                    property: 'og:description',
                    content: loaderData.description,
                  },
                ]
              : []),
            { property: 'og:type', content: 'article' },
            {
              property: 'og:image',
              content: `https://joshmatz.com/og/${loaderData.slug}`,
            },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:image:type', content: 'image/png' },
            {
              property: 'og:url',
              content: `https://joshmatz.com/writing/${loaderData.slug}`,
            },
            { property: 'og:site_name', content: 'Josh Matz' },
            {
              property: 'article:author',
              content: 'https://joshmatz.com',
            },
            {
              property: 'article:published_time',
              content: new Date(loaderData.date).toISOString(),
            },
            { name: 'author', content: 'Josh Matz' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: loaderData.title },
            ...(loaderData.description
              ? [
                  {
                    name: 'twitter:description',
                    content: loaderData.description,
                  },
                ]
              : []),
            {
              name: 'twitter:image',
              content: `https://joshmatz.com/og/${loaderData.slug}`,
            },
          ]
        : []),
    ],
    links: loaderData
      ? [
          {
            rel: 'canonical',
            href: `https://joshmatz.com/writing/${loaderData.slug}`,
          },
        ]
      : [],
    scripts: loaderData
      ? [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: loaderData.title,
              ...(loaderData.description && {
                description: loaderData.description,
              }),
              image: `https://joshmatz.com/og/${loaderData.slug}`,
              url: `https://joshmatz.com/writing/${loaderData.slug}`,
              datePublished: new Date(loaderData.date).toISOString(),
              author: {
                '@type': 'Person',
                name: 'Josh Matz',
                url: 'https://joshmatz.com',
              },
              publisher: {
                '@type': 'Person',
                name: 'Josh Matz',
                url: 'https://joshmatz.com',
              },
            }),
          },
        ]
      : [],
  }),
})

function PostPage() {
  const post = Route.useLoaderData()

  useEffect(() => {
    if (document.querySelector('blockquote.twitter-tweet')) {
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [post.slug])

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function renderContent(html: string) {
    if (!html.includes('data-component="')) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />
    }

    const parts: React.ReactNode[] = []
    const regex = /<div data-component="([^"]+)"(?:\s*\/>|\s*><\/div>)/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(html)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <div
            key={`html-${lastIndex}`}
            dangerouslySetInnerHTML={{
              __html: html.slice(lastIndex, match.index),
            }}
          />,
        )
      }

      const name = match[1]
      const Component = componentRegistry[name]
      if (Component) {
        parts.push(<Component key={`slot-${name}-${match.index}`} />)
      }

      lastIndex = match.index + match[0].length
    }

    if (lastIndex < html.length) {
      parts.push(
        <div
          key={`html-${lastIndex}`}
          dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }}
        />,
      )
    }

    return parts
  }

  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(post.contentMarkdown).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [post.contentMarkdown])

  return (
  <>
    <article className="max-w-[38rem]">
      <Link
        to="/writing"
        className="text-[0.875rem] text-[var(--color-warm-400)] hover:text-[var(--color-warm-700)] transition-colors duration-200 mb-12 inline-block"
      >
        &larr; Back to writing
      </Link>
      <header className="mb-10">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-[2.25rem] leading-tight font-semibold mb-3 text-[var(--color-warm-900)]">
            {post.title}
          </h1>
          <button
            onClick={handleCopy}
            className="mt-2 shrink-0 p-1.5 rounded text-[var(--color-warm-300)] hover:text-[var(--color-warm-600)] transition-colors duration-200"
            title="Copy as Markdown"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
        <time className="text-[0.9rem] italic text-[var(--color-warm-400)]">
          {formatDate(post.date)}
        </time>
      </header>
      <div className="prose max-w-none">
        {renderContent(post.contentHtml)}
      </div>
    </article>
  </>
  )
}
