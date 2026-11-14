import { IMAGES } from '../data.js'
import { ParallaxImg, Reveal, SectionLabel } from './ui.jsx'

const STATS = [
  ['Since 2013', 'Designing weddings'],
  ['4.8 ★', '182 Google reviews'],
  ['Goa & South', 'We travel'],
]

export default function About() {
  return (
    <section id="about" className="bg-ivory pt-10 sm:pt-14 lg:pt-16">
      <div className="grid lg:h-[64svh] lg:max-h-[540px] lg:min-h-[440px] lg:grid-cols-2">
        {/* image — bleeds to the left edge */}
        <ParallaxImg
          src={IMAGES.garlandCouple}
          alt="Couple standing before a jasmine and rose garland curtain"
          className="order-2 aspect-[4/3] w-full sm:aspect-[16/9] lg:order-1 lg:aspect-auto lg:h-full"
          strength={8}
        />

        {/* text */}
        <div className="order-1 flex items-center px-4 py-10 sm:px-8 lg:order-2 lg:px-14 lg:py-0 xl:px-20">
          <Reveal className="max-w-xl">
            <SectionLabel>Our story</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.05] font-light text-ink">
              Flowers are our <em className="text-wine italic">first language.</em>
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
              Mandap and stage décor, fresh flowers, entrance arches, haldi and mehendi setups, sangeet nights, reception
              stages, seating and lighting — and full event planning when you want it. We work across Bangalore, South
              India and Goa.
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-wine/15 pt-5">
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <dd className="font-display text-xl text-wine sm:text-2xl">{v}</dd>
                  <dt className="mt-1 text-[0.64rem] tracking-[0.12em] text-muted uppercase">{l}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
