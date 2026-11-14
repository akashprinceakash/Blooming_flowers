import { motion } from 'framer-motion'
import { WHY } from '../data.js'
import { EASE, SectionHead } from './ui.jsx'

const ICONS = [
  // flower
  <path key="a" d="M12 12c0-3 1.5-6 0-8-1.5 2 0 5 0 8zm0 0c3 0 6 1.5 8 0-2-1.5-5 0-8 0zm0 0c0 3-1.5 6 0 8 1.5-2 0-5 0-8zm0 0c-3 0-6-1.5-8 0 2 1.5 5 0 8 0z" />,
  // receipt
  <path key="b" d="M6 3h12v18l-3-2-3 2-3-2-3 2V3zm3 5h6M9 12h6M9 16h4" />,
  // sunrise
  <path key="c" d="M3 18h18M6 18a6 6 0 0 1 12 0M12 4v4M5 9l2 2M19 9l-2 2" />,
  // ruler
  <path key="d" d="M3 16 16 3l5 5L8 21l-5-5zm4-1 2 2m1-5 2 2m1-5 2 2" />,
  // bulb
  <path key="e" d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />,
  // pin
  <path key="f" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
]

export default function Why() {
  return (
    <section className="bg-cream py-12 sm:py-14 lg:py-16" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHead
          index="06"
          label="Why families choose us"
          title={<>Good design is half. <em className="text-wine italic">Showing up is the rest.</em></>}
          text="The quiet, practical things that make the day run on time and look the way you imagined."
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-wine/10 bg-wine/10 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.article
              key={w.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
              className="group bg-ivory p-7 transition-colors duration-500 hover:bg-white sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-wine/[0.07] text-wine transition-colors duration-500 group-hover:bg-wine group-hover:text-ivory">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {ICONS[i]}
                  </svg>
                </span>
                              </div>
              <h3 className="mt-6 font-display text-[1.45rem] leading-tight text-ink">{w.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{w.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
