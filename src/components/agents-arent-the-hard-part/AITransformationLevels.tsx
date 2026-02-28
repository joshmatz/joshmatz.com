import { useState, useEffect, useRef } from 'react'

// ─── Data ────────────────────────────────────────────────────────────

const LEVELS = [
  {
    id: 1,
    label: 'Thought Partner',
    short: 'Brainstorm, refine, explore',
    x: 0.08,
  },
  {
    id: 2,
    label: 'Assistant',
    short: 'Research, draft, execute with you',
    x: 0.32,
  },
  {
    id: 3,
    label: 'Teammate',
    short: 'React to events, run routines',
    x: 0.58,
  },
  {
    id: 4,
    label: 'Embedded Operator',
    short: 'Own workflows, scale capacity',
    x: 0.82,
  },
]

// ─── Curve math ──────────────────────────────────────────────────────

// Chart area within the SVG
const CHART = {
  left: 55,
  right: 680,
  top: 20,
  bottom: 280,
}

const chartW = CHART.right - CHART.left
const chartH = CHART.bottom - CHART.top

// Exponential curve: y = e^(kx) normalized to fill the chart
// Using k=4 for a nice hockey-stick shape
function curveY(t: number): number {
  const k = 4.5
  const raw = (Math.exp(k * t) - 1) / (Math.exp(k) - 1)
  return CHART.bottom - raw * chartH
}

function curveX(t: number): number {
  return CHART.left + t * chartW
}

// Generate the curve path
function buildCurvePath(): string {
  const steps = 80
  const points: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = curveX(t)
    const y = curveY(t)
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return points.join(' ')
}

// Generate the filled area path (curve + bottom edge)
function buildFillPath(): string {
  const curve = buildCurvePath()
  return `${curve} L${CHART.right},${CHART.bottom} L${CHART.left},${CHART.bottom} Z`
}

// Level positions on the curve
const levelPositions = LEVELS.map((level) => ({
  ...level,
  cx: curveX(level.x),
  cy: curveY(level.x),
}))

// Divider x positions (midpoints between levels)
const dividerXs = LEVELS.slice(0, -1).map((level, i) => {
  const nextLevel = LEVELS[i + 1]
  const midT = (level.x + nextLevel.x) / 2
  return curveX(midT)
})

// ─── Component ───────────────────────────────────────────────────────

