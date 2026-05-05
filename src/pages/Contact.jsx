import { useEffect, useMemo, useState } from 'react'
import { Building2, CheckCircle2, FolderKanban, Users, Workflow } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const moduleOptions = [
  'Developer Module',
  'Agent Module',
  'Attorney Module',
  'Bond Originator Module',
  'Client Portal',
]

const roleOptions = [
  'Developer',
  'Estate Agent',
  'Conveyancer / Attorney',
  'Bond Originator',
  'Managing Agent',
  'Leadership / Operations',
  'Other',
]

const teamSizeOptions = ['1-10', '11-25', '26-50', '51-100', '100+']
const timelineOptions = ['Immediately', 'Within 30 days', 'This quarter', 'Exploring']

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

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7760]">
        {label}
      </span>
      {children}
      {hint ? <p className="mt-2 text-sm text-[#7a6f62]">{hint}</p> : null}
    </label>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
    />
  )
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="mt-3 min-h-[130px] w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
    />
  )
}

function Select(props) {
  return (
    <select
      {...props}
      className="mt-3 w-full rounded-[18px] border border-[#e4d8cb] bg-white px-4 py-3 text-[#171412] outline-none transition focus:border-[#b79e7f]"
    />
  )
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Book a Demo | Bridge 9'
  }, [])

  const selectedModulesLabel = useMemo(() => {
    if (form.modules.length === 0) {
      return 'No modules selected yet'
    }
    return form.modules.join(', ')
  }, [form.modules])

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
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
      'bridge9_demo_request',
      JSON.stringify({ ...form, submittedAt: new Date().toISOString() })
    )
    setSubmitted(true)
  }

  return (
    <div className="bridge-site-bg min-h-screen text-[#171412]">
      <Header />

      <main className="py-10 lg:py-14">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <section className="rounded-[34px] border border-[#e5dacb] bg-white/82 p-8 shadow-[0_22px_60px_rgba(23,20,18,0.06)] backdrop-blur-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b7760]">
              Book a demo
            </p>
            <h1 className="mt-5 text-[3.3rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#171412]">
              Bring the right context into the first conversation.
            </h1>
            <p className="mt-5 text-[1rem] leading-8 text-[#6d6257]">
              Tell us how your team currently handles deals, documents, handoffs, and client updates. We will use that to shape the most relevant walkthrough.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Building2,
                  title: 'Business context',
                  copy: 'What type of property workflow you manage and how the transaction moves today.',
                },
                {
                  icon: FolderKanban,
                  title: 'Module fit',
                  copy: 'Which Bridge 9 module matters first and what the rollout should cover.',
                },
                {
                  icon: Workflow,
                  title: 'Workflow friction',
                  copy: 'Where visibility, documents, or client updates are breaking down.',
                },
                {
                  icon: Users,
                  title: 'Decision context',
                  copy: 'Who needs to see this and how quickly you want to move.',
                },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="rounded-[24px] border border-[#e7dccf] bg-[#fcf8f2] p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-[#e7dccf] bg-white text-[#6d5c4a]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.04em] text-[#171412]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#6f6457]">{item.copy}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="rounded-[34px] border border-[#e5dacb] bg-white p-8 shadow-[0_22px_60px_rgba(23,20,18,0.06)]">
            {submitted ? (
              <div className="rounded-[28px] border border-[#dfd1c0] bg-[#fffaf4] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171412] text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-[2rem] font-semibold tracking-[-0.05em] text-[#171412]">
                  Request captured.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#6f6457]">
                  We saved your request locally. Selected modules:
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
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b7760]">
                  Conversation form
                </p>
                <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] text-[#171412]">
                  Tell us how your transaction workflow works today.
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6f6457]">
                  Specific answers make the first demo more useful.
                </p>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="First Name">
                      <Input required value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} />
                    </Field>
                    <Field label="Last Name">
                      <Input required value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Work Email">
                      <Input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
                    </Field>
                    <Field label="Phone">
                      <Input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company">
                      <Input required value={form.company} onChange={(event) => updateField('company', event.target.value)} />
                    </Field>
                    <Field label="Role">
                      <Select required value={form.role} onChange={(event) => updateField('role', event.target.value)}>
                        <option value="">Select role</option>
                        {roleOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Team Size">
                      <Select value={form.teamSize} onChange={(event) => updateField('teamSize', event.target.value)}>
                        <option value="">Select size</option>
                        {teamSizeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Timeline">
                      <Select value={form.timeline} onChange={(event) => updateField('timeline', event.target.value)}>
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <Field label="Which modules matter first?" hint="Select the views or workflows you want to improve first.">
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {moduleOptions.map((module) => {
                        const active = form.modules.includes(module)

                        return (
                          <button
                            key={module}
                            type="button"
                            onClick={() => toggleModule(module)}
                            className={`rounded-[18px] border px-4 py-3 text-left text-sm transition ${
                              active
                                ? 'border-[#171412] bg-[#171412] text-white'
                                : 'border-[#e4d8cb] bg-[#fcf8f2] text-[#171412]'
                            }`}
                          >
                            {module}
                          </button>
                        )
                      })}
                    </div>
                  </Field>

                  <Field label="Current Workflow" hint="How does a typical transaction move through your team today?">
                    <Textarea value={form.currentWorkflow} onChange={(event) => updateField('currentWorkflow', event.target.value)} />
                  </Field>

                  <Field label="Biggest Challenge">
                    <Textarea value={form.biggestChallenge} onChange={(event) => updateField('biggestChallenge', event.target.value)} />
                  </Field>

                  <Field label="What should success look like?">
                    <Textarea value={form.goals} onChange={(event) => updateField('goals', event.target.value)} />
                  </Field>

                  <Field label="Anything else we should know?">
                    <Textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} />
                  </Field>

                  <button type="submit" className="bridge-button-primary w-full justify-center">
                    Send Demo Request
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
