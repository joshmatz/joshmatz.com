const TOKENS = [
  'The',
  ' patient',
  "'s",
  ' prior',
  ' auth',
  'orization',
  ' was',
  ' denied',
  ' due',
  ' to',
  ' incomplete',
  ' documentation',
]

const TOKEN_COLORS = [
  'var(--color-warm-700)',
  '#3b82f6',
  '#a855f7',
]

const CONTEXT_ROWS = [
  { label: 'Quick summary prompt', pct: 8, color: '#65a30d' },
  { label: 'Prompt plus a few patient notes', pct: 30, color: '#d97706' },
  { label: 'Prompt plus SOP and claims history', pct: 78, color: '#dc2626' },
]

export function TokensContextVisualization() {
  return (
    <figure className="not-prose my-12 rounded-[1.75rem] border border-[var(--color-warm-300)] bg-[var(--color-warm-100)] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.02)] lg:w-[calc(100%+18rem)] lg:max-w-none lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr]">
        <section>
          <div className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-warm-500)]">
            Tokens
          </div>
          <p className="mb-6 text-[1rem] leading-8 text-[var(--color-warm-800)]">
            The model does not read words. It reads chunks. Cost, latency,
            and quality all start here.
          </p>

          <div className="mb-6 flex flex-wrap gap-2.5">
            {TOKENS.map((token, index) => (
              <span
                key={index}
                className="rounded-xl border px-3 py-2 text-[0.82rem]"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  color: TOKEN_COLORS[index % TOKEN_COLORS.length],
                  borderColor: `${TOKEN_COLORS[index % TOKEN_COLORS.length]}55`,
                  backgroundColor: `${TOKEN_COLORS[index % TOKEN_COLORS.length]}18`,
                }}
              >
                {token}
              </span>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                label: 'Input',
                cost: '$',
                note: 'cheap',
                color: '#65a30d',
              },
              {
                label: 'Output',
                cost: '$$$',
                note: 'expensive',
                color: '#dc2626',
              },
              {
                label: 'Cached',
                cost: '¢',
                note: 'worth caring about',
                color: '#2563eb',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.25rem] border border-[var(--color-warm-300)] bg-[var(--color-warm-50)] px-4 py-4"
              >
                <div
                  className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-warm-500)]"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
                >
                  {item.label}
                </div>
                <div
                  className="text-[1.55rem] font-semibold"
                  style={{
                    color: item.color,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  }}
                >
                  {item.cost}
                </div>
                <div className="mt-2 text-[0.78rem] italic leading-6 text-[var(--color-warm-600)]">
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-warm-500)]">
            Context window
          </div>
          <p className="mb-6 text-[1rem] leading-8 text-[var(--color-warm-800)]">
            The hard ceiling on what the model can see at once. You can burn
            through it faster than you think.
          </p>

          <div className="space-y-5">
            {CONTEXT_ROWS.map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="text-[0.9rem] leading-6 text-[var(--color-warm-800)]">
                    {row.label}
                  </div>
                  <div
                    className="text-[0.88rem] font-semibold"
                    style={{
                      color: row.color,
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    }}
                  >
                    {row.pct}%
                  </div>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-[var(--color-warm-200)]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[1.5rem] border border-dashed border-[var(--color-warm-400)] bg-[var(--color-warm-50)] px-5 py-4 text-[0.92rem] italic leading-8 text-[var(--color-warm-700)]">
            Yes, you can stuff the whole SOP in there. No, that does not mean
            you should.
          </div>
        </section>
      </div>
    </figure>
  )
}
