import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  ChevronDown,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  CarFront,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/motion/Reveal'
import { buildPropertyQuery } from '../lib/listingFilters'
import { developments, formatDevelopmentPrice } from '../data/developments'
import { formatListingPrice, properties } from '../data/properties'

const heroBackground =
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=80'

const saleTypeOptions = [
  { label: 'For Sale', value: 'for-sale' },
  { label: 'To Rent', value: 'to-rent' },
]

const propertyTypeOptions = ['Any', 'Apartment', 'Estate Home', 'Townhouse', 'Development']
const bedroomOptions = ['Any', '1+', '2+', '3+', '4+']
const bathroomOptions = ['Any', '1+', '2+', '3+']

const featurePillars = [
  {
    icon: Search,
    title: 'Search Seamlessly',
    copy: 'Find property with powerful search, clean filters and a premium browsing experience.',
  },
  {
    icon: Users,
    title: 'Stay Connected',
    copy: 'Track enquiries and keep buyers, sellers and professionals aligned from the first view.',
  },
  {
    icon: Building2,
    title: 'One Platform',
    copy: 'Buyers, sellers, agents, attorneys and finance teams operate from one shared system.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Compliant',
    copy: 'Protected handovers, cleaner files and visibility at every step of the journey.',
  },
  {
    icon: Sparkles,
    title: 'From Offer to Registration',
    copy: 'Arch9 continues long after the search, guiding the transaction to the finish line.',
  },
]

function SearchSelect({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#05120F]/60">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-full appearance-none rounded-[14px] border border-black/[0.08] bg-white px-4 pr-10 text-sm font-semibold text-[#062D25] outline-none transition duration-200 focus:border-[#006B4D] focus:shadow-[0_0_0_4px_rgba(0,100,70,0.08)]"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#05120F]/45" />
      </div>
    </label>
  )
}

