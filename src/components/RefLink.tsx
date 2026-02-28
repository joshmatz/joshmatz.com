import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  type ReactNode,
} from 'react'

type TooltipState = {
  text: string
  x: number
  y: number
}

const RefTooltipContext = createContext<{
  show: (text: string, el: HTMLElement) => void
  hide: () => void
}>({
  show: () => {},
  hide: () => {},
})

export function RefTooltipProvider({ children }: { children: ReactNode }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [visible, setVisible] = useState(false)
  const [animate, setAnimate] = useState(false)
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const [adjustedX, setAdjustedX] = useState<number | null>(null)

  const show = useCallback((text: string, el: HTMLElement) => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    const rect = el.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top

    setTooltip((prev) => {
      // If not currently visible, skip animation so it appears in place
      if (!visible) setAnimate(false)
      return { text, x, y }
    })
    setAdjustedX(null)
    setVisible(true)
  }, [visible])

  const hide = useCallback(() => {
    hideTimeout.current = setTimeout(() => {
      setVisible(false)
      setAnimate(false)
    }, 150)
  }, [])

  // Enable animation after first position is painted
  useLayoutEffect(() => {
    if (visible && tooltip && !animate) {
      // Force a frame so the initial position is applied without transition
      requestAnimationFrame(() => {
        setAnimate(true)
      })
    }
  }, [visible, tooltip, animate])

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [])

  // Adjust position if tooltip overflows viewport
  useLayoutEffect(() => {
    if (!visible || !tooltipRef.current || !tooltip) {
      setAdjustedX(null)
      return
    }
    const el = tooltipRef.current
    const rect = el.getBoundingClientRect()
    if (rect.left < 8) {
      setAdjustedX(8 + rect.width / 2)
    } else if (rect.right > window.innerWidth - 8) {
      setAdjustedX(window.innerWidth - 8 - rect.width / 2)
    } else {
      setAdjustedX(null)
    }
  }, [visible, tooltip])

  const x = adjustedX ?? tooltip?.x ?? 0
  const y = tooltip?.y ?? 0

  return (
    <RefTooltipContext.Provider value={{ show, hide }}>
      {children}
      <span
        ref={tooltipRef}
        className="fixed px-3 py-1.5 text-sm text-[var(--color-warm-100)] bg-[var(--color-warm-800)] rounded whitespace-nowrap pointer-events-none z-50"
        style={{
          left: x,
          top: y - 8,
          transform: 'translateX(-50%) translateY(-100%)',
          opacity: visible ? 1 : 0,
          transition: animate
            ? 'left 200ms ease, top 200ms ease, opacity 150ms ease'
            : 'opacity 150ms ease',
        }}
      >
        {tooltip?.text}
      </span>
    </RefTooltipContext.Provider>
  )
}

export function RefLabel({
  children,
  tooltip,
  className = '',
}: {
  children: ReactNode
  tooltip: string
  className?: string
}) {
  const { show, hide } = useContext(RefTooltipContext)
  const ref = useRef<HTMLSpanElement>(null)

  const handleEnter = () => {
    if (ref.current) show(tooltip, ref.current)
  }

  return (
    <span
      ref={ref}
      className={`cursor-default ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={hide}
      onFocus={handleEnter}
      onBlur={hide}
      tabIndex={0}
    >
      {children}
    </span>
  )
}

export function RefLink({
  href,
  number,
  tooltip,
}: {
  href: string
  number: number
  tooltip: string
}) {
  const { show, hide } = useContext(RefTooltipContext)
  const ref = useRef<HTMLSpanElement>(null)

  const handleEnter = () => {
    if (ref.current) show(tooltip, ref.current)
  }

  return (
    <span
      ref={ref}
      className="inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={hide}
      onFocus={handleEnter}
      onBlur={hide}
    >
      <a
        href={href}
        className="text-[var(--color-warm-400)] hover:text-[var(--color-warm-900)] transition-colors duration-200 text-sm"
      >
        [{number}]
      </a>
    </span>
  )
}
