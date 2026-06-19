import { Bath, BedDouble, Building2, Home, MapPin, Trees } from 'lucide-react'

export const propertyTypes = ['Apartment', 'Estate Home', 'Townhouse', 'Development']

export const properties = [
  {
    slug: '14-junoah-estate',
    title: 'Unit 14 · Junoah Estate',
    location: 'Bryanston, Johannesburg',
    address: 'Unit 14, Junoah Estate, Bryanston',
    price: 3850000,
    type: 'Estate Home',
    bedrooms: 3,
    bathrooms: 2.5,
    size: '218 m²',
    status: 'Registration-ready',
    agency: 'Arch9 Network',
    agent: {
      name: 'Mia Dlamini',
      role: 'Property Professional',
      phone: '+27 11 555 0198',
      email: 'mia@arch9.co.za',
    },
    summary: 'A refined estate residence designed around calm family living, secure access and clean handovers from offer to registration.',
    description:
      'Unit 14 at Junoah Estate brings together generous living spaces, a private garden and a secure estate environment. The property is ready for serious buyers who want a clear path from enquiry to offer, finance and transfer.',
    features: ['Secure estate access', 'Private garden', 'Open-plan living', 'Double garage', 'Solar-ready infrastructure', 'Transfer pack prepared'],
    highlights: [
      { icon: Home, label: 'Property', value: 'Estate home' },
      { icon: BedDouble, label: 'Bedrooms', value: '3' },
      { icon: Bath, label: 'Bathrooms', value: '2.5' },
      { icon: Trees, label: 'Lifestyle', value: 'Private garden' },
    ],
  },
  {
    slug: '7-harbour-view',
    title: '7 Harbour View',
    location: 'Sea Point, Cape Town',
    address: '7 Harbour View, Sea Point',
    price: 6250000,
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    size: '142 m²',
    status: 'New mandate',
    agency: 'Arch9 Network',
    agent: {
      name: 'Daniel Botha',
      role: 'Listing Agent',
      phone: '+27 21 555 0144',
      email: 'daniel@arch9.co.za',
    },
    summary: 'A lock-up-and-go coastal apartment with clean lines, strong natural light and a short walk to the promenade.',
    description:
      'This Sea Point apartment is designed for buyers who want a polished coastal base with practical transaction visibility. The listing includes prepared documents and a clear enquiry-to-offer path.',
    features: ['Ocean-facing balcony', 'Two secure parking bays', 'Concierge access', 'Walk to promenade', 'Prepared seller pack', 'Body corporate documents available'],
    highlights: [
      { icon: Building2, label: 'Property', value: 'Apartment' },
      { icon: BedDouble, label: 'Bedrooms', value: '2' },
      { icon: Bath, label: 'Bathrooms', value: '2' },
      { icon: MapPin, label: 'Area', value: 'Sea Point' },
    ],
  },
  {
    slug: '24-cedar-lane',
    title: '24 Cedar Lane',
    location: 'Waterfall, Midrand',
    address: '24 Cedar Lane, Waterfall',
    price: 4950000,
    type: 'Townhouse',
    bedrooms: 4,
    bathrooms: 3,
    size: '264 m²',
    status: 'Viewing-ready',
    agency: 'Arch9 Network',
    agent: {
      name: 'Sarah Naidoo',
      role: 'Property Advisor',
      phone: '+27 10 555 0120',
      email: 'sarah@arch9.co.za',
    },
    summary: 'A modern townhouse with generous family proportions and transaction documents prepared before offer stage.',
    description:
      'Set inside a quiet Waterfall enclave, 24 Cedar Lane gives buyers a composed family home with space, security and a cleaner handover into finance and transfer once the offer is signed.',
    features: ['Four bedrooms', 'Staff accommodation', 'Covered patio', 'Estate security', 'Finance-friendly documentation', 'Occupation date available'],
    highlights: [
      { icon: Home, label: 'Property', value: 'Townhouse' },
      { icon: BedDouble, label: 'Bedrooms', value: '4' },
      { icon: Bath, label: 'Bathrooms', value: '3' },
      { icon: Trees, label: 'Outdoor', value: 'Covered patio' },
    ],
  },
]

export function formatPrice(price) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function findPropertyBySlug(slug) {
  return properties.find((property) => property.slug === slug)
}
