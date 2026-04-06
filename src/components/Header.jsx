import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CTAButton from './CTAButton'

const topNav = [
  { label: 'Products', href: '#product', hasMenu: true },
  { label: 'Solutions', href: '#solutions', hasMenu: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Resources', href: '#trust', hasMenu: true },
]

const megaMenu = {
  Products: [
    {
      title: 'Products',
      items: [
        {
          label: 'Transaction Workspace',
          description: 'A single shared view across the full property transaction.',
          href: '#product',
        },
        {
          label: 'Workflow Tracking',
          description: 'Track every stage from reservation to handover.',
          href: '#how-it-works',
        },
        {
          label: 'Document Coordination',
          description: 'Keep requests, uploads, and status in one place.',
          href: '#solutions',
        },
        {
          label: 'Role-Based Views',
          description: 'Different views for developers, conveyancers, agents, and buyers.',
          href: '#roles',
        },
      ],
    },
    {
      title: 'Use cases',
      items: [
        {
          label: 'Developments',
          description: 'Manage multi-unit stock and transaction progress.',
          href: '#roles',
        },
        {
          label: 'Conveyancing',
          description: 'Structure the legal workflow and milestones.',
          href: '#roles',
        },
        {
          label: 'Buyer Updates',
          description: 'Keep clients informed without constant manual follow-up.',
          href: '#outcomes',
        },
      ],
    },
  ],
  Solutions: [
    {
      title: 'By role',
      items: [
        {
          label: 'For Developers',
          description: 'Track progress, stock, and deal movement across developments.',
          href: '#role-developers',
        },
        {
          label: 'For Conveyancers',
          description: 'Keep legal steps, documents, and milestones structured.',
          href: '#role-conveyancers',
        },
        {
          label: 'For Agents',
          description: 'Stay visible after the sale instead of losing the thread.',
          href: '#role-agents',
        },
        {
          label: 'For Buyers',
          description: 'Give buyers a clear view of what is happening next.',
          href: '#role-buyers',
        },
      ],
    },
    {
      title: 'Why Bridge',
      items: [
        {
          label: 'Shared visibility',
          description: 'One source of truth across the transaction.',
          href: '#solutions',
        },
        {
          label: 'Less admin',
          description: 'Reduce chasing, duplication, and back-and-forth.',
          href: '#outcomes',
        },
        {
          label: 'Higher trust',
          description: 'Match the process to real property workflow realities.',
          href: '#trust',
        },
      ],
    },
  ],
  Resources: [
    {
      title: 'Learn',
      items: [
        {
          label: 'How it works',
          description: 'See the full transaction lifecycle in Bridge.',
          href: '#how-it-works',
        },
        {
          label: 'Workflow view',
          description: 'Explore the operational software-style workflow section.',
          href: '#product',
        },
        {
          label: 'Role overview',
          description: 'Understand how each stakeholder fits into the system.',
          href: '#roles',
        },
      ],
    },
    {
      title: 'Company',
      items: [
        {
          label: 'Why teams use Bridge',
          description: 'The operational and client benefits of a shared platform.',
          href: '#outcomes',
        },
        {
          label: 'Built for trust',
          description: 'Designed around South African property transaction realities.',
          href: '#trust',
        },
        {
          label: 'Contact',
          description: 'Speak to us about your workflow and team setup.',
          href: '#contact',
        },
      ],
    },
  ],
}

function MegaMenuPanel({ section }) {
  const groups = megaMenu[section] || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 top-full z-50 mt-5 w-[920px] -translate-x-1/2 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
    >
      <div className="grid grid-cols-2 gap-0">
        {groups.map((group) => (
          <div
            key={group.title}
            className="border-r border-slate-200/80 p-6 last:border-r-0"
          >
            <p className="mb-4 text-[11px] uppercase tracking-[0.34em] text-slate-400">
              {group.title}
            </p>

            <div className="space-y-2">
              {group.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 transition hover:bg-slate-50"
                >
                  <div className="text-[15px] font-semibold text-slate-900">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-500">
                    {item.description}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-8">
        <a
  href="#top"
  className="text-[18px] font-medium tracking-[0.08em] text-slate-900"
>
  BRIDGE
</a>

        <div
          className="relative hidden lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <nav className="flex items-center gap-10">
            {topNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasMenu && setOpenMenu(item.label)}
              >
                <a
                  href={item.href}
                  className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.08em] text-slate-500 transition hover:text-slate-900"
                >
                  {item.label}
                  {item.hasMenu && (
                    <span className="text-[10px] text-slate-400">▾</span>
                  )}
                </a>
              </div>
            ))}
          </nav>

          <AnimatePresence>
            {openMenu && <MegaMenuPanel section={openMenu} />}
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex">
          <CTAButton href="#contact" className="px-7 py-3.5">
            Contact Sales
          </CTAButton>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className="block h-[2px] w-4 bg-current" />
            <span className="block h-[2px] w-4 bg-current" />
            <span className="block h-[2px] w-4 bg-current" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="mx-auto max-w-[1280px] space-y-6 px-6 py-6">
              {topNav.map((item) => (
                <div key={item.label} className="space-y-3">
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-semibold tracking-[0.12em] text-slate-800"
                  >
                    {item.label}
                  </a>

                  {item.hasMenu && megaMenu[item.label] && (
                    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      {megaMenu[item.label].flatMap((group) =>
                        group.items.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-xl bg-white px-4 py-3"
                          >
                            <div className="text-sm font-semibold text-slate-900">
                              {subItem.label}
                            </div>
                            <div className="mt-1 text-xs leading-5 text-slate-500">
                              {subItem.description}
                            </div>
                          </a>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}

              <CTAButton href="#contact" className="w-full justify-center">
                Contact Sales
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}