import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  Gauge,
  Home,
  Landmark,
  LineChart,
  PiggyBank,
  ReceiptText,
  SearchCheck,
  TrendingUp,
  WalletCards,
} from 'lucide-react'

export const toolCategories = [
  {
    key: 'buyers',
    title: 'Buyers',
    menuTitle: 'For Buyers',
    description: 'Understand affordability, costs and the buying journey.',
    icon: Home,
    href: '/tools/buyers',
    footerLabel: 'View all buyer tools',
  },
  {
    key: 'sellers',
    title: 'Sellers',
    menuTitle: 'For Sellers',
    description: 'Understand property value and sale proceeds.',
    icon: WalletCards,
    href: '/tools/sellers',
    footerLabel: 'View all seller tools',
  },
  {
    key: 'investors',
    title: 'Investors',
    menuTitle: 'For Investors',
    description: 'Analyse property performance and returns.',
    icon: LineChart,
    href: '/tools/investors',
    footerLabel: 'View all investor tools',
  },
  {
    key: 'professionals',
    title: 'Professionals',
    menuTitle: 'For Professionals',
    description: 'Tools for agents, brokers and developers.',
    icon: BriefcaseBusiness,
    href: '/tools/professionals',
    footerLabel: 'View all professional tools',
  },
]

export const tools = [
  {
    category: 'buyers',
    title: 'Bond Repayment Calculator',
    slug: 'bond-repayment-calculator',
    description: 'Estimate monthly repayments based on loan amount, interest rate and term.',
    icon: Calculator,
    featured: true,
  },
  {
    category: 'buyers',
    title: 'Affordability Calculator',
    slug: 'affordability-calculator',
    description: 'Understand what property price range may fit your income and expenses.',
    icon: Gauge,
    featured: true,
  },
  {
    category: 'buyers',
    title: 'Transfer Cost Calculator',
    slug: 'transfer-cost-calculator',
    description: 'Estimate transfer duty, conveyancing fees and registration costs.',
    icon: ReceiptText,
    featured: true,
  },
  {
    category: 'buyers',
    title: 'Bond Cost Calculator',
    slug: 'bond-cost-calculator',
    description: 'Estimate bond registration fees and once-off finance costs.',
    icon: Landmark,
  },
  {
    category: 'buyers',
    title: 'Registration Timeline',
    slug: 'registration-timeline',
    description: 'See the typical milestones from offer acceptance to registration.',
    icon: CalendarClock,
  },
  {
    category: 'sellers',
    title: 'Seller Net Proceeds Calculator',
    slug: 'net-proceeds-calculator',
    description: 'Estimate what you may receive after bond settlement, commission and selling costs.',
    icon: PiggyBank,
    featured: true,
  },
  {
    category: 'sellers',
    title: 'Property Value Estimator',
    slug: 'property-value-estimator',
    description: 'Get a directional view of potential property value and market positioning.',
    icon: SearchCheck,
  },
  {
    category: 'sellers',
    title: 'Commission Calculator',
    slug: 'commission-calculator',
    description: 'Model agent commission and VAT across different sale price scenarios.',
    icon: Coins,
  },
  {
    category: 'sellers',
    title: 'Selling Cost Calculator',
    slug: 'selling-cost-calculator',
    description: 'Estimate compliance, clearance, marketing and transaction-related selling costs.',
    icon: ReceiptText,
  },
  {
    category: 'sellers',
    title: 'Seller Readiness Score',
    slug: 'seller-readiness-score',
    description: 'Check whether your documents, pricing and process are ready for market.',
    icon: ClipboardCheck,
  },
  {
    category: 'investors',
    title: 'Rental Yield Calculator',
    slug: 'rental-yield-calculator',
    description: 'Analyse gross and net yield from monthly rental income and property costs.',
    icon: TrendingUp,
    featured: true,
  },
  {
    category: 'investors',
    title: 'ROI Calculator',
    slug: 'roi-calculator',
    description: 'Compare purchase costs, income, expenses and projected returns.',
    icon: BarChart3,
  },
  {
    category: 'investors',
    title: 'Cash Flow Calculator',
    slug: 'cash-flow-calculator',
    description: 'Estimate monthly surplus or shortfall after finance and operating expenses.',
    icon: WalletCards,
  },
  {
    category: 'investors',
    title: 'Buy-to-Let Analyzer',
    slug: 'buy-to-let-analyzer',
    description: 'Evaluate buy-to-let opportunities using rent, costs, finance and yield assumptions.',
    icon: Home,
  },
  {
    category: 'investors',
    title: 'Bond vs Rental Income',
    slug: 'bond-vs-rental-income',
    description: 'Compare monthly bond costs against rental income and likely shortfall.',
    icon: Landmark,
  },
  {
    category: 'professionals',
    title: 'Agent Commission Calculator',
    slug: 'agent-commission-calculator',
    description: 'Calculate commission split, VAT and expected earnings per transaction.',
    icon: Coins,
    featured: true,
  },
  {
    category: 'professionals',
    title: 'Pipeline Value Calculator',
    slug: 'pipeline-value-calculator',
    description: 'Estimate active pipeline value and future commission from deals in progress.',
    icon: LineChart,
  },
  {
    category: 'professionals',
    title: 'Development Feasibility Calculator',
    menuLabel: 'Development Feasibility',
    slug: 'development-feasibility-calculator',
    description: 'Model stock, pricing, costs and feasibility for new development launches.',
    icon: Building2,
  },
  {
    category: 'professionals',
    title: 'Profit Margin Calculator',
    slug: 'profit-margin-calculator',
    description: 'Estimate development or agency margins across revenue and cost scenarios.',
    icon: CheckCircle2,
  },
  {
    category: 'professionals',
    title: 'Marketing Budget Calculator',
    slug: 'marketing-budget-calculator',
    description: 'Plan launch, listing and campaign spend against expected transaction value.',
    icon: BarChart3,
  },
]

export function getToolsByCategory(categoryKey) {
  return tools.filter((tool) => tool.category === categoryKey)
}

export function getToolCategory(categoryKey) {
  return toolCategories.find((category) => category.key === categoryKey)
}

export function getToolByRoute(categoryKey, slug) {
  return tools.find((tool) => tool.category === categoryKey && tool.slug === slug)
}

export function getToolHref(tool) {
  return `/tools/${tool.category}/${tool.slug}`
}

export const toolsMenu = toolCategories.map((category) => ({
  ...category,
  links: getToolsByCategory(category.key).map((tool) => ({
    label: tool.menuLabel || tool.title,
    href: getToolHref(tool),
  })),
}))
