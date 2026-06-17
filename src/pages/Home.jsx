import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  Clock3,
  FileStack,
  Files,
  FolderCheck,
  Landmark,
  LayoutDashboard,
  MessageSquareMore,
  Scale,
  Send,
  Smartphone,
  UserPlus,
  UserRound,
  Users,
  WalletCards,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductShowcase from '../components/ProductShowcase'
import SectionContainer from '../components/SectionContainer'
import SectionHeading from '../components/SectionHeading'
import { FadeIn, FadeUp, StaggerContainer, StaggerItem } from '../components/motion/Reveal'
import { motionEaseOut } from '../components/motion/timing'
import CTASection from '../sections/CTASection'

const problemCards = [
  {
    icon: CircleDashed,
    title: 'Different Versions',
    copy: 'Every party is working from a different version of the transaction.',
  },
  {
    icon: MessageSquareMore,
    title: 'Endless Follow-Ups',
    copy: 'Teams spend their day chasing updates instead of progressing the deal.',
  },
  {
    icon: Files,
    title: 'Missing Documents',
    copy: 'Critical files get delayed, requested repeatedly, or lost in communication.',
  },
]

const platformPillars = [
  {
    icon: ClipboardList,
    title: 'One shared transaction',
    copy: 'Every stage, party and action sits inside one living deal record.',
  },
  {
    icon: FileStack,
    title: 'Documents in motion',
    copy: 'Outstanding items are visible before they become delays.',
  },
  {
    icon: Smartphone,
    title: 'Client-ready visibility',
    copy: 'Buyers and sellers can see what happened and what comes next.',
  },
]

const showcaseData = [
  {
    id: 'transaction-workspace',
    eyebrow: 'Product Showcase 01',
    headline: 'One timeline for the entire transaction.',
    description:
      'Every update, milestone and next step lives in one shared transaction workspace. No separate spreadsheets. No chasing updates. No uncertainty.',
    callouts: ['Progress Tracking', 'Milestone Visibility', 'Party Coordination', 'Activity History'],
    visual: <TransactionWorkspaceVisual />,
  },
  {
    id: 'document-collection',
    eyebrow: 'Product Showcase 02',
    headline: 'Documents move before delays happen.',
    description:
      'Request, collect and track outstanding documents from one place. Everyone knows what is still required. Everyone sees when it arrives.',
    callouts: ['Document Readiness', 'Outstanding Items', 'Submission Tracking', 'Automated Requests'],
    visual: <DocumentCollectionVisual />,
    tone: 'dark',
  },
  {
    id: 'client-portal',
    eyebrow: 'Product Showcase 03',
    headline: 'Keep every client informed.',
    description:
      'Give buyers and sellers a branded portal where they can follow progress, upload documents and see what happens next.',
    callouts: ['Client Visibility', 'Branded Experience', 'Status Updates', 'Next Steps'],
    visual: <ClientPortalVisual />,
  },
]

const processSteps = [
  {
    icon: CheckCircle2,
    title: 'Offer Accepted',
    copy: 'The transaction begins with the agreed terms and key parties in place.',
  },
  {
    icon: UserPlus,
    title: 'Parties Invited',
    copy: 'Agents, attorneys, bond originators and clients join the same view.',
  },
  {
    icon: FolderCheck,
    title: 'Documents Collected',
    copy: 'Required files are requested, submitted and kept with the deal.',
  },
  {
    icon: Banknote,
    title: 'Finance Managed',
    copy: 'Bond progress and bank feedback stay visible to the right people.',
  },
  {
    icon: Scale,
    title: 'Transfer Progresses',
    copy: 'Legal steps, signing and lodgement move with clearer context.',
  },
  {
    icon: BadgeCheck,
    title: 'Registration Complete',
    copy: 'Final milestones close the loop and everyone knows the outcome.',
  },
]

const outcomes = [
  {
    title: 'Get documents faster',
    copy: 'Outstanding files are visible before they hold up the transaction.',
  },
  {
    title: 'Reduce follow-ups',
    copy: 'Status updates move into the product instead of another message thread.',
  },
  {
    title: 'Keep clients informed',
    copy: 'Buyers and sellers know what is happening without needing to ask.',
  },
  {
    title: 'Move transactions forward',
    copy: 'Every party can see the next action and what it depends on.',
  },
  {
    title: 'Get paid sooner',
    copy: 'Cleaner handoffs help deals reach registration with less drag.',
  },
]

