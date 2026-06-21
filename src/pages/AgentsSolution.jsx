import { useEffect } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ClipboardList,
  Eye,
  Home,
  Landmark,
  Rocket,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const heroImage =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=84'

const pipelineSteps = [
  { label: 'Property Listed', detail: 'New listing', icon: Home, done: true },
  { label: 'Buyer Enquiry', detail: 'New lead received', icon: Users, done: true },
  { label: 'Listing Agreement', detail: 'Agreement signed', icon: ClipboardList, done: true },
  { label: 'Offer Received', detail: 'Offer from buyer', icon: CheckCircle2, done: true },
  { label: 'Transfer', detail: 'Attorney instructed', icon: BriefcaseBusiness, active: true },
  { label: 'Registration', detail: 'Documents preparing', icon: ShieldCheck },
  { label: 'Registration Complete', detail: 'Transfer successful', icon: Check },
]

const trustIndicators = [
  { icon: Users, title: 'More leads', copy: 'Attract and convert serious buyers.' },
  { icon: Zap, title: 'Faster deals', copy: 'Smart buyer matching and automation.' },
  { icon: Home, title: 'More commission', copy: 'Close more deals and increase earnings.' },
]

const agentFeatures = [
  {
    icon: UserRound,
    title: 'Generate more leads',
    copy: 'List on Arch9 and get in front of serious buyers actively looking to purchase.',
  },
  {
    icon: Home,
    title: 'Match buyers to properties',
    copy: 'Connect buyers to the right properties, automatically.',
  },
  {
    icon: ClipboardList,
    title: 'Track transactions',
    copy: 'See every step in one place, from instruction to transfer with full status and visibility.',
  },
  {
    icon: WalletCards,
    title: 'Get paid faster',
    copy: 'Reduce delays, save on commission advances and reach your financial goals.',
  },
]

const marketplaceStats = [
  { icon: Users, value: '2,450+', label: 'Active agents' },
  { icon: Home, value: '18,600+', label: 'Properties listed' },
  { icon: Eye, value: '320K+', label: 'Monthly views' },
  { icon: WalletCards, value: 'R2.1B+', label: 'Value transacted' },
]

const successStories = [
  {
    status: 'Sold',
    title: '4 Bedroom House',
    area: 'Claremont, Cape Town',
    metric: '12',
    detail: 'Days to offer',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=82',
  },
  {
    status: 'Transferred',
    title: '2 Bedroom Apartment',
    area: 'Umhlanga, Durban',
    metric: '2',
    detail: 'Months to transfer',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=82',
  },
  {
    status: 'Registered',
    title: '3 Bedroom Apartment',
    area: 'Sandton, JHB',
    metric: '1',
    detail: 'Month to registration',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=82',
  },
]

const agencyLogos = ['RE/MAX', 'Harcourts', 'Pam Golding', 'Century 21', 'Just Property', 'Leapfrog', 'KW Agents']

