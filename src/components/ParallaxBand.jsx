import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MaskText } from './ui.jsx'

/** Full-bleed parallax banner with a darkened, vignetted background. */
export default function ParallaxBand() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-14%', '14%'])
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50])

  return (
    <section ref={ref} aria-label="Our promise" className="relative h-[70svh] min-h-[460px] overflow-hidden bg-ink text-ivory">
      <motion.div style={{ y: bgY }} className="absolute inset-[-16%_0]">
        <img src="/images/banner-lantern-garden.webp" alt="" loading="lazy" className="h-full w-full object-cover" />
      </motion.div>
      {/* a little darker overall */}
      <div className="absolute inset-0 bg-ink/45" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_50%,rgba(42,14,20,0.15)_0%,rgba(42,14,20,0.55)_65%,rgba(20,6,10,0.92)_100%)]" />

      <motion.div style={{ y: textY }} className="container-x relative flex h-full flex-col items-center justify-center text-center">
        <p className="eyebrow text-gold-soft">Our promise</p>
        <h2 className="mt-5 max-w-5xl font-display text-[clamp(2rem,4.2vw,3.6rem)] leading-[0.98] font-light [text-shadow:0_2px_24px_rgba(20,6,10,0.5)]">
          <MaskText
            lines={[
              <>Fresh flowers.</>,
              <>
                Honest <em className="text-gold-soft italic">quotes.</em>
              </>,
              <>Early mornings.</>,
            ]}
            stagger={0.14}
          />
        </h2>
        <p className="mt-6 max-w-md leading-relaxed font-light text-ivory/80">
          Three things we have never compromised on since our very first wedding in 2013.
        </p>
      </motion.div>
    </section>
  )
}
