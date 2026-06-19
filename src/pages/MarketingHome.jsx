import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  ChevronDown,
  Landmark,
  MapPin,
  Search,
  UserRound,
  Users,
  WalletCards,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/motion/Reveal'
import { buildPropertyQuery } from '../lib/listingFilters'
import { formatPrice, properties } from '../data/properties'

const heroBackground =
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2200&q=80'

const saleTypeOptions = [
  { label: 'For Sale', value: 'for-sale' },
  { label: 'To Rent', value: 'to-rent' },
]

const propertyTypeOptions = ['Any', 'Apartment', 'Estate Home', 'Townhouse', 'Development']
const bedroomOptions = ['Any', '1+', '2+', '3+', '4+']
const bathroomOptions = ['Any', '1+', '2+', '3+']

const popularSearches = ['Cape Town', 'Sandton', 'Umhlanga', 'Fourways', 'Blouberg', 'More']

const roleCards = [
  {
    icon: Users,
    title: 'Buyers',
    copy: 'Search with confidence and move from shortlist to enquiry in one place.',
    href: '/properties',
  },
  {
    icon: UserRound,
    title: 'Sellers',
    copy: 'Bring your listing into a cleaner journey from first enquiry to transfer.',
    href: '/platform/overview#roles',
  },
  {
    icon: Building2,
    title: 'Agents',
    copy: 'Receive qualified enquiries and keep the transaction moving with context.',
    href: '/platform/overview#roles',
  },
  {
    icon: Landmark,
    title: 'Attorneys',
    copy: 'Work with better handovers, clearer files and fewer missing details.',
    href: '/platform/overview#roles',
  },
  {
    icon: WalletCards,
    title: 'Finance',
    copy: 'See where finance sits inside the full transaction from offer to registration.',
    href: '/platform/overview#roles',
  },
]

const platformPreview = [
  'One transaction timeline',
  'Buyer and seller portals',
  'Document requests in motion',
  'Transfer and registration view',
]

function SearchSelect({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-[#7A7265]">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-full appearance-none rounded-[16px] border border-[rgba(6,45,37,0.1)] bg-[#F9F6EF] px-4 pr-10 text-sm font-bold text-[#062D25] outline-none transition focus:border-[#062D25]"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7265]" />
      </div>
    </label>
  )
}

function SearchInput({ label, value, onChange, placeholder, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-[#7A7265]">
        {label}
      </span>
      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7265]" />
        ) : null}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`h-14 w-full rounded-[16px] border border-[rgba(6,45,37,0.1)] bg-[#F9F6EF] px-4 text-sm font-bold text-[#062D25] outline-none transition placeholder:text-[#8A8478] focus:border-[#062D25] ${Icon ? 'pl-11' : ''}`}
        />
      </div>
    </label>
  )
}

