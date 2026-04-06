import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  LineChart,
  Menu,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  Workflow,
  X,
} from 'lucide-react'
import AuthModal from '../components/AuthModal'

const navItems = [
  { label: 'Product', href: '#product', hasMenu: true },
  { label: 'Solutions', href: '#solutions', hasMenu: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Resources', href: '#roles', hasMenu: true },
  { label: 'Contact', href: '/contact' },
]

const megaMenus = {
  Product: {
    eyebrow: 'Platform overview',
    title: 'Control every transaction from offer to handover.',
    copy:
      'Bridge connects listings, deals, documents, and reporting into one shared system, so nothing slips, stalls, or gets lost.',
    pills: [
      {
        label: 'Shared transaction record',
        description: 'One source of truth for every deal, across all stakeholders.',
      },
      {
        label: 'Role-based workflows',
        description: 'Each party sees what matters, and knows exactly what to do next.',
      },
      {
        label: 'Executive reporting',
        description: 'Live visibility across your pipeline, performance, and progress.',
      },
    ],
    cards: [
      {
        label: 'Bridge For Developers',
        description: 'Manage your entire development pipeline, from listings to transfer, in one system.',
        href: '#roles',
      },
      {
        label: 'Bridge For Agents',
        description: 'Track deals, manage clients, and move transactions forward without chasing updates.',
        href: '#roles',
      },
      {
        label: 'Bridge For Conveyancers',
        description: 'Run your workflow, manage documents, and keep every transaction on track.',
        href: '#roles',
      },
      {
        label: 'Bridge For Bond Originators',
        description: 'Track applications, collect documents, and stay aligned with every deal in progress.',
        href: '#roles',
      },
    ],
    layout: 'product',
  },
  Solutions: {
    layout: 'columns',
    columns: [
      {
        title: 'By Role',
        primary: true,
        items: [
          {
            label: 'For Developers',
            description: 'Portfolio visibility, unit movement, and deal oversight.',
            href: '#roles',
          },
          {
            label: 'For Agents',
            description: 'Track deals and stay aligned without chasing updates.',
            href: '#roles',
          },
          {
            label: 'For Conveyancers',
            description: 'Structured workflow, documents, and progress tracking.',
            href: '#roles',
          },
          {
            label: 'For Bond Originators',
            description: 'Manage applications, documents, and approvals in one place.',
            href: '#roles',
          },
        ],
      },
      {
        title: 'Platform',
        items: [
          {
            label: 'Transaction Workspace',
            description: 'One shared record for every deal.',
            href: '#product',
          },
          {
            label: 'Workflow Tracking',
            description: 'Milestones, responsibilities, and progress.',
            href: '#how-it-works',
          },
          {
            label: 'Document Management',
            description: 'Secure, centralized file handling.',
            href: '#product',
          },
          {
            label: 'Reporting & Insights',
            description: 'Live dashboards and export-ready reports.',
            href: '#command-layer',
          },
        ],
      },
      {
        title: 'Products',
        items: [
          {
            label: 'Bridge Listings',
            description: 'Capture leads and feed your pipeline.',
            href: '#product',
          },
          {
            label: 'Bridge Link',
            description: 'Client-facing view for documents and progress.',
            href: '#product',
          },
        ],
      },
    ],
  },
  Resources: {
    eyebrow: 'Learn',
    title: 'Learn how modern property transactions actually run.',
    copy:
      'Practical guides, real workflows, and insights to help you manage deals more effectively.',
    pills: [
      {
        label: 'Transaction lifecycle',
        description: 'From offer to transfer, step by step.',
      },
      {
        label: 'Role responsibilities',
        description: 'Who does what, and when, in every deal.',
      },
      {
        label: 'Reporting & oversight',
        description: 'How to track performance across your pipeline.',
      },
    ],
    columns: [
      {
        title: 'Learn',
        items: [
          {
            label: 'Guides & Playbooks',
            description: 'Step-by-step breakdowns of real transactions.',
            href: '#how-it-works',
          },
          {
            label: 'Templates & Documents',
            description: 'Checklists, workflows, and standard documents.',
            href: '#product',
          },
          {
            label: 'Case Studies',
            description: 'How teams run deals using structured systems.',
            href: '#contact',
          },
          {
            label: 'Blog / Insights',
            description: 'Industry thinking, trends, and breakdowns.',
            href: '#solutions',
          },
        ],
      },
      {
        title: 'Explore',
        items: [
          {
            label: 'How it works',
            description: 'See the full lifecycle and platform flow.',
            href: '#how-it-works',
          },
          {
            label: 'Role views',
            description: 'Understand how each stakeholder uses Bridge.',
            href: '#roles',
          },
          {
            label: 'Book a demo',
            description: 'Walk through a real transaction with us.',
            href: '/contact',
          },
        ],
      },
    ],
    layout: 'resources',
  },
}

const heroMetrics = [
  {
    value: 'One system',
    label: 'Shared transaction record',
    copy: 'The deal, workflow, and reporting stay attached to one live matter.',
  },
  {
    value: '4 core roles',
    label: 'Role-specific experiences',
    copy: 'Every stakeholder works from the same current state without losing their context.',
  },
  {
    value: 'Live workflow',
    label: 'Real-stage coordination',
    copy: 'Stages follow the real property lifecycle instead of a generic sales pipeline.',
  },
  {
    value: 'Report-ready',
    label: 'Operational oversight',
    copy: 'Leadership sees live operational movement without rebuilding status manually.',
  },
]

const heroProof = ['One live record', '4 stakeholder views', 'Reporting built in']

const problemCards = [
  {
    title: 'Clients keep asking for updates',
    copy: 'When buyers and stakeholders cannot see progress, your team becomes the update engine.',
    impact: 'Operations slow down to answer the same question again.',
    support: ['Status calls repeat', 'Progress gets retold'],
    icon: UserRound,
    featured: true,
  },
  {
    title: 'No single source of truth',
    copy: 'Progress still lives across inboxes, spreadsheets, calls, and WhatsApp threads.',
    impact: 'Nobody trusts the latest answer.',
    support: ['Context lives everywhere'],
    icon: MessageSquareMore,
  },
  {
    title: 'Teams work in silos',
    copy: 'Developers, legal teams, agents, and buyers move in parallel without shared visibility.',
    impact: 'Handoffs lose time and accountability.',
    support: ['Ownership gets blurred'],
    icon: Users,
  },
  {
    title: 'Reporting is stitched together',
    copy: 'Leadership still waits for manually compiled status instead of live operational insight.',
    impact: 'Visibility arrives late.',
    support: ['Manual summaries persist'],
    icon: LineChart,
  },
]

const benefitCards = [
  {
    title: 'Shared visibility',
    label: 'Visibility',
    copy: 'Everyone works from the same live transaction record, so the current state is visible without asking around.',
    support: ['Latest stage stays legible', 'Updates stay connected'],
    icon: BarChart3,
    featured: true,
  },
  {
    title: 'Structured workflow',
    label: 'Workflow',
    copy: 'Stages, documents, and dependencies follow the real property lifecycle instead of generic task lists.',
    support: ['Milestones map to reality', 'Dependencies stay attached'],
    icon: Workflow,
  },
  {
    title: 'Clear responsibilities',
    label: 'Accountability',
    copy: 'Ownership stays visible, so stalled work and blocked handoffs surface before they become delays.',
    support: ['Current owner stays obvious', 'Blocked work shows faster'],
    icon: ClipboardList,
  },
  {
    title: 'Better client experience',
    label: 'Client experience',
    copy: 'Buyers see what is complete, what is required, and what happens next without relying on ad hoc updates.',
    support: ['Next steps stay visible', 'Updates feel professional'],
    icon: ShieldCheck,
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Open the matter',
    copy: 'Capture the deal, attach the right role-players, and create one live record from day one.',
  },
  {
    number: '02',
    title: 'Assign owners and actions',
    copy: 'Move documents, tasks, and stakeholder actions through the right stage with shared visibility.',
  },
  {
    number: '03',
    title: 'Track blockers and readiness',
    copy: 'See what is complete, what is blocked, and what should happen next without chasing updates.',
  },
  {
    number: '04',
    title: 'Report from live workflow',
    copy: 'Turn live transaction activity into cleaner oversight and better stakeholder reporting.',
  },
]

const roleCards = [
  {
    step: '01',
    title: 'Developers',
    copy: 'Track units, transaction flow, bottlenecks, and portfolio progress across developments.',
    detail: 'Portfolio view, unit movement, reporting readiness',
    points: ['Development performance', 'Deal ageing', 'Registration forecast'],
    icon: Building2,
    status: 'Portfolio view',
    tone: 'primary',
  },
  {
    step: '02',
    title: 'Conveyancers',
    copy: 'Manage legal workflow, document readiness, and milestone visibility with less back-and-forth.',
    detail: 'Matter readiness, task ownership, document control',
    points: ['Matter checklist', 'Stage dependencies', 'Document status'],
    icon: FileCheck2,
    status: 'Workflow control',
    tone: 'secondary',
  },
  {
    step: '03',
    title: 'Agents',
    copy: 'Stay visible after the sale is agreed without constantly chasing fragmented progress updates.',
    detail: 'Post-sale clarity, cleaner buyer conversations',
    points: ['Buyer status', 'Sales handoff', 'Outstanding actions'],
    icon: Users,
    status: 'Post-sale visibility',
    tone: 'secondary',
  },
  {
    step: '04',
    title: 'Buyers',
    copy: 'Follow the transaction clearly and understand what is complete, what is needed, and what comes next.',
    detail: 'Guided onboarding, calmer purchase journey',
    points: ['Next required step', 'Document prompts', 'Handover readiness'],
    icon: UserRound,
    status: 'Clear next steps',
    tone: 'secondary',
  },
]

const productCards = [
  {
    label: 'Dashboard',
    title: 'Portfolio command view',
    copy: 'Monitor stage mix, deal pressure, and readiness across the wider transaction book from one executive surface.',
  },
  {
    label: 'Transaction',
    title: 'Single matter workspace',
    copy: 'Keep documents, notes, owners, dependencies, and progress attached to one live matter record.',
  },
  {
    label: 'Lifecycle',
    title: 'Progress with clarity',
    copy: 'See what moved, what is blocked, and what happens next across the deal lifecycle.',
  },
  {
    label: 'Reporting',
    title: 'Operational reporting layer',
    copy: 'Turn transaction movement into leadership-ready oversight without rebuilding status in spreadsheets.',
  },
]

const darkModules = [
  {
    title: 'Portfolio command',
    copy:
      'See active matters, stage pressure, and readiness from one high-contrast executive surface.',
    icon: BarChart3,
  },
  {
    title: 'Workflow control',
    copy:
      'Track the actual transaction lifecycle with clear stages, owners, and handoffs.',
    icon: Workflow,
  },
  {
    title: 'Reporting pack',
    copy:
      'Turn live movement into operational summaries instead of manual status rebuilds.',
    icon: ClipboardList,
  },
]

const heroStages = [
  {
    title: 'Offer / reservation',
    status: 'Complete',
    statusTone: 'bg-[#eadcc7] text-[#1f1914]',
    dotTone: 'bg-[#eadcc7]',
  },
  {
    title: 'Finance and supporting docs',
    status: 'Active',
    statusTone: 'bg-[#eadcc7]/14 text-[#f2e7d6]',
    dotTone: 'bg-[#cfb695]',
  },
  {
    title: 'Transfer preparation',
    status: 'Ready next',
    statusTone: 'bg-white/[0.06] text-white/80',
    dotTone: 'bg-white/40',
  },
  {
    title: 'Registration and handover',
    status: 'Pending',
    statusTone: 'bg-white/[0.04] text-white/55',
    dotTone: 'bg-white/20',
  },
]

const heroPipeline = [
  { label: 'Offer', value: '12', width: '100%' },
  { label: 'Signed', value: '9', width: '75%' },
  { label: 'Bond', value: '6', width: '52%' },
  { label: 'Transfer', value: '4', width: '36%' },
  { label: 'Registration', value: '2', width: '18%' },
]

const liveOverviewMetrics = [
  { value: '47', label: 'Active' },
  { value: '6', label: 'At risk' },
  { value: '18', label: 'Ready' },
]

const workspaceFlowBars = [
  { label: 'Offer accepted', value: '100%', width: '100%' },
  { label: 'Bond approved', value: '68%', width: '68%' },
  { label: 'Transfer prep', value: '42%', width: '42%' },
]

const workspaceSignals = [
  { title: 'Buyer documents requested', status: 'Ready next' },
  { title: 'Guarantees outstanding', status: 'At risk' },
  { title: 'Registration pack assembled', status: 'In review' },
]

const workspaceActivity = [
  { title: 'Buyer docs uploaded', meta: '2 min ago', tag: 'Received' },
  { title: 'Bond attorney note added', meta: '12 min ago', tag: 'Updated' },
  { title: 'Transfer dependency flagged', meta: '27 min ago', tag: 'Attention' },
]

const reportingMetrics = [
  { value: '47', label: 'Active' },
  { value: '6', label: 'At risk' },
  { value: '18', label: 'Ready' },
]

const reportingActivity = [
  { title: 'Registration risk surfaced', meta: 'Portfolio report', tag: 'Escalated' },
  { title: 'Buyer readiness improved', meta: 'Weekly ops view', tag: 'Recovered' },
  { title: 'Document lag isolated', meta: 'Executive summary', tag: 'Flagged' },
]

const commandMetrics = [
  { label: 'Active matters', value: '47' },
  { label: 'Ready next', value: '18' },
  { label: 'Reporting ready', value: '100%' },
]

const commandSurfaceRows = [
  { title: 'Developer view', meta: '4 registrations due', status: '12 offers' },
  { title: 'Legal workflow', meta: '6 at risk', status: '9 signed' },
  { title: 'Buyer readiness', meta: '2 blocked by docs', status: '18 ready' },
]

const trustMetrics = [
  { value: '1', label: 'Live transaction record' },
  { value: '4', label: 'Core stakeholder views' },
  { value: '100%', label: 'Workflow-to-report continuity' },
]

const implementationSteps = [
  {
    step: '01',
    title: 'Start with one workflow',
    copy: 'Launch Bridge around the live transaction stages your team already works through every day.',
  },
  {
    step: '02',
    title: 'Bring in the right roles',
    copy: 'Add developers, conveyancers, agents, and buyers into the same record as the workflow expands.',
  },
  {
    step: '03',
    title: 'Turn activity into oversight',
    copy: 'Give leadership live operational visibility without waiting for manual status summaries.',
  },
]

const trustCards = [
  {
    title: 'Module-first rollout',
    copy: 'Start with the workflow and role views that matter most, then expand across the wider book.',
    icon: Workflow,
  },
  {
    title: 'Role-based visibility',
    copy: 'Each stakeholder gets the right context without fragmenting the transaction into separate tools.',
    icon: Users,
  },
  {
    title: 'Reporting continuity',
    copy: 'The same live operational data supports both daily coordination and leadership reporting.',
    icon: BarChart3,
  },
]

const nextStepCards = [
  {
    title: 'Working session',
    copy: 'Walk through one live transaction workflow and identify the stages, owners, and reporting points that matter most.',
  },
  {
    title: 'Rollout recommendation',
    copy: 'Define the first module, team, and reporting surfaces to launch without forcing a big-bang implementation.',
  },
  {
    title: 'Commercial next step',
    copy: 'Leave with a clearer view of fit, rollout shape, and what the first deployment would look like.',
  },
]

const faqItems = [
  {
    question: 'Who is Bridge built for?',
    answer:
      'Bridge is designed for developers, conveyancers, agents, and buyers who all need visibility into the same property transaction.',
  },
  {
    question: 'How is Bridge different from a CRM or task tracker?',
    answer:
      'Bridge is built around the property transaction itself, not a generic pipeline. It keeps workflow, documents, ownership, and reporting attached to the same live matter.',
  },
  {
    question: 'What does implementation look like?',
    answer:
      'Teams start with the core workflow, role views, and reporting surfaces that matter most, then expand usage across the wider transaction book.',
  },
]

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

const sectionShell = 'px-4 py-16 lg:px-6 lg:py-20'
const sectionSoftShell = 'border-y border-black/5 bg-white/65 px-4 py-16 lg:px-6 lg:py-20'
const sectionWarmShell = 'border-y border-black/5 bg-white/70 px-4 py-16 lg:px-6 lg:py-20'
const sectionContainer = 'mx-auto max-w-[1280px]'
const darkSectionContainer =
  'mx-auto max-w-[1280px] overflow-hidden rounded-[40px] border border-[#1d1a17] bg-[linear-gradient(180deg,#141210_0%,#1c1916_100%)] p-8 text-white shadow-[0_28px_70px_rgba(19,17,15,0.18)] lg:p-10'

function ProductMetricGrid({ items, dark = false, columns = 3, compact = false }) {
  const gridClass =
    columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-3'
  const cardClass = dark
    ? 'border border-white/8 bg-white/[0.05] text-[#faf6f0]'
    : 'border border-[#e7dccc] bg-white/80 text-[#171412]'
  const labelClass = dark ? 'text-[#998f82]' : 'text-[#917b63]'
  const valueClass = dark ? 'text-[#faf6f0]' : 'text-[#171412]'

  return (
    <div className={`grid ${gridClass} ${compact ? 'gap-2' : 'gap-3'}`}>
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={`rounded-[20px] px-3 py-4 text-center ${compact ? '' : 'sm:px-4'} ${cardClass}`}
        >
          <div
            className={`${compact ? 'text-[1.15rem]' : 'text-[1.3rem]'} font-semibold tracking-[-0.05em] ${valueClass}`}
          >
            {item.value}
          </div>
          <div className={`mt-1 text-[10px] uppercase tracking-[0.2em] ${labelClass}`}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}

function ProductProgressBars({ items, dark = false, compact = false }) {
  const labelClass = dark ? 'text-[#cfc6bb]' : 'text-[#5f5449]'
  const trackClass = dark ? 'bg-white/8' : 'bg-[#efe7dc]'

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      {items.map((item) => (
        <div key={item.label}>
          <div className={`mb-2 flex items-center justify-between text-sm ${labelClass}`}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className={`h-2 rounded-full ${trackClass}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#eadcc7] to-[#92a7c2]"
              style={{ width: item.width }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProductSignalRows({ items, dark = false, compact = false }) {
  const rowClass = dark
    ? 'border border-white/8 bg-white/[0.03]'
    : 'border border-[#eee3d6] bg-white'
  const titleClass = dark ? 'text-[#f3ece3]' : 'text-[#3d342d]'
  const metaClass = dark ? 'text-[#bfb5aa]' : 'text-[#6f6457]'

  return (
    <div className={compact ? 'space-y-3' : 'space-y-3'}>
      {items.map((item) => (
        <div
          key={item.title}
          className={`flex items-center justify-between gap-3 rounded-[18px] px-3 py-3 ${compact ? 'sm:px-4 sm:py-4' : ''} ${rowClass}`}
        >
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${item.dotTone ?? (dark ? 'bg-white/25' : 'bg-[#d6c3ab]')}`} />
            <div>
              <p className={`text-sm ${titleClass}`}>{item.title}</p>
              {item.meta ? <p className={`mt-1 text-xs ${metaClass}`}>{item.meta}</p> : null}
            </div>
          </div>
          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${
              item.statusTone ??
              (dark
                ? 'border-white/8 bg-white/[0.04] text-[#f2e7d6]'
                : 'border-[#e2d5c7] bg-[#fcfaf7] text-[#8b7760]')
            }`}
          >
            {item.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function ProductActivityFeed({ items, dark = false }) {
  const wrapperClass = dark
    ? 'border border-white/8 bg-white/[0.04]'
    : 'border border-[#ede3d8] bg-[#fcfaf7]'
  const titleClass = dark ? 'text-[#faf6f0]' : 'text-[#171412]'
  const metaClass = dark ? 'text-[#bfb5aa]' : 'text-[#6f6457]'
  const tagClass = dark
    ? 'border-white/8 bg-white/[0.04] text-[#eadcc7]'
    : 'border-[#e2d5c7] bg-white text-[#8b7760]'

  return (
    <div className={`rounded-[22px] p-4 ${wrapperClass}`}>
      <p className={`text-[10px] font-semibold uppercase tracking-[0.26em] ${dark ? 'text-[#a59685]' : 'text-[#8f7b64]'}`}>
        Activity feed
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={`${item.title}-${item.meta}`}
            className={`flex items-center justify-between gap-3 rounded-[18px] px-3 py-3 ${
              dark ? 'border border-white/8 bg-black/10' : 'border border-[#eee3d6] bg-white'
            }`}
          >
            <div className="min-w-0">
              <p className={`text-sm font-medium ${titleClass}`}>{item.title}</p>
              <p className={`mt-1 text-xs ${metaClass}`}>{item.meta}</p>
            </div>
            <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${tagClass}`}>
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center items-center' : 'items-start'

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8b7760]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#171412] sm:text-[2.85rem]">
        {title}
      </h2>
      <p className="max-w-[760px] text-[0.99rem] leading-7 text-[#6d6357]">{description}</p>
    </div>
  )
}

function MegaMenuPanel({ section, onNavigate }) {
  const menu = megaMenus[section]

  if (!menu) {
    return null
  }

  if (menu.layout === 'product') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18 }}
        className="absolute left-1/2 top-full z-50 mt-5 w-[980px] -translate-x-1/2 overflow-hidden rounded-[30px] border border-[#2c2823] bg-[linear-gradient(180deg,#171412_0%,#1f1c18_100%)] shadow-[0_28px_70px_rgba(19,17,15,0.24)]"
      >
        <div className="grid grid-cols-[0.95fr_1.05fr]">
          <div className="border-r border-white/8 p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b3a595]">
              {menu.eyebrow}
            </p>
            <h3 className="mt-4 text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#faf6f0]">
              {menu.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#c9c0b5]">{menu.copy}</p>

            <div className="mt-6 grid gap-3">
              {menu.pills.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-4"
                >
                  <div className="text-sm font-semibold text-[#faf6f0]">{item.label}</div>
                  <div className="mt-1 text-sm leading-6 text-[#b9aea0]">{item.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid auto-rows-fr grid-cols-2 gap-4 p-7">
            {menu.cards.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex h-full min-h-[220px] flex-col rounded-[22px] border border-white/8 bg-white/[0.03] px-5 py-5 transition hover:bg-white/[0.06]"
                onClick={onNavigate}
              >
                <div className="text-sm font-semibold text-[#faf6f0]">{item.label}</div>
                <div className="mt-3 max-w-[260px] text-sm leading-7 text-[#b9aea0]">{item.description}</div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (menu.layout === 'columns') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18 }}
        className="absolute left-1/2 top-full z-50 mt-5 w-[1080px] -translate-x-1/2 overflow-hidden rounded-[30px] border border-[#2c2823] bg-[linear-gradient(180deg,#171412_0%,#1f1c18_100%)] shadow-[0_28px_70px_rgba(19,17,15,0.24)]"
      >
        <div className="grid grid-cols-3">
          {menu.columns.map((group) => (
            <div key={group.title} className="border-r border-white/8 p-7 last:border-r-0">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9b8c7a]">
                {group.title}
              </p>

              <div className="space-y-2">
                {group.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block rounded-[20px] border px-4 py-4 transition hover:bg-white/[0.06] ${
                      group.primary
                        ? 'border-[#e6d7c5]/14 bg-[#e6d7c5]/8'
                        : 'border-white/6 bg-white/[0.03]'
                    }`}
                    onClick={onNavigate}
                  >
                    <div className="text-sm font-semibold text-[#faf6f0]">{item.label}</div>
                    <div className="mt-1 text-sm leading-6 text-[#b9aea0]">{item.description}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (menu.layout === 'resources') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18 }}
        className="absolute left-1/2 top-full z-50 mt-5 w-[1080px] -translate-x-1/2 overflow-hidden rounded-[30px] border border-[#2c2823] bg-[linear-gradient(180deg,#171412_0%,#1f1c18_100%)] shadow-[0_28px_70px_rgba(19,17,15,0.24)]"
      >
        <div className="grid grid-cols-[0.95fr_1.05fr]">
          <div className="border-r border-white/8 p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b3a595]">
              {menu.eyebrow}
            </p>
            <h3 className="mt-4 text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#faf6f0]">
              {menu.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#c9c0b5]">{menu.copy}</p>

            <div className="mt-6 grid gap-3">
              {menu.pills.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-4"
                >
                  <div className="text-sm font-semibold text-[#faf6f0]">{item.label}</div>
                  <div className="mt-1 text-sm leading-6 text-[#b9aea0]">{item.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2">
            {menu.columns.map((group) => (
              <div key={group.title} className="border-r border-white/8 p-7 last:border-r-0">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9b8c7a]">
                  {group.title}
                </p>

                <div className="space-y-2">
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block rounded-[20px] border border-white/6 bg-white/[0.03] px-4 py-4 transition hover:bg-white/[0.06]"
                      onClick={onNavigate}
                    >
                      <div className="text-sm font-semibold text-[#faf6f0]">{item.label}</div>
                      <div className="mt-1 text-sm leading-6 text-[#b9aea0]">{item.description}</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 top-full z-50 mt-5 w-[980px] -translate-x-1/2 overflow-hidden rounded-[30px] border border-[#2c2823] bg-[linear-gradient(180deg,#171412_0%,#1f1c18_100%)] shadow-[0_28px_70px_rgba(19,17,15,0.24)]"
    >
      <div className="grid grid-cols-[0.88fr_1.12fr]">
        <div className="border-r border-white/8 p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b3a595]">
            {menu.eyebrow}
          </p>
          <h3 className="mt-4 text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#faf6f0]">
            {menu.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#c9c0b5]">{menu.copy}</p>

          <div className="mt-6 grid gap-3">
            {['Shared transaction record', 'Role-based workflows', 'Executive reporting'].map((item) => (
              <div
                key={item}
                className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-[#e8dfd3]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-0">
          {menu.groups.map((group) => (
            <div key={group.title} className="p-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9b8c7a]">
                {group.title}
              </p>

              <div className="space-y-2">
                {group.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block rounded-[20px] border border-white/6 bg-white/[0.03] px-4 py-4 transition hover:bg-white/[0.06]"
                    onClick={onNavigate}
                  >
                    <div className="text-sm font-semibold text-[#faf6f0]">{item.label}</div>
                    <div className="mt-1 text-sm leading-6 text-[#b9aea0]">{item.description}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function StickyRoleCard({ card, index }) {
  const Icon = card.icon
  const cardStyle =
    card.tone === 'primary'
      ? 'border border-white/12 bg-[linear-gradient(180deg,#181817_0%,#101010_100%)]'
      : 'border border-white/10 bg-[linear-gradient(180deg,#161412_0%,#100f0e_100%)]'

  const badgeStyle =
    card.tone === 'primary'
      ? 'border border-[#D8CBB8]/20 bg-[#D8CBB8]/10 text-[#E9DCCA]'
      : 'border border-white/10 bg-white/[0.04] text-white/68'

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.42, delay: index * 0.05 }}
      className={`relative rounded-[32px] p-6 shadow-[0_20px_56px_rgba(0,0,0,0.22)] ${cardStyle}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-white/75">
            {card.step}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">
              Role module
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

      <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#eadcc7]">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-5 text-sm leading-7 text-white/60 md:text-[15px]">
        {card.copy}
      </p>

      <p className="mt-4 text-sm font-medium text-white/82">
        {card.detail}
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {card.points.map((item) => (
          <div
            key={item}
            className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-white/85"
          >
            {item}
          </div>
        ))}
      </div>
    </motion.article>
  )
}

function StickyRoleModulesSection() {
  return (
    <section id="roles" className="px-4 pb-16 lg:px-6 lg:pb-20">
      <div className={darkSectionContainer}>
        <div className="grid gap-10 xl:grid-cols-[0.86fr_1.14fr] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b3a595]">
              By role
            </p>
            <h2 className="mt-5 max-w-[540px] text-[2.3rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#faf6f0] sm:text-[2.9rem]">
              One platform, four role-specific views.
            </h2>
            <p className="mt-5 max-w-[520px] text-[1rem] leading-8 text-[#c9c0b5]">
              Developers, conveyancers, agents, and buyers each get the context they need while the transaction stays connected end to end.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {roleCards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-full px-4 py-3 text-sm font-medium ${
                    card.tone === 'primary'
                      ? 'border border-[#D8CBB8]/20 bg-[#D8CBB8]/10 text-[#E9DCCA]'
                      : 'border border-white/10 bg-white/[0.04] text-white/82'
                  }`}
                >
                  {card.title}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/30">
                  Shared value
                </p>
                <p className="mt-5 text-2xl font-semibold leading-tight text-white">
                  Every role sees what matters without losing the full picture.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 xl:pb-12">
            {roleCards.map((card, index) => (
              <div key={card.title} className="xl:sticky" style={{ top: `${92 + index * 22}px` }}>
                <StickyRoleCard card={card} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Header({ onLaunchApp }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(247,243,237,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="text-[1.05rem] font-semibold tracking-[0.22em] text-[#171412]">
          BRIDGE
        </a>

        <div
          className="relative hidden lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <nav className="flex items-center gap-9">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasMenu && setOpenMenu(item.label)}
              >
                <a
                  href={item.href}
                  className="bridge-nav-link inline-flex items-center gap-2"
                >
                  {item.label}
                  {item.hasMenu ? (
                    <span className="text-[10px] text-[#8c8073]">▾</span>
                  ) : null}
                </a>
              </div>
            ))}
          </nav>

          <AnimatePresence>
            {openMenu ? (
              <MegaMenuPanel
                section={openMenu}
                onNavigate={() => setOpenMenu(null)}
              />
            ) : null}
          </AnimatePresence>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="bridge-button-secondary border-black/8 bg-white/82 px-5 py-2.5 text-[0.95rem] shadow-none"
            onClick={onLaunchApp}
          >
            Login / Sign up
          </button>
          <a href="#roles" className="bridge-button-primary px-6 py-2.5">
            View Developments
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ddd2c6] bg-white/70 text-[#171412] lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-black/5 bg-[rgba(247,243,237,0.96)] px-6 py-5 lg:hidden"
          >
            <div className="mx-auto flex max-w-[1280px] flex-col gap-3">
              {navItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <a
                    href={item.href}
                    className="block rounded-2xl border border-[#e7ddd2] bg-white/80 px-4 py-3 text-sm font-medium text-[#2f2924]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>

                  {item.hasMenu && megaMenus[item.label] ? (
                    <div className="rounded-[24px] border border-[#29231d] bg-[linear-gradient(180deg,#171412_0%,#1f1c18_100%)] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a69887]">
                        {megaMenus[item.label].eyebrow}
                      </p>
                      <div className="mt-3 space-y-2">
                        {megaMenus[item.label].groups.flatMap((group) =>
                          group.items.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className="block rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3"
                              onClick={() => setOpen(false)}
                            >
                              <div className="text-sm font-semibold text-[#faf6f0]">
                                {subItem.label}
                              </div>
                              <div className="mt-1 text-xs leading-5 text-[#b9aea0]">
                                {subItem.description}
                              </div>
                            </a>
                          ))
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
              <a
                href="#roles"
                className="bridge-button-primary mt-2 justify-center"
                onClick={() => setOpen(false)}
              >
                View Developments
              </a>
              <button
                type="button"
                className="bridge-button-secondary justify-center"
                onClick={() => {
                  setOpen(false)
                  onLaunchApp()
                }}
              >
                Login / Sign up
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32, scale: 0.985 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[580px]"
    >
      <div className="absolute -left-6 top-12 hidden h-24 w-24 rounded-full bg-[#d6c1a4]/20 blur-3xl lg:block" />
      <div className="absolute -right-8 bottom-10 hidden h-28 w-28 rounded-full bg-[#c8d6eb]/22 blur-3xl lg:block" />

      <div className="relative overflow-hidden rounded-[32px] border border-[#29231d] bg-[linear-gradient(180deg,#141210_0%,#1a1816_100%)] p-5 text-white shadow-[0_28px_72px_rgba(19,17,15,0.2)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#aa9f91]">
              Transaction workspace
            </p>
            <h3 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.05em] text-[#faf6f0]">
              Unit 14 · Junoah Estate
            </h3>
            <p className="mt-2 text-sm text-[#c9c0b5]">
              Buyer · Conveyancer · Developer · Agent
            </p>
          </div>

          <div className="rounded-full border border-[#eadcc7]/10 bg-[#eadcc7]/8 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#f2e7d6]">
            Live
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#dfd6cb]">Bond in process</p>
              <p className="mt-2 text-[1.9rem] font-semibold tracking-[-0.05em] text-[#faf6f0]">
                68%
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/15 px-4 py-3 text-right">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#958b7e]">
                Next owner
              </p>
              <p className="mt-2 text-sm text-[#f6efe5]">Buyer documents</p>
            </div>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '68%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-[#eadcc7]"
            />
          </div>
        </div>

        <div className="mt-5">
          <ProductSignalRows items={heroStages} dark compact />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#968c80]">
              Pipeline overview
            </p>
            <div className="mt-4">
              <ProductProgressBars items={heroPipeline} dark compact />
            </div>
          </div>

          <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#968c80]">
              Live overview
            </p>
            <div className="mt-4">
              <ProductMetricGrid items={liveOverviewMetrics} dark columns={3} compact />
            </div>
            <p className="mt-4 text-sm leading-6 text-[#c8beb3]">
              Cleaner oversight across the full transaction book.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/70">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-10 text-sm text-[#706458] lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-[0.95rem] font-semibold tracking-[0.22em] text-[#171412]">BRIDGE</p>
          <p className="mt-2">The operating system for property transactions.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-[#171412]">
              {item.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-[#8c8073]">© {new Date().getFullYear()} Bridge</p>
      </div>
    </footer>
  )
}

function TrustSection() {
  return (
    <motion.section {...reveal} className={sectionWarmShell}>
      <div className={`${sectionContainer} grid gap-5 lg:grid-cols-[1.05fr_0.95fr]`}>
        <div className="rounded-[34px] border border-[#e9dfd5] bg-[linear-gradient(180deg,#ffffff_0%,#faf6f0_100%)] p-7 shadow-[0_22px_60px_rgba(19,17,15,0.07)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8f7c67]">
            Implementation and trust
          </p>
          <h3 className="mt-4 max-w-[620px] text-[1.9rem] font-semibold tracking-[-0.05em] text-[#171412]">
            Bridge is designed to go live in the real transaction workflow.
          </h3>
          <p className="mt-4 max-w-[620px] text-sm leading-7 text-[#6f6457]">
            You do not need to replace everything at once. Start with one workflow, bring the right roles into the same record, and extend reporting from the same live activity.
          </p>

          <div className="mt-7">
            <ProductMetricGrid items={trustMetrics} columns={3} />
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {implementationSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[24px] border border-[#ece2d8] bg-white/92 p-5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f7b64]">
                  {item.step}
                </p>
                <h4 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.04em] text-[#171412]">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-[#6f6457]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-[#1d1a17] bg-[linear-gradient(180deg,#171412_0%,#201d19_100%)] p-7 text-white shadow-[0_28px_80px_rgba(19,17,15,0.18)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b3a595]">
            Why this is credible
          </p>
          <h3 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.05em] text-[#faf6f0]">
            The workflow, role views, and reporting layer are built to reinforce each other.
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#c9c0b5]">
            Bridge works because the operational model is connected end to end: one live record for execution, and one reporting layer for oversight.
          </p>

          <div className="mt-7 grid gap-4">
            {trustCards.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#eadcc7]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 text-[1.12rem] font-semibold tracking-[-0.04em] text-[#faf6f0]">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-[#c9c0b5]">{item.copy}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function FinalCTASection({ onLaunchApp, onSignUp }) {
  return (
    <motion.section {...reveal} id="contact" className={sectionWarmShell}>
      <div className={`${sectionContainer} grid gap-8 lg:grid-cols-[1fr_0.95fr]`}>
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="See Bridge on a live transaction workflow."
            description="Book a walkthrough to see how Bridge replaces fragmented updates with one live operating layer for the full deal."
          />

          <div className="mt-8 space-y-4">
            {[
              'Walk through the transaction lifecycle from offer to handover.',
              'See how Bridge fits developer, legal, sales, and buyer workflows.',
              'Understand how live workflow becomes cleaner operational reporting.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[22px] border border-[#ece2d8] bg-white/90 px-5 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8b745a]" />
                <p className="text-sm leading-7 text-[#5f5449]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-[#1d1a17] bg-[linear-gradient(180deg,#171412_0%,#201d19_100%)] p-7 text-white shadow-[0_28px_80px_rgba(19,17,15,0.18)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b3a595]">
            What happens next
          </p>
          <h3 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.05em] text-[#faf6f0]">
            Move from product fit to rollout shape.
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#c9c0b5]">
            The next conversation should make the implementation shape clear: where Bridge starts, who comes in first, and what leadership gets visibility into immediately.
          </p>

          <div className="mt-7 space-y-3">
            {nextStepCards.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                <p className="text-sm font-semibold text-[#faf6f0]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c0b5]">{item.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-3">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                <p className="text-sm font-semibold text-[#faf6f0]">{item.question}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c0b5]">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="bridge-button-primary justify-center" onClick={onLaunchApp}>
              Launch App
            </button>
            <button type="button" className="bridge-button-secondary justify-center" onClick={onSignUp}>
              Create Workspace
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <a href="#top" className="rounded-full px-4 py-3 text-sm font-semibold text-[#c9c0b5] transition hover:text-[#faf6f0]">
              Back to Top
            </a>
            <a href="#product" className="rounded-full px-4 py-3 text-sm font-semibold text-[#c9c0b5] transition hover:text-[#faf6f0]">
              Explore the Platform
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [authVersion, setAuthVersion] = useState(0)

  function openLogin() {
    setAuthMode('login')
    setAuthVersion((current) => current + 1)
    setAuthOpen(true)
  }

  function openSignup() {
    setAuthMode('signup')
    setAuthVersion((current) => current + 1)
    setAuthOpen(true)
  }

  return (
    <div id="top" className="bridge-site-bg min-h-screen text-[#171412]">
      <Header onLaunchApp={openLogin} />

      <main>
        <section className="relative overflow-hidden px-4 pb-8 pt-4 lg:px-6 lg:pb-10 lg:pt-5">
          <div className="mx-auto max-w-[1280px] rounded-[40px] border border-white/70 bg-[linear-gradient(180deg,#f6f2eb_0%,#f3ede4_100%)] px-6 py-8 shadow-[0_18px_50px_rgba(19,17,15,0.06)] lg:px-8 lg:py-8">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <motion.div {...reveal} className="relative z-10 flex max-w-[610px] flex-col py-2">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e3d7ca] bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#806f5a] shadow-[0_8px_18px_rgba(24,22,20,0.04)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Property transaction operating system
                </div>

                <h1 className="mt-5 text-[3.3rem] font-semibold leading-[0.92] tracking-[-0.075em] text-[#171412] sm:text-[4.35rem] lg:text-[4.9rem]">
                  From offer to
                  <br />
                  handover, all in
                  <br />
                  one place.
                </h1>

                <p className="mt-5 max-w-[560px] text-[1.03rem] leading-8 text-[#675d51]">
                  Bridge gives developers, conveyancers, agents, and buyers one live
                  workspace to run the full transaction without spreadsheets, status
                  chasing, or fragmented handoffs.
                </p>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <a href="#contact" className="bridge-button-primary">
                    Book a Demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#product" className="bridge-button-secondary">
                    Explore the Platform
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {heroProof.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-[#e4d8cb] bg-white/72 px-3 py-2 text-[11px] font-medium tracking-[0.02em] text-[#6a5f53]"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <motion.div
                  {...reveal}
                  transition={{ ...reveal.transition, delay: 0.1 }}
                  className="mt-7 grid max-w-[560px] gap-4 sm:grid-cols-2"
                >
                  {heroMetrics.map((item) => (
                    <div key={item.label} className="bridge-glass rounded-[24px] p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8c7861]">
                        {item.label}
                      </p>
                      <p className="mt-3 text-[1.55rem] font-semibold tracking-[-0.05em] text-[#171412]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#6f6457]">{item.copy}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <div className="self-end lg:pl-6">
                <HeroMockup />
              </div>
            </div>
          </div>
        </section>

        <motion.section
          {...reveal}
          id="solutions"
          className={sectionSoftShell}
        >
          <div className={sectionContainer}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="The problem"
                title="Property transactions still run through inboxes, spreadsheets, and disconnected handoffs."
                description="The work is happening, but the record is fragmented. Teams spend time reconstructing status instead of moving the deal forward."
              />

              <div className="grid max-w-[360px] grid-cols-3 gap-3">
                {[
                  ['4+', 'handoffs per deal'],
                  ['0', 'shared live record'],
                  ['24/7', 'status chasing'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[22px] border border-[#eadfce] bg-white/82 px-4 py-5 text-center shadow-[0_10px_24px_rgba(19,17,15,0.03)]"
                  >
                    <p className="text-[1.35rem] font-semibold tracking-[-0.05em] text-[#171412]">{value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#8c7761]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
              {problemCards.map((card) => {
                const Icon = card.icon

                return (
                  <div
                    key={card.title}
                    className={`h-full rounded-[28px] border shadow-[0_12px_28px_rgba(19,17,15,0.05)] transition hover:-translate-y-0.5 ${
                      card.featured
                        ? 'border-[#d8c8b7] bg-[linear-gradient(180deg,#fff9f2_0%,#fffdf9_100%)] p-8 lg:row-span-2'
                        : 'border-[#ece2d8] bg-white/90 p-6'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ebe0d4] bg-[#faf5ef] text-[#6f5a45]">
                        <Icon className="h-5 w-5" />
                      </div>
                      {card.featured ? (
                        <span className="rounded-full border border-[#ddcebd] bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8c7861]">
                          Friction point
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-[#171412]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#6f6457]">{card.copy}</p>
                    <p className="mt-5 text-sm font-medium text-[#4f4234]">{card.impact}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {card.support.map((item) => (
                        <span
                          key={item}
                          className={`rounded-full border px-3 py-1.5 text-xs ${
                            card.featured
                              ? 'border-[#e2d3c4] bg-[#fffdf9] text-[#5e5144]'
                              : 'border-[#eadfce] bg-[#fcfaf7] text-[#5f5347]'
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    {card.featured ? (
                      <div className="mt-7 grid gap-3">
                        {[
                          ['Buyers want a next step', 'Not another status email'],
                          ['Leadership wants visibility', 'Not another spreadsheet export'],
                        ].map(([title, body]) => (
                          <div
                            key={title}
                            className="rounded-[22px] border border-[#e7d9ca] bg-white/82 px-4 py-4"
                          >
                            <p className="text-sm font-semibold text-[#171412]">{title}</p>
                            <p className="mt-1 text-sm leading-6 text-[#6f6457]">{body}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} id="product" className={sectionShell}>
          <div className={sectionContainer}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="The platform"
                title="One operating layer for the people moving the deal forward."
                description="Bridge brings the core stakeholders into one structured system so progress is visible, responsibilities are clear, and the process keeps moving."
              />

              <div className="max-w-[320px] rounded-[24px] border border-[#e7ddcf] bg-white/82 p-5 shadow-[0_10px_24px_rgba(19,17,15,0.03)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7861]">
                  What changes
                </p>
                <p className="mt-3 text-sm leading-7 text-[#5f5449]">
                  The transaction stops living in three places. Teams work from one current state, one workflow, and one reporting layer.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
              {benefitCards.filter((card) => card.featured).map((card) => {
                const Icon = card.icon

                return (
                  <div
                    key={card.title}
                    className="rounded-[32px] border border-[#d7c6b0] bg-[linear-gradient(180deg,#fff8f0_0%,#ffffff_100%)] p-7 shadow-[0_14px_32px_rgba(19,17,15,0.05)] transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e6dbcf] bg-[#faf5ef] text-[#6f5a45]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-[#e4d7ca] bg-[#fbf7f2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7861]">
                        {card.label}
                      </span>
                    </div>

                    <h3 className="mt-6 text-[1.45rem] font-semibold tracking-[-0.045em] text-[#171412]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#6f6457]">{card.copy}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {card.support.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#eadfce] bg-[#fcfaf7] px-3 py-1.5 text-xs text-[#5f5347]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {[
                        ['Stage', 'Bond in process', '68% complete'],
                        ['Owner', 'Buyer documents', 'Next required input'],
                      ].map(([label, title, body]) => (
                        <div
                          key={label}
                          className="rounded-[22px] border border-[#eadfce] bg-white/88 p-4"
                        >
                          <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f7c67]">{label}</p>
                          <p className="mt-3 text-base font-semibold text-[#171412]">{title}</p>
                          <p className="mt-1 text-sm text-[#6f6457]">{body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {benefitCards
                  .filter((card) => !card.featured)
                  .map((card) => {
                    const Icon = card.icon

                    return (
                      <div
                        key={card.title}
                        className="h-full rounded-[28px] border border-[#ece2d8] bg-white/92 p-6 shadow-[0_14px_32px_rgba(19,17,15,0.05)] transition hover:-translate-y-0.5"
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e6dbcf] bg-[#faf5ef] text-[#6f5a45]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="rounded-full border border-[#e4d7ca] bg-[#fbf7f2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7861]">
                            {card.label}
                          </span>
                        </div>

                        <h3 className="mt-6 text-[1.35rem] font-semibold tracking-[-0.045em] text-[#171412]">
                          {card.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[#6f6457]">{card.copy}</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {card.support.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-[#eadfce] bg-[#fcfaf7] px-3 py-1.5 text-xs text-[#5f5347]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-[34px] border border-[#e9dfd5] bg-[linear-gradient(180deg,#ffffff_0%,#faf6f0_100%)] p-7 shadow-[0_16px_40px_rgba(19,17,15,0.06)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8f7c67]">
                      Workspace snapshot
                    </p>
                    <h3 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#171412]">
                      Workflow, documents, and ownership stay attached to the same deal.
                    </h3>
                  </div>
                  <div className="hidden md:block md:min-w-[210px]">
                    <ProductMetricGrid items={reportingMetrics.slice(0, 2)} columns={2} compact />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
                  {productCards.slice(0, 2).map((card) => (
                    <div key={card.title} className="h-full rounded-[24px] border border-[#ede3d8] bg-white/90 p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8f7b64]">
                        {card.label}
                      </p>
                      <h4 className="mt-4 text-[1.2rem] font-semibold tracking-[-0.04em] text-[#171412]">
                        {card.title}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-[#6f6457]">{card.copy}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[24px] border border-[#ede3d8] bg-white/88 p-5">
                  <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8f7b64]">
                        Deal flow
                      </p>
                      <div className="mt-4">
                        <ProductProgressBars items={workspaceFlowBars} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[22px] border border-[#ede3d8] bg-[#fcfaf7] p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8f7b64]">
                          Live signals
                        </p>
                        <div className="mt-4">
                          <ProductSignalRows items={workspaceSignals} />
                        </div>
                      </div>

                      <ProductActivityFeed items={workspaceActivity} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[34px] border border-[#1d1a17] bg-[linear-gradient(180deg,#161311_0%,#1d1a17_100%)] p-7 text-white shadow-[0_20px_54px_rgba(19,17,15,0.16)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b3a595]">
                  Reporting layer
                </p>
                <h3 className="mt-4 text-[1.75rem] font-semibold tracking-[-0.05em] text-[#faf6f0]">
                  Turn transaction activity into leadership-ready oversight.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#c9c0b5]">
                  Bridge turns day-to-day transaction movement into reporting leadership can actually use.
                </p>

                <div className="mt-7">
                  <ProductMetricGrid items={reportingMetrics} dark columns={3} />
                </div>

                <div className="mt-6">
                  <ProductActivityFeed items={reportingActivity} dark />
                </div>

                <div className="mt-6 space-y-3">
                  {productCards.slice(2).map((card) => (
                    <div key={card.title} className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#a59685]">
                        {card.label}
                      </p>
                      <p className="mt-2 text-base font-medium text-[#faf6f0]">{card.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#c7beb4]">{card.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          {...reveal}
          id="how-it-works"
          className={sectionSoftShell}
        >
          <div className={sectionContainer}>
            <SectionHeading
              eyebrow="How it works"
              title="Run the transaction through the real property lifecycle."
              description="Bridge mirrors the real stages of the deal so every role can see what is done, what is blocked, and what should happen next."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="h-full rounded-[28px] border border-[#ece2d8] bg-white/90 p-6 shadow-[0_14px_32px_rgba(19,17,15,0.05)]"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8f7b64]">
                    {step.number}
                  </div>
                  <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.04em] text-[#171412]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#6f6457]">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <StickyRoleModulesSection />

        <motion.section
          {...reveal}
          id="command-layer"
          className={sectionShell}
        >
          <div className={darkSectionContainer}>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b3a595]">
                  Executive oversight
                </p>
                <h2 className="mt-5 text-[2.3rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#faf6f0] sm:text-[2.9rem]">
                  Operational visibility without spreadsheet rebuilds.
                </h2>
                <p className="mt-5 max-w-[520px] text-[1rem] leading-8 text-[#c9c0b5]">
                  Bridge gives leadership a live command layer for active matters, pressure points, and readiness across the wider transaction book.
                </p>

                <div className="mt-8">
                  <ProductMetricGrid items={commandMetrics} dark columns={3} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[30px] border border-white/8 bg-white/[0.04] p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#a59685]">Command centre</p>
                  <h3 className="mt-4 text-[1.45rem] font-semibold tracking-[-0.04em] text-[#faf6f0]">
                    One command surface for the whole transaction book.
                  </h3>
                  <div className="mt-6">
                    <ProductSignalRows items={commandSurfaceRows} dark />
                  </div>

                  <div className="mt-4">
                    <ProductActivityFeed items={reportingActivity} dark />
                  </div>
                </div>

                <div className="grid gap-4">
                  {darkModules.map((module) => {
                    const Icon = module.icon

                    return (
                      <div
                        key={module.title}
                        className="rounded-[28px] border border-white/8 bg-white/[0.04] p-6"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#eadcc7]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.04em] text-[#faf6f0]">
                          {module.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[#c9c0b5]">
                          {module.copy}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <TrustSection />
        <FinalCTASection onLaunchApp={openLogin} onSignUp={openSignup} />
      </main>

      <Footer />
      {authOpen ? (
        <AuthModal
          key={`${authMode}-${authVersion}`}
          initialMode={authMode}
          onClose={() => setAuthOpen(false)}
        />
      ) : null}
    </div>
  )
}
