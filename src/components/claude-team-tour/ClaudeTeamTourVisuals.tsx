const ADOPTION_BARS = [
  {
    label: 'Just trying it',
    height: '3.25rem',
    width: '2.25rem',
    tone: 'bg-[var(--color-warm-300)]',
    text: 'text-[var(--color-warm-500)]',
  },
  {
    label: 'Using it weekly',
    height: '5.75rem',
    width: '3rem',
    tone: 'bg-[color:#d6a84d]',
    text: 'text-[color:#9a6f17]',
  },
  {
    label: 'Built into workflow',
    height: '8.5rem',
    width: '4rem',
    tone: 'bg-[color:#2f6f63]',
    text: 'text-[color:#2f6f63]',
  },
  {
    label: 'Running routine work',
    height: '5.75rem',
    width: '3rem',
    tone: 'bg-[var(--color-warm-200)]',
    text: 'text-[var(--color-warm-500)]',
  },
  {
    label: 'Still skeptical',
    height: '3.25rem',
    width: '2.25rem',
    tone: 'bg-[var(--color-warm-200)]',
    text: 'text-[var(--color-warm-500)]',
  },
]

const MATURITY_LEVELS = [
  {
    level: '1',
    title: 'Thought partner',
    description: 'Brainstorming, refining ideas, getting unstuck.',
    note: "This is where almost everyone starts.",
    accent: 'text-[color:#58b8a5]',
    noteBorder: 'border-[color:rgba(88,184,165,0.32)]',
    noteBackground: 'bg-[color:rgba(88,184,165,0.12)]',
    border: 'border-[color:rgba(47,111,99,0.18)]',
    background: 'bg-[color:rgba(47,111,99,0.06)]',
  },
  {
    level: '2',
    title: 'Assistant',
    description: 'Writing, research, code, and task execution with you in the loop.',
    note: "This is where most teams are living today.",
    accent: 'text-[color:#58b8a5]',
    noteBorder: 'border-[color:rgba(88,184,165,0.32)]',
    noteBackground: 'bg-[color:rgba(88,184,165,0.12)]',
    border: 'border-[color:rgba(47,111,99,0.18)]',
    background: 'bg-[color:rgba(47,111,99,0.06)]',
  },
  {
    level: '3',
    title: 'Teammate',
    description: 'The AI handles recurring team work and process starts to change.',
    note: 'You can see the early versions of this already.',
    accent: 'text-[color:#d8a445]',
    noteBorder: 'border-[color:rgba(216,164,69,0.34)]',
    noteBackground: 'bg-[color:rgba(216,164,69,0.14)]',
    border: 'border-[color:rgba(214,168,77,0.22)]',
    background: 'bg-[color:rgba(214,168,77,0.07)]',
  },
  {
    level: '4',
    title: 'Embedded operator',
    description: 'The workflow is mostly automated and humans are supervising, not doing every step.',
    note: 'Very real in some support orgs. Not normal yet in most companies.',
    accent: 'text-[var(--color-warm-700)]',
    noteBorder: 'border-[var(--color-warm-300)]',
    noteBackground: 'bg-[var(--color-warm-100)]',
    border: 'border-[var(--color-warm-200)]',
    background: 'bg-[var(--color-warm-50)]',
  },
]

const ARTIFACT_CHANGES = [
  {
    kind: 'remove',
    text: 'Submit claims within 48 hours of service delivery.',
  },
  {
    kind: 'add',
    text: 'Submit claims within 24 hours of service delivery.',
  },
  {
    kind: 'context',
    text: 'Verify patient eligibility before billing.',
  },
  {
    kind: 'remove',
    text: 'Use the standard CPT code reference guide.',
  },
  {
    kind: 'add',
    text: 'Use the 2026 CPT code reference guide (v4.1).',
  },
  {
    kind: 'add',
    text: 'Include the rendering provider NPI on all claims.',
  },
]

const PROJECT_CHATS = [
  {
    title: 'How we handle claim denials',
    when: 'Last active 2 minutes ago',
  },
  {
    title: 'Payer enrollment steps',
    when: 'Last active 1 hour ago',
  },
  {
    title: 'CPT code lookup',
    when: 'Last active 3 days ago',
  },
]

