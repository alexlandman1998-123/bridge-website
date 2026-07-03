import { useEffect } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CalendarClock,
  Landmark,
  Gauge,
  MapPinned,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RelatedToolCard from '../components/tools/RelatedToolCard'
import TransferCostCalculator from '../components/tools/TransferCostCalculator'
import { breadcrumbJsonLd, faqJsonLd, setPageSeo, softwareApplicationJsonLd, webPageJsonLd } from '../lib/seo'

const trustBadges = [
  {
    title: '100% Free',
    description: 'No sign up required',
    icon: BadgeCheck,
  },
  {
    title: 'Built for South Africa',
    description: 'Local transfer cost assumptions',
    icon: MapPinned,
  },
  {
    title: 'Plan Your Cash',
    description: 'Understand upfront buying costs',
    icon: ShieldCheck,
  },
]

const relatedTools = [
  {
    title: 'Bond Repayment Calculator',
    description: 'Estimate monthly repayments based on loan amount, interest rate and term.',
    cta: 'Calculate Repayments',
    href: '/tools/buyers/bond-repayment-calculator',
    icon: Calculator,
  },
  {
    title: 'Affordability Calculator',
    description: 'Find out what you can afford based on your income and expenses.',
    cta: 'Calculate Affordability',
    href: '/tools/buyers/affordability-calculator',
    icon: Gauge,
  },
  {
    title: 'Bond Cost Calculator',
    description: 'Estimate bond registration costs.',
    cta: 'Calculate Bond Costs',
    href: '/tools/buyers/bond-cost-calculator',
    icon: Landmark,
  },
  {
    title: 'Registration Timeline',
    description: 'Understand the transfer process.',
    cta: 'View Timeline',
    href: '/tools/buyers/registration-timeline',
    icon: CalendarClock,
  },
]

const faqs = [
  {
    question: 'What are transfer costs?',
    answer:
      'Transfer costs are once-off amounts usually paid during a property transfer, including transfer duty, conveyancing fees and administration costs.',
  },
  {
    question: 'Who pays transfer duty?',
    answer:
      'Transfer duty is generally paid by the purchaser and is normally handled through the conveyancer during the transfer process.',
  },
  {
    question: 'Is transfer duty payable on VAT transactions?',
    answer:
      'A sale is generally subject to either VAT or transfer duty, not both. Confirm the VAT treatment with your conveyancer.',
  },
  {
    question: 'Are bond costs included?',
    answer:
      'No. Bond registration costs are separate from transfer costs and should be calculated separately if you need bond finance.',
  },
  {
    question: 'When are transfer costs paid?',
    answer:
      'They are usually payable before registration so the conveyancer can complete the transfer and settle amounts due to SARS and service providers.',
  },
]

export default function TransferCostCalculatorPage() {
  useEffect(() => {
    const description = 'Estimate transfer duty, attorney transfer fees and once-off buying costs when purchasing property in South Africa.'
    const path = '/tools/buyers/transfer-cost-calculator'

    setPageSeo({
      title: 'Transfer Cost Calculator | Arch9 Property Tools',
      description,
      canonicalPath: path,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', href: '/' },
          { name: 'Tools', href: '/tools' },
          { name: 'Buyers', href: '/tools/buyers' },
          { name: 'Transfer Cost Calculator', href: path },
        ]),
        webPageJsonLd({
          name: 'Transfer Cost Calculator | Arch9 Property Tools',
          description,
          path,
        }),
        softwareApplicationJsonLd({
          name: 'Transfer Cost Calculator',
          description,
          path,
          applicationCategory: 'FinanceApplication',
          audience: ['Property buyers'],
          featureList: ['Transfer duty estimate', 'Attorney transfer fee estimate', 'Once-off buying cost estimate'],
        }),
        faqJsonLd(faqs),
      ],
    })
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
                <a href="/tools/buyers" className="transition hover:text-[#0D4F45]">Buyers</a>
                <span className="text-[#98A2B3]">&gt;</span>
                <span className="text-[#101828]">Transfer Cost Calculator</span>
              </nav>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.24em] text-[#0D4F45]">Buyers</p>
              <h1 className="mt-5 max-w-[720px] text-[3.2rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#101828] md:text-[5rem]">
                Transfer Cost Calculator
              </h1>
              <p className="mt-6 max-w-[670px] text-lg font-medium leading-8 text-[#344054]">
                Estimate transfer duty, attorney fees and other once-off costs payable when buying a property.
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
                  Transfer costs are estimates only. Final costs may differ depending on the conveyancer, property value, VAT status and transaction structure.
                </p>
              </div>
            </div>

            <TransferCostCalculator />
          </div>
        </section>

        <section className="px-5 pb-14 md:px-8 md:pb-20">
          <div className="mx-auto w-full max-w-[1340px]">
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0D4F45]">Next Steps</p>
                <h2 className="mt-3 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#101828]">Continue your buying journey</h2>
              </div>
              <p className="max-w-[520px] text-sm font-medium leading-6 text-[#667085]">
                Move from upfront costs to repayments, affordability and registration planning.
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
                <h2 className="text-2xl font-extrabold tracking-[-0.035em]">Need help planning your purchase costs?</h2>
                <p className="mt-2 max-w-[740px] text-sm font-medium leading-7 text-white/70">
                  Arch9 can help you understand the upfront cash, finance and transfer journey before you make an offer.
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
            <h2 className="mt-3 text-[2.2rem] font-extrabold tracking-[-0.045em] text-[#101828]">Transfer cost questions</h2>
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
