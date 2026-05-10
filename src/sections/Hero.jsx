import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, ListChecks, MessageSquareMore, Workflow } from 'lucide-react'
import ProductMockup from '../components/ProductMockup'
import SectionContainer from '../components/SectionContainer'

export default function Hero() {
  return (
    <section id="top" className="pt-4 lg:pt-6">
      <SectionContainer className="pb-12 pt-4 lg:pb-16 lg:pt-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="max-w-[560px]">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-[3.35rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#171412] sm:text-[4.35rem] lg:text-[4.95rem]"
            >
              Property transactions. Finally connected.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 max-w-[520px] text-[1.03rem] leading-8 text-[#675d52]"
            >
              Bridge 9 connects developers, agents, conveyancers, bond originators, and clients in one shared workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <a href="/contact" className="bridge-button-primary">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#platform" className="bridge-button-secondary">
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
                className="rounded-[22px] border border-[#e4d9cb] bg-white/82 p-4 shadow-[0_12px_30px_rgba(23,20,18,0.04)] backdrop-blur-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-[#eadfce] bg-[#faf6ef] text-[#6d5c4a]">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-[0.96rem] font-semibold tracking-[-0.02em] text-[#171412]">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[0.86rem] leading-6 text-[#72675b]">{item.copy}</p>
              </div>
            )
          })}
        </motion.div>
      </SectionContainer>
    </section>
  )
}
