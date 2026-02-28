import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '~/lib/posts'
import { generatePostOgImage } from '~/lib/og'

export const Route = createFileRoute('/og/$slug')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const posts = getAllPosts()
        const post = posts.find((p) => p.slug === params.slug)

        if (!post) {
          return new Response('Not found', { status: 404 })
        }

        const response = await generatePostOgImage(post.title, post.date)

        return new Response(response.body, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      },
    },
  },
})
