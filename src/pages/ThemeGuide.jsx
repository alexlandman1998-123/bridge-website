import CTAButton from '../components/CTAButton'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import GlassPanel from '../components/ui/GlassPanel'
import { theme } from '../theme/tokens'

export default function ThemeGuide() {
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-slate-900">
      <Container className="py-16 space-y-16">
        <div className="space-y-4">
          <p className={theme.typography.eyebrow}>Theme guide</p>
          <h1 className="text-[56px] font-semibold leading-[0.92] tracking-[-0.06em]">
            Bridge design system
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            This page is your central visual reference. Adjust the theme files,
            then use this page to check whether the look and feel still feels
            premium, calm, and consistent.
          </p>
        </div>

        <section className="space-y-6">
          <SectionHeading
            title="Typography"
            description="Montserrat with strong hierarchy, tight tracking on headings, calmer body copy."
          />

          <div className="space-y-4">
            <h1 className={theme.typography.h1}>Hero heading</h1>
            <h2 className={theme.typography.h2}>Section heading</h2>
            <p className={theme.typography.body}>
              Standard body text for most sections.
            </p>
            <p className={theme.typography.bodyStrong}>
              Slightly stronger body text when needed.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            title="Buttons"
            description="Primary should feel strong and premium. Secondary should feel lighter and quieter."
          />

          <div className="flex flex-wrap gap-4">
            <CTAButton href="#0">Primary CTA</CTAButton>
            <CTAButton href="#0" variant="secondary">
              Secondary CTA
            </CTAButton>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            title="Cards and surfaces"
            description="White, sand, glass, and dark panel styles."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <p className="text-sm text-slate-500">Standard card</p>
              <p className="mt-3 text-lg font-semibold">White card surface</p>
            </Card>

            <Card glass>
              <p className="text-sm text-slate-500">Glass card</p>
              <p className="mt-3 text-lg font-semibold">Blurred premium panel</p>
            </Card>

            <div className="rounded-[24px] border border-slate-200 bg-[#F5F2EC] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <p className="text-sm text-slate-500">Warm card</p>
              <p className="mt-3 text-lg font-semibold">Sand / warm surface</p>
            </div>

            <Card dark>
              <p className="text-sm text-white/60">Dark card</p>
              <p className="mt-3 text-lg font-semibold">Dark product surface</p>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            title="Glass effect"
            description="Use this sparingly for premium emphasis, not everywhere."
          />

          <GlassPanel className="p-8">
            <p className="text-sm text-slate-500">Glass panel</p>
            <p className="mt-3 text-2xl font-semibold">Premium frosted treatment</p>
            <p className="mt-2 max-w-xl text-slate-600">
              Best used for overlays, floating callouts, and select high-value
              surfaces.
            </p>
          </GlassPanel>
        </section>

        <section className="space-y-6">
          <SectionHeading
            title="Dark product block"
            description="This is the signature Bridge product look."
          />

          <div className="rounded-[42px] border border-slate-200/80 bg-[#061126] p-6 shadow-[0_40px_120px_rgba(15,23,42,0.20)]">
            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#09162E_0%,#071021_100%)] p-8 text-white">
              <p className="text-[10px] uppercase tracking-[0.34em] text-slate-300">
                Product panel
              </p>
              <h3 className="mt-4 text-[32px] font-semibold tracking-[-0.035em]">
                Premium dashboard treatment
              </h3>
              <p className="mt-3 max-w-2xl text-slate-300">
                This is the visual tone the website should keep returning to for
                product-heavy moments.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}