import { motion } from 'framer-motion'
import { SERVICES } from '../data.js'
import { EASE, ParallaxImg, SectionHead } from './ui.jsx'

// line icons for the compact phone tiles (lotus, bulb, calendar)
const ICONS = [
  <path key="a" d="M12 20c-4 0-7-2.5-7-6 2.5 0 4.5 1 5.5 2.5M12 20c4 0 7-2.5 7-6-2.5 0-4.5 1-5.5 2.5M12 20c-2-2-3-4.5-3-7 0-2.5 1.2-5 3-7 1.8 2 3 4.5 3 7 0 2.5-1 5-3 7z" />,
  <path key="b" d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3zM12 1v1M4 9H3M21 9h-1M5.6 3.6l.7.7M18.4 3.6l-.7.7" />,
  <path key="c" d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M10 14l1.5 1.5L15 13" />,
]

export default function Services() {
  return (
    <section id="services" className="bg-ivory py-6 md:py-14 lg:py-16">
      <div className="container-x">
        <SectionHead
          label="Services"
          title={<>Three things, <em className="text-wine italic">done properly.</em></>}
          text="From a single haldi morning to a three-day destination wedding — designed, built and lit by our own team."
        />

        {/* phone: icon tiles */}
        <ul className="mt-3 grid grid-cols-3 gap-2 md:hidden">
          {SERVICES.map((s, i) => (
            <li key={s.no} className="flex flex-col items-center gap-2 rounded-xl border border-wine/10 bg-white/60 px-2 py-4 text-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-wine" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[i]}
              </svg>
              <span className="text-[0.95rem] leading-tight font-semibold text-ink">{s.title}</span>
            </li>
          ))}
        </ul>

        {/* tablet / desktop: image cards */}
        <div className="mt-8 hidden gap-5 md:grid md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.no}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-md border border-wine/10 bg-cream/60 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(42,14,20,0.45)]"
            >
              <ParallaxImg src={s.image} alt={s.title} className="aspect-[4/3] w-full" strength={8} />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-display text-[1.65rem] leading-tight text-ink">{s.title}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{s.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-wine/20 px-3 py-1 text-[0.68rem] tracking-[0.1em] text-wine uppercase">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
