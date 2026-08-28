import { useEffect } from 'react'
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  Check,
  Clock3,
  Copy,
  FileText,
  Home,
  Landmark,
  RefreshCw,
  Scale,
  UserRound,
  Users,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/motion/Reveal'
import aboutArchitectureImage from '../assets/about-architecture.png'
import { breadcrumbJsonLd, setPageSeo, webPageJsonLd } from '../lib/seo'

const changeCards = [
  {
    title: 'Nobody knows where things are.',
    copy: 'Information is scattered across emails, WhatsApp groups and spreadsheets.',
    icon: UserRound,
  },
  {
    title: 'Everyone repeats work.',
    copy: 'The same information is requested again and again.',
    icon: Copy,
  },
  {
    title: 'Delays affect everyone.',
    copy: 'One bottleneck creates delays for every role involved.',
    icon: Clock3,
  },
  {
    title: 'Businesses work in isolation.',
    copy: 'Excellent businesses exist throughout the industry, but very few are connected.',
    icon: Building2,
  },
]

const enterpriseBenefits = [
  {
    title: 'Powerful',
    copy: 'Built for complex transactions, multiple roles and live progress.',
  },
  {
    title: 'Simple',
    copy: 'Designed so every participant can understand what happens next.',
  },
  {
    title: 'Scalable',
    copy: 'Structured for independent teams today and growing networks tomorrow.',
  },
]

const flowSteps = [
  {
    title: 'One shared transaction',
    icon: Users,
  },
  {
    title: 'Every role works from the same information',
    icon: FileText,
  },
  {
    title: 'Updates happen once',
    icon: RefreshCw,
  },
  {
    title: 'Everyone stays informed',
    icon: Bell,
  },
  {
    title: 'Registration moves faster',
    icon: Check,
  },
]

const roles = [
  {
    title: 'Buyer',
    copy: 'A simple, transparent experience from start to finish.',
    icon: UserRound,
    href: '/platform',
  },
  {
    title: 'Seller',
    copy: 'Stay informed and in control throughout the process.',
    icon: Home,
    href: '/platform',
  },
  {
    title: 'Agent',
    copy: 'Manage deals, clients and documents in one place.',
    icon: BriefcaseBusiness,
    href: '/solutions/agents',
  },
  {
    title: 'Attorney',
    copy: 'Run matters efficiently with full visibility.',
    icon: Scale,
    href: '/solutions/attorneys',
  },
  {
    title: 'Bond Originator',
    copy: 'Process applications faster with real-time insights.',
    icon: Landmark,
    href: '/solutions/bond-originators',
  },
  {
    title: 'Developer',
    copy: 'Manage projects and compliance with ease.',
    icon: Building2,
    href: '/solutions/developers',
  },
]

const platformBullets = [
  'Accepted offers, documents and milestones in one place.',
  'Role-aware visibility for every party in the transaction.',
  'Live updates that reduce unnecessary follow-ups.',
]

const dashboardStages = [
  ['Offer accepted', 'Complete'],
  ['Buyer onboarding', 'Complete'],
  ['Finance application', 'In progress'],
  ['Attorney transfer', 'Next'],
  ['Registration', 'Queued'],
]

const outcomes = [
  {
    title: 'Agents',
    copy: 'Spend less time following up. More time building relationships.',
  },
  {
    title: 'Attorneys',
    copy: 'Reduce unnecessary calls. Improve visibility.',
  },
  {
    title: 'Bond Originators',
    copy: 'Know exactly where every application stands.',
  },
  {
    title: 'Buyers & Sellers',
    copy: 'Feel informed throughout the journey.',
  },
]

function Eyebrow({ children, light = false }) {
  return (
    <p className={`text-[11px] font-black uppercase tracking-[0.24em] ${light ? 'text-[#86E4C2]' : 'text-[#006B4D]'}`}>
      {children}
    </p>
  )
}

