import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const postFiles = import.meta.glob('../content/posts/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
}

export type Post = PostMeta & {
  contentHtml: string
  contentMarkdown: string
}

export function getAllPosts(): PostMeta[] {
  const posts = Object.entries(postFiles).map(([filepath, raw]) => {
    const slug = filepath.split('/').pop()!.replace(/\.mdx$/, '')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: (data.description as string) || '',
    }
  })
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function getPost(slug: string): Promise<Post> {
  const entry = Object.entries(postFiles).find(([filepath]) =>
    filepath.endsWith(`/${slug}.mdx`),
  )
  if (!entry) {
    throw new Error(`Post not found: ${slug}`)
  }
  const [, raw] = entry
  const { data, content } = matter(raw)
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)
  // Strip component divs from markdown for copy-as-markdown
  const cleanMarkdown = content.replace(/<div data-component="[^"]*"><\/div>\n?/g, '')

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: (data.description as string) || '',
    contentHtml: String(result),
    contentMarkdown: `# ${data.title}\n\n${cleanMarkdown.trim()}`,
  }
}
