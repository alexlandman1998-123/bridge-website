function readNumber(value) {
  if (!value) return ''
  return Number.isFinite(Number(value)) ? String(Number(value)) : ''
}

export function readPropertyFilters(search = window.location.search) {
  const params = new URLSearchParams(search)

  return {
    status: params.get('status') || 'for-sale',
    location: params.get('location') || '',
    type: params.get('type') || 'Any',
    minPrice: readNumber(params.get('minPrice')),
    maxPrice: readNumber(params.get('maxPrice')),
    bedrooms: params.get('bedrooms') || 'Any',
    bathrooms: params.get('bathrooms') || 'Any',
    sort: params.get('sort') || 'newest',
  }
}

export function buildPropertyQuery(filters) {
  const params = new URLSearchParams()

  if (filters.status) params.set('status', filters.status)
  if (filters.location) params.set('location', filters.location)
  if (filters.type && filters.type !== 'Any') params.set('type', filters.type)
  if (filters.minPrice) params.set('minPrice', filters.minPrice)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
  if (filters.bedrooms && filters.bedrooms !== 'Any') params.set('bedrooms', filters.bedrooms)
  if (filters.bathrooms && filters.bathrooms !== 'Any') params.set('bathrooms', filters.bathrooms)
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort)

  return params.toString()
}
