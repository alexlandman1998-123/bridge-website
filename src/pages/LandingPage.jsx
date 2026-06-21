import { useEffect } from 'react'
import { ArrowRight, Building2, CheckCircle2, FileStack, Landmark, LayoutDashboard, Users, WalletCards } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import heroImage from '../assets/hero.png'
import { landingPages } from '../config/landingPages'

const pageIcons = {
  sell: Building2,
  agents: Users,
  attorneys: Landmark,
  'bond-originators': WalletCards,
  developers: Building2,
  platform: LayoutDashboard,
}

const proofPoints = [
  'Listings and transaction context stay connected',
  'Every party works from the same live progress view',
  'Documents, updates, and next actions are easier to track',
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

export default function LandingPage({ pageKey }) {
  const page = landingPages[pageKey] || landingPages.platform
  const Icon = pageIcons[pageKey] || FileStack
  const secondaryHref = page.secondaryHref || '/buy'
  const secondaryLabel = page.secondaryLabel || 'View listings'

  useEffect(() => {
    document.title = page.metaTitle
    setMetaDescription(page.subtitle)
  }, [page])

  return (
    <div className="bridge-site-bg min-h-screen text-[#05120F]">
      <Header />

      <main className="pt-[112px]">
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-16 pt-8 md:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:pb-24 lg:pt-14">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-[760px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem] xl:text-[6rem]">
              {page.title}
            </h1>
            <p className="mt-6 max-w-[650px] text-lg font-medium leading-8 text-[#31433D]">{page.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={page.href} className="bridge-button-primary">
                {page.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href={secondaryHref} className="bridge-button-secondary border-[#0A3028]/12 bg-white/72 text-[#071E1A]">
                {secondaryLabel}
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[34px] border border-[#0A3028]/10 bg-[#071E1A] shadow-[0_34px_110px_rgba(5,8,7,0.18)]">
            <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-42" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,30,26,0.18),rgba(7,30,26,0.94))]" />
            <div className="relative flex min-h-[420px] flex-col justify-end p-6 text-[#F3EEE6] md:p-8">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[20px] border border-[rgba(134,228,194,0.28)] bg-white/[0.08] text-[#86E4C2] backdrop-blur-xl">
                <Icon className="h-6 w-6" />
              </div>
              <div className="rounded-[28px] border border-white/12 bg-white/[0.08] p-5 backdrop-blur-2xl md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#86E4C2]">Connected workflow</p>
                <div className="mt-5 grid gap-3">
                  {proofPoints.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#86E4C2]" />
                      <span className="text-sm font-semibold leading-6 text-[#F3EEE6]/82">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
