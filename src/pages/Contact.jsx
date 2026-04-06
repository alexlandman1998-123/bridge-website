import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, FolderKanban, Users, Workflow } from 'lucide-react'

const moduleOptions = [
  'Bridge For Developers',
  'Bridge For Agents',
  'Bridge For Conveyancers',
  'Bridge For Bond Originators',
  'Bridge Listings',
  'Bridge Link',
]

const roleOptions = [
  'Developer',
  'Agent',
  'Conveyancer',
  'Bond Originator',
  'Operations / Leadership',
  'Other',
]

const timelineOptions = ['Immediately', 'Within 30 days', 'This quarter', 'Exploring']

const teamSizeOptions = ['1-10', '11-25', '26-50', '51-100', '100+']

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  teamSize: '',
  modules: [],
  currentWorkflow: '',
  biggestChallenge: '',
  goals: '',
  timeline: '',
  notes: '',
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7760]">
        {label}
      </span>
      {children}
      {hint ? <p className="mt-2 text-sm text-[#7b6f61]">{hint}</p> : null}
    </label>
  )
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const selectedModulesLabel = useMemo(() => {
    if (form.modules.length === 0) {
      return 'No modules selected yet'
    }

    return form.modules.join(', ')
  }, [form.modules])

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function toggleModule(module) {
    setForm((current) => ({
      ...current,
      modules: current.modules.includes(module)
        ? current.modules.filter((item) => item !== module)
        : [...current.modules, module],
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    localStorage.setItem(
      'bridge_contact_request',
      JSON.stringify({
        ...form,
        submittedAt: new Date().toISOString(),
      })
    )
    setSubmitted(true)
  }

  return (
    <div className="bridge-site-bg min-h-screen text-[#171412]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(247,243,237,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-8">
          <a href="/" className="text-[1.05rem] font-semibold tracking-[0.22em] text-[#171412]">
            BRIDGE
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="/" className="bridge-button-secondary px-5 py-2.5">
              <ArrowLeft className="h-4 w-4" />
              Back Home
            </a>
            <a href="/#roles" className="bridge-button-primary px-6 py-2.5">
              View Developments
            </a>
          </div>
        </div>
      </header>

      <main className="px-4 py-10 lg:px-6 lg:py-14">
        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,#f6f2eb_0%,#f3ede4_100%)] p-8 shadow-[0_18px_50px_rgba(19,17,15,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b7760]">
              Contact
            </p>
            <h1 className="mt-5 max-w-[640px] text-[3.1rem] font-semibold leading-[0.94] tracking-[-0.07em] text-[#171412] sm:text-[4rem]">
              Start the right conversation with the right context.
            </h1>
            <p className="mt-5 max-w-[600px] text-[1rem] leading-8 text-[#6d6357]">
              Tell us about your team, the modules you need, and where your transaction workflow is getting stuck. We will use this to shape the right first conversation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Building2,
                  title: 'Company context',
                  copy: 'Who you are, how your team is structured, and what part of the transaction you own.',
                },
                {
                  icon: FolderKanban,
                  title: 'Module fit',
                  copy: 'Which Bridge modules matter first and what the first rollout should cover.',
                },
                {
                  icon: Workflow,
                  title: 'Workflow reality',
                  copy: 'What your current deal flow looks like and where the friction sits today.',
                },
                {
                  icon: Users,
                  title: 'Decision context',
                  copy: 'Who needs to see this, what success looks like, and how quickly you want to move.',
                },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="bridge-glass rounded-[24px] p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e6dbcf] bg-[#faf5ef] text-[#6f5a45]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-[1.2rem] font-semibold tracking-[-0.04em] text-[#171412]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#6f6457]">{item.copy}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 rounded-[28px] border border-[#1d1a17] bg-[linear-gradient(180deg,#161311_0%,#1d1a17_100%)] p-6 text-white shadow-[0_20px_54px_rgba(19,17,15,0.16)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b3a595]">
                What we need from you
              </p>
              <div className="mt-5 space-y-3">
                {[
                  'Which part of the transaction you want to improve first.',
                  'Which roles need to work in the same system.',
                  'What tools, spreadsheets, or handoffs you are replacing.',
                  'What success should look like in the first rollout.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#eadcc7]" />
                    <p className="text-sm leading-7 text-[#c9c0b5]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[36px] border border-[#e9dfd5] bg-[linear-gradient(180deg,#ffffff_0%,#faf6f0_100%)] p-8 shadow-[0_16px_40px_rgba(19,17,15,0.06)]">
            {submitted ? (
              <div className="rounded-[28px] border border-[#dfd1c0] bg-[#fffaf4] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171412] text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-[2rem] font-semibold tracking-[-0.05em] text-[#171412]">
                  Request captured.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#6f6457]">
                  We have saved your request locally with the full context below. The selected modules are:
                </p>
                <p className="mt-4 text-sm font-medium text-[#171412]">{selectedModulesLabel}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href="/" className="bridge-button-primary justify-center">
                    Return Home
                  </a>
                  <button
                    type="button"
                    className="bridge-button-secondary justify-center"
                    onClick={() => {
                      setForm(initialForm)
                      setSubmitted(false)
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8f7c67]">
                  Conversation form
                </p>
                <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] text-[#171412]">
                  Give us the operational context.
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6f6457]">
                  The more specific this is, the better the first conversation will be.
                </p>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="First Name">
                      <input
                        required
                        value={form.firstName}
                        onChange={(event) => updateField('firstName', event.target.value)}
                        className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                      />
                    </Field>
                    <Field label="Last Name">
                      <input
                        required
                        value={form.lastName}
                        onChange={(event) => updateField('lastName', event.target.value)}
                        className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Work Email">
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                      />
                    </Field>
                    <Field label="Phone Number">
                      <input
                        value={form.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company Name">
                      <input
                        required
                        value={form.company}
                        onChange={(event) => updateField('company', event.target.value)}
                        className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                      />
                    </Field>
                    <Field label="Your Role">
                      <select
                        required
                        value={form.role}
                        onChange={(event) => updateField('role', event.target.value)}
                        className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                      >
                        <option value="">Select role</option>
                        {roleOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Team Size">
                      <select
                        required
                        value={form.teamSize}
                        onChange={(event) => updateField('teamSize', event.target.value)}
                        className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                      >
                        <option value="">Select size</option>
                        {teamSizeOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Desired Timeline">
                      <select
                        required
                        value={form.timeline}
                        onChange={(event) => updateField('timeline', event.target.value)}
                        className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field
                    label="Modules You Want to Explore First"
                    hint="Select the parts of Bridge that matter to the first conversation."
                  >
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {moduleOptions.map((item) => {
                        const active = form.modules.includes(item)

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleModule(item)}
                            className={`rounded-[20px] border px-4 py-4 text-left transition ${
                              active
                                ? 'border-[#171412] bg-[#171412] text-white'
                                : 'border-[#e4d8cb] bg-white text-[#171412] hover:border-[#b79e7f]'
                            }`}
                          >
                            <span className="text-sm font-medium">{item}</span>
                          </button>
                        )
                      })}
                    </div>
                  </Field>

                  <Field
                    label="Current Workflow / Tools"
                    hint="Example: spreadsheets, WhatsApp, email threads, CRM, shared drives."
                  >
                    <textarea
                      required
                      rows={4}
                      value={form.currentWorkflow}
                      onChange={(event) => updateField('currentWorkflow', event.target.value)}
                      className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                    />
                  </Field>

                  <Field
                    label="Biggest Challenge"
                    hint="What is breaking down in the current transaction process?"
                  >
                    <textarea
                      required
                      rows={4}
                      value={form.biggestChallenge}
                      onChange={(event) => updateField('biggestChallenge', event.target.value)}
                      className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                    />
                  </Field>

                  <Field
                    label="Desired Outcomes"
                    hint="What should improve if Bridge is the right fit?"
                  >
                    <textarea
                      required
                      rows={4}
                      value={form.goals}
                      onChange={(event) => updateField('goals', event.target.value)}
                      className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                    />
                  </Field>

                  <Field label="Anything Else We Should Know?">
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(event) => updateField('notes', event.target.value)}
                      className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
                    />
                  </Field>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="submit" className="bridge-button-primary justify-center">
                      Submit Context
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <a href="/" className="bridge-button-secondary justify-center">
                      Back Home
                    </a>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
