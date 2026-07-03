import { useEffect } from 'react'
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FolderKanban,
  Landmark,
  LineChart,
  MessageSquareText,
  PieChart,
  Send,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
  Users,
  WalletCards,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { breadcrumbJsonLd, serviceJsonLd, setPageSeo, softwareApplicationJsonLd } from '../lib/seo'

const trustIndicators = [
  {
    icon: ClipboardCheck,
    title: 'Cleaner Applications',
    copy: 'Receive complete buyer information from day one.',
  },
  {
    icon: Clock3,
    title: 'Faster Processing',
    copy: 'Reduce delays caused by missing documents.',
  },
  {
    icon: TrendingUp,
    title: 'Better Conversion',
    copy: 'Track and optimise every application.',
  },
]

const applicationStatus = [
  'Application Received',
  'Documents Submitted',
  'Bank Submission',
  'Conditional Approval',
  'Final Approval',
  'Instruction Issued',
]

const connectedRoles = ['Buyer', 'Agent', 'Bond Consultant', 'Banks']

const consultantFeatures = [
  {
    icon: FolderKanban,
    title: 'Application Management',
    copy: 'Track applications from enquiry through approval.',
  },
  {
    icon: FileCheck2,
    title: 'Document Collection',
    copy: 'Request and receive documents digitally.',
  },
  {
    icon: UserRoundCheck,
    title: 'Buyer Portal',
    copy: 'Allow buyers to upload documents, complete forms and track progress.',
  },
  {
    icon: Landmark,
    title: 'Bank Submission Tracking',
    copy: 'Track submitted, pending, approved and declined statuses across multiple banks.',
  },
  {
    icon: MessageSquareText,
    title: 'Agent Collaboration',
    copy: 'Keep agents updated automatically throughout the finance journey.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Consultant Workspace',
    copy: 'Manage applications, tasks, follow-ups and documents in one place.',
  },
  {
    icon: Send,
    title: 'Automated Updates',
    copy: 'Reduce repetitive communication with structured status updates.',
  },
  {
    icon: BadgePercent,
    title: 'Approval Tracking',
    copy: 'Monitor approval progress in real time.',
  },
]

const organisationRoles = [
  {
    role: 'Head Office',
    copy: 'National performance, applications, approval rates and revenue forecasts.',
  },
  {
    role: 'Region',
    copy: 'Regional branches, consultant workloads and conversion trends.',
  },
  {
    role: 'Branch',
    copy: 'Daily activity, pipeline health and follow-up discipline.',
  },
  {
    role: 'Consultant',
    copy: 'Active applications, buyer documents, bank submissions and tasks.',
  },
]

const dashboardPanels = [
  {
    title: 'Active Applications',
    rows: ['Consultant', 'Branch', 'Region'],
  },
  {
    title: 'Applications By Stage',
    rows: ['New', 'In Progress', 'Submitted', 'Conditional Approval', 'Approved'],
  },
  {
    title: 'Approval Rates',
    rows: ['Per consultant', 'Per branch', 'Per region'],
  },
  {
    title: 'Follow-Up Compliance',
    rows: ['Outstanding tasks', 'Missed follow-ups', 'Response times'],
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Capture Application',
    copy: 'Receive structured buyer information from agents, buyers and referral partners.',
  },
  {
    step: '02',
    title: 'Collect Documents',
    copy: 'Request, receive and track supporting documents through the buyer portal.',
  },
  {
    step: '03',
    title: 'Submit To Banks',
    copy: 'Track submissions, statuses and turnaround times across bank partners.',
  },
  {
    step: '04',
    title: 'Receive Approval',
    copy: 'Keep agents and buyers updated as approvals move from conditional to final.',
  },
  {
    step: '05',
    title: 'Transfer To Registration',
    copy: 'Keep finance progress connected to the attorney and transaction journey.',
  },
]

const switchReasons = [
  {
    title: 'Better Applications',
    copy: 'Receive cleaner information upfront.',
  },
  {
    title: 'More Visibility',
    copy: 'Track every application stage.',
  },
  {
    title: 'Better Consultant Management',
    copy: 'Manage teams at scale.',
  },
  {
    title: 'Better Agent Relationships',
    copy: 'Keep referral partners informed.',
  },
  {
    title: 'More Approvals',
    copy: 'Reduce bottlenecks and delays.',
  },
]

