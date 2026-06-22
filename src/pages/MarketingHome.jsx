import { useEffect } from 'react'
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  Home,
  Landmark,
  LineChart,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp } from '../components/motion/Reveal'
import { developments, formatDevelopmentPrice } from '../data/developments'

const heroImage =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=82'

const pathImage =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=82'

const finalCtaImage =
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=82'

const heroBenefits = [
  { title: 'End-to-end visibility', icon: Eye },
  { title: 'Stronger relationships', icon: MessageCircle },
  { title: 'More efficiency', icon: Clock3 },
  { title: 'Better outcomes', icon: CheckCircle2 },
]

const discoveryCards = [
  {
    title: 'Smart Search',
    copy: 'Browse residential, commercial and development opportunities under Buy.',
    icon: Search,
    href: '/properties',
  },
  {
    title: 'Calculators',
    copy: 'Estimate affordability, repayments, transfer costs and investment returns.',
    icon: LineChart,
    href: '/tools/buyers',
  },
  {
    title: 'Buying Guides',
    copy: 'Understand the journey from first search to final registration.',
    icon: FileCheck2,
    href: '/buyer-guides',
  },
  {
    title: 'Market Insights',
    copy: 'Use area intelligence and local market context before you decide.',
    icon: Landmark,
    href: '/property-intelligence',
  },
  {
    title: 'Saved Alerts',
    copy: 'Prepare for saved searches, updates and buyer journey notifications.',
    icon: Bell,
    href: '/alerts',
  },
]

const professionalCards = [
  {
    title: 'Agent Dashboard',
    copy: 'Manage active deals, tasks, offers and client communication in one place.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Buyer Portal',
    copy: 'Keep buyers informed with next steps, requests and transaction progress.',
    icon: Home,
  },
  {
    title: 'Seller Portal',
    copy: 'Give sellers transparent updates without endless manual follow-up.',
    icon: Users,
  },
  {
    title: 'Transaction Tracking',
    copy: 'See every milestone from offer acceptance through registration.',
    icon: CheckCircle2,
  },
]

const enterpriseCards = [
  {
    title: 'Branded Portals',
    copy: 'Your brand. Your client experience.',
    icon: Sparkles,
  },
  {
    title: 'Automated Updates',
    copy: 'Keep clients informed automatically.',
    icon: MessageCircle,
  },
  {
    title: 'Real-Time Tracking',
    copy: 'Complete visibility at every step.',
    icon: Eye,
  },
  {
    title: 'Stronger Relationships',
    copy: 'Build trust and increase referrals.',
    icon: ShieldCheck,
  },
]

const transactionRoles = [
  { label: 'Buyer', icon: Home },
  { label: 'Seller', icon: Users },
  { label: 'Agent', icon: BriefcaseBusiness },
  { label: 'Attorney', icon: Landmark },
  { label: 'Bond Originator', icon: LineChart },
  { label: 'Bank', icon: Building2 },
  { label: 'Deeds Office', icon: FileCheck2 },
]

const featuredDevelopmentCards = developments.slice(0, 3)