function SectionShell({ children, className = '', dark = false }) {
  return (
    <section className={`${dark ? 'bg-[#071E1A] text-[#F8F6F2]' : 'bg-[#F8F6F2] text-[#071E1A]'} px-6 py-20 md:px-8 md:py-28 lg:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-[1320px]">{children}</div>
    </section>
  )
}

function SectionIntro({ eyebrow, title, copy, light = false, center = false }) {
  return (
    <FadeUp className={center ? 'mx-auto max-w-[760px] text-center' : 'max-w-[760px]'}>
      {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
      <h2 className={`mt-4 text-[2.55rem] font-extrabold leading-[0.98] tracking-[-0.045em] md:text-[4rem] lg:text-[4.65rem] ${light ? 'text-[#F8F6F2]' : 'text-[#071E1A]'}`}>
        {title}
      </h2>
      {copy ? (
        <p className={`mt-6 text-base font-medium leading-8 md:text-lg md:leading-9 ${light ? 'text-[#F3EEE6]/74' : 'text-[#4B5B55]'}`}>
          {copy}
        </p>
      ) : null}
    </FadeUp>
  )
}

function ArchOutline() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-14 right-[-5rem] hidden w-[42rem] opacity-35 lg:block">
      <div className="h-full rounded-t-full border border-[#86E4C2]/26 border-b-0" />
      <div className="absolute inset-10 rounded-t-full border border-[#86E4C2]/18 border-b-0" />
      <div className="absolute inset-20 rounded-t-full border border-[#86E4C2]/12 border-b-0" />
    </div>
  )
}

function PlatformPreview() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#F3EEE6]/12 bg-[#071E1A] p-3 text-[#F8F6F2] shadow-[0_34px_100px_rgba(5,8,7,0.18)] md:rounded-[38px] md:p-5">
      <div className="rounded-[22px] border border-white/10 bg-[#050807] md:rounded-[30px]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 md:px-5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-2 rounded-full bg-white/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/46">
            Arch9
          </span>
        </div>

        <div className="grid gap-5 p-4 md:p-6 lg:grid-cols-[1fr_0.72fr]">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.055] p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#86E4C2]">Live transaction</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] md:text-[2.45rem]">Unit 14, Junoah Estate</h3>
                <p className="mt-3 max-w-[520px] text-sm font-semibold leading-6 text-white/58">
                  Developer, agent, attorney, bond originator, buyer and seller working from one shared record.
                </p>
              </div>
              <span className="rounded-full border border-[#86E4C2]/18 bg-[#86E4C2]/10 px-4 py-2 text-xs font-black text-[#86E4C2]">
                68% complete
              </span>
            </div>

            <div className="mt-8 h-2 rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-[#86E4C2]" />
            </div>

            <div className="mt-6 grid gap-3">
              {dashboardStages.map(([label, status]) => (
                <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-[18px] border border-white/10 bg-black/18 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${status === 'Next' || status === 'Queued' ? 'bg-white/22' : 'bg-[#86E4C2]'}`} />
                    <span className="truncate text-sm font-bold text-white/84">{label}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/48">{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {[
              ['Documents ready', '14 of 18'],
              ['Next action', 'Attorney review'],
              ['Client visibility', 'Live portal'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[20px] border border-white/10 bg-white/[0.055] p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/42">{label}</p>
                <p className="mt-3 text-xl font-extrabold tracking-[-0.035em] text-[#F8F6F2]">{value}</p>
              </div>
            ))}
            <div className="rounded-[20px] border border-[#86E4C2]/18 bg-[#86E4C2]/10 p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#86E4C2]">Latest update</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#F8F6F2]/78">
                Bond approval recorded once and shared with the right parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  useEffect(() => {
    setPageSeo({
      title: 'About Arch9 | Connected Property Transactions',
      description:
        'Arch9 exists to connect every role in a property transaction through one shared workspace, from accepted offer to registration.',
      canonicalPath: '/about',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', href: '/' },
          { name: 'About Arch9', href: '/about' },
        ]),
        webPageJsonLd({
          name: 'About Arch9',
          description:
            'Arch9 exists to connect every role in a property transaction through one shared workspace.',
          path: '/about',
        }),
      ],
    })
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F6F2] text-[#071E1A]">
      <Header />

      <main>
        <section className="overflow-hidden bg-[#F8F6F2] px-6 pb-20 pt-[116px] md:px-8 md:pb-24 md:pt-[136px] lg:pb-28">
          <div className="mx-auto grid w-full max-w-[1500px] gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <FadeUp className="w-full min-w-0 max-w-full md:max-w-[720px]">
              <Eyebrow>About Arch9</Eyebrow>
              <h1 className="mt-6 max-w-[11ch] break-words text-[2.75rem] font-extrabold leading-[0.94] tracking-[-0.045em] text-[#071E1A] sm:max-w-[13ch] sm:text-[3.4rem] md:max-w-none md:break-normal md:text-[5rem] md:tracking-[-0.055em] xl:text-[5.65rem]">
                The future of property transactions starts with working together.
              </h1>
              <div className="mt-7 max-w-full space-y-4 text-base font-medium leading-8 text-[#31433D] md:max-w-[650px] md:text-lg md:leading-9">
                <p>Buying or selling property is one of life's biggest milestones.</p>
                <p>
                  Yet behind every successful transaction are multiple businesses trying to work together using
                  disconnected systems, endless emails and constant follow-ups.
                </p>
                <p>Arch9 exists to bring every role together through one shared workspace.</p>
              </div>
              <a href="/platform" className="mt-9 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#064537] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(6,69,55,0.18)] transition hover:-translate-y-0.5 hover:bg-[#073B32] sm:w-auto" style={{ color: '#FFFFFF' }}>
                See Our Platform
                <ArrowRight className="h-4 w-4" />
              </a>
            </FadeUp>

            <FadeUp delay={0.08} className="-mx-6 md:mx-0">
              <div className="relative h-[420px] overflow-hidden rounded-[34px] border border-[#0A3028]/8 bg-[#EFE8DC] md:h-[560px] lg:h-[680px] lg:rounded-[48px]">
                <img
                  src={aboutArchitectureImage}
                  alt="Minimal concrete architecture with a rounded arch and natural light"
                  className="h-full w-full object-cover object-[68%_50%]"
                />
              </div>
            </FadeUp>
          </div>
        </section>

        <SectionShell className="border-y border-[#0A3028]/8">
          <div className="mx-auto max-w-[930px]">
            <FadeUp>
              <Eyebrow>Our belief</Eyebrow>
              <h2 className="mt-5 text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#071E1A] md:text-[4.5rem] lg:text-[5.3rem]">
                We believe collaboration should be built into every property transaction.
              </h2>
            </FadeUp>
            <FadeUp delay={0.06} className="mt-10 grid gap-5 text-lg font-medium leading-9 text-[#4B5B55] md:grid-cols-2 md:text-xl md:leading-10">
              <p>Property isn't broken. The way the industry works together is.</p>
              <p>
                Every transaction already involves agents, attorneys, bond originators, buyers, sellers and developers.
                The challenge isn't the people. It's that everyone works from different systems.
              </p>
            </FadeUp>
          </div>
        </SectionShell>

        <SectionShell>
          <SectionIntro
            eyebrow="Why change is needed"
            title="The work is connected. The systems are not."
            copy="Property transactions depend on collaboration, but most teams still rely on tools that were never designed to work together."
            center
          />

          <StaggerContainer className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {changeCards.map((item) => {
              const Icon = item.icon
              return (
                <StaggerItem key={item.title}>
                  <article className="h-full rounded-[22px] border border-[#0A3028]/8 bg-white/54 p-7 transition duration-200 hover:-translate-y-1 hover:border-[#064537]/18 hover:bg-white md:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0A3028]/12 text-[#064537]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-8 text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#071E1A]">{item.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-7 text-[#51615B] md:text-base md:leading-8">{item.copy}</p>
                  </article>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </SectionShell>

        <SectionShell dark className="relative overflow-hidden">
          <ArchOutline />
          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_0.75fr] lg:items-end">
            <SectionIntro
              eyebrow="The big idea"
              title="Property isn't broken. The way we work together is."
              light
            />
            <FadeUp delay={0.08} className="max-w-[560px] text-lg font-medium leading-9 text-[#F3EEE6]/74 md:text-xl md:leading-10">
              <p>
                Arch9 connects every participant involved in a transaction through one shared workspace. Every update
                happens once. Everyone stays informed.
              </p>
            </FadeUp>
          </div>
        </SectionShell>

        <SectionShell className="bg-[#FFFCF6]">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_0.75fr] lg:items-start">
            <SectionIntro
              eyebrow="Enterprise technology"
              title="Enterprise technology shouldn't be reserved for enterprise businesses."
              copy="For decades, sophisticated software has only been available to the country's largest organisations. Arch9 is changing that."
            />

            <StaggerContainer className="grid gap-4" stagger={0.08}>
              {enterpriseBenefits.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="grid grid-cols-[44px_1fr] gap-4 rounded-[22px] border border-[#0A3028]/8 bg-[#F8F6F2] p-5 md:p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6F3ED] text-[#064537]">
                      <Check className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-[-0.03em] text-[#071E1A]">{item.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-7 text-[#51615B] md:text-base md:leading-8">{item.copy}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <FadeUp className="mt-10 max-w-[760px] text-base font-medium leading-8 text-[#4B5B55] md:text-lg md:leading-9">
            <p>
              We're making enterprise-grade technology accessible to independent agencies, attorneys, bond originators
              and developers - without enterprise complexity or enterprise pricing.
            </p>
          </FadeUp>
        </SectionShell>

        <SectionShell>
          <SectionIntro eyebrow="How Arch9 works" title="A transaction becomes one shared path." center />

          <StaggerContainer className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-4" stagger={0.08}>
            <div className="absolute bottom-8 left-[22px] top-8 w-px bg-[#0A3028]/10 md:left-0 md:right-0 md:top-[42px] md:bottom-auto md:mx-auto md:h-px md:w-[calc(100%-9rem)]" />
            {flowSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <StaggerItem key={step.title}>
                  <div className="relative grid grid-cols-[48px_1fr] gap-5 md:block md:text-center">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#0A3028]/10 bg-[#F8F6F2] text-[#064537] md:mx-auto md:h-[84px] md:w-[84px]">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D] md:mt-5">Step {index + 1}</p>
                      <h3 className="mt-2 text-lg font-extrabold leading-tight tracking-[-0.035em] text-[#071E1A]">{step.title}</h3>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </SectionShell>

        <SectionShell className="bg-[#FFFCF6]">
          <SectionIntro eyebrow="Built for every role" title="Different work. One shared transaction." center />

          <StaggerContainer className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <StaggerItem key={role.title}>
                  <a href={role.href} className="group flex min-h-[220px] flex-col rounded-[22px] border border-[#0A3028]/8 bg-[#F8F6F2] p-8 transition duration-200 hover:-translate-y-1 hover:border-[#064537]/18 hover:bg-white">
                    <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#0A3028]/10 text-[#064537]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-7 text-xl font-extrabold tracking-[-0.035em] text-[#071E1A]">{role.title}</h3>
                    <p className="mt-3 flex-1 text-sm font-medium leading-7 text-[#51615B] md:text-base md:leading-8">{role.copy}</p>
                    <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#064537]">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </a>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </SectionShell>

        <SectionShell>
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.08fr] lg:items-center">
            <FadeUp>
              <Eyebrow>The platform</Eyebrow>
              <h2 className="mt-4 text-[2.75rem] font-extrabold leading-[0.96] tracking-[-0.05em] text-[#071E1A] md:text-[4.7rem]">
                One platform. Every role. Every transaction.
              </h2>
              <p className="mt-6 text-base font-medium leading-8 text-[#4B5B55] md:text-lg md:leading-9">
                From accepted offer through registration, every participant works from the same live transaction.
              </p>
              <ul className="mt-8 grid gap-4">
                {platformBullets.map((item) => (
                  <li key={item} className="grid grid-cols-[28px_1fr] gap-3 text-sm font-bold leading-7 text-[#31433D] md:text-base">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F3ED] text-[#064537]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.08}>
              <PlatformPreview />
            </FadeUp>
          </div>
        </SectionShell>

        <SectionShell className="bg-[#FFFCF6]">
          <SectionIntro
            eyebrow="Outcomes"
            title="Better visibility creates better outcomes."
            copy="Arch9 is designed around the results every participant feels when collaboration becomes easier."
            center
          />

          <StaggerContainer className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
            {outcomes.map((item) => (
              <StaggerItem key={item.title}>
                <article className="h-full rounded-[22px] border border-[#0A3028]/8 bg-[#F8F6F2] p-8">
                  <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{item.title}</h3>
                  <p className="mt-5 text-base font-medium leading-8 text-[#51615B]">{item.copy}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SectionShell>

        <SectionShell dark className="relative overflow-hidden">
          <div className="mx-auto max-w-[1050px] text-center">
            <FadeUp>
              <Eyebrow light>Our promise</Eyebrow>
              <h2 className="mt-5 text-[2.85rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-[#F8F6F2] md:text-[5rem] lg:text-[6rem]">
                We're not building another property platform.
              </h2>
              <p className="mx-auto mt-8 max-w-[820px] text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#F8F6F2] md:text-[2.3rem]">
                We're building the infrastructure that connects the property industry.
              </p>
              <div className="mx-auto mt-8 max-w-[620px] space-y-2 text-base font-medium leading-8 text-[#F3EEE6]/74 md:text-lg md:leading-9">
                <p>Every transaction. Every business. Every client.</p>
                <p>Connected through one shared workspace.</p>
                <p>Because better collaboration creates better outcomes for everyone.</p>
              </div>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="/platform" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F3EEE6] px-6 py-3 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5 hover:bg-white" style={{ color: '#071E1A' }}>
                  See Arch9 in Action
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/book-demo" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#F3EEE6]/18 px-6 py-3 text-sm font-extrabold text-[#F3EEE6] transition hover:-translate-y-0.5 hover:border-[#86E4C2]/34 hover:text-[#86E4C2]">
                  Book a Demo
                </a>
              </div>
            </FadeUp>
          </div>
        </SectionShell>
      </main>

      <Footer />
    </div>
  )
}
