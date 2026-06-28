import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarCheck,
  CarFront,
  ChevronDown,
  Heart,
  Home,
  KeyRound,
  Lock,
  MapPin,
  PawPrint,
  Search,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  Waves,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatListingPrice, properties } from '../data/properties'
import { developments, formatDevelopmentPrice } from '../data/developments'
import { readPropertyFilters } from '../lib/listingFilters'
import {
  isPropertySaved,
  toggleSavedProperty,
  trackListingEvent,
} from '../lib/listingJourney'
import { fetchPublicListings } from '../lib/publicListingsApi'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/motion/Reveal'

const heroImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85'

const bedroomOptions = ['Any', '1+', '2+', '3+', '4+', '5+']
const bathroomOptions = ['Any', '1+', '2+', '3+', '4+', '5+']
const priceOptions = [
  { label: 'No min', value: '' },
  { label: 'R500k', value: '500000' },
  { label: 'R750k', value: '750000' },
  { label: 'R1m', value: '1000000' },
  { label: 'R1.5m', value: '1500000' },
  { label: 'R2m', value: '2000000' },
  { label: 'R3m', value: '3000000' },
  { label: 'R5m', value: '5000000' },
  { label: 'R10m', value: '10000000' },
]
const maxPriceOptions = [
  { label: 'No max', value: '' },
  { label: 'R750k', value: '750000' },
  { label: 'R1m', value: '1000000' },
  { label: 'R1.5m', value: '1500000' },
  { label: 'R2m', value: '2000000' },
  { label: 'R3m', value: '3000000' },
  { label: 'R5m', value: '5000000' },
  { label: 'R10m', value: '10000000' },
  { label: 'R20m+', value: '20000000' },
]

const popularSearches = ['Bryanston', 'Pretoria East', 'Umhlanga', 'Stellenbosch', 'Cape Town']

const whyCards = [
  {
    title: 'Connected from enquiry to registration',
    copy: 'No more chasing. Stay informed every step of the way.',
    icon: KeyRound,
  },
  {
    title: 'From trusted agencies',
    copy: 'Every listing is published by verified Arch9 agencies.',
    icon: ShieldCheck,
  },
  {
    title: 'Track your buying journey',
    copy: 'Viewings, offers and documents stay connected in one place.',
    icon: TrendingUp,
  },
]

