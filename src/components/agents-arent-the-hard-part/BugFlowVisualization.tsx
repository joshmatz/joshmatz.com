import { useState, useEffect, useRef, useCallback } from 'react'
import {
  MessageCircle,
  Activity,
  CircleDot,
  Github,
  Hash,
  Rabbit,
  GitPullRequest,
} from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────

type NodeType = 'tool' | 'agent' | 'context'

interface FlowNode {
  id: string
  label: string
  type: NodeType
  desc: string
  reads: string
  outputs: string
  dx: number
  dy: number
  mx: number
  my: number
}

interface FlowEdge {
  id: string
  from: string
  to: string
  style: 'solid' | 'dashed'
  step: number
}

// ─── Lucide icon map ────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  intercom: MessageCircle,
  'intercom-out': MessageCircle,
  datadog: Activity,
  linear: CircleDot,
  github: Github,
  'github-pr': GitPullRequest,
  slack: Hash,
  coderabbit: Rabbit,
}

// ─── Node Data ──────────────────────────────────────────────────────

const NODES: FlowNode[] = [
  {
    id: 'intercom',
    label: 'Intercom',
    type: 'tool',
    desc: 'Customer reports "checkout fails on Safari." Ticket includes browser, OS, and screenshot.',
    reads: 'Customer message, metadata (browser, OS, account tier)',
    outputs: 'Structured ticket routed to Triage Agent',
    dx: 70, dy: 210,
    mx: 170, my: 50,
  },
  {
    id: 'kb',
    label: 'Is this a known issue?',
    type: 'context',
    desc: 'A senior support rep just knows this. They remember the incident from two weeks ago, the runbook someone wrote, the Slack thread where it got discussed. An agent needs all of that wired explicitly.',
    reads: 'Runbooks, past incident notes, internal docs',
    outputs: 'Match/no-match against known issues',
    dx: 200, dy: 80,
    mx: 60, my: 140,
  },
  {
    id: 'past-tickets',
    label: '3 others hit this too',
    type: 'context',
    desc: 'Pattern recognition humans do intuitively. You\'ve seen similar reports this week — that changes severity from "one-off" to "systemic." An agent can\'t feel frequency without being told.',
    reads: 'Historical tickets, customer overlap, report frequency',
    outputs: 'Frequency signal that escalates severity',
    dx: 400, dy: 80,
    mx: 280, my: 140,
  },
  {
    id: 'triage-agent',
    label: 'Triage Agent',
    type: 'agent',
    desc: 'Classifies severity, checks for known issues, decides routing. The first decision-maker in the chain.',
    reads: 'Intercom ticket, Knowledge Base, Past Tickets, Datadog metrics',
    outputs: 'Severity tag, category, routed Linear issue',
    dx: 260, dy: 210,
    mx: 170, my: 210,
  },
  {
    id: 'datadog',
    label: 'Datadog',
    type: 'tool',
    desc: 'Pulls real-time error rates and latency for the affected endpoint. Confirms the bug is systemic, not a one-off.',
    reads: 'Endpoint path from ticket, time window',
    outputs: 'Error rate spike data, affected endpoints, trace IDs',
    dx: 440, dy: 210,
    mx: 170, my: 290,
  },
  {
    id: 'linear',
    label: 'Linear',
    type: 'tool',
    desc: 'Issue created with severity, repro steps, and linked Datadog traces. Assigned to the right team automatically.',
    reads: 'Triage output: severity, category, repro steps',
    outputs: 'Tracked issue with assignee and priority',
    dx: 260, dy: 340,
    mx: 170, my: 370,
  },
  {
    id: 'error-logs',
    label: 'Sarah\'s already on this',
    type: 'context',
    desc: 'Someone mentioned it in standup. There\'s a WIP branch. An engineer just knows not to duplicate the work. An agent has no idea unless you wire in Linear assignees, branch status, and Slack threads.',
    reads: 'Linear assignees, WIP branches, Slack threads, standup notes',
    outputs: 'Duplicate work detection, "already in progress" signal',
    dx: 470, dy: 420,
    mx: 60, my: 460,
  },
  {
    id: 'bug-fix-agent',
    label: 'Bug Fix Agent',
    type: 'agent',
    desc: 'Analyzes the bug, writes a fix, and opens a PR. The second decision-maker — code-level reasoning.',
    reads: 'Linear issue, Error Logs, codebase context',
    outputs: 'Git branch with fix, PR draft',
    dx: 470, dy: 340,
    mx: 170, my: 530,
  },
  {
    id: 'slack',
    label: 'Slack',
    type: 'tool',
    desc: 'Posts to #eng-bugs with the fix summary, linking the Linear issue and PR for team visibility.',
    reads: 'Bug fix summary, PR link, Linear issue link',
    outputs: 'Team notification in #eng-bugs channel',
    dx: 310, dy: 420,
    mx: 60, my: 610,
  },
  {
    id: 'github',
    label: 'GitHub',
    type: 'tool',
    desc: 'PR opened against main with the fix. Includes repro steps in description, linked Linear issue.',
    reads: 'Git diff from Bug Fix Agent',
    outputs: 'Open pull request ready for review',
    dx: 610, dy: 280,
    mx: 170, my: 610,
  },
  {
    id: 'github-pr',
    label: 'GitHub PR',
    type: 'tool',
    desc: 'The pull request itself — CI runs, status checks pass, ready for code review.',
    reads: 'CI/CD pipeline results, test output',
    outputs: 'Merged code on main branch',
    dx: 700, dy: 210,
    mx: 280, my: 680,
  },
  {
    id: 'coderabbit',
    label: 'CodeRabbit',
    type: 'tool',
    desc: 'Automated code review — catches style issues, potential bugs, and security concerns before a human reviewer.',
    reads: 'PR diff, repository context, review rules',
    outputs: 'Review comments, approval or change requests',
    dx: 700, dy: 340,
    mx: 170, my: 750,
  },
  {
    id: 'intercom-out',
    label: 'Intercom',
    type: 'tool',
    desc: 'Customer notified that their bug is fixed. Loop closed — from report to resolution, traced end to end.',
    reads: 'PR merge status, original ticket reference',
    outputs: 'Customer notification: "Your issue has been fixed"',
    dx: 700, dy: 130,
    mx: 60, my: 750,
  },
]

