import { Sun, Moon, Monitor } from 'lucide-react'

const themes = ['system', 'light', 'dark'] as const

export function ThemeToggle() {
  const cycle = () => {
    const current =
      (document.documentElement.getAttribute('data-theme') as
        | (typeof themes)[number]
        | null) ?? 'system'
    const next = themes[(themes.indexOf(current) + 1) % themes.length]
    try {
      localStorage.setItem('theme', next)
    } catch {}
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button
      onClick={cycle}
      className="text-[var(--color-warm-400)] hover:text-[var(--color-warm-900)] transition-colors duration-200"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      <Monitor size={16} className="theme-icon theme-icon-system" />
      <Sun size={16} className="theme-icon theme-icon-light" />
      <Moon size={16} className="theme-icon theme-icon-dark" />
    </button>
  )
}
