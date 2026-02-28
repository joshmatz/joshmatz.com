import { createFileRoute } from '@tanstack/react-router'
import { generateHomeOgImage, generateDefaultOgImage } from '~/lib/og'

export const Route = createFileRoute('/og/site')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const variant = url.searchParams.get('v')

        const response =
          variant === 'home'
            ? await generateHomeOgImage()
            : await generateDefaultOgImage()

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
