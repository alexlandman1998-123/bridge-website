import { motion } from 'framer-motion'
import CTAButton from '../components/CTAButton'
import Container from '../components/ui/Container'

const workflowItems = [
  { label: 'Offer accepted', status: 'Complete' },
  { label: 'Bond in process', status: 'Active' },
  { label: 'Transfer prep', status: 'Queued' },
  { label: 'Registration', status: 'Pending' },
]

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="relative"
    >
      <div className="relative w-[560px] rounded-[36px] border border-[#2A241F] bg-gradient-to-br from-[#111111] to-[#1A1A1A] p-6 shadow-[0_60px_180px_rgba(0,0,0,0.30)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#B7AEA2]">
              Transaction workspace
            </p>
            <h3 className="mt-4 text-[28px] font-semibold tracking-[-0.03em] text-[#F8F5EF]">
              Unit 14 · Junoah Estate
            </h3>
            <p className="mt-2 text-[15px] text-[#C9C1B7]">
              Buyer · Conveyancer · Developer
            </p>
          </div>

          <div className="rounded-full border border-[#D8CBB8]/15 bg-[#D8CBB8]/8 px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-[#E7DCCB]">
            Live
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-medium text-[#EDE7DE]">Bond in process</p>
            <p className="text-[26px] font-semibold tracking-[-0.03em] text-[#F8F5EF]">
              64%
            </p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '64%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative h-full rounded-full bg-[#D8CBB8]"
            >
              <div className="absolute inset-0 animate-[pulse_2.8s_ease-in-out_infinite] bg-white/10" />
            </motion.div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {workflowItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.08, duration: 0.3 }}
              className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    index === 0
                      ? 'bg-[#E0D4C4]'
                      : index === 1
                        ? 'bg-[#CBB79C]'
                        : index === 2
                          ? 'bg-white/35'
                          : 'bg-white/18'
                  }`}
                />
                <span className="text-[15px] text-[#F1EBE2]">{item.label}</span>
              </div>

              <span className="text-[10px] uppercase tracking-[0.24em] text-[#A59B8F]">
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#A59B8F]">
              Next action
            </p>
            <p className="mt-3 text-[15px] font-medium text-[#F1EBE2]">
              Buyer FICA required
            </p>
            <p className="mt-2 text-sm text-[#BEB5A9]">
              Requested and awaiting upload.
            </p>
          </div>

          <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#A59B8F]">
              Docs status
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['OTP', 'FICA', 'Bond', 'Transfer'].map((doc, i) => (
                <span
                  key={doc}
                  className={`rounded-full px-3 py-1.5 text-[11px] ${
                    i < 3
                      ? 'border border-[#D8CBB8]/15 bg-[#D8CBB8]/10 text-[#E9DCCA]'
                      : 'border border-white/8 bg-white/[0.03] text-[#9E9589]'
                  }`}
                >
                  {doc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative bg-[linear-gradient(180deg,#FFFDF9_0%,#F8F5EF_100%)]">
      <Container className="pt-10 pb-0 lg:pt-12 lg:pb-0">
        <div className="relative min-h-[760px] overflow-visible">
          <div className="relative z-10 max-w-[620px] pt-4">
            <p className="text-[13px] uppercase tracking-[0.35em] text-[#7A736A]">
              Transaction coordination
            </p>

            <h1 className="mt-5 text-[84px] font-semibold leading-[0.88] tracking-[-0.065em] text-[#141414]">
              From offer to
              <br />
              handover, all in
              <br />
              one place.
            </h1>

            <p className="mt-7 max-w-[560px] text-[17px] leading-8 text-[#6F675D]">
              Bridge gives developers, conveyancers, agents, and buyers a shared
              workspace to manage every step of the property transaction process
              with more clarity, structure, and control.
            </p>

            <div className="mt-8 flex gap-4">
              <CTAButton className="px-8 py-4">Book a Demo</CTAButton>
              <CTAButton variant="secondary" className="px-8 py-4">
                See How It Works
              </CTAButton>
            </div>

            <p className="mt-5 text-sm text-[#8E877D]">
              Used by developers, conveyancers, and teams managing active transactions daily.
            </p>
          </div>

          <div className="absolute right-[-30px] bottom-[-84px] z-10">
            <HeroMockup />
          </div>
        </div>
      </Container>
    </section>
  )
}