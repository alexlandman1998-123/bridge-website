const META_PIXEL_ID = '2520166111782311'

const firedLeadEventIds = new Set()
const firedFunnelVisits = new Set()

function getFbq() {
  if (typeof window === 'undefined') return null
  return typeof window.fbq === 'function' ? window.fbq : null
}

function buildEventKey(prefix, value) {
  return `${prefix}:${value}`
}

export function getMetaPixelId() {
  return META_PIXEL_ID
}

export function createMetaEventId(prefix = 'meta') {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function trackMetaEvent(eventName, params = {}) {
  const fbq = getFbq()
  if (!fbq) return false
  fbq('track', eventName, params)
  return true
}

export function trackMetaFunnelVisit(routeKey) {
  if (!routeKey) return false
  const key = buildEventKey('funnel', routeKey)
  if (firedFunnelVisits.has(key)) return false
  firedFunnelVisits.add(key)
  return trackMetaEvent('Contact')
}

export function trackMetaLeadOnce(eventId, params = {}) {
  if (!eventId) return false
  if (firedLeadEventIds.has(eventId)) return false
  firedLeadEventIds.add(eventId)
  return trackMetaEvent('Lead', params)
}

export function resetMetaPixelTracking() {
  firedLeadEventIds.clear()
  firedFunnelVisits.clear()
}
