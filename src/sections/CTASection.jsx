import { FadeUp } from '../components/motion/Reveal'

export default function CTASection({
  id,
  eyebrow,
  title,
  description,
  primary,
  secondary,
}) {
  return (
    <section
      id={id}
      className="relative flex min-h-[88svh] items-center overflow-hidden bg-[#080808] py-[88px] text-white md:py-[112px] xl:py-[140px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(234,220,199,0.18),transparent_34%),linear-gradient(180deg,#111111_0%,#080808_58%,#080808_100%)]" />
      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10 xl:px-16">
        <FadeUp className="mx-auto max-w-[980px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.38em] text-[#cdb69b]">
            {eyebrow}
          </p>
          <h2 className="mt-7 text-[3rem] font-extrabold leading-[0.92] tracking-[-0.055em] text-white md:text-[5.25rem] xl:text-[6.8rem]">
            {title}
          </h2>
          <p className="mx-auto mt-7 max-w-[700px] text-[1.125rem] font-medium leading-8 text-white/68 xl:text-[1.3rem] xl:leading-9">
            {description}
          </p>

          <div className="mx-auto mt-10 max-w-[520px] rounded-[34px] border border-white/10 bg-white/[0.055] p-4 shadow-[0_34px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={primary.href}
                className="bridge-button-primary bridge-button-light min-h-[58px] justify-center text-[1.05rem]"
                target={primary.external ? '_blank' : undefined}
                rel={primary.external ? 'noreferrer' : undefined}
              >
                {primary.label}
              </a>
              <a
                href={secondary.href}
                className="bridge-button-secondary min-h-[58px] justify-center border-white/12 bg-white/[0.06] text-white"
                target={secondary.external ? '_blank' : undefined}
                rel={secondary.external ? 'noreferrer' : undefined}
              >
                {secondary.label}
              </a>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-[780px] gap-3 text-left sm:grid-cols-3">
            {['Agents', 'Attorneys', 'Finance Teams'].map((item) => (
              <div key={item} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/44">Moving Toward</p>
                <p className="mt-2 text-sm font-bold text-white">{item}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
