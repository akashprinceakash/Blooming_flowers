import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SIGNATURES } from '../data.js'
import { scrollToId } from './Nav.jsx'
import { Arrow, EASE, SectionHead } from './ui.jsx'

const THEMES = [
  { bg: 'bg-wine', text: 'text-ivory', sub: 'text-ivory/75', accent: 'text-gold-soft', line: 'border-ivory/35' },
  { bg: 'bg-blush', text: 'text-ink', sub: 'text-ink/70', accent: 'text-wine', line: 'border-ink/30' },
  { bg: 'bg-ink', text: 'text-ivory', sub: 'text-ivory/75', accent: 'text-gold-soft', line: 'border-ivory/35' },
  { bg: 'bg-sage', text: 'text-ivory', sub: 'text-ivory/80', accent: 'text-gold-soft', line: 'border-ivory/35' },
]

function Card({ s, i, total, progress }) {
  const t = THEMES[i % THEMES.length]
  const reduce = useReducedMotion()
  // each card shrinks slightly as the next one slides over it
  const scale = useTransform(progress, [i / total, 1], [1, reduce ? 1 : 1 - (total - 1 - i) * 0.04])
  return (
    <div className="sticky" style={{ top: `${92 + i * 16}px` }}>
    <motion.article
      style={{ scale }}
      className={`${t.bg} ${t.text} grid origin-top overflow-hidden rounded-xl shadow-[0_-14px_40px_-20px_rgba(42,14,20,0.45)] md:grid-cols-[30%_70%]`}
    >
      {/* text — 30% */}
      <div className="order-2 flex flex-col justify-center p-6 sm:p-8 md:order-1 lg:p-10">
        <span className={`eyebrow !text-[0.62rem] ${t.accent}`}>Best seller</span>
        <h3 className="mt-3 font-display text-[clamp(2rem,3.2vw,2.9rem)] leading-none font-light">{s.title}</h3>
        <p className={`mt-3 leading-relaxed font-light ${t.sub}`}>{s.note}. Scaled to your guest count and venue.</p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('#contact')
          }}
          className={`group mt-6 inline-flex items-center gap-3 self-start border-b pb-1 text-[0.72rem] tracking-[0.16em] uppercase ${t.line}`}
        >
          Enquire about {s.title.toLowerCase()}
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* image — 70%, shown whole (never cropped) */}
      <div className="relative order-1 aspect-[2/1] overflow-hidden bg-ink md:order-2">
        <img src={s.image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" />
        <img
          src={s.image}
          alt={`${s.title} setup by Blooming Flower Events`}
          loading="lazy"
          className="relative h-full w-full object-contain"
        />
      </div>
    </motion.article>
    </div>
  )
}

export default function Signatures() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="bg-ivory py-6 md:py-14 lg:py-16">
      <div className="container-x">
        <SectionHead
          label="Best sellers"
          title={<>Four setups families <em className="text-wine italic">keep asking for.</em></>}
          text="Each one a starting point we tailor to your colours, rituals and space."
        />
        {/* phone: 2x2 grid */}
        <ul className="mt-3 grid grid-cols-2 gap-2.5 md:hidden">
          {SIGNATURES.map((s) => (
            <li key={s.title}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('#contact')
                }}
                className="block overflow-hidden rounded-xl bg-cream shadow-[0_8px_20px_-14px_rgba(42,14,20,0.45)]"
              >
                <img src={s.image} alt={`${s.title} setup`} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <span className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-[1.05rem] font-semibold text-ink">{s.title}</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-ivory">
                    <Arrow className="h-3.5 w-3.5" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div ref={ref} className="relative mt-8 hidden flex-col gap-[8vh] md:flex">
          {SIGNATURES.map((s, i) => (
            <Card key={s.title} s={s} i={i} total={SIGNATURES.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
