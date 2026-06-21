import { useEffect } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  FileCheck2,
  FolderKanban,
  Landmark,
  LineChart,
  MessageSquareText,
  PieChart,
  Scale,
  ShieldCheck,
  UserRoundCheck,
  Users,
  WalletCards,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const trustIndicators = [
  {
    icon: ClipboardCheck,
    title: 'Better Instructions',
    copy: 'Receive complete transaction information from day one.',
  },
  {
    icon: MessageSquareText,
    title: 'Less Chasing',
    copy: 'Reduce time spent requesting updates and documents.',
  },
  {
    icon: CheckCircle2,
    title: 'Faster Registrations',
    copy: 'Keep matters moving with better visibility.',
  },
]

const matterStatus = [
  'Instruction Received',
  'FICA Complete',
  'Documents Received',
  'Lodged',
  'Registered',
]

const connectedRoles = ['Buyer', 'Seller', 'Agent', 'Bond Originator']

const conveyancingFeatures = [
  {
    icon: BriefcaseBusiness,
    title: 'Transfer Matters',
    copy: 'Manage transfer matters from instruction through registration.',
  },
  {
    icon: Landmark,
    title: 'Bond Registrations',
    copy: 'Track bond registration progress in real time.',
  },
  {
    icon: ShieldCheck,
    title: 'Bond Cancellations',
    copy: 'Keep cancellation matters aligned with transfers.',
  },
  {
    icon: MessageSquareText,
    title: 'Client Communication',
    copy: 'Provide updates without endless emails.',
  },
  {
    icon: FileCheck2,
    title: 'Document Collection',
    copy: 'Request and receive documents digitally.',
  },
  {
    icon: FolderKanban,
    title: 'Matter Tracking',
    copy: 'Know exactly where every matter stands.',
  },
  {
    icon: Users,
    title: 'Roleplayer Visibility',
    copy: 'See all stakeholders connected to a transaction.',
  },
  {
    icon: CalendarDays,
    title: 'Milestone Updates',
    copy: 'Keep buyers, sellers and agents informed automatically.',
  },
]

const operationRoles = [
  {
    role: 'Director',
    copy: 'Matter volume, team capacity, registrations and revenue pipeline.',
  },
  {
    role: 'Manager',
    copy: 'Workloads, outstanding tasks and bottlenecks across the team.',
  },
  {
    role: 'Operator',
    copy: 'Daily matter management, documents, updates and next actions.',
  },
]

const dashboardPanels = [
  {
    title: 'Active Matters',
    rows: ['Transfer', 'Bond', 'Cancellation'],
  },
  {
    title: 'Matters By Stage',
    rows: ['Instruction', 'Preparation', 'Signing', 'Lodgement', 'Registration'],
  },
  {
    title: 'Upcoming Lodgements',
    rows: ['Tomorrow', 'This Week', 'Next Week'],
  },
  {
    title: 'Bottlenecks',
    rows: ['Missing documents', 'Delayed signatures', 'Outstanding requirements'],
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Receive Instruction',
    copy: 'Structured transfer, bond and cancellation instructions arrive with transaction context attached.',
  },
  {
    step: '02',
    title: 'Collect Documents',
    copy: 'Request, receive and track buyer and seller documents digitally.',
  },
  {
    step: '03',
    title: 'Manage Matter',
    copy: 'Coordinate milestones, roleplayers, requirements and status updates in one workspace.',
  },
  {
    step: '04',
    title: 'Register Property',
    copy: 'Move matters through lodgement and registration with fewer missing updates.',
  },
]

const switchReasons = [
  {
    title: 'Cleaner Instructions',
    copy: 'Reduce back-and-forth with agents.',
  },
  {
    title: 'Better Visibility',
    copy: 'See all stakeholders in one workspace.',
  },
  {
    title: 'Less Admin',
    copy: 'Automate repetitive communication.',
  },
  {
    title: 'Faster Turnaround',
    copy: 'Move matters through registration more efficiently.',
  },
]

