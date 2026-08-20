import { ArrowRight } from 'lucide-react'

export default function RoleCTA({ page }) {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 rounded-[22px] bg-[#071E1A] p-7 text-white shadow-[0_28px_90px_rgba(7,30,26,0.2)] md:p-10 lg:grid-cols-[0.7fr_0.3fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#86E4C2]">Next step</p>
          <h2 className="mt-4 text-[2.25rem] font-extrabold leading-[1] tracking-[-0.045em] md:text-[3.7rem]">
            {page.finalCta.headline}
          </h2>
          <p className="mt-5 max-w-[720px] text-base font-medium leading-8 text-white/70">{page.finalCta.copy}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={page.finalCta.primary.href} className="bridge-button-primary bridge-button-light justify-center">
            {page.finalCta.primary.label}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href={page.finalCta.secondary.href} className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/22 px-7 text-sm font-extrabold text-white transition hover:bg-white/10">
            {page.finalCta.secondary.label}
          </a>
        </div>
      </div>
    </section>
  )
}
