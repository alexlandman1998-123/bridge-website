import { ArrowRight } from 'lucide-react'

export default function RelatedToolCard({ description, href, icon: Icon, title, cta }) {
  return (
    <a
      href={href}
      className="group rounded-[18px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_54px_rgba(16,24,40,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#0D4F45]/28 hover:shadow-[0_24px_76px_rgba(16,24,40,0.08)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#EAF4EF] text-[#0D4F45]">
        {Icon ? <Icon className="h-5 w-5" /> : null}
      </div>
      <h3 className="mt-5 text-xl font-extrabold leading-tight tracking-[-0.035em] text-[#101828]">{title}</h3>
      <p className="mt-3 text-sm font-medium leading-6 text-[#667085]">{description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0D4F45]">
        {cta}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </a>
  )
}
