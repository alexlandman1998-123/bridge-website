const DEFAULT_DEMO_ENQUIRIES_ENDPOINT = 'https://app.arch9.co.za/api/public/demo-enquiries'

function normalizeText(value = '') {
  return String(value || '').trim()
}

function getDemoEnquiriesEndpoint() {
  const configured = normalizeText(import.meta.env.VITE_DEMO_ENQUIRIES_API_URL)
  return configured || DEFAULT_DEMO_ENQUIRIES_ENDPOINT
}

function readUtmParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search || '')
  return {
    source: normalizeText(params.get('utm_source')),
    medium: normalizeText(params.get('utm_medium')),
    campaign: normalizeText(params.get('utm_campaign')),
    content: normalizeText(params.get('utm_content')),
    term: normalizeText(params.get('utm_term')),
  }
}

function readPageContext() {
  if (typeof window === 'undefined') return {}
  return {
    pageUrl: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || '',
    userAgent: navigator.userAgent || '',
    viewport: `${window.innerWidth || 0}x${window.innerHeight || 0}`,
    utm: readUtmParams(),
  }
}

function persistLocalDemoRequest(record) {
  if (typeof window === 'undefined' || !window.localStorage) return null
  try {
    const previousRequests = JSON.parse(window.localStorage.getItem('arch9_demo_requests') || '[]')
    const safePreviousRequests = Array.isArray(previousRequests) ? previousRequests : []
    window.localStorage.setItem('arch9_demo_request', JSON.stringify(record))
    window.localStorage.setItem('arch9_demo_requests', JSON.stringify([record, ...safePreviousRequests].slice(0, 20)))
    return record
  } catch {
    return null
  }
}

export async function submitDemoEnquiry(payload) {
  const submittedAt = new Date().toISOString()
  const record = {
    ...payload,
    submittedAt,
    source: 'arch9-book-demo-wizard',
    context: readPageContext(),
  }

  const localRecord = persistLocalDemoRequest(record)

  const response = await fetch(getDemoEnquiriesEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(record),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data?.message || 'We could not submit your demo request. Please try again.')
    error.status = response.status
    error.payload = data
    error.localRecord = localRecord
    throw error
  }

  return {
    ...data,
    localRecord,
  }
}
