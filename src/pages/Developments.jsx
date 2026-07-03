import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  FileCheck2,
  Heart,
  Home,
  Landmark,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { developments, formatDevelopmentPrice } from '../data/developments'
import { setPageSeo } from '../lib/seo'

const heroImage =
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1800&q=86'

const locationCards = [
  {
    label: 'Cape Town',
    count: '24 developments',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Johannesburg',
    count: '48 developments',
    image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Pretoria',
    count: '18 developments',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Durban',
    count: '16 developments',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Ballito',
    count: '12 developments',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Umhlanga',
    count: '14 developments',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
  },
]

const developerBrands = ['Balwin Properties', 'Calgro M3', 'Century Property Developments', 'Growthpoint Properties', 'Renico Construction', 'Devco Group']
const priceOptions = ['Any Price', 'Under R1.5m', 'R1.5m - R2.5m', 'R2.5m - R4m', 'R4m+']
const bedroomOptions = ['Any', '1+ Beds', '2+ Beds', '3+ Beds', '4+ Beds']
const statusOptions = ['All', 'Now Selling', 'Launching Soon', 'New Release', 'Sold Out']
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price Low to High', value: 'price-asc' },
  { label: 'Price High to Low', value: 'price-desc' },
  { label: 'Most Units', value: 'units-desc' },
  { label: 'Completion Date', value: 'completion' },
]

const statusStyles = {
  'Now Selling': 'bg-[#064537] text-white',
  'Launching Soon': 'bg-[#A07116] text-white',
  'New Release': 'bg-[#1C6B88] text-white',
  'Sold Out': 'bg-[#6A716A] text-white',
}

const arch9Benefits = [
  {
    icon: Landmark,
    title: 'Track your purchase',
    copy: 'Follow every stage of your transaction in real time.',
  },
  {
    icon: ShieldCheck,
    title: 'Apply for finance',
    copy: 'Secure your bond through trusted lending partners.',
  },
  {
    icon: Bell,
    title: 'Receive updates',
    copy: 'Stay informed with live transaction updates.',
  },
  {
    icon: FileCheck2,
    title: 'Manage documents',
    copy: 'Store and share documents securely.',
  },
]

function SelectField({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.2em] text-[#05120F]/62">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-[14px] border border-black/[0.08] bg-white px-4 pr-10 text-sm font-semibold text-[#071E1A] outline-none transition focus:border-[#006B4D] focus:shadow-[0_0_0_4px_rgba(0,100,70,0.08)] md:h-13"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#05120F]/50" />
      </div>
    </label>
  )
}

function SearchInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.2em] text-[#05120F]/62">{label}</span>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#05120F]/42" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter suburb, city or area"
          className="h-12 w-full rounded-[14px] border border-black/[0.08] bg-white px-4 pl-11 text-sm font-semibold text-[#071E1A] outline-none transition placeholder:text-[#05120F]/38 focus:border-[#006B4D] focus:shadow-[0_0_0_4px_rgba(0,100,70,0.08)] md:h-13"
        />
      </div>
    </label>
  )
}

