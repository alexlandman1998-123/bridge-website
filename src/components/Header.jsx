import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Building2,
  ChevronDown,
  FileStack,
  Landmark,
  LayoutDashboard,
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
  { label: 'Platform Overview', href: '/#platform' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Transaction Timeline', href: '/#connected-timeline' },
  { label: 'Document Collection', href: '/#document-collection' },
  { label: 'Client Portal', href: '/#client-portal' },
  { label: 'Reporting', href: '/#outcomes' },
]

const solutionItems = [
  { icon: Users, label: 'Agents', copy: 'Spend less time chasing and more time closing.' },
  { icon: Landmark, label: 'Attorneys', copy: 'Receive cleaner files and clearer instructions.' },
  { icon: WalletCards, label: 'Bond Originators', copy: 'Follow finance progress without another follow-up thread.' },
  { icon: Building2, label: 'Developers', copy: 'See every sale moving toward registration.' },
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
    <div className="grid w-[560px] grid-cols-[0.9fr_1.1fr] gap-4 rounded-[32px] border border-white/10 bg-[#0d0d0d]/92 p-4 text-white shadow-[0_34px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="grid gap-1">
        {platformItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-[18px] px-4 py-3 text-sm font-bold text-white/72 transition hover:bg-white/[0.07] hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="rounded-[26px] border border-white/10 bg-white/[0.06] p-4">
        <div className="rounded-[22px] bg-[#f8f6f2] p-4 text-[#080808]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#080808]" />
            <span className="h-2 w-2 rounded-full bg-[#d8c7b5]" />
            <span className="h-2 w-2 rounded-full bg-[#d8c7b5]" />
          </div>
          <div className="mt-5 grid gap-2">
            {[LayoutDashboard, FileStack, Smartphone, BarChart3].map((Icon, index) => (
              <div key={index} className="flex items-center gap-3 rounded-[14px] bg-white px-3 py-2">
                <Icon className="h-4 w-4 text-[#6d5c4a]" />
                <span className="text-xs font-bold text-[#312b25]">
                  {['Timeline live', 'Documents ready', 'Client portal', 'Registration signal'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <h3 className="mt-4 text-xl font-extrabold leading-tight tracking-[-0.03em] text-white">
          One transaction. Every party connected.
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/62">
          The platform view for everything between offer and registration.
        </p>
      </div>
    </div>
  )
}

function SolutionsDropdown() {
  return (
    <div className="w-[560px] rounded-[32px] border border-white/10 bg-[#0d0d0d]/92 p-4 text-white shadow-[0_34px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="grid gap-2">
        {solutionItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href="/#roles"
              className="group flex items-start gap-4 rounded-[20px] p-4 transition hover:bg-white/[0.07]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.06] text-[#eadcc7] transition group-hover:scale-105">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-white">{item.label}</span>
                <span className="mt-1 block text-sm leading-6 text-white/58">{item.copy}</span>
              </span>
            </a>
          )
        })}
      </div>
      <a href="/#roles" className="mt-3 flex items-center justify-between rounded-[20px] bg-[#eadcc7] px-4 py-3 text-sm font-extrabold text-[#080808]">
        View All Solutions
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

function CompanyDropdown() {
  return (
    <div className="w-[280px] rounded-[28px] border border-white/10 bg-[#0d0d0d]/92 p-3 text-white shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
      {companyItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block rounded-[16px] px-4 py-3 text-sm font-bold text-white/72 transition hover:bg-white/[0.07] hover:text-white"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

function MobileAccordion({ title, items, open, onToggle, onNavigate }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div>
      <button
        type="button"
        className="flex min-h-[56px] w-full items-center justify-between text-left text-[2.15rem] font-extrabold leading-none tracking-[-0.04em] text-white"
        onClick={onToggle}
      >
        {title}
        <ChevronDown className={`h-6 w-6 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: motionEaseOut }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 pb-2 pt-4">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-[18px] border border-white/10 bg-white/[0.05] px-4 py-4 text-lg font-bold text-white/72"
                  onClick={onNavigate}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)
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

  const mobilePlatformItems = platformItems.map((item) => ({
    label: item.label.replace('Platform Overview', 'Overview').replace('Document Collection', 'Documents').replace('Transaction Timeline', 'Timeline').replace('Client Portal', 'Portal'),
    href: item.href,
  }))
  const mobileSolutionItems = solutionItems.map((item) => ({ label: item.label, href: '/#roles' }))

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-4 py-3 md:px-6">
      <motion.div
        className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-[#eadcc7]"
        style={{ scaleX: shouldReduceMotion ? 0 : scaleX }}
      />
      <div
        className={`pointer-events-auto relative mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between rounded-full border px-4 text-white backdrop-blur-[20px] transition duration-300 md:h-[72px] md:px-5 ${
          scrolled
            ? 'border-white/12 bg-white/[0.105] shadow-[0_22px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl'
            : 'border-white/[0.08] bg-white/[0.06] shadow-[0_14px_44px_rgba(0,0,0,0.12)]'
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <a href="/" className="text-[0.95rem] font-extrabold tracking-[0.24em] text-white">
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
                className="flex h-11 items-center gap-1 rounded-full px-4 text-sm font-bold text-white/72 transition hover:bg-white/[0.07] hover:text-white"
                onClick={(event) => {
                  if (item.menu) event.preventDefault()
                }}
              >
                {item.label}
                {item.menu ? <ChevronDown className="h-3.5 w-3.5" /> : null}
              </a>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={appAuthUrl} className="rounded-full px-4 py-3 text-sm font-bold text-white/72 transition hover:bg-white/[0.07] hover:text-white">
            Login
          </a>
          <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[46px] px-5 py-3 text-sm">
            Book Demo
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white lg:hidden"
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
            className="pointer-events-auto fixed inset-0 z-[80] min-h-dvh overflow-y-auto bg-[#080808] px-6 py-5 text-white lg:hidden"
            initial={{ x: shouldReduceMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: shouldReduceMotion ? 0 : '100%' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: motionEaseOut }}
          >
            <div className="flex min-h-[58px] items-center justify-between">
              <a
                href="/"
                className="text-[0.95rem] font-extrabold tracking-[0.24em] text-white"
                onClick={() => setMobileOpen(false)}
              >
                ARCH9
              </a>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <motion.nav
              className="grid gap-7"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                <MobileAccordion
                  title="Platform"
                  items={mobilePlatformItems}
                  open={mobileAccordion === 'platform'}
                  onToggle={() => setMobileAccordion((current) => (current === 'platform' ? null : 'platform'))}
                  onNavigate={() => setMobileOpen(false)}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                <MobileAccordion
                  title="Solutions"
                  items={mobileSolutionItems}
                  open={mobileAccordion === 'solutions'}
                  onToggle={() => setMobileAccordion((current) => (current === 'solutions' ? null : 'solutions'))}
                  onNavigate={() => setMobileOpen(false)}
                />
              </motion.div>
              {[
                { label: 'Pricing', href: '/pricing' },
                { label: 'Company', href: '/#trust' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-[2.15rem] font-extrabold leading-none tracking-[-0.04em] text-white"
                  onClick={() => setMobileOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.42, ease: motionEaseOut },
                    },
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>

            <div className="my-8 h-px bg-white/10" />

            <motion.div
              className="grid gap-3 pb-6"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.45, ease: motionEaseOut }}
            >
              <a href="/contact" className="bridge-button-primary bridge-button-light min-h-[58px] w-full" onClick={() => setMobileOpen(false)}>
                Book Demo
              </a>
              <a href={appAuthUrl} className="bridge-button-secondary min-h-[58px] w-full border-white/12 bg-white/[0.06] text-white" onClick={() => setMobileOpen(false)}>
                Login
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
