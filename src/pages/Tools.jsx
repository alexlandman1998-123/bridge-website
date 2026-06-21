import { useEffect } from 'react'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getToolHref, getToolsByCategory, toolCategories, tools } from '../config/tools'

function setMetaDescription(content) {
  let description = document.querySelector('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.setAttribute('name', 'description')
    document.head.appendChild(description)
  }
  description.setAttribute('content', content)
}

function ToolCard({ tool }) {
  const Icon = tool.icon
  return (
    <a
      href={getToolHref(tool)}
      className="group rounded-[18px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_54px_rgba(16,24,40,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#0D4F45]/28 hover:shadow-[0_24px_76px_rgba(16,24,40,0.08)]"
    >
      <div className="flex h-13 w-13 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#101828]">{tool.title}</h3>
      <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">{tool.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0D4F45]">
        Open Tool
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </a>
  )
}

function CategoryCard({ category }) {
  const Icon = category.icon
  const categoryTools = getToolsByCategory(category.key)
  return (
    <a
      href={category.href}
      className="rounded-[20px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_54px_rgba(16,24,40,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#0D4F45]/28"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-[#101828]">{category.title}</h2>
      <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">{category.description}</p>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#0D4F45]">{categoryTools.length} tools</p>
    </a>
  )
}

export default function Tools() {
  useEffect(() => {
    document.title = 'Property Tools | Arch9'
    setMetaDescription('Free calculators, estimators and property intelligence tools for buyers, sellers, agents, investors and developers.')
  }, [])

  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 6)

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#101828]">
      <Header />
      <main>
        <section className="px-6 pb-14 pt-[132px] md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1320px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0D4F45]">Property intelligence</p>
              <h1 className="mt-5 max-w-[720px] text-[3.4rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#101828] md:text-[5rem]">
                Property Tools
              </h1>
              <p className="mt-6 max-w-[700px] text-lg font-medium leading-8 text-[#344054]">
                Free calculators, estimators and property intelligence tools. Built for buyers, sellers, agents, investors and developers.
              </p>
            </div>
            <div className="rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_22px_70px_rgba(16,24,40,0.06)] md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#071E1A] text-[#86E4C2]">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[#101828]">Find the right property answer faster.</h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#667085]">Browse tools by role, then move from estimate to action inside Arch9.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1320px] gap-5 md:grid-cols-2 xl:grid-cols-4">
            {toolCategories.map((category) => (
              <CategoryCard key={category.key} category={category} />
            ))}
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto w-full max-w-[1320px]">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0D4F45]">Featured tools</p>
                <h2 className="mt-3 text-[2.4rem] font-extrabold tracking-[-0.045em] text-[#101828]">Start with the essentials.</h2>
              </div>
              <p className="max-w-[460px] text-sm font-medium leading-6 text-[#667085]">
                A practical foundation for affordability, transaction costs, returns and pipeline value.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredTools.map((tool) => (
                <ToolCard key={`${tool.category}-${tool.slug}`} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {toolCategories.map((category) => {
          const categoryTools = getToolsByCategory(category.key)
          return (
            <section key={category.key} id={category.key} className="scroll-mt-28 px-6 pb-16 md:px-8 md:pb-20">
              <div className="mx-auto w-full max-w-[1320px]">
                <div className="mb-6">
                  <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-[#101828]">{category.title}</h2>
                  <p className="mt-2 max-w-[620px] text-sm font-medium leading-6 text-[#667085]">{category.description}</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {categoryTools.map((tool) => (
                    <ToolCard key={`${tool.category}-${tool.slug}`} tool={tool} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1320px] gap-8 rounded-[28px] bg-[#071E1A] p-7 text-white shadow-[0_26px_80px_rgba(7,30,26,0.18)] md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Property Intelligence</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] md:text-[3.4rem]">
                Free tools for better property decisions.
              </h2>
              <p className="mt-4 max-w-[760px] text-base font-medium leading-8 text-white/72">
                Use Arch9 tools to understand costs, returns and transaction progress, then connect the next step inside one shared workspace.
              </p>
            </div>
            <a href="/contact" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#F3EEE6] px-7 text-sm font-extrabold text-[#071E1A] transition hover:-translate-y-0.5">
              Book A Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 rounded-[24px] border border-black/[0.06] bg-white p-7 shadow-[0_18px_54px_rgba(16,24,40,0.045)] md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#101828]">Need a connected workspace after the estimate?</h2>
                <p className="mt-1 text-sm font-medium leading-6 text-[#667085]">Arch9 connects the calculations to the transaction journey.</p>
              </div>
            </div>
            <a href="/solutions/platform" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-black/[0.12] px-6 text-sm font-extrabold text-[#101828] transition hover:border-[#0D4F45]/28 hover:text-[#0D4F45]">
              Explore Platform
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
