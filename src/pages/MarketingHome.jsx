import { useEffect } from 'react'
import { ArrowRight, CheckCircle2, CircleDot, FileCheck2, Landmark, ShieldCheck, UsersRound, Workflow } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FadeUp } from '../components/motion/Reveal'
import ConnectedJourney from '../components/role/ConnectedJourney'
import RoleSelector from '../components/role/RoleSelector'
import { itemListJsonLd, setPageSeo, softwareApplicationJsonLd, webPageJsonLd, websiteJsonLd } from '../lib/seo'

const connectedPreviewPage = {
  journey: {
    title: 'One transaction. Every role player connected.',
    copy: 'Arch9 gives each role their own workspace while keeping the transaction itself connected.',
    activeRoles: ['Developer', 'Agent', 'Buyer / Seller', 'Finance', 'Attorney', 'Registration'],
  },
}

const principles = [
  {
    icon: Workflow,
    title: 'One shared transaction record',
    copy: 'Every update, document and milestone belongs to the same connected journey.',
  },
  {
    icon: UsersRound,
    title: 'Role-specific workspaces',
    copy: 'Agents, developers, attorneys, originators and clients each see what matters to them.',
  },
  {
    icon: ShieldCheck,
    title: 'Clarity from sold to registered',
    copy: 'Less chasing across WhatsApp, email and spreadsheets. More visible progress.',
  },
]

