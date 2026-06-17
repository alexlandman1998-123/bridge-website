import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, ListChecks, MessageSquareMore, Workflow } from 'lucide-react'
import ProductMockup from '../components/ProductMockup'
import SectionContainer from '../components/SectionContainer'

export default function Hero() {
  return (
    <section
      id="top"
      className="-mt-[106px] pt-[112px] lg:-mt-[118px] lg:pt-[126px]"
      style={{
        background:
          'radial-gradient(circle at 72% 38%, rgba(186, 157, 121, 0.14), transparent 36%), linear-gradient(180deg, #121212 0%, #161514 72%, #151412 100%)',
      }}
    >
      <SectionContainer className="pb-12 pt-3 lg:pb-16 lg:pt-5">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="max-w-[560px]">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-[3.35rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#f5f1eb] sm:text-[4.35rem] lg:text-[4.95rem]"
            >
              Property transactions. Finally connected.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 max-w-[520px] text-[1.03rem] leading-8 text-[#c9bdb0]"
            >
              Arch9 connects developers, agents, conveyancers, bond originators, and clients in one shared view.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#eadcc7] bg-[#f7efe0] px-6 py-3 text-[0.95rem] font-semibold text-[#171412] shadow-[0_14px_32px_rgba(20,17,14,0.26)] transition hover:translate-y-[-1px] hover:bg-[#f9f3e7]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#platform"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/24 bg-white/[0.02] px-6 py-3 text-[0.95rem] font-semibold text-[#f2ece3] transition hover:bg-white/[0.06]"
              >
                View Platform
              </a>
            </motion.div>
          </div>

          <ProductMockup />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              title: 'Workflow & ownership',
              copy: 'Stay attached to every transaction.',
              icon: Workflow,
            },
            {
              title: 'Clients stay informed',
              copy: 'Automatic updates, fewer follow-ups.',
              icon: MessageSquareMore,
            },
            {
              title: 'Clear steps',
              copy: 'Structured process, no loops.',
              icon: ListChecks,
            },
            {
              title: 'Reporting stays live',
              copy: 'Leadership sees movement.',
              icon: BarChart3,
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-[22px] border border-white/12 bg-white/[0.06] p-4 shadow-[0_10px_28px_rgba(12,11,10,0.26)] backdrop-blur-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-white/16 bg-white/[0.08] text-[#dec6a6]">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-[0.96rem] font-semibold tracking-[-0.02em] text-[#f4ede4]">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[0.86rem] leading-6 text-[#bcae9f]">{item.copy}</p>
              </div>
            )
          })}
        </motion.div>
      </SectionContainer>
    </section>
  )
}
