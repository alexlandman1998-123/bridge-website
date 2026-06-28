import { Bath, BedDouble, Building2, Home, MapPin } from 'lucide-react'

const PUBLIC_LISTINGS_API = 'https://app.arch9.co.za/api/public/listings'

function normalizeText(value = '') {
  return String(value || '').trim()
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : fallback
}

function formatAreaSize(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric) || numeric <= 0) return ''
  return `${numeric.toLocaleString('en-ZA')} m²`
}

function formatLocation(listing = {}) {
  return [listing.suburb, listing.city, listing.province].filter(Boolean).join(', ')
}

function mapListingType(value = '') {
  const normalized = normalizeText(value).toLowerCase()
  if (normalized.includes('rent')) return 'to-rent'
  return 'for-sale'
}

export function mapPublicListingToProperty(listing = {}) {
  const propertyType = normalizeText(listing.propertyType) || 'Property'
  const location = formatLocation(listing) || 'South Africa'
  const parking = toNumber(listing.garages) + toNumber(listing.parkingBays)
  const size = formatAreaSize(listing.floorSize) || formatAreaSize(listing.erfSize) || ''
  const price = toNumber(listing.askingPrice)
  const features = [...(Array.isArray(listing.features) ? listing.features : []), ...(Array.isArray(listing.amenities) ? listing.amenities : [])].filter(Boolean)

  return {
    id: listing.id,
    slug: normalizeText(listing.slug || listing.id),
    title: normalizeText(listing.title) || 'Arch9 listing',
    location,
    address: location,
    listingType: mapListingType(listing.listingType),
    image: normalizeText(listing.coverImageUrl),
    gallery: Array.isArray(listing.galleryImages) ? listing.galleryImages.map((item) => item.url).filter(Boolean) : [],
    price,
    type: propertyType,
    bedrooms: toNumber(listing.bedrooms),
    bathrooms: toNumber(listing.bathrooms),
    parking,
    size,
    status: 'Published',
    agency: normalizeText(listing.agencyName) || 'Arch9 Network',
    agent: {
      name: normalizeText(listing.agentName) || 'Arch9 Concierge',
      role: 'Property Professional',
      phone: '+27 11 568 0000',
      email: 'hello@arch9.co.za',
    },
    summary: normalizeText(listing.description) || 'A published Arch9 network listing with a connected enquiry-to-transaction journey.',
    description: normalizeText(listing.description) || 'This property has been published from the Arch9 workspace. Enquire to continue the journey through a connected transaction experience.',
    features: features.length ? features : ['Published via Arch9', 'Connected enquiry journey', 'Transaction-ready workflow'],
    highlights: [
      { icon: propertyType.toLowerCase().includes('apartment') ? Building2 : Home, label: 'Property', value: propertyType },
      { icon: BedDouble, label: 'Bedrooms', value: listing.bedrooms ? String(listing.bedrooms) : 'On enquiry' },
      { icon: Bath, label: 'Bathrooms', value: listing.bathrooms ? String(listing.bathrooms) : 'On enquiry' },
      { icon: MapPin, label: 'Area', value: listing.suburb || listing.city || 'South Africa' },
    ],
    publicUrl: listing.publicUrl,
    publishedAt: listing.publishedAt,
    source: 'arch9_public_api',
  }
}

function buildListingsUrl(filters = {}) {
  const params = new URLSearchParams()
  if (filters.location) params.set('q', filters.location)
  if (filters.type && filters.type !== 'Any') params.set('propertyType', filters.type)
  if (filters.minPrice) params.set('minPrice', filters.minPrice)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
  if (filters.bedrooms && filters.bedrooms !== 'Any') params.set('bedrooms', String(filters.bedrooms).replace('+', ''))
  if (filters.bathrooms && filters.bathrooms !== 'Any') params.set('bathrooms', String(filters.bathrooms).replace('+', ''))
  if (filters.status === 'to-rent') params.set('listingType', 'Rental')
  if (filters.status === 'for-sale') params.set('listingType', 'Sale')
  params.set('limit', '60')
  return `${PUBLIC_LISTINGS_API}?${params.toString()}`
}

async function readJsonResponse(response, fallbackMessage) {
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error(fallbackMessage)
  }
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload?.message || fallbackMessage)
  }
  return payload
}

export async function fetchPublicListings(filters = {}) {
  const response = await fetch(buildListingsUrl(filters), { headers: { Accept: 'application/json' } })
  const payload = await readJsonResponse(response, 'Published listings could not be loaded.')
  return {
    count: Number(payload.count || 0),
    items: Array.isArray(payload.items) ? payload.items.map(mapPublicListingToProperty) : [],
    generatedAt: payload.generatedAt || null,
  }
}

export async function fetchPublicListingBySlug(slug = '') {
  const params = new URLSearchParams({ slug })
  const response = await fetch(`${PUBLIC_LISTINGS_API}?${params.toString()}`, { headers: { Accept: 'application/json' } })
  const payload = await readJsonResponse(response, 'This listing is not available.')
  return payload?.listing ? mapPublicListingToProperty(payload.listing) : null
}
