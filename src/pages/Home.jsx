import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BellRing,
  Building2,
  BuildingIcon,
  CheckCircle2,
  Handshake,
  Landmark,
  MessageSquareMore,
  UserRound,
  Users,
  WalletCards,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'
import ModuleCard from '../components/ModuleCard'
import RoleCard from '../components/RoleCard'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import Hero from '../sections/Hero'
import CTASection from '../sections/CTASection'

const problemCards = [
  {
    icon: MessageSquareMore,
    title: 'Information is scattered',
    description:
      'Updates live across emails, WhatsApps, calls, spreadsheets, and separate systems.',
  },
  {
    icon: Handshake,
    title: 'Responsibility moves, visibility doesn’t',
    description:
      'As a deal moves from agent to bond originator to attorney, everyone loses sight of what has actually happened.',
  },
  {
    icon: BellRing,
    title: 'Clients are left waiting',
    description:
      'Buyers often rely on follow-ups instead of seeing clear progress, next steps, and document requirements.',
  },
]

const platformRoles = [
  {
    icon: Building2,
    title: 'Developer',
    description:
      'Track sales progress, unit status, buyer onboarding, documents, and portfolio performance.',
  },
  {
    icon: Users,
    title: 'Agent',
    description:
      'Manage leads, listings, viewings, offers, client onboarding, and active transactions.',
  },
  {
    icon: Landmark,
    title: 'Attorney',
    description:
      'Track transfer progress, FICA, signing, guarantees, lodgement, and registration.',
  },
  {
    icon: WalletCards,
    title: 'Bond Originator',
    description:
      'Manage applications, buyer documents, bank feedback, approvals, and bond instructions.',
  },
  {
    icon: UserRound,
    title: 'Client',
    description:
      'Get a simple, safe portal showing progress, documents, next steps, and updates.',
  },
  {
    icon: BuildingIcon,
    title: 'Managing Agent',
    description:
      'Receive cleaner handover information after registration and support better post-sale management.',
  },
]

const moduleCards = [
  {
    label: 'Developer module',
    title: 'Control unit movement and transaction flow from one portfolio view.',
    description:
      'See stock, buyer onboarding, transaction progression, and reporting signals without rebuilding status manually.',
    bullets: [
      'Development overview',
      'Unit and transaction tracking',
      'Buyer onboarding status',
      'Sales progress and reporting',
    ],
    previewTitle: 'Development overview',
    previewRows: [
      { label: 'Units released', value: '84' },
      { label: 'Transactions active', value: '31' },
      { label: 'Ready for registration', value: '12' },
    ],
  },
  {
    label: 'Agent module',
    title: 'Move from lead to deal without losing the transaction after the sale.',
    description:
      'Bridge gives agents one place for onboarding, deal creation, and live post-sale visibility.',
    bullets: [
      'Lead pipeline',
      'Viewing requests',
      'Buyer onboarding',
      'Transaction tracking',
    ],
    previewTitle: 'Deal pipeline',
    previewRows: [
      { label: 'New enquiries', value: '18' },
      { label: 'Offers submitted', value: '7' },
      { label: 'Deals in progress', value: '11' },
    ],
  },
  {
    label: 'Attorney module',
    title: 'Run transfer workflow with cleaner stages, documents, and updates.',
    description:
      'Track FICA, signing, guarantees, lodgement, registration, and role-player updates from one legal workflow view.',
    bullets: [
      'Transfer workflow',
      'FICA tracking',
      'Guarantees and lodgement',
      'Client and role-player updates',
    ],
    previewTitle: 'Transfer readiness',
    previewRows: [
      { label: 'Docs reviewed', value: '24' },
      { label: 'Awaiting signature', value: '9' },
      { label: 'Lodgement ready', value: '5' },
    ],
  },
  {
    label: 'Bond originator module',
    title: 'Keep finance progress visible to the people who need it.',
    description:
      'Coordinate buyer documents, bank submissions, approvals, and bond instructions inside the shared transaction workspace.',
    bullets: [
      'Application tracking',
      'Buyer document collection',
      'Bank feedback and approval tracking',
      'Bond instruction visibility',
    ],
    previewTitle: 'Finance progress',
    previewRows: [
      { label: 'Applications open', value: '14' },
      { label: 'Awaiting docs', value: '5' },
      { label: 'Approved this week', value: '6' },
    ],
  },
  {
    label: 'Client portal',
    title: 'Give buyers a calmer, clearer experience without more manual follow-up.',
    description:
      'Buyers see progress, next steps, requested documents, and recent updates in one safe portal.',
    bullets: [
      'Progress tracker',
      'Document uploads',
      'Comments and updates',
      'Clear next steps',
    ],
    previewTitle: 'Client view',
    previewRows: [
      { label: 'Current stage', value: 'Bond approval' },
      { label: 'Next action', value: 'Upload payslip' },
      { label: 'Support status', value: 'Seen today' },
    ],
  },
]

