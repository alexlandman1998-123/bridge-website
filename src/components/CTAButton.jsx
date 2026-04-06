import { motion } from 'framer-motion'

export default function CTAButton({
  children,
  href = '#contact',
  variant = 'primary',
  className = '',
}) {
  const baseClass =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const variants = {
    primary:
      'bg-[#111111] text-[#F8F5EF] shadow-[0_18px_40px_rgba(20,20,20,0.14)] hover:bg-[#1A1A1A] focus-visible:outline-[#111111]',
    secondary:
      'border border-[#D8CFC3] bg-[#FFFDF9]/80 text-[#4F4A43] shadow-[0_12px_30px_rgba(20,20,20,0.05)] backdrop-blur-xl hover:bg-[#F5EFE6] hover:border-[#CDBEAB] hover:text-[#141414] focus-visible:outline-[#CDBEAB]',
  }

  return (
    <motion.a
      href={href}
      whileHover={{ translateY: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.a>
  )
}