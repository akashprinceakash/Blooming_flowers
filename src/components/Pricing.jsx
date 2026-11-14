import { motion } from 'framer-motion'
import { PRICING } from '../data.js'
import { scrollToId } from './Nav.jsx'
import { Arrow, EASE, SectionHead } from './ui.jsx'

export default function Pricing() {
  return (
    <section className="relative bg-cream py-12 sm:py-14 lg:py-16" aria-labelledby="price-title">
      <div className="container-x">
        <SectionHead
          label="Investment"
          title={<>Honest, <em className="text-wine italic">itemised pricing.</em></>}
          text="Every quote is broken down by function. Ranges are a guide — your final quote depends on venue, scale and flowers."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <motion.article
              key={p.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col rounded-lg p-6 transition-shadow duration-500 ${
                p.featured
                  ? 'grain bg-ink text-ivory shadow-[0_30px_60px_-25px_rgba(42,14,20,0.6)]'
                  : 'border border-wine/15 bg-ivory hover:shadow-[0_24px_50px_-28px_rgba(42,14,20,0.35)]'
              }`}
            >
              {p.featured && (
                <span className="absolute top-5 right-5 rounded-full bg-gold-soft px-3 py-1 text-[0.65rem] tracking-[0.16em] text-ink uppercase">
                  Most booked
                </span>
              )}
              <p className={`eyebrow ${p.featured ? 'text-gold-soft' : 'text-gold'}`}>{p.label}</p>
              <p className="mt-3 font-display text-[clamp(1.6rem,2vw,1.9rem)] leading-none">{p.range}</p>
              <p className={`mt-2 text-[0.92rem] leading-relaxed ${p.featured ? 'text-ivory/70' : 'text-muted'}`}>{p.for}</p>
              <ul className={`mt-4 space-y-2 border-t pt-4 ${p.featured ? 'border-ivory/15' : 'border-wine/10'}`}>
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-[0.9rem]">
                    <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 ${p.featured ? 'text-gold-soft' : 'text-gold'}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {pt}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('#contact')
                }}
                className={`group mt-5 inline-flex items-center justify-between rounded-full px-5 py-3 text-[0.75rem] tracking-[0.16em] uppercase transition-colors duration-300 ${
                  p.featured ? 'bg-gold-soft text-ink hover:bg-ivory' : 'border border-wine/25 text-wine hover:bg-wine hover:text-ivory'
                }`}
              >
                Get a quote
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
