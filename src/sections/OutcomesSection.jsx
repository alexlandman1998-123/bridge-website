import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const outcomes = [
  'More visibility across every deal',
  'Less back-and-forth between stakeholders',
  'Faster movement through key stages',
  'Better client communication',
  'More professional process management',
  'Stronger internal control and reporting',
]

export default function OutcomesSection() {
  return (
    <section id="outcomes" className="bg-[#F5F2EC] py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <SectionHeading
          title="Why teams use Bridge"
          description="Commercial teams, conveyancers, agents, and buyers all share the same source of truth."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item) => (
            <motion.div
              key={item}
              whileHover={{ translateY: -4 }}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-900 shadow-sm transition"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}