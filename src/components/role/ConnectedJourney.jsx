import { ArrowRightLeft, CircleDot } from 'lucide-react'
import { transactionStages } from '../../config/rolePages'

const connectedRoles = ['Developer', 'Agent', 'Buyer / Seller', 'Finance', 'Attorney', 'Registration']

export default function ConnectedJourney({ page, compact = false }) {
  const activeRoles = page?.journey?.activeRoles || []

  return (
    <section className={`${compact ? 'px-0 py-0' : 'bg-[#071E1A] px-5 py-16 text-white md:px-8 md:py-24'}`}>
      <div className={compact ? '' : 'mx-auto w-full max-w-[1400px]'}>
        {!compact ? (
          <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#86E4C2]">Connected transaction</p>
              <h2 className="mt-4 text-[2.4rem] font-extrabold leading-[1] tracking-[-0.045em] md:text-[4rem]">
                {page.journey.title}
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-white/68">{page.journey.copy}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 md:p-6">
              <JourneyMap activeRoles={activeRoles} />
            </div>
          </div>
        ) : (
          <JourneyMap activeRoles={activeRoles} light />
        )}
      </div>
    </section>
  )
}

function JourneyMap({ activeRoles = [], light = false }) {
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-6">
        {connectedRoles.map((role, index) => {
          const active = activeRoles.includes(role)
          return (
            <div
              key={role}
              className={`relative rounded-[16px] border p-4 text-center ${
                light
                  ? active
                    ? 'border-[#0E6A55]/28 bg-white text-[#071E1A]'
                    : 'border-[#0A3028]/8 bg-white/58 text-[#5B6B64]'
                  : active
                    ? 'border-[#86E4C2]/28 bg-[#86E4C2]/12 text-white'
                    : 'border-white/10 bg-white/[0.045] text-white/56'
              }`}
            >
              {index < connectedRoles.length - 1 ? (
                <span className={`absolute right-[-13px] top-1/2 z-10 hidden h-px w-6 ${light ? 'bg-[#0A3028]/14' : 'bg-white/18'} md:block`} />
              ) : null}
              <CircleDot className={`mx-auto h-5 w-5 ${active ? (light ? 'text-[#0E6A55]' : 'text-[#86E4C2]') : ''}`} />
              <p className="mt-3 text-xs font-black uppercase leading-5 tracking-[0.12em]">{role}</p>
            </div>
          )
        })}
      </div>

      <div className={`my-6 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.18em] ${light ? 'text-[#064537]' : 'text-[#86E4C2]'}`}>
        <span className={`h-px flex-1 ${light ? 'bg-[#0A3028]/10' : 'bg-white/12'}`} />
        <ArrowRightLeft className="h-4 w-4" />
        One shared transaction record
        <span className={`h-px flex-1 ${light ? 'bg-[#0A3028]/10' : 'bg-white/12'}`} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
        {transactionStages.map((stage) => (
          <div key={stage.id} className={`rounded-[12px] px-3 py-3 text-center text-[11px] font-black uppercase tracking-[0.12em] ${light ? 'bg-[#F4F7F3] text-[#50635C]' : 'bg-black/18 text-white/64'}`}>
            {stage.label}
          </div>
        ))}
      </div>
    </div>
  )
}
