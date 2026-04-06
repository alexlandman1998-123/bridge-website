import SectionHeading from '../components/SectionHeading'

const trustStatements = [
  'Designed for the realities of South African property transactions.',
  'Role-based experiences keep every stakeholder focused on their workstream.',
  'Structured around real transaction stages and document flow, not just leads.',
  'Created to reduce friction across the full process from offer to handover.',
]

export default function TrustSection() {
  return (
    <section id="trust" className="border-b border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <SectionHeading
          title="Built for high-trust property workflows"
          description="Bridge limits friction by matching real conveyancing stages with role-specific responsibilities."
        />

        <div className="mt-8 space-y-4">
          {trustStatements.map((statement) => (
            <p key={statement} className="text-sm text-slate-600">
              • {statement}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}