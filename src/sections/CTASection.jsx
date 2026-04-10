import CTAButton from '../components/CTAButton'

export default function CTASection() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-slate-900 to-slate-800 py-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">
          <div className="space-y-6 text-white max-w-2xl">
            <h2 className="text-3xl font-semibold">
              Bring more structure to every property transaction.
            </h2>

            <p className="text-base text-white/80">
              See how Bridge helps your team manage the full journey from offer
              to handover with more clarity, control, and confidence.
            </p>

            <div className="flex flex-wrap gap-3">
              <CTAButton href="#contact">
                Book a Demo
              </CTAButton>

              <CTAButton variant="secondary" href="#solutions">
                Explore Solutions
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
