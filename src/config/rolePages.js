import {
  ArrowRightLeft,
  BadgeCheck,
  Banknote,
  BellRing,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FolderKanban,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
  Scale,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
} from 'lucide-react'

export const transactionStages = [
  { id: 'listed', label: 'Listed' },
  { id: 'offer', label: 'Offer' },
  { id: 'otp', label: 'OTP' },
  { id: 'onboarding', label: 'Buyer onboarding' },
  { id: 'finance', label: 'Finance' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'registration', label: 'Registration' },
]

export const roleOptions = [
  {
    key: 'agents',
    label: 'Agents & Agencies',
    shortLabel: 'Agent',
    href: '/solutions/agents',
    icon: UserRound,
    description: 'Manage the journey from first lead to registered sale.',
    activeStages: ['listed', 'offer', 'otp', 'registration'],
  },
  {
    key: 'developers',
    label: 'Developers',
    shortLabel: 'Developer',
    href: '/solutions/developers',
    icon: Building2,
    description: 'Connect inventory, buyers, agents and registrations.',
    activeStages: ['listed', 'offer', 'finance', 'transfer', 'registration'],
  },
  {
    key: 'attorneys',
    label: 'Attorneys',
    shortLabel: 'Attorney',
    href: '/solutions/attorneys',
    icon: Scale,
    description: 'Run matters with complete transaction context.',
    activeStages: ['transfer', 'registration'],
  },
  {
    key: 'bond-originators',
    label: 'Bond Originators',
    shortLabel: 'Finance',
    href: '/solutions/bond-originators',
    icon: Landmark,
    description: 'Track applications, bank submissions and approvals.',
    activeStages: ['finance'],
  },
  {
    key: 'buyers-sellers',
    label: 'Buyer / Seller',
    shortLabel: 'Client',
    href: '/solutions/buyers-sellers',
    icon: Home,
    description: 'See what is happening, what is needed and what happens next.',
    activeStages: ['otp', 'onboarding', 'finance', 'transfer', 'registration'],
  },
]