function TransactionPreview() {
  const steps = [
    { label: 'Listed', state: 'done' },
    { label: 'Offer', state: 'done' },
    { label: 'OTP', state: 'done' },
    { label: 'Buyer onboarding', state: 'active' },
    { label: 'Finance', state: 'active' },
    { label: 'Transfer', state: 'next' },
    { label: 'Registration', state: 'next' },
  ]

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#0A3028]/10 bg-white shadow-[0_34px_110px_rgba(7,30,26,0.13)]">
      <div className="flex items-center gap-2 border-b border-[#0A3028]/8 bg-[#F8FAF7] px-5 py-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#B9D9C9]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#DDE6DF]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#DDE6DF]" />
        <span className="ml-2 rounded-full bg-[#EAF7F0] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#064537]">
          Transaction infrastructure
        </span>
      </div>
      <div className="p-5 md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">Arch9 live deal</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">From sold to registered</h2>
            <p className="mt-2 text-sm font-semibold text-[#5B6B64]">Buyer · Seller · Agent · Finance · Attorney</p>
          </div>
          <span className="w-fit rounded-full border border-[#0A3028]/10 bg-[#F7F9F6] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#064537]">
            Live
          </span>
        </div>

        <div className="mt-7 grid gap-3">
          {steps.map((step, index) => {
            const done = step.state === 'done'
            const active = step.state === 'active'
            return (
              <div key={step.label} className={`flex items-center gap-3 rounded-[16px] border p-4 ${active ? 'border-[#0E6A55]/20 bg-[#EAF7F0]' : 'border-[#0A3028]/8 bg-white'}`}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${done ? 'bg-[#064537] text-white' : active ? 'bg-[#86E4C2] text-[#064537]' : 'bg-[#F1F5F2] text-[#6B7B74]'}`}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <CircleDot className="h-4 w-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-extrabold text-[#071E1A]">{step.label}</span>
                  <span className="mt-1 block text-xs font-semibold text-[#5B6B64]">
                    {active ? 'Currently moving' : done ? 'Completed and visible' : 'Coming next'}
                  </span>
                </span>
                <span className="hidden text-[11px] font-black uppercase tracking-[0.12em] text-[#0E6A55] sm:block">{String(index + 1).padStart(2, '0')}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-5 rounded-[18px] border border-[#0A3028]/8 bg-[#071E1A] p-5 text-white">
          <div className="flex items-start gap-3">
            <FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-[#86E4C2]" />
            <div>
              <p className="text-sm font-extrabold">Latest update</p>
              <p className="mt-2 text-sm font-medium leading-6 text-white/68">
                Buyer documents received. Finance partner and transfer attorney can now see the updated transaction state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MarketingHome() {
  useEffect(() => {
    const description =
      'Arch9 connects the people, documents and processes behind every property transaction from sold to registered.'

    setPageSeo({
      title: 'Arch9 | The Property Transaction. Finally Connected.',
      description,
      canonicalPath: '/',
      jsonLd: [
        websiteJsonLd(),
        webPageJsonLd({
          name: 'Arch9 | The Property Transaction. Finally Connected.',
          description,
          path: '/',
        }),
        softwareApplicationJsonLd({
          description,
          path: '/',
          audience: ['Estate agents', 'Property developers', 'Conveyancing attorneys', 'Bond originators', 'Property buyers', 'Property sellers'],
          featureList: ['Role-based workspaces', 'Shared transaction timeline', 'Document and milestone tracking', 'Client transaction portals'],
        }),
        itemListJsonLd([
          { name: 'For Estate Agents', href: '/solutions/agents' },
          { name: 'For Developers', href: '/solutions/developers' },
          { name: 'For Attorneys', href: '/solutions/attorneys' },
          { name: 'For Bond Originators', href: '/solutions/bond-originators' },
          { name: 'For Buyers and Sellers', href: '/solutions/buyers-sellers' },
        ]),
      ],
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#071E1A]">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#FAF8F3] px-5 pb-14 pt-[118px] md:px-8 md:pb-20 md:pt-[138px]">
          <div className="absolute inset-x-0 top-0 h-[60%] bg-[linear-gradient(180deg,#FFFFFF_0%,#FAF8F3_100%)]" />
          <div className="relative mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[0.43fr_0.57fr] lg:items-center">
            <FadeUp>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">ARCH9</p>
              <h1 className="mt-5 max-w-[760px] text-[3rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#071E1A] md:text-[5rem] xl:text-[6rem]">
                The property transaction.
                <span className="block text-[#0E6A55]">Finally connected.</span>
              </h1>
              <p className="mt-7 max-w-[620px] text-base font-medium leading-8 text-[#52645D] md:text-lg">
                From sold to registered, Arch9 connects the people, documents and processes behind every transaction.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#roles" className="bridge-button-primary">
                  Find your role
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/platform" className="bridge-button-secondary border-[#0A3028]/12 bg-white/78 text-[#071E1A]">
                  Explore Arch9
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <TransactionPreview />
            </FadeUp>
          </div>
        </section>

        <section className="bg-white px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid w-full max-w-[1400px] gap-4 md:grid-cols-3">
            {principles.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-[16px] border border-[#0A3028]/8 bg-white p-5">
                  <Icon className="h-6 w-6 text-[#0E6A55]" />
                  <h2 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#071E1A]">{item.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{item.copy}</p>
                </article>
              )
            })}
          </div>
        </section>

        <RoleSelector className="bg-[#FAF8F3] px-5 py-16 md:px-8 md:py-24" />

        <ConnectedJourney page={connectedPreviewPage} />

        <section className="bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid w-full max-w-[1400px] gap-8 rounded-[22px] border border-[#0A3028]/8 bg-[#FAF8F3] p-7 md:p-10 lg:grid-cols-[0.68fr_0.32fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">The Arch9 idea</p>
              <h2 className="mt-4 text-[2.25rem] font-extrabold leading-[1] tracking-[-0.045em] text-[#071E1A] md:text-[3.7rem]">
                Different work. One transaction.
              </h2>
              <p className="mt-5 max-w-[760px] text-base font-medium leading-8 text-[#5B6B64]">
                Arch9 is not another isolated CRM. It is transaction infrastructure for the moment where property professionals,
                finance teams, attorneys, buyers and sellers all need the same deal to move.
              </p>
            </div>
            <div className="grid gap-3">
              {['Buyer and seller portals', 'Finance and transfer visibility', 'One connected registration journey'].map((item) => (
                <p key={item} className="flex items-center gap-3 rounded-[14px] bg-white px-4 py-3 text-sm font-extrabold text-[#071E1A]">
                  <Landmark className="h-4 w-4 text-[#0E6A55]" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
