import { useEffect, useState } from 'react'
import { ArrowRight, BarChart3, Calculator, FileText, Home, Search, WalletCards } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatDevelopmentPrice } from '../data/developments'
import { formatListingPrice } from '../data/properties'
import {
  areas,
  createPropertySEOPage,
  findAreaBySlug,
  formatStat,
  getAreaAmenities,
  getAreaDevelopments,
  getAreaListings,
  getAreaStats,
  getPropertyPulseMetrics,
  getSimilarAreas,
  isAreaIndexable,
} from '../data/propertyIntelligence'
import { calculateAffordability, calculateBond, calculateTransferCosts } from '../lib/listingJourney'
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd, setPageSeo } from '../lib/seo'
import { propertyIntelligenceAdminSections, propertyIntelligenceCronJobs } from '../config/propertyIntelligenceAdmin'

const sectionLinks = [
  { label: 'Area Insights', href: '/areas' },
  { label: 'Market Reports', href: '/market-reports' },
  { label: 'Developments', href: '/developments' },
  { label: 'Buyer Guides', href: '/buyer-guides' },
  { label: 'Seller Guides', href: '/seller-guides' },
  { label: 'Calculators', href: '/calculators' },
  { label: 'Property Pulse', href: '/property-pulse' },
]

const calculatorFaqs = [
  {
    question: 'Are Arch9 calculator results guaranteed?',
    answer: 'No. Calculator results are estimates based on the values entered and should be confirmed with a qualified finance or transfer professional.',
  },
  {
    question: 'Can I apply for finance through Arch9?',
    answer: 'Yes. Arch9 can capture a finance lead and route it to the Arch9 Finance workflow for follow-up.',
  },
  {
    question: 'Can I use these calculators before viewing a property?',
    answer: 'Yes. They are designed to help buyers evaluate affordability and cash requirements before booking a viewing or making an offer.',
  },
]

function setSeoForPage({ title, description, path, indexable = true, jsonLd = [] }) {
  setPageSeo({
    title,
    description,
    canonicalPath: path,
    indexable,
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', href: '/' },
        { name: 'Property Intelligence', href: '/property-intelligence' },
        { name: title.replace(' | Arch9', ''), href: path },
      ]),
      ...jsonLd,
    ],
  })
}

function Shell({ children }) {
  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />
      <main className="pt-[112px]">{children}</main>
      <Footer />
    </div>
  )
}

function Hero({ eyebrow = 'Property Intelligence', title, subtitle, actions }) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-8 md:px-8 lg:pb-14">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">{eyebrow}</p>
          <h1 className="mt-5 max-w-[820px] text-[3.05rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem] xl:text-[6rem]">
            {title}
          </h1>
        </div>
        <div className="lg:justify-self-end">
          <p className="max-w-[620px] text-lg font-medium leading-8 text-[#31433D]">{subtitle}</p>
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  )
}

function Container({ children, className = '' }) {
  return <section className={`mx-auto w-full max-w-[1440px] px-6 py-8 md:px-8 ${className}`}>{children}</section>
}

