import { useEffect } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ClipboardList,
  Eye,
  Home,
  Landmark,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const heroImage =
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85'

const supportBenefits = [
  {
    icon: Users,
    title: 'More leads',
    copy: 'Quality enquiries that convert.',
  },
  {
    icon: Zap,
    title: 'Faster deals',
    copy: 'Keep transactions moving.',
  },
  {
    icon: TrendingUp,
    title: 'More commission',
    copy: 'Get paid sooner with fewer delays.',
  },
]

const pipelineSteps = [
  { label: 'Property Listed', detail: '12 May 2024', complete: true, icon: Home },
  { label: 'Buyer Enquiry', detail: '14 active enquiries', complete: true, icon: Search },
  { label: 'Offer Accepted', detail: '3 offers received', complete: true, icon: ClipboardList },
  { label: 'Bond Approved', detail: '1 approved', active: true, complete: true, icon: Landmark },
  { label: 'Transfer', detail: 'In progress', icon: BriefcaseBusiness },
  { label: 'Registration', detail: 'Awaiting lodgement', icon: ShieldCheck },
  { label: 'Commission Paid', detail: 'Pending', icon: WalletCards },
]

const featureCards = [
  {
    icon: UserRoundCheck,
    title: 'Generate more leads',
    copy: 'List on Arch9 and get in front of serious buyers actively looking to purchase.',
  },
  {
    icon: Home,
    title: 'Match buyers to properties',
    copy: 'Connect buyers to the right properties automatically.',
  },
  {
    icon: ClipboardList,
    title: 'Track transactions',
    copy: 'See exactly where every deal stands and what needs your attention.',
  },
  {
    icon: WalletCards,
    title: 'Get paid faster',
    copy: 'Reduce delays, improve communication and reach registration sooner.',
  },
]

const marketplaceStats = [
  { icon: BarChart3, value: '2,450+', label: 'Active agents' },
  { icon: Users, value: '18,600+', label: 'Properties listed' },
  { icon: Eye, value: '320K+', label: 'Monthly views' },
  { icon: CheckCircle2, value: 'R2.1B+', label: 'Value transacted' },
]

const activityCards = [
  {
    status: 'New Enquiries',
    title: '4 Bedroom House',
    area: 'Bryanston',
    metric: '12',
    label: 'New enquiries',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
  },
  {
    status: 'Offer Received',
    title: '3 Bedroom Cluster',
    area: 'Fourways',
    metric: '2',
    label: 'Offers received',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
  },
  {
    status: 'Transfer In Progress',
    title: '2 Bedroom Apartment',
    area: 'Sandton',
    metric: '1',
    label: 'Transfer in progress',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80',
  },
]

const agencyLogos = ['RE/MAX', 'Harcourts', 'Pam Golding', 'Century 21', 'Just Property', 'Leapfrog', 'KW Applets']

