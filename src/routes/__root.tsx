/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from '@tanstack/react-router'
import appCss from '~/styles.css?url'
import { ThemeToggle } from '~/components/ThemeToggle'
import { NotFound } from '~/components/NotFound'

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Josh Matz' },
      {
        name: 'description',
        content:
          'Designer turned developer. Co-Founder & CTO at DocStation. Writing about building software, leading teams, and working with AI agents.',
      },
      { property: 'og:site_name', content: 'Josh Matz' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content: 'https://joshmatz.com/og/site',
      },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=block',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration'in history)history.scrollRestoration='manual'`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','system')}})()`,
          }}
        />
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[var(--color-warm-50)] text-[var(--color-warm-900)] font-serif antialiased">
        <div className="mx-auto px-8 pt-16 pb-12 sm:px-16 sm:pt-24 lg:px-24">
          <header className="flex items-baseline justify-between mb-20">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight text-[var(--color-warm-900)] hover:text-[var(--color-warm-600)] transition-colors duration-200"
            >
              Josh Matz
            </Link>
            <nav className="flex items-center gap-8 text-[0.95rem]">
              <Link
                to="/"
                className="text-[var(--color-warm-500)] hover:text-[var(--color-warm-900)] transition-colors duration-200 [&.active]:text-[var(--color-warm-900)]"
              >
                About
              </Link>
              <Link
                to="/writing"
                className="text-[var(--color-warm-500)] hover:text-[var(--color-warm-900)] transition-colors duration-200 [&.active]:text-[var(--color-warm-900)]"
              >
                Writing
              </Link>
              <ThemeToggle />
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-32 pt-10 border-t border-[var(--color-warm-200)] text-[0.875rem] text-[var(--color-warm-400)]">
            <div className="flex gap-6">
              <a
                href="https://github.com/joshmatz"
                className="hover:text-[var(--color-warm-700)] transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/joshmatz"
                className="hover:text-[var(--color-warm-700)] transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/joshmatz"
                className="hover:text-[var(--color-warm-700)] transition-colors duration-200"
              >
                Twitter
              </a>
              <a
                href="https://dribbble.com/joshmatz"
                className="hover:text-[var(--color-warm-700)] transition-colors duration-200"
              >
                Dribbble
              </a>
            </div>
          </footer>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s='tsr-scroll-restoration-v1_3';var k=function(){return history.state&&history.state.__TSR_key||location.href};var c=function(){return JSON.parse(sessionStorage.getItem(s)||'{}')};var w=function(){var a=c();var e=a[k()]||(a[k()]={});e.window={scrollX:scrollX||0,scrollY:scrollY||0};sessionStorage.setItem(s,JSON.stringify(a))};var n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];var t=n?n.type:performance.navigation&&performance.navigation.type;var r=t==='reload'||t==='back_forward'||t===1||t===2;if(r){var a=c();var e=a[k()]||a[location.href];if(e&&e.window)scrollTo(e.window.scrollX||0,e.window.scrollY||0)}addEventListener('pagehide',w)}catch(e){}})()`,
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}
