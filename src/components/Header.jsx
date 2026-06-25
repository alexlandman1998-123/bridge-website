import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Search, Sparkles, X } from 'lucide-react'
import { appAuthUrl, demoHref, primaryNavItems, solutionNavItems } from '../config/navigation'
import { toolsMenu } from '../config/tools'
import { buildPropertyQuery } from '../lib/listingFilters'
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

const primaryToolsMenu = toolsMenu.filter((category) => category.key !== 'professionals')

const saleTypeOptions = [
  { label: 'For Sale', value: 'for-sale' },
  { label: 'To Rent', value: 'to-rent' },
]

const propertyTypeOptions = ['Any', 'Apartment', 'Estate Home', 'Townhouse', 'Development']
const bedroomOptions = ['Any', '1+', '2+', '3+', '4+']
const bathroomOptions = ['Any', '1+', '2+', '3+']

function BuySearchInput({ label, value, onChange, placeholder, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#05120F]/60">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#05120F]/45" /> : null}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`h-14 w-full rounded-[14px] border border-black/[0.08] bg-[#FCFBF8] px-4 text-sm font-semibold text-[#062D25] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] outline-none transition duration-200 placeholder:text-[#05120F]/42 focus:border-[#064537] focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,69,55,0.08)] ${
            Icon ? 'pl-11' : ''
          }`}
        />
      </div>
    </label>
  )
}

function BuySearchSelect({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#05120F]/60">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-full appearance-none rounded-[14px] border border-black/[0.08] bg-[#FCFBF8] px-4 pr-10 text-sm font-semibold text-[#062D25] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] outline-none transition duration-200 focus:border-[#064537] focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,69,55,0.08)]"
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#05120F]/48 shadow-[0_4px_14px_rgba(5,8,7,0.05)]">
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>
    </label>
  )
}

function BuySearchDashboard({ onNavigate, compact = false }) {
  const [status, setStatus] = useState('for-sale')
  const [filters, setFilters] = useState({
    location: '',
    type: 'Any',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Any',
    bathrooms: 'Any',
  })

  function updateField(key, value) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function submitSearch(event) {
    event.preventDefault()
    const query = buildPropertyQuery({ status, ...filters })
    onNavigate?.()
    window.location.assign(query ? `/properties?${query}` : '/properties')
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1320px]">
      <div className="ml-3 flex w-fit overflow-hidden rounded-t-[18px] border border-b-0 border-white/18 bg-white shadow-[0_18px_50px_rgba(3,18,15,0.18)] md:ml-4">
        {saleTypeOptions.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setStatus(item.value)}
            className={`min-h-13 px-6 text-sm font-extrabold transition md:px-8 ${
              status === item.value
                ? 'bg-[#062D25] text-white shadow-[0_12px_24px_rgba(3,18,15,0.18)]'
                : 'bg-[#F7F3EA] text-[#062D25] hover:bg-[#EFE9DD]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={`${compact ? 'min-h-0 p-5' : 'min-h-[250px] p-6 md:p-8 xl:p-10'} rounded-[24px] border border-black/[0.06] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]`}>
        <form onSubmit={submitSearch}>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <BuySearchInput
              label="Location"
              value={filters.location}
              onChange={(value) => updateField('location', value)}
              placeholder="Enter suburb or area"
              icon={MapPin}
            />
            <BuySearchSelect label="Property Type" value={filters.type} onChange={(value) => updateField('type', value)}>
              {propertyTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </BuySearchSelect>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_220px]">
            <BuySearchInput
              label="Min Price"
              value={filters.minPrice}
              onChange={(value) => updateField('minPrice', value)}
              placeholder="No Min"
            />
            <BuySearchInput
              label="Max Price"
              value={filters.maxPrice}
              onChange={(value) => updateField('maxPrice', value)}
              placeholder="No Max"
            />
            <BuySearchSelect label="Bedrooms" value={filters.bedrooms} onChange={(value) => updateField('bedrooms', value)}>
              {bedroomOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </BuySearchSelect>
            <BuySearchSelect label="Bathrooms" value={filters.bathrooms} onChange={(value) => updateField('bathrooms', value)}>
              {bathroomOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </BuySearchSelect>
            <button
              type="submit"
              className="col-span-2 inline-flex h-14 w-full items-center justify-center gap-2 self-end rounded-[16px] bg-[#064537] px-6 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(6,69,55,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#05352D] focus:outline-none focus:ring-4 focus:ring-[#064537]/15 lg:col-span-1"
            >
              <Search className="h-4 w-4" />
              Search Properties
            </button>
          </div>
        </form>

        <p className="mt-5 text-sm font-semibold text-[#05120F]/55">Browse 128,457 properties across South Africa</p>
      </div>
    </div>
  )
}

function BuyDropdown({ onNavigate }) {
  return (
    <div className="relative w-[min(1320px,calc(100vw-64px))] rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-[#F7F3EA]/98 p-6 text-[#0F172A] shadow-[0_34px_90px_rgba(5,8,7,0.16)] backdrop-blur-2xl">
      <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[rgba(15,23,42,0.08)] bg-[#F7F3EA]/98" />
      <BuySearchDashboard onNavigate={onNavigate} />
    </div>
  )
}

function SolutionsDropdown({ onNavigate }) {
  return (
    <div className="w-[calc(100vw-160px)] max-w-[1360px] rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-white/98 px-11 py-9 text-[#0F172A] shadow-[0_34px_90px_rgba(5,8,7,0.16)] backdrop-blur-2xl">
      <div className="grid grid-cols-5 gap-0">
        {solutionNavItems.map((item, index) => {
          const Icon = item.icon
          return (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`group min-w-0 px-6 py-1 transition first:pl-0 last:pr-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/20 ${
                index ? 'border-l border-[rgba(15,23,42,0.08)]' : ''
              }`}
              onClick={onNavigate}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#E7F6EF] text-[#063F34] transition group-hover:bg-[#DFF2EA] group-hover:text-[#0F766E]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-5 block text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-[#0B1F1A]">{item.title || item.label}</span>
              <span className="mt-3 block max-w-[220px] text-[15px] font-semibold leading-[1.55] text-[rgba(15,23,42,0.62)]">
                {item.description}
              </span>
              <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-extrabold text-[#063F34] transition group-hover:text-[#0F766E]">
                {item.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

function ToolsDropdown({ onNavigate }) {
  return (
    <div className="relative w-[min(1040px,calc(100vw-64px))] rounded-[24px] border border-[rgba(15,23,42,0.08)] bg-white/98 p-7 text-[#111827] shadow-[0_34px_90px_rgba(5,8,7,0.16)] backdrop-blur-2xl xl:p-8">
      <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[rgba(15,23,42,0.08)] bg-white/98" />
      <div className="grid gap-0 lg:grid-cols-[repeat(3,minmax(185px,1fr))_250px]">
        {primaryToolsMenu.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.key} className="min-w-0 border-r border-[rgba(15,23,42,0.08)] px-5 first:pl-0 last:border-r-0">
              <div className="flex min-h-[78px] items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#E8F5EE] text-[#064E3B]">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-extrabold leading-tight text-[#111827]">{category.menuTitle}</p>
                  <p className="mt-2 max-w-[170px] text-xs font-semibold leading-5 text-[#667085]">{category.description}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-1">
                {category.links.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    role="menuitem"
                    className="group flex min-h-9 items-center justify-between gap-2 rounded-[12px] px-3 text-[13px] font-semibold leading-4 text-[#344054] transition hover:bg-[#E8F5EE] hover:text-[#064E3B] focus-visible:bg-[#E8F5EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006B4D]/20"
                    onClick={onNavigate}
                  >
                    <span>{tool.label}</span>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 -rotate-90 text-[#064E3B]/52 transition group-hover:translate-x-1 group-hover:text-[#064E3B]" />
                  </a>
                ))}
              </div>
              <a
                href={category.href}
                role="menuitem"
                className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-[13px] font-extrabold text-[#064E3B] transition hover:bg-[#E8F5EE]"
                onClick={onNavigate}
              >
                {category.footerLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )
        })}

        <a
          href="/tools"
          role="menuitem"
          className="group relative ml-6 overflow-hidden rounded-[20px] bg-[#064E3B] p-6 text-[#F8F6F2] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
          onClick={onNavigate}
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#86E4C2]/12 blur-2xl" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/14 bg-white/10 text-[#86E4C2] backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="relative mt-8 text-xl font-extrabold tracking-[-0.04em] text-[#F8F6F2]">Property Intelligence</p>
          <p className="relative mt-3 text-sm font-medium leading-6 text-[#F8F6F2]/72">
            Free tools and calculators designed to help buyers, sellers and professionals make better decisions.
          </p>
          <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#F8F6F2]">
            Explore 20+ Property Tools
            <ArrowRight className="h-4 w-4 text-[#86E4C2] transition group-hover:translate-x-1" />
          </span>
        </a>
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
  const [mobileBuyOpen, setMobileBuyOpen] = useState(true)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(true)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(true)
  const [mobileToolCategoryOpen, setMobileToolCategoryOpen] = useState('buyers')
  const [scrolled, setScrolled] = useState(false)
  const [pathname, setPathname] = useState(window.location.pathname)
  const headerRef = useRef(null)
  const navShellRef = useRef(null)
  const solutionsButtonRef = useRef(null)
  const closeMenuTimerRef = useRef(null)
  const isHome = pathname === '/'
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  function cancelCloseMenu() {
    if (!closeMenuTimerRef.current) return
    window.clearTimeout(closeMenuTimerRef.current)
    closeMenuTimerRef.current = null
  }

  function scheduleCloseMenu() {
    cancelCloseMenu()
    closeMenuTimerRef.current = window.setTimeout(() => {
      setActiveMenu(null)
      closeMenuTimerRef.current = null
    }, 180)
  }

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
        cancelCloseMenu()
        setActiveMenu(null)
      }
    }

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        cancelCloseMenu()
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

  useEffect(() => {
    return () => {
      if (closeMenuTimerRef.current) {
        window.clearTimeout(closeMenuTimerRef.current)
      }
    }
  }, [])

  function closeMobile() {
    setMobileOpen(false)
    setMobileBuyOpen(true)
    setMobileSolutionsOpen(true)
    setMobileToolsOpen(true)
    setMobileToolCategoryOpen('buyers')
  }

  function openMenu(menu) {
    cancelCloseMenu()
    setActiveMenu(menu)
    const eventName = menu === 'tools' ? 'nav_tools_clicked' : menu === 'solutions' ? 'nav_solutions_clicked' : 'nav_buy_clicked'
    trackNavigationEvent(eventName)
  }

  function handleMenuKeyDown(event, menu) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      cancelCloseMenu()
      setActiveMenu(menu)
      window.requestAnimationFrame(() => {
        navShellRef.current?.querySelector(`[data-${menu}-dropdown] a`)?.focus()
      })
    }
  }

  const buyIndex = primaryNavItems.findIndex((item) => item.menu === 'buy')
  const solutionsIndex = primaryNavItems.findIndex((item) => item.menu === 'solutions')
  const toolsIndex = primaryNavItems.findIndex((item) => item.menu === 'tools')
  const firstMenuIndex = Math.min(...[buyIndex, solutionsIndex, toolsIndex].filter((index) => index >= 0))
  const mobileNavBeforeMenus = (firstMenuIndex >= 0 ? primaryNavItems.slice(0, firstMenuIndex) : primaryNavItems).filter((item) => !item.menu)
  const mobileNavAfterMenus = (firstMenuIndex >= 0 ? primaryNavItems.slice(firstMenuIndex) : []).filter((item) => !item.menu)

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
        onMouseEnter={cancelCloseMenu}
        onMouseLeave={scheduleCloseMenu}
      >
        <a href="/" className={`text-[0.95rem] font-extrabold tracking-[0.24em] ${isHome ? 'text-white' : 'text-[#F3EEE6]'}`}>
          ARCH9
        </a>

        <nav className="hidden min-w-0 justify-self-center lg:flex lg:items-center lg:gap-2 xl:gap-3" aria-label="Primary navigation">
          {primaryNavItems.map((item) => {
            const active =
              item.menu === 'solutions'
                ? pathname.startsWith('/solutions/') || solutionNavItems.some((solution) => pathname === solution.href || pathname.startsWith(`${solution.href}/`))
                : item.menu === 'tools'
                  ? pathname === '/tools' || pathname.startsWith('/tools/')
                  : item.menu === 'buy'
                    ? pathname === '/properties' || pathname === '/for-sale' || pathname.startsWith('/properties/')
                    : isActivePath(pathname, item)
            if (item.menu) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelCloseMenu()
                    setActiveMenu(item.menu)
                  }}
                >
                  <button
                    ref={item.menu === 'solutions' ? solutionsButtonRef : undefined}
                    type="button"
                    className={`flex h-11 items-center gap-1.5 rounded-full px-3 text-[17px] font-normal transition xl:px-4 ${
                      isHome
                        ? 'text-white/82 hover:bg-white/[0.08] hover:text-white'
                        : 'text-[#F3EEE6]/74 hover:bg-white/[0.07] hover:text-[#F3EEE6]'
                    } ${active || activeMenu === item.menu ? 'bg-white/[0.08] text-white' : ''}`}
                    aria-haspopup="menu"
                    aria-expanded={activeMenu === item.menu}
                    onClick={() => openMenu(item.menu)}
                    onKeyDown={(event) => handleMenuKeyDown(event, item.menu)}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition ${activeMenu === item.menu ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              )
            }

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex h-11 items-center rounded-full px-3 text-[17px] font-normal transition xl:px-4 ${
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
            className={`rounded-full px-4 py-3 text-[17px] font-normal transition ${
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
          {activeMenu ? (
            <motion.div
              data-buy-dropdown={activeMenu === 'buy' ? true : undefined}
              data-solutions-dropdown={activeMenu === 'solutions' ? true : undefined}
              data-tools-dropdown={activeMenu === 'tools' ? true : undefined}
              className="absolute left-1/2 top-[calc(100%+14px)] hidden -translate-x-1/2 lg:block"
              role="menu"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: motionEaseOut }}
              onMouseEnter={cancelCloseMenu}
              onMouseLeave={scheduleCloseMenu}
            >
              {activeMenu === 'buy' ? (
                <BuyDropdown
                  onNavigate={() => {
                    cancelCloseMenu()
                    setActiveMenu(null)
                  }}
                />
              ) : activeMenu === 'tools' ? (
                <ToolsDropdown
                  onNavigate={() => {
                    cancelCloseMenu()
                    setActiveMenu(null)
                  }}
                />
              ) : (
                <SolutionsDropdown
                  onNavigate={() => {
                    cancelCloseMenu()
                    setActiveMenu(null)
                  }}
                />
              )}
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
                {mobileNavBeforeMenus.map((item) => (
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
                  className="flex min-h-12 w-full items-center justify-between rounded-[18px] px-1 text-left text-[1.1rem] font-extrabold leading-[1.25] text-[#86E4C2] transition hover:bg-white/[0.07] hover:px-4"
                  aria-expanded={mobileBuyOpen}
                  onClick={() => {
                    setMobileBuyOpen((open) => !open)
                    trackNavigationEvent('nav_buy_clicked')
                  }}
                >
                  <span>Buy</span>
                  <ChevronDown className={`h-5 w-5 transition ${mobileBuyOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {mobileBuyOpen ? (
                    <motion.div
                      className="mt-3 overflow-hidden rounded-[24px] border border-[rgba(243,238,230,0.1)] bg-[#F7F3EA] p-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: motionEaseOut }}
                    >
                      <BuySearchDashboard compact onNavigate={closeMobile} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.section>

              <motion.section variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                <button
                  type="button"
                  className="flex min-h-12 w-full items-center justify-between rounded-[18px] px-1 text-left text-[1.1rem] font-extrabold leading-[1.25] text-[#86E4C2] transition hover:bg-white/[0.07] hover:px-4"
                  aria-expanded={mobileToolsOpen}
                  onClick={() => {
                    setMobileToolsOpen((open) => !open)
                    trackNavigationEvent('nav_tools_clicked')
                  }}
                >
                  <span>Tools</span>
                  <ChevronDown className={`h-5 w-5 transition ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {mobileToolsOpen ? (
                    <motion.div
                      className="mt-3 grid gap-2 rounded-[24px] border border-[rgba(243,238,230,0.1)] bg-white/[0.05] p-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: motionEaseOut }}
                    >
                      {primaryToolsMenu.map((category) => {
                        const open = mobileToolCategoryOpen === category.key
                        return (
                          <div key={category.key}>
                            <button
                              type="button"
                              className="flex min-h-12 w-full items-center justify-between rounded-[16px] px-3 text-left text-sm font-extrabold text-[#F3EEE6] transition hover:bg-white/[0.07]"
                              aria-expanded={open}
                              onClick={() => setMobileToolCategoryOpen(open ? null : category.key)}
                            >
                              {category.title}
                              <ChevronDown className={`h-4 w-4 text-[#86E4C2] transition ${open ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence initial={false}>
                              {open ? (
                                <motion.div
                                  className="grid gap-1 px-2 pb-2"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.18, ease: motionEaseOut }}
                                >
                                  {category.links.map((tool) => (
                                    <a
                                      key={tool.href}
                                      href={tool.href}
                                      className="flex min-h-10 items-center rounded-[14px] px-3 text-xs font-semibold leading-5 text-[#B9B1A7] transition hover:bg-white/[0.07] hover:text-[#86E4C2]"
                                      onClick={closeMobile}
                                    >
                                      {tool.label}
                                    </a>
                                  ))}
                                  <a
                                    href={category.href}
                                    className="mt-1 flex min-h-10 items-center justify-between rounded-[14px] px-3 text-xs font-extrabold text-[#86E4C2] transition hover:bg-white/[0.07]"
                                    onClick={closeMobile}
                                  >
                                    {category.footerLabel}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </a>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                      <a
                        href="/tools"
                        className="mt-2 flex min-h-12 items-center justify-between rounded-[18px] bg-[#F3EEE6] px-4 text-sm font-extrabold text-[#071E1A] shadow-[0_18px_42px_rgba(0,0,0,0.18)]"
                        onClick={closeMobile}
                      >
                        Explore All Property Tools
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.section>

              <motion.section variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                <button
                  type="button"
                  className="flex min-h-12 w-full items-center justify-between rounded-[18px] px-1 text-left text-[1.1rem] font-extrabold leading-[1.25] text-[#86E4C2] transition hover:bg-white/[0.07] hover:px-4"
                  aria-expanded={mobileSolutionsOpen}
                  onClick={() => {
                    setMobileSolutionsOpen((open) => !open)
                    trackNavigationEvent('nav_solutions_clicked')
                  }}
                >
                  <span>Solutions</span>
                  <ChevronDown className={`h-5 w-5 transition ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {mobileSolutionsOpen ? (
                    <motion.div
                      className="mt-3 grid gap-1 rounded-[24px] border border-[rgba(243,238,230,0.1)] bg-white/[0.05] p-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: motionEaseOut }}
                    >
                      {solutionNavItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="group grid min-h-14 grid-cols-[1fr_auto] gap-x-3 gap-y-1 rounded-[16px] px-3 py-3 text-[#F3EEE6] transition hover:bg-white/[0.07] hover:text-[#86E4C2]"
                          onClick={closeMobile}
                        >
                          <span className="text-[1.02rem] font-extrabold leading-[1.2]">{item.title || item.label}</span>
                          <ChevronDown className="row-span-2 h-4 w-4 shrink-0 -rotate-90 self-center text-[#86E4C2]/80 transition group-hover:translate-x-1 group-hover:text-[#86E4C2]" />
                          <span className="text-xs font-semibold leading-5 text-[#B9B1A7]">{item.description}</span>
                        </a>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.section>

              <motion.div className="grid gap-1 border-y border-[rgba(243,238,230,0.1)] py-4" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                {mobileNavAfterMenus.map((item) => (
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
