import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { footerLegalLinks, footerLinkGroups, footerMetrics, footerSocialLinks } from '../config/footer'
import { motionEaseOut } from './motion/timing'

export default function Footer() {
  const shouldReduceMotion = useReducedMotion()

  const socialNav = (
    <nav aria-label="Social links">
      <ul className="flex flex-wrap items-center gap-5">
        {footerSocialLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="flex min-h-11 items-center transition duration-200 ease-out hover:text-[#0D4F45]">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <footer className="bg-[#111827] text-[#F8F6F2]">
      <section className="bg-[#F7F4EE] px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            className="grid overflow-hidden rounded-[26px] border border-black/[0.06] bg-white text-left shadow-[0_22px_70px_rgba(16,24,40,0.07)] sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: motionEaseOut }}
          >
            {footerMetrics.map((metric) => (
              <div key={metric.label} className="min-h-[148px] border-black/[0.06] p-6 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-r lg:p-8 lg:[&:nth-child(2n)]:border-r lg:[&:last-child]:border-r-0">
                <p className="text-[2.35rem] font-extrabold leading-none tracking-[-0.055em] text-[#101828] md:text-[2.75rem]">{metric.value}</p>
                <p className="mt-5 text-sm font-semibold text-[#475467]">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 md:grid-cols-2 lg:grid-cols-[1.65fr_0.78fr_1fr_0.8fr_0.92fr] lg:gap-20">
          <div className="md:col-span-2 lg:col-span-1">
            <a href="/" className="inline-flex min-h-11 items-center text-[1rem] font-extrabold tracking-[0.24em] text-[#F8F6F2] transition duration-200 ease-out hover:text-[#0D4F45]">
              ARCH9
            </a>
            <p className="mt-8 text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-[#F8F6F2]">
              One property journey.
            </p>
            <p className="mt-4 text-base font-semibold text-white/65">From first enquiry to registration.</p>
            <p className="mt-6 max-w-[450px] text-base font-medium leading-8 text-white/65">
              Arch9 connects buyers, sellers, agents, attorneys, bond originators and developers through one shared
              transaction workspace.
            </p>
            <a href="mailto:hello@arch9.co.za" className="mt-7 inline-flex min-h-11 items-center text-sm font-extrabold text-white/75 transition duration-200 ease-out hover:text-[#0D4F45]">
              hello@arch9.co.za
            </a>
            <a href="/book-demo" className="mt-3 flex min-h-11 w-fit items-center gap-2 text-sm font-extrabold text-[#F8F6F2] transition duration-200 ease-out hover:text-[#0D4F45]">
              Book A Demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-7 text-sm font-semibold text-white/65 lg:hidden">{socialNav}</div>
          </div>

          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} footer links`}>
              <h2 className="text-sm font-extrabold text-[#F8F6F2]">{group.title}</h2>
              <ul className="mt-6 grid gap-2">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.href}-${link.label}`}>
                    <a
                      href={link.href}
                      className="flex min-h-10 items-center text-sm font-semibold leading-6 text-white/65 transition duration-200 ease-out hover:text-[#0D4F45]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.08] px-6 md:px-8">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center gap-5 py-6 text-sm font-semibold text-white/65 md:flex-row md:justify-between">
          <p>Built in South Africa 🇿🇦</p>

          <div className="hidden lg:block">{socialNav}</div>

          <nav aria-label="Legal links">
            <ul className="flex flex-wrap items-center justify-center gap-5">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="flex min-h-11 items-center transition duration-200 ease-out hover:text-[#0D4F45]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </footer>
  )
}
