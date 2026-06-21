import { developments } from './developments'
import { formatPrice, properties } from './properties'
import { areaInsights } from './areaInsights'

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function areaFromLocation(location = '') {
  return location.split(',')[0].trim()
}

function cityFromLocation(location = '') {
  const parts = location.split(',').map((part) => part.trim()).filter(Boolean)
  return parts[1] || parts[0] || 'South Africa'
}

const seedAreas = [
  ...new Set([
    ...properties.map((property) => areaFromLocation(property.location)),
    ...developments.map((development) => areaFromLocation(development.area)),
  ]),
]

export const areas = seedAreas.map((name) => {
  const insight = areaInsights[name]
  const firstListing = properties.find((property) => property.location.includes(name))
  const firstDevelopment = developments.find((development) => development.area.includes(name))

  return {
    id: `area_${slugify(name)}`,
    name,
    slug: slugify(name),
    province: ['Sea Point', 'Foreshore', 'Cape Town'].includes(name) ? 'Western Cape' : name === 'Umhlanga' ? 'KwaZulu-Natal' : 'Gauteng',
    municipality: cityFromLocation(firstListing?.location || firstDevelopment?.area || name),
    city: cityFromLocation(firstListing?.location || firstDevelopment?.area || name),
    description:
      insight?.description ||
      `${name} is one of the areas Arch9 tracks for active listings, development activity, buyer demand, amenities and property journey signals.`,
    hero_image_url: firstListing?.image || firstDevelopment?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    latitude: null,
    longitude: null,
    created_at: '2026-06-21T00:00:00.000Z',
    updated_at: new Date().toISOString(),
  }
})

export function findAreaBySlug(areaSlug) {
  return areas.find((area) => area.slug === areaSlug)
}

export function getAreaListings(areaSlug, options = {}) {
  const area = findAreaBySlug(areaSlug)
  if (!area) return []

  return properties.filter((property) => {
    const inArea = property.location.toLowerCase().includes(area.name.toLowerCase())
    const type = options.propertyType
    const matchesType =
      !type ||
      (type === 'House' && ['Estate Home', 'Townhouse'].includes(property.type)) ||
      (type === 'Townhouse' && property.type === 'Townhouse') ||
      (type === 'Apartment' && property.type === 'Apartment') ||
      (type === 'Development' && property.type === 'Development')
    const matchesBedrooms = !options.bedrooms || property.bedrooms === options.bedrooms
    const matchesMax = !options.priceMax || property.price <= options.priceMax
    return inArea && property.listingType === 'for-sale' && matchesType && matchesBedrooms && matchesMax
  })
}

export function getAreaDevelopments(areaSlug) {
  const area = findAreaBySlug(areaSlug)
  if (!area) return []
  return developments.filter((development) => development.area.toLowerCase().includes(area.name.toLowerCase()))
}

