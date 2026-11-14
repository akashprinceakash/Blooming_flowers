import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CONTACT, IMAGES } from '../data.js'
import InteractiveImageBentoGallery from './ui/bento-gallery.jsx'
import { Arrow, MobileHead, SectionHead } from './ui.jsx'

// span classes follow the supplied demo layout (2 rows on md+, single draggable row on mobile)
const WORK = [
  { id: 1, url: IMAGES.garlandCouple, title: 'Garland curtain mandap', tag: 'Ceremony', desc: 'Hand-strung jasmine and rose strands framing the couple.', span: 'md:col-span-2 md:row-span-2' },
  { id: 2, url: IMAGES.floralEntrance, title: 'Rose-covered entrance', tag: 'Entrance', desc: 'A full rose arch with ivory drapes to welcome guests.', span: 'md:row-span-1' },
  { id: 3, url: IMAGES.haldiFlorals, title: 'Haldi in full bloom', tag: 'Haldi', desc: 'Pink and white florals in brass, styled for photographs.', span: 'md:row-span-1' },
  { id: 4, url: IMAGES.nightLights, title: 'Night entry', tag: 'Lighting', desc: 'Our own fairy-light installations for the evening walk-in.', span: 'md:row-span-2' },
  { id: 5, url: IMAGES.cottageEntry, title: 'Welcome boards', tag: 'Décor', desc: 'A cottage-style welcome with florals and signage.', span: 'md:col-span-2 md:row-span-1' },
  { id: 6, url: IMAGES.roseCanopy, title: 'Blossom-tree reception', tag: 'Reception', desc: 'Statement canopies of red roses over the couple’s stage.', span: 'md:col-span-2 md:row-span-1' },
]

export default function Portfolio() {
  const [open, setOpen] = useState(null)

  return (
    <section id="portfolio" className="overflow-hidden bg-ink py-6 text-ivory md:py-14 lg:py-16">
      {/* phone: thumbnail strip */}
      <div className="px-4 md:hidden">
        <MobileHead light label="Our work" title="Six weddings, six very different families." />
        <ul className="-mx-4 mt-3 flex snap-x snap-mandatory scroll-pl-4 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {WORK.map((w, i) => (
            <li key={w.id} className="w-[31%] shrink-0 snap-start">
              <button onClick={() => setOpen(i)} className="block w-full cursor-pointer overflow-hidden rounded-lg" aria-label={`View ${w.title}`}>
                <img src={w.url} alt={w.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
        <a
          href={`https://instagram.com/${CONTACT.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex items-center justify-center gap-1.5 py-2 text-[1rem] font-semibold text-gold-soft"
        >
          More on Instagram <Arrow className="h-4 w-4" />
        </a>
      </div>

      {/* tablet / desktop: bento gallery */}
      <div className="hidden md:block">
        <InteractiveImageBentoGallery
          imageItems={WORK}
          header={
            <div className="container-x">
              <SectionHead
                light
                mobile={false}
                label="Our work"
                title={<>Six weddings, <em className="text-gold-soft italic">six very different families.</em></>}
                text="A few recent setups — each designed around the family, the rituals and the venue. Drag, swipe or use the arrows to explore — click any photo to expand."
              />
            </div>
          }
        />
        <div className="container-x mt-8 flex justify-center">
          <a
            href={`https://instagram.com/${CONTACT.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-ivory/30 px-7 py-3.5 text-[0.74rem] tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-ivory hover:text-ink"
          >
            More on Instagram
            <Arrow className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </a>
        </div>
      </div>

      {/* phone viewer */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/95 p-4 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={WORK[open].title}
          >
            <img src={WORK[open].url} alt={WORK[open].title} className="max-h-[70svh] w-auto max-w-full rounded-lg object-contain" />
            <p className="mt-3 font-display text-xl">{WORK[open].title}</p>
            <p className="mt-1 text-center text-[0.95rem] text-ivory/70">{WORK[open].desc}</p>
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-ivory/30">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
