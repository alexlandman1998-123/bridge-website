import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const timelineStages = [
  {
    title: 'Offer / Reservation',
    description:
      'Terms logged, reservation deposit tracked, and documents collated.',
  },
  {
    title: 'Bond Process',
    description:
      'Bond lodgement, approvals, and trust accounting monitored in one place.',
  },
  {
    title: 'Transfer Workflow',
    description:
      'Deeds office requirements, checklists, and fee settlements stay visible.',
  },
  {
    title: 'Registration',
    description:
      'Final sign-offs, registration status, and certificates are tracked live.',
  },
  {
    title: 'Handover',
    description:
      'Defect lists, keys, and client handover notes are recorded for clarity.',
  },
]

function TimelineStep({ index, title, description, isLast }) {
  return (
    <motion.div className="flex gap-4 sm:gap-6">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700">
          {index}
        </div>

        {!isLast && <div className="mt-2 h-full w-px bg-slate-200" />}
      </div>

      <div className="flex-1 space-y-2 pb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Stage {index}
        </p>

        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-b border-slate-200 bg-white py-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <SectionHeading
          eyebrow="Transaction lifecycle"
          title="A clearer path from accepted offer to final handover."
          description="Bridge gives every stakeholder a more legible process from accepted offer through to registration and final handover."
        />

        <div className="mt-10 space-y-2">
          {timelineStages.map((stage, index) => (
            <TimelineStep
              key={stage.title}
              index={index + 1}
              title={stage.title}
              description={stage.description}
              isLast={index === timelineStages.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}