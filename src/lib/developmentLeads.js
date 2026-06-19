const STORAGE_KEY = 'arch9_public_development_leads'
const LATEST_KEY = 'arch9_latest_development_lead'

export function captureDevelopmentEnquiry({ development, enquiry }) {
  const capturedAt = new Date().toISOString()
  const payload = {
    id: `dev_${Math.random().toString(36).slice(2, 10)}`,
    type: 'development-enquiry',
    capturedAt,
    development: {
      slug: development.slug,
      title: development.title,
      area: development.area,
      startingPrice: development.startingPrice,
      availableUnits: development.availableUnits,
      status: development.status,
      stage: development.stage,
    },
    enquiry,
    workflow: {
      nextAction: 'Assign development advisor',
      stage: 'New development enquiry',
    },
  }

  if (typeof window !== 'undefined') {
    const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    existing.unshift(payload)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 25)))
    window.localStorage.setItem(LATEST_KEY, JSON.stringify(payload))
  }

  return payload
}
