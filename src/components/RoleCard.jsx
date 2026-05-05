import { motion } from 'framer-motion'

export default function RoleCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-[28px] border border-[#e4d9cb] bg-white p-6 shadow-[0_18px_42px_rgba(23,20,18,0.05)]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-[#e7dccf] bg-[#faf5ef] text-[#6d5c4a]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-[1.3rem] font-semibold tracking-[-0.04em] text-[#171412]">
        {title}
      </h3>
      <p className="mt-3 text-[0.98rem] leading-7 text-[#6d6257]">{description}</p>
    </motion.div>
  )
}
