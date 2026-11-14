import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IMAGES } from '../data.js'
import { EASE, ParallaxImg, Reveal, SectionLabel } from './ui.jsx'

const STATS = [
  ['Since 2013', 'Designing weddings'],
  ['4.8 ★', '182 Google reviews'],
  ['Goa & South', 'We travel'],
]
const COPY =
  'Mandap and stage décor, fresh flowers, entrance arches, haldi and mehendi setups, sangeet nights, reception stages, seating and lighting — and full event planning when you want it. We work across Bangalore, South India and Goa.'

function Stats({ className = '' }) {
  return (
    <dl className={`grid grid-cols-3 gap-4 border-t border-wine/15 pt-5 ${className}`}>
      {STATS.map(([v, l]) => (
        <div key={l}>
          <dd className="font-display text-xl text-wine sm:text-2xl">{v}</dd>
          <dt className="mt-1 text-[0.72rem] text-muted">{l}</dt>
        </div>
      ))}
    </dl>
  )
}

export default function About() {
  const [open, setOpen] = useState(false)

  return (
    <section id="about" className="relative z-10 -mt-6 rounded-t-3xl bg-ivory pt-5 md:mt-0 md:rounded-none md:pt-14 lg:pt-16">
      {/* phone: compact card */}
      <div className="px-4 md:hidden">
        <div className="overflow-hidden rounded-2xl bg-cream shadow-[0_10px_30px_-20px_rgba(42,14,20,0.4)]">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="story-more"
            className="flex w-full cursor-pointer items-stretch text-left"
          >
            <img src={IMAGES.garlandCouple} alt="Couple before a jasmine and rose garland curtain" className="h-28 w-[42%] shrink-0 object-cover" />
            <span className="flex flex-1 items-center justify-between gap-3 p-4">
              <span>
                <span className="block font-display text-[1.6rem] leading-tight font-semibold text-ink">Our story</span>
                <span className="mt-0.5 block text-[0.98rem] leading-snug text-muted">Flowers are our first language.</span>
              </span>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory text-ink shadow-sm transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="story-more"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-5">
                  <p className="pt-1 text-[0.98rem] leading-relaxed text-muted">{COPY}</p>
                  <Stats className="mt-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* tablet / desktop: split banner */}
      <div className="hidden md:grid md:grid-cols-2 lg:h-[64svh] lg:max-h-[540px] lg:min-h-[440px]">
        <ParallaxImg
          src={IMAGES.garlandCouple}
          alt="Couple standing before a jasmine and rose garland curtain"
          className="aspect-[4/3] w-full lg:aspect-auto lg:h-full"
          strength={8}
        />
        <div className="flex items-center px-8 py-10 lg:px-14 lg:py-0 xl:px-20">
          <Reveal className="max-w-xl">
            <SectionLabel>Our story</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.05] font-light text-ink">
              Flowers are our <em className="text-wine italic">first language.</em>
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{COPY}</p>
            <Stats className="mt-6" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
