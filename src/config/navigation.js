import { Building2, Landmark, Layers, Scale, UserRound } from 'lucide-react'

export const appAuthUrl = 'https://app.arch9.co.za'
export const demoHref = '/contact'

export const primaryNavItems = [
  { label: 'Developments', href: '/developments', match: ['/developments'], analyticsEvent: 'nav_developments_clicked' },
  { label: 'Buy', href: '/buy', analyticsEvent: 'nav_buy_clicked' },
  { label: 'Sell', href: '/sell', match: ['/sell'], analyticsEvent: 'nav_sell_clicked' },
  { label: 'Tools', menu: 'tools', match: ['/tools'], analyticsEvent: 'nav_tools_clicked' },
  { label: 'Solutions', menu: 'solutions', analyticsEvent: 'nav_solutions_clicked' },
  { label: 'Pricing', href: '/pricing', match: ['/pricing'], analyticsEvent: 'nav_pricing_clicked' },
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