function DashboardMockup() {
  const stages = [
    ['Offer accepted', 'Complete'],
    ['Bond application', 'In review'],
    ['Transfer instruction', 'Active'],
    ['Guarantees', 'Next'],
  ]

  return (
    <div className="relative">
      <div className="absolute -left-8 top-10 hidden rounded-[20px] border border-[#0A3028]/8 bg-white/88 p-4 shadow-[0_24px_70px_rgba(3,18,15,0.14)] backdrop-blur-xl md:block">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0E6A55]">Client updates</p>
        <p className="mt-2 text-2xl font-extrabold tracking-[-0.05em] text-[#062D25]">94%</p>
        <p className="text-xs font-semibold text-[#667085]">sent automatically</p>
      </div>

      <div className="overflow-hidden rounded-[34px] border border-[#0A3028]/10 bg-white shadow-[0_34px_110px_rgba(3,18,15,0.16)]">
        <div className="flex items-center justify-between border-b border-[#0A3028]/8 bg-[#FBF8F1] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0D4F45]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#D8C5A5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#A9C98B]" />
          </div>
          <span className="rounded-full bg-[#E8F5EE] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#064E3B]">
            Live transaction
          </span>
        </div>

        <div className="grid gap-5 p-5 md:p-7">
          <div className="rounded-[26px] bg-[#062D25] p-6 text-white">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#86E4C2]">Registration pipeline</p>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl font-extrabold tracking-[-0.05em]">Ridge Estate transfer</h3>
                <p className="mt-2 text-sm font-medium text-white/68">Agent, attorney, buyer and finance partner aligned.</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-3xl font-extrabold">68%</p>
                <p className="text-xs font-bold text-white/62">complete</p>
              </div>
            </div>
            <div className="mt-6 h-2 rounded-full bg-white/12">
              <div className="h-2 w-[68%] rounded-full bg-[#86E4C2]" />
            </div>
          </div>

          <div className="grid gap-3">
            {stages.map(([label, status]) => (
              <div key={label} className="flex items-center justify-between rounded-[18px] border border-[#0A3028]/8 bg-[#FCFBF8] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5EE] text-[#064E3B]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-extrabold text-[#062D25]">{label}</span>
                </div>
                <span className="text-xs font-bold text-[#667085]">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-7 right-4 hidden rounded-[22px] border border-[#0A3028]/8 bg-white/92 p-5 shadow-[0_24px_70px_rgba(3,18,15,0.14)] backdrop-blur-xl lg:block">
        <p className="text-3xl font-extrabold tracking-[-0.05em] text-[#062D25]">15,000+</p>
        <p className="mt-1 text-xs font-bold text-[#667085]">transactions active</p>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F2] px-6 pb-20 pt-[128px] md:px-8 md:pb-24 md:pt-[150px]">
      <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(90deg,#F8F6F2 0%,rgba(248,246,242,0.78) 18%,rgba(248,246,242,0.18) 46%), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1320px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <FadeUp>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">Transaction operating system</p>
          <h1 className="mt-5 max-w-[720px] text-[3.1rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#062D25] md:text-[5.2rem]">
            Power your business.
            <span className="block">Deliver every transaction with confidence.</span>
          </h1>
          <p className="mt-6 max-w-[650px] text-lg font-medium leading-8 text-[#4B5B55] md:text-xl md:leading-9">
            One connected platform to manage, communicate and move every deal forward from offer to registration.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/platform" className="bridge-button-primary justify-center px-8">
              Explore the Platform
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/contact" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#0A3028]/18 bg-white px-8 text-base font-extrabold text-[#062D25] shadow-[0_16px_42px_rgba(3,18,15,0.05)] transition hover:-translate-y-0.5 hover:border-[#0D4F45]/28">
              Book a Demo
            </a>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {heroBenefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="flex items-center gap-3 rounded-full border border-[#0A3028]/8 bg-white/80 px-4 py-3 shadow-[0_12px_32px_rgba(3,18,15,0.045)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5EE] text-[#064E3B]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-extrabold text-[#062D25]">{benefit.title}</span>
                </div>
              )
            })}
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <DashboardMockup />
        </FadeUp>
      </div>
    </section>
  )
}

