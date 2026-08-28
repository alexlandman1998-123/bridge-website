import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Landmark,
  LayoutDashboard,
  MoreHorizontal,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { submitDemoEnquiry } from '../lib/demoEnquiriesApi'
import { breadcrumbJsonLd, setPageSeo, webPageJsonLd } from '../lib/seo'

const totalSteps = 6

const roleOptions = [
  { label: 'Estate Agency', value: 'estate-agency', icon: Building2 },
  { label: 'Attorney', value: 'attorney', icon: Scale },
  { label: 'Bond Originator', value: 'bond-originator', icon: Landmark },
  { label: 'Developer', value: 'developer', icon: BriefcaseBusiness },
  { label: 'Commercial Agency', value: 'commercial-agency', icon: Building2 },
  { label: 'Other', value: 'other', icon: MoreHorizontal },
]

const demoFocusOptions = [
  { label: 'Client Portal', value: 'client-portal', icon: Users },
  { label: 'Transactions', value: 'transactions', icon: Workflow },
  { label: 'CRM', value: 'crm', icon: Users },
  { label: 'Documents', value: 'documents', icon: FileText },
  { label: 'Automation', value: 'automation', icon: Sparkles },
  { label: 'Reporting', value: 'reporting', icon: BarChart3 },
]

const preferredWindowOptions = ['This week', 'Next week', 'Morning', 'Afternoon', 'Anytime']

const businessQuestions = {
  'estate-agency': {
    businessSizeLabel: 'How many agents do you have?',
    businessSizeOptions: ['1-5', '6-20', '21-50', '50+'],
    monthlyVolumeLabel: 'Monthly transactions',
    monthlyVolumeOptions: ['0-20', '20-50', '50-100', '100+'],
  },
  'commercial-agency': {
    businessSizeLabel: 'How many agents do you have?',
    businessSizeOptions: ['1-5', '6-20', '21-50', '50+'],
    monthlyVolumeLabel: 'Monthly transactions',
    monthlyVolumeOptions: ['0-20', '20-50', '50-100', '100+'],
  },
  attorney: {
    monthlyVolumeLabel: 'Monthly matters',
    monthlyVolumeOptions: ['0-20', '20-50', '50-100', '100+'],
    roleSpecificLabel: 'Main work',
    roleSpecificKey: 'mainWork',
    roleSpecificOptions: ['Transfers', 'Bond registrations', 'Cancellations', 'Mixed conveyancing'],
  },
  developer: {
    monthlyVolumeLabel: 'Monthly sales / reservations',
    monthlyVolumeOptions: ['0-10', '10-30', '30-75', '75+'],
    roleSpecificLabel: 'Portfolio type',
    roleSpecificKey: 'portfolioType',
    roleSpecificOptions: ['Single development', 'Multiple developments', 'Mixed residential', 'Mixed commercial'],
  },
  'bond-originator': {
    monthlyVolumeLabel: 'Monthly applications',
    monthlyVolumeOptions: ['0-25', '25-75', '75-150', '150+'],
    roleSpecificLabel: 'Team structure',
    roleSpecificKey: 'teamStructure',
    roleSpecificOptions: ['Independent', 'Branch', 'Regional team', 'National team'],
  },
  other: {
    businessSizeLabel: 'Team size',
    businessSizeOptions: ['1-5', '6-20', '21-50', '50+'],
    monthlyVolumeLabel: 'Monthly transactions',
    monthlyVolumeOptions: ['0-20', '20-50', '50-100', '100+'],
  },
}

const initialWizard = {
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  businessSize: '',
  monthlyVolume: '',
  roleSpecificAnswers: {},
  demoFocus: [],
  biggestFrustration: '',
  preferredWindow: [],
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function getRoleLabel(role) {
  return roleOptions.find((option) => option.value === role)?.label || role
}

function buildDemoPayload(form) {
  return {
    role: getRoleLabel(form.role),
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    company: form.company.trim(),
    businessSize: form.businessSize,
    monthlyVolume: form.monthlyVolume,
    roleSpecificAnswers: form.roleSpecificAnswers,
    demoFocus: form.demoFocus,
    biggestFrustration: form.biggestFrustration.trim(),
    preferredWindow: form.preferredWindow,
  }
}

async function submitDemoRequest(payload) {
  return submitDemoEnquiry(payload)
}

function StepProgress({ currentStep }) {
  return (
    <div className="mx-auto max-w-[340px]">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#E8DED2]" />
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const active = stepNumber <= currentStep

          return (
            <span
              key={stepNumber}
              className={`relative z-10 h-4 w-4 rounded-full border transition ${
                active ? 'border-[#064537] bg-[#064537]' : 'border-[#D8CDBF] bg-[#FEFCF8]'
              }`}
            />
          )
        })}
      </div>
      <p className="mt-4 text-center text-sm font-extrabold text-[#064537]">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  )
}

