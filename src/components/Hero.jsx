import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToId } from './Nav.jsx'
import { Arrow, EASE } from './ui.jsx'

// Banner images from public/images/newimages (converted to WebP).
const SLIDES = [
  { src: '/images/banner-golden-haldi.webp', caption: 'Golden garden haldi', pos: '60% 50%' },
  { src: '/images/banner-golden-mandap.webp', caption: 'Jasmine & brass mandap', pos: '65% 50%' },
  { src: '/images/banner-lantern-garden.webp', caption: 'Lantern-lit garden', pos: '55% 50%' },
]
const DURATION = 6000

export default function Hero({ ready }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%'])

  const go = useCallback((i) => setIndex((i + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (reduce || paused || !ready) return
    const t = setTimeout(() => go(index + 1), DURATION)
    return () => clearTimeout(t)
  }, [index, paused, ready, reduce, go])

  const jump = (href) => (e) => {
    e.preventDefault()
    scrollToId(href)
  }

  return (
    <section
      id="top"
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Featured weddings"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-ivory"
    >
      {/* slides — no blur, no zoom; only a gentle scroll parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={SLIDES[index].src}
            alt={SLIDES[index].caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ objectPosition: SLIDES[index].pos }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>
      {/* light shading only where the text sits */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/55 to-transparent" />
      <div className="absolute inset-0 bg-ink/15" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink/90 via-ink/50 to-transparent" />

      {/* text — bottom aligned */}
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-24 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="grid items-end gap-6 lg:grid-cols-12"
        >
          <h1 className="font-display text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[0.98] font-light lg:col-span-7">
            Let your
            <br />
            wedding <em className="text-gold-soft italic">bloom</em>
            <br />
            around you
          </h1>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="max-w-sm text-[0.95rem] leading-relaxed font-light text-ivory/85">
              Wedding décor &amp; floral design across Bengaluru, South India and Goa — since 2013.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={jump('#contact')}
                className="group inline-flex items-center gap-3 rounded-full bg-gold-soft px-6 py-3 text-[0.72rem] font-medium tracking-[0.16em] text-ink uppercase transition-colors duration-300 hover:bg-ivory"
              >
                Book a call
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                onClick={jump('#portfolio')}
                className="inline-flex items-center rounded-full border border-ivory/50 px-6 py-3 text-[0.72rem] tracking-[0.16em] text-ivory uppercase transition-colors duration-300 hover:bg-ivory hover:text-ink"
              >
                See the work
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-x flex items-center justify-between gap-4 pb-5">
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.caption}
                onClick={() => go(i)}
                aria-label={`Show slide: ${s.caption}`}
                aria-current={i === index}
                className="relative h-9 w-8 cursor-pointer sm:w-14"
              >
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden bg-ivory/30">
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-gold-soft"
                      initial={{ width: reduce || paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: reduce || paused ? 0 : DURATION / 1000, ease: 'linear' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => go(index - 1)} aria-label="Previous slide" className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-ivory/40 transition-colors hover:bg-ivory hover:text-ink">
              <Arrow className="h-4 w-4 rotate-180" />
            </button>
            <button onClick={() => go(index + 1)} aria-label="Next slide" className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-ivory/40 transition-colors hover:bg-ivory hover:text-ink">
              <Arrow className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
