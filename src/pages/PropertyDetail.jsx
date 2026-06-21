import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Calculator,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  FileText,
  Heart,
  Mail,
  MapPin,
  Percent,
  Phone,
  Scale,
  UserRound,
  WalletCards,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { findPropertyBySlug, formatListingPrice, properties } from '../data/properties'
import { findAreaInsight } from '../data/areaInsights'
import { slugify } from '../data/propertyIntelligence'
import { capturePropertyEnquiry } from '../lib/leads'
import {
  PRIME_RATE,
  calculateAffordability,
  calculateBond,
  calculateTransferCosts,
  captureFinanceApplication,
  captureViewingRequest,
  isPropertySaved,
  toggleComparisonProperty,
  toggleSavedProperty,
  trackListingEvent,
} from '../lib/listingJourney'

const initialEnquiry = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

const initialViewing = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  message: '',
}

const initialAffordability = {
  monthlyIncome: '',
  existingDebt: '',
  depositAmount: '',
  employmentType: 'Permanent',
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006B4D]">{label}</span>
      {children}
    </label>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className="mt-3 h-13 w-full rounded-[18px] border border-[#0A3028]/10 bg-white px-4 text-sm font-bold text-[#05120F] outline-none transition placeholder:text-[#8A978F] focus:border-[#006B4D]"
    />
  )
}

function Select(props) {
  return (
    <select
      {...props}
      className="mt-3 h-13 w-full rounded-[18px] border border-[#0A3028]/10 bg-white px-4 text-sm font-bold text-[#05120F] outline-none transition focus:border-[#006B4D]"
    />
  )
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="mt-3 min-h-[130px] w-full rounded-[18px] border border-[#0A3028]/10 bg-white px-4 py-3 text-sm font-bold text-[#05120F] outline-none transition placeholder:text-[#8A978F] focus:border-[#006B4D]"
    />
  )
}

function Money({ value }) {
  return formatListingPrice({ price: Number(value || 0) })
}

