import { CONTACT, FAQS } from '../data.js'
import FaqSection from './ui/habit-faq-scroller.jsx'
import { Arrow, SectionHead } from './ui.jsx'

const q = (i) => ({ id: `q${i}`, question: FAQS[i].q, answer: FAQS[i].a })

// Each row holds enough cards to be wider than the screen so the loop never shows a gap.
const faqData = {
  rows: [
    { id: 'row1', speed: '70s', direction: 'left', faqItems: [q(0), q(1), q(2), q(3)] },
    { id: 'row2', speed: '60s', direction: 'right', faqItems: [q(4), q(5), q(6), q(2)] },
  ],
}

export default function Faq() {
  return (
    <section id="faqs" className="overflow-hidden bg-ivory py-12 sm:py-14 lg:py-16">
      <FaqSection
        data={faqData}
        header={
          <div className="container-x">
            <SectionHead
              index="08"
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
    </section>
  )
}
