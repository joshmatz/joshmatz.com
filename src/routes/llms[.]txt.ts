import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '~/lib/posts'

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts()

        const content = `# Josh Matz

> Personal site and blog of Josh Matz — designer turned developer, Co-Founder & CTO at DocStation.

## About
Josh Matz is a designer who learned to code and never stopped. He co-founded DocStation, a pharmacy care management software company, where he serves as CTO. He lives in the Dallas area with his wife, dog, and two kids. He holds a BFA in Graphic Design from Baylor University. Previously worked at InVision, SRC:CLR (SourceClear), and Springbox.

He is also building Nitejar (https://nitejar.dev), an agent platform for teams.

## Links
- Website: https://joshmatz.com
- GitHub: https://github.com/joshmatz
- LinkedIn: https://linkedin.com/in/joshmatz
- Twitter: https://twitter.com/joshmatz
- DocStation: https://docstation.co

## Writing
${posts.map((post) => `- ${post.title}: https://joshmatz.com/writing/${post.slug}`).join('\n')}
`

        return new Response(content, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        })
      },
    },
  },
})
