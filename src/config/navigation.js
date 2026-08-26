import { Building2, Home, Landmark, Layers, Scale, UserRound } from 'lucide-react'
import { roleRoutes } from './rolePages'

export const appAuthUrl = 'https://app.arch9.co.za'
export const demoHref = '/book-demo'

export const primaryNavItems = [
  { label: 'Platform', href: '/platform', match: ['/platform'], analyticsEvent: 'nav_platform_clicked' },
  { label: 'Solutions', menu: 'solutions', analyticsEvent: 'nav_solutions_clicked' },
  { label: 'Resources', href: '/help', match: ['/help', '/docs', '/buyer-guides', '/seller-guides'], analyticsEvent: 'nav_resources_clicked' },
]

export const solutionNavItems = [
  {
    title: 'Agency',
    label: 'Agency',
    href: roleRoutes.agency,
    description: 'Listings, leads, offers, documents, and transaction progress in one workspace.',
    icon: UserRound,
    cta: 'Explore Agency',
  },
  {
    title: 'Attorney',
    label: 'Attorney',
    href: roleRoutes.attorney,
    description: 'Transfer matters connected to cleaner instructions and stakeholder updates.',
    icon: Scale,
    cta: 'Explore Attorney',
  },
  {
    title: 'Bond Originator',
    label: 'Bond Originator',
    href: roleRoutes['bond-originator'],
    description: 'Cleaner applications, bank submissions, and finance progress from day one.',
    icon: Landmark,
    cta: 'Explore Bond Originator',
  },
  {
    title: 'Developer',
    label: 'Developer',
    href: roleRoutes.developer,
    description: 'Development stock, buyers, agents, and sales progress connected end to end.',
    icon: Building2,
    cta: 'Explore Developer',
  },
  {
    title: 'Buyer / Seller',
    label: 'Buyer / Seller',
    href: roleRoutes['buyer-seller'],
    description: 'A clearer client portal for documents, milestones, finance and registration progress.',
    icon: Home,
    cta: 'Explore Client View',
  },
  {
    title: 'Platform Overview',
    label: 'Platform Overview',
    href: '/platform',
    description: 'One shared workspace for everyone in the property journey.',
    icon: Layers,
    cta: 'Explore Platform',
  },
]