function WizardHeader({ currentStep }) {
  return (
    <div>
      <a href="/" className="inline-flex min-h-11 items-center text-[0.95rem] font-black tracking-[0.28em] text-[#071E1A]">
        ARCH9
      </a>
      <div className="mt-5 rounded-[26px] border border-[#E8DED2] bg-white/78 px-4 py-5 shadow-[0_18px_54px_rgba(23,20,18,0.045)]">
        <StepProgress currentStep={currentStep} />
      </div>
    </div>
  )
}

function OptionCard({ active, children, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      className={`relative flex min-h-[96px] flex-col items-center justify-center gap-3 rounded-[18px] border p-4 text-center text-sm font-extrabold transition ${
        active
          ? 'border-[#064537] bg-[#F7FBF7] text-[#071E1A] shadow-[0_16px_42px_rgba(6,69,55,0.08)]'
          : 'border-[#E8DED2] bg-[#FEFCF8] text-[#171412] hover:border-[#BFCFC8] hover:bg-white'
      }`}
      onClick={onClick}
    >
      {active ? (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#064537] text-white">
          <CheckCircle2 className="h-4 w-4" />
        </span>
      ) : null}
      {Icon ? <Icon className="h-6 w-6 text-[#064537]" /> : null}
      <span>{children}</span>
    </button>
  )
}

function ChoiceButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      className={`relative flex min-h-[58px] items-center justify-center rounded-[14px] border px-4 text-center text-sm font-extrabold transition ${
        active
          ? 'border-[#064537] bg-[#F7FBF7] text-[#071E1A] shadow-[0_12px_32px_rgba(6,69,55,0.08)]'
          : 'border-[#E8DED2] bg-[#FEFCF8] text-[#171412] hover:border-[#BFCFC8]'
      }`}
      onClick={onClick}
    >
      {active ? (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#064537] text-white">
          <CheckCircle2 className="h-4 w-4" />
        </span>
      ) : null}
      {children}
    </button>
  )
}

function ChipButton({ active, children, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      className={`relative flex min-h-[74px] items-center justify-center gap-3 rounded-[16px] border px-4 text-sm font-extrabold transition ${
        active
          ? 'border-[#064537] bg-[#F7FBF7] text-[#071E1A] shadow-[0_12px_34px_rgba(6,69,55,0.08)]'
          : 'border-[#E8DED2] bg-[#FEFCF8] text-[#171412] hover:border-[#BFCFC8]'
      }`}
      onClick={onClick}
    >
      {active ? (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#064537] text-white">
          <CheckCircle2 className="h-3.5 w-3.5" />
        </span>
      ) : null}
      <Icon className="h-5 w-5 text-[#064537]" />
      {children}
    </button>
  )
}

function TextInput({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#171412]">{label}</span>
      <input
        {...props}
        className={`mt-2 min-h-[52px] w-full rounded-[14px] border bg-white px-4 text-base font-medium text-[#171412] outline-none transition placeholder:text-[#A09990] focus:border-[#064537] ${
          error ? 'border-[#B42318]' : 'border-[#E8DED2]'
        }`}
      />
      {error ? <span className="mt-2 block text-sm font-semibold text-[#B42318]">{error}</span> : null}
    </label>
  )
}

function StepIntro({ title, copy }) {
  return (
    <div className="mx-auto max-w-[640px] text-center">
      <h1 className="text-[2rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#171412] md:text-[2.45rem]">
        {title}
      </h1>
      {copy ? <p className="mt-3 text-base font-medium leading-7 text-[#6F6457]">{copy}</p> : null}
    </div>
  )
}

