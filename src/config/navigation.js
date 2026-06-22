import { BookOpen, Building2, Calculator, FileText, Home, Landmark, Layers, LineChart, Scale, Search, UserRound } from 'lucide-react'

export const appAuthUrl = 'https://app.arch9.co.za'
export const demoHref = '/contact'

export const primaryNavItems = [
  { label: 'Buy', menu: 'buy', match: ['/', '/properties', '/developments', '/tools/buyers'], analyticsEvent: 'nav_buy_clicked' },
  { label: 'Solutions', menu: 'solutions', analyticsEvent: 'nav_solutions_clicked' },
  { label: 'Tools', menu: 'tools', match: ['/tools'], analyticsEvent: 'nav_tools_clicked' },
  { label: 'Resources', menu: 'resources', analyticsEvent: 'nav_resources_clicked' },
  { label: 'Pricing', href: '/pricing', match: ['/pricing'], analyticsEvent: 'nav_pricing_clicked' },
  { label: 'About', href: '/why-arch9', match: ['/why-arch9'], analyticsEvent: 'nav_about_clicked' },
]

export const buyNavItems = [
  {
    label: 'Residential Properties',
    href: '/properties',
    description: 'Browse homes, apartments and estates across South Africa.',
    icon: Home,
  },
  {
    label: 'Commercial Properties',
    href: '/commercial',
    description: 'Explore commercial opportunities and connected transactions.',
    icon: Building2,
  },
  {
    label: 'New Developments',
    href: '/developments',
    description: 'Discover launches, estates and investment opportunities.',
    icon: Search,
  },
  {
    label: 'Affordability Calculator',
    href: '/tools/buyers/affordability-calculator',
    description: 'Understand what price range may fit your budget.',
    icon: Calculator,
  },
  {
    label: 'Bond Calculator',
    href: '/tools/buyers/bond-repayment-calculator',
    description: 'Estimate monthly bond repayments before you buy.',
    icon: Landmark,
  },
  {
    label: 'Transfer Cost Calculator',
    href: '/tools/buyers/transfer-cost-calculator',
    description: 'Estimate transfer duty and once-off transaction costs.',
    icon: FileText,
  },
  {
    label: 'Rental Yield Calculator',
    href: '/tools/investors/rental-yield-calculator',
    description: 'Analyse rental income, expenses and yield.',
    icon: LineChart,
  },
  {
    label: 'Buyer Guides',
    href: '/buyer-guides',
    description: 'Helpful resources for the buying journey.',
    icon: BookOpen,
  },
]

export const resourcesNavItems = [
  {
    label: 'Property Intelligence',
    href: '/property-intelligence',
    description: 'Market data, area insights and decision support.',
    icon: LineChart,
  },
  {
    label: 'Buyer Guides',
    href: '/buyer-guides',
    description: 'Practical guidance for buyers and investors.',
    icon: BookOpen,
  },
  {
    label: 'Seller Guides',
    href: '/seller-guides',
    description: 'Prepare, price and move through a cleaner sale.',
    icon: FileText,
  },
  {
    label: 'Help Centre',
    href: '/help',
    description: 'Support for teams and clients using Arch9.',
    icon: UserRound,
  },
  {
    label: 'Documentation',
    href: '/docs',
    description: 'Platform workflows, setup guidance and resources.',
    icon: Layers,
  },
]

export const solutionNavItems = [
  {
    title: 'Agents',
    label: 'Agents',
    href: '/solutions/agents',
    description: 'Listings, leads, offers, documents, and transaction progress in one workspace.',
    icon: UserRound,
    cta: 'Explore Agents',
  },
  {
    title: 'Attorneys',
    label: 'Attorneys',
    href: '/solutions/attorneys',
    description: 'Transfer matters connected to cleaner instructions and stakeholder updates.',
    icon: Scale,
    cta: 'Explore Attorneys',
  },
  {
    title: 'Bond Originators',
    label: 'Bond Originators',
    href: '/solutions/bond-originators',
    description: 'Cleaner applications, bank submissions, and finance progress from day one.',
    icon: Landmark,
    cta: 'Explore Bond Originators',
  },
  {
    title: 'Developers',
    label: 'Developers',
    href: '/solutions/developers',
    description: 'Development stock, buyers, agents, and sales progress connected end to end.',
    icon: Building2,
    cta: 'Explore Developers',
  },
  {
    title: 'Platform Overview',
    label: 'Platform Overview',
    href: '/platform',
    description: 'A shared transaction spine for every party in the property journey.',
    icon: Layers,
    cta: 'Explore Platform',
  },
]