export const rolePages = {
  developers: {
    key: 'developers',
    eyebrow: 'For property developers',
    headline: 'From reservation to registration. One operating system for your development.',
    supportingCopy:
      'Arch9 connects stock, sales teams, agents, buyers, finance partners and attorneys around the same development transaction record.',
    heroCta: { label: 'Book a developer demo', href: '/book-demo' },
    secondaryCta: { label: 'Explore Arch9', href: '/platform' },
    heroVisual: {
      label: 'Development command centre',
      title: 'Junoah Estate',
      subtitle: '79 units · 18 active buyers · 6 agent partners',
      progressLabel: 'Reservation to registration',
      progress: 68,
      stats: [
        { value: '79', label: 'Units visible' },
        { value: '18', label: 'Buyer leads' },
        { value: '6', label: 'Agent partners' },
      ],
      rows: [
        { label: 'Unit 14 reserved', meta: 'Buyer onboarding in progress', status: 'Active' },
        { label: 'Finance submitted', meta: 'Bond originator connected', status: 'Live' },
        { label: 'Transfer instructed', meta: 'Attorney has transaction context', status: 'Next' },
      ],
    },
    problems: [
      'Inventory, leads and reservations drift across different spreadsheets.',
      'Agents, finance partners and attorneys ask for the same context repeatedly.',
      'Management cannot see which sales are stuck before registration.',
    ],
    valueProps: [
      {
        icon: LayoutDashboard,
        title: 'Development visibility',
        copy: 'See stock, reservations, sales progress, buyer readiness and transaction health in one place.',
      },
      {
        icon: UsersRound,
        title: 'Connected role players',
        copy: 'Keep internal teams, agents, buyers, bond originators and attorneys aligned around each sale.',
      },
      {
        icon: LineChart,
        title: 'Registration pipeline',
        copy: 'Know which deals are reserved, financed, transferred, lodged and ready to register.',
      },
    ],
    features: [
      { icon: Building2, title: 'Inventory and unit status', copy: 'Track stock, availability, reservations and sales movement across a development.' },
      { icon: BadgeCheck, title: 'Agent distribution', copy: 'Give partner agents a clearer path from lead to accepted offer.' },
      { icon: ClipboardCheck, title: 'Buyer onboarding', copy: 'Capture buyer details, documents and outstanding actions after reservation.' },
      { icon: WalletCards, title: 'Finance visibility', copy: 'See application progress without running the deal through separate threads.' },
      { icon: Scale, title: 'Attorney handover', copy: 'Pass structured transaction context into transfer and registration workflows.' },
      { icon: CalendarClock, title: 'Management reporting', copy: 'Surface bottlenecks, expected registrations and delayed sales before they become surprises.' },
    ],
    workflow: {
      title: 'The development sale journey, connected.',
      intro: 'Every unit moves through a shared transaction path instead of a chain of disconnected handovers.',
      steps: ['Lead', 'Reservation', 'Sale', 'Finance', 'Transfer', 'Registration'],
      highlightedSteps: ['Reservation', 'Sale', 'Finance', 'Transfer', 'Registration'],
    },
    journey: {
      title: 'One development transaction. Every role player connected.',
      copy: 'Arch9 sits behind the sale as the shared infrastructure that keeps each party working from the same source of truth.',
      activeRoles: ['Developer', 'Agent', 'Buyer / Seller', 'Finance', 'Attorney', 'Registration'],
    },
    socialProof: {
      quote:
        'A development sale should not disappear into emails after reservation. Arch9 keeps the whole path visible until registration.',
      attribution: 'Arch9 development workflow',
    },
    finalCta: {
      headline: 'Give every development sale a visible path to registration.',
      copy: 'Show your team, agents and buyers exactly where each sale stands.',
      primary: { label: 'Book a developer demo', href: '/book-demo' },
      secondary: { label: 'Talk to Arch9', href: '/contact' },
    },
    seoTitle: 'Property Developer Transaction Software | Arch9',
    seoDescription:
      'Arch9 connects development inventory, buyer leads, agents, finance, attorneys and registration progress in one shared transaction workspace.',
  },
  'buyers-sellers': {
    key: 'buyers-sellers',
    eyebrow: 'For buyers and sellers',
    headline: 'Track your property transaction like a parcel.',
    supportingCopy:
      'When your agent, attorney or finance partner runs the transaction through Arch9, you can see what is happening, what is needed from you and what comes next.',
    heroCta: { label: 'See how it works', href: '#workflow' },
    secondaryCta: { label: 'Ask your agent about Arch9', href: '/contact' },
    heroVisual: {
      label: 'Client transaction portal',
      title: 'Sale in progress',
      subtitle: 'Buyer · Seller · Agent · Attorney · Finance',
      progressLabel: 'Sold to registered',
      progress: 74,
      stats: [
        { value: '3', label: 'Actions left' },
        { value: '2', label: 'Key dates' },
        { value: 'Live', label: 'Progress updates' },
      ],
      rows: [
        { label: 'FICA documents requested', meta: 'Upload securely from your portal', status: 'Action' },
        { label: 'Bond approval received', meta: 'Finance progress updated', status: 'Done' },
        { label: 'Transfer attorney instructed', meta: 'Next milestone visible', status: 'Live' },
      ],
    },
    problems: [
      'After the OTP is signed, buyers and sellers often do not know what is happening.',
      'Important requests arrive across email, WhatsApp and phone calls.',
      'Nobody wants to chase the agent or attorney just to understand the next step.',
    ],
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'Know where things stand',
        copy: 'Follow the transaction from sold to registered with a clear progress view.',
      },
      {
        icon: FileCheck2,
        title: 'See what is needed',
        copy: 'Understand outstanding documents, actions, dates and contacts without digging through messages.',
      },
      {
        icon: BellRing,
        title: 'Get calmer updates',
        copy: 'Receive structured progress updates instead of wondering who has the latest information.',
      },
    ],
    features: [
      { icon: ShieldCheck, title: 'Secure document requests', copy: 'See which documents are needed and upload them into the transaction flow.' },
      { icon: Banknote, title: 'Finance progress', copy: 'Understand where the bond or finance process stands when it applies to the sale.' },
      { icon: Scale, title: 'Attorney milestones', copy: 'Follow transfer, lodgement and registration progress in plain language.' },
      { icon: CalendarClock, title: 'Important dates', copy: 'Keep track of signing, guarantees, lodgement and expected registration milestones.' },
      { icon: UsersRound, title: 'Key contacts', copy: 'Know who is involved and which party is responsible for the next step.' },
      { icon: BellRing, title: 'Helpful notifications', copy: 'Get updates when something important changes or an action is needed from you.' },
    ],
    workflow: {
      title: 'From sold to registered, without the mystery.',
      intro: 'Arch9 turns the post-offer transaction into a visible journey for the people buying and selling the property.',
      steps: ['Sold', 'Finance', 'Attorney', 'Transfer', 'Registered'],
      highlightedSteps: ['Sold', 'Finance', 'Attorney', 'Transfer', 'Registered'],
    },
    journey: {
      title: 'Your transaction is still managed by professionals. Arch9 makes it visible.',
      copy: 'Agents, finance partners and attorneys keep doing their work. You get a clearer view of the journey they are moving forward.',
      activeRoles: ['Buyer / Seller', 'Agent', 'Finance', 'Attorney', 'Registration'],
    },
    socialProof: {
      quote:
        'Clients should not have to wonder what happens after signing. Arch9 gives them the confidence that the transaction is moving.',
      attribution: 'Arch9 client portal experience',
    },
    finalCta: {
      headline: 'A better transaction experience for buyers and sellers.',
      copy: 'If your property professional uses Arch9, you get clarity from sold to registered.',
      primary: { label: 'Ask your agent about Arch9', href: '/contact' },
      secondary: { label: 'Explore Arch9', href: '/' },
    },
    seoTitle: 'Track Your Property Transaction | Arch9',
    seoDescription:
      'Arch9 gives buyers and sellers visibility over property transaction progress, documents, finance, attorney milestones and registration.',
  },
}

const rolePathAliases = {
  '/solutions/developers': 'developers',
  '/developers': 'developers',
  '/solutions/buyers-sellers': 'buyers-sellers',
  '/buyers-sellers': 'buyers-sellers',
}

export function getRolePageKeyFromPath(pathname = '/') {
  const normalizedPath = pathname.replace(/\/$/, '') || '/'
  const roleKey = rolePathAliases[normalizedPath]
  return rolePages[roleKey] ? roleKey : null
}
