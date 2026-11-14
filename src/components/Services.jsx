import { motion } from 'framer-motion'
import { SERVICES } from '../data.js'
import { EASE, ParallaxImg, SectionHead } from './ui.jsx'

export default function Services() {
  return (
    <section id="services" className="bg-ivory py-12 sm:py-14 lg:py-16">
      <div className="container-x">
        <SectionHead
          index="03"
          label="Services"
          title={<>Three things, <em className="text-wine italic">done properly.</em></>}
          text="From a single haldi morning to a three-day destination wedding — designed, built and lit by our own team."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-8">
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
