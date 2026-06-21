import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Bath, BedDouble, Bell, CarFront, ChevronDown, Heart, MapPin, Scale, Search, SlidersHorizontal, X } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatListingPrice, properties, propertyTypes } from '../data/properties'
import { readPropertyFilters } from '../lib/listingFilters'
import {
  calculateBond,
  calculateTransferCosts,
  captureAlertSubscription,
  isPropertySaved,
  readComparison,
  toggleComparisonProperty,
  toggleSavedProperty,
  trackListingEvent,
} from '../lib/listingJourney'

const bedroomOptions = ['Any', '1+', '2+', '3+', '4+']
const bathroomOptions = ['Any', '1+', '2+', '3+']
const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Price low to high', value: 'price-asc' },
  { label: 'Price high to low', value: 'price-desc' },
]

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006B4D]">{label}</span>
      {children}
    </label>
  )
}

function SelectField(props) {
  return (
    <div className="relative mt-3">
      <select
        {...props}
        className="h-13 w-full appearance-none rounded-[18px] border border-[#0A3028]/10 bg-white px-4 pr-10 text-sm font-bold text-[#05120F] outline-none transition focus:border-[#006B4D]"
      />
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B5B55]" />
    </div>
  )
}

function InputField(props) {
  return (
    <input
      {...props}
      className="mt-3 h-13 w-full rounded-[18px] border border-[#0A3028]/10 bg-white px-4 text-sm font-bold text-[#05120F] outline-none transition placeholder:text-[#8A978F] focus:border-[#006B4D]"
    />
  )
}