function StatCard({ label, value, icon: Icon = BarChart3 }) {
  return (
    <div className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
      <Icon className="h-5 w-5 text-[#006B4D]" />
      <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#5B6B64]">{label}</p>
      <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[#05120F]">{value}</p>
    </div>
  )
}

function InternalLinks({ area }) {
  const links = [
    [`Property for sale in ${area.name}`, `/property-for-sale/${area.slug}`],
    [`Houses for sale in ${area.name}`, `/houses-for-sale/${area.slug}`],
    [`Townhouses for sale in ${area.name}`, `/townhouses-for-sale/${area.slug}`],
    [`Apartments for sale in ${area.name}`, `/apartments-for-sale/${area.slug}`],
    [`Developments in ${area.name}`, `/developments/${area.slug}`],
    [`Schools in ${area.name}`, `/schools-in/${area.slug}`],
    [`${area.name} market report`, `/market-reports/${area.slug}`],
  ]

  return (
    <div className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Explore {area.name}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="flex min-h-12 items-center justify-between rounded-[18px] bg-[#F8F4EC] px-4 text-sm font-extrabold text-[#071E1A] transition hover:text-[#006B4D]">
            {label}
            <ArrowRight className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  )
}

function ListingGrid({ listings }) {
  if (!listings.length) {
    return (
      <div className="rounded-[28px] border border-[#0A3028]/8 bg-white p-8 text-center">
        <h2 className="text-2xl font-extrabold text-[#05120F]">No active Arch9 listings here yet.</h2>
        <p className="mx-auto mt-3 max-w-[560px] text-sm leading-6 text-[#5B6B64]">This page is available for future data, but it should remain noindex until enough useful content exists.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((property) => (
        <a key={property.slug} href={`/property/${property.slug}`} className="group overflow-hidden rounded-[30px] border border-[#0A3028]/8 bg-white shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
          <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.02), rgba(5,18,15,0.56)), url(${property.image})` }} />
          <div className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">{property.type}</p>
            <h3 className="mt-3 text-xl font-extrabold tracking-[-0.04em] text-[#05120F]">{property.title}</h3>
            <p className="mt-2 text-sm font-semibold text-[#5B6B64]">{property.location}</p>
            <p className="mt-4 text-lg font-extrabold text-[#05120F]">{formatListingPrice(property)}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

function CalculatorModules({ compact = false }) {
  const [purchasePrice, setPurchasePrice] = useState(2450000)
  const [deposit, setDeposit] = useState(245000)
  const [bondAmount, setBondAmount] = useState(2205000)
  const [income, setIncome] = useState(85000)
  const bond = calculateBond({ purchasePrice, deposit })
  const transfer = calculateTransferCosts({ purchasePrice, bondAmount })
  const affordability = calculateAffordability({ monthlyIncome: income, existingDebt: 8500, depositAmount: deposit, employmentType: 'Permanent' })

  return (
    <div className={`grid gap-5 ${compact ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
      <div className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#006B4D]"><Calculator className="h-4 w-4" /> Bond calculator</p>
        <input className="mt-5 h-12 w-full rounded-[16px] border border-[#0A3028]/10 px-4 text-sm font-bold" type="number" value={purchasePrice} onChange={(event) => setPurchasePrice(Number(event.target.value))} />
        <input className="mt-3 h-12 w-full rounded-[16px] border border-[#0A3028]/10 px-4 text-sm font-bold" type="number" value={deposit} onChange={(event) => setDeposit(Number(event.target.value))} />
        <p className="mt-5 text-2xl font-extrabold">{formatListingPrice({ price: bond.monthlyRepayment, priceLabel: ' / month' })}</p>
      </div>
      <div className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#006B4D]"><FileText className="h-4 w-4" /> Transfer costs</p>
        <input className="mt-5 h-12 w-full rounded-[16px] border border-[#0A3028]/10 px-4 text-sm font-bold" type="number" value={bondAmount} onChange={(event) => setBondAmount(Number(event.target.value))} />
        <p className="mt-5 text-sm font-bold text-[#5B6B64]">Total cash required</p>
        <p className="mt-2 text-2xl font-extrabold">{formatListingPrice({ price: transfer.totalCashRequired })}</p>
      </div>
      <div className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#006B4D]"><WalletCards className="h-4 w-4" /> Affordability</p>
        <input className="mt-5 h-12 w-full rounded-[16px] border border-[#0A3028]/10 px-4 text-sm font-bold" type="number" value={income} onChange={(event) => setIncome(Number(event.target.value))} />
        <p className="mt-5 text-sm font-bold text-[#5B6B64]">Finance readiness</p>
        <p className="mt-2 text-2xl font-extrabold">{affordability.financeReadiness}%</p>
      </div>
    </div>
  )
}

function AreaDirectory() {
  useEffect(() => {
    setSeoForPage({
      title: 'Area Insights | Arch9',
      description: 'Explore Arch9 area insights, property prices, listings, developments, amenities and market activity across South Africa.',
      path: '/areas',
      jsonLd: [itemListJsonLd(areas.map((area) => ({ name: area.name, href: `/areas/${area.slug}` })))],
    })
  }, [])

  return (
    <Shell>
      <Hero title="Area insights for South African property decisions" subtitle="Compare prices, active listings, amenities, developments and market signals generated from Arch9 listings." />
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => {
            const stats = getAreaStats(area.slug)
            return (
              <a key={area.slug} href={`/areas/${area.slug}`} className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)] transition hover:-translate-y-1">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">{area.province}</p>
                <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em]">{area.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[#5B6B64]">{area.description}</p>
                <p className="mt-5 text-sm font-extrabold text-[#006B4D]">{formatStat(stats.average_asking_price)} average asking price</p>
              </a>
            )
          })}
        </div>
      </Container>
    </Shell>
  )
}

