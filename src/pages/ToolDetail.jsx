import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getToolCategory, getToolHref, tools } from '../config/tools'
import AffordabilityCalculatorPage from './AffordabilityCalculatorPage'
import BondRepaymentCalculator from './BondRepaymentCalculator'
import CashFlowCalculatorPage from './CashFlowCalculatorPage'
import RentalYieldCalculatorPage from './RentalYieldCalculatorPage'
import RoiCalculatorPage from './RoiCalculatorPage'
import TransferCostCalculatorPage from './TransferCostCalculatorPage'
import { breadcrumbJsonLd, setPageSeo, softwareApplicationJsonLd, webPageJsonLd } from '../lib/seo'

export default function ToolDetail({ tool }) {
  const category = getToolCategory(tool?.category)
  const Icon = tool?.icon || Calculator
  const relatedTools = tools
    .filter((item) => item.category === tool?.category && item.slug !== tool?.slug)
    .slice(0, 3)

  useEffect(() => {
    if (!tool) return
    if (tool.category === 'buyers' && ['affordability-calculator', 'bond-repayment-calculator', 'transfer-cost-calculator'].includes(tool.slug)) return
    if (tool.category === 'investors' && ['cash-flow-calculator', 'rental-yield-calculator', 'roi-calculator'].includes(tool.slug)) return
    setPageSeo({
      title: `${tool.title} | Property Tools | Arch9`,
      description: tool.description,
      canonicalPath: getToolHref(tool),
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', href: '/' },
          { name: 'Tools', href: '/tools' },
          { name: category?.title || 'Property Tools', href: category?.href || '/tools' },
          { name: tool.title, href: getToolHref(tool) },
        ]),
        webPageJsonLd({
          name: `${tool.title} | Property Tools | Arch9`,
          description: tool.description,
          path: getToolHref(tool),
        }),
        softwareApplicationJsonLd({
          name: tool.title,
          description: tool.description,
          path: getToolHref(tool),
          applicationCategory: 'FinanceApplication',
          audience: [category?.title || 'Property teams'],
        }),
      ],
    })
  }, [category, tool])

  if (tool?.category === 'buyers' && tool?.slug === 'affordability-calculator') {
    return <AffordabilityCalculatorPage />
  }

  if (tool?.category === 'buyers' && tool?.slug === 'bond-repayment-calculator') {
    return <BondRepaymentCalculator />
  }

  if (tool?.category === 'buyers' && tool?.slug === 'transfer-cost-calculator') {
    return <TransferCostCalculatorPage />
  }

  if (tool?.category === 'investors' && tool?.slug === 'rental-yield-calculator') {
    return <RentalYieldCalculatorPage />
  }

  if (tool?.category === 'investors' && tool?.slug === 'roi-calculator') {
    return <RoiCalculatorPage />
  }

  if (tool?.category === 'investors' && tool?.slug === 'cash-flow-calculator') {
    return <CashFlowCalculatorPage />
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] text-[#101828]">
        <Header />
        <main className="px-6 pb-20 pt-[132px] md:px-8">
          <div className="mx-auto max-w-[980px] rounded-[24px] border border-black/[0.06] bg-white p-8 text-center shadow-[0_18px_54px_rgba(16,24,40,0.045)]">
            <h1 className="text-3xl font-extrabold tracking-[-0.04em]">Tool not found.</h1>
            <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">This property tool is not available yet.</p>
            <a href="/tools" className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#0D4F45] px-6 text-sm font-extrabold text-white">
              View all tools
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#101828]">
      <Header />
      <main>
        <section className="px-6 pb-14 pt-[132px] md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1240px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <a href="/tools" className="inline-flex min-h-10 items-center gap-2 text-sm font-extrabold text-[#0D4F45]">
                <ArrowLeft className="h-4 w-4" />
                Property Tools
              </a>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-[#0D4F45]">{category?.title || 'Tools'}</p>
              <h1 className="mt-5 max-w-[760px] text-[3rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#101828] md:text-[4.7rem]">
                {tool.title}
              </h1>
              <p className="mt-6 max-w-[680px] text-lg font-medium leading-8 text-[#344054]">{tool.description}</p>
            </div>
            <div className="rounded-[30px] border border-black/[0.06] bg-white p-7 shadow-[0_24px_76px_rgba(16,24,40,0.06)] md:p-9">
              <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#EAF4EF] text-[#0D4F45]">
                <Icon className="h-8 w-8" />
              </div>
              <h2 className="mt-8 text-2xl font-extrabold tracking-[-0.04em] text-[#101828]">Calculator coming soon.</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[#667085]">
                This page is ready for the interactive tool module. For now, it gives Arch9 an SEO-friendly destination and lead-generation path.
              </p>
              <div className="mt-8 grid gap-3">
                {['Clear assumptions', 'Role-specific guidance', 'Connected next step'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[16px] bg-[#F7F4EE] px-4 py-3 text-sm font-bold text-[#101828]">
                    <CheckCircle2 className="h-4 w-4 text-[#0D4F45]" />
                    {item}
                  </div>
                ))}
              </div>
              <a href="/contact" className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0D4F45] px-6 text-sm font-extrabold text-white">
                Ask Arch9 for help
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {relatedTools.length ? (
          <section className="px-6 pb-16 md:px-8 md:pb-20">
            <div className="mx-auto w-full max-w-[1240px]">
              <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-[#101828]">Related {category?.title?.toLowerCase()} tools</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {relatedTools.map((item) => {
                  const RelatedIcon = item.icon
                  return (
                    <a key={item.slug} href={getToolHref(item)} className="group rounded-[18px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_54px_rgba(16,24,40,0.045)] transition hover:-translate-y-1 hover:border-[#0D4F45]/28">
                      <RelatedIcon className="h-6 w-6 text-[#0D4F45]" />
                      <h3 className="mt-5 text-xl font-extrabold tracking-[-0.035em] text-[#101828]">{item.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">{item.description}</p>
                    </a>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
