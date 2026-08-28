import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, CircleCheck, Home, Play, Plus } from 'lucide-react'
import aboutArchitecture from '../assets/about-architecture-home.jpg'
import familyHome from '../assets/platform/family-home.png'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {
  DashboardPreview,
  ExperienceCard,
  Eyebrow,
  FeatureAccordion,
  HorizontalCarousel,
  PhoneDashboardPreview,
  ProductTabs,
} from '../components/marketing/MarketingProductUI'
import { FadeUp } from '../components/motion/Reveal'
import { motionEaseOut } from '../components/motion/timing'
import {
  clientExperiences,
  corePlatformFeatures,
  marketingMetrics,
  platformCapabilities,
  platformTabs,
  publishingDestinations,
  stakeholders,
} from '../config/marketingHome'
import { itemListJsonLd, setPageSeo, softwareApplicationJsonLd, webPageJsonLd, websiteJsonLd } from '../lib/seo'

const propertyImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=84'

function PrimaryButton({ href, children, light = false, className = '' }) {
  return (
    <a
      href={href}
      style={{ color: light ? '#064537' : '#FFFFFF' }}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-extrabold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        light
          ? 'bg-white text-[#064537] shadow-[0_18px_50px_rgba(0,0,0,0.18)] focus-visible:outline-white'
          : 'bg-[#064537] text-white shadow-[0_18px_44px_rgba(6,69,55,0.2)] focus-visible:outline-[#064537]'
      } ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  )
}

