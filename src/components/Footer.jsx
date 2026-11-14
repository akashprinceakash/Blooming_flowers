import { CONTACT, NAV } from '../data.js'
import { scrollToId } from './Nav.jsx'
import { Arrow } from './ui.jsx'

export default function Footer() {
  const jump = (href) => (e) => {
    e.preventDefault()
    scrollToId(href)
  }

  return (
    <footer className="border-t border-ivory/10 bg-[#1c080d] text-ivory">
      <div className="container-x">
        {/* CTA strip */}
        <div className="flex flex-col gap-6 border-b border-ivory/15 py-12 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-light">
            Planning a wedding? <em className="text-gold-soft italic">Let&apos;s talk flowers.</em>
          </h2>
          <a
            href={`https://wa.me/${CONTACT.phoneRaw}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-gold-soft px-7 py-3.5 text-[0.74rem] font-medium tracking-[0.16em] text-ink uppercase transition-colors duration-300 hover:bg-ivory sm:self-auto"
          >
            WhatsApp us
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-2xl italic">Blooming Flower</p>
            <p className="eyebrow mt-1 !text-[0.58rem] !tracking-[0.5em] text-ivory/60">Events</p>
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed font-light text-ivory/65">
              Wedding décor and floral design from Electronic City, Bengaluru — since 2013.
            </p>
          </div>

          <nav className="lg:col-span-2 lg:col-start-6" aria-label="Footer">
            <p className="eyebrow !text-[0.64rem] text-gold-soft">Explore</p>
            <ul className="mt-5 space-y-2.5 text-[0.92rem]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={jump(n.href)} className="text-ivory/70 transition-colors hover:text-ivory">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow !text-[0.64rem] text-gold-soft">Contact</p>
            <ul className="mt-5 space-y-2.5 text-[0.92rem]">
              <li><a href={`tel:+${CONTACT.phoneRaw}`} className="text-ivory/70 hover:text-ivory">{CONTACT.phone}</a></li>
              <li><a href={`https://wa.me/${CONTACT.phoneRaw}`} target="_blank" rel="noreferrer" className="text-ivory/70 hover:text-ivory">WhatsApp</a></li>
              <li><a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="text-ivory/70 hover:text-ivory">Instagram</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow !text-[0.64rem] text-gold-soft">Studio</p>
            <p className="mt-5 max-w-[16rem] text-[0.92rem] leading-relaxed text-ivory/70">{CONTACT.address}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-ivory/15 py-6 text-[0.75rem] text-ivory/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Blooming Flower Events</p>
          <p>{CONTACT.website}</p>
        </div>
      </div>
    </footer>
  )
}
