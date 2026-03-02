import { Link, useLocation } from '@tanstack/react-router'

const unshippedProjects = [
  'a wedding budgeting app',
  'an SMB budgeting tool',
  'an AI app builder that tried to compete with v0',
  'a transcription app that got scooped by Wisprflow',
  'a visual Tailwind editor',
  'an IT asset tracker for laptops',
  'a hosted agent runtime for AI SDK',
  'a personal insurance EOB tracker',
  'a browser game clone in PHP',
  'a Mafia Wars on-chain game',
]

export function NotFound() {
  const { pathname } = useLocation()
  let hash = 0
  for (let i = 0; i < pathname.length; i++) {
    hash = ((hash << 5) - hash + pathname.charCodeAt(i)) | 0
  }
  const project =
    unshippedProjects[Math.abs(hash) % unshippedProjects.length]

  return (
    <div className="max-w-[38rem]">
      <h1 className="text-[2.5rem] sm:text-[3rem] leading-[1.15] font-semibold mb-8 text-[var(--color-warm-900)]">
        This page doesn't exist.
      </h1>
      <div className="prose text-[1.25rem] leading-relaxed text-[var(--color-warm-600)]">
        <p>
          Kind of like {project} I started and never shipped.
        </p>
        <p>
          You can go{' '}
          <Link to="/" className="text-[var(--color-warm-900)] underline decoration-dashed decoration-[var(--color-warm-300)] underline-offset-4 hover:decoration-[var(--color-warm-900)] transition-colors duration-200">
            home
          </Link>
          {' '}or read some{' '}
          <Link to="/writing" className="text-[var(--color-warm-900)] underline decoration-dashed decoration-[var(--color-warm-300)] underline-offset-4 hover:decoration-[var(--color-warm-900)] transition-colors duration-200">
            writing
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
