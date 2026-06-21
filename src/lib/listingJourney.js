const PRIME_RATE = 11.75
const STORAGE_KEYS = {
  events: 'arch9_listing_events',
  saved: 'arch9_saved_properties',
  comparisons: 'arch9_property_comparison',
  viewingRequests: 'arch9_viewing_requests',
  financeApplications: 'arch9_finance_applications',
  alertSubscriptions: 'arch9_alert_subscriptions',
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function trackListingEvent({ eventType, property, payload = {} }) {
  const event = {
    id: `event_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    user_id: 'anonymous',
    property_id: property?.slug || null,
    event_type: eventType,
    timestamp: new Date().toISOString(),
    payload,
  }

  const events = readJson(STORAGE_KEYS.events, [])
  writeJson(STORAGE_KEYS.events, [event, ...events].slice(0, 250))
  return event
}

export function calculateBond({ purchasePrice, deposit = purchasePrice * 0.1, interestRate = PRIME_RATE, termYears = 20 }) {
  const loanAmount = Math.max(Number(purchasePrice || 0) - Number(deposit || 0), 0)
  const monthlyRate = Number(interestRate || 0) / 100 / 12
  const months = Number(termYears || 0) * 12
  const monthlyRepayment =
    monthlyRate > 0 && months > 0
      ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      : months > 0
        ? loanAmount / months
        : 0
  const totalLoanCost = monthlyRepayment * months
  const totalInterest = Math.max(totalLoanCost - loanAmount, 0)

  return {
    purchasePrice: Number(purchasePrice || 0),
    deposit: Number(deposit || 0),
    interestRate: Number(interestRate || 0),
    termYears: Number(termYears || 0),
    loanAmount,
    monthlyRepayment,
    totalInterest,
    totalLoanCost,
  }
}

function estimateTransferDuty(purchasePrice) {
  const price = Number(purchasePrice || 0)
  if (price <= 1210000) return 0
  if (price <= 1663300) return (price - 1210000) * 0.03
  if (price <= 2329300) return 13600 + (price - 1663300) * 0.06
  if (price <= 2994900) return 53560 + (price - 2329300) * 0.08
  if (price <= 13310000) return 106810 + (price - 2994900) * 0.11
  return 1241933 + (price - 13310000) * 0.13
}

export function calculateTransferCosts({ purchasePrice, bondAmount }) {
  const price = Number(purchasePrice || 0)
  const bond = Number(bondAmount || 0)
  const transferDuty = estimateTransferDuty(price)
  const transferCosts = Math.max(18500, price * 0.012)
  const bondRegistrationCosts = bond > 0 ? Math.max(13500, bond * 0.009) : 0
  const totalCashRequired = transferDuty + transferCosts + bondRegistrationCosts

  return {
    transferDuty,
    transferCosts,
    bondRegistrationCosts,
    totalCashRequired,
  }
}

export function calculateAffordability({ monthlyIncome, existingDebt, depositAmount, employmentType }) {
  const income = Number(monthlyIncome || 0)
  const debt = Number(existingDebt || 0)
  const deposit = Number(depositAmount || 0)
  const availableMonthly = Math.max(income * 0.3 - debt, 0)
  const estimatedBond = availableMonthly
  const loanCapacity = estimatedBond > 0 ? estimatedBond / 0.0102 : 0
  const suggestedBudget = loanCapacity + deposit
  const employmentFactor = employmentType === 'Self-employed' ? 0.86 : employmentType === 'Contract' ? 0.78 : 1
  const financeReadiness = Math.min(96, Math.round((income > 0 ? 58 : 12) + (deposit > 0 ? 14 : 0) + (debt < income * 0.15 ? 16 : 0) * employmentFactor))

  return {
    likelyAffordable: financeReadiness >= 70,
    estimatedBond,
    suggestedBudget,
    financeReadiness,
  }
}

export function isPropertySaved(slug) {
  return readJson(STORAGE_KEYS.saved, []).some((item) => item.slug === slug)
}

export function toggleSavedProperty(property) {
  const saved = readJson(STORAGE_KEYS.saved, [])
  const exists = saved.some((item) => item.slug === property.slug)
  const next = exists
    ? saved.filter((item) => item.slug !== property.slug)
    : [
        {
          slug: property.slug,
          title: property.title,
          location: property.location,
          price: property.price,
          savedAt: new Date().toISOString(),
        },
        ...saved,
      ]
  writeJson(STORAGE_KEYS.saved, next)
  trackListingEvent({ eventType: exists ? 'Property Unsaved' : 'Property Saved', property })
  return !exists
}

export function readComparison() {
  return readJson(STORAGE_KEYS.comparisons, [])
}

export function toggleComparisonProperty(property) {
  const comparison = readComparison()
  const exists = comparison.some((item) => item.slug === property.slug)
  const next = exists
    ? comparison.filter((item) => item.slug !== property.slug)
    : [
        ...comparison,
        {
          slug: property.slug,
          title: property.title,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          parking: property.parking,
          size: property.size,
          agent: property.agent.name,
          development: property.type === 'Development' ? property.title : property.agency,
        },
      ].slice(0, 4)
  writeJson(STORAGE_KEYS.comparisons, next)
  trackListingEvent({ eventType: exists ? 'Property Comparison Removed' : 'Property Comparison Added', property })
  return next
}

export function captureViewingRequest({ property, request }) {
  const viewingRequest = {
    id: `viewing_${Date.now()}`,
    property_id: property.slug,
    property: {
      slug: property.slug,
      title: property.title,
      address: property.address,
    },
    agent: property.agent,
    appointment: request,
    notification: {
      email: property.agent.email,
      crmActivityCreated: true,
    },
    submittedAt: new Date().toISOString(),
  }

  const requests = readJson(STORAGE_KEYS.viewingRequests, [])
  writeJson(STORAGE_KEYS.viewingRequests, [viewingRequest, ...requests])
  trackListingEvent({ eventType: 'Viewing Requested', property, payload: request })
  return viewingRequest
}

export function captureFinanceApplication({ property, application }) {
  const financeApplication = {
    id: `finance_${Date.now()}`,
    source: 'arch9_finance',
    property_id: property.slug,
    status: 'new',
    property: {
      slug: property.slug,
      title: property.title,
      price: property.price,
    },
    application,
    submittedAt: new Date().toISOString(),
  }

  const applications = readJson(STORAGE_KEYS.financeApplications, [])
  writeJson(STORAGE_KEYS.financeApplications, [financeApplication, ...applications])
  trackListingEvent({ eventType: 'Finance Application Started', property, payload: application })
  return financeApplication
}

export function captureAlertSubscription(filters) {
  const alert = {
    id: `alert_${Date.now()}`,
    filters,
    channels: ['email'],
    status: 'active',
    createdAt: new Date().toISOString(),
  }
  const alerts = readJson(STORAGE_KEYS.alertSubscriptions, [])
  writeJson(STORAGE_KEYS.alertSubscriptions, [alert, ...alerts])
  trackListingEvent({ eventType: 'Property Alert Created', payload: filters })
  return alert
}

export { PRIME_RATE }