const workflowStages = [
  {
    stage: 'Lead / Listing',
    who: 'Agent, developer',
    tracking: 'Lead source, listing readiness, seller or stock context.',
  },
  {
    stage: 'Offer / OTP',
    who: 'Agent, buyer, developer',
    tracking: 'Offer accepted, reservation or OTP status, deal opened.',
  },
  {
    stage: 'Buyer Onboarding',
    who: 'Buyer, agent, originator',
    tracking: 'FICA, personal details, required documents, missing items.',
  },
  {
    stage: 'Finance',
    who: 'Bond originator, buyer, bank',
    tracking: 'Applications, bank feedback, approvals, outstanding finance docs.',
  },
  {
    stage: 'Attorney Transfer',
    who: 'Attorney, developer, buyer',
    tracking: 'Transfer matter opened, requirements assigned, legal milestones.',
  },
  {
    stage: 'Documents & Signing',
    who: 'Buyer, attorney, originator',
    tracking: 'Signatures, guarantees, reviewed documents, rejected items.',
  },
  {
    stage: 'Lodgement',
    who: 'Attorney',
    tracking: 'Lodgement timing, dependencies complete, outstanding blockers.',
  },
  {
    stage: 'Registration',
    who: 'Attorney, developer, leadership',
    tracking: 'Registration status, handover readiness, reporting signal.',
  },
  {
    stage: 'Handover',
    who: 'Developer, client, managing agent',
    tracking: 'Final steps, handover documents, managing-agent context.',
  },
]

const roleCards = [
  {
    icon: Building2,
    title: 'Developers',
    description:
      'See every deal, every unit, every buyer, and every handover from one place.',
  },
  {
    icon: Users,
    title: 'Estate Agents',
    description:
      'Manage leads, seller onboarding, buyer onboarding, deals, and transaction progress.',
  },
  {
    icon: Landmark,
    title: 'Conveyancers',
    description:
      'Track transfers, documents, signing, guarantees, lodgement, and registration.',
  },
  {
    icon: WalletCards,
    title: 'Bond Originators',
    description:
      'Keep applications, buyer documents, bank feedback, and approvals visible to the right people.',
  },
  {
    icon: BuildingIcon,
    title: 'Managing Agents',
    description:
      'Receive cleaner handover information after registration and support owners better.',
  },
  {
    icon: UserRound,
    title: 'Buyers',
    description:
      'Know what is happening, what is needed, and what comes next.',
  },
]

