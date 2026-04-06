import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  X,
} from 'lucide-react'

const SIGNUP_DRAFT_KEY = 'bridge-signup-draft'
const SIGNUP_REQUESTS_KEY = 'bridge-signup-requests'
const LAST_LOGIN_KEY = 'bridge-last-login-email'

const moduleOptions = {
  developer: {
    label: 'Developer workspace',
    description: 'Portfolio visibility, stock flow, and multi-development reporting.',
    billingLabel: 'Portfolio-based setup',
    helper: 'Best when pricing depends on developments, seats, and transaction volume.',
  },
  conveyancer: {
    label: 'Conveyancer operations',
    description: 'Legal workflow control, document readiness, and team coordination.',
    billingLabel: 'Team + matter volume',
    helper: 'Best when billing depends on seats and monthly matters.',
  },
  agency: {
    label: 'Agency collaboration',
    description: 'Sales-side transaction visibility and buyer communication.',
    billingLabel: 'Office + user setup',
    helper: 'Best when billing depends on office users and active transaction flow.',
  },
}

function getInitialSignupForm() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyType: '',
    phoneNumber: '',
    module: 'developer',
    billingCycle: 'annual',
    billingName: '',
    billingEmail: '',
    vatNumber: '',
    seats: '5',
    activeDevelopments: '2',
    monthlyTransactions: '25',
  }
}

function safeStorageGet(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function safeStorageSet(key, value) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

function safeStorageRemove(key) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(key)
  } catch {
    return
  }
}

function resolveAppUrl() {
  const configured = import.meta.env.VITE_BRIDGE_APP_URL
  return configured ? configured.replace(/\/$/, '') : ''
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#2e2823]">{label}</span>
      {children}
      {hint ? <span className="mt-2 block text-xs leading-5 text-[#7f7367]">{hint}</span> : null}
    </label>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-[#e7ddd2] bg-white px-4 py-3 text-sm text-[#171412] outline-none transition placeholder:text-[#a09385] focus:border-[#b79a79] focus:ring-2 focus:ring-[#eadcc7]/60 ${props.className || ''}`}
    />
  )
}

function SummaryPill({ label, value }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.05] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#9f9180]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[#faf6f0]">{value}</p>
    </div>
  )
}

