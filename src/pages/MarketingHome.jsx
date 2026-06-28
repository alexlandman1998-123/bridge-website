import { useEffect } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDot,
  Clock3,
  FileCheck2,
  Home,
  Landmark,
  LayoutDashboard,
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

const metrics = [
  { value: '120,000+', label: 'Properties Listed', icon: Home },
  { value: '15,000+', label: 'Active Transactions', icon: CheckCircle2 },
  { value: '5,000+', label: 'Property Professionals', icon: Users },
  { value: 'R8.4B+', label: 'Transaction Value', icon: Scale },
]

const timelineRoles = [
  { label: 'Buyer', icon: Users },
  { label: 'Seller', icon: Users },
  { label: 'Agent', icon: BadgeCheck },
  { label: 'Attorney', icon: Scale },
  { label: 'Bond Originator', icon: Users },
  { label: 'Developer', icon: Building2 },
  { label: 'Municipality', icon: MapPinned },
  { label: 'Bank', icon: Landmark },
  { label: 'Registration', icon: Landmark },
]

const timelineEvents = [
  { time: '09:12', label: 'OTP Signed', span: 'col-start-1' },
  { time: '09:13', label: 'Instruction Received', span: 'col-start-2' },
  { time: '09:18', label: 'Application Started', span: 'col-start-4' },
  { time: '11:02', label: 'Approved', span: 'col-start-5' },
  { time: '15:42', label: 'Registered', span: 'col-start-9' },
]

const heroTrustLogos = ['Harcourts', 'RE/MAX', 'Ooba', 'Lew Geffen', "Sotheby's"]

const workspaces = [
  {
    title: 'Agent',
    copy: 'Generate leads. Track prospects. Close deals faster.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=760&q=80',
  },
  {
    title: 'Attorney',
    copy: 'Receive instructions. Manage matters. Generate documents.',
    icon: Scale,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=760&q=80',
  },
  {
    title: 'Bond Originator',
    copy: 'Manage applications. Track approvals. Collaborate seamlessly.',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=760&q=80',
  },
  {
    title: 'Developer',
    copy: 'Launch developments. Manage buyers. Track sales pipeline.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=760&q=80',
  },
  {
    title: 'Buyer & Seller',
    copy: 'Branded client portal. Upload documents. Track progress.',
    icon: BriefcaseBusiness,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=760&q=80',
  },
  {
    title: 'Municipality & Other',
    copy: 'Receive requests. Review documents. Issue certificates.',
    icon: MapPinned,
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=760&q=80',
  },
]

const benefitItems = [
  { title: '30% Faster Registration', copy: 'Reduce delays and close more deals.', icon: Clock3 },
  { title: 'One Shared Timeline', copy: 'Everyone sees the same progress.', icon: Workflow },
  { title: 'Automatic Document Collection', copy: 'No more chasing. Ever.', icon: FileCheck2 },
  { title: 'Role-based Workspaces', copy: 'Different work. Same transaction.', icon: LayoutDashboard },
  { title: 'Branded Client Portals', copy: 'Modern experience for your clients.', icon: ShieldCheck },
  { title: 'Works with existing CRM', copy: 'Fits alongside your systems.', icon: Sparkles },
]