function AreaPage({ areaSlug }) {
  const area = findAreaBySlug(areaSlug)
  const stats = getAreaStats(areaSlug)
  const listings = getAreaListings(areaSlug)
  const areaDevelopments = getAreaDevelopments(areaSlug)
  const amenities = getAreaAmenities(areaSlug)
  const similarAreas = getSimilarAreas(areaSlug)
  const indexable = isAreaIndexable(areaSlug)

  useEffect(() => {
    if (!area) return
    setSeoForPage({
      title: `Property insights for ${area.name} | Arch9`,
      description: `Explore property prices, listings, developments, schools, amenities and market activity in ${area.name}.`,
      path: `/areas/${area.slug}`,
      indexable,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: area.name,
          address: {
            '@type': 'PostalAddress',
            addressLocality: area.city,
            addressRegion: area.province,
            addressCountry: 'ZA',
          },
        },
      ],
    })
  }, [area, indexable])

  if (!area) return <NotFoundPage title="Area not found" />

  const groupedAmenities = amenities.reduce((groups, amenity) => ({ ...groups, [amenity.type]: [...(groups[amenity.type] || []), amenity] }), {})

  return (
    <Shell>
      <Hero eyebrow="Area Insights" title={`Property insights for ${area.name}`} subtitle={`Explore property prices, listings, developments, schools, amenities and market activity in ${area.name}.`} />
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Average asking price" value={formatStat(stats.average_asking_price)} />
          <StatCard label="Active listings" value={stats.active_listing_count} icon={Home} />
          <StatCard label="Most common type" value={stats.most_common_property_type} icon={Search} />
          <StatCard label="Price range" value={stats.lowest_asking_price ? `${formatStat(stats.lowest_asking_price)} - ${formatStat(stats.highest_asking_price)}` : 'Building data'} />
        </div>
      </Container>
      <Container>
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Properties for sale</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.05em]">{area.name} listings</h2>
          </div>
          <a href={`/property-for-sale/${area.slug}`} className="bridge-button-primary">View all properties in {area.name}</a>
        </div>
        <ListingGrid listings={listings} />
      </Container>
      <Container>
        <div className="rounded-[34px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)] md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Area overview</p>
          <p className="mt-4 max-w-[880px] text-base leading-8 text-[#5B6B64]">{area.description}</p>
        </div>
      </Container>
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[34px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Nearby amenities</p>
            <div className="mt-5 grid gap-4">
              {Object.entries(groupedAmenities).map(([type, items]) => (
                <div key={type}>
                  <h3 className="text-sm font-extrabold">{type}</h3>
                  <div className="mt-2 grid gap-2">
                    {items.map((amenity) => (
                      <div key={amenity.id} className="flex items-center justify-between rounded-[16px] bg-[#F8F4EC] px-4 py-3 text-sm font-semibold">
                        <span>{amenity.name}</span>
                        <span className="text-[#006B4D]">{amenity.distance_km} km</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[34px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Market snapshot</p>
            <div className="mt-5 grid gap-3">
              {[
                ['Average price', formatStat(stats.average_asking_price)],
                ['Median price', formatStat(stats.median_asking_price)],
                ['Listings', stats.active_listing_count],
                ['Type mix', stats.most_common_property_type],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between rounded-[16px] bg-[#F8F4EC] px-4 py-3 text-sm font-bold">
                  <span>{label}</span>
                  <span className="text-[#006B4D]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      {areaDevelopments.length ? (
        <Container>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Developments</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {areaDevelopments.map((development) => (
              <a key={development.slug} href={`/developments/${development.slug}`} className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
                <h3 className="text-2xl font-extrabold">{development.title}</h3>
                <p className="mt-2 text-sm text-[#5B6B64]">{development.summary}</p>
                <p className="mt-4 text-sm font-extrabold text-[#006B4D]">{formatDevelopmentPrice(development)}</p>
              </a>
            ))}
          </div>
        </Container>
      ) : null}
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <InternalLinks area={area} />
          <div className="rounded-[30px] border border-[#0A3028]/8 bg-[#071E1A] p-6 text-[#F3EEE6]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Lead capture</p>
            <h2 className="mt-4 text-2xl font-extrabold">Make your next move in {area.name}</h2>
            <div className="mt-5 grid gap-3">
              <a href={`/property-for-sale/${area.slug}`} className="bridge-button-primary bridge-button-light">Get property alerts for {area.name}</a>
              <a href="/sell" className="bridge-button-secondary">What is my {area.name} property worth?</a>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Similar areas</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {similarAreas.map((similar) => (
            <a key={similar.slug} href={`/areas/${similar.slug}`} className="rounded-full border border-[#0A3028]/10 bg-white px-5 py-3 text-sm font-extrabold text-[#071E1A] hover:text-[#006B4D]">{similar.name}</a>
          ))}
        </div>
      </Container>
    </Shell>
  )
}

function SEOListingPage({ areaSlug, pageType = 'all', propertyType, bedroomCount, priceMax }) {
  const area = findAreaBySlug(areaSlug)
  const seoPage = createPropertySEOPage({ pageType, areaSlug, propertyType, bedroomCount, priceMax })
  const listings = getAreaListings(areaSlug, { propertyType, bedrooms: bedroomCount, priceMax })
  const stats = getAreaStats(areaSlug)
  const indexable = Boolean(area && seoPage.is_indexable)

  useEffect(() => {
    if (!area) return
    setSeoForPage({
      title: `${seoPage.title} | Arch9`,
      description: seoPage.meta_description,
      path: window.location.pathname,
      indexable,
      jsonLd: [itemListJsonLd(listings.map((property) => ({ name: property.title, href: `/property/${property.slug}` })))],
    })
  }, [area, seoPage.title, seoPage.meta_description, indexable, listings])

  if (!area) return <NotFoundPage title="Area not found" />

  return (
    <Shell>
      <Hero eyebrow="Programmatic Property Search" title={seoPage.title} subtitle={seoPage.intro_copy} />
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Average price" value={formatStat(stats.average_asking_price)} />
          <StatCard label="Active listings" value={listings.length} />
          <StatCard label="Most common type" value={stats.most_common_property_type} />
          <StatCard label="Median price" value={formatStat(stats.median_asking_price)} />
        </div>
      </Container>
      <Container>
        <ListingGrid listings={listings} />
      </Container>
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <CalculatorModules compact />
          <InternalLinks area={area} />
        </div>
      </Container>
      <Container>
        <div className="rounded-[34px] border border-[#0A3028]/8 bg-[#071E1A] p-8 text-[#F3EEE6]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Seller valuation</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em]">What is your {area.name} property worth?</h2>
          <p className="mt-3 max-w-[680px] text-sm leading-7 text-white/72">Use Arch9 area intelligence, listing activity and agent matching to understand your selling position.</p>
          <a href="/sell" className="bridge-button-primary bridge-button-light mt-6">Start property valuation</a>
        </div>
      </Container>
    </Shell>
  )
}

function MarketReports({ areaSlug }) {
  const area = areaSlug ? findAreaBySlug(areaSlug) : null

  useEffect(() => {
    setSeoForPage({
      title: area ? `${area.name} Property Market Report | Arch9` : 'Market Reports | Arch9',
      description: area ? `Read the ${area.name} property market report based on Arch9 listings and platform activity.` : 'Explore Arch9 property market reports for South African areas.',
      path: area ? `/market-reports/${area.slug}` : '/market-reports',
      indexable: area ? isAreaIndexable(area.slug) : true,
    })
  }, [area])

  if (!areaSlug) {
    return (
      <Shell>
        <Hero title="Property market reports without the noise" subtitle="Area-level price signals, listing activity, demand indicators and development movement generated from Arch9 data." />
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {areas.map((item) => (
              <a key={item.slug} href={`/market-reports/${item.slug}`} className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
                <h2 className="text-2xl font-extrabold">{item.name} Property Market Report</h2>
                <p className="mt-3 text-sm leading-6 text-[#5B6B64]">Average prices, listing counts, demand signals and development movement.</p>
              </a>
            ))}
          </div>
        </Container>
      </Shell>
    )
  }

  if (!area) return <NotFoundPage title="Market report not found" />

  const stats = getAreaStats(area.slug)
  const areaDevelopments = getAreaDevelopments(area.slug)

  return (
    <Shell>
      <Hero eyebrow="Market Report" title={`${area.name} Property Market Report`} subtitle="Market data is based on available Arch9 listings and platform activity and should be used as guidance only." />
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Average asking price" value={formatStat(stats.average_asking_price)} />
          <StatCard label="Median asking price" value={formatStat(stats.median_asking_price)} />
          <StatCard label="Buyer demand score" value={Math.min(94, 58 + stats.active_listing_count * 7)} />
          <StatCard label="Active listing count" value={stats.active_listing_count} />
        </div>
      </Container>
      <Container>
        <div className="rounded-[34px] border border-[#0A3028]/8 bg-white p-8 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
          <h2 className="text-3xl font-extrabold tracking-[-0.05em]">Market summary</h2>
          <p className="mt-4 max-w-[820px] text-base leading-8 text-[#5B6B64]">
            {area.name} currently shows {stats.active_listing_count} active Arch9 listings, a median asking price of {formatStat(stats.median_asking_price)}, and strongest activity around {stats.most_common_property_type.toLowerCase()} listings.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {areaDevelopments.map((development) => (
              <a key={development.slug} href={`/developments/${development.slug}`} className="rounded-[20px] bg-[#F8F4EC] p-4 text-sm font-bold">{development.title} · {formatDevelopmentPrice(development)}</a>
            ))}
          </div>
        </div>
      </Container>
    </Shell>
  )
}

function PropertyPulsePage() {
  const metrics = getPropertyPulseMetrics()

  useEffect(() => {
    setSeoForPage({
      title: 'South Africa Property Pulse | Arch9',
      description: 'A national Arch9 data story covering viewed areas, saved property types, popular price brackets, buyer demand and finance readiness trends.',
      path: '/property-pulse',
    })
  }, [])

  return (
    <Shell>
      <Hero eyebrow="Property Pulse" title="South Africa Property Pulse" subtitle="A national, regularly updated view of buyer demand, saved properties, developments, price brackets and finance readiness." />
      <Container>
        <div className="grid gap-5 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.id} className="rounded-[34px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">{metric.metric_type.replaceAll('_', ' ')}</p>
              <div className="mt-5 grid gap-3">
                {metric.value.map((item) => (
                  <div key={item.label} className="rounded-[18px] bg-[#F8F4EC] p-4">
                    <div className="flex justify-between text-sm font-extrabold">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-[#0A3028]/10">
                      <div className="h-full rounded-full bg-[#006B4D]" style={{ width: `${Math.min(item.value, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Shell>
  )
}

function CalculatorPage({ calculator }) {
  const title =
    calculator === 'transfer' ? 'Transfer cost calculator South Africa' : calculator === 'affordability' ? 'Affordability calculator South Africa' : 'Bond calculator South Africa'

  useEffect(() => {
    setSeoForPage({
      title: `${title} | Arch9`,
      description: `Use the Arch9 ${title.toLowerCase()} to estimate property finance, cash requirements and buying readiness.`,
      path: calculator === 'transfer' ? '/transfer-cost-calculator' : calculator === 'affordability' ? '/affordability-calculator' : '/bond-calculator',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: title,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web',
        },
        faqJsonLd(calculatorFaqs),
      ],
    })
  }, [calculator, title])

  return (
    <Shell>
      <Hero eyebrow="Calculators" title={title} subtitle="Estimate repayments, cash required and affordability before you book a viewing or make an offer." />
      <Container>
        <CalculatorModules />
      </Container>
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-[34px] border border-[#0A3028]/8 bg-white p-8 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
            <h2 className="text-3xl font-extrabold tracking-[-0.05em]">How to use this calculator</h2>
            <p className="mt-4 text-base leading-8 text-[#5B6B64]">Enter the expected purchase price, deposit, bond amount or income details. Arch9 uses these estimates to help you understand likely repayment, transfer costs and finance readiness.</p>
            <div className="mt-6 grid gap-3">
              {calculatorFaqs.map((faq) => (
                <details key={faq.question} className="rounded-[18px] bg-[#F8F4EC] p-4">
                  <summary className="cursor-pointer text-sm font-extrabold">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-6 text-[#5B6B64]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="rounded-[34px] border border-[#0A3028]/8 bg-[#071E1A] p-8 text-[#F3EEE6]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Next step</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em]">Ready to move from estimate to application?</h2>
            <div className="mt-6 grid gap-3">
              <a href="/contact" className="bridge-button-primary bridge-button-light">Apply for finance</a>
              <a href="/" className="bridge-button-secondary">Browse properties</a>
              <a href="/buyer-guides" className="bridge-button-secondary">Read buyer guide</a>
            </div>
          </div>
        </div>
      </Container>
    </Shell>
  )
}

function HubPage({ type = 'home' }) {
  const isGuides = ['buyer-guides', 'seller-guides', 'calculators'].includes(type)
  const title =
    type === 'buyer-guides'
      ? 'Buyer guides for the connected property journey'
      : type === 'seller-guides'
        ? 'Seller guides and valuation intelligence'
        : type === 'calculators'
          ? 'Property calculators for South Africa'
          : 'Property Intelligence'
  const subtitle =
    type === 'home'
      ? 'Useful property pages generated from listings, areas, developments, calculators and market data. Not a blog. A decision engine.'
      : 'Practical, data-led guidance designed to help buyers and sellers make better property decisions and enter the Arch9 ecosystem.'

  useEffect(() => {
    setSeoForPage({
      title: `${title} | Arch9`,
      description: subtitle,
      path: type === 'home' ? '/property-intelligence' : `/${type}`,
      jsonLd: isGuides
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              description: subtitle,
            },
            faqJsonLd(calculatorFaqs),
          ]
        : [],
    })
  }, [isGuides, subtitle, title, type])

  return (
    <Shell>
      <Hero title={title} subtitle={subtitle} />
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)] transition hover:-translate-y-1">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">Arch9 Intelligence</p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em]">{link.label}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5B6B64]">Explore generated property intelligence designed for discovery, evaluation, finance and registration.</p>
            </a>
          ))}
        </div>
      </Container>
      {type === 'calculators' ? (
        <Container>
          <CalculatorModules />
        </Container>
      ) : null}
    </Shell>
  )
}

function SchoolsOrAgentsPage({ areaSlug, kind }) {
  const area = findAreaBySlug(areaSlug)
  const amenities = getAreaAmenities(areaSlug).filter((item) => kind === 'schools' ? item.type === 'Schools' : true)

  useEffect(() => {
    if (!area) return
    setSeoForPage({
      title: `${kind === 'schools' ? 'Schools in' : 'Estate agents in'} ${area.name} | Arch9`,
      description: `Explore ${kind === 'schools' ? 'schools and nearby amenities' : 'estate agent coverage and listing activity'} in ${area.name}.`,
      path: `/${kind === 'schools' ? 'schools-in' : 'estate-agents'}/${area.slug}`,
      indexable: isAreaIndexable(area.slug),
    })
  }, [area, kind])

  if (!area) return <NotFoundPage title="Area not found" />

  return (
    <Shell>
      <Hero eyebrow={kind === 'schools' ? 'Schools' : 'Estate Agents'} title={`${kind === 'schools' ? 'Schools in' : 'Estate agents in'} ${area.name}`} subtitle={`Use Arch9 area intelligence to understand ${area.name} before you make your next property decision.`} />
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {amenities.map((item) => (
            <div key={item.id} className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">{item.type}</p>
              <h2 className="mt-4 text-2xl font-extrabold">{kind === 'agents' ? `${area.name} Arch9 Network` : item.name}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5B6B64]">{kind === 'agents' ? 'Listing coverage, valuation demand and viewing workflows routed through the Arch9 ecosystem.' : `${item.distance_km} km from tracked listing activity.`}</p>
            </div>
          ))}
        </div>
      </Container>
    </Shell>
  )
}

function AdminSupportPage() {
  useEffect(() => {
    setSeoForPage({
      title: 'Property Intelligence Admin | Arch9',
      description: 'Admin support surface for generated areas, stats, amenities, SEO pages, Property Pulse metrics and scheduled jobs.',
      path: '/admin/property-intelligence',
      indexable: false,
    })
  }, [])

  return (
    <Shell>
      <Hero eyebrow="Admin Support" title="Property Intelligence admin" subtitle="A future-ready management surface for generated pages, area data, SEO controls, amenities and scheduled intelligence jobs." />
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {propertyIntelligenceAdminSections.map((section) => (
            <div key={section.title} className="rounded-[30px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">Admin</p>
              <h2 className="mt-4 text-2xl font-extrabold">{section.title}</h2>
              <div className="mt-5 grid gap-2">
                {section.capabilities.map((capability) => (
                  <div key={capability} className="rounded-[16px] bg-[#F8F4EC] px-4 py-3 text-sm font-semibold text-[#31433D]">{capability}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Container>
        <div className="rounded-[34px] border border-[#0A3028]/8 bg-[#071E1A] p-8 text-[#F3EEE6]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Automation schedule</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {propertyIntelligenceCronJobs.map((group) => (
              <div key={group.cadence} className="rounded-[24px] bg-white/[0.07] p-5">
                <h2 className="text-xl font-extrabold">{group.cadence}</h2>
                <ul className="mt-4 grid gap-2 text-sm font-semibold text-white/72">
                  {group.jobs.map((job) => <li key={job}>{job}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Shell>
  )
}

function NotFoundPage({ title }) {
  useEffect(() => {
    setSeoForPage({ title: `${title} | Arch9`, description: 'This Arch9 property intelligence page is not available yet.', path: window.location.pathname, indexable: false })
  }, [title])

  return (
    <Shell>
      <Hero title={title} subtitle="This generated page does not have enough useful data yet. It should remain noindex until Arch9 has more listing or market activity for it." />
    </Shell>
  )
}

export default function PropertyIntelligence({ view, areaSlug }) {
  if (view === 'areas') return <AreaDirectory />
  if (view === 'area') return <AreaPage areaSlug={areaSlug} />
  if (view === 'market-reports') return <MarketReports />
  if (view === 'market-report') return <MarketReports areaSlug={areaSlug} />
  if (view === 'property-pulse') return <PropertyPulsePage />
  if (view === 'bond-calculator') return <CalculatorPage calculator="bond" />
  if (view === 'transfer-cost-calculator') return <CalculatorPage calculator="transfer" />
  if (view === 'affordability-calculator') return <CalculatorPage calculator="affordability" />
  if (view === 'property-for-sale') return <SEOListingPage areaSlug={areaSlug} pageType="all" />
  if (view === 'houses-for-sale') return <SEOListingPage areaSlug={areaSlug} pageType="houses" propertyType="House" />
  if (view === 'townhouses-for-sale') return <SEOListingPage areaSlug={areaSlug} pageType="townhouses" propertyType="Townhouse" />
  if (view === 'apartments-for-sale') return <SEOListingPage areaSlug={areaSlug} pageType="apartments" propertyType="Apartment" />
  if (view === 'developments-area') return <SEOListingPage areaSlug={areaSlug} pageType="developments" propertyType="Development" />
  if (view === '3-bedroom-houses') return <SEOListingPage areaSlug={areaSlug} pageType="houses" propertyType="House" bedroomCount={3} />
  if (view === 'townhouses-under-2m') return <SEOListingPage areaSlug={areaSlug} pageType="townhouses" propertyType="Townhouse" priceMax={2000000} />
  if (view === 'property-under-2m') return <SEOListingPage areaSlug={areaSlug} pageType="all" priceMax={2000000} />
  if (view === 'schools') return <SchoolsOrAgentsPage areaSlug={areaSlug} kind="schools" />
  if (view === 'estate-agents') return <SchoolsOrAgentsPage areaSlug={areaSlug} kind="agents" />
  if (view === 'admin') return <AdminSupportPage />
  if (['buyer-guides', 'seller-guides', 'calculators'].includes(view)) return <HubPage type={view} />
  return <HubPage />
}
