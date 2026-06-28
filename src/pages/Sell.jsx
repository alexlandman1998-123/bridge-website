import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  Circle,
  ClipboardCheck,
  FileText,
  Flag,
  Handshake,
  HeartHandshake,
  Home,
  KeyRound,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/motion/Reveal'

const propertyImage = 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85'
const listingImage = 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80'
const agencyImage = 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85'

const heroJourney = [
  { label: 'Property Listed', detail: 'Your listing is live', icon: Home, complete: true },
  { label: 'Buyer Enquiry', detail: 'Buyer shows interest', icon: Search, complete: true },
  { label: 'Offer Accepted', detail: 'The deal is agreed', icon: Handshake, complete: true },
  { label: 'Bond Approved', detail: 'Finance is secured', icon: WalletCards, complete: true },
  { label: 'Transfer', detail: 'In progress', icon: FileText, active: true },
  { label: 'Registration', detail: 'Awaiting lodgement', icon: ClipboardCheck },
  { label: 'Sold', detail: 'Completed', icon: BadgeCheck },
]

const marketplaceLoop = [
  {
    title: 'More Listings',
    copy: 'Great properties attract attention.',
    icon: Home,
  },
  {
    title: 'More Buyers',
    copy: 'More choice brings more buyers in.',
    icon: UsersRound,
  },
  {
    title: 'More Transactions',
    copy: 'More activity creates more successful deals.',
    icon: FileText,
  },
  {
    title: 'Stronger for everyone',
    copy: 'A better experience for agents, buyers and sellers.',
    icon: HeartHandshake,
  },
]

const oldWaySteps = [
  { label: 'Property Listed', icon: Home },
  { label: 'Buyer clicks Enquire', icon: Search },
  { label: 'Email sent', icon: Mail },
  { label: 'Phone calls', icon: Phone },
  { label: 'WhatsApp', icon: MessageCircle },
  { label: 'Chaos', icon: X },
]

const arch9WaySteps = [
  { label: 'Property Listed', icon: Home },
  { label: 'Buyer Enquiry', icon: Search },
  { label: 'Buyer Onboarding', icon: UsersRound },
  { label: 'Finance', icon: WalletCards },
  { label: 'Transfer', icon: FileText },
  { label: 'Registration', icon: ClipboardCheck },
  { label: 'Sold', icon: HeartHandshake },
]

const foundingBenefits = [
  { copy: 'Listings included with your Arch9 agency workspace', icon: Home },
  { copy: 'Direct access to the founders', icon: UsersRound },
  { copy: 'Early access to new features', icon: Sparkles },
  { copy: 'Influence the product roadmap', icon: Flag },
  { copy: 'Founding Agency recognition', icon: Award },
]