function PipelineVisual() {
  return (
    <div className="relative min-h-[520px]">
      <div
        className="absolute inset-0 rounded-[34px] bg-cover bg-center shadow-[0_28px_90px_rgba(5,8,7,0.18)]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(248,244,236,0.06) 0%, rgba(248,244,236,0.24) 42%, rgba(5,18,15,0.4) 100%), url(${heroImage})`,
        }}
      />
      <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.82),transparent_32%),linear-gradient(90deg,rgba(248,244,236,0.34),rgba(248,244,236,0.04))]" />

      <div className="relative mx-auto flex min-h-[520px] max-w-[600px] items-center justify-center px-5 py-8">
        <div className="w-full max-w-[330px] rounded-[22px] border border-white/70 bg-white/92 p-6 shadow-[0_24px_80px_rgba(5,8,7,0.16)] backdrop-blur-2xl">
          <p className="text-sm font-extrabold text-[#071E1A]">Your transaction pipeline</p>
          <div className="mt-5 grid gap-3">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.label}
                  className={`relative flex items-center gap-3 rounded-[16px] p-2.5 ${
                    step.active ? 'bg-[#E8F3EB] shadow-[inset_0_0_0_1px_rgba(0,107,77,0.1)]' : ''
                  }`}
                >
                  {index < pipelineSteps.length - 1 ? <span className="absolute left-[21px] top-[38px] h-[20px] w-px bg-[#0A3028]/10" /> : null}
                  <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${step.complete ? 'bg-[#064537] text-white' : 'bg-[#F0EDE6] text-[#6A716A]'}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-extrabold text-[#071E1A]">{step.label}</span>
                    <span className="mt-0.5 block text-[11px] font-semibold text-[#6A716A]">{step.detail}</span>
                  </span>
                  {step.complete ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#064537]/28 text-[#064537]">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>

        <div className="absolute right-2 top-[26%] hidden w-[170px] rounded-[18px] border border-white/70 bg-white/94 p-5 shadow-[0_18px_54px_rgba(5,8,7,0.16)] backdrop-blur-xl xl:block">
          <p className="text-3xl font-extrabold text-[#071E1A]">14</p>
          <p className="mt-1 text-xs font-bold text-[#31433D]">Active Buyers</p>
          <p className="mt-2 text-[11px] font-semibold text-[#006B4D]">+25% vs last month</p>
        </div>
        <div className="absolute right-0 top-[45%] hidden w-[170px] rounded-[18px] border border-white/70 bg-white/94 p-5 shadow-[0_18px_54px_rgba(5,8,7,0.16)] backdrop-blur-xl xl:block">
          <p className="text-3xl font-extrabold text-[#071E1A]">3</p>
          <p className="mt-1 text-xs font-bold text-[#31433D]">Offers Received</p>
          <p className="mt-2 text-[11px] font-semibold text-[#006B4D]">+50% vs last month</p>
        </div>
        <div className="absolute bottom-[14%] right-6 hidden w-[170px] rounded-[18px] border border-white/70 bg-white/94 p-5 shadow-[0_18px_54px_rgba(5,8,7,0.16)] backdrop-blur-xl xl:block">
          <p className="text-3xl font-extrabold text-[#071E1A]">R2.1m</p>
          <p className="mt-1 text-xs font-bold text-[#31433D]">Value Transacted</p>
          <p className="mt-2 text-[11px] font-semibold text-[#006B4D]">On track</p>
        </div>
      </div>
    </div>
  )
}

