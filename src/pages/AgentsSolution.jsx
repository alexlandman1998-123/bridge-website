import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Home,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  X,
  Zap,
} from 'lucide-react'
import Footer from '../components/Footer'
import aboutArchitectureImage from '../assets/about-architecture.png'
import portalBuyerPreview from '../assets/portal-buyer-preview-cropped.png'
import portalSellerPreview from '../assets/portal-seller-preview-cropped.png'
import { breadcrumbJsonLd, serviceJsonLd, setPageSeo, softwareApplicationJsonLd } from '../lib/seo'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

const ease = [0.16, 1, 0.3, 1]

const differenceStories = [
  {
    number: '01',
    icon: Palette,
    title: 'It looks like you.',
    copy: 'Your logo. Your colours. Your client experience.',
    visual: 'brand',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'WhatsApp. Obviously.',
    copy: "Because that's where half the property industry already is.",
    visual: 'whatsapp',
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Clients can check for themselves.',
    copy: 'Branded buyer and seller portals keep everyone in the loop.',
    visual: 'portal',
  },
  {
    number: '04',
    icon: UsersRound,
    title: 'Your partners are in on it too.',
    copy: 'Attorneys, bond originators and the people around the deal work from the same transaction.',
    visual: 'partners',
  },
  {
    number: '05',
    icon: BadgeCheck,
    title: 'SOLD. Now what?',
    copy: "Arch9 doesn't disappear when the mandate becomes a sale. We follow it all the way to registration.",
    visual: 'sold',
  },
  {
    number: '06',
    icon: CheckCircle2,
    title: "And yes, it's a proper CRM.",
    copy: "Leads, listings, buyers, viewings, offers, documents and reporting. All the stuff you'd expect.",
    visual: 'crm',
  },
]

const portalPreviews = [
  {
    title: 'Seller Portal',
    eyebrow: 'Sale journey',
    copy: 'Offer accepted, documents and transfer steps in one mobile view.',
    image: portalSellerPreview,
  },
  {
    title: 'Buyer Portal',
    eyebrow: 'Purchase journey',
    copy: 'Tasks, finance progress and next actions without another phone call.',
    image: portalBuyerPreview,
  },
]