const transactionMilestones = [
  { title: 'Browse', copy: 'Buyers discover your property.', icon: Home },
  { title: 'Enquire', copy: 'They show interest.', icon: Search },
  { title: 'Offer', copy: 'A deal is agreed.', icon: Handshake },
  { title: 'Finance', copy: 'Funding is secured.', icon: WalletCards },
  { title: 'Transfer', copy: 'Documents are prepared.', icon: FileText },
  { title: 'Registration', copy: 'Property is registered.', icon: ClipboardCheck },
  { title: 'Keys Handed Over', copy: 'Journey complete.', icon: KeyRound },
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

function CTAButton({ href, children, variant = 'primary' }) {
  const isPrimary = variant === 'primary'
  return (
    <a
      href={href}
      className={`inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-extrabold transition hover:-translate-y-0.5 hover:scale-[1.01] sm:w-auto ${
        isPrimary
          ? 'bg-[#064537] text-white shadow-[0_18px_42px_rgba(6,69,55,0.22)] hover:bg-[#073B32]'
          : 'border border-[#0A3028]/20 bg-white text-[#071E1A] shadow-[0_12px_34px_rgba(5,8,7,0.04)] hover:border-[#064537]/34'
      }`}
      style={{ color: isPrimary ? '#FFFFFF' : '#071E1A' }}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  )
}

function HeroVisual() {
  return (
    <FadeUp delay={0.1} className="relative">
      <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_30px_90px_rgba(5,8,7,0.13)]">
        <img src={propertyImage} alt="Modern home listed for sale" className="h-[310px] w-full object-cover md:h-[540px]" />
      </div>

      <motion.article
        className="relative z-10 mx-auto -mt-16 w-[88%] max-w-[330px] rounded-[24px] border border-white/80 bg-white p-4 shadow-[0_24px_70px_rgba(5,8,7,0.18)] md:absolute md:bottom-[-22px] md:left-[-20px] md:mx-0"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative overflow-hidden rounded-[18px]">
          <img src={listingImage} alt="Listed property preview" className="h-[128px] w-full object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-[#064537] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
            For Sale
          </span>
        </div>
        <h2 className="mt-4 text-base font-extrabold text-[#071E1A]">4 Bedroom House</h2>
        <p className="mt-1 text-xs font-semibold text-[#5B6B64]">Bryanston</p>
        <p className="mt-4 text-lg font-extrabold text-[#071E1A]">R4,950,000</p>
        <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#5B6B64]">
          <span>4 beds</span>
          <span>3.5 baths</span>
          <span>2 garages</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#064537]/22 text-[#064537]">
            <HeartHandshake className="h-4 w-4" />
          </span>
        </div>
      </motion.article>

      <motion.article
        className="mt-5 rounded-[24px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_24px_70px_rgba(5,8,7,0.12)] md:absolute md:right-[-18px] md:top-[86px] md:mt-0 md:w-[320px]"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-sm font-extrabold text-[#071E1A]">Your transaction journey</p>
        <div className="mt-5 grid gap-2.5">
          {heroJourney.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.label} className={`relative flex items-center gap-3 rounded-[16px] p-2.5 ${step.active ? 'bg-[#F1F7F3]' : ''}`}>
                {index < heroJourney.length - 1 ? <span className="absolute left-[22px] top-[38px] h-[18px] w-px bg-[#0A3028]/10" /> : null}
                <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${step.complete || step.active ? 'bg-[#064537] text-white' : 'bg-[#F2EFE8] text-[#6A716A]'}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-extrabold text-[#071E1A]">{step.label}</span>
                  <span className="mt-0.5 block text-[11px] font-semibold text-[#6A716A]">{step.detail}</span>
                </span>
                {step.complete ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#064537]/28 text-[#064537]">
                    <Check className="h-4 w-4" />
                  </span>
                ) : (
                  <Circle className="h-5 w-5 text-[#0A3028]/20" />
                )}
              </div>
            )
          })}
        </div>
      </motion.article>
    </FadeUp>
  )
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <FadeUp className="mx-auto max-w-[720px] text-center">
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">{eyebrow}</p> : null}
      <h2 className="mt-3 text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">{title}</h2>
      {copy ? <p className="mt-4 text-base font-medium leading-8 text-[#31433D] md:text-lg">{copy}</p> : null}
    </FadeUp>
  )
}