function BondCalculator({ property }) {
  const [expanded, setExpanded] = useState(false)
  const [values, setValues] = useState({
    purchasePrice: property.price,
    deposit: Math.round(property.price * 0.1),
    interestRate: PRIME_RATE,
    termYears: 20,
  })
  const result = calculateBond(values)

  function updateValue(key, value) {
    const next = { ...values, [key]: value }
    setValues(next)
    trackListingEvent({ eventType: 'Calculator Used', property, payload: { calculator: 'Bond Repayment', ...next } })
  }

  return (
    <section className="rounded-[30px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">
            <Calculator className="h-4 w-4" />
            Estimated repayment
          </p>
          <p className="mt-3 text-[2rem] font-extrabold tracking-[-0.05em] text-[#05120F]">
            <Money value={result.monthlyRepayment} /> <span className="text-base text-[#5B6B64]">/ month</span>
          </p>
          <p className="mt-2 text-sm font-semibold text-[#5B6B64]">
            Based on 10% deposit, 20 year term and current prime rate.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-[#0A3028]/10 px-4 py-2 text-sm font-extrabold text-[#006B4D]"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? 'Hide' : 'Edit'}
        </button>
      </div>

      {expanded ? (
        <div className="mt-5 grid gap-4 border-t border-[#0A3028]/8 pt-5 sm:grid-cols-2">
          <Field label="Purchase price">
            <Input type="number" min="0" value={values.purchasePrice} onChange={(event) => updateValue('purchasePrice', event.target.value)} />
          </Field>
          <Field label="Deposit">
            <Input type="number" min="0" value={values.deposit} onChange={(event) => updateValue('deposit', event.target.value)} />
          </Field>
          <Field label="Interest rate">
            <Input type="number" step="0.1" min="0" value={values.interestRate} onChange={(event) => updateValue('interestRate', event.target.value)} />
          </Field>
          <Field label="Loan term">
            <Input type="number" min="1" value={values.termYears} onChange={(event) => updateValue('termYears', event.target.value)} />
          </Field>
          <div className="rounded-[22px] bg-[#F8F4EC] p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">Total interest</p>
            <p className="mt-2 text-xl font-extrabold"><Money value={result.totalInterest} /></p>
          </div>
          <div className="rounded-[22px] bg-[#F8F4EC] p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">Total loan cost</p>
            <p className="mt-2 text-xl font-extrabold"><Money value={result.totalLoanCost} /></p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function TransferCostCalculator({ property }) {
  const [bondAmount, setBondAmount] = useState(Math.round(property.price * 0.9))
  const result = calculateTransferCosts({ purchasePrice: property.price, bondAmount })

  function requestBreakdown() {
    captureFinanceApplication({
      property,
      application: {
        type: 'transfer_cost_breakdown',
        purchasePrice: property.price,
        bondAmount,
        cashRequired: result.totalCashRequired,
      },
    })
  }

  return (
    <section className="rounded-[30px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">
        <FileText className="h-4 w-4" />
        Transfer cost calculator
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Purchase price">
          <Input type="number" min="0" value={property.price} readOnly />
        </Field>
        <Field label="Bond amount">
          <Input type="number" min="0" value={bondAmount} onChange={(event) => setBondAmount(event.target.value)} />
        </Field>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ['Transfer Duty', result.transferDuty],
          ['Transfer Costs', result.transferCosts],
          ['Bond Registration', result.bondRegistrationCosts],
          ['Total Cash Required', result.totalCashRequired],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[20px] bg-[#F8F4EC] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#006B4D]">{label}</p>
            <p className="mt-2 text-lg font-extrabold"><Money value={value} /></p>
          </div>
        ))}
      </div>
      <button type="button" className="bridge-button-primary mt-5 w-full" onClick={requestBreakdown}>
        Request Full Cost Breakdown
      </button>
    </section>
  )
}

function AffordabilityCheck({ property }) {
  const [values, setValues] = useState(initialAffordability)
  const [result, setResult] = useState(null)

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function runCheck(event) {
    event.preventDefault()
    const affordability = calculateAffordability(values)
    setResult(affordability)
    trackListingEvent({ eventType: 'Affordability Check Completed', property, payload: { ...values, ...affordability } })
  }

  function applyForFinance() {
    captureFinanceApplication({
      property,
      application: {
        type: 'affordability_check',
        ...values,
        result,
      },
    })
  }

  return (
    <section className="rounded-[30px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">
        <WalletCards className="h-4 w-4" />
        Can I afford this property?
      </p>
      <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={runCheck}>
        <Field label="Monthly income">
          <Input required type="number" min="0" value={values.monthlyIncome} onChange={(event) => updateValue('monthlyIncome', event.target.value)} />
        </Field>
        <Field label="Existing debt">
          <Input type="number" min="0" value={values.existingDebt} onChange={(event) => updateValue('existingDebt', event.target.value)} />
        </Field>
        <Field label="Deposit amount">
          <Input type="number" min="0" value={values.depositAmount} onChange={(event) => updateValue('depositAmount', event.target.value)} />
        </Field>
        <Field label="Employment type">
          <Select value={values.employmentType} onChange={(event) => updateValue('employmentType', event.target.value)}>
            <option>Permanent</option>
            <option>Self-employed</option>
            <option>Contract</option>
          </Select>
        </Field>
        <button type="submit" className="bridge-button-primary sm:col-span-2">
          Check Affordability
        </button>
      </form>
      {result ? (
        <div className="mt-5 rounded-[24px] border border-[#24B47E]/30 bg-[#F1FFF8] p-5">
          <p className="text-sm font-extrabold text-[#006B4D]">{result.likelyAffordable ? 'Likely Affordable' : 'Needs Review'}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4B5B55]">Estimated Bond</p>
              <p className="mt-1 font-extrabold"><Money value={result.estimatedBond} /></p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4B5B55]">Suggested Budget</p>
              <p className="mt-1 font-extrabold"><Money value={result.suggestedBudget} /></p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4B5B55]">Finance Readiness</p>
              <p className="mt-1 font-extrabold">{result.financeReadiness}%</p>
            </div>
          </div>
          <button type="button" className="bridge-button-primary mt-5 w-full" onClick={applyForFinance}>
            Apply For Finance
          </button>
        </div>
      ) : null}
    </section>
  )
}

