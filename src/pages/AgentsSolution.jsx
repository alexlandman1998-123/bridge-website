import { useEffect } from 'react'
import {
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  Home,
  Landmark,
  LineChart,
  MessageSquareText,
  PieChart,
  Search,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const heroWorkflow = [
  { label: 'Listing', detail: 'Live on Arch9', icon: Home },
  { label: 'Buyer Enquiry', detail: 'Qualified and assigned', icon: Search },
  { label: 'Offer', detail: 'Negotiation tracked', icon: ClipboardList },
  { label: 'Bond', detail: 'Application connected', icon: Landmark },
  { label: 'Transfer', detail: 'Attorney matter linked', icon: BriefcaseBusiness },
  { label: 'Registration', detail: 'Milestones visible', icon: ShieldCheck },
  { label: 'Commission Paid', detail: 'Forecast updated', icon: WalletCards },
]

const trustIndicators = [
  { icon: Users, title: 'More Leads', copy: 'Quality enquiries that convert.' },
  { icon: Zap, title: 'Faster Deals', copy: 'Keep transactions moving.' },
  { icon: TrendingUp, title: 'More Commission', copy: 'Get paid sooner.' },
]

const agentFeatures = [
  {
    icon: Search,
    title: 'Generate More Leads',
    copy: 'Capture enquiries from your website, property portals, social media, referrals and manual prospecting.',
  },
  {
    icon: Home,
    title: 'Smart Buyer Matching',
    copy: 'Automatically match buyers to listings, developments, price ranges and areas.',
  },
  {
    icon: ClipboardList,
    title: 'Offer Management',
    copy: 'Manage offers, counter offers, negotiations and acceptances from one workspace.',
  },
  {
    icon: LineChart,
    title: 'Transaction Pipeline',
    copy: 'Track bond, transfer, cancellation and registration progress in real time.',
  },
  {
    icon: UserRoundCheck,
    title: 'Buyer Portal',
    copy: 'Let buyers upload documents, track progress and receive the updates they need.',
  },
  {
    icon: Users,
    title: 'Seller Portal',
    copy: 'Give sellers visibility throughout the transaction without another status call.',
  },
  {
    icon: Bell,
    title: 'Automated Follow-Ups',
    copy: 'Keep buyers engaged, reduce manual admin and make follow-up discipline visible.',
  },
  {
    icon: FileCheck2,
    title: 'Document Management',
    copy: 'Store, request and share transaction documents securely across the deal.',
  },
]

const agencyRoles = [
  { role: 'Principal', copy: 'Agency oversight, revenue visibility and pipeline control.' },
  { role: 'Branch Manager', copy: 'Branch performance, accountability and bottleneck tracking.' },
  { role: 'Agent', copy: 'Daily sales execution from lead to registration.' },
  { role: 'Assistant', copy: 'Administration support, documents and follow-up coordination.' },
]

const connectedRoles = ['Buyer', 'Seller', 'Agent', 'Attorney', 'Bond Originator', 'Developer']

const marketplaceStats = [
  { icon: BarChart3, value: '2,450+', label: 'Active Agents' },
  { icon: Home, value: '18,600+', label: 'Properties Listed' },
  { icon: PieChart, value: '320K+', label: 'Monthly Views' },
  { icon: CheckCircle2, value: 'R2.1B+', label: 'Value Transacted' },
]

const howItWorks = [
  {
    step: '01',
    title: 'Capture Leads',
    copy: 'Bring portal, website, referral and prospecting leads into one pipeline.',
  },
  {
    step: '02',
    title: 'Qualify Buyers',
    copy: 'Track requirements, affordability, documents and buyer intent.',
  },
  {
    step: '03',
    title: 'Manage Transactions',
    copy: 'Coordinate offers, bond progress, transfer matters, documents and roleplayers.',
  },
  {
    step: '04',
    title: 'Reach Registration',
    copy: 'Keep everyone aligned until registration and commission payment.',
  },
]

const principalBenefits = [
  {
    title: 'Track Agent Performance',
    copy: 'Monitor listings, leads, activity and transactions per agent.',
  },
  {
    title: 'See Pipeline Health',
    copy: 'Understand where deals are stuck before they become a problem.',
  },
  {
    title: 'Improve Accountability',
    copy: "Know who is following up and who isn't.",
  },
  {
    title: 'Forecast Revenue',
    copy: 'See future commission before registration happens.',
  },
]

const dashboardPanels = [
  {
    title: 'Top Performers',
    rows: ['Listings Added', 'Leads Generated', 'Transactions Closed'],
  },
  {
    title: 'Lead Performance',
    rows: ['New Leads This Week', 'Conversion Rates', 'Lead Sources'],
  },
  {
    title: 'Pipeline Health',
    rows: ['Offers', 'Bond Applications', 'Transfers', 'Registrations'],
  },
  {
    title: 'Bottleneck Detection',
    rows: ['Stalled Transactions', 'Missing Documents', 'Outstanding Tasks'],
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 'R299',
    suffix: '/ User / Month',
    ideal: 'Individual Agents',
    features: ['CRM', 'Listings', 'Leads', 'Calendar', 'Buyer Matching', 'Buyer Portal', 'Seller Portal', 'Mobile Access'],
  },
  {
    name: 'Professional',
    price: 'R499',
    suffix: '/ User / Month',
    ideal: 'Growing teams',
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'Transactions',
      'Offer Management',
      'Document Generation',
      'Automated Follow-Ups',
      'Transaction Tracking',
      'Roleplayer Collaboration',
      'Agency Dashboards',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    suffix: 'Pricing',
    ideal: 'Multi-Branch Agencies',
    features: [
      'Principal Dashboard',
      'Branch Management',
      'Custom Branding',
      'Advanced Analytics',
      'Workflow Automation',
      'Dedicated Support',
      'API Access',
      'Custom Integrations',
    ],
  },
]

const addOns = ['Credit Checks', 'FICA Verification', 'Property Reports', 'Bond Application Services']

const testimonials = [
  {
    quote:
      'For the first time, I can see what every agent is doing, what every transaction is doing and what the agency is going to earn.',
    name: 'Nadine van der Merwe',
    role: 'Principal, Cape Town agency',
  },
  {
    quote:
      'Arch9 gave our agents a single place for leads, offers, documents and transfer updates. Deals move faster because everyone knows what is next.',
    name: 'Michael Naidoo',
    role: 'Branch Manager, Johannesburg',
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

function HeroVisual() {
  return (
    <div className="relative rounded-[34px] border border-[#0A3028]/10 bg-[#071E1A] p-5 text-white shadow-[0_34px_110px_rgba(5,8,7,0.18)] md:p-7">
      <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_78%_18%,rgba(134,228,194,0.17),transparent_32%),linear-gradient(135deg,#071E1A,#0A3028)]" />
      <div className="relative grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Agency operating system</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">Listing to commission, connected.</h2>
          <div className="mt-7 grid gap-3">
            {heroWorkflow.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.07] px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#86E4C2]/16 text-[#86E4C2]">
                    {index < 4 ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-extrabold text-white">{step.label}</span>
                    <span className="block text-xs font-semibold text-white/62">{step.detail}</span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="grid gap-4">
          {[
            { value: '14', label: 'Active Buyers' },
            { value: '3', label: 'Offers Received' },
            { value: '8', label: 'Transactions In Progress' },
            { value: 'R420k', label: 'Commission Forecast' },
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

function PrincipalDashboardVisual() {
  return (
    <div className="rounded-[30px] border border-[#0A3028]/8 bg-[#071E1A] p-5 text-white shadow-[0_28px_90px_rgba(5,8,7,0.14)] md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Principal Dashboard</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">Agency visibility</h3>
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
        {['Expected Commission This Month', 'Expected Commission Next 30 Days', 'Calendar Visibility'].map((item, index) => (
          <div key={item} className="rounded-[18px] border border-white/10 bg-white/[0.08] p-4">
            <p className="text-2xl font-extrabold">{index === 0 ? 'R680k' : index === 1 ? 'R1.2m' : '42'}</p>
            <p className="mt-1 text-xs font-semibold text-white/68">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AgentsSolution() {
  useEffect(() => {
    document.title = 'Estate Agency Operating System | Arch9'
    setMetaDescription(
      'Arch9 is the operating system for modern property agencies, connecting CRM, listings, leads, transactions, dashboards and commission forecasting.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#05120F]">
      <Header />
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-14 pt-[128px] md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">For modern agencies</p>
            <h1 className="mt-5 max-w-[760px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem]">
              Turn listings into registrations.
            </h1>
            <p className="mt-6 max-w-[650px] text-lg font-medium leading-8 text-[#31433D]">
              Generate enquiries, qualify buyers and manage every transaction from listing to registration - all in one place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary min-h-[54px] px-7">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#0A3028]/18 bg-white/72 px-7 text-sm font-extrabold text-[#071E1A] transition hover:bg-white">
                Book A Demo
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
          <HeroVisual />
        </section>

        <section className="px-6 py-14 md:px-8 md:py-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[820px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Complete agency system</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Everything an agent needs to close more deals.
              </h2>
              <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">
                More than a CRM, more than listings and more than transaction tracking. Arch9 connects the work agents do every day.
              </p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {agentFeatures.map((feature) => {
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
          <div className="mx-auto grid w-full max-w-[1280px] gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Built for the entire agency</p>
              <h2 className="mt-4 text-[2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">One platform for every role in your agency.</h2>
              <div className="mt-7 grid gap-3">
                {agencyRoles.map((role, index) => (
                  <div key={role.role} className="relative flex gap-4 rounded-[18px] bg-[#F8F4EC] p-4">
                    {index < agencyRoles.length - 1 ? <span className="absolute bottom-[-12px] left-[29px] h-5 w-px bg-[#0A3028]/12" /> : null}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#064537] text-sm font-extrabold text-white">{index + 1}</span>
                    <span>
                      <span className="block text-base font-extrabold text-[#071E1A]">{role.role}</span>
                      <span className="mt-1 block text-sm font-medium leading-6 text-[#5B6B64]">{role.copy}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">One connected transaction</p>
              <h2 className="mt-4 text-[2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Every role connected around one transaction.</h2>
              <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">Everyone works from the same source of truth.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {connectedRoles.map((role) => (
                  <div key={role} className="rounded-[18px] border border-[#0A3028]/8 bg-[#F8F4EC] px-4 py-3 text-center text-sm font-extrabold text-[#071E1A]">
                    {role}
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#064537] text-center text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_54px_rgba(5,8,7,0.16)]">
                Transaction
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#05352D,#08221D)] px-6 py-7 text-white shadow-[0_24px_80px_rgba(5,8,7,0.16)] md:max-w-[1280px] md:px-9">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {marketplaceStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className={`flex items-center gap-5 ${index ? 'xl:border-l xl:border-white/12 xl:pl-8' : ''}`}>
                    <Icon className="h-9 w-9 text-[#8BD9B0]" />
                    <div>
                      <p className="text-3xl font-extrabold tracking-[-0.04em]">{stat.value}</p>
                      <p className="mt-1 text-sm font-semibold text-white/82">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
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
          <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Built for principals</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Agency visibility without micromanaging.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-[#5B6B64]">
                See what every agent is working on, where every deal stands and what needs attention - from one principal dashboard.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {principalBenefits.map((benefit) => (
                  <div key={benefit.title} className="rounded-[18px] border border-[#0A3028]/8 bg-white p-4">
                    <h3 className="text-sm font-extrabold text-[#071E1A]">{benefit.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#5B6B64]">{benefit.copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <PrincipalDashboardVisual />
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[780px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Pricing</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Simple pricing for modern agencies.
              </h2>
              <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">Public pricing for agents and agencies. Add specialist services only when you need them.</p>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className={`relative rounded-[26px] border bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] ${plan.badge ? 'border-[#006B4D]/28' : 'border-[#0A3028]/8'}`}>
                  {plan.badge ? <span className="absolute right-5 top-5 rounded-full bg-[#064537] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">{plan.badge}</span> : null}
                  <h3 className="text-2xl font-extrabold text-[#071E1A]">{plan.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#5B6B64]">Ideal for: {plan.ideal}</p>
                  <div className="mt-6 flex items-end gap-2">
                    <p className="text-[3rem] font-extrabold tracking-[-0.05em] text-[#071E1A]">{plan.price}</p>
                    <p className="pb-3 text-sm font-bold text-[#5B6B64]">{plan.suffix}</p>
                  </div>
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
              <p className="text-sm font-extrabold text-[#071E1A]">Additional services: Pay-As-You-Go</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {addOns.map((addon) => (
                  <div key={addon} className="rounded-[16px] bg-[#F8F4EC] px-4 py-3 text-sm font-bold text-[#31433D]">{addon}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Real agencies. Real principals. Real agents.</h2>
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
              <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em]">Ready to modernise your agency?</h2>
              <p className="mt-2 max-w-[720px] text-sm font-medium leading-6 text-white/82 md:text-base">
                Join agents and principals who are generating more leads, managing transactions better and reaching registration faster with Arch9.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[52px] justify-center px-7">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/24 px-7 text-sm font-extrabold text-white transition hover:bg-white/10">
                Book A Demo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