// ─── Edge Data ──────────────────────────────────────────────────────

const EDGES: FlowEdge[] = [
  { id: 'e1', from: 'intercom', to: 'triage-agent', style: 'solid', step: 0 },
  { id: 'e2', from: 'kb', to: 'triage-agent', style: 'dashed', step: 1 },
  { id: 'e3', from: 'past-tickets', to: 'triage-agent', style: 'dashed', step: 1 },
  { id: 'e4', from: 'triage-agent', to: 'datadog', style: 'solid', step: 2 },
  { id: 'e5', from: 'triage-agent', to: 'linear', style: 'solid', step: 3 },
  { id: 'e6', from: 'error-logs', to: 'bug-fix-agent', style: 'dashed', step: 4 },
  { id: 'e7', from: 'linear', to: 'bug-fix-agent', style: 'solid', step: 4 },
  { id: 'e8', from: 'bug-fix-agent', to: 'slack', style: 'solid', step: 5 },
  { id: 'e9', from: 'bug-fix-agent', to: 'github', style: 'solid', step: 5 },
  { id: 'e10', from: 'github', to: 'github-pr', style: 'solid', step: 6 },
  { id: 'e11', from: 'github-pr', to: 'coderabbit', style: 'solid', step: 7 },
  { id: 'e12', from: 'github-pr', to: 'intercom-out', style: 'solid', step: 8 },
]

const TOTAL_STEPS = 9

// ─── Layout Helpers ─────────────────────────────────────────────────

const NODE_SIZES = {
  tool: { w: 112, h: 34, rx: 8 },
  agent: { w: 122, h: 38, rx: 8 },
  context: { w: 158, h: 30, rx: 6 },
}

