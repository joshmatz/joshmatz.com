import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { PostList } from '~/components/PostList'
import { RefLabel, RefLink, RefTooltipProvider, StatusDot } from '~/components/RefLink'
import { getAllPosts } from '~/lib/posts'

const getRecentPosts = createServerFn({ method: 'GET' }).handler(() => {
  return getAllPosts().slice(0, 3)
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => getRecentPosts(),
  head: () => ({
    meta: [
      {
        name: 'description',
        content:
          'Designer turned developer. Co-Founder & CTO at DocStation. Writing about building software, leading teams, and working with AI agents.',
      },
      { property: 'og:title', content: 'Josh Matz' },
      {
        property: 'og:description',
        content:
          'Designer turned developer. Co-Founder & CTO at DocStation. Writing about building software, leading teams, and working with AI agents.',
      },
      {
        property: 'og:image',
        content: 'https://joshmatz.com/og/site?v=home',
      },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:url', content: 'https://joshmatz.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Josh Matz' },
      {
        name: 'twitter:description',
        content:
          'Designer turned developer. Co-Founder & CTO at DocStation. Writing about building software, leading teams, and working with AI agents.',
      },
      {
        name: 'twitter:image',
        content: 'https://joshmatz.com/og/site?v=home',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://joshmatz.com/' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Josh Matz',
          url: 'https://joshmatz.com',
          author: {
            '@type': 'Person',
            name: 'Josh Matz',
            url: 'https://joshmatz.com',
            jobTitle: 'Co-Founder & CTO',
            worksFor: {
              '@type': 'Organization',
              name: 'DocStation',
              url: 'https://docstation.co',
            },
            sameAs: [
              'https://github.com/joshmatz',
              'https://linkedin.com/in/joshmatz',
              'https://twitter.com/joshmatz',
              'https://dribbble.com/joshmatz',
            ],
          },
        }),
      },
    ],
  }),
})

