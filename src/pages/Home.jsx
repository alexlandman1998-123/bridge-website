import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileStack,
  Files,
  MessageSquareMore,
  UserRound,
  Users,
  Building2,
  Landmark,
  WalletCards,
  CircleDashed,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../sections/CTASection'

const appLoginUrl = 'https://app.bridgenine.co.za'

const problemCards = [
  {
    icon: CircleDashed,
    title: 'No clear source of truth',
    copy: 'Transaction status lives across inboxes, chats, spreadsheets, and disconnected portals.',
  },
  {
    icon: MessageSquareMore,
    title: 'Too much chasing',
    copy: 'Teams spend time asking for updates instead of moving the deal forward.',
  },
  {
    icon: Files,
    title: 'Documents scattered everywhere',
    copy: 'Required files and comments get spread across drives, messages, and email threads.',
  },
]

const solutionCards = [
  {
    icon: ClipboardList,
    title: 'Transaction Timeline',
    copy: 'Track every deal from offer to registration with clear stages, owners, and dependencies.',
  },
  {
    icon: FileStack,
    title: 'Document Collection',
    copy: 'Request, upload, review, reject, and approve documents in one place.',
  },
  {
    icon: MessageSquareMore,
    title: 'Shared Activity',
    copy: 'Comments, updates, document changes, and client-visible notes stay attached to the transaction.',
  },
  {
    icon: UserRound,
    title: 'Client Portal',
    copy: 'Buyers know where they stand, what is needed, and what happens next.',
  },
]

const roleCards = [
  {
    icon: Building2,
    title: 'Developers',
    copy: 'Track sales, documents, finance progress, and registrations across developments.',
  },
  {
    icon: Users,
    title: 'Agents',
    copy: 'Manage offers, mandates, clients, and transaction progress.',
  },
  {
    icon: Landmark,
    title: 'Attorneys',
    copy: 'See instructions, FICA, signing, guarantees, lodgement, and registration steps.',
  },
  {
    icon: WalletCards,
    title: 'Bond Originators',
    copy: 'Manage applications, bank feedback, approvals, and outstanding documents.',
  },
  {
    icon: UserRound,
    title: 'Buyers',
    copy: 'Get one simple portal for progress, documents, and next steps.',
  },
]

const reportingMetrics = [
  { label: 'Active transactions', value: '47' },
  { label: 'Registered this month', value: '18' },
  { label: 'Sales value in progress', value: 'R182m' },
  { label: 'Average deal time', value: '74 days' },
]

const reportingBars = [
  { label: 'Finance stage completion', width: '72%' },
  { label: 'Document readiness', width: '66%' },
  { label: 'Attorney turnaround', width: '58%' },
  { label: 'Buyer response velocity', width: '79%' },
]

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-[34px] border border-[#2a2520] bg-[#171412] p-6 text-white shadow-[0_36px_100px_rgba(12,11,10,0.35)] lg:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdb69b]">
            Transaction workspace
          </p>
          <h3 className="mt-3 text-[1.65rem] font-semibold tracking-[-0.05em] text-[#f5f1eb] lg:text-[2rem]">
            Unit 14 · Junoah Estate
          </h3>
        </div>
        <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
          Stage: Finance
        </span>
      </div>

      <div className="mt-6 rounded-[24px] border border-white/12 bg-white/[0.05] p-5">
        <div className="flex items-center justify-between text-sm text-white/70">
          <span>Progress</span>
          <span>72%</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div className="h-2 w-[72%] rounded-full bg-[#eadcc7]" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[16px] border border-white/10 bg-black/18 p-3.5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#cdb69b]">Next step</p>
            <p className="mt-1.5 text-sm text-white/86">Upload latest payslip</p>
          </div>
          <div className="rounded-[16px] border border-white/10 bg-black/18 p-3.5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#cdb69b]">Documents outstanding</p>
            <p className="mt-1.5 text-sm text-white/86">2</p>
          </div>
        </div>

        <div className="mt-4 rounded-[16px] border border-white/10 bg-black/18 p-3.5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#cdb69b]">Recent update</p>
          <p className="mt-1.5 text-sm text-white/86">Bond originator requested updated payslip</p>
        </div>

        <div className="mt-4 rounded-[16px] border border-white/10 bg-black/18 p-3.5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#cdb69b]">Participants</p>
          <p className="mt-1.5 text-sm text-white/86">Agent · Buyer · Attorney · Bond Originator</p>
        </div>
      </div>
    </motion.div>
  )
}

function ProblemSection() {
  return (
    <SectionContainer id="problem" className="pb-16 pt-8 lg:pb-20 lg:pt-12">
      <div className="rounded-[34px] border border-[#2c2722] bg-[#171412] p-7 text-white shadow-[0_28px_80px_rgba(12,11,10,0.28)] lg:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#cdb69b]">THE PROBLEM</p>
        <h2 className="mt-4 max-w-[940px] text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#f5f1eb] lg:text-[3rem]">
          Property deals don’t fail because people aren’t working. They fail because everyone is working separately.
        </h2>
        <p className="mt-4 max-w-[720px] text-[1rem] leading-8 text-white/68">
          Emails, WhatsApps, spreadsheets, portals, and document folders all create gaps. Bridge 9 brings the transaction back into one shared view.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {problemCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-[22px] border border-white/12 bg-white/[0.05] p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/14 bg-white/[0.04] text-[#eadcc7]">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[-0.03em] text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/72">{card.copy}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionContainer>
  )
}

function SolutionSection() {
  return (
    <SectionContainer id="platform" className="pt-10 lg:pt-12">
      <SectionHeading
        eyebrow="Platform"
        title="One workspace for the full transaction journey."
        description="Bridge 9 keeps timeline, documents, updates, and client visibility inside one transaction record."
        className="max-w-[760px]"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {solutionCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-[24px] border border-[#e5dacb] bg-white p-6 shadow-[0_16px_40px_rgba(23,20,18,0.05)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-[#eadfce] bg-[#faf6ef] text-[#6d5c4a]">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-[1.22rem] font-semibold tracking-[-0.03em] text-[#171412]">{card.title}</h3>
              <p className="mt-2 text-[0.96rem] leading-7 text-[#6f6457]">{card.copy}</p>
            </motion.div>
          )
        })}
      </div>
    </SectionContainer>
  )
}

