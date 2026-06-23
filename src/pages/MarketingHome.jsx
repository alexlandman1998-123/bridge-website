import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  Home,
  Landmark,
  MapPin,
  Search,
  Scale,
  Users,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp } from '../components/motion/Reveal'
import { buildPropertyQuery } from '../lib/listingFilters'
import { developments, formatDevelopmentPrice } from '../data/developments'

const heroBackground =
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=80'

const saleTypeOptions = [
  { label: 'For Sale', value: 'for-sale' },
  { label: 'To Rent', value: 'to-rent' },
]

const propertyTypeOptions = ['Any', 'Apartment', 'Estate Home', 'Townhouse', 'Development']
const bedroomOptions = ['Any', '1+', '2+', '3+', '4+']
const bathroomOptions = ['Any', '1+', '2+', '3+']

const solutionCards = [
  {
    icon: Users,
    title: 'Agents',
    copy: ['Generate more leads.', 'Track transactions.', 'Get paid faster.'],
    href: '/solutions/agents',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Attorneys',
    copy: ['Cleaner instructions.', 'Better visibility.', 'Faster registrations.'],
    href: '/solutions/attorneys',
  },
  {
    icon: Landmark,
    title: 'Bond Originators',
    copy: ['Better applications.', 'More approvals.', 'Less chasing.'],
    href: '/solutions/bond-originators',
  },
  {
    icon: Building2,
    title: 'Developers',
    copy: ['More enquiries.', 'Better stock visibility.', 'Faster sell-through.'],
    href: '/solutions/developers',
  },
]

const transactionRoles = [
  { label: 'Buyer', icon: Home },
  { label: 'Seller', icon: Users },
  { label: 'Agent', icon: Users },
  { label: 'Attorney', icon: BriefcaseBusiness },
  { label: 'Bond Originator', icon: Landmark },
  { label: 'Developer', icon: Building2 },
]

const marketplaceMetrics = [
  { value: '120,000+', title: 'Properties Listed', copy: 'Across South Africa', icon: Home },
  { value: '15,000+', title: 'Transactions Active', copy: 'Every month', icon: CheckCircle2 },
  { value: '5,000+', title: 'Professionals Using Arch9', copy: 'And growing', icon: Users },
  { value: 'R8.4B+', title: 'Transaction Value', copy: 'Processed on Arch9', icon: Scale },
]

const solutionIconTone = [
  'bg-[#D9E8C4] text-[#31582F]',
  'bg-[#E5C39A] text-[#7C4D22]',
  'bg-[#D9E8C4] text-[#31582F]',
  'bg-[#E5C39A] text-[#7C4D22]',
]

const featuredDevelopmentCards = developments.slice(0, 3)

function MetricIcon({ icon: Icon }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/8 text-[#A9C98B]">
      <Icon className="h-7 w-7" />
    </div>
  )
}

function SolutionCard({ card, index }) {
  const Icon = card.icon
  return (
    <a
      href={card.href}
      className="group rounded-[22px] border border-[#0A3028]/8 bg-white p-7 shadow-[0_20px_60px_rgba(3,18,15,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(3,18,15,0.1)]"
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${solutionIconTone[index]}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.045em] text-[#062D25]">{card.title}</h3>
      <div className="mt-5 grid gap-1 text-base font-medium leading-7 text-[#4B5B55]">
        {card.copy.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#0E6A55]">
        Learn More
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </a>
  )
}

function TransactionConnectionVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-[32px] border border-[#0A3028]/8 bg-white/62 p-5 shadow-[0_24px_80px_rgba(3,18,15,0.06)] md:p-8">
      <div className="grid gap-4 md:grid-cols-6">
        {transactionRoles.map((role) => {
          const Icon = role.icon
          return (
            <div key={role.label} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#0A3028]/8 bg-white text-[#064537] shadow-[0_14px_34px_rgba(3,18,15,0.08)]">
                <Icon className="h-7 w-7" />
              </div>
              <p className="mt-3 text-xs font-extrabold text-[#062D25]">{role.label}</p>
            </div>
          )
        })}
      </div>

      <div className="mx-auto mt-8 max-w-[760px]">
        <div className="mx-auto h-8 w-px bg-[#0A3028]/14" />
        <div className="mx-auto flex min-h-[58px] max-w-[420px] items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#05352D,#08221D)] px-8 text-sm font-extrabold text-white shadow-[0_22px_64px_rgba(3,18,15,0.18)]">
          <CheckCircle2 className="h-5 w-5 text-[#A9C98B]" />
          Shared Transaction
        </div>
        <div className="mx-auto h-8 w-px bg-[#0A3028]/14" />
        <div className="mx-auto flex min-h-[54px] max-w-[250px] items-center justify-center gap-3 rounded-full border border-[#0A3028]/8 bg-white px-8 text-sm font-extrabold text-[#062D25] shadow-[0_16px_42px_rgba(3,18,15,0.06)]">
          <CheckCircle2 className="h-5 w-5 text-[#4D7D35]" />
          Registration
        </div>
      </div>
    </div>
  )
}