function SearchInput({ label, value, onChange, placeholder, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#05120F]/60">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#05120F]/45" /> : null}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`h-14 w-full rounded-[14px] border border-black/[0.08] bg-white px-4 text-sm font-semibold text-[#062D25] outline-none transition duration-200 placeholder:text-[#05120F]/42 focus:border-[#006B4D] focus:shadow-[0_0_0_4px_rgba(0,100,70,0.08)] ${
            Icon ? 'pl-11' : ''
          }`}
        />
      </div>
    </label>
  )
}

function HeroSearchModule() {
  const [status, setStatus] = useState('for-sale')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    type: 'Any',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Any',
    bathrooms: 'Any',
  })

  useEffect(() => {
    if (redirectUrl) {
      window.location.assign(redirectUrl)
    }
  }, [redirectUrl])

  function updateField(key, value) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function submitSearch(event) {
    event.preventDefault()
    const query = buildPropertyQuery({ status, ...filters })
    setRedirectUrl(query ? `/buy?${query}` : '/buy')
  }

  return (
    <FadeUp className="relative z-10 mx-auto w-full max-w-[1320px]">
      <div className="ml-3 flex w-fit overflow-hidden rounded-t-[18px] border border-b-0 border-white/18 bg-white shadow-[0_18px_50px_rgba(3,18,15,0.18)] md:ml-4">
        {saleTypeOptions.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setStatus(item.value)}
            className={`min-h-13 px-6 text-sm font-extrabold transition md:px-8 ${
              status === item.value
                ? 'bg-[#062D25] text-white shadow-[0_12px_24px_rgba(3,18,15,0.18)]'
                : 'bg-[#F7F3EA] text-[#062D25] hover:bg-[#EFE9DD]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="min-h-[250px] rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-8 xl:p-10">
        <form onSubmit={submitSearch}>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <SearchInput
              label="Location"
              value={filters.location}
              onChange={(value) => updateField('location', value)}
              placeholder="Enter suburb or area"
              icon={MapPin}
            />
            <SearchSelect label="Property Type" value={filters.type} onChange={(value) => updateField('type', value)}>
              {propertyTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SearchSelect>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_220px]">
            <SearchInput
              label="Min Price"
              value={filters.minPrice}
              onChange={(value) => updateField('minPrice', value)}
              placeholder="No Min"
            />
            <SearchInput
              label="Max Price"
              value={filters.maxPrice}
              onChange={(value) => updateField('maxPrice', value)}
              placeholder="No Max"
            />
            <SearchSelect label="Bedrooms" value={filters.bedrooms} onChange={(value) => updateField('bedrooms', value)}>
              {bedroomOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SearchSelect>
            <SearchSelect label="Bathrooms" value={filters.bathrooms} onChange={(value) => updateField('bathrooms', value)}>
              {bathroomOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SearchSelect>
            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center gap-2 self-end rounded-[16px] bg-[#006B4D] px-6 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(0,107,77,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#005A40] focus:outline-none focus:ring-4 focus:ring-[#006B4D]/15"
            >
              <Search className="h-4 w-4" />
              Search Properties
            </button>
          </div>
        </form>

        <p className="mt-5 text-sm font-semibold text-[#05120F]/55">Browse 128,457 properties across South Africa</p>
      </div>
    </FadeUp>
  )
}

function DevelopmentRailSection() {
  const railDevelopments = developments.slice(0, 2)

  return (
    <section id="developments" className="bg-[#F7F3EA] pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <FadeUp className="max-w-[520px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">New developments</p>
            <h2 className="mt-4 text-[2.25rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.6rem]">
              Discover the latest developments.
            </h2>
            <p className="mt-5 max-w-[420px] text-base leading-8 text-[#61584D] md:text-lg">
              Explore South Africa&apos;s newest estates, apartments and investment opportunities.
            </p>
            <a href="/developments" className="bridge-button-primary mt-7 w-full sm:w-fit">
              View all developments
              <ArrowRight className="h-4 w-4" />
            </a>
          </FadeUp>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:overflow-visible">
            {railDevelopments.map((development) => (
              <a
                key={development.slug}
                href={`/developments/${development.slug}`}
                className="group relative min-w-[78%] snap-start overflow-hidden rounded-[30px] border border-[rgba(6,45,37,0.08)] bg-[#071E1A] shadow-[0_18px_54px_rgba(3,18,15,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(3,18,15,0.16)] sm:min-w-[56%] lg:min-w-0 lg:flex-1"
              >
                <div
                  className="relative flex h-[340px] items-end p-5"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.06) 0%, rgba(5,18,15,0.72) 100%), url(${development.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute left-5 top-5 rounded-full border border-white/18 bg-white/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                    {development.status}
                  </div>
                  <div className="relative w-full rounded-[24px] border border-white/12 bg-[rgba(7,30,26,0.7)] p-5 text-white backdrop-blur-xl">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#86E4C2]">{development.stage}</p>
                    <h3 className="mt-2 text-[1.6rem] font-extrabold leading-[1] tracking-[-0.04em]">
                      {development.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/75">{development.area}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-sm font-bold">{formatDevelopmentPrice(development)}</span>
                      <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#86E4C2]">
                        {development.availableUnits} units
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PropertyCard({ property }) {
  const price = formatListingPrice(property)

  return (
    <a
      href={`/property/${property.slug}`}
      className="group overflow-hidden rounded-[30px] border border-[rgba(6,45,37,0.08)] bg-white shadow-[0_22px_70px_rgba(3,18,15,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[rgba(6,45,37,0.16)] hover:shadow-[0_30px_90px_rgba(3,18,15,0.12)]"
    >
      <div
        className="relative flex h-56 items-end overflow-hidden p-4"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.05) 0%, rgba(5,18,15,0.68) 100%), url(${property.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
          {property.listingType === 'to-rent' ? 'To rent' : 'For sale'}
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/20 text-white backdrop-blur-md"
          aria-label={`Save ${property.title}`}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#006B4D]">{property.type}</p>
        <h3 className="mt-3 text-[1.35rem] font-extrabold tracking-[-0.04em] text-[#05120F]">{property.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#4B5B55]">
          <MapPin className="h-4 w-4" />
          {property.location}
        </p>
        <p className="mt-4 text-2xl font-extrabold text-[#05120F]">{price}</p>
        <div className="mt-5 grid grid-cols-4 gap-3 border-t border-[rgba(6,45,37,0.08)] pt-4 text-sm font-bold text-[#31433D]">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-[#006B4D]" />
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-[#006B4D]" />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <CarFront className="h-4 w-4 text-[#006B4D]" />
            {property.parking}
          </span>
          <span className="text-right">{property.size}</span>
        </div>
      </div>
    </a>
  )
}

function FeaturedPropertiesSection() {
  const featuredProperties = useMemo(
    () => properties.filter((property) => property.listingType !== 'development'),
    []
  )

  return (
    <section id="featured-properties" className="bg-[#F7F3EA] py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">Featured properties</p>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.2rem]">
              Handpicked properties for you.
            </h2>
          </div>
          <a href="/buy" className="hidden text-sm font-extrabold text-[#0E6A55] md:inline-flex">
            View all properties
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 xl:grid-cols-4 md:overflow-visible">
          {featuredProperties.map((property) => (
            <div key={property.slug} className="min-w-[84%] snap-start md:min-w-0">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <a href="/buy" className="mt-7 inline-flex text-sm font-extrabold text-[#0E6A55] md:hidden">
          View all properties
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

function WhyArch9Section() {
  return (
    <section id="why-arch9" className="bg-[#F2EDE3] py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8">
        <FadeUp className="mx-auto max-w-[820px] text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">Why Arch9</p>
          <h2 className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.6rem]">
            More than a property portal.
          </h2>
          <p className="mt-4 text-base leading-8 text-[#61584D] md:text-lg">
            We connect people, data and processes so every transaction moves forward faster.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5" stagger={0.08}>
          {featurePillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <StaggerItem
                key={pillar.title}
                className="group rounded-[28px] border border-[rgba(6,45,37,0.08)] bg-white p-6 shadow-[0_18px_54px_rgba(3,18,15,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(3,18,15,0.09)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#062D25] text-white transition duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-[1.2rem] font-extrabold tracking-[-0.04em] text-[#062D25]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#61584D]">{pillar.copy}</p>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

function PlatformPreviewSection() {
  const previewProperty = properties[0]

  return (
    <section id="platform-preview" className="bg-[#F7F3EA] pb-20 pt-4 md:pb-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8">
        <div className="grid gap-6 overflow-hidden rounded-[36px] border border-[rgba(6,45,37,0.08)] bg-white shadow-[0_24px_84px_rgba(3,18,15,0.08)] lg:grid-cols-[1fr_0.95fr]">
          <div className="p-7 md:p-10 xl:p-12">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">Platform</p>
            <h2 className="mt-4 max-w-[620px] text-[2.2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.5rem]">
              The operating system for property transactions.
            </h2>
            <p className="mt-5 max-w-[560px] text-base leading-8 text-[#61584D] md:text-lg">
              Arch9 connects every stakeholder from mandate to registration.
            </p>
            <a href="/platform" className="bridge-button-primary mt-7 w-full sm:w-fit">
              Explore Platform
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['One transaction timeline', 'Buyer and seller portals', 'Document requests in motion', 'Transfer and registration view'].map((item) => (
                <div key={item} className="rounded-[22px] border border-[rgba(6,45,37,0.08)] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#062D25]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[rgba(6,45,37,0.08)] bg-[#062D25] p-6 text-white lg:border-l lg:border-t-0 md:p-8">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)]">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/88">
                  Transaction
                </span>
                <span className="text-xs font-bold text-[#86E4C2]">67% complete</span>
              </div>
              <div className="mt-5 rounded-[24px] bg-[#F7F3EA] p-5 text-[#062D25]">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0E6A55]">{previewProperty.type}</p>
                <h3 className="mt-3 text-[1.8rem] font-extrabold leading-[0.98] tracking-[-0.04em]">{previewProperty.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[#61584D]">{previewProperty.location}</p>
                <div className="mt-4 h-2 rounded-full bg-[#D9D2C5]">
                  <div className="h-2 w-[67%] rounded-full bg-[#0E6A55]" />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm font-bold">
                  <span>{formatListingPrice(previewProperty)}</span>
                  <span>5 parties connected</span>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {['Agent connected', 'Buyer connected', 'Seller connected', 'Attorney connected'].map((item) => (
                  <div key={item} className="rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold text-white/88">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MarketingHome() {
  useEffect(() => {
    document.title = 'Arch9 | Find property. Complete the journey.'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Arch9 is the public front door for property search, developments and the connected transaction platform behind the deal.'
    )
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#062D25]">
      <Header />

      <main>
        <section
          className="relative overflow-visible text-white"
          style={{
            minHeight: '680px',
            backgroundImage: `linear-gradient(90deg, rgba(3, 22, 18, 0.82) 0%, rgba(3, 22, 18, 0.7) 36%, rgba(3, 22, 18, 0.28) 68%, rgba(3, 22, 18, 0.12) 100%), url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(134,228,194,0.12),transparent_26%),linear-gradient(180deg,rgba(3,22,18,0.08)_0%,rgba(3,22,18,0.18)_100%)]" />
          <div className="relative mx-auto flex min-h-[680px] w-full max-w-[1440px] flex-col justify-between px-6 pb-0 pt-[96px] md:min-h-[760px] md:px-8 md:pt-[132px]">
            <div className="max-w-[780px] pb-8 md:pb-10">
              <FadeUp>
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[#86E4C2]">One property journey</p>
                <h1 className="mt-5 text-[3rem] font-extrabold leading-[1] tracking-[-0.05em] text-white sm:text-[3.8rem] md:text-[5rem] xl:text-[5.7rem]">
                  <span className="block">Find property.</span>
                  <span className="block">Complete the journey.</span>
                </h1>
                <p className="mt-5 max-w-[620px] text-[1.05rem] leading-8 text-white/78 md:text-[1.2rem]">
                  From first search to registration, everything is connected on Arch9.
                </p>
              </FadeUp>
            </div>

            <div className="translate-y-16 md:translate-y-20">
              <HeroSearchModule />
            </div>
          </div>
        </section>

        <DevelopmentRailSection />

        <FeaturedPropertiesSection />

        <WhyArch9Section />

        <PlatformPreviewSection />
      </main>

      <Footer />
    </div>
  )
}

export default MarketingHome
