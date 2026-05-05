import { motion } from 'framer-motion'

export default function Timeline({ stages }) {
  return (
    <div className="grid gap-4 lg:grid-cols-9">
      {stages.map((stage, index) => (
        <motion.div
          key={stage.stage}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4, delay: index * 0.04 }}
          className="relative rounded-[26px] border border-[#e4d9cb] bg-white p-5 shadow-[0_18px_42px_rgba(23,20,18,0.05)] lg:min-h-[240px]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#eadfce] bg-[#faf5ef] text-sm font-semibold text-[#171412]">
              {index + 1}
            </span>
            <span className="rounded-full border border-[#eadfce] bg-[#faf5ef] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6855]">
              Stage
            </span>
          </div>

          <h3 className="mt-5 text-[1.05rem] font-semibold leading-6 tracking-[-0.03em] text-[#171412]">
            {stage.stage}
          </h3>
          <p className="mt-3 text-sm font-medium text-[#6a5f53]">{stage.who}</p>
          <p className="mt-3 text-sm leading-7 text-[#766b5f]">{stage.tracking}</p>
        </motion.div>
      ))}
    </div>
  )
}
