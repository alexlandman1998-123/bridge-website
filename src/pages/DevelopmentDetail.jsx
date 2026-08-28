import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { captureDevelopmentEnquiry } from '../lib/developmentLeads'
import { findDevelopmentBySlug, formatDevelopmentPrice } from '../data/developments'
import { setPageSeo } from '../lib/seo'

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
    setPageSeo({
      title: 'Development not found | Arch9',
      description: 'This Arch9 development is not available.',
      canonicalPath: '/solutions/developers',
      indexable: false,
    })
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-[900px] flex-col items-center justify-center px-6 pt-[120px] text-center">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Development unavailable</p>
        <h1 className="mt-5 text-[3rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-[#05251D] md:text-[4.5rem]">
          This development is not available.
        </h1>
        <p className="mt-5 max-w-[560px] text-lg leading-8 text-[#4B5B55]">
          The release may have moved, been removed, or is not yet published on the Arch9 public network.
        </p>
        <a href="/developments" className="bridge-button-primary mt-8">
          Back to developments
          <ArrowRight className="h-4 w-4" />
        </a>
      </main>
      <Footer />
    </div>
  )
}

export default function DevelopmentDetail({ slug }) {
  const development = findDevelopmentBySlug(slug)
  const [enquiry, setEnquiry] = useState(initialEnquiry)
  const [lead, setLead] = useState(null)

  useEffect(() => {
    if (!development) return
    setPageSeo({
      title: `${development.title} | Arch9`,
      description: `${development.title} in ${development.area}, ${development.city}. This development page is no longer part of the active Arch9 public sitemap.`,
      canonicalPath: window.location.pathname,
      indexable: false,
    })
  }, [development])

  if (!development) {
    return <NotFound />
  }

  function updateField(key, value) {
    setEnquiry((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const capturedLead = captureDevelopmentEnquiry({
      development,
      enquiry: {
        ...enquiry,
        fullName: `${enquiry.firstName} ${enquiry.lastName}`.trim(),
        interestedIn: development.title,
      },
    })
    setLead(capturedLead)
  }

  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />

      <main className="bg-[#F8F4EC] pt-[112px]">
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-8 md:px-8 lg:pb-24">
          <a href="/developments" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#006B4D]">
            <ArrowLeft className="h-4 w-4" />
            Back to developments
          </a>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="overflow-hidden rounded-[42px] border border-[#0A3028]/8 bg-white shadow-[0_28px_90px_rgba(5,8,7,0.09)]">
                <div
                  className="relative flex min-h-[420px] items-end overflow-hidden p-6 md:min-h-[520px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.04) 0%, rgba(5,18,15,0.72) 100%), url(${development.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,rgba(255,255,255,0.22)_0_1px,transparent_1px_28px)]" />
                  <div className="relative max-w-[560px] rounded-[30px] border border-white/24 bg-white/90 p-6 shadow-[0_20px_70px_rgba(5,8,7,0.16)] backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">{development.status}</p>
                    <h1 className="mt-4 text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.055em] text-[#05251D] md:text-[4.5rem]">
                      {development.title}
                    </h1>
                    <p className="mt-4 flex items-center gap-2 text-base font-bold text-[#31433D]">
                      <MapPin className="h-5 w-5 text-[#006B4D]" />
                      {development.area}
                    </p>
                    <div className="mt-5 inline-flex rounded-full border border-[#0A3028]/10 bg-[#F8F4EC] px-4 py-2 text-sm font-extrabold text-[#05120F]">
                      {formatDevelopmentPrice(development)}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 border-t border-[#0A3028]/8 p-4 sm:grid-cols-3">
                  {['Masterplan', 'Availability', 'Location'].map((item) => (
                    <div key={item} className="h-36 rounded-[24px] bg-[linear-gradient(135deg,#F8F4EC,#FFFFFF)]" />
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-4">
                {development.highlights.map((highlight) => {
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
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">Development details</p>
                <h2 className="mt-4 text-[2.2rem] font-extrabold tracking-[-0.05em] text-[#05251D]">{formatDevelopmentPrice(development)}</h2>
                <p className="mt-5 max-w-[780px] text-base leading-8 text-[#4B5B55]">{development.description}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {development.features.map((feature) => (
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
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Development sales</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#071E1A] text-[#F3EEE6]">
                      <UserRound className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-[#05120F]">{development.developer}</p>
                      <p className="text-sm font-semibold text-[#5B6B64]">Development desk</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2 text-sm font-bold text-[#31433D]">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#006B4D]" />
                      +27 12 555 0102
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#006B4D]" />
                      developments@arch9.co.za
                    </p>
                  </div>
                </div>

                {lead ? (
                  <div className="mt-5 rounded-[28px] border border-[#24B47E]/30 bg-[#F1FFF8] p-5">
                    <CheckCircle2 className="h-8 w-8 text-[#006B4D]" />
                    <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#05120F]">Enquiry captured.</h2>
                    <p className="mt-3 text-sm leading-6 text-[#4B5B55]">
                      A development lead has been prepared for the team. Follow-up workflow: {lead.workflow.nextAction}.
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
                        placeholder={`I would like to learn more about ${development.title}.`}
                      />
                    </Field>
                    <button type="submit" className="bridge-button-primary w-full">
                      Enquire Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
