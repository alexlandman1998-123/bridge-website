import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { motionEaseOut } from './motion/timing'

const appAuthUrl = 'https://app.bridgenine.co.za'

const navLinks = [
  { label: 'Platform', href: '/#platform' },
  { label: 'Solutions', href: '/#problem' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Company', href: '/#trust' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-white/50 bg-[rgba(248,252,255,0.82)] backdrop-blur-2xl'
          : 'border-white/25 bg-[rgba(248,252,255,0.58)] backdrop-blur-xl'
      }`}
    >
      <motion.div
        className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-[#eadcc7]"
        style={{ scaleX: shouldReduceMotion ? 0 : scaleX }}
      />
      <div className="mx-auto flex min-h-[64px] w-full max-w-[1280px] items-center justify-between px-6 md:min-h-[72px] md:px-10 xl:px-16">
        <a href="/" className="text-[0.95rem] font-bold tracking-[0.24em] text-[#171412]">
          ARCH9
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-[0.95rem] font-semibold text-[#5d544b] transition-colors duration-200 hover:text-[#171412]"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[#171412] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={appAuthUrl} className="bridge-button-secondary min-h-[48px] px-5 py-3 text-[0.95rem]">
            Login
          </a>
          <a href="/contact" className="bridge-button-primary min-h-[48px] px-5 py-3 text-[0.95rem]">
            Book Demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e1d7ca] bg-white/74 text-[#171412] lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] min-h-dvh bg-[#fbf7f1] px-6 py-5 lg:hidden"
            initial={{ x: shouldReduceMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: shouldReduceMotion ? 0 : '100%' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: motionEaseOut }}
          >
            <div className="flex min-h-[54px] items-center justify-between">
              <a
                href="/"
                className="text-[0.95rem] font-bold tracking-[0.24em] text-[#171412]"
                onClick={() => setMobileOpen(false)}
              >
                ARCH9
              </a>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e1d7ca] bg-white text-[#171412]"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              className="mt-12 grid gap-7"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
              }}
            >
              {navLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-[2.4rem] font-extrabold leading-none text-[#171412]"
                  onClick={() => setMobileOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 24 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.45, ease: motionEaseOut },
                    },
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              className="mt-12 grid gap-3"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.45, ease: motionEaseOut }}
            >
              <a href="/contact" className="bridge-button-primary w-full" onClick={() => setMobileOpen(false)}>
                Book Demo
              </a>
              <a href={appAuthUrl} className="bridge-button-secondary w-full" onClick={() => setMobileOpen(false)}>
                Login
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
