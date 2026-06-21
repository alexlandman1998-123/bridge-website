import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { appAuthUrl, demoHref } from '../config/navigation'

const rolePricing = {
  agents: {
    label: 'Agents',
    icon: Users,
    description: 'For estate agents and agencies of all sizes.',
    pricingLabel: 'Pricing for agents',
    plans: [
      {
        name: 'Professional',
        price: 'R299',
        annualPrice: 'R269',
        suffix: 'Per user / month',
        ideal: 'Perfect for individual agents.',
        intro: '',
        cta: 'Start Free Trial',
        href: appAuthUrl,
        features: ['CRM', 'Listings Management', 'Lead Management', 'Calendar & Appointments', 'Buyer Matching', 'Buyer Portal', 'Seller Portal', 'Mobile App Access'],
      },
      {
        name: 'Agency',
        price: 'R499',
        annualPrice: 'R449',
        suffix: 'Per user / month',
        ideal: 'Ideal for growing agencies and teams.',
        intro: 'Everything in Professional, plus:',
        cta: 'Start Free Trial',
        href: appAuthUrl,
        featured: true,
        features: [
          'Transaction Management',
          'Offer Management',
          'Document Generation',
          'Automated Follow-Ups',
          'Transaction Tracking',
          'Roleplayer Collaboration',
          'Principal Dashboard',
          'Advanced Reporting',
        ],
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        suffix: 'Tailored pricing for your business.',
        ideal: 'Built for large, multi-branch agencies.',
        intro: 'Everything in Agency, plus:',
        cta: 'Book a Demo',
        href: demoHref,
        features: ['Branch Management', 'Advanced Permissions', 'Custom Workflows', 'API Access', 'Custom Integrations', 'Dedicated Account Manager', 'Priority Support'],
      },
    ],
    comparison: [
      ['CRM', true, true, true],
      ['Listings Management', true, true, true],
      ['Lead Management', true, true, true],
      ['Buyer & Seller Portals', true, true, true],
      ['Transaction Management', false, true, true],
      ['Offer Management', false, true, true],
      ['Document Generation', false, true, true],
      ['Automated Follow-Ups', false, true, true],
      ['Principal Dashboard', false, true, true],
      ['Advanced Reporting', false, true, true],
      ['Branch Management', false, false, true],
      ['API Access', false, false, true],
    ],
    faqs: [
      ['Do I need a long-term contract?', 'No. You can cancel anytime.'],
      ['Can I migrate from my current CRM?', 'Yes. We help teams migrate listings, leads and core client information.'],
      ['Is onboarding included?', 'Yes. Onboarding is included so your team can get set up properly.'],
      ['Do buyers and sellers need accounts?', 'No. Buyers and sellers can receive updates and complete key actions without needing a paid account.'],
      ['Are credit checks included?', 'Credit checks are available as pay-as-you-use add-ons.'],
      ['Are FICA checks included?', 'FICA checks are available as pay-as-you-use add-ons.'],
    ],
  },
  attorneys: {
    label: 'Attorneys',
    icon: BriefcaseBusiness,
    description: 'For conveyancing firms and legal teams.',
    pricingLabel: 'Pricing for attorneys',
    plans: [
      {
        name: 'Professional',
        price: 'Custom Pricing',
        suffix: 'Designed around your matter volume.',
        ideal: 'For conveyancing firms and specialist legal teams.',
        cta: 'Book a Demo',
        href: demoHref,
        features: ['Transfer Matters', 'Bond Matters', 'Cancellation Matters', 'Document Requests', 'Matter Tracking', 'Client Updates'],
      },
      {
        name: 'Enterprise',
        price: 'Custom Pricing',
        suffix: 'For larger firms and multi-team operations.',
        ideal: 'For teams that need visibility, governance and reporting.',
        cta: 'Book a Demo',
        href: demoHref,
        featured: true,
        features: ['Team Management', 'Registration Forecasting', 'Workflow Automation', 'Director Dashboard', 'Performance Reporting'],
      },
    ],
    comparison: [
      ['Transfer Matters', true, true],
      ['Bond Matters', true, true],
      ['Cancellation Matters', true, true],
      ['Document Requests', true, true],
      ['Matter Tracking', true, true],
      ['Client Updates', true, true],
      ['Team Management', false, true],
      ['Registration Forecasting', false, true],
      ['Workflow Automation', false, true],
      ['Director Dashboard', false, true],
      ['Performance Reporting', false, true],
    ],
    faqs: [
      ['How is attorney pricing calculated?', 'Pricing is scoped around matter volume, users, teams and the workflows you need.'],
      ['Can Arch9 handle transfer, bond and cancellation matters?', 'Yes. Arch9 supports transfer matters, bond matters and cancellation matters.'],
      ['Can clients upload documents?', 'Yes. Clients can submit requested documents digitally.'],
      ['Can agents see matter progress?', 'Yes. You can keep agents informed with controlled transaction updates.'],
      ['Is director reporting included?', 'Director reporting is available on Enterprise plans.'],
      ['Do you help with onboarding?', 'Yes. We support setup, workflow mapping and team onboarding.'],
    ],
  },
  'bond-originators': {
    label: 'Bond Originators',
    icon: Landmark,
    description: 'For bond origination businesses and consultants.',
    pricingLabel: 'Pricing for bond originators',
    plans: [
      {
        name: 'Professional',
        price: 'Custom Pricing',
        suffix: 'Built around your application workflow.',
        ideal: 'For originators managing active applications.',
        cta: 'Book a Demo',
        href: demoHref,
        features: ['Applications', 'Buyer Portal', 'Bank Tracking', 'Consultant Workspace', 'Agent Updates'],
      },
      {
        name: 'Enterprise',
        price: 'Custom Pricing',
        suffix: 'For national, regional and branch teams.',
        ideal: 'For larger origination businesses that need performance visibility.',
        cta: 'Book a Demo',
        href: demoHref,
        featured: true,
        features: ['HQ Dashboard', 'Regional Management', 'Branch Management', 'Consultant Analytics', 'Bank Intelligence'],
      },
    ],
    comparison: [
      ['Applications', true, true],
      ['Buyer Portal', true, true],
      ['Bank Tracking', true, true],
      ['Consultant Workspace', true, true],
      ['Agent Updates', true, true],
      ['HQ Dashboard', false, true],
      ['Regional Management', false, true],
      ['Branch Management', false, true],
      ['Consultant Analytics', false, true],
      ['Bank Intelligence', false, true],
    ],
    faqs: [
      ['How is bond originator pricing calculated?', 'Pricing is scoped around application volume, consultants, branches and reporting needs.'],
      ['Can consultants manage applications in Arch9?', 'Yes. Consultants can manage applications, documents, bank submissions and follow-ups.'],
      ['Can buyers upload documents?', 'Yes. Buyers can upload requested documents through the buyer portal.'],
      ['Can agents receive updates?', 'Yes. Arch9 can keep agent partners informed throughout the finance journey.'],
      ['Does Arch9 track bank submissions?', 'Yes. Bank tracking is part of the bond originator workspace.'],
      ['Is bank intelligence included?', 'Bank intelligence is available for Enterprise teams.'],
    ],
  },
  developers: {
    label: 'Developers',
    icon: Building2,
    description: 'For property developers and sales teams.',
    pricingLabel: 'Pricing for developers',
    plans: [
      {
        name: 'Launch',
        price: 'Custom Pricing',
        suffix: 'For launching and selling developments.',
        ideal: 'For teams taking developments to market.',
        cta: 'Book a Demo',
        href: demoHref,
        features: ['Development Pages', 'Unit Management', 'Enquiry Management', 'Buyer Portal', 'Development Reporting'],
      },
      {
        name: 'Enterprise',
        price: 'Custom Pricing',
        suffix: 'For multi-project development businesses.',
        ideal: 'For developers managing stock, sales and distribution at scale.',
        cta: 'Book a Demo',
        href: demoHref,
        featured: true,
        features: ['Multi-Development Management', 'Agency Distribution', 'Executive Dashboards', 'Development Analytics', 'API Integrations'],
      },
    ],
    comparison: [
      ['Development Pages', true, true],
      ['Unit Management', true, true],
      ['Enquiry Management', true, true],
      ['Buyer Portal', true, true],
      ['Development Reporting', true, true],
      ['Multi-Development Management', false, true],
      ['Agency Distribution', false, true],
      ['Executive Dashboards', false, true],
      ['Development Analytics', false, true],
      ['API Integrations', false, true],
    ],
    faqs: [
      ['How is developer pricing calculated?', 'Pricing is based on developments, units, users, distribution needs and reporting requirements.'],
      ['Can Arch9 manage unit availability?', 'Yes. You can manage development pages, unit availability and buyer enquiries.'],
      ['Can external agencies work on development stock?', 'Yes. Agency distribution is available for developer teams that work with partner agents.'],
      ['Can buyers track development progress?', 'Yes. Buyer portal workflows can support buyer updates and document collection.'],
      ['Is reporting included?', 'Development reporting is included, with advanced analytics available for Enterprise teams.'],
      ['Can Arch9 support multiple developments?', 'Yes. Multi-development management is available on Enterprise plans.'],
    ],
  },
}

