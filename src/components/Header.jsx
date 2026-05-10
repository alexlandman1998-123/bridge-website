import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Wrench,
  X,
  Building2,
  Users,
  Landmark,
  WalletCards,
  UserRound,
  Briefcase,
  Info,
  Mail,
  FileText,
  Calculator,
  Activity,
  MoveRight,
} from 'lucide-react'

const appAuthUrl = 'https://app.bridgenine.co.za'

const navItems = [
  { label: 'Platform', href: '/#platform', hasMenu: true },
  { label: 'Company', href: '/#top', hasMenu: true },
  { label: 'Pricing', href: '/pricing', hasMenu: false },
  { label: 'Tools', href: '/#tools', hasMenu: true },
]

const megaMenus = {
  Platform: {
    type: 'cards',
    columns: [
      {
        title: 'Platform',
        items: [
          {
            label: 'Developers',
            href: '/#who-its-for',
            icon: Building2,
            description:
              'Manage developments, sales progress, documents, and role players in one shared workspace.',
          },
          {
            label: 'Agents',
            href: '/#who-its-for',
            icon: Users,
            description:
              'Track listings, leads, viewings, offers, and active transactions from first enquiry to registration.',
          },
          {
            label: 'Attorneys',
            href: '/#who-its-for',
            icon: Landmark,
            description:
              'Manage transfer workflows, document requests, signing progress, and transaction updates.',
          },
          {
            label: 'Bond Originators',
            href: '/#who-its-for',
            icon: WalletCards,
            description:
              'Track finance applications, buyer documents, bank feedback, and bond approval progress.',
          },
          {
            label: 'Clients',
            href: '/#client-portal',
            icon: UserRound,
            description:
              'Give buyers and sellers a simple portal to follow progress, upload documents, and see next steps.',
          },
        ],
      },
    ],
  },
  Company: {
    type: 'cards',
    columns: [
      {
        title: 'Company',
        items: [
          {
            label: 'About Bridge 9',
            href: '/#platform',
            icon: Info,
            description:
              'See how Bridge 9 connects role players around one shared transaction workspace.',
          },
          {
            label: 'Contact',
            href: '/contact',
            icon: Mail,
            description:
              'Speak to us about your workflow, team structure, and rollout priorities.',
          },
        ],
      },
    ],
  },
  Tools: {
    type: 'groups',
    columns: [
      {
        title: 'Core Tools',
        items: [
          { label: 'OTP Generator', href: '/contact', icon: Wrench },
          { label: 'Document Request Builder', href: '/contact', icon: FileText },
          { label: 'Deal Timeline Simulator', href: '/contact', icon: Activity },
        ],
      },
      {
        title: 'Workflows & Planning',
        items: [
          { label: 'Transaction Readiness Checker', href: '/contact', icon: Briefcase },
          { label: 'Commission Calculator', href: '/contact', icon: Calculator },
          { label: 'Deal Profit Calculator', href: '/contact', icon: Calculator },
        ],
      },
      {
        title: 'Insights & Diagnostics',
        items: [
          { label: 'Deal Delay Diagnostic', href: '/contact', icon: Activity },
          { label: 'Developer Sales Tracker', href: '/contact', icon: Building2 },
          { label: '(Future) Market Intelligence', href: '/contact', icon: Activity },
        ],
      },
      {
        title: 'Property Calculators',
        items: [
          { label: 'Transfer Cost Calculator', href: '/contact', icon: Calculator },
          { label: 'Bond Repayment Calculator', href: '/contact', icon: Calculator },
          { label: 'Yield Calculator', href: '/contact', icon: Calculator },
        ],
      },
    ],
  },
}