function Home() {
  const recentPosts = Route.useLoaderData()

  return (
    <div>
      <section className="homepage-top">
        <div className="homepage-hero">
          <h1 className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.15] font-semibold mb-8 text-[var(--color-warm-900)]">
            Designer who learned to code and somehow never stopped.
          </h1>
          <div className="prose text-[1.25rem] sm:text-[1.375rem] leading-relaxed">
            <p>
              I've been making things for the internet since 2009 — first as a
              designer, then as a developer, now as both at once. I co-founded{' '}
              <a href="https://docstation.co">DocStation</a>, where my title
              says Co-Founder & CTO but my actual job is whatever needs
              doing that week. BFA in Graphic Design.
              I live in the Dallas area with my wife, our dog, and two kids.
            </p>
            <p>
              Before DocStation I was at InVision, which infamously imploded
              after being valued as a unicorn. Before that, SRC:CLR (née
              SourceClear), which got acquired. And before that, Springbox, a
              marketing agency in Austin where my most notable achievement was
              winning a go-kart trophy at an offsite. I also "freelanced" for a few years before that (mostly
              one company, but it counts) and taught myself to code
              building a clone of a browser game called Thardferr in PHP.
            </p>
          </div>

          <RefTooltipProvider>
            <div className="mt-12">
              <h3 className="text-[1.5rem] font-semibold mb-4 text-[var(--color-warm-900)]">
                Projects
              </h3>
              <ul className="space-y-1 text-[1.05rem] text-[var(--color-warm-600)]">
                {/* My projects — online first, then offline */}
                <li><StatusDot status="online" /><RefLabel tooltip="Co-Founder & CTO — remote" className="underline decoration-dashed decoration-[var(--color-warm-300)] underline-offset-4">DocStation</RefLabel> {' '}<RefLink href="https://docstation.co" number={1} tooltip="docstation.co" /> <RefLink href="https://www.statesman.com/story/news/2018/01/23/startup-accelerators-techstars-and-sputnik-atx-introduce-new-austin-cohorts/10169996007/" number={2} tooltip="Techstars Demo Day" /></li>
                <li><StatusDot status="online" />Nitejar {' '}<RefLink href="https://nitejar.dev" number={1} tooltip="Self-hosted AI agent fleet" /> <RefLink href="https://github.com/nitejar/nitejar" number={2} tooltip="GitHub" /></li>
                <li><StatusDot status="online" />Christmas Tree Review Hub {' '}<RefLink href="https://christmastreereviewhub.com" number={1} tooltip="Independent artificial Christmas tree catalog with real specs and reviews" /></li>
                <li><StatusDot status="online" />BoppoStories {' '}<RefLink href="https://boppostories.com" number={1} tooltip="AI-powered personalized kids' stories" /></li>
                <li><StatusDot status="online" />Zomory {' '}<RefLink href="https://zomory.com/" number={1} tooltip="AI-powered Notion search from Slack" /> <RefLink href="https://www.producthunt.com/products/zomory" number={2} tooltip="Product Hunt" /></li>
                <li><StatusDot status="online" />Lemon Drop {' '}<RefLink href="https://www.lemondrop.app/" number={1} tooltip="macOS menu bar app — cash register sound when you get paid on Lemon Squeezy" /> <RefLink href="https://www.producthunt.com/products/lemon-drop" number={2} tooltip="Product Hunt" /></li>
                <li><StatusDot status="online" />joshmatz.com {' '}<RefLink href="https://github.com/joshmatz/joshmatz.com" number={1} tooltip="GitHub" /> <RefLink href="https://web.archive.org/web/20251215143600/https://joshmatz.com/" number={2} tooltip="v3 — design portfolio" /> <RefLink href="https://dribbble.com/shots/2108944-Josh-Matz-Branding" number={3} tooltip="Dribbble — branding history" /></li>
                <li><StatusDot status="offline" />ShiftPlane {' '}<RefLink href="https://www.producthunt.com/products/shiftplane" number={1} tooltip="Community platform — like Reddit + Substack + Patreon" /></li>
                <li><StatusDot status="offline" />CryptoWars {' '}<RefLink href="https://github.com/joshmatz/cryptowars" number={1} tooltip="Mafia Wars on-chain — hit EVM limits, great exploration" /></li>
                <li><StatusDot status="offline" />Thardferr clone {' '}<RefLink href="https://github.com/joshmatz/cta" number={1} tooltip="Source code on GitHub" /></li>
                <li><StatusDot status="offline" />DiscoverWaco {' '}<RefLink href="https://web.archive.org/web/20121013231502/http://discoverwaco.net/" number={1} tooltip="College project — went a lot overboard" /></li>
                <li><StatusDot status="online" />MEA Timeline {' '}<RefLink href="http://jmhosting.space/mea_timeline/" number={1} tooltip="College project — went a little overboard" /></li>
                <li><StatusDot status="unshipped" tooltip="Wedding budgeting app" />Duet {' '}<RefLink href="https://dribbble.com/shots/2690102-Duet-Home-Page" number={1} tooltip="Dribbble — wedding budgeting app" /></li>
                <li><StatusDot status="unshipped" tooltip="SMB budgeting" />PulseHQ</li>
                <li><StatusDot status="unshipped" tooltip="AI app builder, like Bolt meets Base44. Client-only ESM Next.js compilation before Vercel open-sourced their sandbox tooling." />Primiro</li>
                <li><StatusDot status="unshipped" tooltip="Personal insurance billing and EOB tracker" />Insurance EOB tracker</li>

                {/* Places I worked — dashed underline indicates employment */}
                <li className="pt-4"><StatusDot status="dead" /><span className="line-through decoration-[var(--color-warm-300)]"><RefLabel tooltip="Lead Engineer — remote" className="underline decoration-dashed decoration-[var(--color-warm-300)] underline-offset-4">InVision</RefLabel></span> {' '}<RefLink href="https://www.wsj.com/articles/invision-rides-design-demands-to-1-billion-valuation-1509541200" number={1} tooltip="WSJ: $1B valuation" /> <RefLink href="https://www.fastcompany.com/91006037/invision-former-ux-trailblazer-ending-services-figma-adobe" number={2} tooltip="FastCompany: the end of InVision" /></li>
                <li><StatusDot status="offline" tooltip="Acquired" /><RefLabel tooltip="Front-End Engineer — remote" className="underline decoration-dashed decoration-[var(--color-warm-300)] underline-offset-4">SRC:CLR (SourceClear)</RefLabel> {' '}<RefLink href="https://en.wikipedia.org/wiki/SourceClear" number={1} tooltip="Wikipedia — joined as first front-end dev" /> <RefLink href="https://web.archive.org/web/20140725122351/https://sourceclear.com/" number={2} tooltip="Marketing site — designed & developed" /> <RefLink href="https://web.archive.org/web/20140729111039/https://blog.sourceclear.com/" number={3} tooltip="Blog — designed & developed in <1 week, before AI" /></li>
                <li><StatusDot status="offline" tooltip="Acquired" /><RefLabel tooltip="UX Developer" className="underline decoration-dashed decoration-[var(--color-warm-300)] underline-offset-4">Springbox</RefLabel> {' '}<RefLink href="https://www.linkedin.com/company/springbox/about" number={1} tooltip="LinkedIn — hired before graduating, started remote" /> <RefLink href="https://web.archive.org/web/20130805065926/http://springbox.com/" number={2} tooltip="Springbox.com — led design & dev on responsive redesign" /> <RefLink href="https://web.archive.org/web/20130801191326/http://www.sweetleaftea.com/" number={3} tooltip="Sweet Leaf Tea — lead front-end dev" /> <RefLink href="https://design.bybrettjohnson.com/king-pong/" number={4} tooltip="King Pong — led dev" /></li>
                <li><StatusDot status="online" /><RefLabel tooltip="Contract — remote" className="underline decoration-dashed decoration-[var(--color-warm-300)] underline-offset-4">Intelemedia</RefLabel> {' '}<RefLink href="https://web.archive.org/web/20131012035816/http://www.intelemedia.com/" number={1} tooltip="Full WordPress redesign & dev" /> <RefLink href="https://dribbble.com/shots/2676394-Leader-s-Choice-Brochure-Cover" number={2} tooltip="Dribbble — Leader's Choice brochure" /></li>
              </ul>
            </div>
          </RefTooltipProvider>
        </div>

        <div>
          <h2 className="text-[2.5rem] sm:text-[3rem] font-semibold mb-10 text-[var(--color-warm-900)]">
            Recent writing
          </h2>
          <PostList posts={recentPosts} />
        </div>
      </section>
    </div>
  )
}
