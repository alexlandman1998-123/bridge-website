import { motion, useReducedMotion } from 'framer-motion'
import { motionEaseOut } from './timing'

export function FadeUp({ children, delay = 0, className = '', ...props }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: motionEaseOut }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, delay = 0, className = '', ...props }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay, ease: motionEaseOut }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className = '', stagger = 0.1, ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', ...props }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: motionEaseOut },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
