import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Building2, ChevronDown, MapPin, Search, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { developments, formatDevelopmentPrice } from '../data/developments'

const statusOptions = ['All', 'New release', 'Phase 2 selling', 'Limited availability', 'Off plan']
const areaOptions = ['Any area', 'Pretoria East', 'Fourways', 'Umhlanga', 'Cape Town']

function FilterSelect({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006B4D]">{label}</span>
      <div className="relative mt-3">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-13 w-full appearance-none rounded-[18px] border border-[#0A3028]/10 bg-white px-4 pr-10 text-sm font-bold text-[#05120F] outline-none transition focus:border-[#006B4D]"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B5B55]" />
      </div>
    </label>
  )
}

function DevelopmentCard({ development }) {
  return (
    <a
      href={`/developments/${development.slug}`}
      className="group overflow-hidden rounded-[34px] border border-[#0A3028]/8 bg-white shadow-[0_22px_70px_rgba(5,8,7,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[#0A3028]/18 hover:shadow-[0_30px_90px_rgba(5,8,7,0.12)]"
    >
      <div
        className="relative flex h-72 items-end overflow-hidden p-5"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.04) 0%, rgba(5,18,15,0.68) 100%), url(${development.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute left-5 top-5 rounded-full border border-white/16 bg-white/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
          {development.status}
        </div>
        <div className="relative w-full rounded-[26px] border border-white/14 bg-[rgba(7,30,26,0.72)] p-4 text-white backdrop-blur-xl">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#86E4C2]">{development.stage}</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">{development.title}</h3>
          <p className="mt-2 text-sm font-semibold text-white/74">{development.area}</p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm font-bold text-[#F3EEE6]">{formatDevelopmentPrice(development)}</span>
            <span className="text-sm font-bold text-[#86E4C2]">{development.availableUnits} units</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#006B4D]">Development</p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#05120F]">{development.title}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#4B5B55]">
              <MapPin className="h-4 w-4" />
              {development.area}
            </p>
          </div>
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[#006B4D] transition group-hover:translate-x-1" />
        </div>
        <p className="mt-5 text-base leading-7 text-[#4B5B55]">{development.summary}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#0A3028]/8 pt-5 text-sm font-bold text-[#31433D]">
          <span className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#006B4D]" />
            {development.availableUnits} units
          </span>
          <span className="flex items-center gap-2 justify-self-end text-[#006B4D]">
            <Sparkles className="h-4 w-4" />
            View development
          </span>
        </div>
      </div>
    </a>
  )
}

export default function Developments() {
  const [filters, setFilters] = useState({
    status: 'All',
    area: 'Any area',
  })

  useEffect(() => {
    document.title = 'Discover New Developments | Arch9'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Explore new residential developments, launches, and investment opportunities with Arch9.'
    )
  }, [])

  const filteredDevelopments = useMemo(() => {
    return developments.filter((development) => {
      const matchesStatus = filters.status === 'All' || development.status === filters.status
      const matchesArea = filters.area === 'Any area' || development.area.includes(filters.area)
      return matchesStatus && matchesArea
    })
  }, [filters])

  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />

      <main className="bg-[#F8F4EC] pt-[112px]">
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-14 pt-8 md:px-8 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Developments</p>
              <h1 className="mt-5 max-w-[720px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem] xl:text-[6rem]">
                Discover new developments
              </h1>
              <a href="#development-listings" className="bridge-button-primary mt-8">
                View developments
              </a>
            </div>
            <p className="max-w-[560px] text-lg font-medium leading-8 text-[#31433D] lg:justify-self-end">
              Explore new residential developments, launches, and investment opportunities.
            </p>
          </div>

          <div id="development-listings" className="mt-10 rounded-[34px] border border-[#0A3028]/8 bg-white/86 p-5 shadow-[0_24px_80px_rgba(5,8,7,0.08)] backdrop-blur-xl md:p-6">
            <div className="flex items-center gap-3 border-b border-[#0A3028]/8 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#071E1A] text-[#F3EEE6]">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#05120F]">Filter developments</h2>
                <p className="text-sm text-[#5B6B64]">{filteredDevelopments.length} developments available</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              <FilterSelect label="Status" value={filters.status} onChange={(value) => setFilters((current) => ({ ...current, status: value }))}>
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </FilterSelect>
              <FilterSelect label="Area" value={filters.area} onChange={(value) => setFilters((current) => ({ ...current, area: value }))}>
                {areaOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </FilterSelect>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
            {filteredDevelopments.map((development) => (
              <DevelopmentCard key={development.slug} development={development} />
            ))}
          </div>

          {filteredDevelopments.length === 0 ? (
            <div className="mt-8 rounded-[30px] border border-[#0A3028]/8 bg-white p-8 text-center shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
              <h2 className="text-2xl font-extrabold text-[#05120F]">No developments match those filters yet.</h2>
              <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-[#4B5B55]">
                Try widening the area or status. New Arch9 development releases will appear here as they are published.
              </p>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  )
}
