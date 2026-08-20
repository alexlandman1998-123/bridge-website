import { CheckCircle2 } from 'lucide-react'

export default function RoleWorkflow({ page }) {
  const { workflow } = page

  return (
    <section id="workflow" className="bg-[#FAF8F3] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid w-full max-w-[1400px] gap-9 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0E6A55]">Workflow</p>
          <h2 className="mt-4 text-[2.35rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#071E1A] md:text-[3.7rem]">
            {workflow.title}
          </h2>
          <p className="mt-5 text-base font-medium leading-8 text-[#5B6B64]">{workflow.intro}</p>
        </div>

        <div className="rounded-[22px] border border-[#0A3028]/8 bg-white p-5 shadow-[0_24px_80px_rgba(7,30,26,0.06)] md:p-7">
          <div className="grid gap-3 md:grid-cols-3">
            {workflow.steps.map((step, index) => {
              const highlighted = workflow.highlightedSteps.includes(step)
              return (
                <div key={step} className={`relative rounded-[16px] border p-5 ${highlighted ? 'border-[#0E6A55]/24 bg-[#EAF7F0]' : 'border-[#0A3028]/8 bg-[#F8FAF7]'}`}>
                  {index < workflow.steps.length - 1 ? <span className="absolute right-[-14px] top-1/2 hidden h-px w-7 bg-[#0A3028]/12 md:block" /> : null}
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold ${highlighted ? 'bg-[#064537] text-white' : 'bg-white text-[#5B6B64]'}`}>
                    {index + 1}
                  </span>
                  <p className="mt-5 text-sm font-black uppercase tracking-[0.12em] text-[#071E1A]">{step}</p>
                  {highlighted ? (
                    <p className="mt-3 flex items-center gap-2 text-xs font-extrabold text-[#0E6A55]">
                      <CheckCircle2 className="h-4 w-4" />
                      Visible in Arch9
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
