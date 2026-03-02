import { createFileRoute } from '@tanstack/react-router'
import { getPost } from '~/lib/posts'

export const Route = createFileRoute('/writing/{$slug}.md')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const post = await getPost(params.slug)
          return new Response(post.contentMarkdown, {
            headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
          })
        } catch {
          return new Response('Post not found', { status: 404 })
        }
      },
    },
  },
})