const pricingPlans = [
  {
    name: 'Professional',
    price: 'Custom Pricing',
    ideal: 'Boutique conveyancing firms and specialist transfer teams',
    features: [
      'Matter Management',
      'Transfer Tracking',
      'Bond Tracking',
      'Cancellation Tracking',
      'Document Requests',
      'Client Updates',
      'Agent Collaboration',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom Pricing',
    ideal: 'Multi-office firms and high-volume conveyancing practices',
    features: [
      'Everything in Professional',
      'Team Management',
      'Workflow Automation',
      'Performance Reporting',
      'Director Dashboard',
      'Custom Integrations',
      'Dedicated Support',
    ],
  },
]

const additionalServices = ['FICA Verification', 'Credit Checks', 'Property Reports', 'Bank Integrations']

const testimonials = [
  {
    quote: 'Arch9 has dramatically reduced the amount of time our team spends chasing documents and updates.',
    name: 'Lauren Jacobs',
    role: 'Conveyancing Manager',
  },
  {
    quote: 'For the first time, agents and attorneys are working from the same source of truth.',
    name: 'Devon Pillay',
    role: 'Managing Partner',
  },
]

function setMetaDescription(content) {
  let description = document.querySelector('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.setAttribute('name', 'description')
    document.head.appendChild(description)
  }
  description.setAttribute('content', content)
}

function MatterWorkspaceVisual() {
  return (
    <div className="relative rounded-[34px] border border-[#0A3028]/10 bg-[#071E1A] p-5 text-white shadow-[0_34px_110px_rgba(5,8,7,0.18)] md:p-7">
      <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_78%_18%,rgba(134,228,194,0.16),transparent_32%),linear-gradient(135deg,#071E1A,#0A3028)]" />
      <div className="relative grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Transfer Matter</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">Matter context, connected.</h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {connectedRoles.map((role) => (
              <div key={role} className="rounded-[16px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-extrabold">
                {role}
              </div>
            ))}
          </div>
          <div className="mt-7 grid gap-3">
            {matterStatus.map((status, index) => (
              <div key={status} className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.07] px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#86E4C2]/16 text-[#86E4C2]">
                  {index < 3 ? <CheckCircle2 className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
                </span>
                <span className="text-sm font-extrabold text-white">{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {[
            { value: '127', label: 'Active Matters' },
            { value: '18', label: 'Lodgements This Week' },
            { value: '42', label: 'Registrations This Month' },
          ].map((metric) => (
            <div key={metric.label} className="rounded-[24px] border border-white/10 bg-white/[0.09] p-5 backdrop-blur-xl">
              <p className="text-3xl font-extrabold">{metric.value}</p>
              <p className="mt-1 text-sm font-semibold text-white/72">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RegistrationDashboardVisual() {
  return (
    <div className="rounded-[30px] border border-[#0A3028]/8 bg-[#071E1A] p-5 text-white shadow-[0_28px_90px_rgba(5,8,7,0.14)] md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Registration Intelligence</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">Know where every matter stands.</h3>
        </div>
        <PieChart className="h-8 w-8 text-[#86E4C2]" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {dashboardPanels.map((panel) => (
          <div key={panel.title} className="rounded-[22px] border border-white/10 bg-white/[0.08] p-4">
            <p className="text-sm font-extrabold text-white">{panel.title}</p>
            <div className="mt-4 grid gap-2">
              {panel.rows.map((row) => (
                <div key={row} className="flex items-center justify-between gap-3 rounded-[14px] bg-white/[0.06] px-3 py-2">
                  <span className="text-xs font-semibold text-white/76">{row}</span>
                  <span className="h-2 w-12 rounded-full bg-[#86E4C2]/60" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {[
          { value: '31', label: 'Upcoming Registrations' },
          { value: '16d', label: 'Avg Turnaround Time' },
          { value: 'R4.8m', label: 'Revenue Forecast' },
        ].map((metric) => (
          <div key={metric.label} className="rounded-[18px] border border-white/10 bg-white/[0.08] p-4">
            <p className="text-2xl font-extrabold">{metric.value}</p>
            <p className="mt-1 text-xs font-semibold text-white/68">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AttorneysSolution() {
  useEffect(() => {
    document.title = 'Conveyancing Operating System | Arch9'
    setMetaDescription(
      'Arch9 helps conveyancing firms receive cleaner instructions, reduce chasing, improve matter visibility and move transfer, bond and cancellation matters to registration faster.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#05120F]">
      <Header />
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-14 pt-[128px] md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">For conveyancing firms</p>
            <h1 className="mt-5 max-w-[760px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem]">
              Cleaner instructions. Faster registrations.
            </h1>
            <p className="mt-6 max-w-[650px] text-lg font-medium leading-8 text-[#31433D]">
              Receive structured transfer, bond and cancellation instructions with documents, roleplayers and transaction context already connected.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary min-h-[54px] px-7">
                Book A Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#0A3028]/18 bg-white/72 px-7 text-sm font-extrabold text-[#071E1A] transition hover:bg-white">
                Speak To Our Team
              </a>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {trustIndicators.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className={`flex items-center gap-4 ${index ? 'sm:border-l sm:border-[#0A3028]/10 sm:pl-5' : ''}`}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#064537] shadow-[0_12px_34px_rgba(5,8,7,0.06)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#071E1A]">{item.title}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#31433D]">{item.copy}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <MatterWorkspaceVisual />
        </section>

        <section className="px-6 py-14 md:px-8 md:py-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[820px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Conveyancing workspace</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Built for transfer, bond and cancellation teams.
              </h2>
              <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">
                A connected transaction platform that delivers cleaner instructions, better communication and faster registrations.
              </p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {conveyancingFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <article key={feature.title} className="rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E8F3EB] text-[#064537]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#071E1A]">{feature.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{feature.copy}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">One connected matter</p>
              <h2 className="mt-4 text-[2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Every role connected around the same transaction.</h2>
              <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">No duplicate communication. No missing context. No fragmented updates.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                {connectedRoles.map((role) => (
                  <div key={role} className="rounded-[18px] border border-[#0A3028]/8 bg-[#F8F4EC] px-4 py-3 text-center text-sm font-extrabold text-[#071E1A]">
                    {role}
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-[#064537] text-center text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_54px_rgba(5,8,7,0.16)]">
                Transfer Matter
              </div>
              <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#006B4D]/18 bg-[#E8F3EB] text-center text-xs font-black uppercase tracking-[0.12em] text-[#064537]">
                Registration
              </div>
            </div>

            <div className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Conveyancing operations</p>
              <h2 className="mt-4 text-[2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Manage the entire firm from one place.</h2>
              <div className="mt-7 grid gap-3">
                {operationRoles.map((role, index) => (
                  <div key={role.role} className="relative flex gap-4 rounded-[18px] bg-[#F8F4EC] p-4">
                    {index < operationRoles.length - 1 ? <span className="absolute bottom-[-12px] left-[29px] h-5 w-px bg-[#0A3028]/12" /> : null}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#064537] text-sm font-extrabold text-white">{index + 1}</span>
                    <span>
                      <span className="block text-base font-extrabold text-[#071E1A]">{role.role}</span>
                      <span className="mt-1 block text-sm font-medium leading-6 text-[#5B6B64]">{role.copy}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Registration intelligence dashboard</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Know where every matter stands.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-[#5B6B64]">
                Track active matters, upcoming lodgements, bottlenecks, team performance and the expected registration pipeline.
              </p>
            </div>
            <RegistrationDashboardVisual />
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">How Arch9 works.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="relative rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  {index < howItWorks.length - 1 ? <span className="absolute right-[-18px] top-1/2 hidden h-px w-9 bg-[#0A3028]/14 md:block" /> : null}
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">{step.step}</p>
                  <h3 className="mt-5 text-xl font-extrabold text-[#071E1A]">{step.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Why firms switch to Arch9.</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {switchReasons.map((reason) => (
                <div key={reason.title} className="rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  <CircleAlert className="h-6 w-6 text-[#006B4D]" />
                  <h3 className="mt-5 text-lg font-extrabold text-[#071E1A]">{reason.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{reason.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[780px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Pricing</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Pricing built for modern conveyancing firms.
              </h2>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className="rounded-[26px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  <h3 className="text-2xl font-extrabold text-[#071E1A]">{plan.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#5B6B64]">Ideal for: {plan.ideal}</p>
                  <p className="mt-6 text-[2.8rem] font-extrabold tracking-[-0.05em] text-[#071E1A]">{plan.price}</p>
                  <ul className="mt-6 grid gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#31433D]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#006B4D]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[22px] border border-[#0A3028]/8 bg-white/72 p-5">
              <p className="text-sm font-extrabold text-[#071E1A]">Additional services</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {additionalServices.map((service) => (
                  <div key={service} className="rounded-[16px] bg-[#F8F4EC] px-4 py-3 text-sm font-bold text-[#31433D]">{service}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Trusted by conveyancing leaders.</h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.name} className="rounded-[26px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  <MessageSquareText className="h-7 w-7 text-[#006B4D]" />
                  <p className="mt-5 text-xl font-semibold leading-8 tracking-[-0.03em] text-[#071E1A]">{testimonial.quote}</p>
                  <footer className="mt-6">
                    <p className="text-sm font-extrabold text-[#071E1A]">{testimonial.name}</p>
                    <p className="mt-1 text-sm font-semibold text-[#5B6B64]">{testimonial.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 rounded-[26px] bg-[linear-gradient(135deg,#05352D,#08221D)] p-7 text-white shadow-[0_24px_80px_rgba(5,8,7,0.16)] md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em]">Ready to modernise your conveyancing firm?</h2>
              <p className="mt-2 max-w-[720px] text-sm font-medium leading-6 text-white/82 md:text-base">
                Join firms using Arch9 to improve visibility, reduce admin and move matters to registration faster.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[52px] justify-center px-7">
                Book A Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/24 px-7 text-sm font-extrabold text-white transition hover:bg-white/10">
                Speak To Our Team
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
