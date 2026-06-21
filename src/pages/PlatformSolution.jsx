import { useEffect } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  FileCheck2,
  FolderKanban,
  Handshake,
  Home,
  Landmark,
  LineChart,
  MessageSquareText,
  Scale,
  Search,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
  Users,
  WalletCards,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ecosystemRoles = [
  { label: 'Buyer', icon: Users },
  { label: 'Seller', icon: Home },
  { label: 'Agent', icon: BriefcaseBusiness },
  { label: 'Attorney', icon: Scale },
  { label: 'Bond Originator', icon: Landmark },
  { label: 'Developer', icon: Building2 },
]

const platformStats = [
  { value: '120,000+', label: 'Properties' },
  { value: '15,000+', label: 'Transactions' },
  { value: '5,000+', label: 'Professionals' },
  { value: 'R8.4B+', label: 'Transaction Value' },
]

const disconnectedScenarios = [
  ['Agent', 'WhatsApp', 'Buyer'],
  ['Attorney', 'Email', 'Bond Originator'],
  ['Seller', 'Phone Call', 'Agent'],
]

const stakeholderProblems = [
  {
    role: 'Buyers',
    problem: "Don't know what happens next.",
  },
  {
    role: 'Agents',
    problem: 'Spend hours chasing updates.',
  },
  {
    role: 'Attorneys',
    problem: 'Receive incomplete instructions.',
  },
  {
    role: 'Bond Originators',
    problem: 'Constantly request documents.',
  },
  {
    role: 'Developers',
    problem: 'Lack visibility.',
  },
]

const sharedTruthBenefits = ['Shared updates', 'Shared documents', 'Shared milestones', 'Shared accountability', 'Shared visibility']

const roleWorkspaces = [
  {
    icon: BriefcaseBusiness,
    title: 'Agents',
    items: ['Generate leads', 'Track deals', 'Manage clients'],
  },
  {
    icon: Scale,
    title: 'Attorneys',
    items: ['Manage matters', 'Reduce admin', 'Improve visibility'],
  },
  {
    icon: Landmark,
    title: 'Bond Originators',
    items: ['Track applications', 'Manage consultants', 'Monitor approvals'],
  },
  {
    icon: Building2,
    title: 'Developers',
    items: ['Manage stock', 'Track sales', 'Monitor developments'],
  },
  {
    icon: Users,
    title: 'Buyers',
    items: ['Track progress', 'Upload documents', 'Receive updates'],
  },
  {
    icon: Home,
    title: 'Sellers',
    items: ['Follow transactions', 'Manage paperwork', 'Stay informed'],
  },
]

const journeyStages = [
  'Property Search',
  'Buyer Enquiry',
  'Qualification',
  'Offer Submitted',
  'Offer Accepted',
  'Bond Application',
  'Bond Approval',
  'Transfer Process',
  'Lodgement',
  'Registration',
  'Commission Paid',
]

const platformCapabilities = [
  {
    icon: Home,
    title: 'Listings',
    copy: 'Residential, commercial and developments in one connected listing layer.',
  },
  {
    icon: FolderKanban,
    title: 'CRM',
    copy: 'Leads, buyers, sellers, tasks and appointments connected to the transaction.',
  },
  {
    icon: Search,
    title: 'Buyer Matching',
    copy: 'Automatic property matching that helps agents move from enquiry to action.',
  },
  {
    icon: UserRoundCheck,
    title: 'Buyer Portal',
    copy: 'Document collection, progress tracking and clearer next steps for buyers.',
  },
  {
    icon: ShieldCheck,
    title: 'Seller Portal',
    copy: 'Sale tracking, document management and roleplayer visibility for sellers.',
  },
  {
    icon: WalletCards,
    title: 'Bond Origination',
    copy: 'Application management, document collection and bank tracking.',
  },
  {
    icon: Scale,
    title: 'Conveyancing',
    copy: 'Matter management, milestone updates and registration tracking.',
  },
  {
    icon: Building2,
    title: 'Development Management',
    copy: 'Stock management, buyer demand, sales progress and development reporting.',
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analytics',
    copy: 'Agency performance, transaction intelligence and revenue forecasting.',
  },
]

const softwareComparison = [
  {
    title: 'Property Portals',
    copy: 'Help you find a buyer.',
  },
  {
    title: 'CRMs',
    copy: 'Help you manage a lead.',
  },
  {
    title: 'Conveyancing Systems',
    copy: 'Help attorneys manage matters.',
  },
  {
    title: 'Bond Systems',
    copy: 'Help originators manage applications.',
  },
  {
    title: 'Arch9',
    copy: 'Connects all of them together.',
  },
]

