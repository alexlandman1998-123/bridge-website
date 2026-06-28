import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  Folder,
  Home,
  Landmark,
  MailCheck,
  MessageCircle,
  Scale,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/motion/Reveal'
import familyHomeImage from '../assets/platform/family-home.png'

const roles = [
  {
    label: 'Buyer',
    icon: UserRound,
    title: 'Buyer view',
    status: 'Finance in progress',
    next: 'Upload proof of income',
    items: ['See progress', 'Upload documents', 'Stay updated'],
  },
  {
    label: 'Seller',
    icon: Home,
    title: 'Seller view',
    status: 'Transfer started',
    next: 'Review seller documents',
    items: ['See progress', 'Review documents', 'Stay informed'],
  },
  {
    label: 'Agent',
    icon: BriefcaseBusiness,
    title: 'Agent view',
    status: 'Offer accepted',
    next: 'Update buyer and seller',
    items: ['Manage transactions', 'Follow progress', 'Update clients'],
  },
  {
    label: 'Attorney',
    icon: Scale,
    title: 'Attorney view',
    status: 'Documents requested',
    next: 'Prepare for registration',
    items: ['Track matters', 'Request documents', 'Keep everyone informed'],
  },
  {
    label: 'Bond Originator',
    icon: Landmark,
    title: 'Bond view',
    status: 'Application submitted',
    next: 'Track bank feedback',
    items: ['Manage applications', 'Track approvals', 'Share updates'],
  },
  {
    label: 'Developer',
    icon: Building2,
    title: 'Developer view',
    status: 'Sale reserved',
    next: 'Confirm handover steps',
    items: ['Track projects', 'Share updates', 'Keep everyone aligned'],
  },
]

const flowSteps = [
  {
    title: 'Offer Accepted',
    icon: Check,
    copy: 'The sale is confirmed and everyone is notified.',
  },
  {
    title: 'Onboarding',
    icon: UsersRound,
    copy: 'Each person joins the same workspace.',
  },
  {
    title: 'Finance',
    icon: CircleDollarSign,
    copy: 'Your bond application is managed and tracked.',
  },
  {
    title: 'Transfer',
    icon: FileText,
    copy: 'The attorney prepares everything for registration.',
  },
  {
    title: 'Registration',
    icon: Home,
    copy: 'The property is registered and everyone is updated.',
  },
]

const essentials = [
  {
    title: 'Documents',
    icon: Folder,
    copy: 'Store everything securely.',
  },
  {
    title: 'Updates',
    icon: Bell,
    copy: 'Everyone sees progress instantly.',
  },
  {
    title: 'Messages',
    icon: MessageCircle,
    copy: 'No endless phone calls.',
  },
  {
    title: 'Appointments',
    icon: CalendarDays,
    copy: "Know what's happening next.",
  },
]

