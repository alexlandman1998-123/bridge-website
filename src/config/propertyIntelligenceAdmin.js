export const propertyIntelligenceAdminSections = [
  {
    title: 'Areas',
    capabilities: ['Create and edit area records', 'Upload hero images', 'Edit descriptions', 'Manage SEO metadata', 'Mark featured areas'],
  },
  {
    title: 'Area Stats',
    capabilities: ['View calculated listing stats', 'Review active listing counts', 'Override market values where needed', 'Track last recalculation time'],
  },
  {
    title: 'Amenities',
    capabilities: ['Fetch from Google Places in future phases', 'Approve or reject amenities', 'Edit display order', 'Review transport and school coverage'],
  },
  {
    title: 'SEO Pages',
    capabilities: ['View generated pages', 'Set indexable true or false', 'Edit meta title and description', 'Edit intro copy', 'Preview page output'],
  },
  {
    title: 'Property Pulse',
    capabilities: ['View metrics', 'Publish monthly snapshots', 'Archive previous months', 'Review demand signals'],
  },
]

export const propertyIntelligenceCronJobs = [
  {
    cadence: 'Daily',
    jobs: ['Recalculate area stats', 'Update active listing counts', 'Refresh property SEO pages'],
  },
  {
    cadence: 'Weekly',
    jobs: ['Update area market reports', 'Refresh Google Places data where available', 'Update Property Pulse metrics'],
  },
  {
    cadence: 'Monthly',
    jobs: ['Generate monthly Property Pulse snapshot', 'Archive previous month'],
  },
]
