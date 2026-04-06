import { motion } from 'framer-motion'
import {
  FileText,
  Home,
  Layers,
  Sparkles,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const roleCards = [
  {
    id: 'role-developers',
    title: 'Developers',
    description: 'Track units, deals, and progress across your developments.',
    icon: Layers,
  },
  {
    id: 'role-conveyancers',
    title: 'Conveyancers',
    description: 'Manage workflows, documents, and milestones with more structure.',
    icon: FileText,
  },
  {
    id: 'role-agents',
    title: 'Agents',
    description: 'Stay visible across every deal after the sale is made.',
    icon: Sparkles,
  },
  {
    id: 'role-buyers',
    title: 'Buyers',
    description: 'Follow your transaction clearly and know what comes next.',
    icon: Home,
  },
]

function RoleCard({ title, description, Icon, id }) {
  return (
    <motion.article
      id={id}
      whileHover={{
        translateY: -4,
        boxShadow: '0 20px 35px rgba(15, 23, 42, 0.12)',
      }}
      className="flex flex-col justify-between gap-6 rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm transition"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      </div>

      <p className="text-sm text-slate-600">{description}</p>

      <button className="text-left text-sm font-semibold text-slate-700 underline-offset-4 hover:text-slate-900">
        Learn More →
      </button>
    </motion.article>
  )
}

export default function RoleRoutingSection() {
  return (
    <section id="roles" className="bg-[#F5F2EC] py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <SectionHeading
          title="Built for every key role in the transaction."
          description="Bridge gives each stakeholder a clearer, more relevant view of the transaction without losing shared visibility across the full process."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {roleCards.map((role) => (
            <RoleCard
              key={role.title}
              title={role.title}
              description={role.description}
              Icon={role.icon}
              id={role.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}