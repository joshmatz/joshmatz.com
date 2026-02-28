# joshmatz.com

Personal site for Josh Matz. Built with TanStack Start, React, Tailwind CSS, and MDX.

## About Josh

Co-Founder & CTO at DocStation (pharmacy care management software). Lives in the Dallas area with wife, dog, two kids. BFA in Graphic Design from Baylor. Designer turned developer. Previously at InVision, SRC:CLR (SourceClear), Springbox, and freelance.

Also building [Nitejar](https://nitejar.dev) — an agent platform for teams.

## Writing tone & voice

Josh's writing is **conversational, honest, and a little funny** without trying too hard. Think "smart friend explaining something at a bar," not "thought leader on LinkedIn."

**Reference post:** `src/content/posts/agents-need-org-charts-not-prompts.mdx` — this is the gold standard for tone.

Key traits:
- **Casual but substantive.** Sentences like "People just kind of do what they think needs to happen to make progress" — plain language carrying a real insight.
- **Self-deprecating, not self-serious.** Go-kart trophies, scare-quoted "freelancing," a cat he refuses to claim. Never puffs himself up.
- **Says the uncomfortable thing plainly.** "This is where headcount conversations start happening, whether we like it or not." No hedging, no corporate softening.
- **Short paragraphs, italics for emphasis.** Reads fast. Not academic.
- **Links to sources without over-explaining them.** Mention the thing, link it, move on. Don't restate the product's feature list.
- **Uses real examples from his own work.** Not hypothetical "imagine if" scenarios — actual tools, actual companies, actual experiences.

What to avoid:
- Resume-speak or LinkedIn energy ("passionate about leveraging...")
- Conceited framing ("I write all the code that matters")
- Over-explaining links or tools — just link and move on
- Stiff time references for recent things ("that stuck with me" for something he read an hour ago)
- Em dashes (—) anywhere on the site: in writing, metadata, descriptions, or UI copy. Use periods, commas, or restructure the sentence instead.
- Emoji in writing

## Site structure

- `src/routes/index.tsx` — homepage (two-column: hero/bio left, recent posts right)
- `src/routes/writing/index.tsx` — all posts list
- `src/routes/writing/$slug.tsx` — individual post page
- `src/routes/__root.tsx` — root layout (nav, footer, full-width container)
- `src/content/posts/*.mdx` — blog posts (YAML frontmatter: `date`, `title`)
- `src/components/PostList.tsx` — shared post list component
- `src/styles.css` — global styles (Tailwind + custom CSS)
- `src/data/` — JSON data files

## Layout notes

- Root container is full-width (no max-width), just horizontal padding
- Homepage uses a two-column CSS grid (`.homepage-top`) that collapses on mobile
- Writing pages are capped at `max-w-[38rem]` for reading comfort
- Text sizes on the homepage are deliberately large