function SecondaryButton({ href, children, light = false, className = '' }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border px-6 text-sm font-extrabold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        light
          ? 'border-white/22 bg-white/5 text-white focus-visible:outline-white'
          : 'border-[#071E1A]/14 bg-white text-[#071E1A] shadow-[0_14px_36px_rgba(7,30,26,0.06)] focus-visible:outline-[#064537]'
      } ${className}`}
    >
      <Play className="h-4 w-4" />
      {children}
    </a>
  )
}

function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(250,245,237,0),#FAF5ED)]" />
      <div className="relative mx-auto grid min-h-[92svh] w-full max-w-[1600px] gap-10 px-5 pb-20 pt-[120px] md:px-8 md:pt-[140px] lg:grid-cols-[0.45fr_0.55fr] lg:items-center lg:gap-12 lg:pb-24 xl:gap-16">
        <FadeUp className="relative z-10 max-w-[760px]">
          <Eyebrow>The real estate operating platform</Eyebrow>
          <h1 className="mt-5 text-[2.55rem] font-bold leading-[1.02] text-[#071E1A] sm:text-[3.1rem] md:text-[3.8rem] lg:text-[4rem] xl:text-[4.1rem]">
            Your entire <span className="md:block">real estate business.</span>
            <span className="block text-[#0B6B50]">One platform.</span>
          </h1>
          <p className="mt-7 max-w-[590px] text-base font-semibold leading-7 text-[#455650] md:text-[1.08rem] md:leading-8">
            Listings. Leads. CRM. Transactions. Buyers. Sellers. Attorneys. Finance. Websites. One connected system.
          </p>
          <p className="mt-4 max-w-[560px] text-sm font-medium leading-7 text-[#6A7873] md:text-base">
            And unlike traditional real estate software, everyone involved in the transaction can actually be connected.
          </p>
          <div className="mt-8 grid gap-3 sm:flex">
            <PrimaryButton href="/book-demo" className="w-full sm:w-auto">Book a Demo</PrimaryButton>
            <SecondaryButton href="/platform" className="w-full sm:w-auto">See the Platform</SecondaryButton>
          </div>
        </FadeUp>

        <FadeUp delay={0.12} className="relative min-w-0">
          <div className="hidden lg:block">
            <DashboardPreview className="-mr-10 xl:-mr-24" />
            <PhoneDashboardPreview className="absolute -bottom-12 right-0 w-[190px] xl:right-[-34px] xl:w-[220px]" />
          </div>
          <div className="relative mt-2 h-[315px] overflow-hidden rounded-[10px] lg:hidden">
            <DashboardPreview compact className="absolute left-0 top-0 w-[680px] max-w-none" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0),white)]" />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function CapabilityItem({ capability }) {
  const Icon = capability.icon
  return (
    <div className="relative flex min-h-[120px] flex-col items-center justify-center text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[#071E1A]/8 bg-white text-[#064537] shadow-[0_10px_30px_rgba(7,30,26,0.05)]">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-xs font-extrabold text-[#071E1A]">{capability.label}</p>
    </div>
  )
}

function PlatformOverview() {
  return (
    <section className="bg-[#FAF5ED] px-5 py-14 md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[0.25fr_0.75fr] lg:items-center">
          <FadeUp>
            <Eyebrow>Built for real estate professionals</Eyebrow>
            <h2 className="mt-4 max-w-[360px] text-[2.25rem] font-extrabold leading-[1.02] text-[#071E1A] md:text-[3rem]">One platform instead of seven.</h2>
            <p className="mt-5 max-w-[390px] text-sm font-medium leading-7 text-[#5E6D67]">
              Everything your agency needs to win more mandates, sell more properties and deliver better client experiences.
            </p>
          </FadeUp>

          <div>
            <div className="relative hidden grid-cols-8 lg:grid">
              <div className="absolute left-[6%] right-[6%] top-6 border-t border-dashed border-[#0B6B50]/24" />
              {platformCapabilities.map((capability) => <CapabilityItem key={capability.label} capability={capability} />)}
            </div>
            <HorizontalCarousel label="Arch9 platform capabilities" itemClassName="basis-[43%] sm:basis-[28%]" className="lg:hidden">
              {platformCapabilities.map((capability) => <CapabilityItem key={capability.label} capability={capability} />)}
            </HorizontalCarousel>
            <p className="mt-5 rounded-[8px] border border-[#071E1A]/8 bg-white px-5 py-4 text-center text-sm font-bold leading-6 text-[#34453F] shadow-[0_14px_34px_rgba(7,30,26,0.05)]">
              And when a deal happens, the buyer, seller, attorney and finance team move into the same transaction. Everyone. Finally connected.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingHighlight() {
  return (
    <section className="relative overflow-hidden bg-[#071E1A] px-5 py-16 text-white md:px-8 md:py-24 lg:min-h-[82svh] lg:py-28">
      <img src={aboutArchitecture} alt="" loading="lazy" className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[44%] object-cover opacity-20 lg:block" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#071E1A_0%,#071E1A_54%,rgba(7,30,26,0.8)_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1500px] gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:items-center lg:gap-20">
        <FadeUp>
          <Eyebrow light>A better way to run your business</Eyebrow>
          <div className="mt-6">
            <p className="text-[8rem] font-extrabold leading-[0.72] text-white md:text-[11rem] lg:text-[13rem] xl:text-[14rem]">R0.</p>
            <p className="mt-5 text-3xl font-extrabold text-[#86E4C2] md:text-4xl">Not a typo.</p>
          </div>
          <p className="mt-7 max-w-[420px] text-lg font-semibold leading-8 text-white/84">
            Run your agency on Arch9 without another monthly software bill.
          </p>
          <p className="mt-4 max-w-[430px] text-sm font-medium leading-7 text-white/62">
            The transaction fee is paid by the buyer or seller, not the agency.
          </p>
          <div className="mt-8 lg:hidden"><FeatureAccordion features={corePlatformFeatures} /></div>
        </FadeUp>

        <FadeUp delay={0.1} className="hidden lg:block">
          <div className="max-w-[760px] rounded-[8px] bg-[#FAF5ED] p-8 text-[#071E1A] shadow-[0_32px_100px_rgba(0,0,0,0.28)] xl:p-10">
            <h3 className="text-xl font-extrabold">Everything included in the core platform</h3>
            <ul className="mt-8 grid grid-cols-2 gap-x-12 gap-y-5">
              {corePlatformFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-bold text-[#3F504A]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0B6B50] text-white"><Check className="h-3 w-3" /></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function PlatformExplorer() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const selectedTab = platformTabs.find((tab) => tab.id === activeTab) || platformTabs[0]
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="platform-explorer" className="bg-white px-5 py-16 md:px-8 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1500px]">
        <FadeUp>
          <h2 className="max-w-[760px] text-[2.65rem] font-extrabold leading-[0.98] text-[#071E1A] md:text-[4.3rem]">Everything you need. All connected.</h2>
        </FadeUp>
        <ProductTabs activeId={activeTab} onChange={setActiveTab} className="mt-9" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.27fr_0.73fr] lg:items-center lg:gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: motionEaseOut }}
              role="tabpanel"
              id={`platform-panel-${selectedTab.id}`}
              aria-labelledby={`platform-tab-${selectedTab.id}`}
            >
              <h3 className="text-2xl font-extrabold leading-tight text-[#071E1A] md:text-3xl">{selectedTab.title}</h3>
              <p className="mt-4 max-w-[430px] text-base font-medium leading-7 text-[#607069]">{selectedTab.copy}</p>
              <a href="/platform" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#0B6B50]">Explore all features <ArrowRight className="h-4 w-4" /></a>
            </motion.div>
          </AnimatePresence>
          <motion.div key={`preview-${selectedTab.id}`} initial={{ opacity: 0.65 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <DashboardPreview activeTab={selectedTab.id} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ClientExperience() {
  return (
    <section className="relative overflow-hidden bg-[#FAF5ED] px-5 py-16 md:px-8 md:py-24">
      <img src={familyHome} alt="A family reviewing their property journey together" loading="lazy" className="absolute bottom-0 right-0 hidden h-[48%] w-[34%] object-cover opacity-16 lg:block" />
      <div className="relative mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-center">
        <FadeUp>
          <Eyebrow>Better experiences. Better outcomes.</Eyebrow>
          <h2 className="mt-4 text-[2.35rem] font-extrabold leading-[1.02] text-[#071E1A] md:text-[3.5rem]">Your clients get an experience worthy of the property they’re buying.</h2>
          <p className="mt-5 max-w-[500px] text-base font-medium leading-7 text-[#5E6D67]">Real-time updates, documents, progress tracking and clear next steps, all in one place.</p>
        </FadeUp>
        <div className="hidden grid-cols-2 gap-4 md:grid">
          {clientExperiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}
        </div>
        <HorizontalCarousel label="Buyer and seller experiences" itemClassName="basis-[88%] sm:basis-[64%]" className="md:hidden">
          {clientExperiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}
        </HorizontalCarousel>
      </div>
    </section>
  )
}

function StakeholderNode({ stakeholder, compact = false }) {
  const Icon = stakeholder.icon
  return (
    <div className={`relative z-10 flex flex-col items-center text-center ${compact ? 'w-[88px]' : 'min-w-[112px]'}`}>
      <span className={`${compact ? 'h-14 w-14' : 'h-[68px] w-[68px]'} flex items-center justify-center rounded-full border border-[#86E4C2]/50 bg-[#092A24] text-[#86E4C2] shadow-[0_0_0_6px_rgba(134,228,194,0.04)]`}>
        <Icon className={compact ? 'h-5 w-5' : 'h-6 w-6'} />
      </span>
      <p className="mt-3 text-xs font-bold leading-4 text-white/82">{stakeholder.label}</p>
    </div>
  )
}

