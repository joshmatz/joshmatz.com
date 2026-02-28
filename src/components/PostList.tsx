import { Link } from '@tanstack/react-router'
import type { PostMeta } from '~/lib/posts'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="space-y-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            to="/writing/$slug"
            params={{ slug: post.slug }}
            className="group block"
          >
            <time className="text-[0.875rem] italic text-[var(--color-warm-400)]">
              {formatDate(post.date)}
            </time>
            <h3 className="text-[1.25rem] font-medium text-[var(--color-warm-900)] group-hover:text-[var(--color-warm-600)] transition-colors duration-200 mt-1">
              {post.title}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}