function AreaInsights({ property }) {
  const insight = findAreaInsight(property.location)

  return (
    <section className="rounded-[34px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_22px_70px_rgba(5,8,7,0.06)] md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Area insights</p>
      <h2 className="mt-4 text-[2rem] font-extrabold tracking-[-0.05em] text-[#05251D]">{property.location}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ['Average Price', insight.averagePrice],
          ['Median Price', insight.medianPrice],
          ['Avg. Days on Market', `${insight.averageDaysOnMarket} days`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[22px] bg-[#F8F4EC] p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#006B4D]">{label}</p>
            <p className="mt-2 text-xl font-extrabold">{typeof value === 'number' ? <Money value={value} /> : value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          ['Nearby Schools', insight.schools.join(', ')],
          ['Shopping Centres', insight.shoppingCentres.join(', ')],
          ['Hospitals', insight.hospitals.join(', ')],
          ['Commute Signals', `14 mins to key business nodes · 8 mins to ${insight.gautrain} · ${insight.airport}`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[20px] border border-[#0A3028]/8 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#006B4D]">{label}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#4B5B55]">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SimilarProperties({ property }) {
  const similar = properties
    .filter((candidate) => candidate.slug !== property.slug)
    .map((candidate) => ({
      ...candidate,
      score:
        (candidate.type === property.type ? 3 : 0) +
        (candidate.location.split(',')[0] === property.location.split(',')[0] ? 3 : 0) +
        (Math.abs(candidate.price - property.price) / Math.max(property.price, 1) < 0.35 ? 2 : 0) +
        (candidate.bedrooms === property.bedrooms ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)

  return (
    <section className="rounded-[34px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_22px_70px_rgba(5,8,7,0.06)] md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Similar properties</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {similar.map((item) => (
          <a key={item.slug} href={`/property/${item.slug}`} className="group overflow-hidden rounded-[24px] border border-[#0A3028]/8 bg-[#F8F4EC]">
            <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="p-4">
              <p className="text-sm font-extrabold text-[#05120F]">{item.title}</p>
              <p className="mt-1 text-xs font-semibold text-[#5B6B64]">{item.location}</p>
              <p className="mt-3 text-sm font-extrabold text-[#006B4D]">{formatListingPrice(item)}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function PropertyIntelligenceLinks({ property }) {
  const areaSlug = slugify(property.location.split(',')[0])
  const typeRoute =
    property.type === 'Apartment'
      ? `/apartments-for-sale/${areaSlug}`
      : property.type === 'Townhouse'
        ? `/townhouses-for-sale/${areaSlug}`
        : `/houses-for-sale/${areaSlug}`

  const links = [
    ['Area page', `/areas/${areaSlug}`],
    [`Property for sale in ${property.location.split(',')[0]}`, `/property-for-sale/${areaSlug}`],
    ['Similar property type in this area', typeRoute],
    ['Bond calculator', '/bond-calculator'],
    ['Transfer cost calculator', '/transfer-cost-calculator'],
    ['Affordability calculator', '/affordability-calculator'],
  ]

  return (
    <section className="rounded-[34px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_22px_70px_rgba(5,8,7,0.06)] md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Property intelligence</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="flex min-h-12 items-center justify-between rounded-[18px] bg-[#F8F4EC] px-4 text-sm font-extrabold text-[#071E1A] transition hover:text-[#006B4D]">
            {label}
            <ArrowRight className="h-4 w-4" />
          </a>
        ))}
      </div>
    </section>
  )
}

function RegistrationTrackerPreview() {
  const steps = ['Offer Accepted', 'Bond Approved', 'Transfer Attorney Assigned', 'Documents Requested', 'Guarantees', 'Lodged', 'Registered']

  return (
    <section className="rounded-[30px] border border-[#0A3028]/8 bg-[#071E1A] p-5 text-[#F3EEE6] shadow-[0_18px_54px_rgba(5,8,7,0.12)]">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">After your offer</p>
      <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">Track registration live</h2>
      <div className="mt-5 grid gap-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-[16px] bg-white/[0.07] px-3 py-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full ${index < 2 ? 'bg-[#86E4C2] text-[#05120F]' : 'bg-white/10 text-white/62'}`}>
              {index < 2 ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
            </span>
            <span className="text-sm font-bold">{step}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function NotFound() {
  useEffect(() => {
    document.title = 'Property not found | Arch9'
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-[900px] flex-col items-center justify-center px-6 pt-[120px] text-center">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Property unavailable</p>
        <h1 className="mt-5 text-[3rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-[#05251D] md:text-[4.5rem]">
          This property is not available.
        </h1>
        <p className="mt-5 max-w-[560px] text-lg leading-8 text-[#4B5B55]">
          The listing may have moved, been removed, or is not yet published on the Arch9 public network.
        </p>
        <a href="/buy" className="bridge-button-primary mt-8">
          Back to Properties
          <ArrowRight className="h-4 w-4" />
        </a>
      </main>
      <Footer />
    </div>
  )
}

export default function PropertyDetail({ slug }) {
  const property = findPropertyBySlug(slug)
  const [enquiry, setEnquiry] = useState(initialEnquiry)
  const [lead, setLead] = useState(null)
  const [viewing, setViewing] = useState(initialViewing)
  const [viewingRequest, setViewingRequest] = useState(null)
  const [saved, setSaved] = useState(() => (property ? isPropertySaved(property.slug) : false))
  const [compared, setCompared] = useState(false)

  useEffect(() => {
    if (!property) return
    document.title = `${property.title} | Arch9`
    trackListingEvent({ eventType: 'Property Viewed', property })
  }, [property])

  if (!property) {
    return <NotFound />
  }

  function updateField(key, value) {
    setEnquiry((current) => ({ ...current, [key]: value }))
  }

  function updateViewingField(key, value) {
    setViewing((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const capturedLead = capturePropertyEnquiry({
      property,
      enquiry: {
        ...enquiry,
        fullName: `${enquiry.firstName} ${enquiry.lastName}`.trim(),
        interestedIn: property.title,
      },
    })
    setLead(capturedLead)
  }

  function handleViewingSubmit(event) {
    event.preventDefault()
    const capturedRequest = captureViewingRequest({ property, request: viewing })
    setViewingRequest(capturedRequest)
  }

  function handleSave() {
    setSaved(toggleSavedProperty(property))
  }

  function handleCompare() {
    const next = toggleComparisonProperty(property)
    setCompared(next.some((item) => item.slug === property.slug))
  }

  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />

      <main className="bg-[#F8F4EC] pt-[112px]">
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-8 md:px-8 lg:pb-24">
          <a href="/buy" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#006B4D]">
            <ArrowLeft className="h-4 w-4" />
            Back to properties
          </a>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="overflow-hidden rounded-[42px] border border-[#0A3028]/8 bg-white shadow-[0_28px_90px_rgba(5,8,7,0.09)]">
                <div
                  className="relative flex min-h-[420px] items-end overflow-hidden p-6 md:min-h-[520px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.08) 0%, rgba(5,18,15,0.72) 100%), url(${property.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(135deg,rgba(255,255,255,0.24)_0_1px,transparent_1px_28px)]" />
                  <div className="relative max-w-[560px] rounded-[30px] border border-white/24 bg-white/88 p-6 shadow-[0_20px_70px_rgba(5,8,7,0.16)] backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">{property.status}</p>
                    <h1 className="mt-4 text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-[#05251D] md:text-[4.5rem]">
                      {property.title}
                    </h1>
                    <p className="mt-4 flex items-center gap-2 text-base font-bold text-[#31433D]">
                      <MapPin className="h-5 w-5 text-[#006B4D]" />
                      {property.location}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 border-t border-[#0A3028]/8 p-4 sm:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="h-36 rounded-[24px] bg-[linear-gradient(135deg,#F8F4EC,#FFFFFF)]" />
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-4">
                {property.highlights.map((highlight) => {
                  const Icon = highlight.icon
                  return (
                    <div key={highlight.label} className="rounded-[26px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_16px_44px_rgba(5,8,7,0.05)]">
                      <Icon className="h-5 w-5 text-[#006B4D]" />
                      <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#5B6B64]">{highlight.label}</p>
                      <p className="mt-2 text-lg font-extrabold text-[#05120F]">{highlight.value}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 rounded-[34px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_22px_70px_rgba(5,8,7,0.06)] md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Property details</p>
                <h2 className="mt-4 text-[2.2rem] font-extrabold tracking-[-0.05em] text-[#05251D]">{formatListingPrice(property)}</h2>
                <p className="mt-5 max-w-[780px] text-base leading-8 text-[#4B5B55]">{property.description}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 rounded-[20px] border border-[#0A3028]/8 bg-[#F8F4EC] px-4 py-3 text-sm font-bold text-[#31433D]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#006B4D]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {property.listingType === 'for-sale' ? (
                <div className="mt-8 grid gap-5 xl:grid-cols-2">
                  <BondCalculator property={property} />
                  <AffordabilityCheck property={property} />
                  <TransferCostCalculator property={property} />
                  <RegistrationTrackerPreview />
                </div>
              ) : null}

              <div className="mt-8">
                <AreaInsights property={property} />
              </div>

              <div className="mt-8">
                <SimilarProperties property={property} />
              </div>

              <div className="mt-8">
                <PropertyIntelligenceLinks property={property} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[36px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_28px_90px_rgba(5,8,7,0.1)] md:p-7">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <button
                    type="button"
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-4 text-sm font-extrabold transition ${saved ? 'border-[#006B4D]/30 bg-[#F1FFF8] text-[#006B4D]' : 'border-[#0A3028]/10 bg-[#F8F4EC] text-[#071E1A]'}`}
                    onClick={handleSave}
                  >
                    <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                    {saved ? 'Saved' : 'Save Property'}
                  </button>
                  <button
                    type="button"
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-4 text-sm font-extrabold transition ${compared ? 'border-[#006B4D]/30 bg-[#86E4C2] text-[#05120F]' : 'border-[#0A3028]/10 bg-[#F8F4EC] text-[#071E1A]'}`}
                    onClick={handleCompare}
                  >
                    <Scale className="h-4 w-4" />
                    {compared ? 'Compared' : 'Compare'}
                  </button>
                </div>

                <div className="mt-4 rounded-[28px] border border-[#0A3028]/8 bg-[#F8F4EC] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Agent</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#071E1A] text-[#F3EEE6]">
                      <UserRound className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-[#05120F]">{property.agent.name}</p>
                      <p className="text-sm font-semibold text-[#5B6B64]">{property.agent.role}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2 text-sm font-bold text-[#31433D]">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#006B4D]" />
                      {property.agent.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#006B4D]" />
                      {property.agent.email}
                    </p>
                  </div>
                </div>

                {viewingRequest ? (
                  <div className="mt-5 rounded-[28px] border border-[#24B47E]/30 bg-[#F1FFF8] p-5">
                    <CalendarDays className="h-8 w-8 text-[#006B4D]" />
                    <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#05120F]">Viewing requested.</h2>
                    <p className="mt-3 text-sm leading-6 text-[#4B5B55]">
                      {property.agent.name} will receive an email notification and a CRM appointment activity.
                    </p>
                  </div>
                ) : (
                  <form className="mt-6 space-y-5" onSubmit={handleViewingSubmit}>
                    <div>
                      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">
                        <Clock3 className="h-4 w-4" />
                        Book Viewing
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#5B6B64]">Choose a date and time for this property.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <Field label="Date">
                        <Input required type="date" value={viewing.date} onChange={(event) => updateViewingField('date', event.target.value)} />
                      </Field>
                      <Field label="Time">
                        <Input required type="time" value={viewing.time} onChange={(event) => updateViewingField('time', event.target.value)} />
                      </Field>
                    </div>
                    <Field label="Name">
                      <Input required value={viewing.name} onChange={(event) => updateViewingField('name', event.target.value)} />
                    </Field>
                    <Field label="Email">
                      <Input required type="email" value={viewing.email} onChange={(event) => updateViewingField('email', event.target.value)} />
                    </Field>
                    <Field label="Phone">
                      <Input value={viewing.phone} onChange={(event) => updateViewingField('phone', event.target.value)} />
                    </Field>
                    <Field label="Message">
                      <Textarea
                        value={viewing.message}
                        onChange={(event) => updateViewingField('message', event.target.value)}
                        placeholder={`I would like to view ${property.title}.`}
                      />
                    </Field>
                    <button type="submit" className="bridge-button-primary w-full">
                      Book Viewing
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                {lead ? (
                  <div className="mt-5 rounded-[28px] border border-[#24B47E]/30 bg-[#F1FFF8] p-5">
                    <CheckCircle2 className="h-8 w-8 text-[#006B4D]" />
                    <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#05120F]">Finance enquiry captured.</h2>
                    <p className="mt-3 text-sm leading-6 text-[#4B5B55]">
                      A buyer lead has been prepared for {property.agent.name}. Follow-up workflow: {lead.workflow.nextAction}.
                    </p>
                  </div>
                ) : (
                  <form className="mt-6 space-y-5 border-t border-[#0A3028]/8 pt-6" onSubmit={handleSubmit}>
                    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">
                      <Percent className="h-4 w-4" />
                      Ask about finance or offers
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <Field label="First name">
                        <Input required value={enquiry.firstName} onChange={(event) => updateField('firstName', event.target.value)} />
                      </Field>
                      <Field label="Last name">
                        <Input required value={enquiry.lastName} onChange={(event) => updateField('lastName', event.target.value)} />
                      </Field>
                    </div>
                    <Field label="Email">
                      <Input required type="email" value={enquiry.email} onChange={(event) => updateField('email', event.target.value)} />
                    </Field>
                    <Field label="Message">
                      <Textarea value={enquiry.message} onChange={(event) => updateField('message', event.target.value)} placeholder="I would like help with finance, offer next steps, or transfer readiness." />
                    </Field>
                    <button type="submit" className="bridge-button-secondary w-full border-[#0A3028]/12 bg-[#F8F4EC] text-[#071E1A]">
                      Send Finance Enquiry
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3 rounded-[28px] border border-[#0A3028]/8 bg-white/82 p-4 text-center shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
                <div>
                  <BedDouble className="mx-auto h-5 w-5 text-[#006B4D]" />
                  <p className="mt-2 text-sm font-extrabold">{property.bedrooms}</p>
                </div>
                <div>
                  <Bath className="mx-auto h-5 w-5 text-[#006B4D]" />
                  <p className="mt-2 text-sm font-extrabold">{property.bathrooms}</p>
                </div>
                <div>
                  <CarFront className="mx-auto h-5 w-5 text-[#006B4D]" />
                  <p className="mt-2 text-sm font-extrabold">{property.parking}</p>
                </div>
                <div>
                  <Building2 className="mx-auto h-5 w-5 text-[#006B4D]" />
                  <p className="mt-2 text-sm font-extrabold">{property.size}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