const agencyFeatureSpinnerItems = [
  {
    id: 'whatsapp-updates',
    spinnerTitle: 'WhatsApp updates. To everyone.',
    eyebrow: 'Automated WhatsApp updates',
    headline: 'Keep everyone updated without becoming a full-time WhatsApp operator.',
    description: 'Arch9 can trigger the routine messages around leads, viewings, seller updates, buyer updates and transaction milestones.',
    benefits: ['New lead responses', 'Viewing confirmations and reminders', 'Buyer and seller milestone updates', 'Registration notifications'],
    visual: 'whatsapp',
  },
  {
    id: 'branded-portals',
    spinnerTitle: 'Branded portals. Obviously.',
    eyebrow: 'Buyer and seller portals',
    headline: 'Your clients see your brand. Arch9 does the work underneath.',
    description: 'Clients get a branded place to see property information, documents, activity and progress without feeling sent into another product.',
    benefits: ['Agency branding', 'Property and journey progress', 'Documents and activity', 'Buyer and seller views'],
    visual: 'portal',
  },
  {
    id: 'digital-business-cards',
    spinnerTitle: 'Digital business cards. Finally useful.',
    eyebrow: 'Digital business cards',
    headline: 'A business card your agents can actually send.',
    description: 'Give each agent a polished, shareable profile with contact details, current listings and your agency brand in one link.',
    benefits: ['Agent-branded profile', 'Share by link or QR code', 'Contact details and listings', 'Consistent agency branding'],
    visual: 'brand',
  },
  {
    id: 'documents',
    spinnerTitle: 'Stop chasing FICA docs.',
    eyebrow: 'Automatic document requests',
    headline: 'Consider the documents chased.',
    description: 'Request the right documents, collect mobile uploads, show outstanding states and keep everything attached to the right record.',
    benefits: ['Mobile uploads', 'Requested, uploaded and outstanding states', 'Automatic reminders', 'Documents stored against the transaction'],
    visual: 'sold',
  },
  {
    id: 'lead-automation',
    spinnerTitle: 'Leads in. Follow-ups out.',
    eyebrow: 'Lead automation',
    headline: 'A lead arrives. Arch9 gets moving.',
    description: 'When an enquiry lands, Arch9 records the source, assigns the agent, sends a response and creates the next follow-up.',
    benefits: ['Portal and website enquiries', 'Source tracking', 'Agent assignment', 'Follow-up creation'],
    visual: 'crm',
  },
  {
    id: 'property24',
    spinnerTitle: 'Property24 lead? Already handled.',
    eyebrow: 'Speed to lead',
    headline: 'Before someone remembers to check their inbox, Arch9 already knows about it.',
    description: 'Incoming portal leads can appear in the workspace fast, with the right listing, source and next action attached.',
    benefits: ['Lead record created', 'Listing context included', 'Agent notified', 'Next response ready'],
    visual: 'crm',
  },
  {
    id: 'crm',
    spinnerTitle: 'Your CRM might finally get used.',
    eyebrow: 'Useful client context',
    headline: 'Less data capturing. More useful context.',
    description: 'Buyer profiles, seller profiles, notes, requirements, conversations, activity and property relationships live where work happens.',
    benefits: ['Buyer and seller profiles', 'Notes and conversations', 'Requirements and relationships', 'Follow-ups tied to activity'],
    visual: 'crm',
  },
  {
    id: 'viewings',
    spinnerTitle: 'Viewings without the admin.',
    eyebrow: 'Viewing management',
    headline: 'Book it. Confirm it. Track it. Move on.',
    description: 'Handle viewing scheduling, reminders, confirmations, history and seller visibility without a separate admin chase.',
    benefits: ['Agent calendar', 'Buyer RSVP', 'Reminders and confirmations', 'Viewing history'],
    visual: 'whatsapp',
  },
  {
    id: 'seller-portal',
    spinnerTitle: 'Your sellers can check themselves.',
    eyebrow: 'Seller portal',
    headline: 'Give sellers somewhere to look before they ask, “Any update?”',
    description: 'Sellers can see listing performance, enquiries, viewings, feedback, activity and progress in a branded portal.',
    benefits: ['Listing performance', 'Buyer interest and enquiries', 'Viewing feedback', 'Progress and activity'],
    visual: 'portal',
  },
  {
    id: 'publish',
    spinnerTitle: 'List once. Publish everywhere.',
    eyebrow: 'Listing syndication',
    headline: 'One listing. One source of truth.',
    description: 'Control portals, agency website publishing, listing status, media and marketing channels from one place.',
    benefits: ['Portal controls', 'Agency website publishing', 'Listing media', 'Marketing status'],
    visual: 'brand',
  },
  {
    id: 'listing-record',
    spinnerTitle: 'One listing. Everything attached.',
    eyebrow: 'Connected listing record',
    headline: 'The whole listing lives together.',
    description: 'Property, seller, leads, viewings, marketing, documents, offers, commission and activity stay connected.',
    benefits: ['Property and seller context', 'Leads and viewings', 'Offers and documents', 'Commission and activity'],
    visual: 'partners',
  },
  {
    id: 'offers',
    spinnerTitle: 'Offers without the paper chase.',
    eyebrow: 'Offer workflow',
    headline: 'From interested buyer to signed deal without losing the thread.',
    description: 'Buyer details, supporting documents, agreement status, signatures and accepted offers move into transaction work.',
    benefits: ['Offer status', 'Supporting documents', 'Agreement and signatures', 'Accepted offer handoff'],
    visual: 'sold',
  },
  {
    id: 'sold',
    spinnerTitle: "Sold? We're just getting started.",
    eyebrow: 'Post-sale transaction',
    headline: 'Most systems stop at sold. Arch9 follows the property to registration.',
    description: 'Accepted offer, buyer onboarding, FICA, finance, attorneys, transfer and registration stay visible in one journey.',
    benefits: ['Buyer onboarding', 'Finance and FICA', 'Attorney handoff', 'Registration progress'],
    visual: 'partners',
  },
  {
    id: 'registration',
    spinnerTitle: 'Track it all the way to registration.',
    eyebrow: 'Transaction workspace',
    headline: "Sold isn't a dead end. It's the start of the transaction.",
    description: 'Keep buyer, seller, attorney, bond originator, documents, tasks, milestones and registration progress together.',
    benefits: ['Shared milestones', 'Document visibility', 'Task tracking', 'Progress to registration'],
    visual: 'portal',
  },
  {
    id: 'attorney',
    spinnerTitle: 'Your attorney is already in the loop.',
    eyebrow: 'Connected conveyancing',
    headline: 'Less forwarding. Less re-capturing. More continuity.',
    description: 'Relevant transaction information can move into the attorney workflow instead of starting another disconnected email chain.',
    benefits: ['Cleaner handoff', 'Fewer duplicate captures', 'Shared transaction context', 'Continuity after sold'],
    visual: 'partners',
  },
  {
    id: 'finance',
    spinnerTitle: 'Finance. Also connected.',
    eyebrow: 'Bond originator connectivity',
    headline: "The bond application doesn't have to disappear into another system.",
    description: 'Finance requirements, applications, originator stages, bank progress and acceptance can stay visible around the transaction.',
    benefits: ['Finance requirement', 'Originator visibility', 'Bank stages', 'Transaction context'],
    visual: 'portal',
  },
  {
    id: 'updates',
    spinnerTitle: 'No more “Any update?”',
    eyebrow: 'Communication without chasing',
    headline: 'Give people the update before they have to ask for it.',
    description: 'Buyer portals, seller portals, WhatsApp updates and shared milestones reduce the constant status-check loop.',
    benefits: ['Buyer portal', 'Seller portal', 'WhatsApp milestones', 'Shared progress'],
    visual: 'whatsapp',
  },
  {
    id: 'oversight',
    spinnerTitle: 'Know what every agent is doing.',
    eyebrow: 'Agency oversight',
    headline: 'See the business without chasing the business.',
    description: 'Leads, listings, pipeline, activity, transactions, performance and team views give leadership a clearer operating picture.',
    benefits: ['Lead visibility', 'Listing pipeline', 'Team activity', 'Transaction performance'],
    visual: 'crm',
  },
  {
    id: 'reporting',
    spinnerTitle: 'Spreadsheets can retire now.',
    eyebrow: 'Reporting and visibility',
    headline: "The information is already in Arch9. You shouldn't have to rebuild it in Excel.",
    description: 'Connected records create cleaner reporting, pipeline visibility and operational context without manual spreadsheet rebuilds.',
    benefits: ['Pipeline reporting', 'Connected records', 'Operational visibility', 'Less manual admin'],
    visual: 'crm',
  },
  {
    id: 'enterprise',
    spinnerTitle: 'Enterprise software. Not enterprise pricing.',
    eyebrow: 'Sophisticated, without the bloat',
    headline: 'Big-system capability without big-system nonsense.',
    description: 'Agencies get a serious connected platform without the usual complexity, long setup cycles or heavy enterprise posture.',
    benefits: ['Broad capability', 'Lean implementation', 'Agency-focused workflows', 'Practical value'],
    visual: 'brand',
  },
  {
    id: 'pricing',
    spinnerTitle: 'Cheap. Very cheap.',
    eyebrow: 'Pricing philosophy',
    headline: 'We spent the money on the software, not the price tag.',
    description: 'The idea is simple: give agencies proper capability without making the price the scariest part of the conversation.',
    benefits: ['Transparent positioning', 'Low-friction adoption', 'Built for real agencies', 'Room to grow'],
    visual: 'brand',
    cta: { label: 'See pricing', href: '/pricing' },
  },
]

const agencyFeatureWheelOrder = [
  'whatsapp-updates',
  'branded-portals',
  'digital-business-cards',
  'property24',
  'documents',
  'seller-portal',
  'viewings',
  'sold',
  'registration',
  'attorney',
  'finance',
  'updates',
  'oversight',
  'pricing',
]

const agencyFeatureWheelItems = agencyFeatureWheelOrder
  .map((id) => agencyFeatureSpinnerItems.find((feature) => feature.id === id))
  .filter(Boolean)

function AgencyHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 md:px-8">
      <a href="/" className="text-[2rem] font-normal leading-none tracking-normal text-[#081C18]">
        arch9
      </a>
      <nav className="hidden items-center gap-10 text-sm font-semibold text-[#081C18] lg:flex" aria-label="Agency navigation">
        <a href="/solutions/agency/dashboard" className="text-[#064537]">For Agencies</a>
        <a href="/platform">Platform</a>
        <a href="/pricing">Pricing</a>
        <a href="/help">Resources</a>
      </nav>
      <div className="flex items-center gap-5">
        <a href="https://app.arch9.co.za" className="hidden text-sm font-semibold text-[#081C18] md:inline-flex">
          Login
        </a>
        <a
          href="/book-demo"
          className="group hidden min-h-12 items-center gap-2 rounded-full bg-[#06362E] px-6 text-sm font-semibold !text-white shadow-[0_16px_34px_rgba(6,54,46,0.18)] transition hover:-translate-y-0.5 hover:bg-[#052B25] md:inline-flex"
        >
          Book a Demo
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
        <Menu className="h-7 w-7 text-[#081C18] lg:hidden" />
      </div>
    </header>
  )
}

function StatCard({ value, label, detail, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="rounded-[14px] border border-[#0A3028]/8 bg-white p-4 shadow-[0_16px_40px_rgba(7,30,26,0.045)]"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease }}
    >
      <p className="text-2xl font-semibold tracking-normal text-[#071E1A]">{value}</p>
      <p className="mt-1 text-xs font-semibold text-[#0E6A55]">{label}</p>
      <p className="mt-1 text-[11px] leading-4 text-[#6B746F]">{detail}</p>
    </motion.div>
  )
}