function median(values) {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

function mode(values) {
  const counts = values.reduce((current, value) => ({ ...current, [value]: (current[value] || 0) + 1 }), {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Property'
}

export function getAreaStats(areaSlug) {
  const area = findAreaBySlug(areaSlug)
  const listings = getAreaListings(areaSlug)
  const prices = listings.map((property) => property.price)
  const insight = areaInsights[area?.name]

  return {
    id: `stats_${areaSlug}`,
    area_id: area?.id || null,
    active_listing_count: listings.length,
    average_asking_price: prices.length ? prices.reduce((sum, price) => sum + price, 0) / prices.length : insight?.averagePrice || 0,
    median_asking_price: prices.length ? median(prices) : insight?.medianPrice || 0,
    lowest_asking_price: prices.length ? Math.min(...prices) : 0,
    highest_asking_price: prices.length ? Math.max(...prices) : 0,
    average_bedrooms: listings.length ? listings.reduce((sum, property) => sum + Number(property.bedrooms || 0), 0) / listings.length : 0,
    average_bathrooms: listings.length ? listings.reduce((sum, property) => sum + Number(property.bathrooms || 0), 0) / listings.length : 0,
    most_common_property_type: mode(listings.map((property) => property.type)),
    average_days_on_market: insight?.averageDaysOnMarket || 0,
    updated_at: new Date().toISOString(),
  }
}

export function getAreaAmenities(areaSlug) {
  const area = findAreaBySlug(areaSlug)
  const insight = areaInsights[area?.name]
  if (!insight) return []

  return [
    ...(insight.schools || []).map((name, index) => ({ id: `amenity_${areaSlug}_school_${index}`, area_id: area.id, name, type: 'Schools', distance_km: index + 1.4, rating: 4.4 })),
    ...(insight.shoppingCentres || []).map((name, index) => ({ id: `amenity_${areaSlug}_shopping_${index}`, area_id: area.id, name, type: 'Shopping', distance_km: index + 2.1, rating: 4.3 })),
    ...(insight.hospitals || []).map((name, index) => ({ id: `amenity_${areaSlug}_health_${index}`, area_id: area.id, name, type: 'Healthcare', distance_km: index + 3.2, rating: 4.2 })),
    { id: `amenity_${areaSlug}_transport_0`, area_id: area.id, name: insight.gautrain, type: 'Transport', distance_km: 8.2, rating: 4.1 },
    { id: `amenity_${areaSlug}_airport_0`, area_id: area.id, name: insight.airport, type: 'Transport', distance_km: 24.5, rating: 4.2 },
  ]
}

export function getSimilarAreas(areaSlug) {
  const current = findAreaBySlug(areaSlug)
  if (!current) return areas.slice(0, 4)
  return areas.filter((area) => area.slug !== areaSlug && area.province === current.province).slice(0, 4)
}

export function isAreaIndexable(areaSlug) {
  const area = findAreaBySlug(areaSlug)
  if (!area) return false
  const listings = getAreaListings(areaSlug)
  const areaDevelopments = getAreaDevelopments(areaSlug)
  const stats = getAreaStats(areaSlug)
  return listings.length >= 3 || areaDevelopments.length >= 1 || stats.average_asking_price > 0 || Boolean(area.description)
}

export function createPropertySEOPage({ pageType, areaSlug, propertyType, bedroomCount, priceMax }) {
  const area = findAreaBySlug(areaSlug)
  const listings = getAreaListings(areaSlug, { propertyType, bedrooms: bedroomCount, priceMax })
  const titlePrefix =
    pageType === 'houses'
      ? `${bedroomCount ? `${bedroomCount} bedroom ` : ''}Houses for sale in ${area?.name}`
      : pageType === 'townhouses'
        ? `Townhouses for sale in ${area?.name}${priceMax ? ' under R2 million' : ''}`
        : pageType === 'apartments'
          ? `Apartments for sale in ${area?.name}`
          : pageType === 'developments'
            ? `Developments in ${area?.name}`
            : `Property for sale in ${area?.name}${priceMax ? ' under R2 million' : ''}`

  return {
    id: `seo_${pageType}_${areaSlug}_${propertyType || 'all'}_${bedroomCount || 'any'}_${priceMax || 'any'}`,
    page_type: pageType,
    slug: `${pageType}-${areaSlug}`,
    area_id: area?.id || null,
    property_type: propertyType || null,
    bedroom_count: bedroomCount || null,
    price_min: null,
    price_max: priceMax || null,
    title: titlePrefix,
    meta_description: `Browse ${titlePrefix.toLowerCase()}. View listings, prices, area insights, calculators and viewing options on Arch9.`,
    intro_copy: `Explore ${titlePrefix.toLowerCase()} with Arch9 property intelligence. Compare prices, view available listings, estimate finance and understand the area before you book a viewing.`,
    canonical_url: `/${pageType === 'all' ? 'property-for-sale' : `${pageType}-for-sale`}/${areaSlug}`,
    is_indexable: listings.length > 0 && isAreaIndexable(areaSlug),
    created_at: '2026-06-21T00:00:00.000Z',
    updated_at: new Date().toISOString(),
  }
}

export function getPropertyPulseMetrics() {
  return [
    {
      id: 'pulse_most_viewed_areas',
      metric_type: 'most_viewed_areas',
      scope: 'national',
      value: areas.slice(0, 5).map((area, index) => ({ label: area.name, value: 92 - index * 7 })),
    },
    {
      id: 'pulse_price_brackets',
      metric_type: 'popular_price_brackets',
      scope: 'national',
      value: [
        { label: 'R1m - R2m', value: 34 },
        { label: 'R2m - R3m', value: 29 },
        { label: 'R3m - R5m', value: 21 },
        { label: 'R5m+', value: 16 },
      ],
    },
    {
      id: 'pulse_finance_readiness',
      metric_type: 'finance_readiness',
      scope: 'national',
      value: [
        { label: 'Prequalified', value: 42 },
        { label: 'Documents pending', value: 31 },
        { label: 'Needs advice', value: 27 },
      ],
    },
  ]
}

export function formatStat(value) {
  if (typeof value === 'number' && value > 10000) return formatPrice(value)
  if (typeof value === 'number') return Number.isInteger(value) ? String(value) : value.toFixed(1)
  return value || '--'
}
