import { useEffect } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
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

const orbitRoles = [
  { label: 'Buyer', icon: Users, className: 'left-1/2 top-[6%] -translate-x-1/2' },
  { label: 'Agent', icon: Users, className: 'right-[11%] top-[20%]' },
  { label: 'Attorney', icon: Scale, className: 'right-[6%] top-1/2 -translate-y-1/2' },
  { label: 'Bond Originator', icon: Landmark, className: 'right-[15%] bottom-[16%]' },
  { label: 'Bank', icon: Landmark, className: 'left-1/2 bottom-[6%] -translate-x-1/2' },
  { label: 'Registration', icon: BadgeCheck, className: 'left-[15%] bottom-[16%]' },
  { label: 'Developer', icon: Building2, className: 'left-[6%] top-1/2 -translate-y-1/2' },
  { label: 'Municipality', icon: MapPinned, className: 'left-[11%] top-[20%]' },
]

const orbitEvents = [
  { label: 'OTP Signed', time: '9:12', className: 'left-[7%] top-[34%]' },
  { label: 'Instruction Received', time: '9:13', className: 'right-[7%] top-[34%]' },
  { label: 'Application Started', time: '9:18', className: 'left-[18%] bottom-[25%]' },
  { label: 'Approved', time: '11:02', className: 'right-[20%] bottom-[25%]' },
  { label: 'Registered', time: '15:42', className: 'left-1/2 bottom-[17%] -translate-x-1/2' },
]

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

function HeroNetworkGraphic() {
  return (
    <div className="relative mx-auto aspect-[1.42/1] w-full max-w-[760px] overflow-hidden rounded-[30px] border border-[#0A3028]/10 bg-white/88 shadow-[0_34px_110px_rgba(6,45,37,0.14)] backdrop-blur-xl md:rounded-[42px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(134,228,194,0.19),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,251,247,0.94))]" />
      <svg className="absolute inset-[5%] h-[90%] w-[90%]" viewBox="0 0 760 520" aria-hidden="true">
        <circle cx="380" cy="260" r="98" fill="none" stroke="rgba(6,69,55,0.17)" strokeDasharray="4 7" strokeWidth="1.5" />
        <circle cx="380" cy="260" r="174" fill="none" stroke="rgba(6,69,55,0.13)" strokeWidth="1.2" />
        <g stroke="rgba(6,69,55,0.16)" strokeWidth="1.2">
          <line x1="380" y1="260" x2="380" y2="74" />
          <line x1="380" y1="260" x2="512" y2="128" />
          <line x1="380" y1="260" x2="566" y2="260" />
          <line x1="380" y1="260" x2="512" y2="392" />
          <line x1="380" y1="260" x2="380" y2="446" />
          <line x1="380" y1="260" x2="248" y2="392" />
          <line x1="380" y1="260" x2="194" y2="260" />
          <line x1="380" y1="260" x2="248" y2="128" />
        </g>
        <g fill="#0E6A55">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const radians = (angle * Math.PI) / 180
            return <circle key={angle} cx={380 + Math.sin(radians) * 98} cy={260 - Math.cos(radians) * 98} r="4" />
          })}
        </g>
      </svg>

      <div className="absolute left-1/2 top-1/2 z-20 flex h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_34%_24%,#2B6D5E,#064537_58%,#042A23)] text-center text-white shadow-[0_24px_70px_rgba(6,69,55,0.28)] md:h-[154px] md:w-[154px]">
        <span className="text-[0.78rem] font-black uppercase tracking-[0.3em] text-[#D5F8E9] md:text-[0.96rem]">Arch9</span>
        <span className="mt-2 text-[10px] font-extrabold uppercase leading-tight tracking-[0.12em] text-white/84 md:text-xs">
          Shared
          <span className="block">Transaction</span>
        </span>
      </div>

      {orbitRoles.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.label}
            className={`absolute z-20 flex flex-col items-center gap-2 text-center text-[10px] font-extrabold leading-tight text-[#073B32] md:text-xs ${item.className}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#064537]/10 bg-white text-[#064537] shadow-[0_14px_34px_rgba(6,45,37,0.08)] md:h-12 md:w-12">
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <span className="max-w-[88px]">{item.label}</span>
          </div>
        )
      })}

      {orbitEvents.map((item, index) => (
        <div
          key={item.label}
          className={`absolute z-30 hidden min-w-[126px] rounded-[14px] border border-[#064537]/8 bg-white/94 px-3 py-2 text-[11px] font-bold text-[#071E1A] shadow-[0_16px_38px_rgba(6,45,37,0.08)] backdrop-blur md:block ${item.className}`}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <span className="block text-[#0E6A55]">{item.label}</span>
          <span className="mt-0.5 block text-[10px] font-semibold text-[#6B7B74]">{item.time}</span>
        </div>
      ))}
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(134,228,194,0.24),transparent_28%),radial-gradient(circle_at_18%_28%,rgba(6,69,55,0.08),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#FAF8F3_100%)]" />
          <div className="relative mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
            <FadeUp className="max-w-[680px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">The shared transaction workspace</p>
              <h1 className="mt-5 text-[2.55rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-[#071E1A] sm:text-[3.05rem] md:text-[3.65rem] xl:text-[4.05rem]">
                One transaction.
                <span className="block">Every stakeholder.</span>
                <span className="block text-[#0E6A55]">Finally connected.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[1rem] font-medium leading-7 text-[#52645D] md:text-[1.12rem] md:leading-8">
                Arch9 connects buyers, sellers, agents, attorneys, bond originators and developers in one shared transaction workspace.
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
            </FadeUp>

            <FadeUp delay={0.12} className="hidden lg:block">
              <HeroNetworkGraphic />
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