function getNodeRect(node: FlowNode, mobile: boolean) {
  const s = NODE_SIZES[node.type]
  const cx = mobile ? node.mx : node.dx
  const cy = mobile ? node.my : node.dy
  return { cx, cy, x: cx - s.w / 2, y: cy - s.h / 2, w: s.w, h: s.h, rx: s.rx }
}

function edgePath(edge: FlowEdge, mobile: boolean): string {
  const fromNode = NODES.find((n) => n.id === edge.from)!
  const toNode = NODES.find((n) => n.id === edge.to)!
  const fromR = getNodeRect(fromNode, mobile)
  const toR = getNodeRect(toNode, mobile)

  const dx = toR.cx - fromR.cx
  const dy = toR.cy - fromR.cy
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)

  let x1: number, y1: number, x2: number, y2: number

  if (absDx > absDy) {
    x1 = fromR.cx + (dx > 0 ? fromR.w / 2 : -fromR.w / 2)
    y1 = fromR.cy
    x2 = toR.cx + (dx > 0 ? -toR.w / 2 : toR.w / 2)
    y2 = toR.cy
  } else {
    x1 = fromR.cx
    y1 = fromR.cy + (dy > 0 ? fromR.h / 2 : -fromR.h / 2)
    x2 = toR.cx
    y2 = toR.cy + (dy > 0 ? -toR.h / 2 : toR.h / 2)
  }

  const cpOff = Math.max(absDx, absDy) * 0.35
  let cp1x: number, cp1y: number, cp2x: number, cp2y: number

  if (absDx > absDy) {
    cp1x = x1 + (dx > 0 ? cpOff : -cpOff)
    cp1y = y1
    cp2x = x2 - (dx > 0 ? cpOff : -cpOff)
    cp2y = y2
  } else {
    cp1x = x1
    cp1y = y1 + (dy > 0 ? cpOff : -cpOff)
    cp2x = x2
    cp2y = y2 - (dy > 0 ? cpOff : -cpOff)
  }

  return `M${x1},${y1} C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`
}

// ─── Component ──────────────────────────────────────────────────────

