# Project Planning for joshmatz.com Redesign

## Current Project Overview
- **Framework**: Migrating from Hugo static site generator to Next.js
- **Deployment**: Will be hosted with a modern deployment platform (TBD)
- **Theme**: Will be a custom chat interface with AI

## Directory Structure of Note

### Original Content (Reference Only)
- `content/about/index.md`: Personal bio and contact information
- `content/post/`: Blog posts on various topics:
  - `do-something-different.md`: Article about changing approaches to side projects
  - `your-stock-options-are-not-worth-anything.md`: Detailed article about stock options
  - `structure-large-angular-or-javascript-app.md`: Technical article
  - `take-note.md`: Blog post
  - `your-content-can-wait.md`: Blog post
  - `should-you-shrinkwrap-your-node_modules.md`: Technical article
- `content/mea_timeline/index.md`: Information about a Modern European Art Timeline project
- `public/v1/`: Legacy WordPress site with portfolio projects and additional content
  - `public/v1/blog/`: Contains additional blog posts not in the Hugo site

### Assets
- `public/images/`: Contains images used in the blog posts
  - `avatar.png` and `avatar@2x.png`: Profile picture
  - Images organized by blog post in subdirectories
  - `portfolio/`: Portfolio images migrated from v1 site
  - `blog/`: Additional blog post images from v1 site
  - `logo.svg`: Logo from original v1 site

## Valuable Content Preserved
1. **Blog Posts**: 
   - All articles from the original Hugo site copied to `src/data/blog-posts/`
   - Additional blog posts from the v1 WordPress site extracted to `src/data/additional-blog-posts.json`
2. **About Page**: Personal information converted to JSON in `src/data/about.json`
3. **MEA Timeline**: Information about the art timeline project converted to JSON in `src/data/mea_timeline.json`
4. **Portfolio**: Design projects from the v1 site preserved in `src/data/portfolio.json`
5. **Images**: All images retained in `public/images/`
   - Portfolio images copied to `public/images/portfolio/`
   - Blog post images copied to `public/images/blog/`
   - Logo preserved at `public/images/logo.svg`
6. **Personal Information**: Social media links extracted to `src/data/social-links.json`

## Migration Checklist

- [x] Create a `content` directory in the new Next.js project (Created src/data instead)
- [x] Convert Markdown blog posts to a format suitable for Next.js
  - [x] Extract frontmatter data
  - [x] Preserve all content formatting
  - [x] Update image references
- [x] Migrate images to the appropriate directory in the Next.js project
- [x] Create a personal information JSON file based on config.toml data
- [x] Set up Next.js project using create-next-app
- [x] Clean up extraneous files from Hugo project
  - [x] Remove Hugo-specific configuration files
  - [x] Remove theme directory
- [x] Extract portfolio content from v1 directory
  - [x] Create portfolio.json with project information
  - [x] Copy portfolio images to public/images/portfolio/
- [x] Extract additional blog posts from v1 directory
  - [x] Create additional-blog-posts.json with post information
  - [x] Copy blog images to public/images/blog/
- [x] Remove unnecessary files and directories
  - [x] Removed v1 WordPress directory
  - [x] Removed original content directory
- [ ] Design a chat interface that can present the following content types:
  - [ ] About information
  - [ ] Blog post content
  - [ ] MEA Timeline information
  - [ ] Portfolio/work display
- [ ] Create base components for the chat interface
- [ ] Implement the chat logic for presenting content
- [ ] Add AI conversation capabilities
- [ ] Create a testing plan for ensuring content displays correctly

## Next.js Project Structure

```
joshmatz.com/
├── public/
│   ├── images/
│   │   ├── avatar.png
│   │   ├── logo.svg
│   │   ├── blog-post-images/
│   │   ├── blog/
│   │   ├── portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   ├── components/
│   │   ├── ChatInterface/
│   │   ├── ContentDisplay/
│   ├── data/
│   │   ├── blog-posts/
│   │   ├── about.json
│   │   ├── social-links.json
│   │   ├── mea_timeline.json
│   │   ├── portfolio.json
│   │   ├── additional-blog-posts.json
│   ├── utils/
│   │   ├── markdown.ts
│   │   ├── chat.ts
```

## Content Migration Status
- ✅ Blog posts copied to `src/data/blog-posts/`
- ✅ Additional blog posts from v1 site extracted to `src/data/additional-blog-posts.json`
- ✅ About page content converted to JSON in `src/data/about.json`
- ✅ MEA Timeline content converted to JSON in `src/data/mea_timeline.json`
- ✅ Portfolio projects extracted to `src/data/portfolio.json`
- ✅ Social links extracted to `src/data/social-links.json`
- ✅ Images retained in `public/images/`
  - ✅ Portfolio images copied to `public/images/portfolio/`
  - ✅ Blog post images copied to `public/images/blog/`
  - ✅ Logo preserved at `public/images/logo.svg`
- ✅ Next.js project set up
- ✅ Extraneous files removed
  - ✅ v1 WordPress directory removed
  - ✅ Original content directory removed
  - ✅ Hugo-specific files removed 