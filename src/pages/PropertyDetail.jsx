import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Bath, BedDouble, Building2, CheckCircle2, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { findPropertyBySlug, formatPrice } from '../data/properties'
import { capturePropertyEnquiry } from '../lib/leads'

const initialEnquiry = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
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

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="mt-3 min-h-[130px] w-full rounded-[18px] border border-[#0A3028]/10 bg-white px-4 py-3 text-sm font-bold text-[#05120F] outline-none transition placeholder:text-[#8A978F] focus:border-[#006B4D]"
    />
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
        <a href="/properties" className="bridge-button-primary mt-8">
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

  useEffect(() => {
    if (!property) return
    document.title = `${property.title} | Arch9`
  }, [property])

  if (!property) {
    return <NotFound />
  }

  function updateField(key, value) {
    setEnquiry((current) => ({ ...current, [key]: value }))
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

  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />

      <main className="bg-[#F8F4EC] pt-[112px]">
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-8 md:px-8 lg:pb-24">
          <a href="/properties" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#006B4D]">
            <ArrowLeft className="h-4 w-4" />
            Back to properties
          </a>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="overflow-hidden rounded-[42px] border border-[#0A3028]/8 bg-white shadow-[0_28px_90px_rgba(5,8,7,0.09)]">
                <div className="relative flex min-h-[420px] items-end overflow-hidden bg-[radial-gradient(circle_at_72%_22%,rgba(134,228,194,0.25),transparent_30%),linear-gradient(135deg,#071E1A_0%,#123C33_38%,#F8F4EC_100%)] p-6 md:min-h-[520px]">
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
                <h2 className="mt-4 text-[2.2rem] font-extrabold tracking-[-0.05em] text-[#05251D]">{formatPrice(property.price)}</h2>
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
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[36px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_28px_90px_rgba(5,8,7,0.1)] md:p-7">
                <div className="rounded-[28px] border border-[#0A3028]/8 bg-[#F8F4EC] p-5">
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

                {lead ? (
                  <div className="mt-5 rounded-[28px] border border-[#24B47E]/30 bg-[#F1FFF8] p-5">
                    <CheckCircle2 className="h-8 w-8 text-[#006B4D]" />
                    <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#05120F]">Enquiry captured.</h2>
                    <p className="mt-3 text-sm leading-6 text-[#4B5B55]">
                      A buyer lead has been prepared for {property.agent.name}. Follow-up workflow: {lead.workflow.nextAction}.
                    </p>
                  </div>
                ) : (
                  <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
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
                    <Field label="Phone">
                      <Input value={enquiry.phone} onChange={(event) => updateField('phone', event.target.value)} />
                    </Field>
                    <Field label="Message">
                      <Textarea
                        value={enquiry.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        placeholder={`I am interested in ${property.title}.`}
                      />
                    </Field>
                    <button type="submit" className="bridge-button-primary w-full">
                      Enquire Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 rounded-[28px] border border-[#0A3028]/8 bg-white/82 p-4 text-center shadow-[0_18px_54px_rgba(5,8,7,0.06)]">
                <div>
                  <BedDouble className="mx-auto h-5 w-5 text-[#006B4D]" />
                  <p className="mt-2 text-sm font-extrabold">{property.bedrooms}</p>
                </div>
                <div>
                  <Bath className="mx-auto h-5 w-5 text-[#006B4D]" />
                  <p className="mt-2 text-sm font-extrabold">{property.bathrooms}</p>
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
