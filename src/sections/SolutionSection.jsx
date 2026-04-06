import { motion } from 'framer-motion'
import {
  Building,
  ClipboardList,
  ShieldCheck,
  Users,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const solutionPillars = [
  {
    title: 'Shared visibility',
    description:
      'One workspace that shows progress across every stakeholder, phase, and document.',
    icon: Building,
  },
  {
    title: 'Structured workflow',
    description:
      'Built-in stages keep every task anchored to the right part of the transaction.',
    icon: ClipboardList,
  },
  {
    title: 'Clear responsibilities',
    description:
      'Assignments, reminders, and ownership make accountability obvious.',
    icon: ShieldCheck,
  },
  {
    title: 'Better client experience',
    description:
      'Buyers and teams receive the same milestones, updates, and next steps.',
    icon: Users,
  },
]

function SolutionCard({ title, description, Icon }) {
  return (
    <motion.div
      whileHover={{
        translateY: -6,
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.15)',
      }}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      <p className="text-sm text-slate-600">{description}</p>
    </motion.div>
  )
}

export default function SolutionSection() {
  return (
    <section id="solutions" className="bg-[#F5F2EC] py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <SectionHeading
          title="One shared platform for the people moving the deal forward."
          description="Bridge brings the key stakeholders in a property transaction into one structured system, so progress is visible, responsibilities are clear, and the process moves with less friction."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {solutionPillars.map((pillar) => (
            <SolutionCard
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              Icon={pillar.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}