const visibilityDashboards = [
  {
    title: 'Agency Dashboard',
    items: ['Listings', 'Leads', 'Transactions', 'Commission forecast'],
  },
  {
    title: 'Attorney Dashboard',
    items: ['Matters', 'Registrations', 'Capacity'],
  },
  {
    title: 'Bond Dashboard',
    items: ['Applications', 'Approvals', 'Consultant performance'],
  },
  {
    title: 'Developer Dashboard',
    items: ['Stock', 'Sales', 'Registrations'],
  },
]

const pricingPlans = [
  {
    name: 'Agents',
    price: 'R299',
    suffix: 'User / Month',
    ideal: 'For individual agents.',
    features: ['Listings', 'Lead capture', 'Buyer management', 'Task tracking'],
  },
  {
    name: 'Professional',
    price: 'R499',
    suffix: 'User / Month',
    ideal: 'For growing teams.',
    features: ['Everything in Starter', 'Team CRM', 'Transaction tracking', 'Reporting dashboards', 'Buyer and seller portals'],
  },
  {
    name: 'Attorneys',
    price: 'Custom Pricing',
    suffix: '',
    ideal: 'For conveyancing and transfer teams.',
    features: ['Matter management', 'Registration tracking', 'Document workflows', 'Stakeholder updates'],
  },
  {
    name: 'Bond Originators',
    price: 'Custom Pricing',
    suffix: '',
    ideal: 'For finance application teams.',
    features: ['Application tracking', 'Consultant management', 'Approval monitoring', 'Agent collaboration'],
  },
  {
    name: 'Developers',
    price: 'Custom Pricing',
    suffix: '',
    ideal: 'For development sales teams.',
    features: ['Stock management', 'Sales tracking', 'Development reporting', 'Buyer visibility'],
  },
  {
    name: 'Enterprise',
    price: 'Custom Pricing',
    suffix: '',
    ideal: 'For larger organisations.',
    features: ['Multi-branch visibility', 'Role-based workspaces', 'Advanced reporting', 'Dedicated support'],
  },
]

const addOnServices = ['Credit Checks', 'FICA Verification', 'Property Reports', 'Compliance Services']