export function BugFlowVisualization() {
  const figureRef = useRef<HTMLElement>(null)
  const [step, setStep] = useState(-1)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [autoPlayDone, setAutoPlayDone] = useState(false)
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = figureRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && step === -1) {
          setStep(0)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [step])

  useEffect(() => {
    if (step < 0 || step >= TOTAL_STEPS) {
      if (step >= TOTAL_STEPS) setAutoPlayDone(true)
      return
    }
    autoPlayRef.current = setTimeout(() => {
      setStep((s) => s + 1)
    }, 800)
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
    }
  }, [step])

  // The "active" node is either hovered or selected (hover takes priority for highlighting)
  const focusedNode = hoveredNode ?? selectedNode
  const activeNodes = new Set<string>()
  const activeEdges = new Set<string>()

  if (focusedNode) {
    activeNodes.add(focusedNode)
    for (const e of EDGES) {
      if (e.from === focusedNode || e.to === focusedNode) {
        activeEdges.add(e.id)
        activeNodes.add(e.from)
        activeNodes.add(e.to)
      }
    }
  }

  const hasFocus = focusedNode !== null

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNode((prev) => (prev === nodeId ? null : nodeId))
  }, [])

  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as SVGElement).tagName === 'svg') {
      setSelectedNode(null)
    }
  }, [])

  // Detail panel shows selected node (persists), not hovered
  const selectedNodeData = selectedNode
    ? NODES.find((n) => n.id === selectedNode)
    : null

  // ─── Render helpers ─────────────────────────────────────────────

  function renderEdges(mobile: boolean) {
    return EDGES.map((edge) => {
      const d = edgePath(edge, mobile)
      const visible = step >= edge.step
      const dimmed = hasFocus && !activeEdges.has(edge.id)
      const isSolid = edge.style === 'solid'

      return (
        <g key={edge.id}>
          <path
            d={d}
            fill="none"
            stroke={isSolid ? 'var(--color-warm-500)' : 'var(--color-warm-300)'}
            strokeWidth={1.5}
            strokeDasharray={isSolid ? undefined : '6 4'}
            markerEnd={`url(#arrow-${isSolid ? 'solid' : 'dashed'})`}
            style={{
              opacity: visible ? (dimmed ? 0.12 : 1) : 0,
              transition: 'opacity 400ms ease',
            }}
          />
          {visible && step === edge.step && !autoPlayDone && (
            <circle r={3} fill="var(--color-warm-500)">
              <animateMotion dur="0.6s" fill="freeze" path={d} />
            </circle>
          )}
        </g>
      )
    })
  }

  function renderNodes(mobile: boolean) {
    return NODES.map((node) => {
      const r = getNodeRect(node, mobile)
      const s = NODE_SIZES[node.type]
      const nodeStep = getNodeAppearStep(node.id)
      const visible = step >= nodeStep
      const dimmed = hasFocus && !activeNodes.has(node.id)
      const isSelected = selectedNode === node.id
      const isHovered = hoveredNode === node.id
      const pulse = visible && step === nodeStep && !autoPlayDone

      const isAgent = node.type === 'agent'
      const isContext = node.type === 'context'

      const strokeColor = isAgent
        ? 'var(--color-warm-400)'
        : 'var(--color-warm-300)'
      const strokeW = isAgent ? 2 : 1
      const fontSize = mobile ? 10 : 11

      const IconComponent = ICON_MAP[node.id]
      const hasIcon = !!IconComponent
      const iconSize = mobile ? 11 : 12

      return (
        <g
          key={node.id}
          onClick={() => handleNodeClick(node.id)}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            cursor: 'pointer',
            opacity: visible ? (dimmed ? 0.12 : 1) : 0,
            transition: 'opacity 400ms ease',
          }}
        >
          <rect
            x={r.x}
            y={r.y}
            width={s.w}
            height={s.h}
            rx={s.rx}
            fill="transparent"
            stroke={
              isSelected || isHovered
                ? 'var(--color-warm-600)'
                : strokeColor
            }
            strokeWidth={isSelected ? 2.5 : isHovered ? 2 : strokeW}
            strokeDasharray={isContext ? '4 3' : undefined}
          />
          {pulse && (
            <rect
              x={r.x}
              y={r.y}
              width={s.w}
              height={s.h}
              rx={s.rx}
              fill="none"
              stroke="var(--color-warm-400)"
              strokeWidth={2}
            >
              <animate attributeName="opacity" values="0.8;0" dur="0.8s" fill="freeze" />
              <animate attributeName="stroke-width" values="2;6" dur="0.8s" fill="freeze" />
            </rect>
          )}
          {hasIcon && (
            <foreignObject
              x={r.cx - s.w / 2 + 10}
              y={r.cy - iconSize / 2}
              width={iconSize}
              height={iconSize}
            >
              <IconComponent size={iconSize} strokeWidth={1.5} />
            </foreignObject>
          )}
          <text
            x={hasIcon ? r.cx - s.w / 2 + 10 + iconSize + 5 : r.cx}
            y={r.cy + 1}
            textAnchor={hasIcon ? 'start' : 'middle'}
            dominantBaseline="central"
            fill={isContext ? 'var(--color-warm-500)' : 'var(--color-warm-800)'}
            fontSize={isContext ? fontSize - 0.5 : fontSize}
            fontWeight={isAgent ? 600 : isContext ? 400 : 500}
            fontStyle={isContext ? 'italic' : undefined}
          >
            {node.label}
          </text>
        </g>
      )
    })
  }

  function renderLegend(mobile: boolean) {
    const visible = step >= 0
    if (mobile) {
      return (
        <g style={{ opacity: visible ? 1 : 0, transition: 'opacity 400ms ease' }}>
          <line x1={40} y1={810} x2={70} y2={810} stroke="var(--color-warm-500)" strokeWidth={1.5} />
          <text x={76} y={814} fill="var(--color-warm-500)" fontSize={9.5}>wired handoff</text>
          <line x1={180} y1={810} x2={210} y2={810} stroke="var(--color-warm-300)" strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={216} y={814} fill="var(--color-warm-500)" fontSize={9.5}>implicit context</text>
        </g>
      )
    }
    return (
      <g style={{ opacity: visible ? 1 : 0, transition: 'opacity 400ms ease' }}>
        <line x1={230} y1={475} x2={265} y2={475} stroke="var(--color-warm-500)" strokeWidth={1.5} />
        <text x={272} y={479} fill="var(--color-warm-500)" fontSize={11}>wired handoff (API integration)</text>
        <line x1={480} y1={475} x2={515} y2={475} stroke="var(--color-warm-300)" strokeWidth={1.5} strokeDasharray="6 4" />
        <text x={522} y={479} fill="var(--color-warm-500)" fontSize={11}>implicit context (in people's heads)</text>
      </g>
    )
  }

  function renderDefs() {
    return (
      <defs>
        <marker id="arrow-solid" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-warm-500)" />
        </marker>
        <marker id="arrow-dashed" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-warm-300)" />
        </marker>
      </defs>
    )
  }

  return (
    <figure ref={figureRef} className="my-12 md:-mx-14">
      {/* Desktop */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 770 490"
          className="w-full"
          style={{ fontFamily: 'var(--font-serif)' }}
          role="img"
          aria-label="Interactive diagram showing a bug report flowing from Intercom through Triage Agent, Linear, Bug Fix Agent, GitHub, and CodeRabbit to resolution"
          onClick={handleSvgClick}
        >
          {renderDefs()}
          {renderEdges(false)}
          {renderNodes(false)}
          {renderLegend(false)}
        </svg>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <svg
          viewBox="0 0 340 830"
          className="w-full"
          style={{ fontFamily: 'var(--font-serif)' }}
          role="img"
          aria-label="Interactive diagram showing a bug report flowing from Intercom through Triage Agent, Linear, Bug Fix Agent, GitHub, and CodeRabbit to resolution"
          onClick={handleSvgClick}
        >
          {renderDefs()}
          {renderEdges(true)}
          {renderNodes(true)}
          {renderLegend(true)}
        </svg>
      </div>

      {/* Detail panel — only visible when a node is selected */}
      {selectedNodeData && (
        <div
          className="mt-3 rounded-lg border border-[var(--color-warm-200)] px-4 py-3 text-[0.82rem] leading-relaxed"
        >
          <div className="mb-1 font-semibold text-[var(--color-warm-800)]">
            {selectedNodeData.label}
            <span className="ml-2 text-[0.75rem] font-normal text-[var(--color-warm-400)]">
              {selectedNodeData.type === 'agent'
                ? 'agent'
                : selectedNodeData.type === 'context'
                  ? 'context'
                  : 'tool'}
            </span>
          </div>
          <p className="text-[var(--color-warm-600)]">{selectedNodeData.desc}</p>
          <div className="mt-1.5 flex flex-wrap gap-x-6 gap-y-1 text-[0.78rem] text-[var(--color-warm-500)]">
            <span><strong>Reads:</strong> {selectedNodeData.reads}</span>
            <span><strong>Outputs:</strong> {selectedNodeData.outputs}</span>
          </div>
        </div>
      )}

      <figcaption className="mt-3 text-center text-[0.8rem] italic text-[var(--color-warm-400)]">
        A bug report flowing from customer to resolution — wired handoffs vs.
        context that lives in people's heads.
      </figcaption>
    </figure>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────

function getNodeAppearStep(nodeId: string): number {
  if (nodeId === 'intercom') return 0
  let minStep = TOTAL_STEPS
  for (const e of EDGES) {
    if (e.to === nodeId && e.step < minStep) minStep = e.step
    if (e.from === nodeId && e.step < minStep) minStep = e.step
  }
  return minStep
}