const roleCards = [
  {
    icon: Users,
    title: 'Agent',
    copy: 'Spend less time chasing and more time closing.',
    preview: 'Client update ready',
  },
  {
    icon: Landmark,
    title: 'Attorney',
    copy: 'Receive cleaner files and clearer instructions.',
    preview: 'Transfer file complete',
  },
  {
    icon: WalletCards,
    title: 'Bond Originator',
    copy: 'Track progress without endless follow-ups.',
    preview: 'Bank feedback visible',
  },
  {
    icon: Building2,
    title: 'Developer',
    copy: 'Manage every sale from one workspace.',
    preview: 'Development overview',
  },
  {
    icon: UserRound,
    title: 'Buyer & Seller',
    copy: 'Stay informed throughout the transaction.',
    preview: 'Next step confirmed',
  },
]

const trustGroups = ['Tuckers', 'Agency Logos', 'Developer Logos', 'Originator Logos']
const heroHeadlineLines = ['One transaction.', 'Every party', 'connected.']
const heroPartyCards = [
  {
    icon: Users,
    title: 'Agent',
    copy: 'Move the deal after the offer is signed.',
  },
  {
    icon: UserRound,
    title: 'Buyer',
    copy: 'See what is needed and what happens next.',
  },
  {
    icon: UserRound,
    title: 'Seller',
    copy: 'Stay close to progress through registration.',
  },
  {
    icon: Landmark,
    title: 'Attorney',
    copy: 'Receive cleaner files and clearer context.',
  },
  {
    icon: WalletCards,
    title: 'Bond Originator',
    copy: 'Keep finance visible to the right parties.',
  },
  {
    icon: Building2,
    title: 'Developer',
    copy: 'See every sale moving through transfer.',
  },
]
const connectedParties = ['Buyer', 'Seller', 'Agent', 'Attorney', 'Finance']
const connectedStages = ['Offer', 'Documents', 'Finance', 'Transfer', 'Registration']
const socialProofCards = [
  {
    label: 'Partner Quotes',
    title: 'Reserved for launch partner feedback',
    copy: 'A structured space for the words that prove the industry helped shape Arch9.',
  },
  {
    label: 'Industry Endorsements',
    title: 'Built for professional confidence',
    copy: 'A future endorsement layer for attorneys, originators, agents and developers.',
  },
  {
    label: 'Case Studies',
    title: 'Proof through live transactions',
    copy: 'A framework for before-and-after stories once launch partners go live.',
  },
]

function BrowserDeviceFrame({ children, dark = false, label = 'Arch9' }) {
  return (
    <div className={`arch-browser-frame ${dark ? 'arch-browser-frame-dark' : ''}`}>
      <div className="arch-browser-bar">
        <span className="arch-browser-dot" />
        <span className="arch-browser-dot" />
        <span className="arch-browser-dot" />
        <span className={`ml-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? 'bg-white/10 text-white/52' : 'bg-[#f3eee7] text-[#887765]'}`}>
          {label}
        </span>
      </div>
      <div className="p-2 md:p-4">{children}</div>
    </div>
  )
}

function MiniStatus({ label, value, float = false }) {
  const shouldReduceMotion = useReducedMotion()
  const canFloat = float && !shouldReduceMotion

  return (
    <motion.div
      className="rounded-[18px] border border-[#eadfce] bg-[#fffaf4] p-4"
      animate={canFloat ? { y: [0, -4, 0] } : undefined}
      transition={canFloat ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : undefined}
      style={{ willChange: canFloat ? 'transform' : 'auto' }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b7760]">{label}</p>
      <p className="mt-2 text-sm font-bold text-[#171412]">{value}</p>
    </motion.div>
  )
}

