import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import additionalBlogPosts from "@/data/additional-blog-posts.json";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
  category?: string;
  tags?: string[];
  image?: string;
}

export async function GET() {
  try {
    // Get regular blog posts from files
    const blogPostsDir = path.join(process.cwd(), "src/data/blog-posts");
    let blogPosts: BlogPost[] = [];

    // Check if directory exists first
    if (fs.existsSync(blogPostsDir)) {
      const files = fs.readdirSync(blogPostsDir);

      // Read each file and extract basic info
      blogPosts = files.map((filename, index) => {
        const filePath = path.join(blogPostsDir, filename);
        const content = fs.readFileSync(filePath, "utf8");

        // Simple frontmatter parsing
        const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        const frontMatter = frontMatterMatch ? frontMatterMatch[1] : "";

        // Extract title and date
        const titleMatch = frontMatter.match(/title: ["']?(.*?)["']?\n/);
        const dateMatch = frontMatter.match(/date: ["']?(.*?)["']?\n/);

        // Get excerpt from content (first 150 chars after frontmatter)
        const contentWithoutFrontmatter = content.replace(
          /^---\n[\s\S]*?\n---\n/,
          ""
        );
        const excerpt = contentWithoutFrontmatter.substring(0, 150) + "...";

        return {
          id: (index + 1).toString(),
          title: titleMatch ? titleMatch[1] : filename.replace(".md", ""),
          date: dateMatch ? dateMatch[1] : "Unknown date",
          excerpt: excerpt,
          slug: filename.replace(".md", ""),
        };
      });
    }

    // Combine with additional blog posts
    const allPosts: BlogPost[] = [
      ...blogPosts,
      ...additionalBlogPosts.posts.map((post, index) => ({
        id: `additional-${index + 1}`,
        title: post.title,
        date: post.date,
        category: post.category,
        tags: post.tags,
        excerpt: post.content.substring(0, 150) + "...",
        image: post.image,
      })),
    ];

    // Sort by date (newest first)
    allPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json([], { status: 500 });
  }
}