function PropertyCard({ property, isSaved, isCompared, onSave, onCompare }) {
  const repayment = calculateBond({ purchasePrice: property.price }).monthlyRepayment

  return (
    <article className="group overflow-hidden rounded-[34px] border border-[#0A3028]/8 bg-white shadow-[0_22px_70px_rgba(5,8,7,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[#0A3028]/18 hover:shadow-[0_30px_90px_rgba(5,8,7,0.12)]">
      <div
        className="relative flex h-64 items-end overflow-hidden p-5"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.05) 0%, rgba(5,18,15,0.68) 100%), url(${property.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/24 backdrop-blur-md transition ${isSaved ? 'bg-[#F3EEE6] text-[#006B4D]' : 'bg-white/14 text-white hover:bg-white/24'}`}
            onClick={() => onSave(property)}
            aria-label={isSaved ? 'Remove saved property' : 'Save property'}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/24 backdrop-blur-md transition ${isCompared ? 'bg-[#86E4C2] text-[#05120F]' : 'bg-white/14 text-white hover:bg-white/24'}`}
            onClick={() => onCompare(property)}
            aria-label={isCompared ? 'Remove from comparison' : 'Compare property'}
          >
            <Scale className="h-4 w-4" />
          </button>
        </div>
        <div className="relative rounded-full border border-white/20 bg-white/14 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {property.status}
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#006B4D]">{property.type}</p>
        <a href={`/property/${property.slug}`} className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#05120F]">{property.title}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#4B5B55]">
              <MapPin className="h-4 w-4" />
              {property.location}
            </p>
          </div>
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[#006B4D] transition group-hover:translate-x-1" />
        </a>
        <p className="mt-5 text-2xl font-extrabold text-[#05120F]">{formatListingPrice(property)}</p>
        {property.listingType === 'for-sale' ? (
          <p className="mt-2 text-sm font-bold text-[#006B4D]">Estimated repayment {formatListingPrice({ price: repayment, priceLabel: ' / month' })}</p>
        ) : null}
        <p className="mt-3 text-sm leading-6 text-[#4B5B55]">{property.summary}</p>

        <div className="mt-6 grid grid-cols-4 gap-3 border-t border-[#0A3028]/8 pt-5 text-sm font-bold text-[#31433D]">
          <span className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-[#006B4D]" />
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-[#006B4D]" />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-2">
            <CarFront className="h-4 w-4 text-[#006B4D]" />
            {property.parking}
          </span>
          <span className="text-right">{property.size}</span>
        </div>
      </div>
    </article>
  )
}

function ComparisonTray({ comparison, onRemove }) {
  if (comparison.length === 0) return null

  return (
    <div className="mt-8 overflow-hidden rounded-[30px] border border-[#0A3028]/10 bg-[#071E1A] text-[#F3EEE6] shadow-[0_24px_80px_rgba(5,8,7,0.14)]">
      <div className="flex flex-col gap-3 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Property comparison</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">Compare up to 4 properties</h2>
        </div>
        <p className="text-sm font-semibold text-[#F3EEE6]/70">{comparison.length} selected</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-[#86E4C2]">
            <tr>
              {['Property', 'Price', 'Beds', 'Baths', 'Parking', 'Area', 'Repayment', 'Transfer Costs', 'Agent'].map((heading) => (
                <th key={heading} className="px-5 py-4 font-black">{heading}</th>
              ))}
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {comparison.map((property) => {
              const repayment = calculateBond({ purchasePrice: property.price }).monthlyRepayment
              const transfer = calculateTransferCosts({ purchasePrice: property.price, bondAmount: property.price * 0.9 }).totalCashRequired
              return (
                <tr key={property.slug} className="border-t border-white/10 text-[#F3EEE6]/82">
                  <td className="px-5 py-4 font-extrabold text-white">{property.title}</td>
                  <td className="px-5 py-4">{formatListingPrice(property)}</td>
                  <td className="px-5 py-4">{property.bedrooms}</td>
                  <td className="px-5 py-4">{property.bathrooms}</td>
                  <td className="px-5 py-4">{property.parking}</td>
                  <td className="px-5 py-4">{property.size}</td>
                  <td className="px-5 py-4">{formatListingPrice({ price: repayment })}</td>
                  <td className="px-5 py-4">{formatListingPrice({ price: transfer })}</td>
                  <td className="px-5 py-4">{property.agent}</td>
                  <td className="px-5 py-4">
                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white" onClick={() => onRemove(property)}>
                      <X className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Properties() {
  const [filters, setFilters] = useState(() => readPropertyFilters())
  const [savedSlugs, setSavedSlugs] = useState(() => properties.filter((property) => isPropertySaved(property.slug)).map((property) => property.slug))
  const [comparison, setComparison] = useState(() => readComparison())
  const [alertCreated, setAlertCreated] = useState(false)

  useEffect(() => {
    document.title = 'Find Your Next Property | Arch9'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Browse homes, developments, and property opportunities across South Africa with Arch9.'
    )
    trackListingEvent({ eventType: 'Property Search Viewed', payload: filters })
  }, [filters])

  const filteredProperties = useMemo(() => {
    const minimumBedrooms = filters.bedrooms === 'Any' ? 0 : Number.parseInt(filters.bedrooms, 10)
    const minimumBathrooms = filters.bathrooms === 'Any' ? 0 : Number.parseInt(filters.bathrooms, 10)
    const minPrice = filters.minPrice ? Number(filters.minPrice) : 0
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Number.POSITIVE_INFINITY

    return properties
      .filter((property) => {
        const matchesLocation = `${property.location} ${property.title}`.toLowerCase().includes(filters.location.toLowerCase())
        const matchesType = filters.type === 'Any' || property.type === filters.type
        const matchesStatus = !filters.status || property.listingType === filters.status
        return (
          matchesLocation &&
          matchesType &&
          matchesStatus &&
          property.price >= minPrice &&
          property.price <= maxPrice &&
          property.bedrooms >= minimumBedrooms &&
          property.bathrooms >= minimumBathrooms
        )
      })
      .sort((a, b) => {
        if (filters.sort === 'price-asc') return a.price - b.price
        if (filters.sort === 'price-desc') return b.price - a.price
        return 0
      })
  }, [filters])

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function handleSave(property) {
    const isSaved = toggleSavedProperty(property)
    setSavedSlugs((current) => (isSaved ? [...current, property.slug] : current.filter((slug) => slug !== property.slug)))
  }

  function handleCompare(property) {
    setComparison(toggleComparisonProperty(property))
  }

  function handleAlert() {
    captureAlertSubscription(filters)
    setAlertCreated(true)
  }

  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />

      <main className="bg-[#F8F4EC] pt-[112px]">
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-14 pt-8 md:px-8 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Buy through the Arch9 network</p>
              <h1 className="mt-5 max-w-[720px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem] xl:text-[6rem]">
                Find your next property
              </h1>
              <a href="#property-search" className="bridge-button-primary mt-8">
                Start browsing
              </a>
            </div>
            <p className="max-w-[560px] text-lg font-medium leading-8 text-[#31433D] lg:justify-self-end">
              Browse homes, developments, and opportunities across South Africa.
            </p>
          </div>

          <div id="property-search" className="mt-10 rounded-[34px] border border-[#0A3028]/8 bg-white/86 p-5 shadow-[0_24px_80px_rgba(5,8,7,0.08)] backdrop-blur-xl md:p-6">
            <div className="flex items-center gap-3 border-b border-[#0A3028]/8 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#071E1A] text-[#F3EEE6]">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#05120F]">Property search</h2>
                <p className="text-sm text-[#5B6B64]">{filteredProperties.length} properties available</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              <Field label="Location">
                <InputField placeholder="Area, estate or city" value={filters.location} onChange={(event) => updateFilter('location', event.target.value)} />
              </Field>
              <Field label="Property type">
                <SelectField value={filters.type} onChange={(event) => updateFilter('type', event.target.value)}>
                  <option>Any</option>
                  {propertyTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </SelectField>
              </Field>
              <Field label="Min price">
                <InputField type="number" min="0" placeholder="No min" value={filters.minPrice} onChange={(event) => updateFilter('minPrice', event.target.value)} />
              </Field>
              <Field label="Max price">
                <InputField type="number" min="0" placeholder="No max" value={filters.maxPrice} onChange={(event) => updateFilter('maxPrice', event.target.value)} />
              </Field>
              <Field label="Bedrooms">
                <SelectField value={filters.bedrooms} onChange={(event) => updateFilter('bedrooms', event.target.value)}>
                  {bedroomOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </SelectField>
              </Field>
              <Field label="Bathrooms">
                <SelectField value={filters.bathrooms} onChange={(event) => updateFilter('bathrooms', event.target.value)}>
                  {bathroomOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </SelectField>
              </Field>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071E1A] px-5 text-sm font-extrabold text-[#F3EEE6]">
                <Search className="h-4 w-4" />
                Search Properties
              </button>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0A3028]/10 bg-[#F8F4EC] px-5 text-sm font-extrabold text-[#071E1A] transition hover:border-[#006B4D]/30 hover:text-[#006B4D]"
                onClick={handleAlert}
              >
                <Bell className="h-4 w-4" />
                {alertCreated ? 'Alert Created' : 'Create Alert'}
              </button>
              <label className="flex items-center gap-3 text-sm font-bold text-[#31433D]">
                Sort
                <SelectField value={filters.sort} onChange={(event) => updateFilter('sort', event.target.value)}>
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
              </label>
            </div>
          </div>

          <ComparisonTray comparison={comparison} onRemove={handleCompare} />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.slug}
                property={property}
                isSaved={savedSlugs.includes(property.slug)}
                isCompared={comparison.some((item) => item.slug === property.slug)}
                onSave={handleSave}
                onCompare={handleCompare}
              />
            ))}
          </div>

          {filteredProperties.length === 0 ? (
            <div className="mt-8 rounded-[30px] border border-[#0A3028]/8 bg-white p-8 text-center shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
              <h2 className="text-2xl font-extrabold text-[#05120F]">No properties match those filters yet.</h2>
              <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-[#4B5B55]">
                Try widening the area, price range or bedroom count. New Arch9 network listings will appear here as they are published.
              </p>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  )
}