function SectionIntro({ eyebrow, title, copy, center = false, light = false }) {
  return (
    <div className={center ? 'mx-auto max-w-[820px] text-center' : 'max-w-[760px]'}>
      {eyebrow ? (
        <p className={`text-xs font-black uppercase tracking-[0.24em] ${light ? 'text-[#86E4C2]' : 'text-[#0E6A55]'}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-4 text-[2.55rem] font-extrabold leading-[0.98] tracking-[-0.045em] md:text-[4.15rem] ${light ? 'text-white' : 'text-[#071E1A]'}`}>
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

function HeroProductCard() {
  const progressSteps = [
    { label: 'OTP Signed', time: '9:12', state: 'done' },
    { label: 'Buyer Onboarded', time: '10:18', state: 'done' },
    { label: 'Finance Approved', time: '11:02', state: 'done' },
    { label: 'Transfer in Progress', time: '', state: 'active' },
    { label: 'Registration', time: '', state: 'pending' },
  ]

  const stakeholders = [
    { label: 'Buyer', icon: Users },
    { label: 'Agent', icon: Users },
    { label: 'Attorney', icon: Scale },
    { label: 'Bank', icon: Landmark },
    { label: 'Bond Originator', icon: FileCheck2 },
    { label: 'Municipality', icon: Building2 },
  ]

  return (
    <div className="relative mx-auto w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[#0A3028]/10 bg-white/92 shadow-[0_34px_110px_rgba(6,45,37,0.14)] backdrop-blur-xl">
      <div className="grid min-h-[430px] grid-cols-[72px_1fr]">
        <aside className="bg-[linear-gradient(180deg,#101923,#061B18)] text-white">
          <div className="flex h-20 items-center justify-center text-2xl font-black tracking-[0.16em]">A</div>
          {[
            { icon: Home, active: true },
            { icon: Workflow },
            { icon: FileCheck2 },
            { icon: Users },
            { icon: Clock3 },
            { icon: LayoutDashboard },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className={`flex h-16 items-center justify-center ${item.active ? 'bg-[#006B4D]' : 'text-white/76'}`}>
                <Icon className="h-5 w-5" />
              </div>
            )
          })}
        </aside>

        <div className="min-w-0">
          <header className="flex items-start justify-between gap-5 border-b border-[#0A3028]/8 px-8 py-7">
            <div>
              <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">14 Nicolson Street</h2>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#6B7B74]">
                <span className="h-2 w-2 rounded-full bg-[#0E8A69]" />
                Residential Sale
              </p>
            </div>
            <div className="flex items-center -space-x-2">
              {['#0E8A69', '#2F6E86', '#D19C81'].map((color) => (
                <span key={color} className="h-9 w-9 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color }} />
              ))}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#F0F2EF] text-xs font-extrabold text-[#52645D]">+3</span>
            </div>
          </header>

          <div className="px-8 py-12">
            <div className="relative grid grid-cols-5 gap-4">
              <div className="absolute left-[8%] right-[8%] top-5 h-px bg-[#D6DFDA]" />
              <div className="absolute left-[8%] top-5 h-px w-[60%] bg-[#0E6A55]" />
              {progressSteps.map((step) => (
                <div key={step.label} className="relative z-10 text-center">
                  <span
                    className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black shadow-sm ${
                      step.state === 'done'
                        ? 'border-[#0E6A55] bg-[#0E6A55] text-white'
                        : step.state === 'active'
                          ? 'border-[#0E6A55] bg-white text-[#0E6A55] ring-4 ring-[#E4F2EC]'
                          : 'border-[#D6DFDA] bg-white text-[#B8C2BD]'
                    }`}
                  >
                    {step.state === 'pending' ? <span className="h-3 w-3 rounded-[4px] bg-current" /> : step.state === 'active' ? <span className="h-4 w-4 rounded-full bg-current" /> : <CheckCircle2 className="h-5 w-5" />}
                  </span>
                  <p className="mt-5 text-sm font-bold leading-5 text-[#071E1A]">{step.label}</p>
                  {step.time ? <p className="mt-2 text-xs font-semibold text-[#8A978F]">{step.time}</p> : null}
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-[16px] border border-[#0A3028]/10 bg-white/80 p-5">
              <p className="text-sm font-medium text-[#52645D]">Everyone sees the same progress. In real time.</p>
              <div className="mt-5 grid grid-cols-3 gap-3 xl:grid-cols-6">
                {stakeholders.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-2 text-xs font-extrabold text-[#071E1A]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF7F0] text-[#064537]">
                        <Icon className="h-4 w-4" />
                      </span>
                      {item.label}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricsBar() {
  return (
    <section className="bg-[#FAF8F3] px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-4 rounded-[18px] bg-[linear-gradient(135deg,#063F34,#031D18)] p-5 text-white shadow-[0_28px_90px_rgba(6,69,55,0.22)] sm:grid-cols-2 md:p-8 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={metric.label} className={`min-w-0 ${index ? 'lg:border-l lg:border-white/12 lg:pl-8' : ''}`}>
              <div className="flex items-center gap-4">
                <span className="flex h-13 w-13 items-center justify-center rounded-full bg-[#DDF7C8]/12 text-[#BFF5A7]">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[2rem] font-extrabold leading-none tracking-[-0.04em] md:text-[2.75rem]">{metric.value}</p>
                  <p className="mt-2 text-sm font-bold leading-5 text-white/72">{metric.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function LiveTransactionSection() {
  return (
    <section className="bg-[#061D19] px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
        <div>
          <SectionIntro
            eyebrow="Live transaction"
            title="Every update. One source of truth."
            copy="Track progress in real time. Every stakeholder sees the same timeline, documents, requests and approvals."
            light
          />
          <a
            href="/platform"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F3EEE6] px-6 text-sm font-extrabold text-[#064537] transition hover:-translate-y-0.5"
            style={{ color: '#064537' }}
          >
            See it in action
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.22)] lg:p-8">
          <div className="relative hidden grid-cols-9 items-start gap-3 lg:grid">
            <div className="absolute left-[5%] right-[5%] top-[25px] h-px bg-white/18" />
            {timelineRoles.map((role) => {
              const Icon = role.icon
              return (
                <div key={role.label} className="relative z-10 min-w-0 text-center">
                  <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-full border border-white/14 bg-white text-[#064537] shadow-[0_14px_36px_rgba(0,0,0,0.16)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 min-h-8 text-[9px] font-black uppercase leading-tight tracking-[0.08em] text-white/70">{role.label}</p>
                </div>
              )
            })}
            <div className="col-span-9 mt-8 grid grid-cols-9 gap-3">
              {timelineEvents.map((event) => (
                <div key={event.label} className={`${event.span} rounded-[12px] border border-white/10 bg-white/[0.08] p-3 text-xs font-extrabold text-white`}>
                  <span className="block text-white/55">{event.time}</span>
                  <span className="mt-1 block">{event.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 lg:hidden">
            {timelineEvents.map((event, index) => (
              <div key={event.label} className="grid grid-cols-[40px_1fr] gap-3">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#064537]">
                    {index + 1}
                  </span>
                  {index < timelineEvents.length - 1 ? <span className="h-8 w-px bg-white/20" /> : null}
                </div>
                <div className="rounded-[14px] border border-white/10 bg-white/[0.08] p-4 text-sm font-extrabold text-white">
                  <span className="text-white/55">{event.time}</span> {event.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkspacesSection() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid w-full max-w-[1500px] gap-8 lg:grid-cols-[minmax(360px,0.34fr)_minmax(0,0.66fr)] xl:gap-10">
        <div className="max-w-[500px] lg:sticky lg:top-32 lg:self-start">
          <SectionIntro
            eyebrow="One platform. Every role."
            title="Built for every stakeholder."
            copy="Purpose-built workspaces with the tools and visibility each role needs."
          />
        </div>
        <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 2xl:grid-cols-3">
          {workspaces.map((workspace) => {
            const Icon = workspace.icon
            return (
              <article key={workspace.title} className="group min-w-[82vw] max-w-[360px] snap-start overflow-hidden rounded-[14px] border border-[#0A3028]/8 bg-white shadow-[0_22px_70px_rgba(7,30,26,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_84px_rgba(7,30,26,0.1)] md:min-w-0 md:max-w-none">
                <div className="p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#EAF7F0] text-[#064537]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[1.45rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">{workspace.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{workspace.copy}</p>
                  <a href="/platform" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#0E6A55]">
                    Explore
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                </div>
                <img src={workspace.image} alt="" className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DashboardMockup() {
  const chartRows = [
    ['On track', '10', '60%', '#0E6A55'],
    ['Delayed', '4', '22%', '#3B82F6'],
    ['Needs action', '3', '18%', '#F97316'],
    ['Completed', '1', '14%', '#94A3B8'],
  ]

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#0A3028]/10 bg-white shadow-[0_30px_100px_rgba(7,30,26,0.12)]">
      <div className="flex items-center gap-2 border-b border-[#0A3028]/8 bg-[#F9FBF8] px-5 py-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#96D8C2]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#DDE8DF]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#DDE8DF]" />
      </div>
      <div className="grid min-h-[520px] lg:grid-cols-[220px_1fr]">
        <aside className="hidden border-r border-[#0A3028]/8 bg-[#F7FAF6] p-5 lg:block">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#064537]">Arch9</p>
          <nav className="mt-8 grid gap-2">
            {['Dashboard', 'Transactions', 'Tasks', 'Documents', 'Contacts', 'Reports', 'Calendar'].map((item, index) => (
              <div key={item} className={`flex min-h-11 items-center gap-3 rounded-[12px] px-3 text-sm font-extrabold ${index === 0 ? 'bg-[#064537] text-white' : 'text-[#52645D]'}`}>
                <CircleDot className="h-4 w-4" />
                {item}
              </div>
            ))}
          </nav>
        </aside>
        <div className="p-5 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">Dashboard</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">Overview of agency performance</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All branches', 'Last 30 days'].map((item) => (
                <span key={item} className="inline-flex min-h-10 items-center rounded-full border border-[#0A3028]/10 bg-white px-4 text-xs font-extrabold text-[#52645D]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ['Active Transactions', '20', '+100% vs previous 30 days'],
              ['Active Listings', '11', '+22% vs previous 30 days'],
              ['Pipeline Value', 'R62.2M', '+18% vs previous 30 days'],
              ['Commission Forecast', 'R0', '0% vs previous 30 days'],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-[14px] border border-[#0A3028]/8 bg-[#FCFBF7] p-4">
                <p className="text-xs font-extrabold text-[#5B6B64]">{label}</p>
                <p className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{value}</p>
                <p className="mt-2 text-[11px] font-bold text-[#0E6A55]">{note}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.38fr_0.62fr]">
            <div className="rounded-[14px] border border-[#0A3028]/8 bg-white p-5">
              <p className="text-sm font-extrabold text-[#071E1A]">Transaction Health</p>
              <div className="mt-5 flex items-center gap-5">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[conic-gradient(#0E6A55_0_58%,#3B82F6_58%_76%,#F97316_76%_90%,#E2E8F0_90%_100%)]">
                  <div className="flex h-17 w-17 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-2xl font-extrabold text-[#071E1A]">20</span>
                    <span className="text-[10px] font-bold text-[#6B7B74]">Total</span>
                  </div>
                </div>
                <div className="grid flex-1 gap-2">
                  {chartRows.map(([label, count, percent, color]) => (
                    <div key={label} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-xs font-bold text-[#52645D]">
                      <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />{label}</span>
                      <span>{count}</span>
                      <span>{percent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#0A3028]/8 bg-white p-5">
              <p className="text-sm font-extrabold text-[#071E1A]">Agency Performance</p>
              <div className="mt-7 grid gap-4">
                {[74, 62, 58, 68].map((width, index) => (
                  <div key={width} className="grid grid-cols-[48px_1fr_36px] items-center gap-3 text-xs font-bold text-[#6B7B74]">
                    <span>{['09%', '22%', '18%', '14%'][index]}</span>
                    <span className="h-2 overflow-hidden rounded-full bg-[#EEF3EF]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${width}%`,
                          backgroundColor: ['#0E6A55', '#3B82F6', '#22C55E', '#F97316'][index],
                        }}
                      />
                    </span>
                    <span>{width}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-5 gap-2">
                {['20 May', '2 Jun', '9 Jun', '16 Jun', '23 Jun'].map((date) => (
                  <span key={date} className="text-center text-[10px] font-bold text-[#97A39E]">{date}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductShowcaseSection() {
  return (
    <section className="bg-[#FAF8F3] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid w-full max-w-[1500px] gap-9 lg:grid-cols-[0.25fr_0.75fr] lg:items-center">
        <div>
          <SectionIntro
            eyebrow="All transactions. All in one place."
            title="See the big picture. Manage every detail."
            copy="Powerful dashboards, real-time updates and complete transaction visibility."
          />
          <ul className="mt-8 grid gap-3 text-sm font-bold text-[#52645D]">
            {['Real-time dashboards', 'Automated document collection', 'Smart notifications', 'Secure and compliant'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#0E6A55]" />
                {item}
              </li>
            ))}
          </ul>
          <a href="/platform" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#0E6A55]">
            Explore the platform
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <DashboardMockup />
      </div>
    </section>
  )
}

function BenefitsStrip() {
  return (
    <section className="bg-[#061D19] px-5 py-10 text-white md:px-8">
      <div className="mx-auto grid w-full max-w-[1500px] gap-5 lg:grid-cols-[0.18fr_0.82fr] lg:items-center">
        <p className="text-[0.68rem] font-black uppercase leading-5 tracking-[0.28em] text-[#86E4C2]">
          Why property professionals switch to Arch9
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {benefitItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.title} className={`${index ? 'lg:border-l lg:border-white/12 lg:pl-5' : ''}`}>
                <Icon className="h-6 w-6 text-[#86E4C2]" />
                <h3 className="mt-4 text-base font-extrabold leading-tight tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-2 text-xs font-medium leading-5 text-white/62">{item.copy}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#FAF8F3] px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1500px] overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#063F34,#031D18)] text-white shadow-[0_30px_100px_rgba(6,69,55,0.22)] lg:grid-cols-[0.58fr_0.42fr]">
        <div className="p-7 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#86E4C2]">One transaction. Every stakeholder.</p>
          <h2 className="mt-5 max-w-[680px] text-[2.45rem] font-extrabold leading-none tracking-[-0.05em] md:text-[4.2rem]">
            Ready to modernise property?
          </h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="max-w-[420px] text-base font-medium leading-7 text-white/70">
              Join thousands of professionals already using Arch9.
            </p>
            <a
              href="/book-demo"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#F3EEE6] px-7 text-sm font-extrabold text-[#064537] transition hover:-translate-y-0.5"
              style={{ color: '#064537' }}
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=82"
          alt=""
          className="min-h-[260px] w-full object-cover lg:h-full"
          loading="lazy"
        />
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
        <section className="relative overflow-hidden px-5 pb-12 pt-[112px] md:px-8 md:pb-16 md:pt-[124px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_30%,rgba(134,228,194,0.20),transparent_30%),radial-gradient(circle_at_22%_55%,rgba(6,69,55,0.06),transparent_34%),linear-gradient(180deg,#FFFFFF_0%,#FAF8F3_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 hidden h-56 bg-[repeating-radial-gradient(ellipse_at_center,rgba(6,69,55,0.055)_0,rgba(6,69,55,0.055)_1px,transparent_2px,transparent_18px)] opacity-45 lg:block" />
          <div className="relative mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[0.43fr_0.57fr] lg:items-center">
            <FadeUp className="max-w-[680px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">The shared transaction workspace</p>
              <h1 className="mt-5 text-[2.55rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-[#071E1A] sm:text-[3.05rem] md:text-[3.65rem] xl:text-[4.05rem]">
                One transaction.
                <span className="block">Every stakeholder.</span>
                <span className="block text-[#0E6A55]">Finally connected.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[1rem] font-medium leading-7 text-[#52645D] md:text-[1.12rem] md:leading-8">
                The only workspace that connects agents, attorneys, banks, buyers and sellers in one live timeline. Less chasing. More clarity. Faster registration.
              </p>
              <div className="mt-8 grid gap-3 sm:flex">
                <a
                  href="/book-demo"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#064537] px-7 text-sm font-extrabold text-white shadow-[0_18px_44px_rgba(6,69,55,0.2)] transition hover:-translate-y-0.5"
                  style={{ color: '#FFFFFF' }}
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/platform" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#0A3028]/12 bg-white px-7 text-sm font-extrabold text-[#071E1A] shadow-[0_16px_38px_rgba(7,30,26,0.06)] transition hover:-translate-y-0.5">
                  <Play className="h-4 w-4" />
                  Watch 60 sec overview
                </a>
              </div>
              <div className="mt-9 hidden md:block">
                <p className="text-sm font-medium text-[#6B7B74]">Trusted by leading agencies, attorneys and developers.</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-lg font-black text-[#8A9490]">
                  {heroTrustLogos.map((logo) => (
                    <span key={logo}>{logo}</span>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12} className="hidden lg:block">
              <HeroProductCard />
            </FadeUp>
          </div>
        </section>

        <MetricsBar />
        <LiveTransactionSection />
        <WorkspacesSection />
        <ProductShowcaseSection />
        <BenefitsStrip />
        <FinalCta />
      </main>

      <Footer />
    </div>
  )
}

export default MarketingHome
