import { motion, useReducedMotion } from 'framer-motion'
import { footerLegalLinks, footerLinkGroups, footerMetrics, footerSocialLinks } from '../config/footer'
import { motionEaseOut } from './motion/timing'

export default function Footer() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <footer className="bg-[#FBF8F1] text-[#171412]">
      <section className="border-t border-[#0A3028]/8 px-6 pb-20 pt-20 text-center md:px-8 md:pb-24 md:pt-24 lg:pb-[100px] lg:pt-[120px]">
        <div className="mx-auto max-w-[1400px]">
          <p className="mx-auto max-w-[880px] text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[#071E1A] md:text-[2.25rem] lg:text-[3rem]">
            The operating system for property transactions.
          </p>
          <p className="mx-auto mt-6 max-w-[700px] text-base font-medium leading-8 text-[#5F665F] md:text-lg">
            From first enquiry to registration. One connected experience for buyers, sellers, agents, attorneys, bond
            originators and developers.
          </p>

          <motion.div
            className="mx-auto mt-12 grid max-w-[1120px] grid-cols-2 overflow-hidden rounded-[30px] border border-[#0A3028]/10 bg-white/72 text-left shadow-[0_24px_80px_rgba(5,8,7,0.07)] backdrop-blur-xl lg:grid-cols-4"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: motionEaseOut }}
          >
            {footerMetrics.map((metric) => (
              <div key={metric.label} className="min-h-[150px] border-[#0A3028]/10 p-5 md:p-6 lg:border-r lg:[&:last-child]:border-r-0">
                <p className="text-[2.25rem] font-semibold leading-none tracking-[-0.05em] text-[#071E1A]">{metric.value}</p>
                <p className="mt-5 text-sm font-extrabold text-[#071E1A]">{metric.label}</p>
                <p className="mt-2 text-sm font-medium leading-6 text-[#6A716A]">{metric.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-black/8 bg-[#F7F4EE] px-6 py-[60px] md:px-8 md:py-20 lg:pb-[100px] lg:pt-[120px]">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_0.72fr_0.9fr_0.72fr_0.84fr] lg:gap-16 xl:gap-20">
          <div className="md:col-span-2 lg:col-span-1">
            <a href="/" className="inline-flex min-h-11 items-center text-[1rem] font-extrabold tracking-[0.24em] text-[#071E1A]">
              ARCH9
            </a>
            <p className="mt-8 text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-[#071E1A]">
              One property journey.
            </p>
            <p className="mt-3 text-base font-semibold text-[#5F665F]">From first enquiry to registration.</p>
            <p className="mt-6 max-w-[420px] text-base font-medium leading-8 text-[#626A63]">
              Arch9 connects buyers, sellers, agents, attorneys, bond originators and developers through a single shared
              transaction workspace.
            </p>
            <a href="mailto:hello@arch9.co.za" className="mt-7 inline-flex min-h-11 items-center text-sm font-extrabold text-[#0E6A55] transition duration-200 ease-out hover:text-[#071E1A]">
              hello@arch9.co.za
            </a>
            <p className="mt-7 text-sm font-medium text-[#7B807A]">© 2026 Arch9. All rights reserved.</p>
          </div>

          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} footer links`}>
              <h2 className="text-sm font-extrabold text-[#071E1A]">{group.title}</h2>
              <ul className="mt-5 grid gap-1">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.href}-${link.label}`}>
                    <a
                      href={link.href}
                      className="flex min-h-11 items-center text-sm font-semibold leading-6 text-[#5F665F] transition duration-200 ease-out hover:text-[#0E6A55]"
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

      <section className="border-t border-black/8 bg-[#F7F4EE] px-6 md:px-8">
        <div className="mx-auto flex min-h-20 w-full max-w-[1400px] flex-col items-center justify-center gap-5 py-6 text-sm font-semibold text-[#697068] md:flex-row md:justify-between md:py-0">
          <p>Built in South Africa 🇿🇦</p>

          <nav aria-label="Social links">
            <ul className="flex flex-wrap items-center justify-center gap-5">
              {footerSocialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="flex min-h-11 items-center transition duration-200 ease-out hover:text-[#0E6A55]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <ul className="flex flex-wrap items-center justify-center gap-5">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="flex min-h-11 items-center transition duration-200 ease-out hover:text-[#0E6A55]">
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
