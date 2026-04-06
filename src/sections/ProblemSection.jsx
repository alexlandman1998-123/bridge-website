import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/ui/Card'
import Section from '../components/ui/Section'

const problemPoints = [
  'No single view of progress',
  'Missing documents and delays',
  'Clients constantly asking for updates',
  'Teams working in silos',
  'Too much admin and back-and-forth',
  'No shared accountability',
]

function ProblemCard({ text }) {
  return (
    <motion.div
      whileHover={{
        translateY: -6,
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
      }}
    >
      <Card className="text-base text-slate-900">
        {text}
      </Card>
    </motion.div>
  )
}

export default function ProblemSection() {
  return (
    <Section id="problem" className="border-t border-slate-200" warm>
      <SectionHeading
        title="Property transactions are still managed across too many disconnected systems."
        description="Most deals are still coordinated through emails, WhatsApp messages, spreadsheets, phone calls, and fragmented updates between different parties."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {problemPoints.map((point) => (
          <ProblemCard key={point} text={point} />
        ))}
      </div>
    </Section>
  )
}