function MomentumSection() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1240px]">
        <SectionIntro
          title="Every journey starts somewhere."
          copy="Every successful marketplace begins with a first listing. More listings attract more buyers. More buyers create more transactions. More successful transactions make the platform stronger for everyone."
        />
        <p className="mt-3 text-center text-sm font-extrabold text-[#064537] md:text-base">That's how we're building Arch9.</p>

        <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-4" stagger={0.08}>
          {marketplaceLoop.map((item, index) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.title}>
                <article className="group relative h-full rounded-[24px] border border-[#0A3028]/8 bg-[#F8F7F4] p-5 text-center shadow-[0_18px_54px_rgba(5,8,7,0.04)] transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(5,8,7,0.08)]">
                  {index < marketplaceLoop.length - 1 ? <ArrowRight className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#0A3028]/42 md:block" /> : null}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#064537] text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-base font-extrabold text-[#071E1A]">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#31433D]">{item.copy}</p>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

function FlowCard({ title, subtitle, steps, footer, tone }) {
  const isArch9 = tone === 'arch9'
  return (
    <article className={`rounded-[24px] border p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-7 ${isArch9 ? 'border-[#064537]/10 bg-[#F1F7F3]' : 'border-[#0A3028]/8 bg-[#F8F7F4]'}`}>
      <div className="text-center">
        <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{title}</h3>
        <p className="mt-2 text-sm font-semibold text-[#5B6B64]">{subtitle}</p>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-[repeat(var(--step-count),minmax(0,1fr))]" style={{ '--step-count': steps.length }}>
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={step.label} className="relative flex items-center gap-3 md:block md:text-center">
              {index < steps.length - 1 ? <ArrowRight className="absolute left-7 top-[42px] h-4 w-4 rotate-90 text-[#0A3028]/34 md:left-auto md:right-[-10px] md:top-6 md:rotate-0" /> : null}
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isArch9 ? 'bg-white text-[#064537]' : 'bg-white text-[#31433D]'}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-extrabold leading-5 text-[#071E1A] md:mt-3">{step.label}</p>
            </div>
          )
        })}
      </div>
      <div className={`mt-8 rounded-[18px] p-4 text-center text-sm font-semibold leading-6 ${isArch9 ? 'bg-white text-[#064537]' : 'bg-white text-[#5B6B64]'}`}>
        {footer}
      </div>
    </article>
  )
}

function ComparisonSection() {
  return (
    <section className="bg-white px-5 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto grid w-full max-w-[1240px] gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <FadeUp>
          <FlowCard
            title="The old way"
            subtitle="Traditional portals stop at the enquiry."
            steps={oldWaySteps}
            footer="Information gets lost. Deals slow down."
          />
        </FadeUp>
        <FadeUp delay={0.08}>
          <FlowCard
            title="The Arch9 way"
            subtitle="We connect the entire journey."
            steps={arch9WaySteps}
            footer="One connected workspace. Everyone stays aligned. More deals reach registration."
            tone="arch9"
          />
        </FadeUp>
      </div>
    </section>
  )
}

