import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '~/lib/posts'
import homePageMarkdown from '~/content/pages/index.md?raw'

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

export const Route = createFileRoute('/index.md')({
  server: {
    handlers: {
      GET: () => {
        const posts = getAllPosts().slice(0, 3)
        const content = `${homePageMarkdown.trim()}\n\n## Recent Writing\n\n${formatPostList(posts)}\n`
        return new Response(content, {
          headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
        })
      },
    },
  },
})
