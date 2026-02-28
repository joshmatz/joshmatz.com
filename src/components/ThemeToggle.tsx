import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

const themes = ['system', 'light', 'dark'] as const
type Theme = (typeof themes)[number]

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored && themes.includes(stored)) {
        setTheme(stored)
      }
    } catch {}
  }, [])

  const cycle = () => {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length]
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
    document.documentElement.setAttribute('data-theme', next)
  }

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

  return (
    <button
      onClick={cycle}
      className="text-[var(--color-warm-400)] hover:text-[var(--color-warm-900)] transition-colors duration-200"
      title={`Theme: ${theme}`}
      aria-label={`Switch theme (current: ${theme})`}
    >
      <Icon size={16} />
    </button>
  )
}
