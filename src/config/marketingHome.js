import {
  BarChart3,
  Building2,
  FileStack,
  Globe2,
  Handshake,
  Landmark,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  Network,
  Scale,
  Send,
  UserRound,
  UsersRound,
} from 'lucide-react'

export const platformCapabilities = [
  { label: 'CRM', icon: UsersRound },
  { label: 'Listings', icon: Building2 },
  { label: 'Syndication', icon: Send },
  { label: 'Transactions', icon: Handshake },
  { label: 'Client Portals', icon: UserRound },
  { label: 'Documents', icon: FileStack },
  { label: 'Communication', icon: MessageSquareText },
  { label: 'Reporting', icon: BarChart3 },
]

export const corePlatformFeatures = [
  'CRM',
  'Listings',
  'Sales & rentals',
  'Listing syndication',
  'Transaction management',
  'Buyer & seller portals',
  'Documents',
  'Team management',
  'Reports & insights',
  'Automations',
]

export const platformTabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    title: 'Your business at a glance.',
    copy: 'See what matters most, track live transactions and keep the team aligned.',
    accent: '#0B6B50',
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: UsersRound,
    title: 'Every lead. Every client. One place.',
    copy: 'Move new enquiries into a clear pipeline and keep every follow-up visible.',
    accent: '#2F6E86',
  },
  {
    id: 'listings',
    label: 'Listings',
    icon: Building2,
    title: 'List once. Manage everywhere.',
    copy: 'Keep property details, media, mandates and publishing status together.',
    accent: '#8A6F45',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: Handshake,
    title: 'From offer to registration.',
    copy: 'Track every milestone, owner and next action inside one live deal.',
    accent: '#0B6B50',
  },
  {
    id: 'buyers',
    label: 'Buyers',
    icon: UserRound,
    title: 'A better buying experience.',
    copy: 'Give buyers a calm, guided view of documents, progress and next steps.',
    accent: '#386E62',
  },
  {
    id: 'sellers',
    label: 'Sellers',
    icon: UserRound,
    title: 'Keep sellers informed.',
    copy: 'Share listing performance and transaction progress without constant follow-ups.',
    accent: '#A4684D',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: Megaphone,
    title: 'Control where every listing appears.',
    copy: 'Manage the channels, content and status behind every published property.',
    accent: '#6A5C91',
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: Landmark,
    title: 'Keep finance progress connected.',
    copy: 'Bring bond milestones and the people responsible into the same transaction.',
    accent: '#3F6B7A',
  },
]

export const clientExperiences = [
  {
    id: 'buyer',
    label: 'Buyer Experience',
    eyebrow: 'Offer accepted',
    title: 'Transfer to attorney',
    copy: 'Your next step is ready and the right professional already has the context.',
    stages: ['Offer', 'Finance', 'Transfer', 'Registration'],
    activeStage: 2,
    stats: null,
  },
  {
    id: 'seller',
    label: 'Seller Experience',
    eyebrow: 'Your property is live',
    title: 'New enquiry received',
    copy: 'Track performance and progress without waiting for another update.',
    stages: ['Live', 'Enquiries', 'Offers', 'Transfer', 'Sold'],
    activeStage: 3,
    stats: [
      { label: 'Views', value: '1,248' },
      { label: 'Enquiries', value: '32' },
      { label: 'Offers', value: '5' },
    ],
  },
]

export const stakeholders = [
  { label: 'Seller', icon: UserRound },
  { label: 'Agent', icon: UsersRound },
  { label: 'Buyer', icon: UserRound },
  { label: 'Bond Originator', icon: Network },
  { label: 'Attorney', icon: Scale },
  { label: 'Bank', icon: Landmark },
]

export const publishingDestinations = [
  { label: 'Property24', mark: '24', status: 'Built to connect' },
  { label: 'Private Property', mark: 'PP', status: 'Built to connect' },
  { label: 'Your Website', icon: Globe2, status: 'Connected' },
]

// These are illustrative launch targets, not verified production claims.
// Replace the values in this single object once audited customer metrics are available.
export const marketingMetrics = [
  { value: '25+', label: 'Agencies', placeholder: true },
  { value: '250+', label: 'Agents', placeholder: true },
  { value: '2,500+', label: 'Listings', placeholder: true },
  { value: '350+', label: 'Transactions', placeholder: true },
]
