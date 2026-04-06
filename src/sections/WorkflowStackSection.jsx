import { motion } from 'framer-motion'

const personaCards = [
  {
    step: '1',
    label: 'Persona',
    title: 'Developers',
    status: 'Portfolio view',
    description:
      'Track stock, transaction movement, buyer progress, and development-level visibility from one shared operational view.',
    items: [
      'Development progress visibility',
      'Stock and deal oversight',
      'Cleaner reporting structure',
    ],
    progress: 92,
    tone: 'primary',
  },
  {
    step: '2',
    label: 'Persona',
    title: 'Conveyancers',
    status: 'Workflow control',
    description:
      'Manage legal steps, document readiness, and transaction milestones in a structured environment built for active matters.',
    items: [
      'Matter-stage visibility',
      'Document coordination',
      'Milestone tracking',
    ],
    progress: 84,
    tone: 'secondary',
  },
  {
    step: '3',
    label: 'Persona',
    title: 'Agents',
    status: 'Post-sale visibility',
    description:
      'Stay connected after the sale with a clear view of transaction progress instead of disappearing into back-and-forth updates.',
    items: [
      'Post-sale visibility',
      'Client update clarity',
      'Less chasing for status',
    ],
    progress: 74,
    tone: 'secondary',
  },
  {
    step: '4',
    label: 'Persona',
    title: 'Buyers',
    status: 'Clear next steps',
    description:
      'Give buyers one place to understand what is happening, what is still outstanding, and what comes next in the process.',
    items: [
      'Shared progress view',
      'Outstanding action clarity',
      'Less confusion and anxiety',
    ],
    progress: 68,
    tone: 'secondary',
  },
]

function PersonaCard({ card, index }) {
  const cardStyle =
    card.tone === 'primary'
      ? 'border border-white/12 bg-[linear-gradient(180deg,#1A1A1A_0%,#111111_100%)]'
      : 'border border-white/10 bg-[linear-gradient(180deg,#161616_0%,#101010_100%)]'

  const badgeStyle =
    card.tone === 'primary'
      ? 'border border-[#D8CBB8]/20 bg-[#D8CBB8]/10 text-[#E9DCCA]'
      : 'border border-white/10 bg-white/[0.04] text-white/65'

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.42, delay: index * 0.05 }}
      className={`relative rounded-[32px] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] ${cardStyle}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-white/75">
            {card.step}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">
              {card.label}
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
              {card.title}
            </h3>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] ${badgeStyle}`}
        >
          {card.status}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-white/60 md:text-[15px]">
        {card.description}
      </p>

      <div className="mt-6 h-[6px] w-full rounded-full bg-white/10">
        <div
          className="h-[6px] rounded-full bg-gradient-to-r from-[#D8CBB8] to-[#BCA58A]"
          style={{ width: `${card.progress}%` }}
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {card.items.map((item) => (
          <div
            key={item}
            className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-white/85"
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function WorkflowStackSection() {
  return (
    <section id="product" className="bg-[#F1EBE2] px-4 py-12 sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1420px] rounded-[42px] bg-[#111111] px-6 py-10 shadow-[0_30px_120px_rgba(20,20,20,0.14)] md:px-8 lg:px-10">
        {/* TOP INTRO */}
        <div className="max-w-[980px]">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-[11px] uppercase tracking-[0.34em] text-white/65">
            Built for every stakeholder
          </div>

          <h2 className="mt-7 max-w-[860px] text-[52px] font-semibold leading-[0.9] tracking-[-0.055em] text-white lg:text-[76px]">
            One system, shaped around the people moving the transaction forward.
          </h2>

          <p className="mt-8 max-w-[760px] text-[18px] leading-9 text-white/55">
            Bridge is not just a workflow. It gives each persona a clearer,
            more useful operational view while keeping everyone connected to
            the same transaction reality.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className="rounded-full border border-[#D8CBB8]/20 bg-[#D8CBB8]/10 px-5 py-4 text-sm font-medium text-[#E9DCCA]">
              Developers
            </div>
            <div className="rounded-full border border-white/10 bg-transparent px-5 py-4 text-sm font-medium text-white/85">
              Conveyancers
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.045] px-5 py-4 text-sm font-medium text-white/85">
              Agents
            </div>
            <div className="rounded-full border border-white/10 bg-transparent px-5 py-4 text-sm font-medium text-white/45">
              Buyers
            </div>
          </div>
        </div>

        {/* SUPPORTING VALUE CARDS */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/30">
              Shared value
            </p>
            <p className="mt-5 text-2xl font-semibold leading-tight text-white">
              Every role sees what matters without losing the full picture.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/30">
              Outcome
            </p>
            <p className="mt-5 text-2xl font-semibold leading-tight text-white">
              Less friction. Better coordination.
            </p>
          </div>
        </div>

        {/* PERSONA GRID */}
        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          {personaCards.map((card, index) => (
            <PersonaCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}