const roleOrder = ['agents', 'attorneys', 'bond-originators', 'developers']

const trustItems = [
  {
    title: 'No long-term contracts',
    copy: 'Cancel anytime.',
  },
  {
    title: 'Free onboarding',
    copy: "We'll help you get set up.",
  },
  {
    title: 'Local support',
    copy: 'Real people. Real help.',
  },
  {
    title: 'Secure & compliant',
    copy: 'Your data is protected.',
  },
]

const metrics = [
  { value: '120,000+', label: 'Properties listed' },
  { value: '15,000+', label: 'Transactions active' },
  { value: '5,000+', label: 'Professionals using Arch9' },
  { value: 'R8.4B+', label: 'In transaction value' },
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

function PlanCard({ plan, billing }) {
  const price = billing === 'annual' && plan.annualPrice ? plan.annualPrice : plan.price

  return (
    <article
      className={`relative rounded-[20px] border p-6 shadow-[0_22px_60px_rgba(5,8,7,0.06)] ${
        plan.featured
          ? 'border-[#064537]/45 bg-white ring-1 ring-[#064537]/20'
          : 'border-[#0A3028]/8 bg-white'
      }`}
    >
      {plan.featured ? (
        <div className="absolute left-0 right-0 top-0 rounded-t-[18px] bg-[#064537] py-2 text-center text-[11px] font-black uppercase tracking-[0.2em] text-white">
          Most popular
        </div>
      ) : null}
      <div className={plan.featured ? 'pt-7' : ''}>
        <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{plan.name}</h3>
        <p className="mt-2 min-h-10 text-sm font-semibold leading-5 text-[#5B6B64]">{plan.ideal}</p>
        <p className="mt-7 text-[3rem] font-extrabold tracking-[-0.06em] text-[#050807]">{price}</p>
        <p className="mt-1 text-sm font-semibold text-[#5B6B64]">{plan.suffix}</p>
        {plan.intro ? <p className="mt-5 text-sm font-extrabold text-[#071E1A]">{plan.intro}</p> : null}
        <ul className="mt-5 grid gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm font-semibold leading-5 text-[#31433D]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4D7D35]" />
              {feature}
            </li>
          ))}
        </ul>
        <a
          href={plan.href}
          className={`mt-8 inline-flex min-h-[50px] w-full items-center justify-center rounded-full border px-5 text-sm font-extrabold transition ${
            plan.featured
              ? 'border-[#064537] bg-[#064537] text-white hover:bg-[#05352D]'
              : 'border-[#0A3028]/28 text-[#071E1A] hover:bg-[#F8F4EC]'
          }`}
        >
          {plan.cta}
        </a>
      </div>
    </article>
  )
}

