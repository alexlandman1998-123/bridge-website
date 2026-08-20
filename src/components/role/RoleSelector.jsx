import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { roleOptions, transactionStages } from '../../config/rolePages'
import { motionEaseOut } from '../motion/timing'

function MiniJourney({ activeStages = [] }) {
  return (
    <div className="mt-8 grid gap-2">
      <div className="flex items-center gap-1.5 overflow-hidden">
        {transactionStages.map((stage, index) => {
          const active = activeStages.includes(stage.id)
          return (
            <span key={stage.id} className="flex min-w-0 flex-1 items-center gap-1.5">
              <span className={`h-1.5 min-w-0 flex-1 rounded-full transition ${active ? 'bg-[#0E6A55]' : 'bg-[#DDE6DF]'}`} />
              {index < transactionStages.length - 1 ? <span className="hidden h-px w-2 shrink-0 bg-[#C9D4CD] sm:block" /> : null}
            </span>
          )
        })}
      </div>
      <div className="hidden grid-cols-7 gap-2 text-[10px] font-black uppercase leading-tight tracking-[0.08em] text-[#6A7B74] md:grid">
        {transactionStages.map((stage) => (
          <span key={stage.id} className={activeStages.includes(stage.id) ? 'text-[#064537]' : ''}>
            {stage.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function RoleSelector({ className = '', compact = false }) {
  const [activeRoleKey, setActiveRoleKey] = useState('developers')
  const shouldReduceMotion = useReducedMotion()
  const activeRole = roleOptions.find((role) => role.key === activeRoleKey) || roleOptions[0]

  return (
    <section id="roles" className={className} aria-labelledby="role-selector-title">
      <div className="mx-auto w-full max-w-[1500px]">
        {!compact ? (
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">Choose your view</p>
            <h2 id="role-selector-title" className="mt-4 text-[2.25rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#071E1A] md:text-[3.7rem]">
              Where do you fit into the transaction?
            </h2>
          </div>
        ) : null}

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {roleOptions.map((role, index) => {
            const Icon = role.icon
            const active = role.key === activeRoleKey
            return (
              <motion.a
                key={role.key}
                href={role.href}
                className={`group flex min-h-[218px] flex-col justify-between rounded-[18px] border p-5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86E4C2] ${
                  active
                    ? 'border-[#0E6A55]/30 bg-white shadow-[0_28px_80px_rgba(7,30,26,0.1)]'
                    : 'border-[#0A3028]/8 bg-white/68 shadow-[0_18px_48px_rgba(7,30,26,0.045)] hover:border-[#0E6A55]/22 hover:bg-white'
                }`}
                onMouseEnter={() => setActiveRoleKey(role.key)}
                onFocus={() => setActiveRoleKey(role.key)}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, delay: index * 0.04, ease: motionEaseOut }}
              >
                <span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#0A3028]/8 bg-[#F6F8F4] text-[#064537] transition group-hover:-translate-y-0.5">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-7 block text-[1.28rem] font-extrabold leading-tight tracking-[-0.035em] text-[#071E1A]">
                    {role.label}
                  </span>
                  <span className="mt-3 block text-sm font-semibold leading-6 text-[#5B6B64]">{role.description}</span>
                </span>
                <span className="mt-7 flex items-center justify-between text-sm font-extrabold text-[#064537]">
                  Enter this view
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </motion.a>
            )
          })}
        </div>

        <div className="mt-7 rounded-[18px] border border-[#0A3028]/8 bg-white/72 p-4 shadow-[0_18px_54px_rgba(7,30,26,0.05)] md:p-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-extrabold text-[#071E1A]">{activeRole.label} in the Arch9 journey</p>
            <p className="text-sm font-semibold text-[#5B6B64]">One transaction, different workspaces.</p>
          </div>
          <MiniJourney activeStages={activeRole.activeStages} />
        </div>
      </div>
    </section>
  )
}
