import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { FadeUp, StaggerContainer, StaggerItem } from './motion/Reveal'
import { motionEaseOut } from './motion/timing'

function StoryItem({ item, index, active, onActive }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-35% 0px -45% 0px' })

  useEffect(() => {
    if (inView) {
      onActive(index)
    }
  }, [inView, index, onActive])

  return (
    <div
      ref={ref}
      className={`min-h-[72vh] py-12 transition-colors duration-300 ${
        active ? 'text-[#171412]' : 'text-[#8f8377]'
      }`}
    >
      <FadeUp>
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#8b7760]">
          {item.eyebrow}
        </p>
        <h2 className="mt-5 max-w-[560px] text-[2.5rem] font-extrabold leading-none text-[#171412] md:text-[3.4rem] xl:text-[4.5rem]">
          {item.headline}
        </h2>
        <p className="mt-6 max-w-[500px] text-[1.125rem] leading-8 text-[#6f6457] xl:text-[1.25rem] xl:leading-9">
          {item.description}
        </p>
      </FadeUp>
    </div>
  )
}

function Callouts({ callouts, isDark }) {
  return (
    <StaggerContainer
      className="mt-4 grid gap-3 sm:grid-cols-2 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block"
      stagger={0.09}
    >
      {callouts.map((callout, index) => (
        <StaggerItem
          key={callout}
          className={`rounded-full px-4 py-3 text-sm font-bold shadow-[0_16px_40px_rgba(18,16,14,0.12)] lg:absolute ${
            isDark
              ? 'border border-white/10 bg-[#fbf7f1] text-[#171412]'
              : 'border border-white/80 bg-white text-[#171412]'
          } ${
            index === 0
              ? 'lg:left-8 lg:top-10'
              : index === 1
                ? 'lg:right-8 lg:top-16'
                : index === 2
                  ? 'lg:bottom-12 lg:left-10'
                  : 'lg:bottom-10 lg:right-10'
          }`}
        >
          {callout}
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}

function ShowcaseFrame({ item }) {
  const isDark = item.tone === 'dark'
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative">
      <motion.div
        className={`arch-browser-frame ${isDark ? 'arch-browser-frame-dark' : ''}`}
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: shouldReduceMotion ? 0.5 : 0.7, ease: motionEaseOut }}
      >
        <div className="arch-browser-bar">
          <span className="arch-browser-dot" />
          <span className="arch-browser-dot" />
          <span className="arch-browser-dot" />
          <span className={`ml-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${isDark ? 'bg-white/10 text-white/52' : 'bg-[#f3eee7] text-[#887765]'}`}>
            Arch9
          </span>
        </div>
        <div className="p-2 md:p-4">{item.visual}</div>
      </motion.div>
      <Callouts callouts={item.callouts} isDark={isDark} />
    </div>
  )
}

export default function ProductShowcase({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const activeItem = items[activeIndex] || items[0]

  if (!items.length) return null

  return (
    <section id="product-story" className="bg-[#f8f6f2] py-[72px] md:py-24 xl:py-[120px]">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 xl:px-16">
        <div className="lg:hidden">
          {items.map((item) => (
            <section
              key={item.id}
              id={item.id}
              className={`py-12 ${item.tone === 'dark' ? '-mx-6 bg-[#171412] px-6 text-white' : 'text-[#171412]'}`}
            >
              <FadeUp>
                <p className={`text-[11px] font-bold uppercase tracking-[0.34em] ${item.tone === 'dark' ? 'text-[#cdb69b]' : 'text-[#8b7760]'}`}>
                  {item.eyebrow}
                </p>
                <h2 className={`mt-5 text-[2.25rem] font-extrabold leading-none ${item.tone === 'dark' ? 'text-white' : 'text-[#171412]'}`}>
                  {item.headline}
                </h2>
                <p className={`mt-6 text-[1.125rem] leading-8 ${item.tone === 'dark' ? 'text-white/70' : 'text-[#6f6457]'}`}>
                  {item.description}
                </p>
              </FadeUp>
              <div className="mt-10">
                <ShowcaseFrame item={item} />
              </div>
            </section>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 xl:gap-20">
          <div>
            {items.map((item, index) => (
              <StoryItem
                key={item.id}
                item={item}
                index={index}
                active={activeIndex === index}
                onActive={setActiveIndex}
              />
            ))}
          </div>

          <div className="relative">
            <div className="sticky top-28 min-h-[calc(100vh-8rem)] py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  id={activeItem.id}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: motionEaseOut }}
                >
                  <ShowcaseFrame item={activeItem} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
