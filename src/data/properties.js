import { Bath, BedDouble, Building2, Home, MapPin, Trees } from 'lucide-react'

export const propertyTypes = ['Apartment', 'House', 'Estate Home', 'Townhouse', 'Development', 'Commercial', 'Vacant Land']

export const properties = [
  {
    slug: '14-junoah-estate',
    title: 'Unit 14 · Junoah Estate',
    location: 'Bryanston, Johannesburg',
    address: 'Unit 14, Junoah Estate, Bryanston',
    listingType: 'for-sale',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    price: 3850000,
    type: 'Estate Home',
    bedrooms: 3,
    bathrooms: 2.5,
    parking: 2,
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
    listingType: 'for-sale',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    price: 6250000,
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    parking: 2,
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
    listingType: 'for-sale',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    price: 4950000,
    type: 'Townhouse',
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
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
  {
    slug: '11-morningside-terrace',
    title: '11 Morningside Terrace',
    location: 'Morningside, Sandton',
    address: '11 Morningside Terrace, Sandton',
    listingType: 'to-rent',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    price: 28500,
    priceLabel: '/ pm',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    size: '118 m²',
    status: 'To rent',
    agency: 'Arch9 Network',
    agent: {
      name: 'Ayesha Khan',
      role: 'Leasing Advisor',
      phone: '+27 11 555 0172',
      email: 'ayesha@arch9.co.za',
    },
    summary: 'A refined lock-up-and-go apartment close to Sandton’s business district and lifestyle nodes.',
    description:
      '11 Morningside Terrace gives tenants a calm, premium base with a clear rental journey and quick response path through Arch9.',
    features: ['24-hour security', 'Covered parking', 'Balcony', 'Pool access', 'Pet friendly'],
    highlights: [
      { icon: Building2, label: 'Property', value: 'Apartment' },
      { icon: BedDouble, label: 'Bedrooms', value: '2' },
      { icon: Bath, label: 'Bathrooms', value: '2' },
      { icon: MapPin, label: 'Area', value: 'Sandton' },
    ],
  },
  {
    slug: 'the-ridge-estate',
    title: 'The Ridge Estate',
    location: 'Pretoria East',
    address: 'Pretoria East',
    listingType: 'for-sale',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    price: 1950000,
    type: 'Development',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    size: 'From 182 m²',
    status: 'New release',
    agency: 'Arch9 Developments',
    agent: {
      name: 'Development Sales Team',
      role: 'Sales Desk',
      phone: '+27 12 555 0102',
      email: 'developments@arch9.co.za',
    },
    summary: 'A new estate release with strong transaction flow and an early opportunity for buyers.',
    description:
      'The Ridge Estate is a premium new development in Pretoria East designed for buyers looking for an easier entry into a connected property journey.',
    features: ['New release', 'Estate security', 'Family units', 'Transfer support', 'Developer direct'],
    highlights: [
      { icon: Home, label: 'Property', value: 'Development' },
      { icon: BedDouble, label: 'Beds', value: '3' },
      { icon: Bath, label: 'Baths', value: '2' },
      { icon: Trees, label: 'Lifestyle', value: 'Estate living' },
    ],
  },
  {
    slug: 'lakeview-heights',
    title: 'Lakeview Heights',
    location: 'Fourways, Johannesburg',
    address: 'Fourways, Johannesburg',
    listingType: 'for-sale',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    price: 2350000,
    type: 'Development',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    size: 'From 96 m²',
    status: 'Phase 2 selling',
    agency: 'Arch9 Developments',
    agent: {
      name: 'Development Sales Team',
      role: 'Sales Desk',
      phone: '+27 11 555 0102',
      email: 'developments@arch9.co.za',
    },
    summary: 'A mid-density development near key retail and business nodes with live unit availability.',
    description:
      'Lakeview Heights is aimed at buyers who want a modern apartment address with a simple enquiry path and clear next steps.',
    features: ['Phase 2 available', 'Shared amenities', 'Modern apartments', 'Investor-friendly', 'Developer direct'],
    highlights: [
      { icon: Home, label: 'Property', value: 'Development' },
      { icon: BedDouble, label: 'Beds', value: '2' },
      { icon: Bath, label: 'Baths', value: '2' },
      { icon: Trees, label: 'Lifestyle', value: 'Urban living' },
    ],
  },
  {
    slug: '45-waterfall-ridge',
    title: '45 Waterfall Ridge',
    location: 'Waterfall, Midrand',
    address: '45 Waterfall Ridge, Waterfall',
    listingType: 'for-sale',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    price: 5750000,
    type: 'Estate Home',
    bedrooms: 4,
    bathrooms: 3.5,
    parking: 2,
    size: '286 m²',
    status: 'New listing',
    agency: 'Arch9 Network',
    agent: {
      name: 'Nandi Mokoena',
      role: 'Property Advisor',
      phone: '+27 10 555 0184',
      email: 'nandi@arch9.co.za',
    },
    summary: 'A contemporary family estate home with broad proportions and a polished transaction journey.',
    description:
      '45 Waterfall Ridge offers a modern family layout, secure setting and a clean route from enquiry to transfer for serious buyers.',
    features: ['Estate security', 'Double garage', 'Private garden', 'Solar-ready', 'Prepared seller documents'],
    highlights: [
      { icon: Home, label: 'Property', value: 'Estate home' },
      { icon: BedDouble, label: 'Bedrooms', value: '4' },
      { icon: Bath, label: 'Bathrooms', value: '3.5' },
      { icon: Trees, label: 'Lifestyle', value: 'Private garden' },
    ],
  },
  {
    slug: '32-foreshore-lofts',
    title: '32 Foreshore Lofts',
    location: 'Foreshore, Cape Town',
    address: '32 Foreshore Lofts, Cape Town',
    listingType: 'to-rent',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    price: 32000,
    priceLabel: '/ pm',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    size: '104 m²',
    status: 'Available now',
    agency: 'Arch9 Network',
    agent: {
      name: 'Ayesha Khan',
      role: 'Leasing Advisor',
      phone: '+27 11 555 0172',
      email: 'ayesha@arch9.co.za',
    },
    summary: 'A sharp city apartment with a strong rental proposition and premium finishes.',
    description:
      'Foreshore Lofts offers a central Cape Town address, practical parking and a polished rental experience through Arch9.',
    features: ['City living', 'Secure access', 'Balcony', 'Covered parking', 'Fast enquiry path'],
    highlights: [
      { icon: Building2, label: 'Property', value: 'Apartment' },
      { icon: BedDouble, label: 'Bedrooms', value: '2' },
      { icon: Bath, label: 'Bathrooms', value: '2' },
      { icon: MapPin, label: 'Area', value: 'Cape Town' },
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

export function formatListingPrice(property) {
  const base = formatPrice(property.price)
  return property.priceLabel ? `${base}${property.priceLabel}` : base
}
