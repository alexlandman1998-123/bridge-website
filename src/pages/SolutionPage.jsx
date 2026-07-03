import { useEffect } from 'react'
import { ArrowRight, CheckCircle2, CircleDot, FileStack, Layers3, UsersRound } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { solutionPages } from '../config/solutionPages'
import { breadcrumbJsonLd, serviceJsonLd, setPageSeo, softwareApplicationJsonLd } from '../lib/seo'

function SolutionHero({ page }) {
  return (
    <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-14 pt-[128px] md:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:pb-20">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">{page.eyebrow}</p>
        <h1 className="mt-5 max-w-[760px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem]">
          {page.title}
        </h1>
        <p className="mt-6 max-w-[650px] text-lg font-medium leading-8 text-[#31433D]">{page.subtitle}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/contact" className="bridge-button-primary min-h-[54px] px-7">
            {page.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </a>
          {page.secondaryCta ? (
            <a href="/contact" className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#0A3028]/18 bg-white/72 px-7 text-sm font-extrabold text-[#071E1A] transition hover:bg-white">
              {page.secondaryCta}
            </a>
          ) : null}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[34px] border border-[#0A3028]/10 bg-[#071E1A] p-5 text-white shadow-[0_34px_110px_rgba(5,8,7,0.18)] md:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(134,228,194,0.16),transparent_32%),linear-gradient(135deg,#071E1A,#0A3028)]" />
        <div className="relative rounded-[28px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">{page.visualLabel}</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-white">{page.workflowTitle}</h2>
            </div>
            <Layers3 className="hidden h-8 w-8 text-[#86E4C2] sm:block" />
          </div>

          <div className="mt-7 grid gap-3">
            {page.workflow.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.07] px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#86E4C2]/16 text-[#86E4C2]">
                  {index < 3 ? <CheckCircle2 className="h-4 w-4" /> : <CircleDot className="h-4 w-4" />}
                </span>
                <span className="text-sm font-bold text-white/88">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
          {page.metrics.map((metric) => (
            <div key={metric.label} className="rounded-[22px] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
              <p className="text-2xl font-extrabold text-white">{metric.value}</p>
              <p className="mt-1 text-xs font-semibold text-white/70">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionFeatureGrid({ page }) {
  return (
    <section className="px-6 py-14 md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="max-w-[760px] text-[2.1rem] font-extrabold leading-tight tracking-[-0.04em] text-[#071E1A] md:text-[3rem]">
          {page.sectionHeading}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {page.features.map((feature) => (
            <div key={feature} className="rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#E8F3EB] text-[#064537]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="mt-5 text-base font-extrabold leading-6 text-[#071E1A]">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionWorkflow({ page }) {
  return (
    <section className="px-6 pb-14 md:px-8 md:pb-16">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 rounded-[30px] border border-[#0A3028]/8 bg-white/74 p-6 shadow-[0_24px_80px_rgba(5,8,7,0.06)] md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Workflow</p>
          <h2 className="mt-4 text-[2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">{page.workflowTitle}</h2>
          <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">
            Keep the people, documents, milestones and next steps for each transaction in one connected workspace.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {page.workflow.map((step, index) => (
            <div key={`${step}-${index}`} className="flex items-center gap-3 rounded-[18px] border border-[#0A3028]/8 bg-[#F8F4EC] px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#064537] text-sm font-extrabold text-white">{index + 1}</span>
              <span className="text-sm font-extrabold text-[#071E1A]">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionCTA({ page }) {
  return (
    <section className="px-6 pb-16 md:px-8 md:pb-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 rounded-[26px] bg-[linear-gradient(135deg,#05352D,#08221D)] p-7 text-white shadow-[0_24px_80px_rgba(5,8,7,0.16)] md:flex-row md:items-center md:justify-between md:p-9">
        <div className="flex items-center gap-5">
          <div className="hidden h-16 w-16 items-center justify-center rounded-[18px] bg-white text-[#064537] md:flex">
            <UsersRound className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-[2rem] font-extrabold tracking-[-0.04em]">Ready to connect your property workflow?</h2>
            <p className="mt-2 max-w-[640px] text-sm font-medium leading-6 text-white/82">
              See how Arch9 helps your team move from first enquiry to registration with less chasing and more clarity.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[52px] justify-center px-7">
            {page.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/contact" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/24 px-7 text-sm font-extrabold text-white transition hover:bg-white/10">
            Book A Demo
          </a>
        </div>
      </div>
    </section>
  )
}

export default function SolutionPage({ pageKey }) {
  const page = solutionPages[pageKey] || solutionPages.platform
  const canonicalPath = solutionPages[pageKey] ? `/solutions/${pageKey}` : '/platform'

  useEffect(() => {
    setPageSeo({
      title: page.metaTitle,
      description: page.metaDescription,
      canonicalPath,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', href: '/' },
          { name: 'Solutions', href: '/platform' },
          { name: page.eyebrow || page.title, href: canonicalPath },
        ]),
        serviceJsonLd({
          name: page.metaTitle.replace(' | Arch9', ''),
          description: page.metaDescription,
          path: canonicalPath,
          serviceType: 'Property transaction workspace',
          audience: [page.eyebrow || 'Property teams'],
        }),
        softwareApplicationJsonLd({
          name: page.metaTitle.replace(' | Arch9', ''),
          description: page.metaDescription,
          path: canonicalPath,
          audience: [page.eyebrow || 'Property teams'],
          featureList: page.features?.slice(0, 6) || [],
        }),
      ],
    })
  }, [canonicalPath, page])

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#05120F]">
      <Header />
      <main>
        <SolutionHero page={page} />
        <SolutionFeatureGrid page={page} />
        <SolutionWorkflow page={page} />
        <SolutionCTA page={page} />
      </main>
      <Footer />
    </div>
  )
}
