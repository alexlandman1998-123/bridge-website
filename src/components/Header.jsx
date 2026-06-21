import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown, Mail, Menu, X } from 'lucide-react'
import { appAuthUrl, demoHref, primaryNavItems, solutionNavItems } from '../config/navigation'
import { motionEaseOut } from './motion/timing'

function isActivePath(pathname, item) {
  if (item.menu) return false
  return item.match?.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

function trackNavigationEvent(eventName) {
  if (!eventName) return

  window.dataLayer?.push({ event: eventName })
  window.dispatchEvent(new CustomEvent(eventName))
}

function SolutionsDropdown({ onNavigate }) {
  return (
    <div className="w-[430px] rounded-[28px] border border-[#0A3028]/10 bg-white/92 p-3 text-[#05120F] shadow-[0_34px_90px_rgba(5,8,7,0.18)] backdrop-blur-2xl">
      <div className="grid gap-1">
        {solutionNavItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group grid gap-1 rounded-[20px] px-4 py-3 transition hover:bg-[#F4F0E8] focus-visible:bg-[#F4F0E8]"
            onClick={onNavigate}
          >
            <span className="flex items-center justify-between gap-4 text-sm font-extrabold text-[#071E1A]">
              {item.label}
              <ArrowRight className="h-4 w-4 text-[#006B4D] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100" />
            </span>
            <span className="max-w-[330px] text-xs font-semibold leading-5 text-[#5B6B64]">{item.description}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function MobileNavLink({ href, children, onClick, featured = false }) {
  return (
    <a
      href={href}
      className={
        featured
          ? 'flex min-h-[56px] w-full items-center justify-center rounded-full bg-[#F3EEE6] px-5 text-base font-extrabold text-[#050807] shadow-[0_18px_42px_rgba(0,0,0,0.2)]'
          : 'flex min-h-12 items-center rounded-[18px] px-1 text-[1.1rem] font-extrabold leading-[1.25] text-[#F3EEE6] transition hover:bg-white/[0.07] hover:px-4 hover:text-[#86E4C2]'
      }
      style={featured ? { backgroundColor: '#F3EEE6', color: '#050807' } : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pathname, setPathname] = useState(window.location.pathname)
  const headerRef = useRef(null)
  const navShellRef = useRef(null)
  const solutionsButtonRef = useRef(null)
  const isHome = pathname === '/'
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
    function handlePopState() {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    function handlePointerDown(event) {
      if (!navShellRef.current?.contains(event.target)) {
        setActiveMenu(null)
      }
    }

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        setActiveMenu(null)
        setMobileOpen(false)
        solutionsButtonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  function closeMobile() {
    setMobileOpen(false)
  }

  function openSolutions() {
    setActiveMenu('solutions')
    trackNavigationEvent('nav_solutions_clicked')
  }

  function handleSolutionsKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setActiveMenu('solutions')
      window.requestAnimationFrame(() => {
        navShellRef.current?.querySelector('[data-solutions-dropdown] a')?.focus()
      })
    }
  }

  return (
    <header ref={headerRef} className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-5 pt-5 md:px-8 md:pt-6">
      <motion.div
        className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-[#86E4C2]"
        style={{ scaleX: shouldReduceMotion ? 0 : scaleX }}
      />
      <div
        ref={navShellRef}
        className={`pointer-events-auto relative mx-auto grid h-16 w-full max-w-[1340px] grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full px-5 transition duration-300 md:h-[76px] md:px-7 ${
          isHome
            ? `border border-white/10 text-white shadow-none backdrop-blur-0 ${
                scrolled
                  ? 'bg-[rgba(6,45,37,0.92)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_58px_rgba(3,18,15,0.28)] backdrop-blur-[16px]'
                  : 'bg-transparent'
              }`
            : `border border-[rgba(243,238,230,0.12)] bg-[rgba(7,30,26,0.92)] text-[#F3EEE6] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_58px_rgba(5,8,7,0.22)] backdrop-blur-[14px] ${
                scrolled ? 'bg-[rgba(7,30,26,0.96)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_22px_70px_rgba(5,8,7,0.32)]' : ''
              }`
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <a href="/" className={`text-[0.95rem] font-extrabold tracking-[0.24em] ${isHome ? 'text-white' : 'text-[#F3EEE6]'}`}>
          ARCH9
        </a>

        <nav className="hidden min-w-0 justify-self-center lg:flex lg:items-center lg:gap-2 xl:gap-3" aria-label="Primary navigation">
          {primaryNavItems.map((item) => {
            const active =
              item.menu === 'solutions'
                ? solutionNavItems.some((solution) => pathname === solution.href || pathname.startsWith(`${solution.href}/`))
                : isActivePath(pathname, item)
            if (item.menu === 'solutions') {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu('solutions')}
                >
                  <button
                    ref={solutionsButtonRef}
                    type="button"
                    className={`flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition xl:px-5 ${
                      isHome
                        ? 'text-white/82 hover:bg-white/[0.08] hover:text-white'
                        : 'text-[#F3EEE6]/74 hover:bg-white/[0.07] hover:text-[#F3EEE6]'
                    } ${active || activeMenu === 'solutions' ? 'bg-white/[0.08] text-white' : ''}`}
                    aria-haspopup="menu"
                    aria-expanded={activeMenu === 'solutions'}
                    onClick={openSolutions}
                    onKeyDown={handleSolutionsKeyDown}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition ${activeMenu === 'solutions' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              )
            }

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex h-11 items-center rounded-full px-4 text-sm font-bold transition xl:px-5 ${
                  isHome
                    ? 'text-white/82 hover:bg-white/[0.08] hover:text-white'
                    : 'text-[#F3EEE6]/74 hover:bg-white/[0.07] hover:text-[#F3EEE6]'
                } ${active ? 'bg-white/[0.1] text-white' : ''}`}
                onClick={() => trackNavigationEvent(item.analyticsEvent)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 justify-self-end lg:flex">
          <a
            href={appAuthUrl}
            className={`rounded-full px-4 py-3 text-sm font-bold transition ${
              isHome ? 'text-white/72 hover:bg-white/[0.08] hover:text-white' : 'text-[#F3EEE6]/68 hover:bg-white/[0.07] hover:text-[#F3EEE6]'
            }`}
            onClick={() => trackNavigationEvent('nav_login_clicked')}
          >
            Login
          </a>
          <a
            href={demoHref}
            className="bridge-button-primary bridge-button-light min-h-[46px] px-5 py-3 text-sm"
            onClick={() => trackNavigationEvent('nav_book_demo_clicked')}
          >
            Book a Demo
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-[rgba(243,238,230,0.12)] bg-white/[0.06] text-[#F3EEE6] lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-5 w-5" />
        </button>

        <AnimatePresence>
          {activeMenu === 'solutions' ? (
            <motion.div
              data-solutions-dropdown
              className="absolute left-1/2 top-[calc(100%+14px)] hidden -translate-x-1/2 lg:block"
              role="menu"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: motionEaseOut }}
            >
              <SolutionsDropdown onNavigate={() => setActiveMenu(null)} />
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

            <div className="my-5 h-px bg-[rgba(243,238,230,0.1)]" />

            <motion.nav
              className="grid gap-4"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
              }}
            >
              <motion.div className="grid gap-1" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                {primaryNavItems.slice(0, 2).map((item) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      trackNavigationEvent(item.analyticsEvent)
                      closeMobile()
                    }}
                  >
                    {item.label}
                  </MobileNavLink>
                ))}
              </motion.div>

              <motion.section variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                <button
                  type="button"
                  className="flex min-h-12 items-center px-1 text-left text-[1.1rem] font-extrabold leading-[1.25] text-[#86E4C2]"
                  onClick={() => trackNavigationEvent('nav_solutions_clicked')}
                >
                  Solutions
                </button>
                <div className="mt-3 grid gap-1 rounded-[24px] border border-[rgba(243,238,230,0.1)] bg-white/[0.05] p-2">
                  {solutionNavItems.map((item) => (
                    <MobileNavLink key={item.href} href={item.href} onClick={closeMobile}>
                      {item.label}
                    </MobileNavLink>
                  ))}
                </div>
              </motion.section>

              <motion.div className="grid gap-1 border-y border-[rgba(243,238,230,0.1)] py-4" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                {primaryNavItems.slice(3).map((item) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      trackNavigationEvent(item.analyticsEvent)
                      closeMobile()
                    }}
                  >
                    {item.label}
                  </MobileNavLink>
                ))}
                <MobileNavLink
                  href={appAuthUrl}
                  onClick={() => {
                    trackNavigationEvent('nav_login_clicked')
                    closeMobile()
                  }}
                >
                  Login
                </MobileNavLink>
                <div className="mt-3">
                  <MobileNavLink
                    href={demoHref}
                    onClick={() => {
                      trackNavigationEvent('nav_book_demo_clicked')
                      closeMobile()
                    }}
                    featured
                  >
                    Book a Demo
                  </MobileNavLink>
                </div>
              </motion.div>
            </motion.nav>

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

            <p className="mt-8 pb-4 text-sm text-[#B9B1A7]">© 2026 Arch9. All rights reserved.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