function RolesSection() {
  return (
    <SectionContainer id="roles" tone="soft" className="py-16 lg:py-18">
      <SectionHeading
        eyebrow="Roles"
        title="Built for every party in the deal."
        description="Each role gets the right visibility without losing the shared transaction context."
        className="max-w-[720px]"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {roleCards.map((role, index) => {
          const Icon = role.icon
          return (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-[22px] border border-[#e4d9cb] bg-white p-5 shadow-[0_14px_30px_rgba(23,20,18,0.04)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-[#eadfce] bg-[#faf6ef] text-[#6d5c4a]">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-[1rem] font-semibold text-[#171412]">{role.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6f6457]">{role.copy}</p>
            </motion.div>
          )
        })}
      </div>
    </SectionContainer>
  )
}

function ReportingSection() {
  return (
    <SectionContainer id="reporting" className="pt-14 lg:pt-18">
      <SectionHeading
        eyebrow="Reporting"
        title="Turn live transaction activity into useful business insight."
        description="The transaction feed becomes operational reporting your team can act on."
        className="max-w-[760px]"
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {reportingMetrics.map((metric) => (
            <div key={metric.label} className="rounded-[24px] border border-[#e5dacb] bg-white p-5 shadow-[0_14px_34px_rgba(23,20,18,0.05)]">
              <p className="text-sm text-[#7b6f62]">{metric.label}</p>
              <p className="mt-3 text-[1.9rem] font-semibold tracking-[-0.05em] text-[#171412]">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#2c2722] bg-[#171412] p-6 text-white shadow-[0_24px_70px_rgba(12,11,10,0.28)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdb69b]">Reporting layer</p>
          <h3 className="mt-3 text-[1.6rem] font-semibold tracking-[-0.04em] text-white">
            Live movement, clear operational signal.
          </h3>
          <div className="mt-6 space-y-4">
            {reportingBars.map((bar) => (
              <div key={bar.label}>
                <div className="flex items-center justify-between text-sm text-white/72">
                  <span>{bar.label}</span>
                  <span>{bar.width}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: bar.width }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.65 }}
                    className="h-2 rounded-full bg-[#eadcc7]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'Bridge 9 | Shared property transaction workspace'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Bridge 9 gives property teams one shared workspace to move deals from offer to registration with clear progress, documents, and role-player visibility.'
    )
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#171412]">
      <Header />

      <main>
        <section
          id="top"
          className="-mt-[106px] pt-[112px] lg:-mt-[118px] lg:pt-[126px]"
          style={{
            background:
              'radial-gradient(circle at 72% 38%, rgba(186, 157, 121, 0.14), transparent 36%), linear-gradient(180deg, #121212 0%, #161514 72%, #151412 100%)',
          }}
        >
          <SectionContainer className="pb-12 pt-3 lg:pb-16 lg:pt-5">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="max-w-[560px]">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#cdb69b]"
                >
                  SHARED PROPERTY TRANSACTION WORKSPACE
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className="mt-5 text-[3.1rem] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5f1eb] sm:text-[4.05rem] lg:text-[4.55rem]"
                >
                  Property deals move faster when everyone works from the same place.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12 }}
                  className="mt-5 max-w-[520px] text-[1rem] leading-8 text-[#c9bdb0]"
                >
                  Bridge 9 gives developers, agents, attorneys, bond originators, and buyers one shared workspace for documents, updates, stages, and next steps.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 }}
                  className="mt-7 flex flex-col gap-3 sm:flex-row"
                >
                  <a
                    href="/contact"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#eadcc7] bg-[#f7efe0] px-6 py-3 text-[0.95rem] font-semibold text-[#171412] shadow-[0_14px_32px_rgba(20,17,14,0.26)] transition hover:translate-y-[-1px] hover:bg-[#f9f3e7]"
                  >
                    Book a Demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#platform"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/24 bg-white/[0.02] px-6 py-3 text-[0.95rem] font-semibold text-[#f2ece3] transition hover:bg-white/[0.06]"
                  >
                    View Platform
                  </a>
                </motion.div>

                <p className="mt-6 text-sm text-[#b3a598]">
                  Built for property teams managing deals from offer to registration.
                </p>
              </div>

              <HeroMockup />
            </div>
          </SectionContainer>
        </section>

        <ProblemSection />
        <SolutionSection />
        <RolesSection />
        <ReportingSection />

        <CTASection
          id="contact"
          eyebrow="Book a demo"
          title="Ready to bring your property transactions into one shared workspace?"
          description="Book a demo and see how Bridge 9 can simplify your sales, finance, legal, and client communication process."
          primary={{ label: 'Book a Demo', href: '/contact' }}
          secondary={{ label: 'Login', href: appLoginUrl, external: true }}
        />
      </main>

      <Footer />
    </div>
  )
}