function PathSection() {
  return (
    <section className="bg-[#F2EDE3] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <FadeUp className="mx-auto max-w-[820px] text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">Choose your path</p>
          <h2 className="mt-4 text-[2.4rem] font-extrabold leading-[1] tracking-[-0.05em] text-[#062D25] md:text-[3.7rem]">
            Where are you on your property journey?
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <a href="/properties" className="group grid overflow-hidden rounded-[30px] border border-[#0A3028]/8 bg-white shadow-[0_24px_80px_rgba(3,18,15,0.07)] transition duration-300 hover:-translate-y-1 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="p-7 md:p-9">
              <span className="flex h-13 w-13 items-center justify-center rounded-[17px] bg-[#E8F5EE] text-[#064E3B]">
                <Home className="h-6 w-6" />
              </span>
              <h3 className="mt-8 text-3xl font-extrabold tracking-[-0.05em] text-[#062D25]">Buy Property</h3>
              <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">
                Browse properties, developments, calculators and buyer resources.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#0E6A55]">
                Explore Property
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
            <div
              className="min-h-[280px]"
              style={{
                backgroundImage: `linear-gradient(180deg,rgba(6,45,37,0.08),rgba(6,45,37,0.34)), url(${pathImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </a>

          <a href="/platform" className="group grid overflow-hidden rounded-[30px] border border-[#0A3028]/8 bg-[#062D25] text-white shadow-[0_24px_80px_rgba(3,18,15,0.12)] transition duration-300 hover:-translate-y-1 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="p-7 md:p-9">
              <span className="flex h-13 w-13 items-center justify-center rounded-[17px] bg-white/10 text-[#86E4C2]">
                <BriefcaseBusiness className="h-6 w-6" />
              </span>
              <h3 className="mt-8 text-3xl font-extrabold tracking-[-0.05em]">Grow Your Property Business</h3>
              <p className="mt-4 text-base font-medium leading-7 text-white/72">
                Deliver a world-class transaction experience from offer to registration.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#86E4C2]">
                Explore Platform
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
            <div className="min-h-[280px] bg-[#F8F6F2] p-5">
              <DashboardMockup />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

function BuyerSellerSection() {
  return (
    <section className="bg-[#F8F6F2] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <FadeUp className="max-w-[560px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">For buyers and sellers</p>
            <h2 className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.7rem]">
              Find. Explore.
              <span className="block">Decide with confidence.</span>
            </h2>
            <p className="mt-5 max-w-[520px] text-base leading-8 text-[#61584D] md:text-lg">
              Property discovery now lives under Buy, with listings, developments, resources and practical calculators in one connected journey.
            </p>
            <a href="/developments" className="bridge-button-primary mt-7 w-full sm:w-fit">
              View developments
              <ArrowRight className="h-4 w-4" />
            </a>
          </FadeUp>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:overflow-visible">
            {featuredDevelopmentCards.map((development) => (
              <a
                key={development.slug}
                href={`/developments/${development.slug}`}
                className="group relative min-w-[78%] snap-start overflow-hidden rounded-[30px] border border-[rgba(6,45,37,0.08)] bg-[#071E1A] shadow-[0_18px_54px_rgba(3,18,15,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(3,18,15,0.16)] sm:min-w-[56%] lg:min-w-0 lg:flex-1"
              >
                <div
                  className="relative flex h-[320px] items-end p-5"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.06) 0%, rgba(5,18,15,0.72) 100%), url(${development.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute left-5 top-5 rounded-full border border-white/18 bg-white/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                    {development.status}
                  </div>
                  <div className="relative w-full rounded-[24px] border border-white/12 bg-[rgba(7,30,26,0.72)] p-5 text-white backdrop-blur-xl">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#86E4C2]">{development.stage}</p>
                    <h3 className="mt-2 text-[1.45rem] font-extrabold leading-[1] tracking-[-0.04em]">{development.title}</h3>
                    <p className="mt-2 text-sm text-white/75">{development.area}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-sm font-bold">{formatDevelopmentPrice(development)}</span>
                      <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#86E4C2]">
                        {development.availableUnits} units
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {discoveryCards.map((card) => {
            const Icon = card.icon
            return (
              <a key={card.title} href={card.href} className="group rounded-[22px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(3,18,15,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(3,18,15,0.09)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E8F5EE] text-[#064E3B]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-extrabold tracking-[-0.04em] text-[#062D25]">{card.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">{card.copy}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0E6A55]">
                  Open
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProfessionalsSection() {
  return (
    <section className="bg-[#F2EDE3] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <FadeUp>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">For professionals</p>
          <h2 className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.7rem]">
            Everything you need to run better transactions.
          </h2>
          <p className="mt-5 max-w-[640px] text-base font-medium leading-8 text-[#61584D] md:text-lg">
            Powerful tools that help you manage every transaction from offer to registration.
          </p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {professionalCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="rounded-[22px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(3,18,15,0.055)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E8F5EE] text-[#064E3B]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-[-0.04em] text-[#062D25]">{card.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">{card.copy}</p>
                </div>
              )
            })}
          </div>
        </FadeUp>
        <FadeUp delay={0.12}>
          <DashboardMockup />
        </FadeUp>
      </div>
    </section>
  )
}

function TransactionConnectionVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-[32px] border border-[#0A3028]/8 bg-white/72 p-5 shadow-[0_24px_80px_rgba(3,18,15,0.06)] md:p-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {transactionRoles.map((role) => {
          const Icon = role.icon
          return (
            <div key={role.label} className="relative flex flex-col items-center text-center">
              <div className="flex h-15 w-15 items-center justify-center rounded-full border border-[#0A3028]/8 bg-white text-[#064537] shadow-[0_14px_34px_rgba(3,18,15,0.08)]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-3 text-xs font-extrabold text-[#062D25]">{role.label}</p>
            </div>
          )
        })}
      </div>

      <div className="mx-auto mt-8 max-w-[760px]">
        <div className="mx-auto h-8 w-px bg-[#0A3028]/14" />
        <div className="mx-auto flex min-h-[58px] max-w-[440px] items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#05352D,#08221D)] px-8 text-sm font-extrabold text-white shadow-[0_22px_64px_rgba(3,18,15,0.18)]">
          <CheckCircle2 className="h-5 w-5 text-[#A9C98B]" />
          Shared Transaction
        </div>
        <div className="mx-auto h-8 w-px bg-[#0A3028]/14" />
        <div className="mx-auto flex min-h-[54px] max-w-[250px] items-center justify-center gap-3 rounded-full border border-[#0A3028]/8 bg-white px-8 text-sm font-extrabold text-[#062D25] shadow-[0_16px_42px_rgba(3,18,15,0.06)]">
          <CheckCircle2 className="h-5 w-5 text-[#4D7D35]" />
          Registration
        </div>
      </div>
    </div>
  )
}

function SharedTransactionSection() {
  return (
    <section className="bg-[#F8F6F2] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-center">
        <FadeUp>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">One transaction. Every stakeholder.</p>
          <h2 className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.4rem]">
            One transaction.
            <span className="block">Every stakeholder.</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-base font-medium leading-8 text-[#4B5B55] md:text-lg">
            A connected journey for everyone involved in the transaction.
          </p>
          <a href="/platform" className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#0A3028]/18 bg-white px-7 text-sm font-extrabold text-[#062D25] transition hover:border-[#0D4F45]/28">
            View How It Works
            <ArrowRight className="h-4 w-4" />
          </a>
        </FadeUp>

        <TransactionConnectionVisual />
      </div>
    </section>
  )
}

function EnterpriseExperienceSection() {
  return (
    <section className="bg-[#F2EDE3] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <FadeUp className="mx-auto max-w-[860px] text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">Enterprise-level experience</p>
          <h2 className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.6rem]">
            Every agency deserves a world-class client experience.
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-base font-medium leading-8 text-[#61584D] md:text-lg">
            Large brands spend millions building technology. Arch9 makes that experience accessible to every agency.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {enterpriseCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.title} className="rounded-[24px] border border-[#0A3028]/8 bg-white p-7 shadow-[0_20px_60px_rgba(3,18,15,0.06)]">
                <span className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-[#E8F5EE] text-[#064E3B]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.045em] text-[#062D25]">{card.title}</h3>
                <p className="mt-4 text-base font-medium leading-7 text-[#667085]">{card.copy}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="bg-[#F8F6F2] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] overflow-hidden rounded-[30px] border border-[#0A3028]/8 bg-white shadow-[0_24px_80px_rgba(3,18,15,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">Ready when you are</p>
          <h2 className="mt-4 max-w-[640px] text-[2.3rem] font-extrabold leading-[1] tracking-[-0.05em] text-[#062D25] md:text-[3.6rem]">
            Ready to modernise your property business?
          </h2>
          <p className="mt-5 max-w-[620px] text-base font-medium leading-8 text-[#4B5B55] md:text-lg">
            Join agencies using Arch9 to connect, collaborate and close transactions with confidence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/contact" className="bridge-button-primary justify-center px-8">
              Book a Demo
            </a>
            <a href="/solutions/platform" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#0A3028]/22 bg-white px-8 text-sm font-extrabold text-[#062D25] transition hover:bg-[#F7F3EA]">
              Explore Solutions
            </a>
          </div>
        </div>
        <div
          className="min-h-[360px]"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(255,255,255,0.15),rgba(6,45,37,0.14)), url(${finalCtaImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </section>
  )
}

function MarketingHome() {
  useEffect(() => {
    document.title = 'Arch9 | Property Transaction Operating System'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Arch9 powers property transactions from search to registration with one connected platform for agencies, agents, attorneys, bond originators, buyers and sellers.'
    )
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#062D25]">
      <Header />

      <main>
        <HeroSection />
        <PathSection />
        <BuyerSellerSection />
        <ProfessionalsSection />
        <SharedTransactionSection />
        <EnterpriseExperienceSection />
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  )
}

export default MarketingHome