function ActivityCard({ card }) {
  return (
    <a
      href="/contact"
      className="group overflow-hidden rounded-[16px] border border-[#0A3028]/10 bg-white shadow-[0_18px_54px_rgba(5,8,7,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(5,8,7,0.1)]"
    >
      <div
        className="relative h-[150px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,18,15,0.05), rgba(5,18,15,0.18)), url(${card.image})`,
        }}
      >
        <span className="absolute left-4 top-4 rounded-full bg-[#064537] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
          {card.status}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-sm font-extrabold text-[#071E1A]">{card.title}</h3>
        <p className="mt-1 text-xs font-semibold text-[#5B6B64]">{card.area}</p>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-3xl font-extrabold text-[#071E1A]">{card.metric}</p>
            <p className="mt-1 text-xs font-semibold text-[#5B6B64]">{card.label}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#006B4D]/24 text-[#006B4D] transition group-hover:bg-[#064537] group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  )
}

export default function Sell() {
  useEffect(() => {
    document.title = 'Turn Listings Into Registrations | Arch9'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Generate enquiries, qualify buyers and manage every transaction from listing to registration with Arch9.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#05120F]">
      <Header />

      <main className="pt-[96px]">
        <section className="overflow-hidden border-b border-[#0A3028]/8 px-6 pb-12 pt-8 md:px-8 lg:pb-16">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="py-4 md:py-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">For agents</p>
              <h1 className="mt-5 max-w-[660px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#071E1A] md:text-[5rem]">
                Turn listings into registrations.
              </h1>
              <p className="mt-6 max-w-[620px] text-base font-medium leading-8 text-[#31433D] md:text-lg">
                Generate enquiries, qualify buyers and manage every transaction from listing to registration - all in one place.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/contact" className="bridge-button-primary min-h-[54px] px-7">
                  List A Property
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#0A3028]/24 bg-white/72 px-7 text-sm font-extrabold text-[#071E1A] shadow-[0_12px_34px_rgba(5,8,7,0.04)] transition hover:-translate-y-0.5 hover:border-[#064537]/36 hover:bg-white"
                >
                  Book A Demo
                </a>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-3">
                {supportBenefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={benefit.title} className={`flex items-center gap-4 ${index ? 'sm:border-l sm:border-[#0A3028]/10 sm:pl-5' : ''}`}>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#064537] shadow-[0_12px_34px_rgba(5,8,7,0.06)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-[#071E1A]">{benefit.title}</p>
                        <p className="mt-1 text-xs font-semibold leading-5 text-[#31433D]">{benefit.copy}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <PipelineVisual />
          </div>
        </section>

        <section className="px-6 py-14 md:px-8 md:py-18">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="mx-auto max-w-[760px] text-center text-[2rem] font-extrabold tracking-[-0.04em] text-[#071E1A] md:text-[2.5rem]">
              Everything an agent needs to close more deals.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <article key={feature.title} className={`p-4 ${index ? 'xl:border-l xl:border-[#0A3028]/10 xl:pl-10' : ''}`}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#E8F3EB] text-[#064537]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-7 text-xl font-extrabold tracking-[-0.03em] text-[#071E1A]">{feature.title}</h3>
                    <p className="mt-4 text-base font-medium leading-7 text-[#31433D]">{feature.copy}</p>
                  </article>
                )
              })}
            </div>

            <div className="mt-12 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#05352D,#08221D)] px-6 py-7 text-white shadow-[0_24px_80px_rgba(5,8,7,0.16)] md:px-9">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {marketplaceStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className={`flex items-center gap-5 ${index ? 'xl:border-l xl:border-white/12 xl:pl-8' : ''}`}>
                      <Icon className="h-9 w-9 text-[#8BD9B0]" />
                      <div>
                        <p className="text-3xl font-extrabold tracking-[-0.04em]">{stat.value}</p>
                        <p className="mt-1 text-sm font-semibold text-white/82">{stat.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-12 md:px-8 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">Recent success from agents like you.</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {activityCards.map((card) => (
                  <ActivityCard key={card.title} card={card} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">Trusted by top performing agents.</h2>
              <div className="mt-6 rounded-[22px] bg-white/58 p-7">
                <p className="text-[4rem] font-extrabold leading-none text-[#0A3028]/18">“</p>
                <blockquote className="-mt-5 max-w-[520px] text-[1.7rem] font-semibold leading-[1.22] tracking-[-0.04em] text-[#071E1A]">
                  Arch9 has completely changed the way I run my business. My transactions move faster, my clients are happier and I get paid sooner.
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                    alt=""
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-extrabold text-[#071E1A]">Nadine van der Merwe</p>
                    <p className="mt-1 text-xs font-semibold text-[#5B6B64]">Top Agent</p>
                  </div>
                </div>
                <div className="mt-7 flex gap-2">
                  {[0, 1, 2, 3].map((dot) => (
                    <span key={dot} className={`h-2 w-2 rounded-full ${dot === 0 ? 'bg-[#006B4D]' : 'bg-[#0A3028]/12'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-10 md:px-8">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 rounded-[20px] bg-[linear-gradient(135deg,#05352D,#08221D)] p-7 text-white shadow-[0_24px_80px_rgba(5,8,7,0.16)] md:flex-row md:items-center md:justify-between md:p-9">
            <div className="flex items-center gap-6">
              <div className="hidden h-20 w-20 items-center justify-center rounded-[18px] bg-white text-[#064537] md:flex">
                <Rocket className="h-9 w-9" />
              </div>
              <div>
                <h2 className="text-[2rem] font-extrabold tracking-[-0.04em] md:text-[2.4rem]">Ready to grow your business?</h2>
                <p className="mt-2 max-w-[620px] text-sm font-medium leading-6 text-white/82 md:text-base">
                  Join agents who are generating more enquiries and closing more deals with Arch9.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[52px] justify-center px-7">
                List A Property
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="bridge-button-secondary min-h-[52px] justify-center border-white/24 bg-transparent px-7 text-white">
                Book A Demo
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="text-xs font-semibold text-[#6A716A]">Proudly powering agents and agencies across South Africa</p>
            <div className="mt-6 grid grid-cols-2 gap-7 text-[#071E1A]/54 grayscale transition md:grid-cols-4 xl:grid-cols-7">
              {agencyLogos.map((logo) => (
                <div key={logo} className="flex min-h-12 items-center text-xl font-black tracking-[-0.04em] transition hover:text-[#071E1A]">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