const PROJECT_FILES = [
  'Payer Guide 2026',
  'Claims SOPs',
  'CPT Reference',
]

export function ClaudeUsageDepthChart() {
  return (
    <figure className="my-12 rounded-2xl border border-[var(--color-warm-200)] bg-[var(--color-warm-50)] p-6 md:-mx-10 md:p-8">
      <div className="mb-8">
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-warm-500)]">
          What I was trying to explain
        </div>
        <div className="mt-2 text-[1.1rem] leading-relaxed text-[var(--color-warm-700)]">
          The issue is not whether people have heard of AI. The issue is how
          deep it has actually made it into the way they work.
        </div>
      </div>

      <div className="flex min-h-[16rem] items-end justify-between gap-3 border-b border-[var(--color-warm-200)] pb-5">
        {ADOPTION_BARS.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
            <div
              className={`w-full max-w-[8rem] rounded-t-xl shadow-[0_0_0_1px_rgba(0,0,0,0.04)] ${bar.tone} transition-all duration-300`}
              style={{ height: bar.height, width: bar.width }}
            />
            <div
              className={`max-w-[8rem] text-center text-[0.72rem] font-medium leading-tight ${bar.text}`}
            >
              {bar.label}
            </div>
          </div>
        ))}
      </div>

      <figcaption className="pt-4 text-center text-[0.9rem] leading-relaxed text-[var(--color-warm-500)]">
        Not adoption of AI itself. Adoption of{' '}
        <span className="font-semibold text-[color:#9a6f17]">depth of usage</span>.
      </figcaption>
    </figure>
  )
}