function ComparisonValue({ value }) {
  return value ? (
    <CheckCircle2 className="mx-auto h-4 w-4 text-[#4D7D35]" />
  ) : (
    <span className="block text-center text-lg font-semibold text-[#A29A90]">-</span>
  )
}

export default function Pricing() {
  const [selectedRoleKey, setSelectedRoleKey] = useState('agents')
  const [billing, setBilling] = useState('monthly')
  const [openFaq, setOpenFaq] = useState(0)
  const selectedRole = rolePricing[selectedRoleKey]
  const otherRoles = useMemo(() => roleOrder.filter((roleKey) => roleKey !== selectedRoleKey), [selectedRoleKey])

  useEffect(() => {
    document.title = 'Role-Based Pricing | Arch9'
    setMetaDescription('Choose pricing for agents, attorneys, bond originators and developers. Start with the tools you need and scale as your business grows.')
  }, [])

  function selectRole(roleKey) {
    setSelectedRoleKey(roleKey)
    setOpenFaq(0)
  }

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#05120F]">
      <Header />

      <main>
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-[128px] md:px-8">
          <div className="mx-auto max-w-[920px] text-center">
            <p className="mx-auto inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#5B6B64] shadow-[0_10px_34px_rgba(5,8,7,0.04)]">
              Pricing
            </p>
            <h1 className="mt-5 text-[3.1rem] font-extrabold leading-[0.96] tracking-[-0.055em] text-[#05251D] md:text-[5rem]">
              Pricing built around how you work.
            </h1>
            <p className="mx-auto mt-5 max-w-[720px] text-lg font-medium leading-8 text-[#31433D]">
              Whether you're an agent, attorney, bond originator or developer, Arch9 has a solution built for your business.
            </p>
            <p className="mx-auto mt-3 max-w-[640px] text-sm font-semibold leading-6 text-[#6C776F]">
              Start with the tools you need today and scale as your business grows.
            </p>
          </div>

          <div className="mt-10">
            <p className="mb-4 text-center text-xs font-black uppercase tracking-[0.22em] text-[#071E1A]">1. Choose your role</p>
            <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
              {roleOrder.map((roleKey) => {
                const role = rolePricing[roleKey]
                const Icon = role.icon
                const active = roleKey === selectedRoleKey
                return (
                  <button
                    key={roleKey}
                    type="button"
                    aria-pressed={active}
                    className={`min-h-[190px] min-w-[250px] snap-start rounded-[22px] border p-6 text-left transition md:min-w-0 ${
                      active
                        ? 'border-white/70 bg-[#064537] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55),0_24px_70px_rgba(5,8,7,0.2)]'
                        : 'border-[#0A3028]/10 bg-white text-[#071E1A] shadow-[0_18px_54px_rgba(5,8,7,0.05)] hover:-translate-y-1'
                    }`}
                    onClick={() => selectRole(roleKey)}
                  >
                    <Icon className={`h-9 w-9 ${active ? 'text-[#EAF7EF]' : 'text-[#064537]'}`} />
                    <span className="mt-8 block text-xl font-extrabold tracking-[-0.03em]">{role.label}</span>
                    <span className={`mt-2 block text-sm font-medium leading-6 ${active ? 'text-white/78' : 'text-[#5B6B64]'}`}>{role.description}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#0A3028]/6 bg-white/35 px-6 py-10 md:px-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#071E1A]">2. {selectedRole.pricingLabel}</p>
              <div className="inline-flex w-fit rounded-full border border-[#0A3028]/8 bg-white p-1 shadow-[0_12px_34px_rgba(5,8,7,0.04)]">
                {[
                  ['monthly', 'Pay Monthly'],
                  ['annual', 'Pay Annually (Save 10%)'],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={`rounded-full px-5 py-3 text-xs font-extrabold transition ${billing === value ? 'bg-[#064537] text-white' : 'text-[#6C5F4F] hover:bg-[#F8F4EC]'}`}
                    onClick={() => setBilling(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`mt-7 grid gap-6 ${selectedRole.plans.length === 3 ? 'lg:grid-cols-3' : 'mx-auto max-w-[860px] lg:grid-cols-2'}`}>
              {selectedRole.plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} billing={billing} />
              ))}
            </div>

            <div className="mt-8 grid gap-3 rounded-[20px] border border-[#0A3028]/8 bg-white/70 p-4 shadow-[0_18px_54px_rgba(5,8,7,0.04)] md:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.title} className="flex items-center gap-3 rounded-[16px] px-3 py-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8F4EC] text-[#064537]">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-[#071E1A]">{item.title}</span>
                    <span className="mt-1 block text-xs font-semibold text-[#5B6B64]">{item.copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:px-8">
          <div className="mx-auto grid w-full max-w-[1280px] gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#071E1A]">3. Feature comparison ({selectedRole.label})</p>
              <div className="overflow-x-auto rounded-[20px] border border-[#0A3028]/10 bg-white shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#0A3028]/10">
                      <th className="w-[34%] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-[#071E1A]">Features</th>
                      {selectedRole.plans.map((plan) => (
                        <th key={plan.name} className="bg-[#064537] px-5 py-4 text-center text-xs font-black uppercase tracking-[0.1em] text-white">
                          {plan.name}
                          <span className="mt-1 block text-[11px] normal-case tracking-[-0.01em] text-white/72">{plan.price}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRole.comparison.map((row) => (
                      <tr key={row[0]} className="border-b border-[#0A3028]/8 last:border-b-0">
                        <td className="px-5 py-3 font-bold text-[#31433D]">{row[0]}</td>
                        {row.slice(1).map((value, index) => (
                          <td key={`${row[0]}-${selectedRole.plans[index].name}`} className="px-5 py-3 text-center">
                            <ComparisonValue value={value} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="rounded-[22px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] lg:mt-10">
              <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[#071E1A]">Not {selectedRoleKey === 'agents' ? 'an agent' : `in ${selectedRole.label.toLowerCase()}`}?</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-[#5B6B64]">View pricing for your role.</p>
              <div className="mt-5 grid gap-3">
                {otherRoles.map((roleKey) => (
                  <button
                    key={roleKey}
                    type="button"
                    className="flex min-h-[58px] items-center justify-between rounded-[14px] border border-[#0A3028]/8 bg-[#F8F4EC] px-4 text-left text-sm font-extrabold text-[#071E1A] transition hover:bg-white"
                    onClick={() => selectRole(roleKey)}
                  >
                    {rolePricing[roleKey].label}
                    <ArrowRight className="h-4 w-4 text-[#064537]" />
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="px-6 pb-12 md:px-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#071E1A]">4. Frequently asked questions</p>
            <div className="grid gap-3 lg:grid-cols-2">
              {selectedRole.faqs.map(([question, answer], index) => (
                <div key={question} className="rounded-[16px] border border-[#0A3028]/8 bg-white shadow-[0_12px_34px_rgba(5,8,7,0.03)]">
                  <button
                    type="button"
                    className="flex min-h-[58px] w-full items-center justify-between gap-4 px-5 text-left text-sm font-extrabold text-[#071E1A]"
                    aria-expanded={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  >
                    {question}
                    <ChevronDown className={`h-5 w-5 shrink-0 transition ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index ? <p className="px-5 pb-5 text-sm font-medium leading-6 text-[#5B6B64]">{answer}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-12 md:px-8">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 rounded-[24px] bg-[linear-gradient(135deg,#05352D,#08221D)] p-8 text-white shadow-[0_24px_80px_rgba(5,8,7,0.16)] md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em]">Ready to get started?</h2>
              <p className="mt-3 max-w-[560px] text-base font-medium leading-7 text-white/80">Book a demo and see how Arch9 can transform your business.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={demoHref} className="bridge-button-primary bridge-button-light min-h-[52px] justify-center px-8">
                Book A Demo
              </a>
              <a href={appAuthUrl} className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/26 px-8 text-sm font-extrabold text-white transition hover:bg-white/10">
                Start Free Trial
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1280px] gap-4 rounded-[20px] border border-[#0A3028]/6 bg-white/70 p-5 shadow-[0_18px_54px_rgba(5,8,7,0.04)] sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex items-center gap-4 rounded-[16px] px-3 py-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F8F4EC] text-[#064537]">
                  <Scale className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{metric.value}</span>
                  <span className="text-sm font-semibold text-[#5B6B64]">{metric.label}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
