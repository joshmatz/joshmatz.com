const CACHE_LAYERS = [
  {
    label: 'Tools',
    meta: 'stable',
    bg: '#65a30d12',
    color: '#65a30d',
  },
  {
    label: 'System prompt',
    meta: 'stable',
    bg: '#65a30d0d',
    color: '#65a30d',
  },
  {
    label: 'Org context',
    meta: 'mostly stable',
    bg: '#2563eb12',
    color: '#2563eb',
  },
  {
    label: 'User context',
    meta: 'varies',
    bg: '#2563eb0d',
    color: '#2563eb',
  },
]

export function PromptCachingVisualization() {
  return (
    <figure className="not-prose my-12 rounded-[1.75rem] border border-[var(--color-warm-300)] bg-[var(--color-warm-100)] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.02)] lg:w-[calc(100%+18rem)] lg:max-w-none lg:p-8">
      <div className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-warm-500)]">
        Prompt caching
      </div>
      <p className="mb-7 max-w-[42rem] text-[1rem] leading-8 text-[var(--color-warm-800)]">
        Put the stuff that barely changes at the top. Put the stuff that
        changes every request at the bottom. If you mutate the prefix, you pay
        for it again.
      </p>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-warm-300)] bg-[var(--color-warm-50)]">
          {CACHE_LAYERS.map((layer) => (
            <div
              key={layer.label}
              className="flex items-center justify-between border-b border-[var(--color-warm-300)] px-4 py-3"
              style={{ backgroundColor: layer.bg }}
            >
              <span
                className="text-[0.82rem] font-medium"
                style={{
                  color: layer.color,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                {layer.label}
              </span>
              <span className="text-[0.75rem] text-[var(--color-warm-700)]">
                {layer.meta}
              </span>
            </div>
          ))}

          <div className="bg-[#d9770628] px-4 py-2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#d97706]">
            Cached above. Reprocessed below.
          </div>

          <div className="flex items-center justify-between bg-[#dc262618] px-4 py-4">
            <span
              className="text-[0.82rem] font-medium text-[#dc2626]"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
            >
              Conversation
            </span>
            <span className="text-[0.75rem] text-[var(--color-warm-700)]">
              grows every turn
            </span>
          </div>
        </div>

        <div className="grid gap-3">
          {[
            {
              title: 'Cache hit',
              body: 'Lower latency. Lower cost. Same model behavior.',
              color: '#65a30d',
              bg: '#65a30d12',
            },
            {
              title: 'Cache miss',
              body: 'A changed prefix means full reprocessing. That is usually the spike you feel.',
              color: '#dc2626',
              bg: '#dc262612',
            },
            {
              title: 'Rule of thumb',
              body: 'Do not casually edit the system prompt, swap models, or add tools in the middle of a session.',
              color: '#b45309',
              bg: '#d9770612',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.25rem] border px-4 py-4"
              style={{
                borderColor: `${item.color}55`,
                backgroundColor: item.bg.replace('12', '18'),
              }}
            >
              <div
                className="mb-1 text-[0.78rem] font-semibold uppercase tracking-[0.12em]"
                style={{
                  color: item.color,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                {item.title}
              </div>
              <p className="m-0 text-[0.9rem] leading-6 text-[var(--color-warm-800)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}
