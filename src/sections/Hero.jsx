import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductMockup from '../components/ProductMockup'
import SectionContainer from '../components/SectionContainer'

export default function Hero() {
  return (
    <section id="top" className="pt-1 lg:pt-2">
      <SectionContainer className="pb-12 pt-3 lg:pb-16 lg:pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="max-w-[560px]">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#8b7760]"
            >
              Shared property transaction workspace
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 text-[3.7rem] font-semibold leading-[0.9] tracking-[-0.08em] text-[#171412] sm:text-[4.9rem] lg:text-[5.6rem]"
            >
              Property transactions. Finally connected.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-6 max-w-[520px] text-[1.03rem] leading-8 text-[#675d52] lg:text-[1.08rem]"
            >
              Bridge 9 brings developers, agents, conveyancers, bond originators, and clients into one shared transaction workspace — so everyone can track progress, manage documents, and stay aligned from offer to registration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a href="/contact" className="bridge-button-primary">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#platform" className="bridge-button-secondary">
                View Platform
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              {[
                ['Progress stays visible', 'Workflow and ownership stay attached to the transaction.'],
                ['Clients stay informed', 'Clear steps without repeated follow-up loops.'],
                ['Reporting stays live', 'Leadership sees movement without manual rebuilds.'],
              ].map(([title, copy]) => (
                <div
                  key={title}
                  className="rounded-[20px] border border-[#e4d9cb] bg-white/78 p-3.5 shadow-[0_12px_30px_rgba(23,20,18,0.04)] backdrop-blur-md"
                >
                  <p className="text-[0.82rem] font-semibold text-[#171412]">{title}</p>
                  <p className="mt-1.5 text-[0.78rem] leading-5 text-[#72675b]">{copy}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <ProductMockup />
        </div>
      </SectionContainer>
    </section>
  )
}
