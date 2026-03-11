const LOOP_STEPS = [
  {
    label: 'Send to model',
    color: '#a855f7',
    bg: '#a855f712',
    border: '#a855f733',
  },
  {
    label: 'Get response',
    color: 'var(--color-warm-800)',
    bg: 'var(--color-warm-100)',
    border: 'var(--color-warm-200)',
  },
  {
    label: 'Tool call?',
    color: '#d97706',
    bg: '#d9770612',
    border: '#d9770633',
  },
  {
    label: 'Execute tool',
    color: '#2563eb',
    bg: '#2563eb12',
    border: '#2563eb33',
  },
  {
    label: 'Send result back',
    color: '#65a30d',
    bg: '#65a30d12',
    border: '#65a30d33',
  },
]

export function AgentLoopVisualization() {
  return (
    <figure className="not-prose my-12 rounded-[1.75rem] border border-[var(--color-warm-300)] bg-gradient-to-br from-[var(--color-warm-100)] to-[var(--color-warm-50)] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.02)] lg:w-[calc(100%+18rem)] lg:max-w-none lg:p-8">
      <div className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-warm-500)]">
        The agentic loop
      </div>
      <p className="mb-7 max-w-[42rem] text-[1rem] leading-8 text-[var(--color-warm-800)]">
        The model is the brain. Everything else is the harness. Without the
        loop, it is just a single completion.
      </p>

      <div className="grid gap-3 lg:grid-cols-5">
        {LOOP_STEPS.map((step, index) => (
          <div key={step.label} className="relative">
            <div
              className="flex h-full min-h-28 items-center justify-center rounded-[1.25rem] border px-4 py-5 text-center"
              style={{
                backgroundColor: step.bg,
                borderColor: step.border,
              }}
            >
              <div
                className="text-[0.88rem] font-medium leading-6"
                style={{
                  color: step.color,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                {step.label}
              </div>
            </div>
            {index < LOOP_STEPS.length - 1 && (
              <div className="hidden lg:block">
                <div className="absolute top-1/2 right-[-0.95rem] -translate-y-1/2 text-[1.1rem] text-[var(--color-warm-400)]">
                  →
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 text-[0.84rem] italic text-[var(--color-warm-500)]">
        <span>repeat until done</span>
        <span className="text-[var(--color-warm-300)]">↑</span>
      </div>
    </figure>
  )
}