function TransactionWorkspaceVisual({ floating = false }) {
  const shouldReduceMotion = useReducedMotion()
  const rows = [
    ['Offer Accepted', 'Complete', 'done'],
    ['Buyer Onboarding', 'Complete', 'done'],
    ['Finance Application', 'Active', 'open'],
    ['Transfer Instruction', 'Next', 'open'],
    ['Registration', 'Waiting', 'open'],
  ]

  return (
    <div className="group/product overflow-hidden rounded-[28px] border border-[#e8ddcf] bg-[#fbf7f1]">
      <div className="flex items-center justify-between border-b border-[#e6dccf] bg-white px-5 py-4 md:px-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8b7760]">Transaction Workspace</p>
          <h3 className="mt-2 text-[1.4rem] font-extrabold text-[#171412] md:text-[2rem]">Unit 14 · Junoah Estate</h3>
        </div>
        <div className="hidden rounded-full bg-[#171412] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white sm:block">
          In Progress
        </div>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-[1.2fr_0.8fr] md:p-8">
        <div className="rounded-[26px] bg-white p-5 shadow-[0_18px_50px_rgba(23,20,18,0.06)] md:p-7">
          <div className="flex items-center justify-between text-sm font-bold text-[#6f6457]">
            <span>Transaction Progress</span>
            <span>72%</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-[#efe6db]">
            <motion.div
              className="h-2 rounded-full bg-[#171412]"
              initial={{ width: shouldReduceMotion ? '72%' : 0 }}
              whileInView={{ width: '72%' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: motionEaseOut }}
            />
          </div>

          <div className="mt-7 space-y-3">
            {rows.map(([label, status, state]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-[18px] border border-[#eee4d8] bg-[#fffaf4] px-4 py-4 transition duration-300 group-hover/product:border-[#d8c4aa] group-hover/product:bg-white">
                <div className="flex items-center gap-3">
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-black ${
                    state === 'done' ? 'border-[#171412] bg-[#171412] text-white' : 'border-[#cdbda8] text-[#8b7760]'
                  }`}>
                    {state === 'done' ? '✓' : '○'}
                  </span>
                  <span className="text-sm font-bold text-[#312b25]">{label}</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b7760]">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <MiniStatus label="Next Step" value="Attorney instruction" float={floating} />
          <MiniStatus label="Outstanding Documents" value="2 buyer documents" float={floating} />
          <MiniStatus label="Latest Activity" value="Payslip requested" float={floating} />
          <MiniStatus label="Connected Parties" value="4 connected" float={floating} />
        </div>
      </div>
    </div>
  )
}

function DocumentCollectionVisual() {
  const shouldReduceMotion = useReducedMotion()
  const docs = [
    ['FICA documents', 'Ready'],
    ['Proof of income', 'Requested'],
    ['Bank statements', 'Submitted'],
    ['Signed mandate', 'Ready'],
  ]

  return (
    <div className="group/docs overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] text-white">
      <div className="grid gap-6 p-5 md:grid-cols-[0.75fr_1.25fr] md:p-8">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-5 md:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#cdb69b]">Buyer Portal</p>
          <h3 className="mt-4 text-[1.8rem] font-extrabold leading-tight text-white">Documents needed</h3>
          <p className="mt-4 text-base leading-7 text-white/66">
            The client sees what to upload, what has arrived and what still needs attention.
          </p>
          <div className="mt-7 rounded-[22px] bg-[#f7efe0] p-5 text-[#171412]">
            <p className="text-sm font-bold">Document readiness</p>
            <div className="mt-3 h-2 rounded-full bg-[#e1d5c5]">
              <motion.div
                className="h-2 rounded-full bg-[#171412]"
                initial={{ width: shouldReduceMotion ? '68%' : 0 }}
                whileInView={{ width: '68%' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: motionEaseOut }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-[26px] bg-[#fbf7f1] p-4 text-[#171412] md:p-6">
          <div className="grid gap-3">
            {docs.map(([label, status]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-[18px] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(23,20,18,0.05)] transition duration-300 group-hover/docs:translate-x-1">
                <div className="flex items-center gap-3">
                  <FileStack className="h-4 w-4 text-[#6d5c4a]" />
                  <span className="text-sm font-bold">{label}</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b7760] group-hover/docs:text-[#171412]">{status}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[22px] border border-[#e5dacb] bg-[#fffaf4] p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8b7760]">Automated Request</p>
            <p className="mt-2 text-base font-bold">Latest payslip requested from buyer.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClientPortalVisual() {
  return (
    <div className="group/portal overflow-hidden rounded-[28px] border border-[#e8ddcf] bg-[#fbf7f1]">
      <div className="grid gap-5 p-5 md:grid-cols-[1fr_360px] md:p-8">
        <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(23,20,18,0.06)] md:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8b7760]">Branded Portal</p>
          <h3 className="mt-4 text-[2rem] font-extrabold leading-tight text-[#171412]">Your transaction is moving.</h3>
          <p className="mt-4 max-w-[520px] text-base leading-7 text-[#6f6457]">
            Buyers and sellers see a calm view of progress, required documents and next steps.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {['Offer', 'Finance', 'Transfer'].map((item, index) => (
              <div key={item} className="rounded-[20px] border border-[#eadfce] bg-[#fffaf4] p-4">
                <div className={`h-2 rounded-full ${index < 2 ? 'bg-[#171412]' : 'bg-[#d8c7b5]'}`} />
                <p className="mt-4 text-sm font-bold text-[#171412]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[320px] rounded-[36px] border border-[#201b16] bg-[#171412] p-3 shadow-[0_24px_70px_rgba(23,20,18,0.2)]">
          <div className="rounded-[28px] bg-[#fbf7f1] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b7760]">Mobile Portal</p>
            <h4 className="mt-4 text-[1.35rem] font-extrabold leading-tight text-[#171412]">Finance in progress</h4>
            <div className="mt-5 rounded-[20px] bg-white p-4">
              <p className="text-sm font-bold">Next step</p>
              <p className="mt-2 text-sm leading-6 text-[#6f6457]">Upload updated proof of income.</p>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[18px] bg-white px-4 py-3 text-sm font-bold text-[#171412] transition duration-300 group-hover/portal:bg-[#171412] group-hover/portal:text-white">Status update received</div>
              <div className="rounded-[18px] bg-white px-4 py-3 text-sm font-bold text-[#171412] transition duration-300 group-hover/portal:bg-[#171412] group-hover/portal:text-white">2 documents outstanding</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroMockup() {
  return (
    <div className="mx-auto w-full max-w-[760px] lg:max-w-none">
      <BrowserDeviceFrame dark label="Live transaction">
        <TransactionWorkspaceVisual floating />
      </BrowserDeviceFrame>
    </div>
  )
}

function HeroPartyStrip() {
  return (
    <FadeUp className="mt-12 lg:mt-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#cdb69b]">
        BUILT FOR EVERY PARTY INVOLVED
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {heroPartyCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className="rounded-[24px] border border-white/10 bg-white/[0.055] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur-xl">
              <Icon className="h-5 w-5 text-[#eadcc7]" />
              <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{card.copy}</p>
            </div>
          )
        })}
      </div>
    </FadeUp>
  )
}

function SignatureMomentSection() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 72%', 'end 62%'],
  })
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.08, 1])

  return (
    <section
      ref={sectionRef}
      id="connected-timeline"
      className="relative overflow-hidden bg-[#080808] py-[88px] text-white md:py-[112px] xl:py-[150px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(234,220,199,0.16),transparent_34%),linear-gradient(180deg,#080808_0%,#111111_55%,#080808_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 px-6 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center xl:px-16">
        <FadeUp>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#cdb69b]">The Arch9 Moment</p>
          <h2 className="mt-5 max-w-[620px] text-[2.65rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-white md:text-[4.2rem] xl:text-[5.2rem]">
            Finally, everyone moves together.
          </h2>
          <p className="mt-6 max-w-[520px] text-[1.125rem] font-medium leading-8 text-white/68 xl:text-[1.25rem] xl:leading-9">
            Buyer, seller, agent, attorney and finance stop moving through separate threads. The deal becomes one connected timeline.
          </p>
        </FadeUp>

        <motion.div
          className="arch-dark-card relative min-h-[620px] overflow-hidden rounded-[42px] p-5 md:p-8"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: motionEaseOut }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 820 620" aria-hidden="true">
            <defs>
              <linearGradient id="archConnection" x1="0" x2="1">
                <stop offset="0%" stopColor="#eadcc7" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#eadcc7" stopOpacity="0.86" />
                <stop offset="100%" stopColor="#eadcc7" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            {[
              'M164 128 C266 170 318 246 410 310',
              'M656 128 C554 170 502 246 410 310',
              'M124 492 C236 438 314 374 410 310',
              'M696 492 C584 438 506 374 410 310',
              'M410 96 C410 184 410 236 410 310',
            ].map((path) => (
              <motion.path
                key={path}
                d={path}
                fill="none"
                stroke="url(#archConnection)"
                strokeWidth="2"
                pathLength={shouldReduceMotion ? 1 : scrollYProgress}
              />
            ))}
          </svg>

          <div className="relative grid min-h-[560px] grid-cols-2 gap-4 md:grid-cols-3">
            {connectedParties.map((party, index) => (
              <motion.div
                key={party}
                className={`flex h-28 items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.06] text-center shadow-[0_22px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl ${
                  index === 4 ? 'col-span-2 md:col-span-1 md:col-start-2' : ''
                }`}
                initial={{ opacity: 0.35, y: shouldReduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: motionEaseOut }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#cdb69b]">Connected</p>
                  <p className="mt-2 text-lg font-bold text-white">{party}</p>
                </div>
              </motion.div>
            ))}

            <div className="col-span-2 md:col-span-3">
              <div className="relative mx-auto mt-4 max-w-[640px] rounded-[34px] border border-[#eadcc7]/18 bg-[#f8f6f2] p-5 text-[#080808] shadow-[0_34px_110px_rgba(0,0,0,0.32)] md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#887765]">Live Transaction</p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">Junoah Estate · Unit 14</h3>
                  </div>
                  <span className="rounded-full bg-[#080808] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white">72%</span>
                </div>
                <div className="mt-7 h-2 rounded-full bg-[#e2d7c8]">
                  <motion.div
                    className="h-2 origin-left rounded-full bg-[#080808]"
                    style={{ scaleX: shouldReduceMotion ? 1 : progressScale }}
                  />
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-5">
                  {connectedStages.map((stage, index) => (
                    <motion.div
                      key={stage}
                      className="rounded-[18px] border border-[#e3d8c9] bg-white p-3 text-center"
                      initial={{ opacity: 0.45 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#887765]">Stage {index + 1}</span>
                      <span className="mt-2 block text-sm font-bold">{stage}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <SectionContainer id="problem" tone="dark">
      <div>
        <FadeUp>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#cdb69b]">The Problem</p>
          <h2 className="mt-5 max-w-[900px] text-[2.25rem] font-extrabold leading-none text-[#f5f1eb] md:text-[3.25rem] xl:text-[4.35rem]">
            Everyone is working. Nobody is aligned.
          </h2>
          <p className="mt-6 max-w-[760px] text-[1.125rem] leading-8 text-white/70 xl:text-[1.25rem] xl:leading-9">
            Property transactions slow down because information is scattered across too many places.
            Emails. WhatsApps. Spreadsheets. Shared drives. Arch9 brings the transaction back into one shared system.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-12 grid gap-4 lg:grid-cols-3">
          {problemCards.map((card) => {
            const Icon = card.icon
            return (
              <StaggerItem key={card.title} className="rounded-[28px] border border-white/10 bg-white/[0.05] p-7 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/[0.08] text-[#eadcc7]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-7 text-[1.45rem] font-bold text-white">{card.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/72">{card.copy}</p>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </SectionContainer>
  )
}

function PlatformSection() {
  return (
    <SectionContainer id="platform">
      <FadeUp className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Platform Overview"
            title="The transaction becomes the product."
            description="Arch9 turns the scattered property process into one connected operating layer for the people moving the deal forward."
            className="max-w-[780px]"
          />
          <p className="max-w-[520px] text-[1.125rem] leading-8 text-[#6f6457] lg:justify-self-end xl:text-[1.25rem] xl:leading-9">
            Instead of forcing people to ask for updates, Arch9 gives each party the same source of truth at the moment they need it.
          </p>
      </FadeUp>

      <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
        {platformPillars.map((pillar) => {
          const Icon = pillar.icon
          return (
            <StaggerItem key={pillar.title} className="rounded-[30px] border border-[#e5dacb] bg-white p-7 shadow-[0_18px_54px_rgba(23,20,18,0.05)] md:p-8">
              <Icon className="h-6 w-6 text-[#6d5c4a]" />
              <h3 className="mt-7 text-[1.45rem] font-bold leading-tight text-[#171412]">{pillar.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#6f6457]">{pillar.copy}</p>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </SectionContainer>
  )
}

function HowItWorksSection() {
  const timelineRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 65%'],
  })
  const timelineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <SectionContainer id="how-it-works" tone="dark">
      <FadeUp className="mx-auto max-w-[840px] text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#cdb69b]">How It Works</p>
        <h2 className="mt-4 text-[2.25rem] font-extrabold leading-none text-white md:text-[3.25rem] xl:text-[4.35rem]">
          From offer to registration.
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-[1.125rem] leading-8 text-white/70 xl:text-[1.25rem] xl:leading-9">
          One transaction. Every party connected.
        </p>
      </FadeUp>

      <div ref={timelineRef} className="relative mx-auto mt-14 grid max-w-[1020px] gap-5 md:gap-7">
        <div className="absolute bottom-8 left-7 top-8 hidden w-px bg-white/10 md:block" />
        <motion.div
          className="absolute bottom-8 left-7 top-8 hidden w-px origin-top bg-[#eadcc7] md:block"
          style={{ scaleY: shouldReduceMotion ? 1 : timelineScale }}
        />
        {processSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.article
              key={step.title}
              className="relative grid gap-5 rounded-[30px] border border-white/10 bg-white/[0.05] p-6 md:grid-cols-[96px_1fr] md:items-center md:p-8"
              initial={{ opacity: 0.45, y: shouldReduceMotion ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.42 }}
              transition={{ duration: 0.55, ease: motionEaseOut }}
            >
              <div className="flex items-center gap-4 md:block">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f7efe0] text-[#171412] md:mx-auto">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#cdb69b] md:mt-4 md:text-center">Step {index + 1}</p>
              </div>
              <div>
                <h3 className="text-[1.45rem] font-bold text-white md:text-[1.8rem]">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/68 md:text-[1.05rem]">{step.copy}</p>
              </div>
            </motion.article>
          )
        })}
      </div>
    </SectionContainer>
  )
}

function OutcomesSection() {
  return (
    <SectionContainer id="outcomes">
      <FadeUp>
        <SectionHeading eyebrow="Outcomes" title="What changes in practice?" className="max-w-[760px]" />
      </FadeUp>
      <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {outcomes.map((outcome) => (
          <StaggerItem key={outcome.title} className="rounded-[28px] border border-[#e5dacb] bg-white p-7 shadow-[0_14px_38px_rgba(23,20,18,0.04)]">
            <CheckCircle2 className="h-6 w-6 text-[#6d5c4a]" />
            <h3 className="mt-7 text-[1.35rem] font-bold leading-tight text-[#171412]">{outcome.title}</h3>
            <p className="mt-3 text-base leading-7 text-[#6f6457]">{outcome.copy}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionContainer>
  )
}

function RolesSection() {
  return (
    <SectionContainer id="roles" tone="soft">
      <FadeUp>
        <SectionHeading
          eyebrow="Built For Every Party"
          title="One platform. Different views."
          description="Every role gets the visibility and tools they need without losing the shared transaction context."
          className="max-w-[780px]"
        />
      </FadeUp>
      <StaggerContainer className="-mx-6 mt-12 flex snap-x gap-4 overflow-x-auto px-6 pb-3 md:-mx-10 md:px-10 xl:mx-0 xl:grid xl:grid-cols-5 xl:overflow-visible xl:px-0">
        {roleCards.map((role) => {
          const Icon = role.icon
          return (
            <StaggerItem
              key={role.title}
              className="group min-h-[310px] w-[304px] shrink-0 snap-start rounded-[30px] border border-[#e4d9cb] bg-white p-6 shadow-[0_14px_34px_rgba(23,20,18,0.04)] xl:w-auto"
              whileHover={{ y: -6, borderColor: '#cdb69b' }}
              transition={{ duration: 0.25, ease: motionEaseOut }}
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#eadfce] bg-[#faf6ef] text-[#6d5c4a]"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.25, ease: motionEaseOut }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <h3 className="mt-7 text-[1.35rem] font-bold text-[#171412]">{role.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#6f6457]">{role.copy}</p>
              <div className="mt-7 rounded-[20px] border border-[#eadfce] bg-[#fffaf4] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b7760]">Preview</p>
                <p className="mt-2 text-sm font-bold text-[#171412]">{role.preview}</p>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </SectionContainer>
  )
}

function TrustSection() {
  return (
    <SectionContainer id="trust" className="bg-[#f8f6f2]">
      <FadeUp className="mx-auto max-w-[920px] text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#8b7760]">Built With</p>
        <h2 className="mt-4 text-[2.25rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#080808] md:text-[3.25rem] xl:text-[4.35rem]">
          Built alongside the property industry.
        </h2>
        <p className="mx-auto mt-6 max-w-[720px] text-[1.125rem] font-medium leading-8 text-[#63594d] xl:text-[1.25rem] xl:leading-9">
          Arch9 has been designed with agents, attorneys, bond originators and developers who experience the transaction process every day.
        </p>
      </FadeUp>

      <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-4">
        {trustGroups.map((item) => (
          <StaggerItem key={item} className="arch-premium-card flex min-h-[150px] items-center justify-center rounded-[30px] px-5 text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#63594d]">{item}</span>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <FadeIn className="rounded-[34px] border border-[#d9cbbb] bg-[#080808] p-7 text-white shadow-[0_34px_100px_rgba(8,8,8,0.2)] md:p-9">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#cdb69b]">Launch Partners</p>
          <h3 className="mt-5 text-[2rem] font-extrabold leading-[0.98] tracking-[-0.04em] md:text-[2.8rem]">
            A trust system ready for real industry proof.
          </h3>
          <p className="mt-5 max-w-[560px] text-base font-medium leading-7 text-white/66 md:text-lg md:leading-8">
            The structure is ready for Tuckers, agency groups, developers, originators and the first public implementation stories.
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-4" stagger={0.08}>
          {socialProofCards.map((card) => (
            <StaggerItem key={card.label} className="arch-premium-card rounded-[28px] p-6 md:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b7760]">{card.label}</p>
              <h3 className="mt-3 text-xl font-extrabold tracking-[-0.03em] text-[#080808]">{card.title}</h3>
              <p className="mt-2 text-base leading-7 text-[#63594d]">{card.copy}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionContainer>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'Arch9 | The future of property transactions'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Arch9 is the connected transaction workspace for agents, attorneys, bond originators, developers and clients moving property deals from offer to registration.'
    )
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#171412]">
      <Header />

      <main>
        <section
          id="top"
          className="bg-[#171412]"
          style={{
            background:
              'radial-gradient(circle at 82% 18%, rgba(186, 157, 121, 0.16), transparent 32%), linear-gradient(180deg, #121212 0%, #171412 100%)',
          }}
        >
          <SectionContainer className="pb-[72px] pt-12 md:pb-24 md:pt-16 xl:pb-[120px] xl:pt-20">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 xl:gap-24">
              <div className="max-w-[680px]">
                <motion.p
                  className="text-sm font-bold uppercase tracking-[0.34em] text-[#cdb69b] md:text-base"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: motionEaseOut }}
                >
                  THE NEW STANDARD FOR PROPERTY TRANSACTIONS
                </motion.p>
                <h1 className="mt-6 text-[3rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-[#f5f1eb] sm:text-[3.45rem] md:text-[5.5rem] xl:text-[6.75rem]">
                  {heroHeadlineLines.map((line, index) => (
                    <motion.span
                      key={line}
                      className="block"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.12 + index * 0.1, ease: motionEaseOut }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  className="mt-6 max-w-full text-[1.125rem] font-medium leading-8 text-[#c9bdb0] lg:max-w-[520px] xl:text-[1.3rem] xl:leading-9"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.46, ease: motionEaseOut }}
                >
                  Arch9 brings agents, buyers, sellers, attorneys and finance teams into one shared workspace from offer to registration.
                </motion.p>

                <motion.div
                  className="mt-8 grid gap-3 sm:flex"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.58, ease: motionEaseOut }}
                >
                  <a href="/contact" className="bridge-button-primary bridge-button-light w-full sm:w-auto">
                    Book a Demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#how-it-works" className="bridge-button-secondary w-full border-white/18 bg-white/[0.06] text-white sm:w-auto">
                    See How It Works
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.34, ease: motionEaseOut }}
              >
                <HeroMockup />
              </motion.div>
            </div>
            <HeroPartyStrip />
          </SectionContainer>
        </section>

        <ProblemSection />
        <PlatformSection />
        <SignatureMomentSection />
        <ProductShowcase items={showcaseData} />
        <HowItWorksSection />
        <OutcomesSection />
        <RolesSection />
        <TrustSection />

        <CTASection
          id="contact"
          eyebrow="Arch9"
          title="The future of property transactions is being built now."
          description="See why agents, attorneys, developers and finance teams are moving toward a shared transaction workspace."
          primary={{ label: 'Book a Demo', href: '/contact' }}
          secondary={{ label: 'Contact Us', href: '/contact' }}
        />
      </main>

      <Footer />
    </div>
  )
}
