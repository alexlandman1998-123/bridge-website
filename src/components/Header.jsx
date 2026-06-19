import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Building2,
  FileStack,
  Landmark,
  LayoutDashboard,
  Mail,
  Menu,
  Smartphone,
  UserRound,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import { motionEaseOut } from './motion/timing'

const appAuthUrl = 'https://app.bridgenine.co.za'

const platformItems = [
  { label: 'Overview', href: '/#platform' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Transaction Timeline', href: '/#connected-timeline' },
  { label: 'Document Collection', href: '/#document-collection' },
  { label: 'Client Portal', href: '/#client-portal' },
  { label: 'Reporting', href: '/#outcomes' },
]

const solutionItems = [
  { icon: Users, label: 'Agents', copy: 'Move the deal after the offer is signed.' },
  { icon: Landmark, label: 'Attorneys', copy: 'Receive cleaner files and clearer context.' },
  { icon: WalletCards, label: 'Bond Originators', copy: 'Keep finance visible to the right parties.' },
  { icon: Building2, label: 'Developers', copy: 'See every sale moving through transfer.' },
  { icon: UserRound, label: 'Buyers & Sellers', copy: 'Know what happens next from offer to registration.' },
]

const companyItems = [
  { label: 'About Arch9', href: '/#top' },
  { label: 'Launch Partners', href: '/#trust' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/contact' },
]

function PlatformDropdown() {
  return (
    <div className="grid w-[560px] grid-cols-[0.9fr_1.1fr] gap-4 rounded-[32px] border border-[rgba(243,238,230,0.12)] bg-[rgba(7,30,26,0.95)] p-4 text-[#F3EEE6] shadow-[0_38px_110px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div className="grid gap-1">
        {platformItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-[18px] px-4 py-3 text-sm font-bold text-[#B9B1A7] transition hover:bg-white/[0.08] hover:text-[#F3EEE6]"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="rounded-[26px] border border-[rgba(134,228,194,0.22)] bg-[rgba(255,255,255,0.06)] p-4">
        <div className="rounded-[22px] border border-[rgba(243,238,230,0.1)] bg-[#050807] p-4 text-[#F3EEE6]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#86E4C2]" />
            <span className="h-2 w-2 rounded-full bg-[#F3EEE6]/28" />
            <span className="h-2 w-2 rounded-full bg-[#F3EEE6]/28" />
          </div>
          <div className="mt-5 grid gap-2">
            {[LayoutDashboard, FileStack, Smartphone, BarChart3].map((Icon, index) => (
              <div key={index} className="flex items-center gap-3 rounded-[14px] bg-white/[0.06] px-3 py-2">
                <Icon className="h-4 w-4 text-[#86E4C2]" />
                <span className="text-xs font-bold text-[#F3EEE6]">
                  {['Timeline live', 'Documents ready', 'Client portal', 'Registration signal'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <h3 className="mt-4 text-xl font-extrabold leading-tight tracking-[-0.03em] text-[#F3EEE6]">
          One transaction. Every party connected.
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#B9B1A7]">
          The platform view for everything between offer and registration.
        </p>
      </div>
    </div>
  )
}

function SolutionsDropdown() {
  return (
    <div className="w-[560px] rounded-[32px] border border-[rgba(243,238,230,0.12)] bg-[rgba(7,30,26,0.95)] p-4 text-[#F3EEE6] shadow-[0_38px_110px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div className="grid gap-2">
        {solutionItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href="/#roles"
              className="group flex items-start gap-4 rounded-[20px] p-4 transition hover:bg-white/[0.08]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[rgba(134,228,194,0.22)] bg-white/[0.06] text-[#86E4C2] transition group-hover:scale-105">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-[#F3EEE6]">{item.label}</span>
                <span className="mt-1 block text-sm leading-6 text-[#B9B1A7]">{item.copy}</span>
              </span>
            </a>
          )
        })}
      </div>
      <a href="/#roles" className="mt-3 flex items-center justify-between rounded-[20px] border border-[rgba(134,228,194,0.22)] bg-[#0D1613] px-4 py-3 text-sm font-extrabold text-[#86E4C2]">
        View all solutions
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

function CompanyDropdown() {
  return (
    <div className="w-[280px] rounded-[28px] border border-[rgba(243,238,230,0.12)] bg-[rgba(7,30,26,0.95)] p-3 text-[#F3EEE6] shadow-[0_32px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      {companyItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block rounded-[16px] px-4 py-3 text-sm font-bold text-[#B9B1A7] transition hover:bg-white/[0.08] hover:text-[#F3EEE6]"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

function MobileMenuSection({ eyebrow, items, onNavigate }) {
  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86E4C2]">{eyebrow}</p>
      <div className="mt-3 grid gap-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex min-h-12 items-center rounded-[18px] border border-transparent px-1 text-[1.25rem] font-bold leading-[1.3] text-[#F3EEE6] transition hover:border-[rgba(134,228,194,0.22)] hover:bg-white/[0.06] hover:px-4 hover:text-[#86E4C2]"
            onClick={onNavigate}
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null)
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

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-6 pt-6 md:px-8">
      <motion.div
        className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-[#86E4C2]"
        style={{ scaleX: shouldReduceMotion ? 0 : scaleX }}
      />
      <div
        className={`pointer-events-auto relative mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between rounded-full border border-[rgba(243,238,230,0.12)] bg-[rgba(7,30,26,0.92)] px-5 text-[#F3EEE6] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_58px_rgba(5,8,7,0.22)] backdrop-blur-[14px] transition duration-300 md:h-[72px] md:px-6 ${
          scrolled ? 'bg-[rgba(7,30,26,0.96)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_22px_70px_rgba(5,8,7,0.32)]' : ''
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <a href="/" className="text-[0.95rem] font-extrabold tracking-[0.24em] text-[#F3EEE6]">
          ARCH9
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {[
            { label: 'Platform', menu: 'platform' },
            { label: 'Solutions', menu: 'solutions' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Company', menu: 'company' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setActiveMenu(item.menu || null)}>
              <a
                href={item.href || '#'}
                className="flex h-11 items-center rounded-full px-4 text-sm font-bold text-[#F3EEE6]/72 transition hover:bg-white/[0.07] hover:text-[#F3EEE6]"
                onClick={(event) => {
                  if (item.menu) event.preventDefault()
                }}
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={appAuthUrl} className="rounded-full px-4 py-3 text-sm font-bold text-[#F3EEE6]/72 transition hover:bg-white/[0.07] hover:text-[#F3EEE6]">
            Login
          </a>
          <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[46px] px-5 py-3 text-sm">
            Book a Demo
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(243,238,230,0.12)] bg-white/[0.06] text-[#F3EEE6] lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-5 w-5" />
        </button>

        <AnimatePresence>
          {activeMenu ? (
            <motion.div
              className="absolute left-1/2 top-[calc(100%+14px)] hidden -translate-x-1/2 lg:block"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.22, ease: motionEaseOut }}
            >
              {activeMenu === 'platform' ? <PlatformDropdown /> : null}
              {activeMenu === 'solutions' ? <SolutionsDropdown /> : null}
              {activeMenu === 'company' ? <CompanyDropdown /> : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="pointer-events-auto fixed inset-0 z-[80] min-h-dvh overflow-y-auto bg-[#050807] px-6 py-6 text-[#F3EEE6] lg:hidden"
            style={{
              background:
                'radial-gradient(circle at 82% 12%, rgba(134,228,194,0.12), transparent 34%), linear-gradient(180deg, #050807 0%, #071E1A 58%, #050807 100%)',
            }}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : '100%' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: motionEaseOut }}
          >
            <div className="flex min-h-[58px] items-center justify-between">
              <a href="/" className="text-[0.95rem] font-extrabold tracking-[0.24em] text-[#F3EEE6]" onClick={closeMobile}>
                ARCH9
              </a>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(243,238,230,0.12)] bg-white/[0.06] text-[#F3EEE6]"
                onClick={closeMobile}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-8 h-px bg-[rgba(243,238,230,0.1)]" />

            <motion.nav
              className="grid gap-8"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                <MobileMenuSection eyebrow="Platform" items={platformItems} onNavigate={closeMobile} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                <MobileMenuSection
                  eyebrow="Solutions"
                  items={solutionItems.map((item) => ({ label: item.label, href: '/#roles' }))}
                  onNavigate={closeMobile}
                />
              </motion.div>

              <motion.div
                className="grid gap-1 border-y border-[rgba(243,238,230,0.1)] py-5"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              >
                {[
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Company', href: '/#trust' },
                  { label: 'Contact', href: '/contact' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex min-h-12 items-center text-[1.25rem] font-bold leading-[1.3] text-[#F3EEE6]"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            </motion.nav>

            <motion.div
              className="mt-8 grid gap-3"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.35, ease: motionEaseOut }}
            >
              <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[58px] w-full" onClick={closeMobile}>
                Book a Demo
              </a>
              <a href={appAuthUrl} className="bridge-button-secondary min-h-[58px] w-full border-[rgba(243,238,230,0.42)] bg-transparent text-[#F3EEE6]" onClick={closeMobile}>
                Login
              </a>
            </motion.div>

            <div className="mt-8 flex items-center gap-3">
              {[
                { label: 'LinkedIn', mark: 'in', href: 'https://www.linkedin.com' },
                { label: 'Instagram', mark: 'ig', href: 'https://www.instagram.com' },
                { label: 'Email', icon: Mail, href: 'mailto:hello@arch9.co.za' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(243,238,230,0.12)] bg-white/[0.06] text-[#F3EEE6] transition hover:border-[rgba(134,228,194,0.22)] hover:text-[#86E4C2]"
                    aria-label={item.label}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : <span className="text-xs font-black uppercase tracking-[-0.02em]">{item.mark}</span>}
                  </a>
                )
              })}
            </div>

            <p className="mt-8 pb-4 text-sm text-[#B9B1A7]">© 2024 Arch9. All rights reserved.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
