export const appAuthUrl = 'https://app.arch9.co.za'
export const demoHref = '/contact'

export const primaryNavItems = [
  { label: 'Developments', href: '/developments', match: ['/developments'], analyticsEvent: 'nav_developments_clicked' },
  { label: 'Sell', href: '/sell', match: ['/sell'], analyticsEvent: 'nav_sell_clicked' },
  { label: 'Solutions', menu: 'solutions', analyticsEvent: 'nav_solutions_clicked' },
  { label: 'Insights', href: '/property-intelligence', match: ['/property-intelligence', '/areas', '/market-reports', '/buyer-guides', '/seller-guides', '/calculators', '/bond-calculator', '/transfer-cost-calculator', '/affordability-calculator', '/property-pulse'], analyticsEvent: 'nav_insights_clicked' },
  { label: 'Pricing', href: '/pricing', match: ['/pricing'], analyticsEvent: 'nav_pricing_clicked' },
]

export const solutionNavItems = [
  {
    label: 'Agents',
    href: '/agents',
    description: 'Listings, leads, offers, documents, and transaction progress in one workspace.',
  },
  {
    label: 'Attorneys',
    href: '/attorneys',
    description: 'Transfer matters connected to cleaner instructions and stakeholder updates.',
  },
  {
    label: 'Bond Originators',
    href: '/bond-originators',
    description: 'Cleaner applications, bank submissions, and finance progress from day one.',
  },
  {
    label: 'Developers',
    href: '/developers',
    description: 'Development stock, buyers, agents, and sales progress connected end to end.',
  },
  {
    label: 'Platform Overview',
    href: '/platform',
    description: 'A shared transaction spine for every party in the property journey.',
  },
]
