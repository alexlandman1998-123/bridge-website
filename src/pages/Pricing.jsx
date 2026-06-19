import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionContainer from '../components/SectionContainer'

const plans = [
  {
    name: 'Starter',
    price: 'From R7,500 / month',
    copy: 'For smaller teams bringing one transaction stream into one clear place.',
    points: [
      'A clear home for the deal',
      'Right access for the right people',
      'Documents and progress in view',
      'Client visibility from day one',
    ],
  },
  {
    name: 'Growth',
    price: 'From R18,500 / month',
    copy: 'For growing teams with more people, more files, and more deals to keep aligned.',
    points: [
      'Everything in Starter',
      'Roll out across more teams',
      'See movement and bottlenecks clearly',
      'Guided onboarding and rollout support',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    copy: 'For high-volume operations that need more control and a tailored rollout.',
    points: [
      'Everything in Growth',
      'Dedicated implementation support',
      'Governance for larger teams',
      'Commercial terms shaped to scale',
    ],
  },
]

export default function Pricing() {
  useEffect(() => {
    document.title = 'Pricing | Arch9'

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    description.setAttribute(
      'content',
      'Arch9 pricing is shaped around your transaction volume, team size, and rollout scope.'
    )
  }, [])

  return (
    <div className="bridge-site-bg min-h-screen text-[#171412]">
      <Header />

      <main>
        <SectionContainer className="pb-12 pt-14 lg:pt-20">
          <div className="mx-auto max-w-[860px] text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b7760]">
              Pricing
            </p>
            <h1 className="mt-6 text-[3.2rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#171412] sm:text-[4.2rem] lg:text-[4.8rem]">
              Pricing shaped around how your team moves together.
            </h1>
            <p className="mx-auto mt-5 max-w-[680px] text-[1rem] leading-8 text-[#6e6357]">
              Arch9 pricing is based on the number of roles, transactions, and rollout scope you need in one shared system.
            </p>
          </div>
        </SectionContainer>

        <SectionContainer className="pt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[30px] border p-7 shadow-[0_20px_56px_rgba(23,20,18,0.07)] ${
                  plan.featured
                    ? 'border-[#201b16] bg-[#171412] text-white'
                    : 'border-[#e5dacb] bg-white'
                }`}
              >
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${
                    plan.featured ? 'text-[#cdb69b]' : 'text-[#8b7760]'
                  }`}
                >
                  {plan.name}
                </p>
                <p className="mt-4 text-[1.65rem] font-semibold tracking-[-0.05em]">{plan.price}</p>
                <p className={`mt-4 text-sm leading-7 ${plan.featured ? 'text-white/72' : 'text-[#6e6357]'}`}>
                  {plan.copy}
                </p>

                <div className="mt-6 space-y-3">
                  {plan.points.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.featured ? 'text-[#eadcc7]' : 'text-[#7b6854]'
                        }`}
                      />
                      <span className={`text-sm ${plan.featured ? 'text-white/78' : 'text-[#5c5349]'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer>
          <div className="rounded-[34px] border border-[#201b16] bg-[#171412] p-8 text-white shadow-[0_30px_90px_rgba(23,20,18,0.14)] lg:p-12">
            <h2 className="text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.05em] lg:text-[3rem]">
              Need a rollout tailored to your team?
            </h2>
            <p className="mt-4 max-w-[44rem] text-[1rem] leading-8 text-white/72">
              We scope pricing against your transaction model, role setup, expected volume, and implementation sequence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary">
                Book a pricing call
              </a>
              <a href="/platform/overview" className="bridge-button-secondary">
                View platform
              </a>
            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  )
}
