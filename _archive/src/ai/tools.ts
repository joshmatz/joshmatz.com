import { tool } from "ai";
import { z } from "zod";
import fs from "fs/promises"; // For reading files
import path from "path"; // For constructing file paths

// Define expected structures for data files
interface AboutData {
  bio: string;
  [key: string]: unknown;
}
interface SocialLink {
  name: string;
  url: string;
}
interface SocialLinksData {
  links: SocialLink[];
}
interface PortfolioProject {
  title: string;
  description: string;
  [key: string]: unknown;
}
interface PortfolioData {
  projects: PortfolioProject[];
}
interface MEATimelineData {
  title: string;
  description: string;
  [key: string]: unknown;
}
interface BlogPostRef {
  title: string;
  slug: string;
}
interface AdditionalBlogPost {
  title: string;
  slug?: string;
  [key: string]: unknown;
}

// Helper function to read JSON data files safely
async function readDataFile<T>(
  filename: string
): Promise<T | { error: string }> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", filename);
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Error reading data file ${filename}:`, error);
    return { error: `Failed to load data for ${filename}` };
  }
}

// Helper function to list blog post files
async function listBlogPosts(): Promise<
  { posts: BlogPostRef[] } | { error: string }
> {
  try {
    const blogDir = path.join(process.cwd(), "src", "data", "blog-posts");
    const files = await fs.readdir(blogDir);
    const markdownPosts: BlogPostRef[] = files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map((f) => ({ title: f.replace(/\.(md|mdx)$/, ""), slug: f }));

    const additionalPostsData = await readDataFile<{
      posts?: AdditionalBlogPost[];
    }>("additional-blog-posts.json");
    let additionalPosts: BlogPostRef[] = [];
    if (!("error" in additionalPostsData) && additionalPostsData?.posts) {
      additionalPosts = additionalPostsData.posts.map((p) => ({
        title: p.title,
        slug:
          p.slug ||
          p.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
      }));
    }

    return { posts: [...markdownPosts, ...additionalPosts] };
  } catch (error) {
    console.error("Error listing blog posts:", error);
    return { error: "Failed to list blog posts" };
  }
}

// Tool to display general information about Josh Matz
export const displayAboutInfoTool = tool({
  description:
    "Display general information about Josh Matz, including his bio and background.",
  parameters: z.object({}), // No parameters needed, it fetches static data
  execute: async () => readDataFile<AboutData>("about.json"),
});

// Tool to display social media links
export const displaySocialLinksTool = tool({
  description:
    "Display links to Josh Matz's social media profiles (GitHub, LinkedIn, etc.).",
  parameters: z.object({}), // No parameters needed
  execute: async () => readDataFile<SocialLinksData>("social-links.json"),
});

// Tool to display portfolio projects
export const displayPortfolioTool = tool({
  description: "Display information about Josh Matz's portfolio projects.",
  parameters: z.object({
    // Optional: could add a parameter to filter by project name or type later
  }),
  execute: async () => readDataFile<PortfolioData>("portfolio.json"),
});

// Tool to display MEA Timeline information
export const displayMEATimelineTool = tool({
  description:
    "Display information about the Modern European Art (MEA) Timeline project.",
  parameters: z.object({}), // No parameters needed
  execute: async () => readDataFile<MEATimelineData>("mea_timeline.json"),
});

// Tool to list available blog posts
export const listBlogPostsTool = tool({
  description: "List the titles and summaries of available blog posts.",
  parameters: z.object({}),
  execute: async () => listBlogPosts(),
});

// Tool to display a specific blog post (Definition only for now)
// We'll need more logic to handle reading markdown files
export const displayBlogPostTool = tool({
  description:
    "Display the content of a specific blog post when given its title or slug.",
  parameters: z.object({
    slug: z
      .string()
      .describe(
        "The unique identifier (slug) or title of the blog post to display."
      ),
  }),
  // Execute function will be added later in the API route
});

// Combine tools into an object for export
export const tools = {
  displayAboutInfo: displayAboutInfoTool,
  displaySocialLinks: displaySocialLinksTool,
  displayPortfolio: displayPortfolioTool,
  displayMEATimeline: displayMEATimelineTool,
  listBlogPosts: listBlogPostsTool,
  // displayBlogPost: displayBlogPostTool, // Will enable this later
};