function PlatformNetwork() {
  const left = platformRoles.slice(0, 2)
  const right = platformRoles.slice(2, 4)
  const bottom = platformRoles.slice(4)

  return (
    <div className="mt-14 space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-center">
        <div className="space-y-6">
          {left.map((role) => (
            <FeatureCard key={role.title} icon={role.icon} title={role.title} description={role.description} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[32px] border border-[#ddd2c3] bg-[#171412] p-8 text-white shadow-[0_32px_90px_rgba(23,20,18,0.16)]"
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#cdb69b]">
            Transaction workspace
          </p>
          <h3 className="mt-5 text-[2rem] font-semibold tracking-[-0.05em] text-white lg:text-[2.4rem]">
            One shared record for the deal itself.
          </h3>
          <p className="mt-4 max-w-[36rem] text-[0.98rem] leading-8 text-white/72">
            Bridge 9 keeps progress, documents, comments, responsibilities, and client updates attached to the same transaction from offer through handover.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              'Shared workflow stages',
              'Document requests and reviews',
              'Role-player visibility',
              'Client updates and support context',
            ].map((item) => (
              <div key={item} className="rounded-[20px] border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-white/80">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {right.map((role) => (
            <FeatureCard key={role.title} icon={role.icon} title={role.title} description={role.description} />
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {bottom.map((role) => (
          <FeatureCard key={role.title} icon={role.icon} title={role.title} description={role.description} />
        ))}
      </div>
    </div>
  )
}

function ClientPortalMockup() {
  const updates = [
    { label: 'Current stage', value: 'Bond approval' },
    { label: 'Next step', value: 'Upload latest payslip' },
    { label: 'Responsible', value: 'Bond originator' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-[350px] rounded-[36px] border border-[#d9cfbf] bg-white p-4 shadow-[0_30px_80px_rgba(23,20,18,0.12)]"
    >
      <div className="overflow-hidden rounded-[30px] border border-[#ede3d5] bg-[#f9f5ee]">
        <div className="border-b border-[#e8dfd1] px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a7560]">
            Buyer portal
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[#171412]">
            Unit 14 · Junoah Estate
          </h3>
          <p className="mt-2 text-sm text-[#6e6255]">Mia Jacobs · Ref B9-2041</p>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="rounded-[24px] border border-[#e6dccd] bg-white p-4">
            <div className="flex items-center justify-between text-sm text-[#6e6255]">
              <span>Progress</span>
              <span className="rounded-full bg-[#171412] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                Active
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#efe6da]">
              <div className="h-2 w-[72%] rounded-full bg-[#171412]" />
            </div>
            <p className="mt-3 text-sm font-medium text-[#171412]">72% complete</p>
          </div>

          <div className="space-y-3 rounded-[24px] border border-[#e6dccd] bg-white p-4">
            {updates.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-6 border-b border-[#f1eadf] pb-3 last:border-b-0 last:pb-0">
                <span className="text-sm text-[#7c6d5e]">{item.label}</span>
                <span className="text-right text-sm font-medium text-[#171412]">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 rounded-[24px] border border-[#e6dccd] bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#171412]">Documents requested</p>
              <span className="text-sm text-[#8a7560]">2 outstanding</span>
            </div>
            {['Latest payslip', 'Signed FICA form'].map((doc) => (
              <div key={doc} className="flex items-center justify-between rounded-[16px] bg-[#f8f3eb] px-3 py-3 text-sm text-[#171412]">
                <span>{doc}</span>
                <span className="text-[#8a7560]">Upload</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DocumentTracker() {
  const rows = [
    ['Buyer ID copy', 'FICA / Compliance', 'Reviewed', 'M. Jacobs', 'Ops team'],
    ['Latest payslip', 'Finance / Bond', 'Requested', 'M. Jacobs', 'Pending'],
    ['Signed OTP', 'Sales / Transaction', 'Completed', 'Sales desk', 'Approved'],
    ['Guarantee letter', 'Transfer / Attorney', 'Rejected', 'Bank', 'Need latest version'],
  ]

  return (
    <div className="overflow-hidden rounded-[30px] border border-[#ded4c6] bg-white shadow-[0_24px_70px_rgba(23,20,18,0.08)]">
      <div className="border-b border-[#eee5d9] px-6 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b7760]">
          Document tracker
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#171412]">
          Requested, uploaded, reviewed, and tracked.
        </h3>
      </div>
      <div className="divide-y divide-[#f0e9de]">
        {rows.map(([name, category, status, uploadedBy, note]) => (
          <div key={name} className="grid gap-3 px-6 py-5 lg:grid-cols-[1.4fr_1fr_0.75fr_0.75fr_1fr] lg:items-center">
            <div>
              <p className="font-medium text-[#171412]">{name}</p>
              <p className="mt-1 text-sm text-[#7a6f62]">{category}</p>
            </div>
            <p className="text-sm text-[#7a6f62]">{category}</p>
            <span className="inline-flex w-fit rounded-full border border-[#e5dacb] bg-[#faf6ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d5c4a]">
              {status}
            </span>
            <p className="text-sm text-[#7a6f62]">{uploadedBy}</p>
            <p className="text-sm text-[#7a6f62]">{note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityThread() {
  const items = [
    {
      title: 'Document uploaded',
      copy: 'Buyer uploaded latest payslip to the finance pack.',
      meta: '2 min ago · Visible to agent and bond originator',
    },
    {
      title: 'Stage changed',
      copy: 'Matter moved from Buyer Onboarding to Finance.',
      meta: '14 min ago · Workflow update',
    },
    {
      title: 'Internal note',
      copy: 'Bond originator flagged one outstanding compliance document.',
      meta: '29 min ago · Internal only',
    },
    {
      title: 'Client notified',
      copy: 'Buyer received a progress update and next-step reminder.',
      meta: '1 hour ago · Client portal',
    },
  ]

  return (
    <div className="rounded-[30px] border border-[#ddd3c5] bg-white p-6 shadow-[0_24px_70px_rgba(23,20,18,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b7760]">
            Shared activity
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#171412]">
            One thread around the transaction.
          </h3>
        </div>
        <div className="hidden rounded-full border border-[#e6dccd] bg-[#faf6ef] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d5c4a] md:block">
          Source of truth
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="flex gap-4 rounded-[22px] border border-[#efe6da] bg-[#fcfaf6] p-4"
          >
            <div className="mt-1 h-3 w-3 rounded-full bg-[#171412]" />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-medium text-[#171412]">{item.title}</p>
                {item.title === 'Internal note' ? (
                  <span className="rounded-full border border-[#eadcc7] bg-[#f7efe1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7b6854]">
                    Internal
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-7 text-[#675c50]">{item.copy}</p>
              <p className="mt-2 text-sm text-[#8b7760]">{item.meta}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ReportingMockup() {
  const metrics = [
    { label: 'Active transactions', value: '47' },
    { label: 'Registered this month', value: '18' },
    { label: 'Sales value in progress', value: 'R182m' },
    { label: 'Cash vs bond split', value: '31 / 69' },
  ]

  const bars = [
    { label: 'Average deal time', width: '72%' },
    { label: 'Attorney bottlenecks', width: '34%' },
    { label: 'Bond approval rate', width: '81%' },
    { label: 'Buyer docs complete', width: '66%' },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-[28px] border border-[#e5dacb] bg-white p-6 shadow-[0_18px_44px_rgba(23,20,18,0.06)]">
            <p className="text-sm text-[#7c6f61]">{metric.label}</p>
            <p className="mt-4 text-[2rem] font-semibold tracking-[-0.06em] text-[#171412]">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[30px] border border-[#e5dacb] bg-[#171412] p-6 text-white shadow-[0_28px_80px_rgba(23,20,18,0.14)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdb69b]">
          Reporting layer
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-white">
          Live transaction activity becomes useful business insight.
        </h3>
        <div className="mt-8 space-y-4">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between text-sm text-white/72">
                <span>{bar.label}</span>
                <span>{bar.width}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: bar.width }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.65 }}
                  className="h-2 rounded-full bg-[#eadcc7]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Differentiator() {
  const crmPoints = [
    'Tracks contacts',
    'Tracks sales activity',
    'Often internal-only',
    'Limited buyer visibility',
    'Not built around transfer workflow',
  ]

  const bridgePoints = [
    'Tracks the transaction',
    'Connects role players',
    'Gives clients visibility',
    'Manages documents and statuses',
    'Supports finance and transfer workflows',
    'Creates a shared source of truth',
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[30px] border border-[#e5dacb] bg-white p-8 shadow-[0_22px_60px_rgba(23,20,18,0.06)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b7760]">
          Traditional CRM
        </p>
        <ul className="mt-6 space-y-4">
          {crmPoints.map((item) => (
            <li key={item} className="flex gap-3 text-[#6c6155]">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d2c4b3]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[30px] border border-[#201b16] bg-[#171412] p-8 text-white shadow-[0_28px_80px_rgba(23,20,18,0.14)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdb69b]">
          Bridge 9
        </p>
        <ul className="mt-6 space-y-4">
          {bridgePoints.map((item) => (
            <li key={item} className="flex gap-3 text-white/78">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#eadcc7]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'Bridge 9 | Shared property transaction workspace'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Bridge 9 connects developers, agents, conveyancers, bond originators, buyers, and managing agents inside one shared property transaction workspace.'
    )
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#171412]">
      <Header />

      <main>
        <Hero />

        <SectionContainer id="problem" className="pb-14 pt-2 lg:pb-20 lg:pt-4">
          <div className="rounded-[36px] border border-[#2d2823] bg-[#171412] p-7 text-white shadow-[0_30px_90px_rgba(23,20,18,0.18)] lg:p-11">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#cdb69b]">
              THE PROBLEM
            </p>
            <h2 className="mt-5 max-w-[980px] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[#f6f0e7] lg:text-[3rem]">
              Property deals don’t fail because people aren’t working. They fail because everyone is working separately.
            </h2>
            <p className="mt-5 max-w-[760px] text-[1rem] leading-8 text-[#b6a99a]">
              Without one shared transaction workspace, updates fragment, accountability gets lost, and buyers are left asking the same questions twice.
            </p>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {problemCards.map((card, index) => {
                const Icon = card.icon

                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="rounded-[24px] border border-white/12 bg-white/[0.06] p-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/14 bg-white/[0.05] text-[#eadcc7]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-4 text-[1.08rem] font-semibold tracking-[-0.03em] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/74">{card.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </SectionContainer>

        <SectionContainer id="platform" tone="soft">
          <SectionHeading
            eyebrow="Platform"
            title="One platform. Every role connected."
            description="Bridge 9 sits around the transaction itself, then gives each role the right view, the right actions, and the right visibility."
            className="max-w-[760px]"
          />
          <PlatformNetwork />
        </SectionContainer>

        <SectionContainer id="modules">
          <SectionHeading
            eyebrow="Modules"
            title="Built around the real transaction journey."
            description="Each module reflects how property transactions actually move in practice, not how a generic CRM expects them to move."
            className="max-w-[760px]"
          />

          <div className="mt-12 space-y-6">
            {moduleCards.map((module, index) => (
              <ModuleCard
                key={module.label}
                label={module.label}
                title={module.title}
                description={module.description}
                bullets={module.bullets}
                previewTitle={module.previewTitle}
                previewRows={module.previewRows}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </SectionContainer>

        <SectionContainer id="client-portal" tone="soft">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Client portal"
                title="A better experience for the buyer."
                description="Bridge 9 gives buyers a simple portal where they can see their stage, outstanding documents, next steps, and recent updates without relying on repeated follow-up."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  'Buyers know where they stand',
                  'Less repeated follow-up',
                  'Safer document collection',
                  'Clear next steps',
                ].map((item) => (
                  <div key={item} className="rounded-[22px] border border-[#e5dacb] bg-white px-4 py-4 text-sm font-medium text-[#171412] shadow-[0_16px_42px_rgba(23,20,18,0.05)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <ClientPortalMockup />
          </div>
        </SectionContainer>

        <SectionContainer id="workflow">
          <SectionHeading
            eyebrow="Workflow"
            title="From offer to registration, every step has a place."
            description="Bridge 9 keeps the transaction lifecycle clear, so each stage, owner, dependency, and document requirement has a natural home."
            className="max-w-[760px]"
          />
          <div className="mt-12">
            <Timeline stages={workflowStages} />
          </div>
        </SectionContainer>

        <SectionContainer id="documents" tone="soft">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Documents"
                title="Documents requested, uploaded, reviewed, and tracked."
                description="Bridge 9 centralises sales, compliance, finance, transfer, and handover documents with clear states and full context."
              />

              <div className="mt-8 grid gap-4">
                {[
                  'Sales and transaction documents',
                  'FICA and compliance requirements',
                  'Finance and bond packs',
                  'Transfer and attorney documents',
                  'Handover and warranty files',
                ].map((item) => (
                  <div key={item} className="rounded-[22px] border border-[#e5dacb] bg-white px-5 py-4 text-sm text-[#5f564c] shadow-[0_14px_34px_rgba(23,20,18,0.05)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <DocumentTracker />
          </div>
        </SectionContainer>

        <SectionContainer id="communication">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Communication"
                title="Less chasing. More shared context."
                description="Bridge 9 does not need to replace every tool immediately. It gives the transaction one shared activity layer for comments, requests, uploads, stage changes, and client updates."
              />

              <div className="mt-8 rounded-[28px] border border-[#e5dacb] bg-[#171412] p-6 text-white shadow-[0_28px_70px_rgba(23,20,18,0.14)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdb69b]">
                  Why it matters
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    'Comments stay attached to the matter.',
                    'Internal notes stay separate when needed.',
                    'Client-visible updates stay consistent.',
                    'Stage changes create shared operational history.',
                  ].map((item) => (
                    <div key={item} className="rounded-[18px] border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-white/74">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ActivityThread />
          </div>
        </SectionContainer>

        <SectionContainer id="reporting" tone="soft">
          <SectionHeading
            eyebrow="Reporting"
            title="Turn transaction activity into useful business insight."
            description="Developers, agents, attorneys, and leadership teams get cleaner visibility into active deals, registrations, bottlenecks, and portfolio performance."
            className="max-w-[760px]"
          />
          <div className="mt-12">
            <ReportingMockup />
          </div>
        </SectionContainer>

        <SectionContainer id="who-its-for">
          <SectionHeading
            eyebrow="Who it’s for"
            title="Designed for the people who move property transactions forward."
            description="Bridge 9 adapts to each role without losing the shared context around the transaction."
            className="max-w-[760px]"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {roleCards.map((role, index) => (
              <RoleCard
                key={role.title}
                icon={role.icon}
                title={role.title}
                description={role.description}
                delay={index * 0.05}
              />
            ))}
          </div>
        </SectionContainer>

        <SectionContainer id="differentiator" tone="soft">
          <SectionHeading
            eyebrow="Different by design"
            title="Bridge 9 is not another CRM."
            description="Bridge 9 is built around the transaction itself — not just contacts, listings, or internal tasks."
            className="max-w-[760px]"
          />
          <div className="mt-12">
            <Differentiator />
          </div>
        </SectionContainer>

        <CTASection
          id="contact"
          eyebrow="Book a demo"
          title="Ready to bring your property transactions into one workspace?"
          description="See how Bridge 9 helps your team manage deals, documents, clients, and role players from one shared transaction workspace."
          primary={{ label: 'Book a Demo', href: '/contact' }}
          secondary={{ label: 'Login', href: `${import.meta.env.VITE_BRIDGE_APP_URL || 'https://bridge-nine-blond.vercel.app'}/auth`, external: true }}
        />
      </main>

      <Footer />
    </div>
  )
}
