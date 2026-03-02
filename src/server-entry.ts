import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { getAllPosts, getPost } from '~/lib/posts'
import homePageMarkdown from '~/content/pages/index.md?raw'
import writingPageMarkdown from '~/content/pages/writing.md?raw'

const startFetch = createStartHandler(defaultStreamHandler)

function formatPostList(
  posts: Array<{ title: string; slug: string; date: string }>,
) {
  return posts
    .map((post) => {
      const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return `- [${post.title}](https://joshmatz.com/writing/${post.slug}) - ${date}`
    })
    .join('\n')
}

function markdownResponse(content: string) {
  return new Response(content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}

export default {
  async fetch(request: Request, ...args: Array<unknown>) {
    const url = new URL(request.url)

    // /index.md - homepage markdown
    if (url.pathname === '/index.md') {
      const posts = getAllPosts().slice(0, 3)
      const content = `${homePageMarkdown.trim()}\n\n## Recent Writing\n\n${formatPostList(posts)}\n`
      return markdownResponse(content)
    }

    // /writing.md - writing index markdown
    if (url.pathname === '/writing.md') {
      const posts = getAllPosts()
      const content = `${writingPageMarkdown.trim()}\n\n## Posts\n\n${formatPostList(posts)}\n`
      return markdownResponse(content)
    }

    // /writing/$slug.md - blog post markdown
    const postMatch = url.pathname.match(/^\/writing\/(.+)\.md$/)
    if (postMatch) {
      const slug = postMatch[1]
      try {
        const post = await getPost(slug)
        return markdownResponse(post.contentMarkdown)
      } catch {
        return new Response('Post not found', { status: 404 })
      }
    }

    return startFetch(request, ...args)
  },
}
