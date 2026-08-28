import { Children, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileText,
  Heart,
  Home,
  Search,
  UsersRound,
} from 'lucide-react'
import { platformTabs } from '../../config/marketingHome'
import { motionEaseOut } from '../motion/timing'

const demoTransactions = [
  { address: '14 Nicolson Street', status: 'Transfer in progress', progress: 86 },
  { address: '23 Army Road', status: 'Finance approved', progress: 72 },
  { address: '5 Sunset Boulevard', status: 'Buyer onboarded', progress: 49 },
  { address: '12 Ocean View Drive', status: 'OTP signed', progress: 25 },
]

const demoActivity = [
  { time: '11:42', title: 'Transfer completed', detail: '14 Nicolson Street' },
  { time: '10:31', title: 'Finance approved', detail: '23 Army Road' },
  { time: '09:17', title: 'Buyer onboarded', detail: '5 Sunset Boulevard' },
  { time: '08:04', title: 'OTP signed', detail: '12 Ocean View Drive' },
]

export function Eyebrow({ children, light = false, className = '' }) {
  return (
    <p className={`text-[0.68rem] font-extrabold uppercase ${light ? 'text-[#86E4C2]' : 'text-[#0B6B50]'} ${className}`}>
      {children}
    </p>
  )
}

export function Arch9Mark({ light = false, compact = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={light ? '/brand/icons/arch9-icon-dark-48.png' : '/brand/icons/arch9-icon-light-48.png'}
        alt=""
        className={compact ? 'h-6 w-6' : 'h-8 w-8'}
      />
      <span className={`${compact ? 'text-xs' : 'text-sm'} font-extrabold ${light ? 'text-white' : 'text-[#071E1A]'}`}>ARCH9</span>
    </span>
  )
}