function AgencyDashboardMockup() {
  const reduce = useReducedMotion()
  const stats = [
    ['12', 'New Leads', 'Today'],
    ['28', 'Viewings', 'This week'],
    ['9', 'Offers', 'In progress'],
    ['6', 'Transactions', 'On track'],
  ]

  return (
    <motion.div
      className="relative hidden gap-5 md:grid md:min-h-[520px]"
      initial={reduce ? false : { opacity: 0, x: 22 }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.24, ease }}
    >
      <div className="relative w-full rounded-[22px] border border-[#0A3028]/8 bg-white/92 p-5 shadow-[0_34px_100px_rgba(7,30,26,0.12)] backdrop-blur-xl md:absolute md:left-0 md:top-4 md:max-w-[640px] md:p-6">
        <div className="grid gap-5 md:grid-cols-[54px_1fr]">
          <aside className="hidden rounded-[16px] border border-[#0A3028]/6 bg-[#F8F4EC] py-4 md:grid md:justify-items-center md:gap-5">
            <span className="text-lg font-normal text-[#06362E]">arch9</span>
            {[Home, UsersRound, CalendarDays, FileText, LayoutDashboard].map((Icon) => (
              <Icon key={Icon.name} className="h-4 w-4 text-[#06362E]/72" />
            ))}
          </aside>
          <div>
            <p className="text-lg font-semibold text-[#081C18]">Good morning, Alex</p>
            <p className="mt-1 text-sm text-[#5B6862]">Here's what's happening in your agency today.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map(([value, label, detail], index) => (
                <StatCard key={label} value={value} label={label} detail={detail} delay={0.35 + index * 0.07} />
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[16px] border border-[#0A3028]/8 bg-[#FFFEFB] p-4">
                <p className="text-sm font-semibold text-[#081C18]">Recent activity</p>
                <div className="mt-4 space-y-4">
                  {[
                    ['New lead from Property24', '3 min ago', 'bg-[#F35B52]'],
                    ['Viewing confirmed for 12 Main Rd', '11 min ago', 'bg-[#4A67E8]'],
                    ['Offer accepted for 7 Greenway Ave', '1 hour ago', 'bg-[#06362E]'],
                  ].map(([title, time, color]) => (
                    <div key={title} className="flex items-start gap-3">
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full ${color}`} />
                      <div>
                        <p className="text-xs font-semibold text-[#081C18]">{title}</p>
                        <p className="mt-0.5 text-[11px] text-[#77827D]">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[16px] border border-[#0A3028]/8 bg-[#FFFEFB] p-4">
                <p className="text-sm font-semibold text-[#081C18]">Active transactions</p>
                <div className="mt-4 space-y-4">
                  {[
                    ['12 Main Rd, Claremont', 'Transfer', '82%'],
                    ['4 Sunset Blvd, Umhlanga', 'Bond registration', '61%'],
                    ['9 Park Lane, Joburg', 'Transfer', '39%'],
                  ].map(([title, stage, progress]) => (
                    <div key={title}>
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-[#081C18]">{title}</p>
                          <p className="text-[11px] text-[#77827D]">{stage}</p>
                        </div>
                        <p className="text-[11px] text-[#77827D]">{progress}</p>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-[#EDF0EC]">
                        <motion.div
                          className="h-full rounded-full bg-[#0E6A55]"
                          initial={reduce ? false : { width: 0 }}
                          whileInView={reduce ? undefined : { width: progress }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5, ease }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="hidden rounded-[30px] border-[7px] border-[#101817] bg-[#F9F7F1] p-3 shadow-[0_26px_70px_rgba(7,30,26,0.2)] md:absolute md:bottom-0 md:right-8 md:block md:w-[210px]"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.55, ease }}
      >
        <div className="mx-auto mb-3 h-4 w-16 rounded-b-xl bg-[#101817]" />
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-[#0E6A55]" />
          <span className="text-xs font-semibold text-[#081C18]">arch9</span>
        </div>
        <div className="mt-4 space-y-2">
          {[
            'Hi Sarah, quick update on 12 Main Rd.',
            "The offer has been accepted and we've instructed the attorney.",
            'You can track everything in your portal here.',
          ].map((message) => (
            <div key={message} className="ml-auto max-w-[145px] rounded-[12px] bg-[#DCF5DD] px-3 py-2 text-[10px] leading-4 text-[#123A2F]">
              {message}
            </div>
          ))}
          <button className="ml-auto flex rounded-[12px] bg-white px-3 py-2 text-[10px] font-semibold text-[#0E6A55] shadow-[0_8px_18px_rgba(7,30,26,0.06)]">
            View your update
          </button>
          <div className="max-w-[120px] rounded-[12px] bg-white px-3 py-2 text-[10px] text-[#4B5652] shadow-[0_8px_18px_rgba(7,30,26,0.05)]">
            Great, thanks!
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function HeroSection() {
  const reduce = useReducedMotion()
  return (
    <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-9 pt-8 md:px-8 md:pb-12 md:pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
      <motion.div initial={reduce ? false : 'hidden'} animate="visible" transition={{ staggerChildren: 0.1 }}>
        <motion.p variants={fadeUp} transition={{ duration: 0.48, ease }} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0E6A55] md:text-xs md:tracking-[0.26em]">
          For estate agencies
        </motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-5 max-w-[680px] text-[clamp(3.25rem,13vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[#071E1A] md:text-[4.6rem] md:tracking-normal">
          You’ve got listings to move.
          <span className="block text-[#0E6A55]">We’ll handle the admin.</span>
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.55, ease }} className="mt-6 max-w-[90%] text-lg font-normal leading-[1.5] text-[#34413C] md:max-w-[570px] md:text-lg md:leading-8">
          Leads come in. Viewings happen. Offers get signed. Attorneys get instructed. Clients want updates. Arch9 keeps it connected.
        </motion.p>
        <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="/book-demo" className="group inline-flex min-h-[62px] w-full items-center justify-center gap-2 rounded-full bg-[#06362E] px-7 text-sm font-semibold !text-white transition hover:-translate-y-0.5 hover:bg-[#052B25] sm:w-auto md:min-h-[54px] md:shadow-[0_18px_44px_rgba(6,54,46,0.18)]">
            Book a Demo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a href="#journey" className="inline-flex min-h-[62px] w-full items-center justify-center rounded-full border border-[#0A3028]/18 bg-transparent px-7 text-sm font-semibold text-[#071E1A] transition hover:bg-white sm:w-auto md:min-h-[54px]">
            See how it works
          </a>
        </motion.div>
      </motion.div>

      <AgencyDashboardMockup />
    </section>
  )
}

function AgencyContrastCardsSection() {
  const cards = [
    {
      number: '01',
      title: ['Your agency.', 'Your brand.'],
      copy: 'Arch9 works behind the scenes. Your clients see you.',
      visual: 'brand',
    },
    {
      number: '02',
      title: ['From lead.', 'To registration.'],
      copy: "Most agency software stops at the sale. We don’t.",
      visual: 'progress',
    },
    {
      number: '03',
      title: ['Everyone.', 'Actually connected.'],
      copy: 'Agent. Buyer. Seller. Attorney. Bond originator.',
      visual: 'network',
    },
    {
      number: '04',
      title: ['Enterprise software.', 'Without the enterprise bill.'],
      copy: 'Cheap. Very cheap.',
      visual: 'pricing',
    },
  ]

  return (
    <section className="overflow-hidden bg-[#031e19] py-8 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64b992]">Why agencies choose Arch9</p>
      </div>
      <div className="mt-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-8 pb-2 [scrollbar-width:none] md:mx-auto md:grid md:w-full md:max-w-[1440px] md:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
        {cards.map((card) => (
          <article
            key={card.number}
            className="relative flex min-h-[238px] w-[68vw] max-w-[278px] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-white/12 bg-white/[0.055] p-5 text-white md:min-h-[315px] md:w-auto md:max-w-none md:p-7"
          >
            <span className="inline-flex h-7 w-fit items-center rounded-full bg-[#64b992] px-3 text-xs font-semibold text-[#031e19]">{card.number}</span>
            <h3 className="relative z-10 mt-6 text-[1.32rem] font-semibold leading-[1.08] tracking-[-0.025em] md:text-[1.62rem]">
              {card.title.map((line) => <span key={line} className="block">{line}</span>)}
            </h3>
            <p className={`relative z-10 mt-3 max-w-[245px] text-[0.86rem] leading-5 md:text-[0.95rem] md:leading-6 ${card.visual === 'pricing' ? 'text-[#64b992]' : 'text-white/72'}`}>{card.copy}</p>
            {card.visual === 'brand' ? (
              <div className="pointer-events-none mt-auto flex items-end justify-between gap-3 pt-4">
                <div className="rounded-[16px] border border-white/10 bg-white/[0.07] px-4 py-3">
                  <p className="text-lg font-normal leading-none text-white">your agency</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#64b992]">Client portal</p>
                </div>
                <div className="grid gap-1.5">
                  <span className="h-6 w-6 rounded-full bg-[#64b992]" />
                  <span className="h-6 w-6 rounded-full bg-white/78" />
                </div>
              </div>
            ) : null}
            {card.visual === 'progress' ? (
              <div className="mt-auto space-y-1.5 pt-4">
                {['Lead', 'Listing', 'Sold', 'Transfer', 'Registered'].map((step, index) => (
                  <p key={step} className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${index === 4 ? 'bg-[#64b992] text-[#031e19]' : 'bg-white/8 text-white/72'}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {step}
                  </p>
                ))}
              </div>
            ) : null}
            {card.visual === 'network' ? (
              <div className="mt-auto pt-4">
                <div className="rounded-[18px] border border-white/10 bg-white/[0.06] p-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#64b992] text-xs font-semibold text-[#031e19]">arch9</span>
                    <span className="h-px flex-1 bg-white/14" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64b992]">One deal</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {['Agent', 'Buyer', 'Seller', 'Attorney', 'Bond originator'].map((role) => (
                      <span key={role} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/78">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            {card.visual === 'pricing' ? (
              <a href="/pricing" className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#64b992]">
                See pricing
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

function FeatureSpinnerSection() {
  const reduce = useReducedMotion()
  const featureItems = agencyFeatureWheelItems
  const [activeIndex, setActiveIndex] = useState(3)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const spinnerRef = useRef(null)
  const touchStartY = useRef(null)
  const touchLastY = useRef(null)
  const touchStartTime = useRef(0)
  const touchRemainder = useRef(0)
  const touchMoved = useRef(false)
  const activeFeature = featureItems[activeIndex]

  const spinFeature = useCallback((direction, amount = 1) => {
    const steps = Math.max(1, Math.min(Math.round(amount), 3))
    setHasInteracted(true)
    setActiveIndex((current) => {
      const next = current + direction * steps
      return ((next % featureItems.length) + featureItems.length) % featureItems.length
    })
  }, [featureItems.length])

  const handleWheel = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    const force = Math.min(Math.max(Math.abs(event.deltaY) / 80, 1), 3)
    spinFeature(event.deltaY > 0 ? 1 : -1, force)
  }, [spinFeature])

  useEffect(() => {
    const spinner = spinnerRef.current
    if (!spinner) return undefined
    spinner.addEventListener('wheel', handleWheel, { passive: false })
    function handleTouchMove(event) {
      event.preventDefault()
      event.stopPropagation()
    }
    spinner.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      spinner.removeEventListener('wheel', handleWheel)
      spinner.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleWheel])

  function handleTouchStart(event) {
    touchStartY.current = event.touches[0]?.clientY ?? null
    touchLastY.current = touchStartY.current
    touchStartTime.current = performance.now()
    touchRemainder.current = 0
    touchMoved.current = false
  }

  function handleTouchMove(event) {
    event.preventDefault()
    event.stopPropagation()
    const nextY = event.touches[0]?.clientY
    if (nextY == null || touchLastY.current == null) return
    touchRemainder.current += touchLastY.current - nextY
    touchLastY.current = nextY

    const step = 58
    if (Math.abs(touchRemainder.current) < step) return
    const direction = touchRemainder.current > 0 ? 1 : -1
    spinFeature(direction, 1)
    touchMoved.current = true
    touchRemainder.current -= direction * step
  }

  function handleTouchEnd(event) {
    if (touchStartY.current == null) return
    const endY = event.changedTouches[0]?.clientY ?? touchStartY.current
    const distance = touchStartY.current - endY
    const elapsed = Math.max(performance.now() - touchStartTime.current, 1)
    const velocity = Math.abs(distance) / elapsed
    touchStartY.current = null
    touchLastY.current = null
    touchRemainder.current = 0
    if (touchMoved.current) {
      touchMoved.current = false
      return
    }
    if (Math.abs(distance) < 18) return
    spinFeature(distance > 0 ? 1 : -1, velocity > 0.9 ? 2 : 1)
  }

  function handleFeatureClick(index) {
    setHasInteracted(true)
    if (index === activeIndex) {
      setSelectedFeature(featureItems[index])
      return
    }
    setActiveIndex(index)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      spinFeature(1)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      spinFeature(-1)
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedFeature(activeFeature)
    }
  }

  return (
    <section id="journey" className="overflow-hidden bg-[#faf5ed] px-0 py-12 md:px-8 md:py-24">
      <div className="mx-auto grid w-full max-w-[1280px] gap-5 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
        <div className="px-6 md:px-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0E6A55]">See what Arch9 can do ↓</p>
          <h2 className="mt-4 hidden text-[2.35rem] font-semibold leading-tight tracking-normal text-[#071E1A] md:block md:text-[3.1rem]">
            Spin through Arch9.
            <span className="block text-[#0E6A55]">Tap anything that catches your eye.</span>
          </h2>
          <button
            type="button"
            onClick={() => setSelectedFeature(activeFeature)}
            className="group mt-8 hidden min-h-[52px] items-center gap-2 rounded-full bg-[#06362E] px-6 text-sm font-semibold !text-white shadow-[0_16px_34px_rgba(6,54,46,0.16)] transition hover:-translate-y-0.5 md:inline-flex"
          >
            Open selected
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>

        <div
          ref={spinnerRef}
          className="relative h-[540px] w-full touch-none overflow-hidden outline-none md:mx-auto md:h-[520px] md:max-w-[760px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="listbox"
          aria-label="Arch9 agency features"
          aria-activedescendant={`agency-feature-${activeFeature.id}`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#faf5ed] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#faf5ed] to-transparent" />
          <div className="pointer-events-none absolute -left-20 top-14 h-[390px] w-[180px] rounded-r-full border-r border-[#0E6A55]/14 md:hidden" />

          <div className="absolute left-0 top-[45%] w-full -translate-y-1/2">
            {featureItems.map((feature, index) => {
              const rawDistance = index - activeIndex
              const wrapDistance =
                Math.abs(rawDistance) > featureItems.length / 2
                  ? rawDistance - Math.sign(rawDistance) * featureItems.length
                  : rawDistance
              const distance = Math.abs(wrapDistance)
              const isActive = index === activeIndex
              const opacity = isActive ? 1 : distance === 1 ? 0.56 : distance === 2 ? 0.32 : 0.15
              const blur = isActive ? 0 : distance === 1 ? 0.8 : distance === 2 ? 1.6 : 2.8
              const scale = isActive ? 1 : distance === 1 ? 0.9 : distance === 2 ? 0.8 : 0.72
              const y = wrapDistance * 82
              const x = isActive ? 108 : 116 + Math.min(distance, 3) * 16
              const rotate = Math.max(Math.min(wrapDistance * 4, 10), -10)

              return (
                <motion.button
                  id={`agency-feature-${feature.id}`}
                  key={feature.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleFeatureClick(index)}
                  className={`absolute left-0 flex min-h-[54px] w-full items-center gap-3 rounded-[18px] py-3 pl-0 pr-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#64b992] md:gap-4 md:px-6 ${
                    isActive ? 'cursor-pointer' : 'cursor-pointer'
                  }`}
                  style={{
                    top: '50%',
                    zIndex: 50 - distance,
                    pointerEvents: distance > 3 ? 'none' : 'auto',
                  }}
                  initial={false}
                  animate={{
                    x,
                    y: `calc(-50% + ${y}px)`,
                    rotate,
                    scale,
                    opacity,
                    filter: `blur(${blur}px)`,
                  }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38, mass: 0.75 }}
                >
                  <span className={`absolute -left-12 text-[2.1rem] font-normal leading-none text-[#0E6A55] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>→</span>
                  <span
                    className={`block font-semibold leading-[1.08] tracking-normal ${
                      isActive
                        ? 'max-w-[245px] text-[1.55rem] text-[#071E1A] sm:max-w-[300px] sm:text-[1.85rem] md:max-w-none md:text-[3rem]'
                        : 'max-w-[260px] text-[1rem] text-[#071E1A] sm:text-[1.18rem] md:max-w-none md:text-[1.85rem]'
                    }`}
                  >
                    {feature.spinnerTitle}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <motion.p
            className="absolute bottom-5 left-1/2 z-20 w-full -translate-x-1/2 text-center text-xs font-medium leading-6 text-[#0E6A55] md:hidden"
            animate={{ opacity: hasInteracted ? 0 : 1 }}
            transition={{ duration: 0.25, ease }}
          >
            <span className="block text-lg">↕</span>
            Swipe to explore
            <span className="block">Tap a feature to see how it works</span>
          </motion.p>
        </div>
      </div>

      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </section>
  )
}

function FeatureModal({ feature, onClose }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!feature) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [feature, onClose])

  if (!feature) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#071E1A]/22 px-4 pb-0 pt-10 backdrop-blur-[2px] md:items-center md:p-8"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="agency-feature-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        className="relative max-h-[92vh] w-full max-w-[1120px] overflow-y-auto rounded-t-[30px] bg-[#FFFEFB] p-6 shadow-[0_34px_110px_rgba(7,30,26,0.18)] md:grid md:max-h-[82vh] md:grid-cols-[0.38fr_0.62fr] md:gap-8 md:rounded-[28px] md:p-8"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease }}
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-[#0A3028]/14 md:hidden" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#0A3028]/10 bg-white text-[#071E1A] shadow-[0_10px_24px_rgba(7,30,26,0.06)] transition hover:-translate-y-0.5"
          aria-label="Close feature details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-10 md:pr-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E6A55]">{feature.eyebrow}</p>
          <h3 id="agency-feature-modal-title" className="mt-4 text-[2rem] font-semibold leading-tight tracking-normal text-[#071E1A] md:text-[3rem]">
            {feature.headline}
          </h3>
          <p className="mt-5 text-base leading-8 text-[#4F5E58]">{feature.description}</p>
          <div className="mt-7 space-y-3">
            {feature.benefits.map((benefit) => (
              <p key={benefit} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#071E1A]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0E6A55]" strokeWidth={1.8} />
                {benefit}
              </p>
            ))}
          </div>
          {feature.cta ? (
            <a href={feature.cta.href} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0E6A55]">
              {feature.cta.label}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          ) : null}
        </div>

        <motion.div
          className="mt-8 md:mt-0"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: reduce ? 0 : 0.1, ease }}
        >
          <StoryVisual type={feature.visual} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
function StoryVisual({ type }) {
  if (type === 'whatsapp') {
    return (
      <div className="rounded-[22px] bg-[#F8F4EC] p-4">
        <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(7,30,26,0.04)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E8F72] text-white">
            <Phone className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#071E1A]">WhatsApp workflow</p>
            <p className="text-xs text-[#5E6A64]">From enquiry to viewing</p>
          </div>
        </div>
        <div className="space-y-3">
        {['New enquiry received.', 'Agent assigned.', 'WhatsApp sent.', 'Viewing booked.'].map((item, index) => (
          <motion.div
            key={item}
            className="flex items-center gap-3 rounded-[16px] bg-white px-4 py-3 text-sm font-semibold text-[#071E1A] shadow-[0_12px_30px_rgba(7,30,26,0.06)]"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08, ease }}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${index >= 2 ? 'bg-[#0E6A55]' : 'bg-[#D6DED7]'}`} />
            {item}
          </motion.div>
        ))}
        </div>
      </div>
    )
  }

  if (type === 'portal') {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {['Buyer Portal', 'Seller Portal'].map((title) => (
          <div key={title} className="rounded-[18px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_16px_42px_rgba(7,30,26,0.06)]">
            <p className="text-sm font-semibold text-[#071E1A]">{title}</p>
            <div className="mt-5 space-y-3">
              {['Offer accepted', 'Documents', 'Transfer', 'Registration'].map((stage, index) => (
                <p key={stage} className="flex items-center gap-3 text-xs text-[#52605A]">
                  <span className={`h-3 w-3 rounded-full ${index < 2 ? 'bg-[#0E6A55]' : 'bg-[#E1E5E0]'}`} />
                  {stage}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'partners') {
    return (
      <div className="rounded-[22px] bg-white p-6 shadow-[0_18px_48px_rgba(7,30,26,0.06)]">
        <div className="relative mx-auto min-h-[260px] max-w-[360px]">
          <div className="absolute left-1/2 top-[96px] h-px w-[72%] -translate-x-1/2 bg-[#DDE3DC]" />
          <div className="absolute left-1/2 top-[96px] h-[88px] w-px -translate-x-1/2 bg-[#DDE3DC]" />
          <div className="absolute left-[24%] top-[96px] h-[88px] w-px bg-[#DDE3DC]" />
          <div className="absolute right-[24%] top-[96px] h-[88px] w-px bg-[#DDE3DC]" />

          <div className="absolute left-1/2 top-0 flex h-24 w-24 -translate-x-1/2 flex-col items-center justify-center rounded-[28px] border border-[#0E6A55]/16 bg-[#06362E] text-white shadow-[0_18px_40px_rgba(6,54,46,0.18)]">
            <span className="text-[1.45rem] font-normal leading-none">arch9</span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/62">Transaction</span>
          </div>

          <div className="absolute left-1/2 top-[166px] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border border-[#0E6A55]/14 bg-[#F8F4EC] text-[#06362E] shadow-[0_10px_24px_rgba(7,30,26,0.055)]">
            <UsersRound className="h-7 w-7" strokeWidth={1.7} />
          </div>

          <div className="absolute bottom-0 left-0 grid w-full grid-cols-3 gap-3 text-center text-xs font-semibold text-[#071E1A]">
            {['Attorney', 'Bond Originator', 'Buyer / Seller'].map((item) => (
              <div key={item} className="rounded-[14px] border border-[#0A3028]/8 bg-[#F8F4EC] px-3 py-3 shadow-[0_8px_20px_rgba(7,30,26,0.035)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'sold') {
    return (
      <div className="rounded-[22px] bg-white p-6 shadow-[0_18px_48px_rgba(7,30,26,0.06)]">
        {['SOLD', 'Attorney instructed', 'Bond', 'Transfer', 'REGISTERED'].map((item, index) => (
          <div key={item} className="flex items-center gap-3 py-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${index === 4 ? 'bg-[#0E6A55] text-white' : 'bg-[#F2EEE7] text-[#06362E]'}`}>
              {index === 4 ? <Check className="h-4 w-4" /> : index + 1}
            </span>
            <span className="text-sm font-semibold text-[#071E1A]">{item}</span>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'crm') {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {['Leads', 'Listings', 'Viewings', 'Offers', 'Documents', 'Reporting'].map((item) => (
          <div key={item} className="rounded-[14px] bg-white px-4 py-3 text-sm font-semibold text-[#071E1A] shadow-[0_10px_28px_rgba(7,30,26,0.05)]">{item}</div>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-[22px] bg-white p-5 shadow-[0_18px_48px_rgba(7,30,26,0.06)]">
      <div className="overflow-hidden rounded-[20px] border border-[#0A3028]/8 bg-[#F8F4EC]">
        <div className="flex items-center justify-between border-b border-[#0A3028]/8 bg-white/70 px-5 py-4">
          <div>
            <p className="text-[1.35rem] font-normal leading-none text-[#06362E]">oak + olive</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B746F]">Client portal</p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-5 w-5 rounded-full bg-[#06362E]" />
            <span className="h-5 w-5 rounded-full bg-[#C6A46E]" />
            <span className="h-5 w-5 rounded-full bg-[#E9DDCA]" />
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-[0.78fr_1fr]">
          <div className="rounded-[16px] bg-white p-4 shadow-[0_10px_26px_rgba(7,30,26,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0E6A55]">Your journey</p>
            <div className="mt-5 space-y-4">
              {['Offer accepted', 'Documents received', 'Transfer instructed', 'Registration pending'].map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <span className={`mt-1 h-3 w-3 rounded-full ${index < 3 ? 'bg-[#0E6A55]' : 'bg-[#D7DDD7]'}`} />
                  <div>
                    <p className="text-xs font-semibold text-[#071E1A]">{item}</p>
                    <p className="mt-0.5 text-[11px] text-[#6B746F]">{index < 3 ? 'Complete' : 'Next'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[16px] bg-white p-4 shadow-[0_10px_26px_rgba(7,30,26,0.04)]">
            <p className="text-sm font-semibold text-[#071E1A]">12 Main Rd, Claremont</p>
            <p className="mt-1 text-xs text-[#6B746F]">Buyer and seller update</p>
            <div className="mt-5 h-2 rounded-full bg-[#D7DDD7]">
              <motion.div
                className="h-full rounded-full bg-[#0E6A55]"
                initial={{ width: 0 }}
                whileInView={{ width: '74%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              />
            </div>
            <div className="mt-5 rounded-[14px] bg-[#F8F4EC] p-4">
              <p className="text-xs font-semibold text-[#071E1A]">Branded message</p>
              <p className="mt-2 text-xs leading-5 text-[#5E6A64]">
                Your transfer is moving. The attorney has everything needed for the next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DifferenceSection() {
  const reduce = useReducedMotion()
  const railRef = useRef(null)

  function scrollRail(direction) {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.82, 740),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <section className="overflow-hidden px-6 py-16 md:px-8 md:py-22">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0E6A55]">Why agencies choose Arch9</p>
            <h2 className="mt-4 max-w-[760px] text-[2rem] font-semibold leading-tight tracking-normal text-[#071E1A] md:text-[2.8rem]">
              The stuff that makes Arch9 different.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0A3028]/12 bg-white text-[#06362E] shadow-[0_10px_24px_rgba(7,30,26,0.04)] transition hover:-translate-y-0.5 hover:border-[#0E6A55]/24"
              aria-label="Show previous difference"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0A3028]/12 bg-white text-[#06362E] shadow-[0_10px_24px_rgba(7,30,26,0.04)] transition hover:-translate-y-0.5 hover:border-[#0E6A55]/24"
              aria-label="Show next difference"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="-mx-6 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden"
          aria-label="Arch9 differentiators"
        >
          {differenceStories.map((story, index) => {
            const Icon = story.icon
            return (
              <motion.article
                key={story.title}
                className="grid min-h-[560px] w-[84vw] max-w-[860px] shrink-0 snap-center gap-6 rounded-[26px] border border-[#0A3028]/8 bg-[#FFFEFB] p-6 shadow-[0_24px_70px_rgba(7,30,26,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_86px_rgba(7,30,26,0.1)] md:w-[760px] md:grid-cols-[0.76fr_1fr] md:p-8 lg:w-[840px]"
                initial={reduce ? false : { opacity: 0, x: 28, scale: 0.985 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.48, delay: index * 0.04, ease }}
              >
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#0E6A55]">{story.number}</p>
                  {story.visual === 'whatsapp' ? (
                    <span className="mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E8F72] text-white">
                      <Phone className="h-7 w-7" strokeWidth={2} />
                    </span>
                  ) : (
                    <Icon className="mt-5 h-8 w-8 text-[#06362E]" strokeWidth={1.7} />
                  )}
                  <h3 className="mt-7 text-2xl font-semibold tracking-normal text-[#071E1A]">{story.title}</h3>
                  <p className="mt-4 text-base leading-8 text-[#4F5E58]">{story.copy}</p>
                  <span className="mt-auto hidden items-center gap-2 pt-8 text-sm font-semibold text-[#0E6A55] md:flex">
                    {story.number} / {String(differenceStories.length).padStart(2, '0')}
                    <span className="h-px w-16 bg-[#0E6A55]/22" />
                  </span>
                </div>
                <StoryVisual type={story.visual} />
              </motion.article>
            )
          })}
        </div>

        <a href="#features" className="group mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#0E6A55]">
          See all features
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}

function PortalPreviewRail() {
  const reduce = useReducedMotion()
  const railRef = useRef(null)

  function scrollRail(direction) {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.78, 420),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#F8F4EC] px-5 py-6 shadow-[0_24px_70px_rgba(7,30,26,0.07)] md:px-6 md:py-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0E6A55]">Client view</p>
          <p className="mt-1 text-sm font-semibold text-[#071E1A]">Swipe through the portal experience</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollRail(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0A3028]/12 bg-white text-[#06362E] shadow-[0_10px_22px_rgba(7,30,26,0.04)] transition hover:-translate-y-0.5"
            aria-label="Show previous portal preview"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollRail(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0A3028]/12 bg-white text-[#06362E] shadow-[0_10px_22px_rgba(7,30,26,0.04)] transition hover:-translate-y-0.5"
            aria-label="Show next portal preview"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:-mx-6 md:px-6 [&::-webkit-scrollbar]:hidden"
        aria-label="Client portal previews"
      >
        {portalPreviews.map((preview, index) => (
          <motion.article
            key={preview.title}
            className="w-[78vw] max-w-[340px] shrink-0 snap-center rounded-[26px] border border-[#0A3028]/8 bg-white p-4 shadow-[0_18px_46px_rgba(7,30,26,0.08)] sm:w-[300px] lg:w-[320px]"
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease }}
          >
            <div className="relative h-[430px] overflow-hidden rounded-[22px] bg-white md:h-[500px]">
              <img
                src={preview.image}
                alt={`${preview.title} mobile preview`}
                className="absolute left-1/2 top-0 h-[112%] max-w-none -translate-x-1/2 object-contain object-top"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/72 to-transparent" />
            </div>
            <div className="px-2 pb-1 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0E6A55]">{preview.eyebrow}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-normal text-[#071E1A]">{preview.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5E6A64]">{preview.copy}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

function ClientPortalsSection() {
  return (
    <section className="bg-white/72 px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <h2 className="text-[2rem] font-semibold leading-tight tracking-normal text-[#071E1A] md:text-[2.8rem]">
            Give your clients somewhere to check before they ask you.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#4F5E58]">
            Buyers and sellers can follow their journey, complete tasks, upload documents and stay informed without constantly calling your agents.
          </p>
          <a href="/platform" className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0E6A55]">
            Explore Client Portals
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
        <PortalPreviewRail />
      </div>
    </section>
  )
}

function AutomationSection() {
  const steps = ['New enquiry', 'Lead created', 'Agent assigned', 'WhatsApp / Email', 'Automatic follow-up', 'Viewing booked']
  return (
    <section className="px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-9 rounded-[26px] bg-[#F8F4EC] p-7 md:p-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <h2 className="text-[2rem] font-semibold leading-tight tracking-normal text-[#071E1A] md:text-[2.8rem]">
            The follow-up you forgot?
            <span className="block text-[#0E6A55]">Arch9 didn't.</span>
          </h2>
          <a href="/platform" className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0E6A55]">
            Explore Automation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              className="rounded-[16px] bg-white p-4 text-sm font-semibold text-[#071E1A] shadow-[0_14px_34px_rgba(7,30,26,0.045)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05, ease }}
            >
              {step}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EverythingTogetherSection() {
  return (
    <section id="features" className="bg-white/72 px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <h2 className="text-[2rem] font-semibold leading-tight tracking-normal text-[#071E1A] md:text-[2.8rem]">
            Fewer tabs. Fewer spreadsheets. Fewer "any updates?"
          </h2>
          <p className="mt-5 text-base leading-8 text-[#4F5E58]">
            Leads, buyers, viewings, offers, documents, reporting and transactions live in one clear workspace.
          </p>
        </div>
        <div className="rounded-[24px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_24px_70px_rgba(7,30,26,0.08)]">
          <div className="grid gap-4 md:grid-cols-[0.42fr_0.58fr]">
            <div className="rounded-[18px] bg-[#F8F4EC] p-5">
              <p className="text-sm font-semibold text-[#071E1A]">Workspace</p>
              <div className="mt-5 space-y-3">
                {['Leads', 'Listings', 'Transactions', 'Documents', 'Reporting'].map((item) => (
                  <p key={item} className="rounded-[12px] bg-white px-3 py-2 text-xs font-semibold text-[#4F5E58]">{item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-[18px] border border-[#0A3028]/8 p-5">
              <p className="text-sm font-semibold text-[#071E1A]">Transactions</p>
              <div className="mt-5 space-y-4">
                {['12 Main Rd, Claremont', '4 Sunset Blvd, Umhlanga', '9 Park Lane, Joburg'].map((item, index) => (
                  <div key={item}>
                    <div className="flex items-center justify-between gap-4 text-xs">
                      <span className="font-semibold text-[#071E1A]">{item}</span>
                      <span className="text-[#6B746F]">{index === 0 ? '82%' : index === 1 ? '61%' : '39%'}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-[#EDF0EC]">
                      <div className="h-full rounded-full bg-[#0E6A55]" style={{ width: index === 0 ? '82%' : index === 1 ? '61%' : '39%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="px-6 pb-14 pt-4 md:px-8 md:pb-20 md:pt-8">
      <div className="mx-auto grid w-full max-w-[1280px] overflow-hidden rounded-[28px] bg-[#06362E] text-white shadow-[0_28px_80px_rgba(6,54,46,0.22)] lg:grid-cols-[0.68fr_0.32fr]">
        <div className="p-7 md:p-10">
          <h2 className="max-w-[680px] text-[2rem] font-semibold leading-tight tracking-normal md:text-[3.2rem]">
            Ready to see what Arch9 could look like in your agency?
          </h2>
          <p className="mt-4 max-w-[620px] text-base leading-7 text-white/74">
            We’ll show you the platform using the way your agency actually works.
          </p>
          <a href="/book-demo" className="group mt-7 inline-flex min-h-[54px] items-center gap-2 rounded-full bg-[#64b992] px-7 text-sm font-semibold !text-[#031e19] transition hover:-translate-y-0.5 hover:bg-white">
            Book a Demo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
        <div className="relative hidden min-h-[300px] lg:block">
          <img src={aboutArchitectureImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-36 mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#06362E,rgba(6,54,46,0.28))]" />
        </div>
      </div>
    </section>
  )
}

export default function AgentsSolution() {
  useEffect(() => {
    const description =
      'Arch9 helps estate agencies manage leads, viewings, offers, client updates and property transactions from enquiry to registration.'

    setPageSeo({
      title: 'Agency Transaction Dashboard | Arch9',
      description,
      canonicalPath: '/solutions/agency/dashboard',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', href: '/' },
          { name: 'Solutions', href: '/platform' },
          { name: 'Agency', href: '/solutions/agency/dashboard' },
        ]),
        serviceJsonLd({
          name: 'Arch9 for Agencies',
          description,
          path: '/solutions/agency/dashboard',
          serviceType: 'Estate agency transaction workspace',
          audience: ['Estate agencies', 'Real estate agencies'],
        }),
        softwareApplicationJsonLd({
          name: 'Arch9 for Agencies',
          description,
          path: '/solutions/agency/dashboard',
          audience: ['Estate agencies', 'Real estate agencies'],
          featureList: ['Lead management', 'Viewing follow-up', 'Offer tracking', 'Transaction progress', 'Client portals', 'Partner collaboration'],
        }),
      ],
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#071E1A]">
      <AgencyHeader />
      <main>
        <HeroSection />
        <AgencyContrastCardsSection />
        <FeatureSpinnerSection />
        <div className="hidden md:block">
          <DifferenceSection />
        </div>
        <ClientPortalsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