const lifestyleCards = [
  {
    title: 'Family Homes',
    icon: UsersRound,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Luxury Living',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'New Developments',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Investment Opportunities',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Pet Friendly',
    icon: PawPrint,
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Coastal Living',
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
]

const journeySteps = [
  { title: 'Browse', copy: 'Find the right property.', icon: Home },
  { title: 'Enquire', copy: 'Book a viewing that suits you.', icon: Search },
  { title: 'Offer', copy: 'Make an offer with confidence.', icon: CalendarCheck },
  { title: 'Finance', copy: 'Secure your financing.', icon: ShieldCheck },
  { title: 'Transfer', copy: 'We keep everyone aligned.', icon: UsersRound },
  { title: 'Registration', copy: 'Your property, officially yours.', icon: KeyRound },
]

const trustPoints = [
  { title: 'Trusted agencies', copy: 'Verified professionals', icon: ShieldCheck },
  { title: 'Secure & private', copy: 'Your data is protected', icon: Lock },
  { title: 'End-to-end support', copy: "We're with you all the way", icon: CalendarCheck },
  { title: 'South Africa wide', copy: 'Homes in all the right places', icon: MapPin },
]

function setMetaDescription(content) {
  let description = document.querySelector('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.setAttribute('name', 'description')
    document.head.appendChild(description)
  }
  description.setAttribute('content', content)
}

function SaleRentalToggle({ value, onChange }) {
  return (
    <div className="inline-flex rounded-full bg-white/92 p-1 shadow-[0_12px_34px_rgba(5,8,7,0.08)]">
      {[
        { label: 'Sale', value: 'for-sale' },
        { label: 'Rental', value: 'to-rent' },
      ].map((item) => {
        const active = value === item.value
        return (
          <button
            key={item.value}
            type="button"
            className={`min-h-10 rounded-full px-5 text-sm font-extrabold transition ${active ? 'bg-[#064537] text-white shadow-[0_10px_24px_rgba(6,69,55,0.18)]' : 'text-[#071E1A] hover:bg-[#F8F7F4]'}`}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#4D625B]">{label}</span>
      {children}
    </label>
  )
}

function SelectField({ children, ...props }) {
  return (
    <div className="relative mt-2">
      <select
        {...props}
        className="h-13 w-full appearance-none rounded-[15px] border border-[#0A3028]/10 bg-white px-4 pr-10 text-sm font-bold text-[#071E1A] outline-none transition focus:border-[#064537]"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4D625B]" />
    </div>
  )
}

function PropertySearchFilters({ filters, onUpdate, onSearch }) {
  return (
    <div className="rounded-[26px] border border-[#0A3028]/8 bg-white/96 p-4 shadow-[0_24px_80px_rgba(5,8,7,0.14)] backdrop-blur-xl md:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.78fr_0.78fr_0.82fr_0.82fr_auto] lg:items-end">
        <Field label="Where would you like to live?">
          <div className="relative mt-2">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6D7B75]" />
            <input
              value={filters.location}
              onChange={(event) => onUpdate('location', event.target.value)}
              placeholder="Search suburb, estate or city"
              className="h-13 w-full rounded-[15px] border border-[#0A3028]/10 bg-white pl-11 pr-4 text-sm font-bold text-[#071E1A] outline-none transition placeholder:text-[#8A978F] focus:border-[#064537]"
            />
          </div>
        </Field>
        <Field label="Bedrooms">
          <SelectField value={filters.bedrooms} onChange={(event) => onUpdate('bedrooms', event.target.value)}>
            {bedroomOptions.map((option) => <option key={option}>{option}</option>)}
          </SelectField>
        </Field>
        <Field label="Bathrooms">
          <SelectField value={filters.bathrooms} onChange={(event) => onUpdate('bathrooms', event.target.value)}>
            {bathroomOptions.map((option) => <option key={option}>{option}</option>)}
          </SelectField>
        </Field>
        <Field label="Min price">
          <SelectField value={filters.minPrice} onChange={(event) => onUpdate('minPrice', event.target.value)}>
            {priceOptions.map((option) => <option key={option.label} value={option.value}>{option.label}</option>)}
          </SelectField>
        </Field>
        <Field label="Max price">
          <SelectField value={filters.maxPrice} onChange={(event) => onUpdate('maxPrice', event.target.value)}>
            {maxPriceOptions.map((option) => <option key={option.label} value={option.value}>{option.label}</option>)}
          </SelectField>
        </Field>
        <button
          type="button"
          className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-[15px] bg-[#064537] px-6 text-sm font-extrabold text-white transition hover:bg-[#073B32] lg:w-auto"
          onClick={onSearch}
        >
          Search
          <Search className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function PopularSearchChips({ onSelect }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
      <span className="font-extrabold text-white/86 md:text-[#071E1A]">Popular searches:</span>
      {popularSearches.map((search) => (
        <button
          key={search}
          type="button"
          className="min-h-9 rounded-full bg-white/88 px-4 text-xs font-extrabold text-[#31433D] shadow-[0_8px_22px_rgba(5,8,7,0.08)] transition hover:-translate-y-0.5 hover:bg-white hover:text-[#064537]"
          onClick={() => onSelect(search)}
        >
          {search}
        </button>
      ))}
    </div>
  )
}

function PropertySearchHero({ filters, onUpdate, onSearch, onPopularSearch }) {
  return (
    <section className="px-5 pt-[116px] md:px-8 md:pt-[126px]">
      <div className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[28px] bg-[#071E1A] shadow-[0_30px_90px_rgba(5,8,7,0.14)]">
        <div
          className="relative min-h-[650px] bg-cover bg-center md:min-h-[570px]"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,247,244,0.96)_0%,rgba(248,247,244,0.82)_35%,rgba(248,247,244,0.08)_68%),linear-gradient(180deg,rgba(7,30,26,0.12),rgba(7,30,26,0.38))]" />
          <div className="relative flex min-h-[650px] flex-col justify-end p-5 md:min-h-[570px] md:p-10 lg:p-16">
            <FadeUp className="max-w-[560px] pb-7 md:pb-12">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#064537]">Buy through the Arch9 network</p>
              <h1 className="mt-5 text-[3rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#071E1A] md:text-[5rem]">
                Find your next property.
              </h1>
              <p className="mt-5 max-w-[520px] text-base font-medium leading-7 text-[#31433D] md:text-lg md:leading-8">
                Discover homes, developments and investment opportunities from trusted agencies across South Africa.
              </p>
              <div className="mt-7">
                <SaleRentalToggle value={filters.status} onChange={(value) => onUpdate('status', value)} />
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <PropertySearchFilters filters={filters} onUpdate={onUpdate} onSearch={onSearch} />
              <PopularSearchChips onSelect={onPopularSearch} />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyArch9Cards() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1120px]">
        <FadeUp className="text-center">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.045em] text-[#071E1A] md:text-[2.8rem]">Why search with Arch9?</h2>
          <p className="mx-auto mt-3 max-w-[720px] text-base font-medium leading-7 text-[#51615B]">
            We go beyond listings to guide you from the first enquiry to the day you get the keys.
          </p>
        </FadeUp>
        <StaggerContainer className="mt-9 grid gap-4 md:grid-cols-3" stagger={0.08}>
          {whyCards.map((card) => {
            const Icon = card.icon
            return (
              <StaggerItem key={card.title}>
                <article className="h-full rounded-[20px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(5,8,7,0.08)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F3ED] text-[#064537]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-extrabold leading-6 text-[#071E1A]">{card.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#51615B]">{card.copy}</p>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

function LifestyleCategoryCarousel({ onSelect }) {
  return (
    <section className="px-5 pb-16 md:px-8 md:pb-20">
      <div className="mx-auto w-full max-w-[1240px]">
        <FadeUp>
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.04em] text-[#071E1A] md:text-[2.4rem]">Browse by what matters to you</h2>
        </FadeUp>
        <div className="mt-7 flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {lifestyleCards.map((card) => {
            const Icon = card.icon
            return (
              <button
                key={card.title}
                type="button"
                className="group relative h-[148px] w-[210px] shrink-0 overflow-hidden rounded-[16px] bg-[#071E1A] text-left shadow-[0_18px_54px_rgba(5,8,7,0.08)] transition hover:-translate-y-1 md:w-[190px]"
                onClick={() => onSelect(card.title)}
              >
                <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,30,26,0.08),rgba(7,30,26,0.78))]" />
                <div className="relative flex h-full flex-col justify-end p-4 text-white">
                  <Icon className="h-6 w-6" />
                  <span className="mt-3 text-sm font-extrabold leading-5">{card.title}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeatureMeta({ icon: Icon, children }) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-[#064537]" />
      {children}
    </span>
  )
}

function DevelopmentCard({ development }) {
  return (
    <a href={`/developments/${development.slug}`} className="group overflow-hidden rounded-[18px] border border-[#0A3028]/8 bg-white shadow-[0_18px_54px_rgba(5,8,7,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(5,8,7,0.1)]">
      <div className="relative h-44 overflow-hidden">
        <img src={development.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[#064537] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">New Release</span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-extrabold text-[#071E1A]">{development.title}</h3>
        <p className="mt-1 text-xs font-semibold text-[#6D7B75]">{development.area}</p>
        <p className="mt-3 text-sm font-extrabold text-[#071E1A]">{formatDevelopmentPrice(development)}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-[#51615B]">
          <FeatureMeta icon={BedDouble}>{development.bedrooms}</FeatureMeta>
          <FeatureMeta icon={Bath}>2+</FeatureMeta>
          <FeatureMeta icon={CarFront}>1-2</FeatureMeta>
        </div>
      </div>
    </a>
  )
}

function FeaturedDevelopments() {
  const featured = developments.filter((development) => development.status !== 'Sold Out').slice(0, 3)

  return (
    <section className="px-5 pb-16 md:px-8 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1240px] gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-center">
        <FadeUp>
          <h2 className="text-[1.85rem] font-extrabold leading-tight tracking-[-0.04em] text-[#071E1A] md:text-[2.5rem]">Featured developments</h2>
          <p className="mt-4 max-w-[340px] text-sm font-medium leading-7 text-[#51615B]">
            Discover the latest developments in prime locations.
          </p>
          <a href="/developments" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#0A3028]/16 bg-white px-5 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5 hover:border-[#064537]/32 sm:w-auto">
            View all developments
            <ArrowRight className="h-4 w-4" />
          </a>
        </FadeUp>
        <StaggerContainer className="grid gap-4 md:grid-cols-3" stagger={0.07}>
          {featured.map((development) => (
            <StaggerItem key={development.slug}>
              <DevelopmentCard development={development} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function PropertyCard({ property, isSaved, onSave }) {
  const image = property.image || properties[0]?.image
  return (
    <article className="group overflow-hidden rounded-[18px] border border-[#0A3028]/8 bg-white shadow-[0_18px_54px_rgba(5,8,7,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(5,8,7,0.1)]">
      <a href={`/buy/${property.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#064537] shadow-[0_8px_22px_rgba(5,8,7,0.08)]">
            {property.status || 'Just Listed'}
          </span>
        </div>
      </a>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <a href={`/buy/${property.slug}`} className="min-w-0">
            <h3 className="text-base font-extrabold leading-6 text-[#071E1A]">{property.title}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#6D7B75]">
              <MapPin className="h-3.5 w-3.5" />
              {property.location}
            </p>
          </a>
          <button
            type="button"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${isSaved ? 'border-[#064537]/24 bg-[#E6F3ED] text-[#064537]' : 'border-[#0A3028]/10 text-[#51615B] hover:border-[#064537]/24 hover:text-[#064537]'}`}
            onClick={() => onSave(property)}
            aria-label={isSaved ? 'Remove saved property' : 'Save property'}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
        <p className="mt-4 text-lg font-extrabold text-[#071E1A]">{formatListingPrice(property)}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-[#51615B]">
          <FeatureMeta icon={BedDouble}>{property.bedrooms}</FeatureMeta>
          <FeatureMeta icon={Bath}>{property.bathrooms}</FeatureMeta>
          <FeatureMeta icon={CarFront}>{property.parking}</FeatureMeta>
          {property.size ? <span>{property.size}</span> : null}
        </div>
      </div>
    </article>
  )
}

function LatestPropertiesGrid({ properties: latestProperties, loading, error, savedSlugs, onSave }) {
  const visibleProperties = latestProperties.slice(0, 4)

  return (
    <section id="latest-properties" className="px-5 pb-16 md:px-8 md:pb-20">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <FadeUp>
            <h2 className="text-[1.85rem] font-extrabold tracking-[-0.04em] text-[#071E1A] md:text-[2.5rem]">Latest properties</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-[#51615B]">
              {loading ? 'Loading properties from Arch9 agencies.' : visibleProperties.length ? `${latestProperties.length} live properties available.` : 'New properties are being added by Arch9 agencies.'}
            </p>
          </FadeUp>
          <a href="#latest-properties" className="inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#064537]">
            View all properties
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {loading ? (
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="overflow-hidden rounded-[18px] border border-[#0A3028]/8 bg-white shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
                <div className="h-48 animate-pulse bg-[#EFE8DC]" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-4/5 animate-pulse rounded-full bg-[#EFE8DC]" />
                  <div className="h-4 w-3/5 animate-pulse rounded-full bg-[#EFE8DC]" />
                  <div className="h-5 w-1/2 animate-pulse rounded-full bg-[#EFE8DC]" />
                </div>
              </div>
            ))}
          </div>
        ) : visibleProperties.length ? (
          <StaggerContainer className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {visibleProperties.map((property) => (
              <StaggerItem key={property.slug}>
                <PropertyCard property={property} isSaved={savedSlugs.includes(property.slug)} onSave={onSave} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="mt-7 rounded-[24px] border border-[#0A3028]/8 bg-white p-8 text-center shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
            <h3 className="text-xl font-extrabold text-[#071E1A]">{error ? 'Published listings could not load.' : 'New properties are being added by Arch9 agencies.'}</h3>
            <p className="mx-auto mt-3 max-w-[540px] text-sm font-medium leading-6 text-[#51615B]">
              {error || 'Check back soon for homes, developments and investment opportunities from trusted agencies.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function BuyingJourneyTimeline() {
  return (
    <section className="px-5 pb-16 md:px-8 md:pb-20">
      <div className="mx-auto w-full max-w-[1240px] rounded-[24px] bg-[#064537] p-6 text-white shadow-[0_24px_80px_rgba(6,69,55,0.2)] md:p-8 lg:p-10">
        <div className="grid gap-9 lg:grid-cols-[0.32fr_0.68fr] lg:items-center">
          <FadeUp>
            <h2 className="text-[1.85rem] font-extrabold leading-tight tracking-[-0.04em] md:text-[2.6rem]">More than a listing. The start of your journey.</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-white/76 md:text-base">
              Arch9 connects every step of your property journey — from enquiry to registration.
            </p>
            <a href="/platform" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-[#064537] transition hover:scale-[1.01] sm:w-auto" style={{ color: '#064537' }}>
              See how it works
              <ArrowRight className="h-4 w-4" />
            </a>
          </FadeUp>

          <StaggerContainer className="grid gap-5 md:grid-cols-6" stagger={0.06}>
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              return (
                <StaggerItem key={step.title}>
                  <article className="relative grid grid-cols-[48px_1fr] gap-4 md:block md:text-center">
                    {index < journeySteps.length - 1 ? <span className="absolute left-6 top-12 bottom-[-20px] w-px bg-white/20 md:left-[calc(50%+24px)] md:right-[-50%] md:top-6 md:bottom-auto md:h-px md:w-auto" /> : null}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#064537] md:mx-auto">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white md:mt-4">{step.title}</h3>
                      <p className="mt-2 text-xs font-medium leading-5 text-white/70">{step.copy}</p>
                    </div>
                  </article>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="px-5 pb-10 md:px-8 md:pb-12">
      <FadeUp className="mx-auto grid w-full max-w-[1240px] overflow-hidden rounded-[24px] border border-[#0A3028]/8 bg-white shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:grid-cols-[0.62fr_0.38fr]">
        <div className="p-6 md:p-9">
          <h2 className="max-w-[560px] text-[2rem] font-extrabold leading-tight tracking-[-0.045em] text-[#0B2350] md:text-[3rem]">
            Find your next home. We'll help you get there.
          </h2>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#property-search" className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#064537] px-7 text-sm font-extrabold text-white transition hover:bg-[#073B32] sm:w-auto" style={{ color: '#FFFFFF' }}>
              Start browsing
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/book-demo" className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-[#0A3028]/16 bg-white px-7 text-sm font-extrabold text-[#071E1A] transition hover:border-[#064537]/32 sm:w-auto">
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=85" alt="" className="hidden h-full min-h-[230px] w-full object-cover md:block" />
      </FadeUp>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="px-5 pb-14 md:px-8 md:pb-16">
      <div className="mx-auto grid w-full max-w-[1240px] gap-4 rounded-[22px] bg-white/72 px-5 py-5 md:grid-cols-4">
        {trustPoints.map((point) => {
          const Icon = point.icon
          return (
            <div key={point.title} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6F3ED] text-[#064537]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-[#071E1A]">{point.title}</p>
                <p className="mt-0.5 text-xs font-medium text-[#51615B]">{point.copy}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function Properties() {
  const [filters, setFilters] = useState(() => readPropertyFilters())
  const [publicProperties, setPublicProperties] = useState([])
  const [listingsLoading, setListingsLoading] = useState(true)
  const [listingsError, setListingsError] = useState('')
  const [savedSlugs, setSavedSlugs] = useState([])

  useEffect(() => {
    document.title = 'Find Your Next Property | Arch9'
    setMetaDescription('Discover homes, developments and investment opportunities from trusted agencies across South Africa with Arch9.')
    trackListingEvent({ eventType: 'Property Search Viewed', payload: filters })
  }, [filters])

  useEffect(() => {
    let cancelled = false

    queueMicrotask(() => {
      if (cancelled) return
      setListingsLoading(true)
      setListingsError('')
    })

    fetchPublicListings(filters)
      .then((result) => {
        if (cancelled) return
        setPublicProperties(result.items)
        setSavedSlugs(result.items.filter((property) => isPropertySaved(property.slug)).map((property) => property.slug))
      })
      .catch((error) => {
        if (cancelled) return
        setPublicProperties([])
        setSavedSlugs([])
        setListingsError(error?.message || 'Published listings could not be loaded.')
      })
      .finally(() => {
        if (!cancelled) setListingsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [filters])

  const filteredProperties = useMemo(() => {
    return [...publicProperties].sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
  }, [publicProperties])

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function handleSearch() {
    trackListingEvent({ eventType: 'Property Search Submitted', payload: filters })
  }

  function handlePopularSearch(search) {
    setFilters((current) => ({ ...current, location: search }))
  }

  function handleLifestyleSearch(title) {
    const location = title === 'Coastal Living' ? 'Cape Town' : ''
    setFilters((current) => ({ ...current, location, type: title === 'New Developments' ? 'Development' : current.type }))
  }

  function handleSave(property) {
    const isSaved = toggleSavedProperty(property)
    setSavedSlugs((current) => (isSaved ? [...current, property.slug] : current.filter((slug) => slug !== property.slug)))
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#05120F]">
      <Header />
      <main>
        <PropertySearchHero filters={filters} onUpdate={updateFilter} onSearch={handleSearch} onPopularSearch={handlePopularSearch} />
        <WhyArch9Cards />
        <LifestyleCategoryCarousel onSelect={handleLifestyleSearch} />
        <FeaturedDevelopments />
        <LatestPropertiesGrid properties={filteredProperties} loading={listingsLoading} error={listingsError} savedSlugs={savedSlugs} onSave={handleSave} />
        <BuyingJourneyTimeline />
        <FinalCTA />
        <TrustStrip />
      </main>
      <Footer />
    </div>
  )
}
