import { trackListingEvent } from './listingJourney'

export function capturePropertyEnquiry({ property, enquiry }) {
  const lead = {
    id: `lead_${Date.now()}`,
    source: 'arch9_public_property_enquiry',
    leadType: 'buyer',
    status: 'new',
    assignedAgent: property.agent,
    property: {
      slug: property.slug,
      title: property.title,
      address: property.address,
      price: property.price,
    },
    buyer: enquiry,
    workflow: {
      created: true,
      followUpTriggered: true,
      nextAction: 'Agent follow-up',
    },
    submittedAt: new Date().toISOString(),
  }

  const existingLeads = JSON.parse(localStorage.getItem('arch9_public_property_leads') || '[]')
  localStorage.setItem('arch9_public_property_leads', JSON.stringify([lead, ...existingLeads]))
  localStorage.setItem('arch9_latest_buyer_lead', JSON.stringify(lead))
  trackListingEvent({ eventType: 'Property Enquiry Submitted', property, payload: { source: lead.source, leadId: lead.id } })

  return lead
}
