import { ArrowRight, LockKeyhole } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import aboutArchitectureImage from '../../assets/about-architecture.png'
import { roleGatewayOptions } from '../../config/rolePages'
import { motionEaseOut } from '../motion/timing'

function RoleCard({ role, index, shouldReduceMotion }) {
  const Icon = role.icon

  return (
    <motion.a
      href={role.href}
      className="group grid min-h-[74px] cursor-pointer grid-cols-[52px_1fr_auto] items-center gap-4 rounded-[18px] border border-[#D8CCBC] bg-[#FFFDF8]/78 px-4 py-3 text-left shadow-[0_10px_24px_rgba(7,30,26,0.035)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#0B3B31]/24 hover:bg-[#FFFDF8]/92 hover:shadow-[0_18px_38px_rgba(7,30,26,0.075)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86E4C2] md:min-h-[320px] md:grid-cols-1 md:grid-rows-[auto_auto_auto_auto] md:justify-items-center md:px-7 md:py-8 md:text-center xl:min-h-[350px]"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.42, delay: index * 0.045, ease: motionEaseOut }}
    >
      <span className="flex h-13 w-13 items-center justify-center rounded-[16px] bg-[#F1ECE3] text-[#05362E] md:h-[68px] md:w-[68px] md:rounded-[18px]">
        <Icon className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.7} />
      </span>

      <div className="min-w-0 md:mt-7">
        <h3 className="text-[1.05rem] font-normal leading-[1.12] tracking-normal text-[#06362E] md:text-[1.78rem] xl:text-[1.95rem]">
          {role.heading}
        </h3>
        <span className="mx-auto mt-5 hidden h-px w-10 bg-[#B9AE9E] md:block" />
        <p className="mt-1 hidden text-sm font-normal leading-5 text-[#27322F] sm:block md:mt-6 md:max-w-[230px] md:text-[0.98rem] md:leading-7">
          {role.description}
        </p>
      </div>

      <span className="text-[#06362E] transition duration-300 ease-out group-hover:translate-x-1 md:mt-3">
        <ArrowRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.8} />
      </span>
    </motion.a>
  )
}

export default function RoleSelector({ className = '', compact = false }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="roles" className={`relative isolate min-h-screen overflow-hidden bg-[#F8F3EA] text-[#06362E] ${className}`} aria-labelledby="role-selector-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={aboutArchitectureImage}
          alt=""
          className="absolute left-[-45%] bottom-0 hidden h-full w-[58%] object-cover object-left opacity-38 md:block xl:left-[-30%] xl:w-[42%]"
        />
        <img
          src={aboutArchitectureImage}
          alt=""
          className="absolute right-[-56%] bottom-0 hidden h-full w-[68%] scale-x-[-1] object-cover object-right opacity-24 md:block xl:right-[-42%] xl:w-[52%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,243,234,0.72),rgba(248,243,234,0.98)_24%,rgba(248,243,234,0.99)_78%,rgba(248,243,234,0.84))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1536px] flex-col px-6 py-6 md:px-10 md:py-7 lg:px-14">
        <header className="flex items-start justify-center gap-5 sm:justify-between">
          <a href="/" aria-label="Arch9 home" className="inline-flex flex-col items-center sm:items-start">
            <span className="text-[3rem] font-normal leading-none tracking-normal text-[#06362E] md:text-[4.1rem]">arch9</span>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#06362E]/78">Property is connecting</span>
          </a>

          <div className="hidden items-center gap-5 sm:flex">
            <a
              href="/book-demo"
              className="inline-flex min-h-[58px] items-center rounded-[10px] border border-[#9F9486] bg-transparent px-8 text-[1.02rem] font-normal text-[#1F2724] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#06362E] hover:bg-[#FFFDF8]/36"
            >
              Book a Demo
            </a>
          </div>
        </header>

        <div className="flex flex-1 flex-col justify-center pb-5 pt-8 md:pt-8 lg:pt-6">
          <div className="mx-auto w-full max-w-[860px] text-center">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#0D5B4B] md:text-[0.95rem]">
              How do you work in property?
            </p>
            <h1 id="role-selector-title" className="mt-5 text-[3.1rem] font-normal leading-[0.95] tracking-normal text-[#06362E] md:text-[4.5rem] lg:text-[5.2rem]">
              Choose your world.
            </h1>
            <p className="mx-auto mt-4 max-w-[680px] text-[1.15rem] font-normal leading-8 text-[#202A27] md:text-[1.38rem] md:leading-9">
              We&apos;ll show you the Arch9 built for it.
            </p>
          </div>

          <div className={`mx-auto mt-8 grid w-full max-w-[1290px] gap-4 md:mt-9 md:grid-cols-2 md:gap-5 xl:grid-cols-4 ${compact ? 'xl:grid-cols-4' : ''}`}>
            {roleGatewayOptions.map((role, index) => (
              <RoleCard key={role.key} role={role} index={index} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>

          <p className="mx-auto mt-6 flex items-center justify-center gap-3 text-center text-[0.95rem] font-normal text-[#1F2724] md:text-[1.02rem]">
            <LockKeyhole className="h-4 w-4 text-[#06362E]" strokeWidth={1.7} />
            Secure. Compliant. Built for South African property.
          </p>
        </div>
      </div>
    </section>
  )
}
