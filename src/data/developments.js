import { Building2, Home, MapPin, Trees } from 'lucide-react'
import { formatPrice } from './properties'

export const developments = [
  {
    slug: 'the-ridge-estate',
    title: 'The Ridge Estate',
    area: 'Pretoria East',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    startingPrice: 1950000,
    availableUnits: 72,
    status: 'New release',
    stage: 'Phase 1',
    developer: 'Arch9 Developments',
    summary: 'A premium estate launch with early availability for families and long-term buyers.',
    description:
      'The Ridge Estate brings together secure estate living, contemporary architecture and a structured journey from first enquiry to transfer. The release has been designed to move quickly for buyers while giving professionals the visibility they need.',
    features: ['Secure estate living', 'Family homes', 'Developer direct', 'Transfer support', 'Early release pricing'],
    highlights: [
      { icon: Home, label: 'Homes', value: 'Estate units' },
      { icon: Trees, label: 'Lifestyle', value: 'Family-first' },
      { icon: Building2, label: 'Availability', value: '72 units' },
      { icon: MapPin, label: 'Area', value: 'Pretoria East' },
    ],
  },
  {
    slug: 'lakeview-heights',
    title: 'Lakeview Heights',
    area: 'Fourways, Johannesburg',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
    startingPrice: 2350000,
    availableUnits: 41,
    status: 'Phase 2 selling',
    stage: 'Phase 2',
    developer: 'Arch9 Developments',
    summary: 'A modern residential address with an easy path for owner-occupiers and investors.',
    description:
      'Lakeview Heights offers a polished apartment-led development close to retail and business nodes. Buyers get a more orderly transaction experience, while sales teams can keep unit movement clear and current.',
    features: ['Modern apartments', 'Investor-friendly', 'Shared amenities', 'Developer direct', 'Live unit visibility'],
    highlights: [
      { icon: Home, label: 'Homes', value: 'Apartments' },
      { icon: Trees, label: 'Lifestyle', value: 'Urban living' },
      { icon: Building2, label: 'Availability', value: '41 units' },
      { icon: MapPin, label: 'Area', value: 'Fourways' },
    ],
  },
  {
    slug: 'coastal-mews',
    title: 'Coastal Mews',
    area: 'Umhlanga, Durban',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    startingPrice: 3120000,
    availableUnits: 18,
    status: 'Limited availability',
    stage: 'Launching now',
    developer: 'Arch9 Developments',
    summary: 'A coastal collection of premium homes with a sharper, more guided sales process.',
    description:
      'Coastal Mews is aimed at buyers who want an elevated home in a prime location and a development team that can keep the deal moving from enquiry to registration.',
    features: ['Coastal estate', 'Premium finishes', 'Limited release', 'Developer direct', 'Registration support'],
    highlights: [
      { icon: Home, label: 'Homes', value: 'Mews homes' },
      { icon: Trees, label: 'Lifestyle', value: 'Coastal' },
      { icon: Building2, label: 'Availability', value: '18 units' },
      { icon: MapPin, label: 'Area', value: 'Umhlanga' },
    ],
  },
  {
    slug: 'harbour-terraces',
    title: 'Harbour Terraces',
    area: 'Cape Town, Atlantic Seaboard',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    startingPrice: 4450000,
    availableUnits: 26,
    status: 'Off plan',
    stage: 'Early access',
    developer: 'Arch9 Developments',
    summary: 'A high-end coastal development with a strong premium launch story.',
    description:
      'Harbour Terraces is positioned for buyers looking for a refined Cape Town address and a simple route into the transaction and registration process.',
    features: ['Off-plan purchase', 'Premium finishes', 'Sea-facing units', 'Investor appeal', 'Launch partner access'],
    highlights: [
      { icon: Home, label: 'Homes', value: 'Terraces' },
      { icon: Trees, label: 'Lifestyle', value: 'City coast' },
      { icon: Building2, label: 'Availability', value: '26 units' },
      { icon: MapPin, label: 'Area', value: 'Cape Town' },
    ],
  },
]

export function formatDevelopmentPrice(development) {
  return `From ${formatPrice(development.startingPrice)}`
}

export function findDevelopmentBySlug(slug) {
  return developments.find((development) => development.slug === slug)
}
