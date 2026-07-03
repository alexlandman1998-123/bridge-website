import { useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getToolCategory, getToolHref, getToolsByCategory } from '../config/tools'
import { breadcrumbJsonLd, itemListJsonLd, setPageSeo, webPageJsonLd } from '../lib/seo'

function CategoryToolCard({ tool }) {
  const Icon = tool.icon
  return (
    <a
      href={getToolHref(tool)}
      className="group rounded-[18px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_54px_rgba(16,24,40,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#0D4F45]/28 hover:shadow-[0_24px_76px_rgba(16,24,40,0.08)]"
    >
      <div className="flex h-13 w-13 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-6 text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#101828]">{tool.title}</h2>
      <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">{tool.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0D4F45]">
        Open Tool
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </a>
  )
}

export default function ToolCategory({ categoryKey }) {
  const category = getToolCategory(categoryKey)
  const categoryTools = getToolsByCategory(categoryKey)
  const Icon = category?.icon

  useEffect(() => {
    if (!category) return
    const description = `${category.description} Explore free Arch9 tools for ${category.title.toLowerCase()}.`

    setPageSeo({
      title: `${category.title} Property Tools | Arch9`,
      description,
      canonicalPath: `/tools/${category.key}`,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', href: '/' },
          { name: 'Tools', href: '/tools' },
          { name: category.title, href: `/tools/${category.key}` },
        ]),
        webPageJsonLd({
          name: `${category.title} Property Tools | Arch9`,
          description,
          path: `/tools/${category.key}`,
          type: 'CollectionPage',
        }),
        itemListJsonLd(categoryTools.map((tool) => ({ name: tool.title, href: getToolHref(tool) }))),
      ],
    })
  }, [category, categoryTools])

  if (!category) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] text-[#101828]">
        <Header />
        <main className="px-6 pb-20 pt-[132px] md:px-8">
          <div className="mx-auto max-w-[980px] rounded-[24px] border border-black/[0.06] bg-white p-8 text-center shadow-[0_18px_54px_rgba(16,24,40,0.045)]">
            <h1 className="text-3xl font-extrabold tracking-[-0.04em]">Tool category not found.</h1>
            <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">Browse the complete Arch9 tools library instead.</p>
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
          <div className="mx-auto w-full max-w-[1240px]">
            <a href="/tools" className="inline-flex min-h-10 items-center gap-2 text-sm font-extrabold text-[#0D4F45]">
              <ArrowLeft className="h-4 w-4" />
              Property Tools
            </a>
            <div className="mt-8 grid gap-8 rounded-[30px] border border-black/[0.06] bg-white p-7 shadow-[0_24px_76px_rgba(16,24,40,0.06)] md:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#EAF4EF] text-[#0D4F45]">
                {Icon ? <Icon className="h-8 w-8" /> : null}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0D4F45]">{category.menuTitle}</p>
                <h1 className="mt-4 text-[3rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#101828] md:text-[4.5rem]">
                  {category.title} Property Tools
                </h1>
                <p className="mt-5 max-w-[760px] text-lg font-medium leading-8 text-[#344054]">{category.description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1240px] gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryTools.map((tool) => (
              <CategoryToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
