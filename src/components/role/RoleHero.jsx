import { ArrowRight, CheckCircle2, CircleDot } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { motionEaseOut } from '../motion/timing'

function ProductFrame({ visual }) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-[#0A3028]/10 bg-white shadow-[0_34px_110px_rgba(7,30,26,0.14)]">
      <div className="flex items-center gap-2 border-b border-[#0A3028]/8 bg-[#F8FAF7] px-5 py-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#B9D9C9]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#DDE6DF]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#DDE6DF]" />
        <span className="ml-2 rounded-full bg-[#EAF7F0] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#064537]">
          {visual.label}
        </span>
      </div>
      <div className="grid min-h-[440px] lg:grid-cols-[84px_1fr]">
        <aside className="hidden bg-[#071E1A] p-4 text-white lg:block">
          <div className="flex h-12 items-center justify-center rounded-[14px] bg-white/[0.08] text-lg font-black">A9</div>
          <div className="mt-8 grid gap-3">
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className={`mx-auto h-10 w-10 rounded-[12px] ${item === 1 ? 'bg-[#86E4C2]' : 'bg-white/[0.08]'}`} />
            ))}
          </div>
        </aside>
        <div className="p-5 md:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6A55]">Arch9</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{visual.title}</h2>
              <p className="mt-2 text-sm font-semibold text-[#5B6B64]">{visual.subtitle}</p>
            </div>
            <span className="w-fit rounded-full border border-[#0A3028]/10 bg-[#F7F9F6] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#064537]">
              Live
            </span>
          </div>

          <div className="mt-7 rounded-[18px] border border-[#0A3028]/8 bg-[#FAFCF8] p-5">
            <div className="flex items-center justify-between gap-4 text-sm font-extrabold text-[#071E1A]">
              <span>{visual.progressLabel}</span>
              <span>{visual.progress}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E4ECE6]">
              <div className="h-full rounded-full bg-[#0E6A55]" style={{ width: `${visual.progress}%` }} />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {visual.stats.map((stat) => (
              <div key={stat.label} className="rounded-[16px] border border-[#0A3028]/8 bg-white p-4">
                <p className="text-2xl font-extrabold tracking-[-0.04em] text-[#071E1A]">{stat.value}</p>
                <p className="mt-1 text-xs font-bold text-[#5B6B64]">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3">
            {visual.rows.map((row, index) => (
              <div key={row.label} className="flex items-start gap-3 rounded-[16px] border border-[#0A3028]/8 bg-white p-4">
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${index === 0 ? 'bg-[#064537] text-white' : 'bg-[#EAF7F0] text-[#064537]'}`}>
                  {index < 2 ? <CheckCircle2 className="h-4 w-4" /> : <CircleDot className="h-4 w-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-extrabold text-[#071E1A]">{row.label}</span>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[#5B6B64]">{row.meta}</span>
                </span>
                <span className="rounded-full bg-[#F1F5F2] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#064537]">{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RoleHero({ page }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-[#FAF8F3] px-5 pb-14 pt-[118px] md:px-8 md:pb-20 md:pt-[138px]">
      <div className="absolute inset-x-0 top-0 h-[58%] bg-[linear-gradient(180deg,#FFFFFF_0%,#FAF8F3_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[0.43fr_0.57fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, ease: motionEaseOut }}
        >
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">{page.eyebrow}</p>
          <h1 className="mt-5 max-w-[760px] text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#071E1A] md:text-[4.6rem] xl:text-[5.4rem]">
            {page.headline}
          </h1>
          <p className="mt-7 max-w-[650px] text-base font-medium leading-8 text-[#52645D] md:text-lg">{page.supportingCopy}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={page.heroCta.href} className="bridge-button-primary">
              {page.heroCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={page.secondaryCta.href} className="bridge-button-secondary border-[#0A3028]/12 bg-white/78 text-[#071E1A]">
              {page.secondaryCta.label}
            </a>
          </div>
          <div className="mt-10 grid gap-3">
            {page.problems.map((problem) => (
              <p key={problem} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#5B6B64]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0E6A55]" />
                {problem}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: shouldReduceMotion ? 1 : 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, delay: 0.1, ease: motionEaseOut }}
        >
          <ProductFrame visual={page.heroVisual} />
        </motion.div>
      </div>
    </section>
  )
}