function ConnectedTransaction() {
  const [expanded, setExpanded] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const coreStakeholders = stakeholders.filter((item) => ['Agent', 'Buyer'].includes(item.label))
  const extraStakeholders = stakeholders.filter((item) => !['Agent', 'Buyer'].includes(item.label))

  return (
    <section className="overflow-hidden bg-[#071E1A] px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr] lg:items-center">
          <FadeUp>
            <Eyebrow light>One transaction.</Eyebrow>
            <h2 className="mt-4 text-[2.65rem] font-extrabold leading-[0.98] md:text-[4rem]">Every stakeholder. Finally connected.</h2>
            <p className="mt-5 max-w-[430px] text-base font-medium leading-7 text-white/64">From offer to registration, everyone works together in one live transaction. Fewer delays. Fewer emails. Better outcomes.</p>
            <a href="/platform" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#86E4C2]">See how it works <ArrowRight className="h-4 w-4" /></a>
          </FadeUp>

          <div className="relative hidden items-start justify-between gap-2 lg:flex">
            <div className="absolute left-[5%] right-[5%] top-[34px] h-px bg-[#86E4C2]/30" />
            {stakeholders.slice(0, 2).map((stakeholder) => <StakeholderNode key={stakeholder.label} stakeholder={stakeholder} />)}
            <div className="relative z-20 flex min-w-[132px] flex-col items-center text-center">
              <span className="flex h-[88px] w-[88px] -translate-y-[10px] items-center justify-center rounded-full border border-[#86E4C2] bg-[#061612] shadow-[0_0_42px_rgba(50,220,159,0.38)]">
                <img src="/brand/icons/arch9-icon-dark-48.png" alt="Arch9" className="h-11 w-11" />
              </span>
              <p className="mt-1 text-xs font-extrabold text-[#86E4C2]">ARCH9</p>
            </div>
            {stakeholders.slice(2).map((stakeholder) => <StakeholderNode key={stakeholder.label} stakeholder={stakeholder} />)}
          </div>

          <div className="lg:hidden">
            <div className="relative flex items-start justify-center gap-2">
              <div className="absolute left-[12%] right-[12%] top-7 h-px bg-[#86E4C2]/28" />
              <StakeholderNode stakeholder={coreStakeholders[0]} compact />
              <div className="relative z-20 flex w-[88px] flex-col items-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#86E4C2] bg-[#061612] shadow-[0_0_32px_rgba(50,220,159,0.34)]">
                  <img src="/brand/icons/arch9-icon-dark-48.png" alt="Arch9" className="h-8 w-8" />
                </span>
                <p className="mt-2 text-xs font-extrabold text-[#86E4C2]">ARCH9</p>
              </div>
              <StakeholderNode stakeholder={coreStakeholders[1]} compact />
            </div>
            <button type="button" className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/18 text-sm font-extrabold text-white" aria-expanded={expanded} aria-controls="connected-stakeholders" onClick={() => setExpanded((current) => !current)}>
              {expanded ? 'Show fewer stakeholders' : 'See everyone connected'}
              {expanded ? <ChevronDown className="h-4 w-4 rotate-180" /> : <Plus className="h-4 w-4" />}
            </button>
            <motion.div id="connected-stakeholders" initial={false} animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: motionEaseOut }} className="overflow-hidden">
              <div className="grid grid-cols-2 justify-items-center gap-y-7 pb-2 pt-8">
                {extraStakeholders.map((stakeholder) => <StakeholderNode key={stakeholder.label} stakeholder={stakeholder} compact />)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PublishingSection() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1360px] gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
        <FadeUp>
          <Eyebrow>Your data. Everywhere it needs to be.</Eyebrow>
          <h2 className="mt-4 text-[2.55rem] font-extrabold leading-[0.98] text-[#071E1A] md:text-[3.7rem]">Capture once. Publish everywhere.</h2>
          <p className="mt-5 max-w-[450px] text-base font-medium leading-7 text-[#5F6F68]">Your listings, everywhere they need to be. Automatically.</p>
          <a href="/platform" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#0B6B50]">See website solutions <ArrowRight className="h-4 w-4" /></a>
        </FadeUp>

        <div className="grid gap-5 md:grid-cols-[1fr_auto_0.78fr] md:items-center">
          <article className="overflow-hidden rounded-[8px] border border-[#071E1A]/8 bg-white p-3 shadow-[0_22px_64px_rgba(7,30,26,0.1)]">
            <div className="relative aspect-[16/7] overflow-hidden rounded-[6px] bg-[#DDE5E0]">
              <img src={propertyImage} alt="Modern home at 14 Nicolson Street" loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[9px] font-extrabold text-[#0B6B50]">ACTIVE</span>
            </div>
            <div className="flex items-end justify-between gap-4 px-2 pb-1 pt-4">
              <div><h3 className="text-base font-extrabold text-[#071E1A]">14 Nicolson Street</h3><p className="mt-1 text-sm font-bold text-[#52635D]">R4,950,000</p></div>
              <Home className="h-5 w-5 text-[#0B6B50]" />
            </div>
          </article>
          <ArrowRight className="mx-auto hidden h-5 w-5 text-[#0B6B50] md:block" />
          <div className="grid gap-3">
            {publishingDestinations.map((destination) => {
              const Icon = destination.icon
              return (
                <div key={destination.label} className="flex items-center gap-4 rounded-[8px] border border-[#071E1A]/8 bg-[#FAF5ED] p-3 shadow-[0_12px_30px_rgba(7,30,26,0.04)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center text-[#0B6B50]">
                    {destination.logo ? (
                      <img src={destination.logo} alt="" className="h-10 w-10 object-contain" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </span>
                  <div><p className="text-sm font-extrabold text-[#071E1A]">{destination.label}</p><p className="mt-0.5 text-[10px] font-bold text-[#73817C]">{destination.status}</p></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  return (
    <section className="border-y border-[#071E1A]/8 bg-[#FAF5ED] px-5 py-10 md:px-8 md:py-12">
      <div className="mx-auto grid w-full max-w-[1360px] gap-7 lg:grid-cols-[0.27fr_0.73fr] lg:items-center">
        <div><Eyebrow>Trusted by growing agencies</Eyebrow><p className="mt-3 max-w-[330px] text-sm font-medium leading-6 text-[#5F6F68]">A reusable proof layer, ready for audited customer numbers and agency logos.</p></div>
        <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
          {marketingMetrics.map((metric) => (
            <div key={metric.label} data-placeholder={metric.placeholder ? 'true' : undefined} className="min-w-[150px] snap-start border-l border-[#071E1A]/12 pl-5">
              <p className="text-3xl font-extrabold text-[#071E1A] md:text-4xl">{metric.value}</p><p className="mt-2 text-sm font-bold text-[#65746E]">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  const proofPoints = ['R0 monthly platform', 'Everything in one place', 'Buyer or seller funded', 'Built for real estate']
  return (
    <section className="relative overflow-hidden bg-[#071E1A] px-5 py-16 text-white md:px-8 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute -bottom-28 right-[-80px] h-[380px] w-[380px] rounded-full border border-[#86E4C2]/8" />
      <div className="pointer-events-none absolute -bottom-12 right-[10px] h-[240px] w-[240px] rotate-45 border border-[#86E4C2]/8" />
      <div className="relative mx-auto grid w-full max-w-[1420px] gap-12 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:gap-16 xl:gap-20">
        <FadeUp>
          <h2 className="max-w-[740px] text-[2.8rem] font-extrabold leading-[1.02] md:text-[4.15rem]">Ready to run your agency differently?</h2>
          <p className="mt-6 max-w-[590px] text-base font-medium leading-7 text-white/66">See how Arch9 can transform the way your team manages listings, clients and transactions.</p>
        </FadeUp>
        <div>
          <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {proofPoints.map((point) => <p key={point} className="flex items-center gap-3 text-sm font-bold text-white/78"><CircleCheck className="h-4 w-4 text-[#86E4C2]" /> {point}</p>)}
          </div>
          <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
            <PrimaryButton href="/book-demo" light className="w-full sm:min-w-[190px] sm:w-auto">Book a Demo</PrimaryButton>
            <SecondaryButton href="/platform" light className="w-full sm:min-w-[210px] sm:w-auto">See the Platform</SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function MarketingHome() {
  useEffect(() => {
    const description = 'Run your real estate agency from one connected platform for listings, leads, CRM, transactions, buyers, sellers and property professionals.'
    setPageSeo({
      title: 'Arch9 | The Real Estate Operating Platform',
      description,
      canonicalPath: '/',
      jsonLd: [
        websiteJsonLd(),
        webPageJsonLd({ name: 'Arch9 | The Real Estate Operating Platform', description, path: '/' }),
        softwareApplicationJsonLd({ description, path: '/', audience: ['Real estate agencies', 'Estate agents', 'Property buyers', 'Property sellers'], featureList: platformCapabilities.map((capability) => capability.label) }),
        itemListJsonLd([
          { name: 'Platform Overview', href: '/platform' },
          { name: 'For Estate Agents', href: '/solutions/agents' },
          { name: 'Pricing', href: '/pricing' },
          { name: 'About Arch9', href: '/about' },
        ]),
      ],
    })
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#071E1A]">
      <Header />
      <main>
        <HeroSection />
        <PlatformOverview />
        <PricingHighlight />
        <PlatformExplorer />
        <ClientExperience />
        <ConnectedTransaction />
        <PublishingSection />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