function SolutionsSection() {
  return (
    <section className="bg-[#F2EDE3] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">Built for every role in property</p>
          <h2 className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.4rem]">
            Solutions designed for how you work.
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base font-medium leading-8 text-[#61584D] md:text-lg">
            Purpose-built workspaces for every stakeholder in the property journey.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {solutionCards.map((card, index) => (
            <SolutionCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SharedTransactionSection() {
  return (
    <section className="bg-[#F7F3EA] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">One transaction. Every stakeholder.</p>
          <h2 className="mt-4 text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062D25] md:text-[3.4rem]">
            One transaction.
            <span className="block">Every stakeholder.</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-base font-medium leading-8 text-[#4B5B55] md:text-lg">
            Arch9 connects buyers, sellers, agents, attorneys, bond originators and developers around one shared transaction from enquiry to registration.
          </p>
        </div>

        <TransactionConnectionVisual />
      </div>
    </section>
  )
}

function MarketplaceMetricsSection() {
  return (
    <section className="bg-[#F7F3EA] px-6 pb-16 md:px-8 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 rounded-[26px] bg-[linear-gradient(135deg,#05352D,#08221D)] p-7 text-white shadow-[0_24px_80px_rgba(3,18,15,0.16)] md:grid-cols-2 md:p-9 xl:grid-cols-4">
        {marketplaceMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={metric.title} className={`flex gap-5 ${index ? 'xl:border-l xl:border-white/14 xl:pl-8' : ''}`}>
              <MetricIcon icon={Icon} />
              <div>
                <p className="text-[2.4rem] font-extrabold leading-none tracking-[-0.05em]">{metric.value}</p>
                <p className="mt-4 text-base font-extrabold">{metric.title}</p>
                <p className="mt-1 text-sm font-medium text-white/74">{metric.copy}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="bg-[#F7F3EA] px-6 pb-16 md:px-8 md:pb-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 rounded-[24px] border border-[#0A3028]/8 bg-white p-8 shadow-[0_24px_80px_rgba(3,18,15,0.07)] md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <h2 className="max-w-[580px] text-[2.1rem] font-extrabold leading-[1] tracking-[-0.05em] text-[#062D25] md:text-[3rem]">
            Ready to modernise your property business?
          </h2>
          <p className="mt-4 max-w-[620px] text-base font-medium leading-8 text-[#4B5B55]">
            Join property professionals using Arch9 to connect, collaborate and close more deals.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="/contact" className="bridge-button-primary min-h-[52px] justify-center px-8">
            Book A Demo
          </a>
          <a href="/solutions/platform" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#0A3028]/22 bg-white px-8 text-sm font-extrabold text-[#062D25] transition hover:bg-[#F7F3EA]">
            Explore Solutions
          </a>
        </div>
      </div>
    </section>
  )
}
function SearchSelect({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#05120F]/60">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-full appearance-none rounded-[14px] border border-black/[0.08] bg-[#FCFBF8] px-4 pr-10 text-sm font-semibold text-[#062D25] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] outline-none transition duration-200 focus:border-[#064537] focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,69,55,0.08)]"
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#05120F]/48 shadow-[0_4px_14px_rgba(5,8,7,0.05)]">
          <ChevronDown className="h-4 w-4" />
        </span>
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
          className={`h-14 w-full rounded-[14px] border border-black/[0.08] bg-[#FCFBF8] px-4 text-sm font-semibold text-[#062D25] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] outline-none transition duration-200 placeholder:text-[#05120F]/42 focus:border-[#064537] focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,69,55,0.08)] ${
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
    setRedirectUrl(query ? `/properties?${query}` : '/properties')
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

          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_220px]">
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
              className="col-span-2 inline-flex h-14 w-full items-center justify-center gap-2 self-end rounded-[16px] bg-[#064537] px-6 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(6,69,55,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#05352D] focus:outline-none focus:ring-4 focus:ring-[#064537]/15 lg:col-span-1"
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
            {featuredDevelopmentCards.map((development) => (
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
          <div className="relative mx-auto flex min-h-[680px] w-full max-w-[1440px] flex-col justify-between px-6 pb-0 pt-[96px] md:min-h-[760px] md:px-8 md:pt-[126px]">
            <div className="max-w-[780px] pb-5 md:pb-6">
              <FadeUp>
                <div className="h-[15px]" aria-hidden="true" />
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

        <SolutionsSection />

        <SharedTransactionSection />

        <MarketplaceMetricsSection />

        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  )
}

export default MarketingHome