function RoleSelectionStep({ form, updateField }) {
  return (
    <div>
      <StepIntro title="Let's personalise your demo" copy="What best describes you?" />
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roleOptions.map((role) => (
          <OptionCard
            key={role.value}
            active={form.role === role.value}
            icon={role.icon}
            onClick={() => {
              updateField('role', role.value)
              updateField('businessSize', '')
              updateField('monthlyVolume', '')
              updateField('roleSpecificAnswers', {})
            }}
          >
            {role.label}
          </OptionCard>
        ))}
      </div>
    </div>
  )
}

function ContactDetailsStep({ errors, form, updateField }) {
  return (
    <div>
      <StepIntro title="Tell us about yourself" copy="We'll use this to prepare for your demo." />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <TextInput
          label="First name"
          value={form.firstName}
          error={errors.firstName}
          autoComplete="given-name"
          placeholder="First name"
          onChange={(event) => updateField('firstName', event.target.value)}
        />
        <TextInput
          label="Last name"
          value={form.lastName}
          error={errors.lastName}
          autoComplete="family-name"
          placeholder="Last name"
          onChange={(event) => updateField('lastName', event.target.value)}
        />
        <div className="sm:col-span-2">
          <TextInput
            label="Work email"
            type="email"
            value={form.email}
            error={errors.email}
            autoComplete="email"
            placeholder="name@company.com"
            onChange={(event) => updateField('email', event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <TextInput
            label="Phone number"
            value={form.phone}
            error={errors.phone}
            autoComplete="tel"
            placeholder="082 123 4567"
            onChange={(event) => updateField('phone', event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <TextInput
            label="Company name"
            value={form.company}
            error={errors.company}
            autoComplete="organization"
            placeholder="Your company"
            onChange={(event) => updateField('company', event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function BusinessSizeStep({ form, updateField }) {
  const config = businessQuestions[form.role] || businessQuestions.other
  const roleSpecificValue = config.roleSpecificKey ? form.roleSpecificAnswers[config.roleSpecificKey] : ''

  return (
    <div>
      <StepIntro title="Tell us about your business" copy="This helps us tailor the right demo for you." />
      <div className="mt-8 space-y-8">
        {config.businessSizeLabel ? (
          <section>
            <h2 className="text-sm font-extrabold text-[#171412]">{config.businessSizeLabel}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {config.businessSizeOptions.map((option) => (
                <ChoiceButton key={option} active={form.businessSize === option} onClick={() => updateField('businessSize', option)}>
                  {option}
                </ChoiceButton>
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <h2 className="text-sm font-extrabold text-[#171412]">{config.monthlyVolumeLabel}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {config.monthlyVolumeOptions.map((option) => (
              <ChoiceButton key={option} active={form.monthlyVolume === option} onClick={() => updateField('monthlyVolume', option)}>
                {option}
              </ChoiceButton>
            ))}
          </div>
        </section>

        {config.roleSpecificLabel ? (
          <section>
            <h2 className="text-sm font-extrabold text-[#171412]">{config.roleSpecificLabel}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              {config.roleSpecificOptions.map((option) => (
                <ChoiceButton
                  key={option}
                  active={roleSpecificValue === option}
                  onClick={() => updateField('roleSpecificAnswers', { [config.roleSpecificKey]: option })}
                >
                  {option}
                </ChoiceButton>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

function DemoFocusStep({ form, toggleArrayValue }) {
  return (
    <div>
      <StepIntro title="What would you like to see?" copy="Select the areas you'd like us to focus on." />
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {demoFocusOptions.map((item) => (
          <ChipButton
            key={item.value}
            active={form.demoFocus.includes(item.label)}
            icon={item.icon}
            onClick={() => toggleArrayValue('demoFocus', item.label)}
          >
            {item.label}
          </ChipButton>
        ))}
      </div>
    </div>
  )
}

function FrustrationStep({ form, updateField }) {
  return (
    <div>
      <StepIntro title="What's your biggest frustration today?" copy="A quick answer helps us help you." />
      <textarea
        value={form.biggestFrustration}
        onChange={(event) => updateField('biggestFrustration', event.target.value)}
        placeholder="E.g. delays in registration, poor communication, too many manual processes..."
        className="mt-8 min-h-[170px] max-h-[42vh] w-full resize-y rounded-[16px] border border-[#E8DED2] bg-white px-4 py-4 text-base font-medium leading-7 text-[#171412] outline-none transition placeholder:text-[#A09990] focus:border-[#064537]"
      />
    </div>
  )
}

function DemoWindowStep({ form, toggleArrayValue }) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#064537] text-white">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-[2rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#171412] md:text-[2.45rem]">
            Almost there{form.firstName ? `, ${form.firstName}` : ''}
          </h1>
          <p className="mt-4 text-base font-medium leading-7 text-[#6F6457]">Choose a time window that works best for you.</p>
          <div className="mt-7 grid gap-3 text-sm font-bold text-[#52645D]">
            {['30 minute tailored demo', 'No prep needed', 'Cancel anytime'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#0E6A55]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-[#E8DED2] bg-[#FEFCF8] p-5">
          <h2 className="text-sm font-extrabold text-[#171412]">Preferred demo window</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {preferredWindowOptions.map((option) => (
              <ChoiceButton key={option} active={form.preferredWindow.includes(option)} onClick={() => toggleArrayValue('preferredWindow', option)}>
                {option}
              </ChoiceButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SuccessState({ onReset }) {
  return (
    <div className="mx-auto max-w-[620px] py-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#064537] text-white shadow-[0_18px_48px_rgba(6,69,55,0.2)]">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h1 className="mt-7 text-[2.2rem] font-extrabold leading-tight tracking-[-0.045em] text-[#171412]">
        Thanks, we'll be in touch shortly to schedule your tailored Arch9 demo.
      </h1>
      <p className="mx-auto mt-4 max-w-[460px] text-base font-medium leading-7 text-[#6F6457]">
        Your enquiry has been saved and the Arch9 team has been notified.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a href="/" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#064537] px-7 text-sm font-extrabold text-white" style={{ color: '#FFFFFF' }}>
          Return Home
        </a>
        <button
          type="button"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#E8DED2] bg-white px-7 text-sm font-extrabold text-[#171412]"
          onClick={onReset}
        >
          Start Again
        </button>
      </div>
    </div>
  )
}

function WizardActions({ canContinue, currentStep, isSubmitting, onBack, onNext }) {
  const finalStep = currentStep === totalSteps

  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-8 border-t border-[#E8DED2] bg-white/94 px-5 py-4 backdrop-blur md:static md:mx-0 md:border-t-0 md:bg-transparent md:px-0 md:py-0">
      <div className="flex items-center gap-3">
        {currentStep > 1 ? (
          <button
            type="button"
            className="inline-flex min-h-[52px] min-w-[104px] items-center justify-center gap-2 rounded-[14px] border border-[#E8DED2] bg-white px-5 text-sm font-extrabold text-[#171412]"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : null}
        <button
          type="button"
          disabled={!canContinue || isSubmitting}
          className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#064537] px-6 text-sm font-extrabold text-white shadow-[0_18px_44px_rgba(6,69,55,0.18)] transition disabled:cursor-not-allowed disabled:opacity-45"
          style={{ color: '#FFFFFF' }}
          onClick={onNext}
        >
          {isSubmitting ? 'Saving...' : finalStep ? 'Book My Demo' : 'Continue'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function getContactErrors(form) {
  const errors = {}

  if (!form.firstName.trim()) errors.firstName = 'First name is required.'
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.'
  if (!form.email.trim()) {
    errors.email = 'Work email is required.'
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Enter a valid work email.'
  }
  if (!form.phone.trim()) errors.phone = 'Phone number is required.'
  if (!form.company.trim()) errors.company = 'Company name is required.'

  return errors
}

function isBusinessStepValid(form) {
  const config = businessQuestions[form.role] || businessQuestions.other
  const hasBusinessSize = !config.businessSizeLabel || Boolean(form.businessSize)
  const hasMonthlyVolume = Boolean(form.monthlyVolume)
  const hasRoleSpecific = !config.roleSpecificKey || Boolean(form.roleSpecificAnswers[config.roleSpecificKey])

  return hasBusinessSize && hasMonthlyVolume && hasRoleSpecific
}

function DemoWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState(initialWizard)
  const [contactErrors, setContactErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const canContinue = useMemo(() => {
    if (currentStep === 1) return Boolean(form.role)
    if (currentStep === 2) return Object.keys(getContactErrors(form)).length === 0
    if (currentStep === 3) return isBusinessStepValid(form)
    if (currentStep === 4) return form.demoFocus.length > 0
    if (currentStep === 5) return true
    if (currentStep === 6) return form.preferredWindow.length > 0
    return false
  }, [currentStep, form])

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setSubmitError('')
    if (currentStep === 2) {
      setContactErrors((current) => ({ ...current, [key]: '' }))
    }
  }

  function toggleArrayValue(key, value) {
    setSubmitError('')
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }))
  }

  function goBack() {
    setCurrentStep((step) => Math.max(1, step - 1))
  }

  async function goNext() {
    if (currentStep === 2) {
      const errors = getContactErrors(form)
      setContactErrors(errors)
      if (Object.keys(errors).length > 0) return
    }

    if (!canContinue) return

    if (currentStep < totalSteps) {
      setCurrentStep((step) => step + 1)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    try {
      await submitDemoRequest(buildDemoPayload(form))
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error?.message || 'We could not submit your demo request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function resetWizard() {
    setForm(initialWizard)
    setContactErrors({})
    setCurrentStep(1)
    setSubmitted(false)
  }

  return (
    <section className="mx-auto w-full max-w-[980px] rounded-[26px] border border-white/80 bg-white/82 p-5 shadow-[0_28px_90px_rgba(23,20,18,0.08)] backdrop-blur-xl md:p-8">
      <WizardHeader currentStep={currentStep} />

      <div className="mt-7 rounded-[26px] border border-[#E8DED2] bg-white/92 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:p-8">
        {submitted ? (
          <SuccessState onReset={resetWizard} />
        ) : (
          <>
            {currentStep === 1 ? <RoleSelectionStep form={form} updateField={updateField} /> : null}
            {currentStep === 2 ? <ContactDetailsStep errors={contactErrors} form={form} updateField={updateField} /> : null}
            {currentStep === 3 ? <BusinessSizeStep form={form} updateField={updateField} /> : null}
            {currentStep === 4 ? <DemoFocusStep form={form} toggleArrayValue={toggleArrayValue} /> : null}
            {currentStep === 5 ? <FrustrationStep form={form} updateField={updateField} /> : null}
            {currentStep === 6 ? <DemoWindowStep form={form} toggleArrayValue={toggleArrayValue} /> : null}
            {submitError ? (
              <div className="mt-6 rounded-[16px] border border-[#F2C8C4] bg-[#FFF5F4] px-4 py-3 text-sm font-bold text-[#9F1C1C]">
                {submitError}
              </div>
            ) : null}
            <WizardActions
              canContinue={canContinue}
              currentStep={currentStep}
              isSubmitting={isSubmitting}
              onBack={goBack}
              onNext={goNext}
            />
          </>
        )}
      </div>

      <div className="mt-5 grid gap-3 rounded-[20px] border border-[#E8DED2] bg-white/70 p-4 text-xs font-semibold text-[#6F6457] md:grid-cols-4 md:items-center">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-[#064537]" />
          <span><strong className="block text-[#171412]">Your data is secure</strong> We never share your information</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock3 className="h-5 w-5 text-[#064537]" />
          <span><strong className="block text-[#171412]">Quick and easy</strong> Takes less than 60 seconds</span>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-[#064537]" />
          <span><strong className="block text-[#171412]">Tailored for you</strong> We'll personalise your demo</span>
        </div>
        <p className="text-center md:text-right">
          Already use Arch9? <a href="https://app.arch9.co.za" className="font-black text-[#064537]">Login</a>
        </p>
      </div>
    </section>
  )
}

export default function Contact() {
  useEffect(() => {
    const isBookDemoRoute = window.location.pathname === '/book-demo'
    const description = 'Book a tailored Arch9 demo and see how one shared property transaction workspace connects every stakeholder.'

    setPageSeo({
      title: 'Book a Demo | Arch9',
      description,
      canonicalPath: '/book-demo',
      indexable: isBookDemoRoute,
      jsonLd: isBookDemoRoute
        ? [
            breadcrumbJsonLd([
              { name: 'Home', href: '/' },
              { name: 'Book a Demo', href: '/book-demo' },
            ]),
            webPageJsonLd({
              name: 'Book a Demo | Arch9',
              description,
              path: '/book-demo',
              type: 'ContactPage',
            }),
          ]
        : [],
    })
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#171412]">
      <Header />

      <main className="px-4 pb-12 pt-[120px] md:px-8 md:pb-18 md:pt-[132px]">
        <DemoWizard />
      </main>

      <Footer />
    </div>
  )
}