export default function AuthModal({ initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode)
  const [signupStep, setSignupStep] = useState('account')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState(() => {
    const savedDraft = safeStorageGet(SIGNUP_DRAFT_KEY, null)
    return savedDraft ? { ...getInitialSignupForm(), ...savedDraft } : getInitialSignupForm()
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const appUrl = useMemo(() => resolveAppUrl(), [])

  useEffect(() => {
    if (mode !== 'signup') {
      return
    }

    safeStorageSet(SIGNUP_DRAFT_KEY, signupForm)
  }, [mode, signupForm])

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [onClose])

  function updateSignupField(field, value) {
    setSignupForm((current) => ({ ...current, [field]: value }))
  }

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
    setSuccess('')
    setSubmitted(null)
    if (nextMode === 'signup') {
      setSignupStep('account')
    }
  }

  function validateLogin() {
    if (!loginForm.email.trim()) {
      return 'Email is required.'
    }

    if (!loginForm.password.trim()) {
      return 'Password is required.'
    }

    return ''
  }

  function validateAccountStep() {
    if (!signupForm.firstName.trim() || !signupForm.lastName.trim()) {
      return 'Name and surname are required.'
    }

    if (!signupForm.email.trim()) {
      return 'Email is required.'
    }

    if (!signupForm.password.trim()) {
      return 'Password is required.'
    }

    if (signupForm.password.length < 6) {
      return 'Password must be at least 6 characters.'
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      return 'Passwords do not match.'
    }

    return ''
  }

  function validateCompanyStep() {
    if (!signupForm.companyName.trim()) {
      return 'Company name is required.'
    }

    if (!signupForm.companyType.trim()) {
      return 'Company type is required.'
    }

    if (!signupForm.phoneNumber.trim()) {
      return 'Phone number is required.'
    }

    return ''
  }

  function validateModuleStep() {
    if (!signupForm.module.trim()) {
      return 'Select a module.'
    }

    return ''
  }

  function validateBillingStep() {
    if (!signupForm.billingName.trim()) {
      return 'Billing contact name is required.'
    }

    if (!signupForm.billingEmail.trim()) {
      return 'Billing email is required.'
    }

    return ''
  }

  function getBillingSummary() {
    if (signupForm.module === 'developer') {
      return `${signupForm.activeDevelopments || '1'} developments · ${signupForm.seats || '5'} seats · ${signupForm.monthlyTransactions || '25'} active transactions`
    }

    if (signupForm.module === 'conveyancer') {
      return `${signupForm.seats || '5'} team seats · ${signupForm.monthlyTransactions || '25'} matters/month`
    }

    return `${signupForm.seats || '5'} sales users · ${signupForm.monthlyTransactions || '25'} active deals/month`
  }

  function handleLoginSubmit(event) {
    event.preventDefault()

    const validationError = validateLogin()
    if (validationError) {
      setError(validationError)
      setSuccess('')
      return
    }

    setError('')
    safeStorageSet(LAST_LOGIN_KEY, { email: loginForm.email.trim(), requestedAt: new Date().toISOString() })

    if (appUrl && typeof window !== 'undefined') {
      window.location.href = `${appUrl}/auth`
      return
    }

    setSuccess('Login flow is ready. Add `VITE_BRIDGE_APP_URL` to redirect existing users into the live app.')
  }

  function handleSignupContinue(event) {
    event.preventDefault()

    const validationError =
      signupStep === 'account'
        ? validateAccountStep()
        : signupStep === 'company'
          ? validateCompanyStep()
          : signupStep === 'module'
            ? validateModuleStep()
            : ''

    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setSignupStep((current) =>
      current === 'account'
        ? 'company'
        : current === 'company'
          ? 'module'
          : 'billing'
    )
  }

  function handleSignupSubmit(event) {
    event.preventDefault()

    const validationError = validateBillingStep()
    if (validationError) {
      setError(validationError)
      return
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      person: {
        firstName: signupForm.firstName.trim(),
        lastName: signupForm.lastName.trim(),
        email: signupForm.email.trim(),
      },
      company: {
        name: signupForm.companyName.trim(),
        type: signupForm.companyType.trim(),
        phoneNumber: signupForm.phoneNumber.trim(),
      },
      module: {
        key: signupForm.module,
        label: moduleOptions[signupForm.module].label,
        seats: Number(signupForm.seats || 0),
        activeDevelopments: Number(signupForm.activeDevelopments || 0),
        monthlyTransactions: Number(signupForm.monthlyTransactions || 0),
      },
      billing: {
        cycle: signupForm.billingCycle,
        contactName: signupForm.billingName.trim(),
        contactEmail: signupForm.billingEmail.trim(),
        vatNumber: signupForm.vatNumber.trim(),
      },
    }

    const existingRequests = safeStorageGet(SIGNUP_REQUESTS_KEY, [])
    safeStorageSet(SIGNUP_REQUESTS_KEY, [payload, ...existingRequests])
    safeStorageRemove(SIGNUP_DRAFT_KEY)
    setSubmitted(payload)
    setSuccess('Signup request captured. Next step is workspace provisioning and billing activation.')
    setError('')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(12,10,9,0.52)] px-4 py-8 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          className="max-h-[92vh] w-full max-w-[1080px] overflow-hidden rounded-[36px] border border-[#29231d] bg-[linear-gradient(180deg,#f8f4ee_0%,#f6f1ea_100%)] shadow-[0_40px_140px_rgba(15,12,10,0.3)]"
          onClick={(event) => event.stopPropagation()}
        >
            <div className="grid min-h-[640px] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-black/5 bg-[linear-gradient(180deg,#171412_0%,#201d19_100%)] p-7 text-white lg:border-b-0 lg:border-r lg:border-white/8 lg:p-8">
                <div className="flex items-center justify-between">
                  <div className="text-[0.95rem] font-semibold tracking-[0.22em] text-[#faf6f0]">
                    BRIDGE
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#faf6f0]"
                    aria-label="Close app access modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b3a595]">
                  {mode === 'login' ? 'Launch the app' : 'Create workspace'}
                </p>
                <h2 className="mt-3 text-[2rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#faf6f0]">
                  {mode === 'login'
                    ? 'Existing users go straight into the app.'
                    : 'New teams complete a more detailed setup flow.'}
                </h2>
                <p className="mt-4 max-w-[440px] text-sm leading-7 text-[#c9c0b5]">
                  {mode === 'login'
                    ? 'Login stays simple: validate credentials and send the user into the live product.'
                    : 'Signup captures the user, company, module choice, and billing setup before a workspace is provisioned.'}
                </p>

                <div className="mt-6 space-y-3">
                  {mode === 'login' ? (
                    <>
                      <SummaryPill label="Flow" value="Email + password" />
                      <SummaryPill label="Outcome" value={appUrl ? 'Redirect to live app auth' : 'Ready to redirect once app URL is configured'} />
                      <SummaryPill label="Stored locally" value="Last login email for smoother relaunch" />
                    </>
                  ) : (
                    <>
                      <SummaryPill label="Step 1" value="Name, surname, email, password" />
                      <SummaryPill label="Step 2" value="Company details and operating module" />
                      <SummaryPill label="Step 3" value="Billing contact and module-based setup" />
                    </>
                  )}
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#a19382]">
                    Module logic
                  </p>
                  <div className="mt-4 grid gap-3">
                    {Object.values(moduleOptions).map((item) => (
                      <div key={item.label} className="rounded-[18px] border border-white/8 bg-black/10 px-4 py-4">
                        <div className="text-sm font-semibold text-[#faf6f0]">{item.label}</div>
                        <div className="mt-1 text-sm leading-6 text-[#c9c0b5]">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col overflow-hidden">
                <div className="border-b border-black/5 px-6 py-4 lg:px-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[1.35rem] font-semibold tracking-[-0.04em] text-[#171412]">
                        {mode === 'login' ? 'Launch App' : 'Sign Up'}
                      </h3>
                      <p className="mt-1 text-sm text-[#726659]">
                        {mode === 'login'
                          ? 'Keep existing-user entry quick and obvious.'
                          : 'Capture the details needed to provision the right Bridge workspace.'}
                      </p>
                    </div>

                    <div className="flex shrink-0 rounded-full border border-[#e5dace] bg-white/80 p-1">
                      <button
                        type="button"
                        onClick={() => switchMode('login')}
                        className={`min-w-[96px] whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'login' ? 'bg-[#171412] text-white' : 'text-[#6f6457]'}`}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => switchMode('signup')}
                        className={`min-w-[108px] whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'signup' ? 'bg-[#171412] text-white' : 'text-[#6f6457]'}`}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 lg:px-8">
                  {mode === 'login' ? (
                    <form className="mx-auto max-w-[560px] space-y-4" onSubmit={handleLoginSubmit}>
                      <Field label="Email">
                        <Input
                          type="email"
                          value={loginForm.email}
                          onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                          placeholder="you@company.com"
                          autoComplete="email"
                        />
                      </Field>

                      <Field label="Password">
                        <Input
                          type="password"
                          value={loginForm.password}
                          onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                          placeholder="Your password"
                          autoComplete="current-password"
                        />
                      </Field>

                      <div className="rounded-[22px] border border-[#ece2d8] bg-white/80 p-4">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="mt-0.5 h-5 w-5 text-[#8c7458]" />
                          <div>
                            <p className="text-sm font-semibold text-[#171412]">Simple login flow</p>
                            <p className="mt-1 text-sm leading-6 text-[#6f6457]">
                              Validate credentials, keep the UI lightweight, and send existing users into the real app.
                            </p>
                          </div>
                        </div>
                      </div>

                      {error ? <p className="rounded-2xl border border-[#e9c6c2] bg-[#fff2f0] px-4 py-3 text-sm text-[#8a3b34]">{error}</p> : null}
                      {success ? <p className="rounded-2xl border border-[#d8e8d6] bg-[#f1faf0] px-4 py-3 text-sm text-[#2f6b38]">{success}</p> : null}

                      <button type="submit" className="bridge-button-primary w-full whitespace-nowrap">
                        Launch App
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  ) : submitted ? (
                    <div className="mx-auto max-w-[640px]">
                      <div className="rounded-[28px] border border-[#dce8d9] bg-[#f4fbf2] p-6">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-6 w-6 text-[#2f6b38]" />
                          <div>
                            <h4 className="text-lg font-semibold text-[#171412]">Signup request captured</h4>
                            <p className="mt-2 text-sm leading-7 text-[#5f5449]">
                              We now have the user, company, module, and billing details needed to provision the workspace and finish activation.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[24px] border border-[#ece2d8] bg-white/90 p-5">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7a65]">Contact</p>
                          <p className="mt-3 text-sm font-semibold text-[#171412]">
                            {submitted.person.firstName} {submitted.person.lastName}
                          </p>
                          <p className="mt-1 text-sm text-[#6f6457]">{submitted.person.email}</p>
                        </div>
                        <div className="rounded-[24px] border border-[#ece2d8] bg-white/90 p-5">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7a65]">Workspace</p>
                          <p className="mt-3 text-sm font-semibold text-[#171412]">{submitted.company.name}</p>
                          <p className="mt-1 text-sm text-[#6f6457]">{submitted.module.label}</p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-[28px] border border-[#1d1a17] bg-[linear-gradient(180deg,#171412_0%,#201d19_100%)] p-6 text-white">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-[#a59584]">Billing summary</p>
                        <p className="mt-3 text-base font-semibold text-[#faf6f0]">{getBillingSummary()}</p>
                        <p className="mt-2 text-sm leading-6 text-[#c9c0b5]">
                          {submitted.billing.cycle === 'annual' ? 'Annual' : 'Monthly'} billing · {submitted.billing.contactEmail}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          className="bridge-button-primary"
                          onClick={() => {
                            if (appUrl && typeof window !== 'undefined') {
                              window.location.href = `${appUrl}/auth`
                            }
                          }}
                          disabled={!appUrl}
                        >
                          Launch App
                        </button>
                        <button
                          type="button"
                          className="bridge-button-secondary"
                          onClick={onClose}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mx-auto max-w-[760px]">
                      <div className="mb-5 flex flex-wrap items-center gap-2">
                        {[
                          ['account', 'Account'],
                          ['company', 'Company'],
                          ['module', 'Module'],
                          ['billing', 'Billing'],
                        ].map(([key, label], index) => {
                          const active = signupStep === key
                          const complete =
                            (key === 'account' && ['company', 'module', 'billing'].includes(signupStep)) ||
                            (key === 'company' && ['module', 'billing'].includes(signupStep)) ||
                            (key === 'module' && signupStep === 'billing')

                          return (
                            <div key={key} className="flex items-center gap-2">
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                                  active || complete
                                    ? 'border-[#171412] bg-[#171412] text-white'
                                    : 'border-[#e5dace] bg-white text-[#7d7062]'
                                }`}
                              >
                                {index + 1}
                              </div>
                              <span className={`text-sm ${active ? 'font-semibold text-[#171412]' : 'text-[#7d7062]'}`}>
                                {label}
                              </span>
                              {index < 3 ? <div className="mx-1 h-px w-8 bg-[#e5dace]" /> : null}
                            </div>
                          )
                        })}
                      </div>

                      <form
                        className="space-y-4"
                        onSubmit={signupStep === 'billing' ? handleSignupSubmit : handleSignupContinue}
                      >
                        {signupStep === 'account' ? (
                          <>
                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Name">
                                <Input
                                  type="text"
                                  value={signupForm.firstName}
                                  onChange={(event) => updateSignupField('firstName', event.target.value)}
                                  placeholder="Alex"
                                  autoComplete="given-name"
                                />
                              </Field>
                              <Field label="Surname">
                                <Input
                                  type="text"
                                  value={signupForm.lastName}
                                  onChange={(event) => updateSignupField('lastName', event.target.value)}
                                  placeholder="Landman"
                                  autoComplete="family-name"
                                />
                              </Field>
                            </div>

                            <Field label="Work Email">
                              <Input
                                type="email"
                                value={signupForm.email}
                                onChange={(event) => updateSignupField('email', event.target.value)}
                                placeholder="you@company.com"
                                autoComplete="email"
                              />
                            </Field>

                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Password">
                                <Input
                                  type="password"
                                  value={signupForm.password}
                                  onChange={(event) => updateSignupField('password', event.target.value)}
                                  placeholder="At least 6 characters"
                                  autoComplete="new-password"
                                />
                              </Field>
                              <Field label="Confirm Password">
                                <Input
                                  type="password"
                                  value={signupForm.confirmPassword}
                                  onChange={(event) => updateSignupField('confirmPassword', event.target.value)}
                                  placeholder="Re-enter password"
                                  autoComplete="new-password"
                                />
                              </Field>
                            </div>
                          </>
                        ) : null}

                        {signupStep === 'company' ? (
                          <>
                            <Field label="Company Name">
                              <Input
                                type="text"
                                value={signupForm.companyName}
                                onChange={(event) => updateSignupField('companyName', event.target.value)}
                                placeholder="Bridge Property Group"
                                autoComplete="organization"
                              />
                            </Field>

                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Company Type">
                                <Input
                                  type="text"
                                  value={signupForm.companyType}
                                  onChange={(event) => updateSignupField('companyType', event.target.value)}
                                  placeholder="Developer, conveyancer, or agency"
                                />
                              </Field>
                              <Field label="Phone Number">
                                <Input
                                  type="tel"
                                  value={signupForm.phoneNumber}
                                  onChange={(event) => updateSignupField('phoneNumber', event.target.value)}
                                  placeholder="+27 82 000 0000"
                                  autoComplete="tel"
                                />
                              </Field>
                            </div>

                          </>
                        ) : null}

                        {signupStep === 'module' ? (
                          <>
                            <div className="rounded-[24px] border border-[#ece2d8] bg-white/80 p-5">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7a65]">
                                Primary module
                              </p>
                              <h4 className="mt-3 text-[1.1rem] font-semibold tracking-[-0.03em] text-[#171412]">
                                Which Bridge module will this team use first?
                              </h4>
                              <p className="mt-2 text-sm leading-6 text-[#6f6457]">
                                This choice shapes onboarding, workspace defaults, and billing configuration.
                              </p>
                            </div>

                            <div className="grid gap-3 md:grid-cols-3">
                              {Object.entries(moduleOptions).map(([key, item]) => (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => updateSignupField('module', key)}
                                  className={`rounded-[24px] border p-4 text-left transition ${
                                    signupForm.module === key
                                      ? 'border-[#171412] bg-[#171412] text-white'
                                      : 'border-[#ece2d8] bg-white/90 text-[#171412]'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <Building2 className={`h-5 w-5 ${signupForm.module === key ? 'text-[#eadcc7]' : 'text-[#8c7458]'}`} />
                                    <div className="text-sm font-semibold">{item.label}</div>
                                  </div>
                                  <div className={`mt-3 text-sm leading-6 ${signupForm.module === key ? 'text-[#d2c7bc]' : 'text-[#6f6457]'}`}>
                                    {item.description}
                                  </div>
                                  <div className={`mt-3 text-xs ${signupForm.module === key ? 'text-[#eadcc7]' : 'text-[#8d7a65]'}`}>
                                    {item.billingLabel}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>
                        ) : null}

                        {signupStep === 'billing' ? (
                          <>
                            <div className="rounded-[28px] border border-[#1d1a17] bg-[linear-gradient(180deg,#171412_0%,#201d19_100%)] p-5 text-white">
                              <div className="flex items-start justify-between gap-5">
                                <div>
                                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#9f9180]">Selected module</p>
                                  <h4 className="mt-3 text-[1.2rem] font-semibold text-[#faf6f0]">
                                    {moduleOptions[signupForm.module].label}
                                  </h4>
                                  <p className="mt-2 text-sm leading-6 text-[#c9c0b5]">
                                    {moduleOptions[signupForm.module].helper}
                                  </p>
                                </div>
                                <CreditCard className="h-6 w-6 text-[#eadcc7]" />
                              </div>

                              <div className="mt-4 grid gap-3 md:grid-cols-3">
                                <SummaryPill label="Model" value={moduleOptions[signupForm.module].billingLabel} />
                                <SummaryPill label="Scale" value={getBillingSummary()} />
                                <SummaryPill label="Cycle" value={signupForm.billingCycle === 'annual' ? 'Annual billing' : 'Monthly billing'} />
                              </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Billing Contact Name">
                                <Input
                                  type="text"
                                  value={signupForm.billingName}
                                  onChange={(event) => updateSignupField('billingName', event.target.value)}
                                  placeholder="Finance contact"
                                />
                              </Field>
                              <Field label="Billing Email">
                                <Input
                                  type="email"
                                  value={signupForm.billingEmail}
                                  onChange={(event) => updateSignupField('billingEmail', event.target.value)}
                                  placeholder="billing@company.com"
                                />
                              </Field>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Billing Cycle">
                                <select
                                  value={signupForm.billingCycle}
                                  onChange={(event) => updateSignupField('billingCycle', event.target.value)}
                                  className="w-full rounded-2xl border border-[#e7ddd2] bg-white px-4 py-3 text-sm text-[#171412] outline-none transition focus:border-[#b79a79] focus:ring-2 focus:ring-[#eadcc7]/60"
                                >
                                  <option value="annual">Annual</option>
                                  <option value="monthly">Monthly</option>
                                </select>
                              </Field>
                              <Field label="VAT / Tax Number" hint="Optional, but useful for account setup.">
                                <Input
                                  type="text"
                                  value={signupForm.vatNumber}
                                  onChange={(event) => updateSignupField('vatNumber', event.target.value)}
                                  placeholder="VAT1234567"
                                />
                              </Field>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                              <Field label="Seats">
                                <Input
                                  type="number"
                                  min="1"
                                  value={signupForm.seats}
                                  onChange={(event) => updateSignupField('seats', event.target.value)}
                                />
                              </Field>
                              <Field label="Active Developments">
                                <Input
                                  type="number"
                                  min="0"
                                  value={signupForm.activeDevelopments}
                                  onChange={(event) => updateSignupField('activeDevelopments', event.target.value)}
                                />
                              </Field>
                              <Field label="Monthly Transactions">
                                <Input
                                  type="number"
                                  min="0"
                                  value={signupForm.monthlyTransactions}
                                  onChange={(event) => updateSignupField('monthlyTransactions', event.target.value)}
                                />
                              </Field>
                            </div>
                          </>
                        ) : null}

                        {error ? <p className="rounded-2xl border border-[#e9c6c2] bg-[#fff2f0] px-4 py-3 text-sm text-[#8a3b34]">{error}</p> : null}
                        {success && !submitted ? <p className="rounded-2xl border border-[#d8e8d6] bg-[#f1faf0] px-4 py-3 text-sm text-[#2f6b38]">{success}</p> : null}

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                          {signupStep !== 'account' ? (
                            <button
                              type="button"
                              className="bridge-button-secondary whitespace-nowrap"
                              onClick={() => {
                                setError('')
                                setSignupStep((current) =>
                                  current === 'billing'
                                    ? 'module'
                                    : current === 'module'
                                      ? 'company'
                                      : 'account'
                                )
                              }}
                            >
                              Back
                            </button>
                          ) : (
                            <div />
                          )}

                          <button type="submit" className="bridge-button-primary whitespace-nowrap">
                            {signupStep === 'billing' ? 'Submit Signup Request' : 'Continue'}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