function FoundingAgencySection() {
  return (
    <section className="bg-white px-5 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <FadeUp>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Be part of what's next</p>
          <h2 className="mt-4 max-w-[620px] text-[2.25rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#071E1A] md:text-[3.4rem]">
            Join our Founding Agencies.
          </h2>
          <p className="mt-5 max-w-[640px] text-base font-medium leading-8 text-[#31433D] md:text-lg">
            We're inviting a select group of agencies to help shape South Africa's next property platform.
          </p>
          <p className="mt-4 max-w-[640px] text-base font-medium leading-8 text-[#31433D]">
            As a Founding Agency you'll have direct access to the team building Arch9 and help define the future of connected property transactions.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {foundingBenefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.copy} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#E6F3ED] text-[#064537]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-extrabold leading-6 text-[#071E1A]">{benefit.copy}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8">
            <CTAButton href="/contact">Become a Founding Agency</CTAButton>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="relative">
            <img src={agencyImage} alt="Agency team meeting around a table" className="h-[320px] w-full rounded-[28px] object-cover shadow-[0_28px_90px_rgba(5,8,7,0.13)] md:h-[460px]" />
            <div className="mx-auto -mt-12 w-[86%] rounded-[22px] border border-white/80 bg-white p-5 text-center shadow-[0_24px_70px_rgba(5,8,7,0.16)] md:absolute md:bottom-6 md:left-1/2 md:max-w-[360px] md:-translate-x-1/2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#064537]/16 bg-[#E6F3ED] text-[#064537]">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">Founding Agency</h3>
              <p className="mt-1 text-sm font-extrabold text-[#064537]">2026 Cohort</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function TransactionTimeline() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="bg-[#F8F7F4] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1240px]">
        <SectionIntro title="The beginning of every transaction." />
        <div className="relative mt-12">
          <div className="absolute left-6 top-7 bottom-7 w-px bg-[#0A3028]/10 md:left-8 md:right-8 md:top-8 md:bottom-auto md:h-px md:w-auto" />
          <motion.div
            className="absolute left-6 top-7 bottom-7 w-px origin-top bg-[#064537] md:left-8 md:right-8 md:top-8 md:bottom-auto md:h-px md:w-auto md:origin-left"
            initial={shouldReduceMotion ? false : { scaleY: 0, scaleX: 0 }}
            whileInView={shouldReduceMotion ? undefined : { scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <StaggerContainer className="grid gap-5 md:grid-cols-7" stagger={0.07}>
            {transactionMilestones.map((item, index) => {
              const Icon = item.icon
              const isEnd = index === transactionMilestones.length - 1
              return (
                <StaggerItem key={item.title}>
                  <article className="relative grid grid-cols-[50px_1fr] gap-4 md:block md:text-center">
                    <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${isEnd ? 'bg-[#064537] text-white' : 'bg-white text-[#064537] shadow-[0_12px_34px_rgba(5,8,7,0.05)]'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#071E1A] md:mt-5">{item.title}</h3>
                      <p className="mt-2 text-xs font-medium leading-5 text-[#5B6B64]">{item.copy}</p>
                    </div>
                  </article>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

export default function Sell() {
  useEffect(() => {
    document.title = 'Property Listings Should Work Harder | Arch9'
    setMetaDescription('List on Arch9 and turn every buyer enquiry into the beginning of a connected property journey from enquiry to registration.')
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#05120F]">
      <Header />

      <main className="overflow-hidden pt-[96px]">
        <section className="bg-white px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-14">
          <div className="mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <FadeUp>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">For agents</p>
              <h1 className="mt-5 max-w-[680px] text-[3rem] font-extrabold leading-[0.96] tracking-[-0.055em] text-[#071E1A] md:text-[5rem]">
                Property listings should work harder.
              </h1>
              <div className="mt-6 max-w-[620px] space-y-4 text-base font-medium leading-8 text-[#31433D] md:text-lg">
                <p>Property listings have barely changed in twenty years.</p>
                <p>They help buyers discover homes. But after someone clicks <strong className="font-extrabold text-[#071E1A]">Enquire</strong>, the experience becomes fragmented.</p>
                <p>Emails. Phone calls. WhatsApp. Missing documents. Endless follow-ups.</p>
                <p>Arch9 changes that by turning every listing into the beginning of a connected property journey.</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact">List Your Property</CTAButton>
                <CTAButton href="/book-demo" variant="secondary">Book a Demo</CTAButton>
              </div>
            </FadeUp>

            <HeroVisual />
          </div>
        </section>

        <MomentumSection />
        <ComparisonSection />
        <FoundingAgencySection />
        <TransactionTimeline />

        <section className="bg-[#064537] px-5 py-16 text-white md:px-8 md:py-20">
          <FadeUp className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-[760px] text-[2.35rem] font-extrabold leading-[1.05] tracking-[-0.045em] md:text-[4rem]">
                We're building the property platform we wish existed.
              </h2>
              <p className="mt-5 max-w-[720px] text-base font-medium leading-8 text-white/78 md:text-lg">
                Not another listing website. Not another CRM. One connected experience that takes every property journey from the first enquiry to the day the keys change hands.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
              <a href="/contact" className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-extrabold text-[#064537] transition hover:-translate-y-0.5 hover:scale-[1.01]" style={{ color: '#064537' }}>
                List a Property
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full border border-white/28 px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white/8" style={{ color: '#FFFFFF' }}>
                Talk to the Founders
              </a>
            </div>
          </FadeUp>
        </section>
      </main>

      <Footer />
    </div>
  )
}