function MegaMenuPanel({ activeMenu, onClose }) {
  const menu = megaMenus[activeMenu]
  if (!menu) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-auto w-full rounded-[34px] border border-[#dfd4c6] bg-[rgba(250,246,240,0.96)] p-6 shadow-[0_28px_80px_rgba(23,20,18,0.11)] backdrop-blur-xl"
      onMouseLeave={onClose}
    >
      {menu.type === 'cards' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {menu.columns[0].items.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="group rounded-[22px] border border-[#e8ddd0] bg-white/92 p-4 transition hover:-translate-y-0.5 hover:border-[#c6b098] hover:bg-white hover:shadow-[0_16px_40px_rgba(23,20,18,0.08)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-[12px] border border-[#eadfce] bg-[#faf6ef] text-[#6d5b48]">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <p className="mt-3 text-[0.86rem] font-semibold tracking-[-0.01em] text-[#171412]">
                  {item.label}
                </p>
                <p className="mt-2 text-[0.74rem] leading-5 text-[#695f54]">
                  {item.description}
                </p>
                <div className="mt-3 flex justify-end">
                  <MoveRight className="h-3.5 w-3.5 text-[#8a745d] transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </a>
            )
          })}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-4">
          {menu.columns.map((column) => (
            <div key={column.title} className="rounded-[24px] border border-[#e8ddd0] bg-white/92 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b7760]">
                {column.title}
              </p>
              <div className="mt-4 space-y-2">
                {column.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm text-[#3a332d] transition hover:bg-[#f5ede2]"
                    >
                      <Icon className="h-4 w-4 text-[#7d6851]" />
                      <span className="flex-1">{item.label}</span>
                      <MoveRight className="h-3.5 w-3.5 text-[#9a836a] transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function MobileMenu({ onClose }) {
  const [openGroups, setOpenGroups] = useState({})

  function toggleGroup(label) {
    setOpenGroups((current) => ({
      ...current,
      [label]: !current[label],
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="mx-auto mt-3 w-[min(1320px,calc(100vw-1.5rem))] rounded-[28px] border border-[#e5dacb] bg-[rgba(252,248,242,0.96)] p-5 shadow-[0_20px_60px_rgba(23,20,18,0.08)] backdrop-blur-xl lg:hidden"
    >
      <nav className="space-y-2">
        {navItems.map((item) => {
          const hasMenu = item.hasMenu
          const isOpen = openGroups[item.label]
          const menu = megaMenus[item.label]

          if (!hasMenu || !menu) {
            return (
              <a
                key={item.label}
                href={item.href}
                className="block rounded-[16px] px-4 py-3 text-base font-medium text-[#171412] transition hover:bg-white"
                onClick={onClose}
              >
                {item.label}
              </a>
            )
          }

          return (
            <div key={item.label} className="rounded-[16px] border border-[#e7dccf] bg-white/70">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-[#171412]"
                onClick={() => toggleGroup(item.label)}
              >
                <span>{item.label}</span>
                <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-[#efe4d7]"
                  >
                    <div className="space-y-1 p-3">
                      {menu.columns.flatMap((column) =>
                        column.items.map((entry) => (
                          <a
                            key={`${item.label}-${entry.label}`}
                            href={entry.href}
                            className="block rounded-[12px] px-3 py-2.5 text-sm text-[#564b40] transition hover:bg-[#f7f0e6]"
                            onClick={onClose}
                          >
                            {entry.label}
                          </a>
                        ))
                      )}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      <div className="mt-4 grid gap-3">
        <a href={appAuthUrl} className="bridge-button-secondary justify-center" onClick={onClose}>
          Login
        </a>
        <a href="/contact" className="bridge-button-primary justify-center" onClick={onClose}>
          Book a Demo
        </a>
      </div>
    </motion.div>
  )
}

export default function Header() {
  const headerRef = useRef(null)
  const barRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [menuLayout, setMenuLayout] = useState({ top: 84, left: 0, width: 1200 })

  const hasActiveMenu = useMemo(() => Boolean(activeMenu && megaMenus[activeMenu]), [activeMenu])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!hasActiveMenu) return

    function closeOnScroll() {
      setActiveMenu(null)
    }

    window.addEventListener('scroll', closeOnScroll, { passive: true })
    return () => window.removeEventListener('scroll', closeOnScroll)
  }, [hasActiveMenu])

  useEffect(() => {
    if (!hasActiveMenu) return

    function updateMenuLayout() {
      if (!barRef.current) return
      const rect = barRef.current.getBoundingClientRect()
      setMenuLayout({
        top: rect.bottom + 10,
        left: rect.left + rect.width / 2,
        width: rect.width,
      })
    }

    updateMenuLayout()
    window.addEventListener('resize', updateMenuLayout)
    return () => window.removeEventListener('resize', updateMenuLayout)
  }, [hasActiveMenu])

  useEffect(() => {
    if (!hasActiveMenu) return

    function handleOutsideClick(event) {
      if (!headerRef.current) return
      if (!headerRef.current.contains(event.target)) {
        setActiveMenu(null)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [hasActiveMenu])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 px-3 pt-3 sm:px-4 lg:px-6">
      <div ref={barRef} className="mx-auto w-[min(1320px,calc(100vw-1.5rem))]">
        <div
          className={`rounded-full border transition ${
            scrolled
              ? 'border-[#e3d9cc] bg-[rgba(248,244,238,0.86)] shadow-[0_18px_50px_rgba(23,20,18,0.08)] backdrop-blur-xl'
              : 'border-white/70 bg-[rgba(255,252,248,0.74)] backdrop-blur-lg'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-5 lg:px-6">
            <a href="/" className="text-[0.95rem] font-semibold tracking-[0.22em] text-[#171412] sm:text-[1.02rem]">
              BRIDGE 9
            </a>

            <div className="hidden flex-1 justify-center lg:flex">
              <nav className="flex items-center gap-2 xl:gap-3">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (item.hasMenu) setActiveMenu(item.label)
                      else setActiveMenu(null)
                    }}
                  >
                    <a
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition xl:px-5 ${
                        activeMenu === item.label
                          ? 'bg-[#f2e9dc] text-[#171412]'
                          : 'text-[#5f564c] hover:bg-white/72 hover:text-[#171412]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.hasMenu ? <ChevronDown className="h-4 w-4" /> : null}
                    </a>
                  </div>
                ))}
              </nav>
            </div>

            <div className="hidden items-center gap-2 lg:flex xl:gap-3">
              <a href={appAuthUrl} className="bridge-button-secondary px-4 xl:px-5">
                Login
              </a>
              <a href="/contact" className="bridge-button-primary px-4 xl:px-5">
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
      </div>

      <div
        className="pointer-events-none fixed z-[70] hidden lg:block"
        style={{
          top: `${menuLayout.top}px`,
          left: `${menuLayout.left}px`,
          width: `${menuLayout.width}px`,
          transform: 'translateX(-50%)',
        }}
      >
        <AnimatePresence>
          {hasActiveMenu ? (
            <MegaMenuPanel activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>{mobileOpen ? <MobileMenu onClose={() => setMobileOpen(false)} /> : null}</AnimatePresence>
    </header>
  )
}
