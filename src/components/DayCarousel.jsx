import { DAY } from '../data.js'
import { Marquee } from './ui/marquee.jsx'
import { SectionHead } from './ui.jsx'

export default function DayCarousel() {
  return (
    <section id="the-day" className="relative overflow-hidden bg-ivory py-6 md:bg-cream md:py-14 lg:py-16">
      <div className="container-x">
        <SectionHead
          label="The wedding day"
          title={<>From the entrance <em className="text-wine italic">to the reception.</em></>}
          text="Five moments, one story — each function designed to feel distinct. Hover to pause."
        />

        {/* phone: five compact tiles */}
        <ul className="mt-3 grid grid-cols-5 gap-1.5 md:hidden">
          {DAY.map((d) => (
            <li key={d.label} className="overflow-hidden rounded-lg bg-cream shadow-[0_6px_16px_-10px_rgba(42,14,20,0.45)]">
              <img src={d.image} alt={`${d.label} décor`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <p className="truncate px-0.5 py-1.5 text-center text-[0.78rem] font-semibold text-ink">{d.label}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* tablet / desktop: scrolling strip */}
      <div className="relative mt-8 hidden md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-44 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-44 bg-gradient-to-l from-ink/85 via-ink/40 to-transparent" />

        <Marquee className="[--duration:45s] [--gap:1.5rem]" pauseOnHover>
          {DAY.map((d) => (
            <article key={d.label} className="flex w-64 shrink-0 flex-col">
              <div className="relative h-[368px] w-full overflow-hidden rounded-2xl bg-blush">
                <img
                  src={d.image}
                  alt={`${d.label} décor`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-luxe)] hover:scale-105"
                />
                <div className="absolute inset-x-2 bottom-2 rounded-lg bg-ivory/90 p-3 backdrop-blur-sm">
                  <p className="eyebrow !text-[0.58rem] text-gold">{d.label}</p>
                  <h3 className="mt-1 font-display text-[1.2rem] leading-tight text-ink">{d.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
