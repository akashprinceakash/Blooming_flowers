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
        <div className="hidden flex-col gap-6 border-b border-ivory/15 py-12 md:flex md:flex-row md:items-center md:justify-between">
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
        {/* phone: centred brand + round contact icons */}
        <div className="flex flex-col items-center py-8 text-center md:hidden">
          <p className="font-display text-[1.7rem] italic">Blooming Flower</p>
          <p className="eyebrow mt-0.5 !text-[0.58rem] !tracking-[0.5em] text-gold-soft">Events</p>
          <p className="mt-3 max-w-[17rem] text-[0.98rem] leading-relaxed text-ivory/75">
            Wedding décor and floral design from Electronic City, Bengaluru — since 2013.
          </p>
          <ul className="mt-5 flex gap-3">
            {[
              ['Call', `tel:+${CONTACT.phoneRaw}`, <path key="p" d="M4 5c0 8.3 6.7 15 15 15l1-4-4-2-2 2c-2.5-1-4.5-3-5.5-5.5l2-2-2-4L4 5z" />],
              ['WhatsApp', `https://wa.me/${CONTACT.phoneRaw}`, <path key="w" d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20zM9 9.5c.3 1.6 1.9 3.6 4 4.4l1.1-1.1 1.9.9-.4 1.6c-3.5.2-7.2-3.3-7-6.9L10.2 8l.9 1.9L10 11" />],
              ['Instagram', `https://instagram.com/${CONTACT.instagram}`, <g key="i"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /></g>],
              ['Studio location', `https://maps.google.com/?q=${encodeURIComponent(CONTACT.address)}`, <g key="m"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></g>],
            ].map(([label, href, icon]) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('tel') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-full bg-gold-soft text-ink transition-colors hover:bg-ivory"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden gap-10 py-12 md:grid md:grid-cols-2 lg:grid-cols-12">
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

        <div className="flex flex-col items-center gap-1 border-t border-ivory/15 py-5 text-[0.8rem] text-ivory/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Blooming Flower Events</p>
          <p>{CONTACT.website}</p>
        </div>
      </div>
    </footer>
  )
}
