import { motion } from 'framer-motion'

const stageRows = [
  ['Offer / OTP', 'Complete'],
  ['Buyer onboarding', 'Complete'],
  ['Finance', 'Active'],
  ['Attorney transfer', 'Next'],
]

export default function ProductMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.12 }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-[38px] border border-[#f0d5b2]/20 bg-[#1d1a17] p-7 text-white shadow-[0_34px_110px_rgba(0,0,0,0.45)] lg:p-9">
        <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-[#d7b182]/12 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#b59674]/10 blur-2xl" />

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdb69b]">
              Live deal view
            </p>
            <h2 className="mt-3 text-[1.75rem] font-semibold tracking-[-0.05em] text-white lg:text-[2.25rem]">
              Unit 14 · Junoah Estate
            </h2>
            <p className="mt-2 text-sm text-white/62">
              Developer · Agent · Conveyancer · Bond originator
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
            Live transaction
          </div>
        </div>

        <div className="mt-8 rounded-[30px] border border-white/14 bg-white/[0.05] p-6">
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <span>Overall Progress</span>
            <span>68% complete</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <motion.div
              animate={{ width: ['64%', '68%', '66%', '68%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 rounded-full bg-[#eadcc7]"
            />
          </div>

          <div className="mt-6 space-y-3">
            {stageRows.map(([label, status]) => (
              <div key={label} className="flex items-center justify-between rounded-[18px] border border-white/10 bg-black/16 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#eadcc7]" />
                  <span className="text-sm text-white/82">{label}</span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/68">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
