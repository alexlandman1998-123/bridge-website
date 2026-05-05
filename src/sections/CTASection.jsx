import SectionContainer from '../components/SectionContainer'

export default function CTASection({
  id,
  eyebrow,
  title,
  description,
  primary,
  secondary,
}) {
  return (
    <SectionContainer id={id}>
      <div className="rounded-[36px] border border-[#201b16] bg-[#171412] p-8 text-white shadow-[0_32px_90px_rgba(23,20,18,0.16)] lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#cdb69b]">
              {eyebrow}
            </p>
            <h2 className="mt-5 max-w-[42rem] text-[2.6rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white lg:text-[3.5rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-[38rem] text-[1rem] leading-8 text-white/72">
              {description}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 lg:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={primary.href}
                className="bridge-button-primary justify-center"
                target={primary.external ? '_blank' : undefined}
                rel={primary.external ? 'noreferrer' : undefined}
              >
                {primary.label}
              </a>
              <a
                href={secondary.href}
                className="bridge-button-secondary justify-center border-white/12 bg-white/[0.06] text-white"
                target={secondary.external ? '_blank' : undefined}
                rel={secondary.external ? 'noreferrer' : undefined}
              >
                {secondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
