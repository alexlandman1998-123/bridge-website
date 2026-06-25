import { useEffect } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  Landmark,
  LayoutDashboard,
  Link2,
  MapPinned,
  Play,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp } from '../components/motion/Reveal'

const stakeholders = [
  { label: 'Buyer', className: 'left-[7%] top-[16%]' },
  { label: 'Seller', className: 'right-[6%] top-[17%]' },
  { label: 'Agent', className: 'left-[3%] top-[48%]' },
  { label: 'Attorney', className: 'right-[2%] top-[48%]' },
  { label: 'Bond Originator', className: 'left-[10%] bottom-[14%]' },
  { label: 'Developer', className: 'right-[9%] bottom-[14%]' },
  { label: 'Municipality', className: 'left-1/2 top-[4%] -translate-x-1/2' },
  { label: 'Bank', className: 'left-1/2 bottom-[4%] -translate-x-1/2' },
  { label: 'Registration', className: 'left-1/2 top-[69%] -translate-x-1/2' },
]

const statusCards = [
  { label: 'OTP Signed', className: 'left-5 top-[36%]' },
  { label: 'Instruction Received', className: 'right-5 top-[35%]' },
  { label: 'Application Started', className: 'left-[15%] bottom-[27%]' },
  { label: 'Approved', className: 'right-[16%] bottom-[27%]' },
  { label: 'Registered', className: 'left-1/2 bottom-[18%] -translate-x-1/2' },
]

const trustLogos = ['Kingstons', 'Tyson Attorneys', 'Ooba', 'Meridian Realty', 'Blue Bond Originators']

const metrics = [
  { value: '120,000+', label: 'Properties Listed' },
  { value: '15,000+', label: 'Active Transactions' },
  { value: '5,000+', label: 'Property Professionals' },
  { value: 'R8.4B+', label: 'Transaction Value' },
]

const oldWayItems = [
  'Agent CRM',
  'Attorney software',
  'Bond originator CRM',
  'WhatsApp',
  'Email',
  'Phone calls',
  'Dropbox',
  'Clients asking "Any updates?"',
]

const arch9WayItems = [
  'One shared transaction',
  'Shared timeline',
  'Live status updates',
  'Centralised documents',
  'Automated communication',
  'Everyone aligned',
  'From enquiry to registration',
]

const workflowSteps = [
  {
    title: 'Capture',
    copy: 'Create a transaction once.',
    icon: FileText,
    mock: ['Property', 'People', 'Milestones'],
  },
  {
    title: 'Connect',
    copy: 'Invite everyone automatically.',
    icon: Link2,
    mock: ['Buyer invited', 'Attorney assigned', 'Bank notified'],
  },
  {
    title: 'Complete',
    copy: 'Track progress through registration.',
    icon: ClipboardCheck,
    mock: ['Documents ready', 'Bond approved', 'Registered'],
  },
]

const workspaces = [
  {
    title: 'Agent',
    copy: 'Generate leads. Track prospects. Close deals faster.',
    icon: Users,
  },
  {
    title: 'Attorney',
    copy: 'Receive instructions. Manage matters. Generate documents.',
    icon: Scale,
  },
  {
    title: 'Bond Originator',
    copy: 'Manage applications. Track approvals. Collaborate seamlessly.',
    icon: Landmark,
  },
  {
    title: 'Developer',
    copy: 'Launch developments. Manage buyers. Track sales pipeline.',
    icon: Building2,
  },
  {
    title: 'Buyer & Seller',
    copy: 'Branded client portal. Upload documents. Track progress.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Municipality & Other Stakeholders',
    copy: 'Receive requests. Review documents. Issue certificates.',
    icon: MapPinned,
  },
]

const timelineRoles = ['Buyer', 'Seller', 'Agent', 'Attorney', 'Bond Originator', 'Developer', 'Municipality', 'Bank', 'Registration']

const timelineEvents = [
  '09:12 OTP Signed',
  '09:13 Instruction Received',
  '09:18 Application Started',
  '11:02 Approved',
  '15:42 Registered',
]

