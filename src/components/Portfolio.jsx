import { CONTACT, IMAGES } from '../data.js'
import InteractiveImageBentoGallery from './ui/bento-gallery.jsx'
import { Arrow, SectionHead } from './ui.jsx'

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
  return (
    <section id="portfolio" className="overflow-hidden bg-ink py-12 text-ivory sm:py-14 lg:py-16">
      <InteractiveImageBentoGallery
        imageItems={WORK}
        header={
          <div className="container-x">
            <SectionHead
              light
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
    </section>
  )
}
