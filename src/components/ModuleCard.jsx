import { motion } from 'framer-motion'

export default function ModuleCard({
  label,
  title,
  description,
  bullets,
  previewTitle,
  previewRows,
  reverse = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className="rounded-[34px] border border-[#e4d9cb] bg-white p-6 shadow-[0_24px_70px_rgba(23,20,18,0.06)] lg:p-8"
    >
      <div className={`grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center ${reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b7760]">
            {label}
          </p>
          <h3 className="mt-4 max-w-[34rem] text-[2rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#171412]">
            {title}
          </h3>
          <p className="mt-4 max-w-[34rem] text-[1rem] leading-8 text-[#6b6054]">
            {description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {bullets.map((bullet) => (
              <div key={bullet} className="rounded-[18px] border border-[#efe6da] bg-[#fcf8f2] px-4 py-3 text-sm text-[#5f564c]">
                {bullet}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-[#e7dccf] bg-[#171412] p-5 text-white shadow-[0_24px_60px_rgba(23,20,18,0.14)]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#cdb69b]">
              {previewTitle}
            </p>
            <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
              Live
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {previewRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-4">
                <span className="text-sm text-white/70">{row.label}</span>
                <span className="text-sm font-medium text-white">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
