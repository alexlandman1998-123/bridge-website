import { motion } from 'framer-motion'
import { CheckCircle2, FileText, MessageSquareMore } from 'lucide-react'

const stageRows = [
  ['Offer / OTP', 'Complete'],
  ['Buyer onboarding', 'Active'],
  ['Finance', 'Waiting on docs'],
  ['Attorney transfer', 'Queued'],
]

const detailRows = [
  { label: 'Current owner', value: 'Bond originator' },
  { label: 'Buyer', value: 'Mia Jacobs' },
  { label: 'Unit', value: '14 · Junoah Estate' },
]

const activity = [
  { icon: FileText, label: 'Buyer documents uploaded' },
  { icon: CheckCircle2, label: 'Client notified of next step' },
  { icon: MessageSquareMore, label: 'Attorney added transfer note' },
]

export default function ProductMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.12 }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-[36px] border border-[#24201b] bg-[#171412] p-6 text-white shadow-[0_38px_120px_rgba(23,20,18,0.18)] lg:p-7">
        <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdb69b]">
              Transaction workspace
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white lg:text-[2.4rem]">
              Unit 14 · Junoah Estate
            </h2>
            <p className="mt-2 text-sm text-white/65">
              Developer · Agent · Bond originator · Attorney
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Live transaction
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-4 text-sm text-white/70">
              <span>Transaction progress</span>
              <span>68% complete</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <motion.div
                animate={{ width: ['62%', '68%', '64%', '68%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="h-2 rounded-full bg-[#eadcc7]"
              />
            </div>

            <div className="mt-6 space-y-3">
              {stageRows.map(([label, status]) => (
                <div key={label} className="flex items-center justify-between rounded-[18px] border border-white/10 bg-black/16 px-4 py-4">
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

          <div className="space-y-5">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#cdb69b]">
                Deal details
              </p>
              <div className="mt-5 space-y-3">
                {detailRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
                    <span className="text-sm text-white/60">{row.label}</span>
                    <span className="text-sm font-medium text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#cdb69b]">
                Recent activity
              </p>
              <div className="mt-5 space-y-3">
                {activity.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.label}
                      animate={{ opacity: [0.72, 1, 0.72] }}
                      transition={{ duration: 5, repeat: Infinity, delay: index * 0.6 }}
                      className="flex items-center gap-3 rounded-[18px] border border-white/8 bg-black/16 px-4 py-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.05] text-[#eadcc7]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-white/78">{item.label}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-4 top-10 hidden rounded-[22px] border border-[#e4d9cb] bg-white/92 px-4 py-4 shadow-[0_18px_44px_rgba(23,20,18,0.08)] backdrop-blur-md lg:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7760]">
          Client update
        </p>
        <p className="mt-2 text-sm font-medium text-[#171412]">Buyer notified of next step.</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-5 right-6 hidden rounded-[22px] border border-[#e4d9cb] bg-white/92 px-4 py-4 shadow-[0_18px_44px_rgba(23,20,18,0.08)] backdrop-blur-md lg:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7760]">
          Document status
        </p>
        <p className="mt-2 text-sm font-medium text-[#171412]">Finance pack 4 / 5 reviewed.</p>
      </motion.div>
    </motion.div>
  )
}