const switchReasons = [
  {
    title: '30% Faster Registration',
    copy: 'Reduce delays and close more deals.',
    icon: Clock3,
  },
  {
    title: 'One Shared Timeline',
    copy: 'Everyone sees the same progress.',
    icon: Workflow,
  },
  {
    title: 'Automatic Document Collection',
    copy: 'No more chasing. Ever.',
    icon: FileCheck2,
  },
  {
    title: 'Role-based Workspaces',
    copy: 'Different work. Same transaction.',
    icon: LayoutDashboard,
  },
  {
    title: 'Branded Client Portals',
    copy: 'Modern experience for your clients.',
    icon: ShieldCheck,
  },
  {
    title: 'No CRM Replacement',
    copy: 'Works alongside your existing systems.',
    icon: Sparkles,
  },
]

function SectionIntro({ eyebrow, title, copy, center = false, light = false }) {
  return (
    <div className={center ? 'mx-auto max-w-[780px] text-center' : 'max-w-[760px]'}>
      {eyebrow ? (
        <p className={`text-xs font-black uppercase tracking-[0.22em] ${light ? 'text-[#86E4C2]' : 'text-[#0E6A55]'}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-4 text-[2.25rem] font-extrabold leading-[1] tracking-[-0.045em] md:text-[3.8rem] ${light ? 'text-white' : 'text-[#071E1A]'}`}>
        {title}
      </h2>
      {copy ? (
        <p className={`mt-5 text-base font-medium leading-8 md:text-lg ${light ? 'text-white/70' : 'text-[#5B6B64]'}`}>
          {copy}
        </p>
      ) : null}
    </div>
  )
}

function HeroNetworkGraphic() {
  return (
    <div className="relative mx-auto min-h-[430px] w-full max-w-[640px] overflow-hidden rounded-[32px] border border-[#0A3028]/10 bg-white/82 p-4 shadow-[0_28px_90px_rgba(6,45,37,0.14)] backdrop-blur-xl md:min-h-[580px] md:rounded-[42px] md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(134,228,194,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(246,248,244,0.9))]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 580" aria-hidden="true">
        <g stroke="rgba(6,69,55,0.16)" strokeWidth="1.2">
          <line x1="320" y1="290" x2="94" y2="102" />
          <line x1="320" y1="290" x2="546" y2="102" />
          <line x1="320" y1="290" x2="72" y2="286" />
          <line x1="320" y1="290" x2="568" y2="286" />
          <line x1="320" y1="290" x2="118" y2="482" />
          <line x1="320" y1="290" x2="522" y2="482" />
          <line x1="320" y1="290" x2="320" y2="58" />
          <line x1="320" y1="290" x2="320" y2="526" />
        </g>
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[30px] border border-[#064537]/12 bg-[#064537] text-center text-white shadow-[0_24px_70px_rgba(6,69,55,0.25)] md:h-36 md:w-36 md:rounded-[36px]">
        <span className="text-[0.72rem] font-black uppercase tracking-[0.22em] text-[#86E4C2]">Arch9</span>
        <span className="mt-2 text-sm font-extrabold leading-tight md:text-base">Shared Transaction</span>
      </div>

      {stakeholders.map((item) => (
        <div
          key={item.label}
          className={`absolute z-10 hidden rounded-full border border-[#064537]/10 bg-white/88 px-3 py-2 text-center text-[11px] font-extrabold text-[#083C32] shadow-[0_12px_34px_rgba(6,45,37,0.08)] backdrop-blur md:block ${item.className}`}
        >
          {item.label}
        </div>
      ))}

      {['Buyer', 'Agent', 'Attorney', 'Bank', 'Registration'].map((label, index) => (
        <div
          key={label}
          className="absolute z-10 rounded-full border border-[#064537]/10 bg-white/90 px-3 py-2 text-[11px] font-extrabold text-[#083C32] shadow-[0_12px_34px_rgba(6,45,37,0.08)] backdrop-blur md:hidden"
          style={{
            left: `${[10, 8, 62, 66, 30][index]}%`,
            top: `${[12, 64, 14, 64, 82][index]}%`,
          }}
        >
          {label}
        </div>
      ))}

      {statusCards.map((item) => (
        <div
          key={item.label}
          className={`absolute z-20 hidden items-center gap-2 rounded-[18px] border border-[#064537]/10 bg-white/92 px-3 py-2 text-xs font-extrabold text-[#071E1A] shadow-[0_16px_42px_rgba(6,45,37,0.1)] backdrop-blur md:flex ${item.className}`}
        >
          <CheckCircle2 className="h-4 w-4 text-[#0E6A55]" />
          {item.label}
        </div>
      ))}

      <div className="absolute bottom-5 left-5 right-5 z-20 grid gap-2 md:hidden">
        {['OTP Signed', 'Instruction Received', 'Approved'].map((label) => (
          <div key={label} className="flex items-center gap-2 rounded-[16px] border border-[#064537]/10 bg-white/92 px-3 py-2 text-xs font-extrabold text-[#071E1A] shadow-[0_12px_34px_rgba(6,45,37,0.08)]">
            <CheckCircle2 className="h-4 w-4 text-[#0E6A55]" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

function TrustStrip() {
  return (
    <section className="bg-[#FAF8F3] px-5 py-10 md:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <p className="text-center text-xs font-black uppercase tracking-[0.24em] text-[#66736E]">Trusted by property professionals</p>
        <div className="mt-6 flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {trustLogos.map((logo) => (
            <div
              key={logo}
              className="flex min-h-16 min-w-[170px] snap-start items-center justify-center rounded-[18px] border border-[#0A3028]/8 bg-white/70 px-5 text-center text-sm font-extrabold text-[#6D7974] shadow-[0_14px_38px_rgba(7,30,26,0.04)]"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricsBar() {
  return (
    <section className="bg-[#FAF8F3] px-5 py-6 md:px-8 md:py-10">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-4 rounded-[30px] bg-[#064537] p-5 text-white shadow-[0_26px_90px_rgba(6,69,55,0.2)] md:grid-cols-4 md:p-8">
        {metrics.map((metric, index) => (
          <div key={metric.label} className={`min-w-0 ${index > 1 ? 'border-t border-white/10 pt-4 md:border-t-0 md:pt-0' : ''} ${index ? 'md:border-l md:border-white/10 md:pl-8' : ''}`}>
            <p className="text-[1.75rem] font-extrabold leading-none tracking-[-0.04em] md:text-[2.7rem]">{metric.value}</p>
            <p className="mt-3 text-sm font-bold leading-5 text-white/72">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProblemVisual({ calm = false }) {
  const items = calm ? ['Transaction', 'Timeline', 'Documents', 'Updates', 'Registration'] : ['CRM', 'Email', 'WhatsApp', 'Calls', 'Files', 'Clients']
  return (
    <div className={`mt-7 grid gap-3 ${calm ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {items.map((item, index) => (
        <div
          key={item}
          className={`flex min-h-12 items-center gap-3 rounded-[16px] border px-4 text-sm font-extrabold ${
            calm
              ? 'border-[#064537]/10 bg-[#EAF7F0] text-[#064537]'
              : 'border-[#E5DDD1] bg-white text-[#6A5F52]'
          }`}
          style={calm ? undefined : { transform: `translateY(${index % 2 ? 8 : 0}px)` }}
        >
          {calm ? <CheckCircle2 className="h-4 w-4 text-[#0E6A55]" /> : <CircleDot className="h-4 w-4 text-[#A87945]" />}
          {item}
        </div>
      ))}
    </div>
  )
}

function ProblemSection() {
  return (
    <section className="bg-[#FAF8F3] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionIntro title="The problem with property transactions" center />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <article className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_22px_70px_rgba(7,30,26,0.06)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9B7250]">The old way</p>
            <h3 className="mt-4 text-[2.1rem] font-extrabold leading-none tracking-[-0.045em] text-[#251F19]">
              Disconnected.
              <span className="block">Slow.</span>
              <span className="block">Frustrating.</span>
            </h3>
            <ul className="mt-7 grid gap-3">
              {oldWayItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#6A5F52]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A87945]" />
                  {item}
                </li>
              ))}
            </ul>
            <ProblemVisual />
          </article>

          <div className="flex items-center justify-center text-[#0E6A55] lg:px-2">
            <div className="flex h-12 w-12 rotate-90 items-center justify-center rounded-full bg-[#EAF7F0] shadow-[0_14px_34px_rgba(6,69,55,0.08)] lg:rotate-0">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          <article className="rounded-[28px] border border-[#064537]/12 bg-white p-6 shadow-[0_26px_80px_rgba(6,69,55,0.1)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">The Arch9 way</p>
            <h3 className="mt-4 text-[2.1rem] font-extrabold leading-none tracking-[-0.045em] text-[#064537]">
              Connected.
              <span className="block">Transparent.</span>
              <span className="block">Efficient.</span>
            </h3>
            <ul className="mt-7 grid gap-3">
              {arch9WayItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#3F5A52]">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0E6A55]" />
                  {item}
                </li>
              ))}
            </ul>
            <ProblemVisual calm />
          </article>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionIntro title="How Arch9 works" center />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <article key={step.title} className="rounded-[28px] border border-[#0A3028]/8 bg-[#FCFBF7] p-6 shadow-[0_20px_60px_rgba(7,30,26,0.05)] md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#064537] text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <Icon className="h-6 w-6 text-[#0E6A55]" />
                </div>
                <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{step.title}</h3>
                <p className="mt-2 text-base font-semibold leading-7 text-[#5B6B64]">{step.copy}</p>
                <div className="mt-7 grid gap-2 rounded-[20px] border border-[#0A3028]/8 bg-white p-3">
                  {step.mock.map((item) => (
                    <div key={item} className="flex min-h-10 items-center justify-between rounded-[13px] bg-[#F4F7F2] px-3 text-xs font-extrabold text-[#3F5A52]">
                      {item}
                      <CheckCircle2 className="h-4 w-4 text-[#0E6A55]" />
                    </div>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function WorkspacesSection() {
  return (
    <section className="bg-[#FAF8F3] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionIntro
          title="One platform. Different workspaces."
          copy="Purpose-built workspaces for every role in the property journey."
          center
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workspaces.map((workspace) => {
            const Icon = workspace.icon
            return (
              <article key={workspace.title} className="rounded-[26px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_22px_70px_rgba(7,30,26,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(7,30,26,0.08)] md:p-7">
                <div className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-[#EAF7F0] text-[#064537]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{workspace.title}</h3>
                <p className="mt-3 text-base font-medium leading-7 text-[#5B6B64]">{workspace.copy}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SharedTransactionBand() {
  return (
    <section className="bg-[#FAF8F3] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-[34px] bg-[#064537] p-6 text-white shadow-[0_30px_100px_rgba(6,69,55,0.24)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div>
            <SectionIntro
              eyebrow="Live transaction"
              title="The shared transaction in action"
              copy="Every stakeholder. Every update. One source of truth."
              light
            />
            <a href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F3EEE6] px-6 text-sm font-extrabold text-[#064537] transition hover:-translate-y-0.5">
              See it in action
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div>
            <div className="hidden rounded-[28px] border border-white/10 bg-white/[0.08] p-5 lg:block">
              <div className="grid grid-cols-9 items-center gap-2">
                {timelineRoles.map((role, index) => (
                  <div key={role} className="relative min-w-0 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#064537]">
                      {index === timelineRoles.length - 1 ? <BadgeCheck className="h-4 w-4" /> : <CircleDot className="h-4 w-4" />}
                    </div>
                    <p className="mt-3 truncate text-[10px] font-extrabold uppercase tracking-[0.08em] text-white/70">{role}</p>
                    {index < timelineRoles.length - 1 ? <div className="absolute left-[calc(50%+22px)] top-5 h-px w-[calc(100%-18px)] bg-white/20" /> : null}
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-5 gap-3">
                {timelineEvents.map((event) => (
                  <div key={event} className="rounded-[18px] border border-white/10 bg-white/[0.08] p-3 text-xs font-extrabold text-white">
                    {event}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 lg:hidden">
              {timelineEvents.map((event, index) => (
                <div key={event} className="grid grid-cols-[40px_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#064537]">
                      {index + 1}
                    </span>
                    {index < timelineEvents.length - 1 ? <span className="h-8 w-px bg-white/20" /> : null}
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-white/[0.08] p-4 text-sm font-extrabold text-white">
                    {event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhySwitchSection() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionIntro title="Why property professionals switch to Arch9" center />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {switchReasons.map((reason) => {
            const Icon = reason.icon
            return (
              <article key={reason.title} className="rounded-[24px] border border-[#0A3028]/8 bg-[#FCFBF7] p-5 shadow-[0_18px_54px_rgba(7,30,26,0.045)] md:p-6">
                <Icon className="h-6 w-6 text-[#0E6A55]" />
                <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#071E1A]">{reason.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-[#5B6B64]">{reason.copy}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#FAF8F3] px-5 pb-16 pt-6 md:px-8 md:pb-24">
      <div className="mx-auto w-full max-w-[1280px] rounded-[34px] bg-[#064537] p-7 text-white shadow-[0_30px_100px_rgba(6,69,55,0.22)] md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#86E4C2]">One transaction. Every stakeholder.</p>
        <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[760px] text-[2.45rem] font-extrabold leading-none tracking-[-0.05em] md:text-[4.4rem]">
            Ready to modernise property?
          </h2>
          <a href="/contact" className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#F3EEE6] px-7 text-sm font-extrabold text-[#064537] transition hover:-translate-y-0.5 sm:w-fit">
            Book a Demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function MarketingHome() {
  useEffect(() => {
    document.title = 'Arch9 | Shared Transaction Workspace for Property'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Arch9 is the shared transaction workspace connecting buyers, sellers, agents, attorneys, bond originators and developers from first enquiry to registration.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#071E1A]">
      <Header />

      <main>
        <section className="relative overflow-hidden px-5 pb-16 pt-[112px] md:px-8 md:pb-24 md:pt-[150px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(134,228,194,0.22),transparent_28%),radial-gradient(circle_at_18%_28%,rgba(6,69,55,0.08),transparent_30%)]" />
          <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <FadeUp className="max-w-[760px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">The shared transaction workspace</p>
              <h1 className="mt-5 text-[3.25rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-[#071E1A] sm:text-[4.2rem] md:text-[5.6rem]">
                One transaction.
                <span className="block">Every stakeholder.</span>
                <span className="block">Finally connected.</span>
              </h1>
              <p className="mt-6 max-w-[680px] text-[1.08rem] font-medium leading-8 text-[#4F625B] md:text-[1.25rem] md:leading-9">
                Arch9 is the shared transaction workspace connecting buyers, sellers, agents, attorneys, bond originators and developers - from first enquiry to registration.
              </p>
              <div className="mt-8 grid gap-3 sm:flex">
                <a href="/contact" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#064537] px-7 text-sm font-extrabold text-white shadow-[0_18px_44px_rgba(6,69,55,0.2)] transition hover:-translate-y-0.5">
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/platform" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#0A3028]/12 bg-white px-7 text-sm font-extrabold text-[#071E1A] shadow-[0_16px_38px_rgba(7,30,26,0.06)] transition hover:-translate-y-0.5">
                  <Play className="h-4 w-4" />
                  Watch 60 sec overview
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <HeroNetworkGraphic />
            </FadeUp>
          </div>
        </section>

        <TrustStrip />
        <MetricsBar />
        <ProblemSection />
        <HowItWorksSection />
        <WorkspacesSection />
        <SharedTransactionBand />
        <WhySwitchSection />
        <FinalCta />
      </main>

      <Footer />
    </div>
  )
}

export default MarketingHome
