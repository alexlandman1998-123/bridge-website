import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Calculator,
  Gauge,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CalculatorShell from '../components/tools/CalculatorShell'
import RelatedToolCard from '../components/tools/RelatedToolCard'
import ResultSummary from '../components/tools/ResultSummary'
import SliderInput from '../components/tools/SliderInput'
import {
  buildRepaymentSchedule,
  calculateBondRepayment,
  clampNumber,
  formatRand,
} from '../lib/tools/bondRepayment'

const LOAN_AMOUNT = {
  min: 100_000,
  max: 10_000_000,
  step: 10_000,
  defaultValue: 2_000_000,
}

const INTEREST_RATE = {
  min: 7,
  max: 15,
  step: 0.25,
  defaultValue: 11.25,
}

const TERM_YEARS = {
  min: 5,
  max: 30,
  step: 1,
  defaultValue: 20,
}

const trustBadges = [
  {
    title: '100% Free',
    description: 'No sign up required',
    icon: BadgeCheck,
  },
  {
    title: 'Accurate Results',
    description: 'Based on standard bond repayment formulas',
    icon: Calculator,
  },
  {
    title: 'Plan with Confidence',
    description: 'Make better property decisions',
    icon: ShieldCheck,
  },
]

const relatedTools = [
  {
    title: 'Affordability Calculator',
    description: 'Find out what you can afford based on your income and expenses.',
    cta: 'Calculate Affordability',
    href: '/tools/buyers/affordability-calculator',
    icon: Gauge,
  },
  {
    title: 'Transfer Cost Calculator',
    description: 'Estimate transfer duties and fees when buying a property.',
    cta: 'Calculate Costs',
    href: '/tools/buyers/transfer-cost-calculator',
    icon: ReceiptText,
  },
  {
    title: 'Bond Cost Calculator',
    description: 'See all bond registration costs associated with your loan.',
    cta: 'Calculate Bond Costs',
    href: '/tools/buyers/bond-cost-calculator',
    icon: Landmark,
  },
  {
    title: 'Registration Timeline',
    description: 'Understand the property transfer and registration process.',
    cta: 'View Timeline',
    href: '/tools/buyers/registration-timeline',
    icon: CalendarClock,
  },
]