const simpleSteps = [
  {
    title: 'Receive your invitation.',
    icon: MailCheck,
  },
  {
    title: 'Create your account.',
    icon: UserRound,
  },
  {
    title: 'Follow progress in real time.',
    icon: ClipboardCheck,
  },
  {
    title: 'Your property is registered.',
    icon: ShieldCheck,
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

function SectionIntro({ title, copy, align = 'center' }) {
  return (
    <FadeUp className={align === 'center' ? 'mx-auto max-w-[640px] text-center' : 'max-w-[640px]'}>
      <h2 className="text-[2.25rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#071E1A] md:text-[3.7rem]">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base font-medium leading-7 text-[#51615B] md:text-lg md:leading-8">{copy}</p> : null}
    </FadeUp>
  )
}

function RoleSelector({ activeRole, onSelect }) {
  return (
    <div className="absolute -bottom-8 left-4 right-4 overflow-x-auto rounded-[24px] border border-[#0A3028]/10 bg-white/94 p-2 shadow-[0_22px_70px_rgba(5,8,7,0.16)] backdrop-blur-xl md:left-6 md:right-6">
      <div className="flex min-w-max gap-1 md:grid md:min-w-0 md:grid-cols-6">
        {roles.map((role) => {
          const Icon = role.icon
          const active = activeRole.label === role.label
          return (
            <button
              key={role.label}
              type="button"
              className={`flex min-h-[78px] w-[104px] flex-col items-center justify-center gap-2 rounded-[18px] px-2 text-center text-[12px] font-extrabold leading-tight transition md:w-auto ${
                active ? 'bg-[#E6F3ED] text-[#064537]' : 'text-[#071E1A] hover:bg-[#F8F7F4] hover:text-[#064537]'
              }`}
              onClick={() => onSelect(role)}
            >
              <Icon className="h-5 w-5" />
              <span>{role.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function WorkspacePreview({ role, compact = false }) {
  return (
    <motion.div
      key={role.label}
      className={`rounded-[22px] border border-[#0A3028]/8 bg-white p-4 shadow-[0_18px_54px_rgba(5,8,7,0.07)] ${compact ? '' : 'md:p-5'}`}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#0E6A55]">{role.title}</p>
          <h3 className="mt-1 text-base font-extrabold text-[#071E1A]">{role.status}</h3>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#E6F3ED] text-[#064537]">
          <role.icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-5 rounded-[18px] bg-[#F8F7F4] p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-extrabold text-[#071E1A]">Progress</span>
          <span className="text-xs font-extrabold text-[#0E6A55]">Live</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#DDE5DF]">
          <div className="h-full w-[64%] rounded-full bg-[#0E6A55]" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {['Offer', 'Finance', 'Transfer', 'Done'].map((item, index) => (
            <div key={item} className="min-w-0">
              <div className={`h-1.5 rounded-full ${index < 3 ? 'bg-[#0E6A55]' : 'bg-[#DDE5DF]'}`} />
              <p className="mt-2 truncate text-[10px] font-bold text-[#687A73]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[18px] border border-[#0A3028]/8 p-4">
        <p className="text-xs font-extrabold text-[#687A73]">Next</p>
        <p className="mt-1 text-sm font-extrabold leading-6 text-[#071E1A]">{role.next}</p>
      </div>
    </motion.div>
  )
}

function FlowTimeline() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative mx-auto mt-12 max-w-[1160px]">
      <div className="absolute left-[27px] top-8 bottom-8 w-px bg-[#0A3028]/10 md:left-0 md:right-0 md:top-[43px] md:bottom-auto md:mx-auto md:h-px md:w-[calc(100%-9rem)]" />
      <motion.div
        className="absolute left-[27px] top-8 bottom-8 w-px origin-top bg-[#0E6A55] md:left-0 md:right-0 md:top-[43px] md:bottom-auto md:mx-auto md:h-px md:w-[calc(100%-9rem)] md:origin-left"
        initial={shouldReduceMotion ? false : { scaleY: 0, scaleX: 0 }}
        whileInView={shouldReduceMotion ? undefined : { scaleY: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />

      <StaggerContainer className="grid gap-6 md:grid-cols-5 md:gap-4" stagger={0.08}>
        {flowSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <StaggerItem key={step.title}>
              <article className="relative grid grid-cols-[56px_1fr] gap-4 md:block md:text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#0A3028]/10 bg-white text-[#064537] shadow-[0_12px_32px_rgba(5,8,7,0.06)] md:mx-auto md:h-[86px] md:w-[86px]">
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0E6A55] text-[11px] font-extrabold text-white">
                    {index + 1}
                  </span>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#071E1A] md:mt-5">{step.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#51615B]">{step.copy}</p>
                </div>
              </article>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </div>
  )
}

export default function PlatformOverview() {
  const [activeRole, setActiveRole] = useState(roles[0])

  useEffect(() => {
    document.title = 'Platform Overview | Arch9'
    setMetaDescription('Arch9 gives everyone involved in buying or selling a property one shared workspace from offer accepted to registration.')
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#05120F]">
      <Header />

      <main className="overflow-hidden">
        <section className="bg-white px-5 pb-20 pt-[116px] md:px-8 md:pb-28 md:pt-[144px]">
          <div className="mx-auto grid w-full max-w-[1240px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <FadeUp>
              <h1 className="max-w-[640px] text-[3.25rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-[#071E1A] md:text-[5.7rem]">
                One property journey.
                <span className="mt-2 block text-[#2F7A54]">One shared workspace.</span>
              </h1>
              <p className="mt-7 max-w-[520px] text-lg font-medium leading-8 text-[#31433D]">
                From your offer being accepted until registration, Arch9 keeps everyone working together in one place.
              </p>
              <p className="mt-5 max-w-[420px] text-lg font-extrabold leading-8 text-[#071E1A]">
                Less chasing.
                <br />
                Less confusion.
                <br />
                Better outcomes.
              </p>
              <a href="#how-it-works" className="mt-8 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#064537] px-7 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(6,69,55,0.22)] transition hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#073B32] sm:w-auto" style={{ color: '#FFFFFF' }}>
                See how it works
                <ArrowRight className="h-4 w-4" />
              </a>
            </FadeUp>

            <FadeUp delay={0.1} className="relative pb-10">
              <div className="relative overflow-hidden rounded-[28px] bg-[#EDE8DF] shadow-[0_32px_90px_rgba(5,8,7,0.14)]">
                <img src={familyHomeImage} alt="A family looking at a laptop together in their new home" className="h-[330px] w-full object-cover md:h-[500px]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,30,26,0.18))]" />
              </div>
              <RoleSelector activeRole={activeRole} onSelect={setActiveRole} />
            </FadeUp>
          </div>
        </section>

        <section id="how-it-works" className="bg-[#F8F7F4] px-5 py-20 md:px-8 md:py-28">
          <SectionIntro title="How your transaction flows" />
          <FlowTimeline />
        </section>

        <section className="bg-white px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto w-full max-w-[1240px]">
            <SectionIntro title="Everyone has their own view." copy="Different roles. Same live information." />

            <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {roles.map((role) => (
                <StaggerItem key={role.label}>
                  <article className="group h-full rounded-[24px] border border-[#0A3028]/8 bg-white p-4 shadow-[0_18px_54px_rgba(5,8,7,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_72px_rgba(5,8,7,0.1)]">
                    <WorkspacePreview role={role} compact />
                    <h3 className="mt-5 text-lg font-extrabold text-[#071E1A]">{role.label}</h3>
                    <ul className="mt-4 grid gap-2">
                      {role.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-6 text-[#51615B]">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[#0E6A55]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="bg-white px-5 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto w-full max-w-[1120px]">
            <SectionIntro title="Everything you need. Nothing gets lost." />
            <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
              {essentials.map((item) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={item.title}>
                    <article className="rounded-[22px] border border-transparent bg-white p-5 text-center transition duration-200 hover:-translate-y-1 hover:border-[#0A3028]/8 hover:shadow-[0_22px_60px_rgba(5,8,7,0.08)]">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#E6F3ED] text-[#064537]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-base font-extrabold text-[#071E1A]">{item.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-6 text-[#51615B]">{item.copy}</p>
                    </article>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </section>

        <section className="bg-[#F8F7F4] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto w-full max-w-[1120px]">
            <SectionIntro title="Simple for everyone" copy="You do not need to know the property process. Arch9 shows you what happens next." />
            <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-4" stagger={0.08}>
              {simpleSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <StaggerItem key={step.title}>
                    <article className="relative rounded-[24px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                      {index < simpleSteps.length - 1 ? <span className="absolute left-[calc(100%-4px)] top-1/2 hidden h-px w-8 bg-[#0A3028]/14 md:block" /> : null}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#064537] text-sm font-extrabold text-white">{index + 1}</span>
                      <Icon className="mt-8 h-9 w-9 text-[#064537]" />
                      <h3 className="mt-5 text-base font-extrabold leading-6 text-[#071E1A]">{step.title}</h3>
                    </article>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-8 md:py-24">
          <FadeUp className="mx-auto flex w-full max-w-[1120px] flex-col gap-7 rounded-[28px] bg-[#064537] p-7 text-white shadow-[0_26px_80px_rgba(6,69,55,0.24)] md:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-[680px] text-[2.3rem] font-extrabold leading-[1.04] tracking-[-0.045em] md:text-[4rem]">
                One property journey. One shared workspace.
              </h2>
              <p className="mt-5 max-w-[650px] text-base font-medium leading-8 text-white/78 md:text-lg">
                Whether you're buying, selling or managing the transaction, Arch9 keeps everyone connected.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[340px] lg:grid-cols-1">
              <a href="/book-demo" className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-white px-7 text-sm font-extrabold text-[#064537] shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition hover:scale-[1.02]" style={{ color: '#064537' }}>
                Book a Demo
              </a>
              <a href="#how-it-works" className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full border border-white/20 px-7 text-sm font-extrabold text-white transition hover:scale-[1.02] hover:bg-white/8" style={{ color: '#FFFFFF' }}>
                Explore the Platform
              </a>
            </div>
          </FadeUp>
        </section>
      </main>

      <Footer />
    </div>
  )
}