export function AITransformationLevels() {
  const figureRef = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState(0)
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null)

  useEffect(() => {
    const el = figureRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase(1)
          setTimeout(() => setPhase(2), 300)
          setTimeout(() => setPhase(3), 500)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hasHover = hoveredLevel !== null

  return (
    <figure ref={figureRef} className="my-12 md:-mx-14">
      {/* Desktop */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 720 340"
          className="w-full"
          style={{ fontFamily: 'var(--font-serif)' }}
          role="img"
          aria-label="Chart showing four levels of AI adoption, from thought partner to embedded operator, with value increasing exponentially as automation increases"
        >
          {/* Divider lines */}
          {dividerXs.map((dx, i) => (
            <line
              key={i}
              x1={dx}
              y1={CHART.top}
              x2={dx}
              y2={CHART.bottom}
              stroke="var(--color-warm-200)"
              strokeWidth={1}
              strokeDasharray="4 4"
              style={{
                opacity: phase >= 1 ? 0.6 : 0,
                transition: 'opacity 200ms ease',
                transitionDelay: `${100 + i * 60}ms`,
              }}
            />
          ))}

          {/* Filled area under curve */}
          <path
            d={buildFillPath()}
            fill="var(--color-warm-100)"
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transition: 'opacity 400ms ease',
              transitionDelay: '100ms',
            }}
          />

          {/* Curve line */}
          <path
            d={buildCurvePath()}
            fill="none"
            stroke="var(--color-warm-400)"
            strokeWidth={2}
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: phase >= 1 ? 0 : 1,
              transition: 'stroke-dashoffset 600ms ease',
              transitionDelay: '100ms',
            }}
          />

          {/* Axes (rendered after fill so arrows aren't covered) */}
          <g
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          >
            <line
              x1={CHART.left}
              y1={CHART.top - 5}
              x2={CHART.left}
              y2={CHART.bottom}
              stroke="var(--color-warm-300)"
              strokeWidth={1}
            />
            <line
              x1={CHART.left}
              y1={CHART.bottom}
              x2={CHART.right + 5}
              y2={CHART.bottom}
              stroke="var(--color-warm-300)"
              strokeWidth={1}
            />
            <polygon
              points={`${CHART.left - 4},${CHART.top + 2} ${CHART.left + 4},${CHART.top + 2} ${CHART.left},${CHART.top - 8}`}
              fill="var(--color-warm-300)"
            />
            <polygon
              points={`${CHART.right - 2},${CHART.bottom - 4} ${CHART.right - 2},${CHART.bottom + 4} ${CHART.right + 8},${CHART.bottom}`}
              fill="var(--color-warm-300)"
            />
            <text
              x={CHART.left - 10}
              y={CHART.top + chartH * 0.4}
              textAnchor="middle"
              fill="var(--color-warm-400)"
              fontSize={12}
              fontWeight={500}
              transform={`rotate(-90, ${CHART.left - 10}, ${CHART.top + chartH * 0.4})`}
            >
              Value
            </text>
            <text
              x={CHART.left + chartW * 0.5}
              y={CHART.bottom + 28}
              textAnchor="middle"
              fill="var(--color-warm-400)"
              fontSize={12}
              fontWeight={500}
            >
              Automation
            </text>
          </g>

          {/* Level markers and labels */}
          {levelPositions.map((level, i) => {
            const dimmed = hasHover && hoveredLevel !== level.id
            return (
              <g
                key={level.id}
                onMouseEnter={() => setHoveredLevel(level.id)}
                onMouseLeave={() => setHoveredLevel(null)}
                style={{
                  cursor: 'pointer',
                  opacity: phase >= 2 ? (dimmed ? 0.15 : 1) : 0,
                  transition: 'opacity 200ms ease',
                  transitionDelay: phase < 2 ? `${i * 80}ms` : '0ms',
                }}
              >
                {/* Invisible hit area */}
                <rect
                  x={level.cx - 60}
                  y={Math.min(level.cy - 10, CHART.top)}
                  width={120}
                  height={Math.max(CHART.bottom - level.cy + 10, 60)}
                  fill="transparent"
                />
                {/* Dot on curve */}
                <circle
                  cx={level.cx}
                  cy={level.cy}
                  r={5}
                  fill="var(--color-warm-50)"
                  stroke="var(--color-warm-400)"
                  strokeWidth={2}
                />
                {/* Level number */}
                <text
                  x={level.cx}
                  y={level.cy - 52}
                  textAnchor="middle"
                  fill="var(--color-warm-400)"
                  fontSize={11}
                  fontWeight={500}
                  stroke="var(--color-warm-50)"
                  strokeWidth={4}
                  paintOrder="stroke"
                >
                  Level {level.id}
                </text>
                {/* Level name */}
                <text
                  x={level.cx}
                  y={level.cy - 34}
                  textAnchor="middle"
                  fill="var(--color-warm-800)"
                  fontSize={14}
                  fontWeight={600}
                  stroke="var(--color-warm-50)"
                  strokeWidth={5}
                  paintOrder="stroke"
                >
                  {level.label}
                </text>
                {/* Short description */}
                <text
                  x={level.cx}
                  y={level.cy - 18}
                  textAnchor="middle"
                  fill="var(--color-warm-500)"
                  stroke="var(--color-warm-50)"
                  strokeWidth={4}
                  paintOrder="stroke"
                  fontSize={10.5}
                >
                  {level.short}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <svg
          viewBox="0 0 320 300"
          className="w-full"
          style={{ fontFamily: 'var(--font-serif)' }}
          role="img"
          aria-label="Chart showing four levels of AI adoption with value increasing as automation increases"
        >
          {/* Mobile curve and fill */}
          {(() => {
            const mChart = { left: 40, right: 300, top: 20, bottom: 240 }
            const mW = mChart.right - mChart.left
            const mH = mChart.bottom - mChart.top
            const k = 4.5

            function mCurveY(t: number) {
              return mChart.bottom - ((Math.exp(k * t) - 1) / (Math.exp(k) - 1)) * mH
            }
            function mCurveX(t: number) {
              return mChart.left + t * mW
            }

            const steps = 60
            let curvePath = ''
            let fillPath = ''
            for (let i = 0; i <= steps; i++) {
              const t = i / steps
              curvePath += `${i === 0 ? 'M' : 'L'}${mCurveX(t).toFixed(1)},${mCurveY(t).toFixed(1)} `
            }
            fillPath = `${curvePath} L${mChart.right},${mChart.bottom} L${mChart.left},${mChart.bottom} Z`

            const mLevels = LEVELS.map((l) => ({
              ...l,
              cx: mCurveX(l.x),
              cy: mCurveY(l.x),
            }))

            return (
              <>
                <path
                  d={fillPath}
                  fill="var(--color-warm-100)"
                  style={{
                    opacity: phase >= 1 ? 1 : 0,
                    transition: 'opacity 400ms ease',
                  }}
                />
                <path
                  d={curvePath}
                  fill="none"
                  stroke="var(--color-warm-400)"
                  strokeWidth={1.5}
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: phase >= 1 ? 0 : 1,
                    transition: 'stroke-dashoffset 600ms ease',
                  }}
                />
                {/* Axes (after fill so arrowheads aren't covered) */}
                <g
                  style={{
                    opacity: phase >= 1 ? 1 : 0,
                    transition: 'opacity 200ms ease',
                  }}
                >
                  <line x1={40} y1={15} x2={40} y2={240} stroke="var(--color-warm-300)" strokeWidth={1} />
                  <line x1={40} y1={240} x2={305} y2={240} stroke="var(--color-warm-300)" strokeWidth={1} />
                  <polygon points="36,22 44,22 40,12" fill="var(--color-warm-300)" />
                  <polygon points="298,236 298,244 308,240" fill="var(--color-warm-300)" />
                  <text x={25} y={135} textAnchor="middle" fill="var(--color-warm-400)" fontSize={10} fontWeight={500} transform="rotate(-90, 25, 135)">Value</text>
                  <text x={172} y={258} textAnchor="middle" fill="var(--color-warm-400)" fontSize={10} fontWeight={500}>Automation</text>
                </g>
                {mLevels.map((level, i) => {
                  const extraUp = level.id === 2 || level.id === 3 ? 12 : 0
                  return (
                  <g
                    key={level.id}
                    style={{
                      opacity: phase >= 2 ? 1 : 0,
                      transition: 'opacity 200ms ease',
                      transitionDelay: `${i * 80}ms`,
                    }}
                  >
                    <circle
                      cx={level.cx}
                      cy={level.cy}
                      r={4}
                      fill="var(--color-warm-50)"
                      stroke="var(--color-warm-400)"
                      strokeWidth={1.5}
                    />
                    <text
                      x={level.cx}
                      y={level.cy - 28 - extraUp}
                      textAnchor="middle"
                      fill="var(--color-warm-400)"
                      fontSize={8.5}
                      fontWeight={500}
                      stroke="var(--color-warm-50)"
                      strokeWidth={3}
                      paintOrder="stroke"
                    >
                      Level {level.id}
                    </text>
                    <text
                      x={level.cx}
                      y={level.cy - 15 - extraUp}
                      textAnchor="middle"
                      fill="var(--color-warm-800)"
                      fontSize={11}
                      fontWeight={600}
                      stroke="var(--color-warm-50)"
                      strokeWidth={4}
                      paintOrder="stroke"
                    >
                      {level.label}
                    </text>
                  </g>
                  )
                })}
              </>
            )
          })()}
        </svg>
      </div>

      <figcaption className="mt-2 text-center text-[0.8rem] italic text-[var(--color-warm-400)]">
        Adapted from Notion's{' '}
        <a
          href="https://x.com/Johnsjawn/status/2027077360848408720"
          className="underline decoration-[var(--color-warm-300)] underline-offset-2 hover:decoration-[var(--color-warm-500)] transition-colors duration-200"
        >
          AI Transformation Model
        </a>
      </figcaption>
    </figure>
  )
}
