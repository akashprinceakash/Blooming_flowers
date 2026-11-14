import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { EASE, Ornament } from './ui.jsx'

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 50 : 2100)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  return (
    <motion.div
      className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-ivory"
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 1.1, ease: EASE }}
      aria-hidden="true"
    >
      <motion.span
        className="font-display text-5xl font-light text-ivory italic sm:text-6xl"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        Blooming Flower
      </motion.span>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
      >
        <Ornament className="mt-5 w-32 text-gold-soft/80" />
      </motion.div>
      <motion.span
        className="eyebrow mt-5 text-ivory/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Events · Since 2013
      </motion.span>
    </motion.div>
  )
}
