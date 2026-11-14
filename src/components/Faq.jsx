import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CONTACT, FAQS } from '../data.js'
import FaqSection from './ui/habit-faq-scroller.jsx'
import { Arrow, EASE, MobileHead, SectionHead } from './ui.jsx'

const q = (i) => ({ id: `q${i}`, question: FAQS[i].q, answer: FAQS[i].a })

// Each row holds enough cards to be wider than the screen so the loop never shows a gap.
const faqData = {
  rows: [
    { id: 'row1', speed: '70s', direction: 'left', faqItems: [q(0), q(1), q(2), q(3)] },
    { id: 'row2', speed: '60s', direction: 'right', faqItems: [q(4), q(5), q(6), q(2)] },
  ],
}

/** Phone: simple accordion, first four questions + "View all". */
function MobileFaq() {
  const [open, setOpen] = useState(-1)
  const [all, setAll] = useState(false)
  const list = all ? FAQS : FAQS.slice(0, 4)

  return (
    <div className="px-4 md:hidden">
      <MobileHead label="FAQs" title="Before you call us." />
      <ul className="mt-3 space-y-2">
        {list.map((f, i) => {
          const isOpen = open === i
          return (
            <li key={f.q} className="overflow-hidden rounded-lg border border-wine/10 bg-white/70">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`mfaq-${i}`}
                className="flex w-full cursor-pointer items-center justify-between gap-3 px-3.5 py-3 text-left"
              >
                <span className="text-[1rem] font-semibold text-ink">{f.q}</span>
                <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 text-ink transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`mfaq-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-3.5 pb-3.5 text-[0.98rem] leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
      <button
        onClick={() => setAll((a) => !a)}
        className="mt-3 inline-flex cursor-pointer items-center gap-1.5 py-2 text-[1rem] font-semibold text-wine underline underline-offset-4"
      >
        {all ? 'Show fewer' : 'View all FAQs'} <Arrow className={`h-4 w-4 ${all ? '-rotate-90' : ''}`} />
      </button>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="faqs" className="overflow-hidden bg-ivory py-6 md:py-14 lg:py-16">
      <MobileFaq />

      <div className="hidden md:block">
        <FaqSection
          data={faqData}
          header={
            <div className="container-x">
              <SectionHead
                mobile={false}
                label="FAQs"
                title={<>Before you <em className="text-wine italic">call us.</em></>}
                text="Hover or tap a card to pause. Can't find your question? Message us on WhatsApp — we usually reply the same day."
              />
            </div>
          }
        />
        <div className="container-x mt-10 flex justify-center">
          <a
            href={`https://wa.me/${CONTACT.phoneRaw}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-wine/30 px-7 py-3.5 text-[0.74rem] tracking-[0.16em] text-wine uppercase transition-colors duration-300 hover:bg-wine hover:text-ivory"
          >
            Ask us on WhatsApp
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