const testimonials = [
  {
    quote: 'Arch9 gives our agency one place to understand every lead, deal and registration.',
    name: 'Principal',
    role: 'Real Estate Agency',
  },
  {
    quote: 'The value is not another dashboard. It is that the people around the transaction finally share context.',
    name: 'Partner',
    role: 'Conveyancing Firm',
  },
  {
    quote: 'Finance, transfer and sales progress are easier to manage when everyone can see the same journey.',
    name: 'Director',
    role: 'Bond Origination Business',
  },
  {
    quote: 'The platform gives our development team visibility from launch stock to final registration.',
    name: 'Developer',
    role: 'Residential Development Group',
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

function TransactionMapVisual() {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-[#0A3028]/10 bg-[#071E1A] p-5 text-white shadow-[0_34px_110px_rgba(5,8,7,0.18)] md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(134,228,194,0.16),transparent_32%),linear-gradient(135deg,#071E1A,#0A3028)]" />
      <div className="relative grid gap-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ecosystemRoles.map((role) => {
            const Icon = role.icon
            return (
              <div key={role.label} className="rounded-[18px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                <Icon className="h-5 w-5 text-[#86E4C2]" />
                <p className="mt-3 text-sm font-extrabold">{role.label}</p>
              </div>
            )
          })}
        </div>

        <div className="mx-auto h-9 w-px bg-white/18" />

        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-[#86E4C2]/28 bg-[#86E4C2]/14 text-center text-xs font-black uppercase tracking-[0.16em] text-[#86E4C2] shadow-[0_0_60px_rgba(134,228,194,0.16)]">
          Arch9 Transaction
        </div>

        <div className="mx-auto h-9 w-px bg-white/18" />

        <div className="rounded-[26px] border border-white/10 bg-white/[0.08] p-5 text-center backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Registration</p>
          <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">One shared finish line.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {platformStats.map((stat) => (
            <div key={stat.label} className="rounded-[20px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
              <p className="text-2xl font-extrabold">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SharedTruthVisual() {
  return (
    <div className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {ecosystemRoles.map((role) => {
          const Icon = role.icon
          return (
            <div key={role.label} className="rounded-[18px] bg-[#F8F4EC] p-4">
              <Icon className="h-5 w-5 text-[#006B4D]" />
              <p className="mt-3 text-sm font-extrabold text-[#071E1A]">{role.label}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-6 rounded-[26px] bg-[linear-gradient(135deg,#05352D,#08221D)] p-6 text-center text-white">
        <Handshake className="mx-auto h-8 w-8 text-[#86E4C2]" />
        <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Shared Transaction</p>
        <p className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">One property. One buyer. One seller. One shared timeline.</p>
      </div>
    </div>
  )
}

function IntelligenceVisual() {
  return (
    <div className="rounded-[30px] border border-[#0A3028]/8 bg-[#071E1A] p-5 text-white shadow-[0_28px_90px_rgba(5,8,7,0.14)] md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Marketplace Intelligence</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">Real-time visibility across your business.</h3>
        </div>
        <LineChart className="h-8 w-8 text-[#86E4C2]" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {visibilityDashboards.map((dashboard, index) => (
          <div key={dashboard.title} className="rounded-[22px] border border-white/10 bg-white/[0.08] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-extrabold text-white">{dashboard.title}</p>
              <span className="text-xs font-black text-[#86E4C2]">{index + 1}</span>
            </div>
            <div className="mt-4 grid gap-2 text-xs font-semibold text-white/70">
              {dashboard.items.map((item) => (
                <div key={item} className="flex items-center justify-between gap-3 rounded-[12px] bg-white/[0.06] px-3 py-2">
                  <span>{item}</span>
                  <span className="h-2 w-10 rounded-full bg-[#86E4C2]/60" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PlatformSolution() {
  useEffect(() => {
    document.title = 'Property Transaction Operating System | Arch9'
    setMetaDescription(
      'Arch9 connects buyers, sellers, agents, attorneys, bond originators and developers around one shared property transaction from enquiry to registration.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#05120F]">
      <Header />
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-14 pt-[128px] md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Platform overview</p>
            <h1 className="mt-5 max-w-[760px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem]">
              The operating system for property transactions.
            </h1>
            <p className="mt-6 max-w-[650px] text-lg font-medium leading-8 text-[#31433D]">
              Arch9 connects buyers, sellers, agents, attorneys, bond originators and developers around one shared transaction from enquiry to registration.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary min-h-[54px] px-7">
                Book A Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#solutions" className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#0A3028]/18 bg-white/72 px-7 text-sm font-extrabold text-[#071E1A] transition hover:bg-white">
                Explore Solutions
              </a>
            </div>
          </div>
          <TransactionMapVisual />
        </section>

        <section className="px-6 py-14 md:px-8 md:py-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Property transactions are broken</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Everyone is working. Nobody is connected.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-[#5B6B64]">
                Today the property industry operates through disconnected systems. Every stakeholder sees a different version of reality.
              </p>
              <p className="mt-4 text-base font-extrabold leading-8 text-[#071E1A]">No shared visibility. No shared accountability. No shared timeline.</p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {disconnectedScenarios.map((scenario) => (
                    <div key={scenario.join('-')} className="rounded-[20px] bg-[#F8F4EC] p-4 text-center">
                      {scenario.map((item, index) => (
                        <div key={`${item}-${index}`}>
                          <p className={`text-sm font-extrabold ${index === 1 ? 'text-[#006B4D]' : 'text-[#071E1A]'}`}>{item}</p>
                          {index < scenario.length - 1 ? <div className="mx-auto my-3 h-5 w-px bg-[#0A3028]/16" /> : null}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {stakeholderProblems.map((item) => (
                  <div key={item.role} className="rounded-[18px] border border-[#0A3028]/8 bg-white px-4 py-3 shadow-[0_12px_34px_rgba(5,8,7,0.04)]">
                    <p className="text-sm font-extrabold text-[#071E1A]">{item.role}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#5B6B64]">{item.problem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <SharedTruthVisual />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">One shared source of truth</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Everyone working from the same transaction.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-[#5B6B64]">
                Arch9 creates a shared transaction layer that connects every roleplayer involved in the property journey.
              </p>
              <div className="mt-7 grid gap-3">
                {sharedTruthBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-[18px] border border-[#0A3028]/8 bg-white px-4 py-3 shadow-[0_12px_34px_rgba(5,8,7,0.04)]">
                    <CheckCircle2 className="h-5 w-5 text-[#006B4D]" />
                    <span className="text-sm font-extrabold text-[#071E1A]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Built for every role</p>
            <h2 className="mt-4 max-w-[840px] text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
              Purpose-built workspaces for every role.
            </h2>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roleWorkspaces.map((workspace) => {
                const Icon = workspace.icon
                return (
                  <article key={workspace.title} className="rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E8F3EB] text-[#064537]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#071E1A]">{workspace.title}</h3>
                    <ul className="mt-4 grid gap-2">
                      {workspace.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-6 text-[#5B6B64]">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[#006B4D]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">One journey from enquiry to registration</p>
            <h2 className="mt-4 text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">One journey from enquiry to registration.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4 xl:grid-cols-6">
              {journeyStages.map((stage, index) => (
                <button key={stage} type="button" className="relative rounded-[22px] border border-[#0A3028]/8 bg-white p-5 text-left shadow-[0_18px_54px_rgba(5,8,7,0.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(5,8,7,0.08)]">
                  {index < journeyStages.length - 1 ? <span className="absolute right-[-18px] top-1/2 hidden h-px w-9 bg-[#0A3028]/14 md:block" /> : null}
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">Stage {index + 1}</p>
                  <h3 className="mt-5 text-xl font-extrabold text-[#071E1A]">{stage}</h3>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Platform capabilities</p>
            <h2 className="mt-4 max-w-[850px] text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
              Everything needed to run modern property transactions.
            </h2>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformCapabilities.map((capability) => {
                const Icon = capability.icon
                return (
                  <article key={capability.title} className="rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E8F3EB] text-[#064537]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#071E1A]">{capability.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{capability.copy}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Why Arch9 is different</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Most software manages a task. Arch9 manages the journey.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {softwareComparison.map((item) => (
                <div key={item.title} className={`rounded-[20px] border p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)] ${item.title === 'Arch9' ? 'border-[#006B4D]/18 bg-[#064537] text-white sm:col-span-2' : 'border-[#0A3028]/8 bg-white'}`}>
                  <TrendingUp className={`h-5 w-5 ${item.title === 'Arch9' ? 'text-[#86E4C2]' : 'text-[#006B4D]'}`} />
                  <h3 className={`mt-4 text-lg font-extrabold ${item.title === 'Arch9' ? 'text-white' : 'text-[#071E1A]'}`}>{item.title}</h3>
                  <p className={`mt-2 text-sm font-medium leading-6 ${item.title === 'Arch9' ? 'text-white/76' : 'text-[#5B6B64]'}`}>{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Visibility across your entire business</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Know exactly what is happening.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-[#5B6B64]">
                See agency performance, attorney capacity, bond applications and development sales from one connected operating layer.
              </p>
            </div>
            <IntelligenceVisual />
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Pricing</p>
            <h2 className="mt-4 max-w-[780px] text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
              Flexible pricing for every role.
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className="rounded-[26px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  <h3 className="text-2xl font-extrabold text-[#071E1A]">{plan.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#5B6B64]">{plan.ideal}</p>
                  <p className="mt-6 text-[2.6rem] font-extrabold tracking-[-0.05em] text-[#071E1A]">
                    {plan.price}
                    {plan.suffix ? <span className="block text-sm font-bold tracking-[-0.01em] text-[#5B6B64]">{plan.suffix}</span> : null}
                  </p>
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
              <p className="text-sm font-extrabold text-[#071E1A]">Add-on services</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {addOnServices.map((service) => (
                  <div key={service} className="rounded-[16px] bg-[#F8F4EC] px-4 py-3 text-sm font-bold text-[#31433D]">{service}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Customer stories from across the ecosystem.</h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-4">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.role} className="rounded-[26px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
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
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 rounded-[26px] bg-[linear-gradient(135deg,#05352D,#08221D)] p-7 text-white shadow-[0_24px_80px_rgba(5,8,7,0.16)] md:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Final vision</p>
              <h2 className="mt-4 text-[2.2rem] font-extrabold tracking-[-0.04em]">Property transactions should feel connected.</h2>
              <p className="mt-3 max-w-[780px] text-sm font-medium leading-7 text-white/82 md:text-base">
                The future of property isn't another portal, another CRM or another workflow tool. It's one connected experience from first enquiry to final registration.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[52px] justify-center px-7">
                Book A Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#solutions" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/24 px-7 text-sm font-extrabold text-white transition hover:bg-white/10">
                Explore Solutions
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
