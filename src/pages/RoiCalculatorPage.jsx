import { useEffect } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Calculator,
  Home,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RelatedToolCard from '../components/tools/RelatedToolCard'
import RoiCalculator from '../components/tools/RoiCalculator'

const trustBadges = [
  {
    title: '100% Free',
    description: 'No sign up required',
    icon: BadgeCheck,
  },
  {
    title: 'Investor Focused',
    description: 'Understand total return',
    icon: TrendingUp,
  },
  {
    title: 'Built for Property',
    description: 'Rental income, expenses and growth included',
    icon: ShieldCheck,
  },
]

const relatedTools = [
  {
    title: 'Rental Yield Calculator',
    description: 'Analyse gross and net yield from monthly rental income and property costs.',
    cta: 'Calculate Yield',
    href: '/tools/investors/rental-yield-calculator',
    icon: TrendingUp,
  },
  {
    title: 'Cash Flow Calculator',
    description: 'Estimate monthly surplus or shortfall after finance and operating expenses.',
    cta: 'Calculate Cash Flow',
    href: '/tools/investors/cash-flow-calculator',
    icon: WalletCards,
  },
  {
    title: 'Buy-to-Let Analyzer',
    description: 'Evaluate buy-to-let opportunities using rent, costs, finance and yield assumptions.',
    cta: 'Analyze Buy-to-Let',
    href: '/tools/investors/buy-to-let-analyzer',
    icon: Home,
  },
  {
    title: 'Bond Repayment Calculator',
    description: 'Estimate monthly repayments based on loan amount, interest rate and term.',
    cta: 'Calculate Repayments',
    href: '/tools/buyers/bond-repayment-calculator',
    icon: Calculator,
  },
]

const faqs = [
  {
    question: 'What is property ROI?',
    answer:
      'Property ROI compares the total return from rental cash flow and capital growth against the cash invested into the property.',
  },
  {
    question: 'How do you calculate ROI on a rental property?',
    answer:
      'This calculator estimates rental income, vacancy, expenses, bond costs and projected capital growth, then compares total return with initial cash invested.',
  },
  {
    question: 'Should ROI include capital growth?',
    answer:
      'For long-term investment analysis, capital growth is often included, but it should be treated as an assumption rather than a guarantee.',
  },
  {
    question: 'What is annualised ROI?',
    answer:
      'Annualised ROI converts the total return over the holding period into an estimated yearly return, making scenarios easier to compare.',
  },
  {
    question: 'How does bond finance affect ROI?',
    answer:
      'Bond finance can increase leverage, but monthly repayments may create a cash shortfall that reduces total return over the holding period.',
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

export default function RoiCalculatorPage() {
  useEffect(() => {
    document.title = 'Property ROI Calculator | Arch9 Property Tools'
    setMetaDescription('Calculate estimated property ROI using rental income, expenses, financing costs and projected capital growth.')
  }, [])

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
                <a href="/tools/investors" className="transition hover:text-[#0D4F45]">Investors</a>
                <span className="text-[#98A2B3]">&gt;</span>
                <span className="text-[#101828]">ROI Calculator</span>
              </nav>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.24em] text-[#0D4F45]">Investors</p>
              <h1 className="mt-5 max-w-[720px] text-[3.2rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#101828] md:text-[5rem]">
                Property ROI Calculator
              </h1>
              <p className="mt-6 max-w-[670px] text-lg font-medium leading-8 text-[#344054]">
                Estimate your return on investment by combining rental income, expenses, financing costs and projected property growth.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
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
                  ROI calculations are estimates only and do not guarantee future returns. Property values, rental demand, expenses, vacancies and interest rates may change.
                </p>
              </div>
            </div>

            <RoiCalculator />
          </div>
        </section>

        <section className="px-5 pb-14 md:px-8 md:pb-20">
          <div className="mx-auto w-full max-w-[1340px]">
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0D4F45]">Next Steps</p>
                <h2 className="mt-3 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#101828]">Continue your investment analysis</h2>
              </div>
              <p className="max-w-[520px] text-sm font-medium leading-6 text-[#667085]">
                Compare ROI, yield, cash flow and bond assumptions before committing capital.
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
                <h2 className="text-2xl font-extrabold tracking-[-0.035em]">Need help comparing investment returns?</h2>
                <p className="mt-2 max-w-[740px] text-sm font-medium leading-7 text-white/70">
                  Arch9 can help you compare income, cash flow, growth and risk across potential investment properties.
                </p>
              </div>
            </div>
            <a href="/contact" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#F3EEE6] px-7 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5">
              Speak To A Consultant
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto w-full max-w-[1040px]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0D4F45]">FAQ</p>
            <h2 className="mt-3 text-[2.2rem] font-extrabold tracking-[-0.045em] text-[#101828]">ROI questions</h2>
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
