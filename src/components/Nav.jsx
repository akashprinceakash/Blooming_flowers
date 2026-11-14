import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CONTACT, NAV } from '../data.js'
import { EASE, Magnetic } from './ui.jsx'

export function scrollToId(href) {
  const el = document.querySelector(href)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -10, duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 600 && !open)
  })

  useEffect(() => {
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(href), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled && !open ? 'bg-ivory/85 shadow-[0_1px_0_rgba(42,14,20,0.08)] backdrop-blur-md' : 'bg-transparent'
          }`}
        >
          <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Primary">
            <a
              href="#top"
              onClick={(e) => go(e, '#top')}
              className={`group flex flex-col leading-none transition-colors ${scrolled || open ? 'text-ink' : 'text-ivory'} ${open ? '!text-ivory' : ''}`}
            >
              <span className="font-display text-[1.45rem] leading-none whitespace-nowrap italic sm:text-[1.6rem]">Blooming Flower</span>
              <span className="eyebrow mt-1 !text-[0.55rem] !tracking-[0.5em] opacity-70">Events</span>
            </a>

            <ul className="hidden items-center gap-9 lg:flex">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(e) => go(e, n.href)}
                    className={`group relative py-2 text-[0.82rem] tracking-[0.14em] uppercase transition-colors ${
                      scrolled ? 'text-ink/80 hover:text-ink' : 'text-ivory/85 hover:text-ivory'
                    }`}
                  >
                    {n.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
              <Magnetic
                href="#contact"
                onClick={(e) => go(e, '#contact')}
                className={`hidden rounded-full border px-6 py-2.5 text-[0.78rem] tracking-[0.16em] uppercase transition-colors duration-300 ${
                  scrolled
                    ? 'border-wine bg-wine text-ivory hover:bg-ink'
                    : 'border-ivory/50 text-ivory hover:bg-ivory hover:text-ink'
                }`}
              >
                Book a call
              </Magnetic>
              </div>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={`relative grid h-11 w-11 cursor-pointer place-items-center rounded-full lg:hidden ${
                  open ? 'text-ivory' : scrolled ? 'text-ink' : 'text-ivory'
                }`}
              >
                <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-1'}`} />
                <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-1'}`} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="grain fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-28 pb-10 text-ivory lg:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <ul className="flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}
                >
                  <a href={n.href} onClick={(e) => go(e, n.href)} className="flex items-baseline gap-4 py-1.5 font-display text-[2.6rem] leading-tight">
                    <span className="font-sans text-xs text-gold-soft">0{i + 1}</span>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-auto space-y-1 text-sm text-ivory/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href={`tel:+${CONTACT.phoneRaw}`} className="block py-1">{CONTACT.phone}</a>
              <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="block py-1">@{CONTACT.instagram}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