function SidebarIcon({ icon: Icon, active = false }) {
  return (
    <span className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${active ? 'bg-[#0B6B50] text-white' : 'text-white/54'}`}>
      <Icon className="h-4 w-4" />
    </span>
  )
}

function MetricTile({ label, value, change, warning = false }) {
  return (
    <div className="min-w-0 rounded-[8px] border border-[#071E1A]/7 bg-white px-3 py-3 shadow-[0_10px_30px_rgba(7,30,26,0.04)]">
      <p className="truncate text-[9px] font-bold text-[#64746E]">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <strong className="text-xl font-extrabold text-[#071E1A]">{value}</strong>
        <span className={`rounded-full px-2 py-1 text-[8px] font-extrabold ${warning ? 'bg-[#FFF0EC] text-[#C24F35]' : 'bg-[#E8F5EF] text-[#0B6B50]'}`}>
          {change}
        </span>
      </div>
    </div>
  )
}

export function DashboardPreview({ activeTab = 'dashboard', compact = false, className = '' }) {
  const selectedTab = platformTabs.find((tab) => tab.id === activeTab) || platformTabs[0]
  const SelectedIcon = selectedTab.icon

  return (
    <div className={`overflow-hidden rounded-[10px] border border-[#071E1A]/10 bg-[#F7F9F7] shadow-[0_32px_100px_rgba(7,30,26,0.15)] ${className}`}>
      <div className={`grid ${compact ? 'grid-cols-[46px_1fr]' : 'grid-cols-[58px_1fr] md:grid-cols-[66px_1fr]'}`}>
        <aside className="flex flex-col items-center bg-[#071E1A] py-4">
          <img src="/brand/icons/arch9-icon-dark-48.png" alt="" className="h-7 w-7" />
          <div className="mt-7 grid gap-1.5">
            <SidebarIcon icon={Home} />
            <SidebarIcon icon={SelectedIcon} active />
            <SidebarIcon icon={UsersRound} />
            <SidebarIcon icon={FileText} />
            <SidebarIcon icon={CircleDollarSign} />
            <SidebarIcon icon={Clock3} />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex items-center justify-between border-b border-[#071E1A]/7 bg-white px-4 py-3 md:px-5">
            <div>
              <p className="text-[9px] font-semibold text-[#718079]">Good morning, Sarah</p>
              <p className="mt-0.5 text-xs font-extrabold text-[#071E1A]">Here’s what’s happening today.</p>
            </div>
            <div className="flex items-center gap-2 text-[#52635D]">
              <Search className="h-3.5 w-3.5" />
              <Bell className="h-3.5 w-3.5" />
              <span className="h-6 w-6 rounded-full bg-[#D8B29C]" />
            </div>
          </div>

          <div className={compact ? 'p-3' : 'p-4 md:p-5'}>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <MetricTile label="New Leads" value="24" change="+12%" />
              <MetricTile label="Active Listings" value="128" change="+8%" />
              <MetricTile label="Transactions" value="45" change="+15%" />
              <MetricTile label="Tasks Due" value="12" change="+5%" warning />
            </div>

            <div className={`mt-3 grid gap-3 ${compact ? '' : 'md:grid-cols-[1.08fr_0.92fr]'}`}>
              <div className="rounded-[8px] border border-[#071E1A]/7 bg-white p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-[#72817B]">{selectedTab.label}</p>
                    <h3 className="mt-1 text-sm font-extrabold text-[#071E1A]">{selectedTab.title}</h3>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#E8F5EF]" style={{ color: selectedTab.accent }}>
                    <SelectedIcon className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-4 grid gap-2">
                  {demoTransactions.slice(0, compact ? 3 : 4).map((transaction) => (
                    <div key={transaction.address} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-t border-[#071E1A]/6 pt-2 first:border-t-0 first:pt-0">
                      <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#EEF3F0] text-[#0B6B50]">
                        <Home className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-extrabold text-[#071E1A]">{transaction.address}</p>
                        <p className="truncate text-[8px] font-semibold text-[#698078]">{transaction.status}</p>
                      </div>
                      <div className="w-14">
                        <p className="text-right text-[8px] font-extrabold text-[#52635D]">{transaction.progress}%</p>
                        <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-[#DFE7E2]">
                          <span className="block h-full rounded-full bg-[#0B6B50]" style={{ width: `${transaction.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {!compact ? (
                <div className="rounded-[8px] border border-[#071E1A]/7 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-extrabold text-[#071E1A]">Live feed</p>
                    <span className="text-[8px] font-bold text-[#0B6B50]">View all</span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {demoActivity.map((item) => (
                      <div key={item.title} className="grid grid-cols-[34px_1fr] gap-2">
                        <span className="text-[8px] font-extrabold text-[#74827D]">{item.time}</span>
                        <div className="border-l border-[#0B6B50]/20 pl-3">
                          <p className="text-[9px] font-extrabold text-[#071E1A]">{item.title}</p>
                          <p className="mt-0.5 text-[8px] font-semibold text-[#74827D]">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PhoneDashboardPreview({ className = '' }) {
  return (
    <div className={`overflow-hidden rounded-[28px] border-[6px] border-[#071E1A] bg-white shadow-[0_28px_70px_rgba(7,30,26,0.24)] ${className}`}>
      <div className="mx-auto mt-1.5 h-3 w-16 rounded-full bg-[#071E1A]" />
      <div className="p-3">
        <p className="text-[8px] font-semibold text-[#6A7973]">Good morning, Sarah</p>
        <h3 className="mt-1 text-xs font-extrabold text-[#071E1A]">Agency overview</h3>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {[
            ['Leads', '24'],
            ['Listings', '128'],
            ['Transactions', '45'],
            ['Tasks', '12'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[7px] border border-[#071E1A]/7 bg-[#F8FAF8] p-2">
              <p className="text-[7px] font-bold text-[#708078]">{label}</p>
              <p className="mt-1 text-base font-extrabold text-[#071E1A]">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[8px] font-extrabold text-[#071E1A]">Recent transactions</p>
        <div className="mt-2 grid gap-2">
          {demoTransactions.slice(0, 3).map((item) => (
            <div key={item.address} className="rounded-[7px] bg-[#F5F8F6] p-2">
              <p className="truncate text-[7px] font-extrabold text-[#071E1A]">{item.address}</p>
              <div className="mt-1.5 h-0.5 rounded-full bg-[#DDE7E1]">
                <span className="block h-full rounded-full bg-[#0B6B50]" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductTabs({ activeId, onChange, className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  function handleKeyDown(event, currentIndex) {
    const lastIndex = platformTabs.length - 1
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
    if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = lastIndex
    if (nextIndex === currentIndex && !['Home', 'End'].includes(event.key)) return

    event.preventDefault()
    const nextTab = platformTabs[nextIndex]
    onChange(nextTab.id)
    window.requestAnimationFrame(() => document.getElementById(`platform-tab-${nextTab.id}`)?.focus())
  }

  return (
    <div className={`-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 ${className}`}>
      <div className="flex min-w-max border-b border-[#071E1A]/12" role="tablist" aria-label="Explore Arch9 platform features">
        {platformTabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            type="button"
            role="tab"
            id={`platform-tab-${tab.id}`}
            aria-controls={`platform-panel-${tab.id}`}
            aria-selected={activeId === tab.id}
            tabIndex={activeId === tab.id ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: motionEaseOut }}
            className={`relative min-h-12 rounded-t-[6px] px-4 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6B50] ${
              activeId === tab.id ? 'bg-[#F1F8F4] text-[#071E1A]' : 'text-[#697872] hover:bg-[#F7FAF8] hover:text-[#071E1A]'
            }`}
          >
            <span className="relative z-10">{tab.label}</span>
            {activeId === tab.id ? (
              <motion.span
                layoutId="platform-tab-indicator"
                data-platform-tab-indicator
                className="absolute inset-x-3 bottom-[-1px] h-[2px] rounded-full bg-[#0B6B50] shadow-[0_0_12px_rgba(11,107,80,0.34)]"
                transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
              />
            ) : null}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export function ExperienceCard({ experience }) {
  return (
    <article className="w-full shrink-0 snap-center overflow-hidden rounded-[8px] border border-[#071E1A]/8 bg-white shadow-[0_24px_70px_rgba(7,30,26,0.08)]">
      <div className="p-5 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#E8F5EF] px-3 py-1.5 text-[9px] font-extrabold uppercase text-[#0B6B50]">{experience.label}</span>
          <Heart className="h-4 w-4 text-[#0B6B50]" />
        </div>
        <p className="mt-6 text-[10px] font-extrabold uppercase text-[#6B7A74]">{experience.eyebrow}</p>
        <div className="relative mt-5 grid gap-2" style={{ gridTemplateColumns: `repeat(${experience.stages.length}, minmax(0, 1fr))` }}>
          <div className="absolute left-[8%] right-[8%] top-3 h-px bg-[#D5E0DA]" />
          {experience.stages.map((stage, index) => (
            <div key={stage} className="relative z-10 text-center">
              <span className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${index < experience.activeStage ? 'border-[#0B6B50] bg-[#0B6B50] text-white' : index === experience.activeStage ? 'border-[#0B6B50] bg-white text-[#0B6B50]' : 'border-[#CDD8D2] bg-white text-[#A7B3AD]'}`}>
                {index < experience.activeStage ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              <p className="mt-2 text-[8px] font-bold text-[#61716A]">{stage}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 border-t border-[#071E1A]/8 pt-5">
          <p className="text-xs font-bold text-[#6B7A74]">Next up</p>
          <h3 className="mt-1 text-xl font-extrabold text-[#071E1A]">{experience.title}</h3>
          <p className="mt-3 text-sm font-medium leading-6 text-[#61716A]">{experience.copy}</p>
        </div>

        {experience.stats ? (
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#071E1A]/8 pt-5">
            {experience.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[9px] font-bold text-[#6B7A74]">{stat.label}</p>
                <p className="mt-1 text-lg font-extrabold text-[#071E1A]">{stat.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function HorizontalCarousel({ children, label, itemClassName = 'basis-[82%] sm:basis-[58%]', className = '' }) {
  const railRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const items = Children.toArray(children)

  function move(direction) {
    const nextIndex = Math.max(0, Math.min(items.length - 1, activeIndex + direction))
    const target = railRef.current?.children[nextIndex]
    target?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    setActiveIndex(nextIndex)
  }

  function handleScroll() {
    const rail = railRef.current
    if (!rail?.children.length) return
    const railCenter = rail.scrollLeft + rail.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY
    Array.from(rail.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2
      const distance = Math.abs(childCenter - railCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })
    setActiveIndex(closestIndex)
  }

  return (
    <div className={className} role="region" aria-label={label}>
      <div ref={railRef} onScroll={handleScroll} className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none]">
        {items.map((child, index) => (
          <div key={index} className={`shrink-0 snap-center ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2" aria-label={`Slide ${activeIndex + 1} of ${items.length}`}>
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                railRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
                setActiveIndex(index)
              }}
              className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-5 bg-[#0B6B50]' : 'w-2 bg-[#071E1A]/16'}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Previous slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#071E1A]/10 bg-white text-[#071E1A] disabled:opacity-30">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => move(1)} disabled={activeIndex === items.length - 1} aria-label="Next slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#071E1A]/10 bg-white text-[#071E1A] disabled:opacity-30">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function FeatureAccordion({ features }) {
  const [open, setOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="border-y border-white/16">
      <button
        type="button"
        className="flex min-h-16 w-full items-center justify-between gap-4 text-left text-sm font-extrabold text-white"
        aria-expanded={open}
        aria-controls="core-platform-features"
        onClick={() => setOpen((current) => !current)}
      >
        What’s included?
        <ChevronDown className={`h-5 w-5 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        id="core-platform-features"
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: motionEaseOut }}
        className="overflow-hidden"
      >
        <ul className="grid gap-3 pb-6 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm font-semibold text-white/72">
              <Check className="h-4 w-4 text-[#86E4C2]" />
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
