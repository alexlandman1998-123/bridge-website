import { CheckCircle2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionContainer from '../components/SectionContainer'

const plans = [
  {
    name: 'Starter',
    price: 'From R7,500 / month',
    copy: 'For smaller teams starting with one module and one workflow stream.',
    points: [
      'Core transaction workspace',
      'Role-based access for core users',
      'Document workflow tracking',
      'Client portal baseline',
    ],
  },
  {
    name: 'Growth',
    price: 'From R18,500 / month',
    copy: 'For growing teams running multiple roles and active transaction books.',
    points: [
      'Everything in Starter',
      'Module rollout across teams',
      'Reporting and performance dashboards',
      'Workflow support and onboarding',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    copy: 'For high-volume operations requiring custom rollout and governance.',
    points: [
      'Everything in Growth',
      'Dedicated implementation support',
      'Advanced controls and governance',
      'Commercial terms aligned to scale',
    ],
  },
]

export default function Pricing() {
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
              Pricing built around your workflow complexity.
            </h1>
            <p className="mx-auto mt-5 max-w-[680px] text-[1rem] leading-8 text-[#6e6357]">
              Bridge 9 pricing is based on the number of roles, modules, and transaction volume you need to run in one shared workspace.
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
              Need a custom rollout plan?
            </h2>
            <p className="mt-4 max-w-[44rem] text-[1rem] leading-8 text-white/72">
              We scope pricing against your real transaction model, role setup, expected volume, and implementation sequence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary">
                Book a pricing call
              </a>
              <a href="/#platform" className="bridge-button-secondary">
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