export function ClaudeMaturityModel() {
  return (
    <figure className="my-12 rounded-2xl border border-[var(--color-warm-200)] bg-[var(--color-warm-50)] p-6 md:-mx-10 md:p-8">
      <div className="mb-6">
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-warm-500)]">
          The maturity model
        </div>
        <div className="mt-2 text-[1.1rem] leading-relaxed text-[var(--color-warm-700)]">
          Different teams are landing at different levels. Same company, same
          tools, very different depth.
        </div>
      </div>

      <div className="space-y-4">
        {MATURITY_LEVELS.map((item) => (
          <div
            key={item.level}
            className={`rounded-xl border p-5 ${item.border} ${item.background}`}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start">
              <div
                className={`shrink-0 text-[1.4rem] font-semibold leading-none ${item.accent}`}
              >
                {item.level}
              </div>
              <div className="flex-1">
                <div className="text-[1rem] font-semibold text-[var(--color-warm-900)]">
                  {item.title}
                </div>
                <div className="mt-1 text-[0.95rem] leading-relaxed text-[var(--color-warm-700)]">
                  {item.description}
                </div>
              </div>
              <div
                className={`rounded-lg border px-3 py-1 text-[0.72rem] font-medium leading-relaxed text-[var(--color-warm-900)] md:max-w-[15rem] ${item.noteBorder} ${item.noteBackground}`}
              >
                {item.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}

export function ClaudeArtifactsDiff() {
  return (
    <figure className="my-12 overflow-hidden rounded-2xl border border-[var(--color-warm-200)] bg-[var(--color-warm-100)] md:-mx-10">
      <div className="flex items-center justify-between border-b border-[var(--color-warm-200)] px-5 py-4">
        <div>
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-warm-500)]">
            Artifact editing
          </div>
          <div className="mt-1 text-[0.95rem] text-[var(--color-warm-700)]">
            Long-form work gets easier when you can update the output instead of
            regenerating the whole thing.
          </div>
        </div>
        <div className="rounded-full border border-[var(--color-warm-300)] bg-[var(--color-warm-100)] px-3 py-1 text-[0.75rem] text-[var(--color-warm-600)]">
          claims_sop_draft.md
        </div>
      </div>

      <div className="space-y-2 px-5 py-5 font-mono text-[0.82rem] leading-7 text-[var(--color-warm-700)]">
        <div className="text-[var(--color-warm-500)]">## Claim Submission Process</div>
        {ARTIFACT_CHANGES.map((line) => (
          <div
            key={`${line.kind}-${line.text}`}
            className={
              line.kind === 'add'
                ? 'border-l-[3px] border-[color:#4c9a8a] bg-[color:rgba(76,154,138,0.12)] pl-3 text-[var(--color-warm-900)]'
                : line.kind === 'remove'
                  ? 'border-l-[3px] border-[color:#cf6f59] bg-[color:rgba(207,111,89,0.12)] pl-3 text-[var(--color-warm-900)]'
                  : 'pl-3 text-[var(--color-warm-700)]'
            }
          >
            <span
              className={
                line.kind === 'add'
                  ? 'mr-2 font-semibold text-[color:#63b5a5]'
                  : line.kind === 'remove'
                    ? 'mr-2 font-semibold text-[color:#de816c]'
                    : ''
              }
            >
              {line.kind === 'add' ? '+' : line.kind === 'remove' ? '-' : ''}
            </span>
            {line.kind === 'context' ? line.text : <span>{line.text}</span>}
          </div>
        ))}
      </div>
    </figure>
  )
}

export function ClaudeProjectContext() {
  return (
    <figure className="my-12 overflow-hidden rounded-2xl border border-[var(--color-warm-200)] bg-[var(--color-warm-100)] md:-mx-12">
      <div className="grid gap-px bg-[var(--color-warm-200)] md:grid-cols-[1.3fr_0.9fr]">
        <div className="bg-[var(--color-warm-50)] p-5">
          <div className="mb-5">
            <div className="text-[1.15rem] font-semibold text-[var(--color-warm-900)]">
              Claims Support
            </div>
            <div className="text-[0.78rem] text-[var(--color-warm-500)]">
              Shared project context for one part of the business
            </div>
          </div>

          <div className="mb-5 rounded-xl border border-[var(--color-warm-200)] bg-[var(--color-warm-100)] p-4">
            <div className="mb-8 text-[0.92rem] text-[var(--color-warm-400)]">
              Reply...
            </div>
            <div className="flex items-center justify-between text-[0.76rem]">
              <span className="text-[var(--color-warm-500)]">Attach</span>
              <div className="flex items-center gap-2 text-[var(--color-warm-600)]">
                <span>Opus</span>
                <span className="rounded-full border border-[var(--color-warm-300)] bg-[var(--color-warm-50)] px-2 py-1 text-[0.68rem] text-[var(--color-warm-800)]">
                  Extended
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {PROJECT_CHATS.map((chat) => (
              <div
                key={chat.title}
                className="rounded-xl border border-[var(--color-warm-200)] bg-[var(--color-warm-100)] p-3"
              >
                <div className="text-[0.86rem] font-medium text-[var(--color-warm-800)]">
                  {chat.title}
                </div>
                <div className="mt-1 text-[0.72rem] text-[var(--color-warm-500)]">
                  {chat.when}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5 bg-[var(--color-warm-50)] p-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[0.84rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-500)]">
                Instructions
              </div>
              <div className="rounded-full border border-[var(--color-warm-300)] bg-[var(--color-warm-100)] px-2 py-1 text-[0.67rem] text-[var(--color-warm-600)]">
                Shared
              </div>
            </div>
            <div className="rounded-xl border border-[var(--color-warm-200)] bg-[var(--color-warm-100)] p-4 text-[0.86rem] leading-relaxed text-[var(--color-warm-800)]">
              Always reference DocStation SOPs when answering claims questions.
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[0.84rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-warm-500)]">
                Files
              </div>
              <div className="rounded-full border border-[var(--color-warm-300)] bg-[var(--color-warm-100)] px-2 py-1 text-[0.67rem] text-[var(--color-warm-600)]">
                Shared
              </div>
            </div>
            <div className="space-y-3">
              {PROJECT_FILES.map((file) => (
                <div
                  key={file}
                  className="rounded-xl border border-[var(--color-warm-200)] bg-[var(--color-warm-100)] p-3"
                >
                  <div className="text-[0.82rem] font-medium text-[var(--color-warm-800)]">
                    {file}
                  </div>
                  <div className="mt-1 text-[0.68rem] text-[var(--color-warm-500)]">
                    PDF
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}