const faqs = [
  {
    question: 'How is a bond repayment calculated?',
    answer:
      'It uses the standard amortising loan formula, which spreads principal and interest across the full loan term.',
  },
  {
    question: 'What interest rate should I use?',
    answer:
      'Use the rate a bank or bond originator has indicated for your profile. If you are unsure, prime-linked estimates are a practical starting point.',
  },
  {
    question: 'Does this include transfer or bond registration costs?',
    answer:
      'No. This calculator estimates monthly loan repayments only. Use the transfer and bond cost tools for once-off buying costs.',
  },
  {
    question: 'Is this a final bank quote?',
    answer:
      'No. Results are estimates and may differ from the final bond offer from a financial institution.',
  },
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

function getCurrentMonthValue() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export default function BondRepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(LOAN_AMOUNT.defaultValue)
  const [interestRate, setInterestRate] = useState(INTEREST_RATE.defaultValue)
  const [termYears, setTermYears] = useState(TERM_YEARS.defaultValue)
  const [startDate, setStartDate] = useState(getCurrentMonthValue)

  useEffect(() => {
    document.title = 'Bond Repayment Calculator | Arch9 Property Tools'
    setMetaDescription('Estimate your monthly bond repayments in South Africa based on loan amount, interest rate and loan term.')
  }, [])

  const result = useMemo(
    () =>
      calculateBondRepayment({
        loanAmount,
        annualInterestRate: interestRate,
        termYears,
      }),
    [interestRate, loanAmount, termYears],
  )

  const schedule = useMemo(
    () =>
      buildRepaymentSchedule({
        loanAmount,
        annualInterestRate: interestRate,
        termYears,
      }),
    [interestRate, loanAmount, termYears],
  )

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#101828]">
      <Header />
      <main>
        <section className="px-5 pb-14 pt-[132px] md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1340px] gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <nav className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#667085]" aria-label="Breadcrumb">
                <a href="/" className="transition hover:text-[#0D4F45]">Home</a>
                <span className="text-[#98A2B3]">&gt;</span>
                <a href="/tools" className="transition hover:text-[#0D4F45]">Tools</a>
                <span className="text-[#98A2B3]">&gt;</span>
                <a href="/tools/buyers" className="transition hover:text-[#0D4F45]">Buyers</a>
                <span className="text-[#98A2B3]">&gt;</span>
                <span className="text-[#101828]">Bond Repayment Calculator</span>
              </nav>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.24em] text-[#0D4F45]">Buyers</p>
              <h1 className="mt-5 max-w-[720px] text-[3.2rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#101828] md:text-[5rem]">
                Bond Repayment Calculator
              </h1>
              <p className="mt-6 max-w-[670px] text-lg font-medium leading-8 text-[#344054]">
                Estimate your monthly repayments based on loan amount, interest rate and term. Plan your budget with confidence.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon
                  return (
                    <div key={badge.title} className="rounded-[18px] border border-black/[0.06] bg-white/78 p-4 shadow-[0_16px_48px_rgba(16,24,40,0.045)]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#EAF4EF] text-[#0D4F45]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="mt-4 text-sm font-extrabold text-[#101828]">{badge.title}</h2>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#667085]">{badge.description}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 rounded-[18px] border border-[#0D4F45]/12 bg-[#EEF7F2] p-5">
                <h2 className="text-sm font-extrabold text-[#0D4F45]">Important Disclaimer</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#344054]">
                  Results are estimates only and may differ from the final bond amount offered by a financial institution.
                </p>
              </div>
            </div>

            <CalculatorShell>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0D4F45]">Your Inputs</p>
                    <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#101828]">Shape the estimate.</h2>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
                    <Calculator className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-8 grid gap-7">
                  <SliderInput
                    label="Loan Amount"
                    value={loanAmount}
                    min={LOAN_AMOUNT.min}
                    max={LOAN_AMOUNT.max}
                    step={LOAN_AMOUNT.step}
                    formatDisplay={formatRand}
                    inputMode="numeric"
                    onChange={(value) => setLoanAmount(clampNumber(value, LOAN_AMOUNT.min, LOAN_AMOUNT.max))}
                  />
                  <SliderInput
                    label="Interest Rate"
                    value={interestRate}
                    min={INTEREST_RATE.min}
                    max={INTEREST_RATE.max}
                    step={INTEREST_RATE.step}
                    suffix="Annual rate"
                    formatDisplay={(value) => `${Number(value).toFixed(2)}%`}
                    onChange={(value) => setInterestRate(clampNumber(value, INTEREST_RATE.min, INTEREST_RATE.max))}
                  />
                  <SliderInput
                    label="Loan Term"
                    value={termYears}
                    min={TERM_YEARS.min}
                    max={TERM_YEARS.max}
                    step={TERM_YEARS.step}
                    suffix="Years"
                    inputMode="numeric"
                    formatDisplay={(value) => `${Math.round(Number(value))} years`}
                    onChange={(value) => setTermYears(Math.round(clampNumber(value, TERM_YEARS.min, TERM_YEARS.max)))}
                  />

                  <label className="block">
                    <span className="text-sm font-extrabold text-[#101828]">Start Date</span>
                    <span className="ml-2 text-xs font-bold text-[#98A2B3]">Optional</span>
                    <input
                      className="mt-3 h-12 w-full rounded-[14px] border border-black/[0.08] bg-[#FBFAF7] px-4 text-base font-extrabold text-[#101828] outline-none transition focus:border-[#0D4F45]/38 focus:bg-white focus:ring-4 focus:ring-[#0D4F45]/10"
                      type="month"
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                    />
                  </label>
                </div>
              </div>

              <ResultSummary
                monthlyRepayment={result.monthlyRepayment}
                loanAmount={loanAmount}
                interestRate={interestRate}
                termYears={termYears}
                totalInterest={result.totalInterest}
                totalPayable={result.totalPayable}
                schedule={schedule}
                formatCurrency={formatRand}
              />
            </CalculatorShell>
          </div>
        </section>

        <section className="px-5 pb-14 md:px-8 md:pb-20">
          <div className="mx-auto w-full max-w-[1340px]">
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0D4F45]">Next Steps</p>
                <h2 className="mt-3 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#101828]">Your bond, your journey</h2>
              </div>
              <p className="max-w-[520px] text-sm font-medium leading-6 text-[#667085]">
                Tools and insights to help you every step of the way.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {relatedTools.map((tool) => (
                <RelatedToolCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-14 md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1340px] gap-6 rounded-[28px] bg-[#071E1A] p-7 text-white shadow-[0_26px_80px_rgba(7,30,26,0.18)] md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-white/12 bg-white/10 text-[#86E4C2]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-[-0.035em]">Need help understanding your bond options?</h2>
                <p className="mt-2 max-w-[700px] text-sm font-medium leading-7 text-white/70">
                  Arch9 can connect your property journey from finance to registration.
                </p>
              </div>
            </div>
            <a href="/contact" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#F3EEE6] px-7 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5">
              Ask Arch9 for help
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto w-full max-w-[1040px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0D4F45]">FAQ</p>
            <h2 className="mt-3 text-[2.2rem] font-extrabold tracking-[-0.045em] text-[#101828]">Bond repayment questions</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-[18px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_54px_rgba(16,24,40,0.04)]">
                  <h3 className="text-base font-extrabold tracking-[-0.02em] text-[#101828]">{faq.question}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