const ecosystemCards = [
  {
    icon: Users,
    title: 'Buyers & Sellers',
    copy: 'Track progress from enquiry to registration.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Agents & Agencies',
    copy: 'Manage leads, listings and transactions.',
  },
  {
    icon: Landmark,
    title: 'Attorneys & Finance',
    copy: 'Manage matters and applications.',
  },
  {
    icon: ShieldCheck,
    title: 'Shared Workspace',
    copy: 'One transaction. One source of truth.',
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
    <div className="relative min-h-[480px] overflow-hidden rounded-[34px] bg-[#101828] shadow-[0_34px_100px_rgba(16,24,40,0.16)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(16,24,40,0.14),rgba(16,24,40,0.02)),url(${heroImage})`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.3),transparent_28%),linear-gradient(180deg,rgba(16,24,40,0)_42%,rgba(16,24,40,0.16)_100%)]" />

      <div className="relative flex min-h-[480px] items-center justify-center p-5 md:p-8">
        <div className="w-full max-w-[340px] rounded-[28px] border border-black/[0.06] bg-white/94 p-5 text-[#101828] shadow-[0_28px_80px_rgba(16,24,40,0.18)] backdrop-blur-xl">
          <p className="text-sm font-extrabold tracking-[-0.02em]">Your transaction pipeline</p>
          <div className="mt-5 grid gap-3">
            {pipelineSteps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.label} className={`flex items-center gap-3 rounded-[16px] px-3 py-2.5 ${step.active ? 'bg-[#F1F5F2]' : ''}`}>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      step.done ? 'bg-[#0D4F45] text-white' : step.active ? 'bg-[#E7E0D3] text-[#6B6359]' : 'bg-[#F2EEE7] text-[#7C827E]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-extrabold text-[#101828]">{step.label}</span>
                    <span className="block text-[11px] font-semibold text-[#667085]">{step.detail}</span>
                  </span>
                  {step.done ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#0D4F45]/24 text-[#0D4F45]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>

        <div className="absolute right-4 top-[26%] hidden w-[150px] rounded-[20px] border border-black/[0.06] bg-white/94 p-5 text-[#101828] shadow-[0_22px_66px_rgba(16,24,40,0.16)] backdrop-blur-xl sm:block">
          <p className="text-3xl font-extrabold tracking-[-0.05em]">14</p>
          <p className="mt-1 text-xs font-bold text-[#344054]">Active buyers</p>
          <p className="mt-1 text-[11px] font-semibold text-[#667085]">Interested in your listings</p>
        </div>
        <div className="absolute right-10 top-[47%] hidden w-[132px] rounded-[20px] border border-black/[0.06] bg-white/94 p-5 text-[#101828] shadow-[0_22px_66px_rgba(16,24,40,0.16)] backdrop-blur-xl md:block">
          <p className="text-3xl font-extrabold tracking-[-0.05em]">3</p>
          <p className="mt-1 text-xs font-bold text-[#344054]">Offers</p>
          <p className="mt-1 text-[11px] font-semibold text-[#667085]">Under review</p>
        </div>
        <div className="absolute bottom-[15%] right-[13%] hidden w-[155px] rounded-[20px] border border-black/[0.06] bg-white/94 p-5 text-[#101828] shadow-[0_22px_66px_rgba(16,24,40,0.16)] backdrop-blur-xl md:block">
          <p className="text-3xl font-extrabold tracking-[-0.05em]">R2.1m</p>
          <p className="mt-1 text-xs font-bold text-[#344054]">Value transacted</p>
          <p className="mt-1 text-[11px] font-semibold text-[#667085]">This month</p>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ feature }) {
  const Icon = feature.icon
  return (
    <article className="group rounded-[18px] border border-black/[0.06] bg-white p-7 shadow-[0_18px_52px_rgba(16,24,40,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(16,24,40,0.08)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F2EEE7] text-[#101828] transition group-hover:bg-[#E7F0EA] group-hover:text-[#0D4F45]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-8 text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#101828]">{feature.title}</h3>
      <p className="mt-4 text-sm font-medium leading-7 text-[#475467]">{feature.copy}</p>
    </article>
  )
}

function MetricsPanel() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid min-w-[760px] grid-cols-4 rounded-[18px] border border-black/[0.06] bg-white px-7 py-8 shadow-[0_18px_54px_rgba(16,24,40,0.04)]">
        {marketplaceStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className={`flex items-center gap-5 ${index ? 'border-l border-black/[0.08] pl-8' : ''}`}>
              <Icon className="h-7 w-7 text-[#0D4F45]" />
              <div>
                <p className="text-3xl font-extrabold tracking-[-0.045em] text-[#0D4F45]">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-[#344054]">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SuccessCard({ story }) {
  return (
    <article className="min-w-[240px] overflow-hidden rounded-[16px] border border-black/[0.06] bg-white shadow-[0_18px_52px_rgba(16,24,40,0.05)] lg:min-w-0">
      <div
        className="relative h-36 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg,rgba(16,24,40,0.02),rgba(16,24,40,0.08)),url(${story.image})`,
        }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-[#0D4F45] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
          {story.status}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-sm font-extrabold text-[#101828]">{story.title}</h3>
        <p className="mt-1 text-xs font-semibold text-[#667085]">{story.area}</p>
        <div className="mt-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-extrabold tracking-[-0.05em] text-[#101828]">{story.metric}</p>
            <p className="text-xs font-semibold text-[#475467]">{story.detail}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0D4F45]/30 text-[#0D4F45]">
            <Check className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  )
}

function TestimonialCard() {
  return (
    <blockquote className="rounded-[20px] border border-black/[0.06] bg-white p-8 shadow-[0_18px_52px_rgba(16,24,40,0.05)] md:p-10">
      <p className="text-6xl font-serif leading-none text-[#0D4F45]/42">“</p>
      <p className="mt-1 text-2xl font-semibold leading-9 tracking-[-0.035em] text-[#101828]">
        Arch9 has completely changed the way I run my business. My transactions move faster, my clients are happier and I get paid sooner.
      </p>
      <footer className="mt-8 flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=82"
          alt="Thandeka van der Merwe"
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-extrabold text-[#101828]">Thandeka van der Merwe</p>
          <p className="mt-1 text-xs font-semibold text-[#667085]">Top Agent</p>
        </div>
      </footer>
      <div className="mt-7 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-[#0D4F45]" />
        <span className="h-2 w-2 rounded-full bg-[#D0D5DD]" />
        <span className="h-2 w-2 rounded-full bg-[#D0D5DD]" />
      </div>
    </blockquote>
  )
}

function AgencyTrustBar() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-8 md:pb-20">
      <p className="text-xs font-semibold text-[#667085]">Proudly supporting agents across South Africa.</p>
      <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-7">
        {agencyLogos.map((logo) => (
          <div key={logo} className="text-lg font-extrabold tracking-[-0.04em] text-[#101828]/38 transition hover:text-[#101828]">
            {logo}
          </div>
        ))}
      </div>
    </div>
  )
}

function EcosystemSection() {
  return (
    <section className="px-6 pb-16 md:px-8 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 rounded-[22px] border border-black/[0.06] bg-white p-7 shadow-[0_18px_54px_rgba(16,24,40,0.04)] md:p-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="max-w-[360px] text-3xl font-extrabold leading-tight tracking-[-0.045em] text-[#101828]">
            Built for every stakeholder in the transaction.
          </h2>
          <p className="mt-4 max-w-[420px] text-sm font-medium leading-7 text-[#667085]">
            Arch9 connects the people around each deal without turning the agents page into another platform overview.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystemCards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className="border-t border-black/[0.08] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <Icon className="h-6 w-6 text-[#0D4F45]" />
                <h3 className="mt-5 text-sm font-extrabold text-[#101828]">{card.title}</h3>
                <p className="mt-3 text-xs font-medium leading-6 text-[#667085]">{card.copy}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function AgentsSolution() {
  useEffect(() => {
    document.title = 'For Estate Agents | Arch9'
    setMetaDescription(
      'Arch9 helps estate agents generate more enquiries, manage listings and move transactions from offer to registration in one connected workspace.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#101828]">
      <Header />
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-10 pt-[128px] md:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-14">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0D4F45]">For agents</p>
            <h1 className="mt-5 max-w-[700px] text-[3.4rem] font-extrabold leading-[0.96] tracking-[-0.04em] text-[#101828] md:text-[5rem]">
              Turn listings into <span className="text-[#0D4F45]">registrations.</span>
            </h1>
            <p className="mt-6 max-w-[620px] text-lg font-medium leading-8 text-[#344054]">
              Generate enquiries, qualify buyers and manage every transaction from listing to registration - all in one place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/sell"
                className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#0D4F45] px-7 text-sm font-extrabold !text-white shadow-[0_18px_44px_rgba(13,79,69,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0A4038] sm:w-auto"
              >
                List A Property
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full border border-black/[0.16] bg-white/58 px-7 text-sm font-extrabold text-[#101828] transition hover:bg-white sm:w-auto"
              >
                Book A Demo
              </a>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {trustIndicators.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className={`group flex items-start gap-4 ${index ? 'sm:border-l sm:border-black/[0.08] sm:pl-6' : ''}`}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#101828] shadow-[0_12px_32px_rgba(16,24,40,0.05)] transition group-hover:text-[#0D4F45]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#101828]">{item.title}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#475467]">{item.copy}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <HeroVisual />
        </section>

        <section className="px-6 py-12 md:px-8 md:py-14">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="mx-auto max-w-[760px] text-center text-[2.2rem] font-extrabold leading-tight tracking-[-0.04em] text-[#101828] md:text-[3rem]">
              Everything an agent needs to close more deals.
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {agentFeatures.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto w-full max-w-[1280px]">
            <MetricsPanel />
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[#101828]">Recent success from agents like you.</h2>
              <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
                {successStories.map((story) => (
                  <SuccessCard key={story.title} story={story} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[#101828]">Trusted by top performing agents.</h2>
              <div className="mt-7">
                <TestimonialCard />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-8 md:px-8 md:pb-10">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7 rounded-[22px] bg-[#111827] p-7 text-white shadow-[0_26px_80px_rgba(16,24,40,0.16)] md:flex-row md:items-center md:justify-between md:p-9">
            <div className="flex items-center gap-6">
              <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-[18px] bg-white text-[#0D4F45] sm:flex">
                <Rocket className="h-9 w-9" />
              </div>
              <div>
                <h2 className="text-[2rem] font-extrabold tracking-[-0.04em] md:text-[2.6rem]">Ready to grow your business?</h2>
                <p className="mt-2 max-w-[760px] text-sm font-medium leading-6 text-white/78 md:text-base">
                  Join agents who are generating more enquiries and closing more deals with Arch9.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href="/sell" className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0D4F45] px-7 text-sm font-extrabold !text-white transition hover:bg-[#0A4038] sm:w-auto">
                List A Property
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/28 px-7 text-sm font-extrabold text-white transition hover:bg-white/10 sm:w-auto">
                Book A Demo
              </a>
            </div>
          </div>
        </section>

        <AgencyTrustBar />
        <EcosystemSection />
      </main>
      <Footer />
    </div>
  )
}