const bankRelationshipFeatures = [
  {
    icon: BarChart3,
    title: 'Submission Volume',
    copy: 'Compare submission volume by bank and consultant.',
  },
  {
    icon: BadgePercent,
    title: 'Approval Rate',
    copy: 'Track approval rate per bank.',
  },
  {
    icon: Clock3,
    title: 'Turnaround Times',
    copy: 'Compare bank performance over time.',
  },
  {
    icon: UserRoundCheck,
    title: 'Consultant Preferences',
    copy: 'See where consultants perform best.',
  },
  {
    icon: ClipboardCheck,
    title: 'Relationship Reporting',
    copy: 'Support key account management with better data.',
  },
]

const pricingPlans = [
  {
    name: 'Professional',
    price: 'Custom Pricing',
    ideal: 'Independent originators and boutique firms',
    features: [
      'Applications',
      'Buyer Portal',
      'Document Collection',
      'Bank Tracking',
      'Agent Collaboration',
      'Approval Tracking',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom Pricing',
    ideal: 'National businesses and multi-branch teams',
    features: [
      'Everything in Professional',
      'HQ Dashboard',
      'Regional Management',
      'Branch Management',
      'Consultant Analytics',
      'Bank Relationship Reporting',
      'Workflow Automation',
      'Dedicated Support',
    ],
  },
]

const additionalServices = ['Credit Checks', 'FICA Verification', 'Affordability Reports', 'Property Reports']

const testimonials = [
  {
    quote: 'We spend less time chasing documents and more time helping buyers secure finance.',
    name: 'Thabo Mokoena',
    role: 'Senior Bond Consultant',
  },
  {
    quote: 'For the first time we can see every application, consultant and branch in one place.',
    name: 'Samantha Jacobs',
    role: 'Regional Manager',
  },
]

function ApplicationWorkspaceVisual() {
  return (
    <div className="relative rounded-[34px] border border-[#0A3028]/10 bg-[#071E1A] p-5 text-white shadow-[0_34px_110px_rgba(5,8,7,0.18)] md:p-7">
      <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_78%_18%,rgba(134,228,194,0.16),transparent_32%),linear-gradient(135deg,#071E1A,#0A3028)]" />
      <div className="relative grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Application Workspace</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">Application to approval, connected.</h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {connectedRoles.map((role) => (
              <div key={role} className="rounded-[16px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-extrabold">
                {role}
              </div>
            ))}
          </div>
          <div className="mt-7 grid gap-3">
            {applicationStatus.map((status, index) => (
              <div key={status} className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.07] px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#86E4C2]/16 text-[#86E4C2]">
                  {index < 3 ? <CheckCircle2 className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
                </span>
                <span className="text-sm font-extrabold text-white">{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {[
            { value: '312', label: 'Active Applications' },
            { value: 'R480m', label: 'In Finance Pipeline' },
            { value: '86%', label: 'Approval Rate' },
            { value: '7', label: 'Banks Connected' },
          ].map((metric) => (
            <div key={metric.label} className="rounded-[24px] border border-white/10 bg-white/[0.09] p-5 backdrop-blur-xl">
              <p className="text-3xl font-extrabold">{metric.value}</p>
              <p className="mt-1 text-sm font-semibold text-white/72">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CommandCentreVisual() {
  return (
    <div className="rounded-[30px] border border-[#0A3028]/8 bg-[#071E1A] p-5 text-white shadow-[0_28px_90px_rgba(5,8,7,0.14)] md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#86E4C2]">Command Centre</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em]">Know where every application stands.</h3>
        </div>
        <PieChart className="h-8 w-8 text-[#86E4C2]" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {dashboardPanels.map((panel) => (
          <div key={panel.title} className="rounded-[22px] border border-white/10 bg-white/[0.08] p-4">
            <p className="text-sm font-extrabold text-white">{panel.title}</p>
            <div className="mt-4 grid gap-2">
              {panel.rows.map((row) => (
                <div key={row} className="flex items-center justify-between gap-3 rounded-[14px] bg-white/[0.06] px-3 py-2">
                  <span className="text-xs font-semibold text-white/76">{row}</span>
                  <span className="h-2 w-12 rounded-full bg-[#86E4C2]/60" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {[
          { value: 'R480m', label: 'Finance Pipeline' },
          { value: '74%', label: 'Conversion Rate' },
          { value: 'R3.6m', label: 'Revenue Forecast' },
        ].map((metric) => (
          <div key={metric.label} className="rounded-[18px] border border-white/10 bg-white/[0.08] p-4">
            <p className="text-2xl font-extrabold">{metric.value}</p>
            <p className="mt-1 text-xs font-semibold text-white/68">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BondOriginatorsSolution() {
  useEffect(() => {
    const description =
      'Arch9 helps bond originators receive cleaner applications, manage consultants, track bank submissions and keep agents updated from application to approval.'

    setPageSeo({
      title: 'Bond Origination Operating System | Arch9',
      description,
      canonicalPath: '/solutions/bond-originators',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', href: '/' },
          { name: 'Solutions', href: '/platform' },
          { name: 'Bond Originators', href: '/solutions/bond-originators' },
        ]),
        serviceJsonLd({
          name: 'Arch9 for Bond Originators',
          description,
          path: '/solutions/bond-originators',
          serviceType: 'Bond origination transaction workspace',
          audience: ['Bond originators', 'Mortgage consultants'],
        }),
        softwareApplicationJsonLd({
          name: 'Arch9 for Bond Originators',
          description,
          path: '/solutions/bond-originators',
          audience: ['Bond originators', 'Mortgage consultants'],
          featureList: ['Application tracking', 'Document collection', 'Bank submission visibility', 'Agent updates'],
        }),
      ],
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#05120F]">
      <Header />
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 pb-14 pt-[128px] md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006B4D]">For bond originators</p>
            <h1 className="mt-5 max-w-[760px] text-[3.2rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#05251D] md:text-[5rem]">
              Better applications. More approvals. Less chasing.
            </h1>
            <p className="mt-6 max-w-[650px] text-lg font-medium leading-8 text-[#31433D]">
              Receive structured applications, manage bank submissions and keep every stakeholder informed from application to approval.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary min-h-[54px] px-7">
                Book A Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#0A3028]/18 bg-white/72 px-7 text-sm font-extrabold text-[#071E1A] transition hover:bg-white">
                Speak To Our Team
              </a>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {trustIndicators.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className={`flex items-center gap-4 ${index ? 'sm:border-l sm:border-[#0A3028]/10 sm:pl-5' : ''}`}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#064537] shadow-[0_12px_34px_rgba(5,8,7,0.06)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#071E1A]">{item.title}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#31433D]">{item.copy}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <ApplicationWorkspaceVisual />
        </section>

        <section className="px-6 py-14 md:px-8 md:py-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[820px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Consultant workspace</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Everything needed to move applications faster.
              </h2>
              <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">
                The platform that connects agents, buyers, consultants and banks around one application journey.
              </p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {consultantFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <article key={feature.title} className="rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E8F3EB] text-[#064537]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#071E1A]">{feature.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{feature.copy}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">One connected application</p>
              <h2 className="mt-4 text-[2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Everyone working from the same application.</h2>
              <p className="mt-4 text-base font-medium leading-7 text-[#5B6B64]">No duplicate information. No missing documents. No disconnected communication.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                {connectedRoles.map((role) => (
                  <div key={role} className="rounded-[18px] border border-[#0A3028]/8 bg-[#F8F4EC] px-4 py-3 text-center text-sm font-extrabold text-[#071E1A]">
                    {role}
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-[#064537] text-center text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_54px_rgba(5,8,7,0.16)]">
                Application
              </div>
              <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#006B4D]/18 bg-[#E8F3EB] text-center text-xs font-black uppercase tracking-[0.12em] text-[#064537]">
                Approval
              </div>
            </div>

            <div className="rounded-[28px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)] md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Growing origination businesses</p>
              <h2 className="mt-4 text-[2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Manage consultants, branches and regions from one platform.</h2>
              <div className="mt-7 grid gap-3">
                {organisationRoles.map((role, index) => (
                  <div key={role.role} className="relative flex gap-4 rounded-[18px] bg-[#F8F4EC] p-4">
                    {index < organisationRoles.length - 1 ? <span className="absolute bottom-[-12px] left-[29px] h-5 w-px bg-[#0A3028]/12" /> : null}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#064537] text-sm font-extrabold text-white">{index + 1}</span>
                    <span>
                      <span className="block text-base font-extrabold text-[#071E1A]">{role.role}</span>
                      <span className="mt-1 block text-sm font-medium leading-6 text-[#5B6B64]">{role.copy}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Command centre dashboard</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Know where every application stands.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-[#5B6B64]">
                Track applications by stage, approval rates, bank performance, consultant leaderboards and revenue forecasts across your business.
              </p>
            </div>
            <CommandCentreVisual />
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">How Arch9 works.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="relative rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  {index < howItWorks.length - 1 ? <span className="absolute right-[-18px] top-1/2 hidden h-px w-9 bg-[#0A3028]/14 md:block" /> : null}
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#006B4D]">{step.step}</p>
                  <h3 className="mt-5 text-xl font-extrabold text-[#071E1A]">{step.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Why originators switch to Arch9.</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {switchReasons.map((reason) => (
                <div key={reason.title} className="rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  <CircleAlert className="h-6 w-6 text-[#006B4D]" />
                  <h3 className="mt-5 text-lg font-extrabold text-[#071E1A]">{reason.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{reason.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[820px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Bank relationships</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Manage bank relationships intelligently.
              </h2>
            </div>
            <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-5 lg:overflow-visible">
              {bankRelationshipFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <article key={feature.title} className="min-w-[240px] snap-start rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E8F3EB] text-[#064537]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-[#071E1A]">{feature.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{feature.copy}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[780px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006B4D]">Pricing</p>
              <h2 className="mt-4 text-[2.3rem] font-extrabold leading-tight tracking-[-0.045em] text-[#071E1A] md:text-[3.2rem]">
                Pricing built for modern origination teams.
              </h2>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className="rounded-[26px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  <h3 className="text-2xl font-extrabold text-[#071E1A]">{plan.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#5B6B64]">Ideal for: {plan.ideal}</p>
                  <p className="mt-6 text-[2.8rem] font-extrabold tracking-[-0.05em] text-[#071E1A]">{plan.price}</p>
                  <ul className="mt-6 grid gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#31433D]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#006B4D]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[22px] border border-[#0A3028]/8 bg-white/72 p-5">
              <p className="text-sm font-extrabold text-[#071E1A]">Additional services</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {additionalServices.map((service) => (
                  <div key={service} className="rounded-[16px] bg-[#F8F4EC] px-4 py-3 text-sm font-bold text-[#31433D]">{service}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#071E1A]">Trusted by origination teams.</h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.name} className="rounded-[26px] border border-[#0A3028]/8 bg-white p-6 shadow-[0_18px_54px_rgba(5,8,7,0.05)]">
                  <MessageSquareText className="h-7 w-7 text-[#006B4D]" />
                  <p className="mt-5 text-xl font-semibold leading-8 tracking-[-0.03em] text-[#071E1A]">{testimonial.quote}</p>
                  <footer className="mt-6">
                    <p className="text-sm font-extrabold text-[#071E1A]">{testimonial.name}</p>
                    <p className="mt-1 text-sm font-semibold text-[#5B6B64]">{testimonial.role}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 rounded-[26px] bg-[linear-gradient(135deg,#05352D,#08221D)] p-7 text-white shadow-[0_24px_80px_rgba(5,8,7,0.16)] md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <h2 className="text-[2.2rem] font-extrabold tracking-[-0.04em]">Ready to modernise your bond origination business?</h2>
              <p className="mt-2 max-w-[720px] text-sm font-medium leading-6 text-white/82 md:text-base">
                Join originators using Arch9 to improve visibility, increase approvals and manage consultants more effectively.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[52px] justify-center px-7">
                Book A Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/24 px-7 text-sm font-extrabold text-white transition hover:bg-white/10">
                Speak To Our Team
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
