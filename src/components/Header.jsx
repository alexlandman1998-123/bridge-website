import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'

const appAuthUrl = `${import.meta.env.VITE_BRIDGE_APP_URL || 'https://bridge-nine-blond.vercel.app'}/auth`

const navItems = [
  { label: 'Platform', href: '/#platform' },
  { label: 'Who It’s For', href: '/#who-its-for' },
  { label: 'Client Portal', href: '/#client-portal' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-6">
      <div
        className={`mx-auto max-w-[1240px] rounded-full border transition ${
          scrolled
            ? 'border-[#e3d9cc] bg-[rgba(248,244,238,0.82)] shadow-[0_18px_50px_rgba(23,20,18,0.08)] backdrop-blur-xl'
            : 'border-white/70 bg-[rgba(255,252,248,0.72)] backdrop-blur-lg'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 lg:px-6">
          <a href="/" className="text-[1.02rem] font-semibold tracking-[0.24em] text-[#171412]">
            BRIDGE 9
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="bridge-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={appAuthUrl} className="bridge-button-secondary">
              Login
            </a>
            <a href="/contact" className="bridge-button-primary">
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5dacb] bg-white/70 text-[#171412] lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-[1240px] rounded-[28px] border border-[#e5dacb] bg-[rgba(252,248,242,0.94)] p-5 shadow-[0_20px_60px_rgba(23,20,18,0.08)] backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-[18px] px-4 py-3 text-base font-medium text-[#171412] transition hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 grid gap-3">
              <a href={appAuthUrl} className="bridge-button-secondary justify-center" onClick={() => setMobileOpen(false)}>
                Login
              </a>
              <a href="/contact" className="bridge-button-primary justify-center" onClick={() => setMobileOpen(false)}>
                Book a Demo
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