function buildQueryUrl(filters) {
  const query = buildPropertyQuery(filters)
  return query ? `/properties?${query}` : '/properties'
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
    setRedirectUrl(buildQueryUrl({ status, ...filters }))
  }

  function runPopularSearch(location) {
    setRedirectUrl(buildQueryUrl({ status, ...filters, location }))
  }

  return (
    <FadeUp className="relative z-10 mx-auto -mb-16 w-[calc(100%-32px)] max-w-[1200px] rounded-[22px] border border-[rgba(6,45,37,0.1)] bg-white p-4 shadow-[0_28px_90px_rgba(3,18,15,0.22)] md:-mb-24 md:w-full md:p-5">
      <div className="flex flex-wrap gap-2">
        {saleTypeOptions.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setStatus(item.value)}
            className={`min-h-11 rounded-full px-5 text-sm font-extrabold transition ${
              status === item.value
                ? 'bg-[#062D25] text-white shadow-[0_12px_24px_rgba(3,18,15,0.18)]'
                : 'bg-[#F7F3EA] text-[#062D25] hover:bg-[#EFE9DD]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form onSubmit={submitSearch} className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_auto]">
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
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[16px] bg-[#062D25] px-6 text-sm font-extrabold text-white shadow-[0_16px_32px_rgba(3,18,15,0.18)] transition hover:scale-[1.02]"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>

      <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
        <span className="shrink-0 text-sm font-bold text-[#7A7265]">Popular searches:</span>
        {popularSearches.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => runPopularSearch(item)}
            className="shrink-0 rounded-full border border-white/12 bg-[rgba(6,45,37,0.86)] px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:border-[rgba(255,255,255,0.22)] hover:bg-[rgba(6,45,37,0.95)]"
          >
            {item}
          </button>
        ))}
      </div>
    </FadeUp>
  )
}

function RolePreviewSection() {
  return (
    <section id="roles" className="bg-[#F7F3EA] py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8">
        <FadeUp className="max-w-[760px]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">One property journey</p>
          <h2 className="mt-4 text-[2.25rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.6rem]">
            Every role. One connected platform.
          </h2>
        </FadeUp>

        <StaggerContainer className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5" stagger={0.08}>
          {roleCards.map((card) => {
            const Icon = card.icon
            return (
              <StaggerItem
                key={card.title}
                className="group rounded-[28px] border border-[rgba(6,45,37,0.08)] bg-white p-6 shadow-[0_18px_54px_rgba(3,18,15,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(3,18,15,0.09)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#062D25] text-white transition duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-[1.35rem] font-extrabold tracking-[-0.04em] text-[#062D25]">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#61584D]">{card.copy}</p>
                <a href={card.href} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0E6A55]">
                  Explore
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

function PlatformCtaSection() {
  const featuredProperty = properties[0]

  return (
    <section id="platform-cta" className="bg-[#F7F3EA] pb-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8">
        <div className="grid gap-6 overflow-hidden rounded-[36px] border border-[rgba(6,45,37,0.08)] bg-white shadow-[0_24px_84px_rgba(3,18,15,0.08)] lg:grid-cols-[1fr_0.92fr]">
          <div className="p-7 md:p-10 xl:p-12">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">Platform</p>
            <h2 className="mt-4 max-w-[620px] text-[2.2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.5rem]">
              The operating system for property transactions
            </h2>
            <p className="mt-5 max-w-[560px] text-base leading-8 text-[#61584D] md:text-lg">
              Arch9 connects people, data and processes so transactions move forward faster.
            </p>
            <a href="/platform/overview" className="bridge-button-primary mt-7 w-full sm:w-fit">
              Explore the Platform
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {platformPreview.map((item) => (
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
                  Live transaction
                </span>
                <span className="text-xs font-bold text-[#86E4C2]">67% complete</span>
              </div>
              <div className="mt-5 rounded-[24px] bg-[#F7F3EA] p-5 text-[#062D25]">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0E6A55]">{featuredProperty.type}</p>
                <h3 className="mt-3 text-[1.8rem] font-extrabold leading-[0.98] tracking-[-0.04em]">{featuredProperty.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[#61584D]">{featuredProperty.location}</p>
                <div className="mt-4 h-2 rounded-full bg-[#D9D2C5]">
                  <div className="h-2 w-[67%] rounded-full bg-[#0E6A55]" />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm font-bold">
                  <span>{formatPrice(featuredProperty.price)}</span>
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
      'Arch9 is the public front door for property search and the connected transaction platform behind the deal.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#062D25]">
      <Header />

      <main>
        <section
          className="relative overflow-hidden text-white"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(3, 22, 18, 0.86) 0%, rgba(3, 22, 18, 0.7) 36%, rgba(3, 22, 18, 0.3) 68%, rgba(3, 22, 18, 0.12) 100%), url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(134,228,194,0.12),transparent_26%),linear-gradient(180deg,rgba(3,22,18,0.06)_0%,rgba(3,22,18,0.12)_100%)]" />
          <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-28 pt-[96px] md:px-8 md:pb-40 md:pt-[132px]">
            <div className="max-w-[780px] pb-10 md:pb-16">
              <FadeUp>
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[#86E4C2]">One property journey</p>
                <h1 className="mt-5 text-[3rem] font-extrabold leading-[1] tracking-[-0.05em] text-white sm:text-[3.8rem] md:text-[5rem] xl:text-[5.7rem]">
                  <span className="block">Find property.</span>
                  <span className="block">Complete the journey.</span>
                </h1>
                <p className="mt-5 max-w-[620px] text-[1.1rem] leading-8 text-white/74 md:text-[1.25rem]">
                  From first search to registration, everything is connected on Arch9.
                </p>
              </FadeUp>
            </div>

            <HeroSearchModule />
          </div>
        </section>

        <RolePreviewSection />
        <PlatformCtaSection />
      </main>

      <Footer />
    </div>
  )
}

export default MarketingHome
