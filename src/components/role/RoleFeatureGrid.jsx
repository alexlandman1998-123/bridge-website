export default function RoleFeatureGrid({ page }) {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">What gets easier</p>
            <h2 className="mt-4 text-[2.35rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#071E1A] md:text-[3.7rem]">
              Built for this part of the transaction.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {page.valueProps.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-[18px] border border-[#0A3028]/8 bg-[#FAFCF8] p-5">
                  <Icon className="h-6 w-6 text-[#0E6A55]" />
                  <h3 className="mt-5 text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#071E1A]">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-[#5B6B64]">{item.copy}</p>
                </article>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.features.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className="group rounded-[16px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_18px_54px_rgba(7,30,26,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(7,30,26,0.075)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#EAF7F0] text-[#064537]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#071E1A]">{feature.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#5B6B64]">{feature.copy}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