function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${statusStyles[status] || statusStyles['Now Selling']}`}>
      {status}
    </span>
  )
}

function DeveloperLogo({ developer, onClick }) {
  const compactName = developer.replace(' Properties', '').replace(' Construction', '')
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[92px] items-center justify-center rounded-[10px] border border-[#0A3028]/10 bg-white/76 px-5 text-center shadow-[0_14px_42px_rgba(5,8,7,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-[#006B4D]/22 hover:bg-white hover:shadow-[0_18px_54px_rgba(5,8,7,0.08)]"
    >
      <span className="max-w-[180px] text-[1.35rem] font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#071E1A] transition group-hover:text-[#006B4D]">
        {compactName}
      </span>
    </button>
  )
}

function FeaturedDevelopmentCard({ development }) {
  return (
    <a
      href={`/developments/${development.slug}`}
      className="group min-w-[86%] overflow-hidden rounded-[18px] border border-[#0A3028]/10 bg-white shadow-[0_18px_58px_rgba(5,8,7,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_74px_rgba(5,8,7,0.12)] sm:min-w-[54%] lg:min-w-[31%] xl:min-w-[24%]"
    >
      <div
        className="relative h-[245px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.08) 0%, rgba(5,18,15,0.24) 100%), url(${development.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute left-4 top-4">
          <StatusBadge status={development.status} />
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/36 bg-black/16 text-white backdrop-blur-md transition hover:bg-black/28"
          aria-label={`Save ${development.title}`}
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-extrabold tracking-[-0.04em] text-[#071E1A]">{development.title}</h3>
        <p className="mt-1.5 text-sm font-semibold text-[#5B6B64]">{development.area}</p>
        <div className="mt-5 grid grid-cols-3 gap-3 text-xs font-bold text-[#31433D]">
          <span>
            <span className="block text-[#6A716A]">From</span>
            {formatDevelopmentPrice(development).replace('From ', '')}
          </span>
          <span>
            <span className="block text-[#6A716A]">Units</span>
            {development.availableUnits}
          </span>
          <span>
            <span className="block text-[#6A716A]">Completion</span>
            {development.completion}
          </span>
        </div>
        <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#006B4D]">
          View development
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  )
}

function DevelopmentCard({ development }) {
  return (
    <a
      href={`/developments/${development.slug}`}
      className="group flex min-h-[520px] flex-col overflow-hidden rounded-[18px] border border-[#0A3028]/10 bg-white shadow-[0_18px_54px_rgba(5,8,7,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-[#006B4D]/18 hover:shadow-[0_26px_74px_rgba(5,8,7,0.1)]"
    >
      <div
        className="relative h-[240px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.04) 0%, rgba(5,18,15,0.22) 100%), url(${development.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute left-4 top-4">
          <StatusBadge status={development.status} />
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/36 bg-black/14 text-white backdrop-blur-md transition hover:bg-black/28"
          aria-label={`Save ${development.title}`}
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{development.title}</h3>
        <p className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-[#5B6B64]">
          <MapPin className="h-4 w-4 text-[#006B4D]" />
          {development.area}
        </p>
        <p className="mt-5 text-lg font-extrabold text-[#071E1A]">{formatDevelopmentPrice(development)}</p>

        <div className="mt-5 grid gap-3 text-sm font-semibold text-[#4B5B55]">
          <span className="flex items-center gap-2">
            <Home className="h-4 w-4 text-[#006B4D]" />
            {development.bedrooms}
          </span>
          <span className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#006B4D]" />
            {development.availableUnits} units
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#006B4D]" />
            {development.completion}
          </span>
        </div>

        <div className="mt-auto border-t border-[#0A3028]/8 pt-5">
          <span className="inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#006B4D]">
            View Development
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  )
}

function matchesPriceRange(development, priceRange) {
  if (priceRange === 'Any Price') return true
  if (priceRange === 'Under R1.5m') return development.startingPrice < 1500000
  if (priceRange === 'R1.5m - R2.5m') return development.startingPrice >= 1500000 && development.startingPrice <= 2500000
  if (priceRange === 'R2.5m - R4m') return development.startingPrice > 2500000 && development.startingPrice <= 4000000
  return development.startingPrice > 4000000
}

function matchesBedrooms(development, bedroomFilter) {
  if (bedroomFilter === 'Any') return true
  const requested = Number.parseInt(bedroomFilter, 10)
  const values = development.bedrooms.match(/\d+/g)?.map(Number) || []

  if (values.length >= 2) {
    return requested >= values[0] && requested <= values[1]
  }

  return values.includes(requested)
}

function sortDevelopments(items, sort) {
  return [...items].sort((a, b) => {
    if (sort === 'price-asc') return a.startingPrice - b.startingPrice
    if (sort === 'price-desc') return b.startingPrice - a.startingPrice
    if (sort === 'units-desc') return b.availableUnits - a.availableUnits
    if (sort === 'completion') return a.completion.localeCompare(b.completion)
    return developments.indexOf(a) - developments.indexOf(b)
  })
}

export default function Developments() {
  const [filters, setFilters] = useState({
    location: '',
    price: 'Any Price',
    bedrooms: 'Any',
    status: 'All',
    developer: 'All Developers',
    sort: 'newest',
  })

  useEffect(() => {
    setPageSeo({
      title: 'Discover New Developments | Arch9',
      description: 'Browse apartments, estates and investment opportunities from leading developers across South Africa.',
      canonicalPath: '/solutions/developers',
      indexable: false,
    })
  }, [])

  const filteredDevelopments = useMemo(() => {
    const query = filters.location.trim().toLowerCase()
    const filtered = developments.filter((development) => {
      const matchesLocation =
        !query ||
        development.area.toLowerCase().includes(query) ||
        development.city.toLowerCase().includes(query) ||
        development.title.toLowerCase().includes(query)
      const matchesStatus = filters.status === 'All' || development.status === filters.status
      const matchesDeveloper = filters.developer === 'All Developers' || development.developer === filters.developer
      return matchesLocation && matchesStatus && matchesDeveloper && matchesPriceRange(development, filters.price) && matchesBedrooms(development, filters.bedrooms)
    })

    return sortDevelopments(filtered, filters.sort)
  }, [filters])

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function handleSearch(event) {
    event.preventDefault()
    document.querySelector('#all-developments')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function applyLocation(location) {
    setFilters((current) => ({ ...current, location }))
    document.querySelector('#all-developments')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function applyDeveloper(developer) {
    setFilters((current) => ({ ...current, developer }))
    document.querySelector('#all-developments')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#05120F]">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#F8F4EC] px-6 pb-10 pt-[112px] md:px-8 lg:min-h-[640px] lg:pb-14">
          <div className="absolute inset-y-0 right-0 hidden w-[52%] bg-cover bg-center lg:block" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="absolute inset-y-0 right-[36%] hidden w-[25%] bg-[linear-gradient(90deg,#F8F4EC_0%,rgba(248,244,236,0.94)_42%,rgba(248,244,236,0)_100%)] lg:block" />
          <div className="absolute inset-y-0 right-0 hidden w-[52%] bg-[linear-gradient(90deg,rgba(248,244,236,0.34)_0%,rgba(248,244,236,0.06)_34%,rgba(248,244,236,0)_100%)] lg:block" />
          <div className="absolute inset-x-0 bottom-0 hidden h-32 bg-[linear-gradient(180deg,rgba(248,244,236,0)_0%,#F8F4EC_100%)] lg:block" />

          <div className="relative mx-auto w-full max-w-[1440px]">
            <div className="max-w-[690px] py-8 md:py-12 lg:py-14">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Developments</p>
              <h1 className="mt-4 max-w-[760px] text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#063B31] md:text-[4.4rem]">
                Discover South Africa&apos;s newest developments.
              </h1>
              <p className="mt-5 max-w-[560px] text-base font-medium leading-8 text-[#31433D] md:text-lg">
                Browse apartments, estates and investment opportunities from leading developers across South Africa.
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="grid gap-4 rounded-[22px] border border-black/[0.06] bg-white p-5 shadow-[0_24px_70px_rgba(5,8,7,0.1)] md:p-6 lg:grid-cols-[1.45fr_0.74fr_0.74fr_0.74fr_auto] lg:items-end lg:gap-5"
            >
              <SearchInput label="Location" value={filters.location} onChange={(value) => updateFilter('location', value)} />
              <SelectField label="Price Range" value={filters.price} onChange={(value) => updateFilter('price', value)}>
                {priceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </SelectField>
              <SelectField label="Bedrooms" value={filters.bedrooms} onChange={(value) => updateFilter('bedrooms', value)}>
                {bedroomOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </SelectField>
              <SelectField label="Status" value={filters.status} onChange={(value) => updateFilter('status', value)}>
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </SelectField>
              <button
                type="submit"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-[#064537] px-6 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(0,107,77,0.2)] transition hover:-translate-y-0.5 hover:bg-[#053A2F] lg:mt-0 lg:w-[240px] md:h-13"
              >
                <Search className="h-4 w-4" />
                Search Developments
              </button>
            </form>

            <div className="mt-7 grid max-w-[680px] gap-4 sm:grid-cols-3">
              {[
                { icon: Building2, value: '147', label: 'Developments' },
                { icon: Home, value: '4,300+', label: 'Available Units' },
                { icon: MapPin, value: '12', label: 'Cities' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex items-center gap-4 rounded-[18px] border border-black/[0.04] bg-white/48 p-3 backdrop-blur-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/88 text-[#064537] shadow-[0_12px_32px_rgba(5,8,7,0.06)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold leading-none text-[#071E1A]">{stat.value}</p>
                      <p className="mt-1 text-sm font-semibold text-[#31433D]">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-8 md:px-8 md:py-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">Featured developments</h2>
              <a href="#all-developments" className="hidden min-h-11 items-center gap-2 text-sm font-extrabold text-[#064537] md:inline-flex">
                View all featured
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
              {developments.slice(0, 6).map((development) => (
                <FeaturedDevelopmentCard key={development.slug} development={development} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-6 md:px-8">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">Browse by location</h2>
              <a href="#all-developments" className="hidden min-h-11 items-center gap-2 text-sm font-extrabold text-[#064537] md:inline-flex">
                View all locations
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {locationCards.map((location) => (
                <button
                  key={location.label}
                  type="button"
                  onClick={() => applyLocation(location.label)}
                  className="relative min-h-[120px] min-w-[220px] snap-start overflow-hidden rounded-[14px] p-5 text-left text-white shadow-[0_16px_44px_rgba(5,8,7,0.1)] transition hover:-translate-y-0.5 md:min-w-[240px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.16) 0%, rgba(5,18,15,0.72) 100%), url(${location.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <MapPin className="h-4 w-4 text-white/82" />
                  <span className="mt-8 block text-xl font-extrabold tracking-[-0.04em]">{location.label}</span>
                  <span className="mt-1 block text-sm font-bold text-white/86">{location.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-6 md:px-8">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">Browse by developer</h2>
              <a href="#all-developments" className="hidden min-h-11 items-center gap-2 text-sm font-extrabold text-[#064537] md:inline-flex">
                View all developers
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              {developerBrands.map((developer) => (
                <DeveloperLogo key={developer} developer={developer} onClick={() => applyDeveloper(developer)} />
              ))}
            </div>
          </div>
        </section>

        <section id="all-developments" className="scroll-mt-28 px-6 py-8 md:px-8 md:py-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">All developments</h2>
                <p className="mt-1 text-sm font-semibold text-[#5B6B64]">{filteredDevelopments.length} matching developments</p>
              </div>
              <label className="flex items-center gap-3 text-sm font-bold text-[#31433D]">
                Sort by
                <div className="relative">
                  <select
                    value={filters.sort}
                    onChange={(event) => updateFilter('sort', event.target.value)}
                    className="h-11 appearance-none rounded-[14px] border border-black/[0.08] bg-white px-4 pr-10 text-sm font-semibold text-[#071E1A] outline-none transition focus:border-[#006B4D]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#05120F]/50" />
                </div>
              </label>
            </div>

            <div className="sticky top-[104px] z-10 mb-6 hidden rounded-[18px] border border-black/[0.06] bg-white/88 p-4 shadow-[0_18px_54px_rgba(5,8,7,0.08)] backdrop-blur-xl lg:grid lg:grid-cols-[1.35fr_0.82fr_0.82fr_0.82fr_1fr] lg:gap-4">
              <SearchInput label="Location" value={filters.location} onChange={(value) => updateFilter('location', value)} />
              <SelectField label="Price" value={filters.price} onChange={(value) => updateFilter('price', value)}>
                {priceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </SelectField>
              <SelectField label="Bedrooms" value={filters.bedrooms} onChange={(value) => updateFilter('bedrooms', value)}>
                {bedroomOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </SelectField>
              <SelectField label="Status" value={filters.status} onChange={(value) => updateFilter('status', value)}>
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </SelectField>
              <SelectField label="Developer" value={filters.developer} onChange={(value) => updateFilter('developer', value)}>
                <option>All Developers</option>
                {developerBrands.map((developer) => (
                  <option key={developer}>{developer}</option>
                ))}
              </SelectField>
            </div>

            <div className="mb-6 grid gap-4 lg:hidden">
              <SearchInput label="Location" value={filters.location} onChange={(value) => updateFilter('location', value)} />
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Price" value={filters.price} onChange={(value) => updateFilter('price', value)}>
                  {priceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </SelectField>
                <SelectField label="Bedrooms" value={filters.bedrooms} onChange={(value) => updateFilter('bedrooms', value)}>
                  {bedroomOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </SelectField>
                <SelectField label="Status" value={filters.status} onChange={(value) => updateFilter('status', value)}>
                  {statusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </SelectField>
                <SelectField label="Developer" value={filters.developer} onChange={(value) => updateFilter('developer', value)}>
                  <option>All Developers</option>
                  {developerBrands.map((developer) => (
                    <option key={developer}>{developer}</option>
                  ))}
                </SelectField>
              </div>
            </div>

            {filteredDevelopments.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {filteredDevelopments.map((development) => (
                  <DevelopmentCard key={development.slug} development={development} />
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-[#0A3028]/8 bg-white p-8 text-center shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
                <h3 className="text-2xl font-extrabold text-[#071E1A]">No developments match those filters yet.</h3>
                <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-[#5B6B64]">
                  Try a broader location, price range or developer. New releases are added as they are published.
                </p>
              </div>
            )}

            <div className="mt-7 flex justify-center">
              <button type="button" className="inline-flex min-h-12 items-center gap-2 rounded-[14px] bg-[#064537] px-7 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(0,107,77,0.18)]">
                Load more developments
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 pt-8 md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 border-t border-[#0A3028]/10 pt-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">Why buy through Arch9?</h2>
              <p className="mt-4 max-w-[320px] text-sm font-medium leading-6 text-[#5B6B64]">
                We help you from your first enquiry all the way to registration.
              </p>
              <a href="/platform" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#064537]">
                Learn more about the platform
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {arch9Benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div key={benefit.title} className="rounded-[18px] p-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#006B4D]/24 bg-[#E7F2EA] text-[#064537]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-extrabold text-[#071E1A]">{benefit.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#5B6B64]">{benefit.copy}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
