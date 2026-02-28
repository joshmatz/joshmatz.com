import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { PostList } from '~/components/PostList'
import { getAllPosts } from '~/lib/posts'

const getPosts = createServerFn({ method: 'GET' }).handler(() => {
  return getAllPosts()
})

export const Route = createFileRoute('/writing/')({
  component: WritingIndex,
  loader: () => getPosts(),
  head: () => ({
    meta: [
      { title: 'Writing — Josh Matz' },
      {
        name: 'description',
        content:
          'Posts about building software, side projects, startups, and working with AI agents.',
      },
      { property: 'og:title', content: 'Writing — Josh Matz' },
      {
        property: 'og:description',
        content:
          'Posts about building software, side projects, startups, and working with AI agents.',
      },
      { property: 'og:url', content: 'https://joshmatz.com/writing' },
      { name: 'twitter:title', content: 'Writing — Josh Matz' },
      {
        name: 'twitter:description',
        content:
          'Posts about building software, side projects, startups, and working with AI agents.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://joshmatz.com/writing' }],
  }),
})

function WritingIndex() {
  const posts = Route.useLoaderData()

  return (
    <div className="max-w-[38rem]">
      <h1 className="text-[2.5rem] leading-tight font-semibold mb-12 text-[var(--color-warm-900)]">
        Writing
      </h1>
      <PostList posts={posts} />
    </div>
  )
}
