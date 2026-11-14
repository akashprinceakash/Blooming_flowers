import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { CONTACT, IMAGES } from '../data.js'
import { Arrow, Reveal } from './ui.jsx'

const EVENTS = ['Wedding (multi-function)', 'Haldi / Mehendi', 'Engagement', 'Reception', 'Birthday / Anniversary', 'Corporate', 'Other']

function Field({ label, id, children, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.85rem] text-ivory/70">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-rose" role="alert">{error}</p>}
    </div>
  )
}

const inputCls =
  'w-full border-0 border-b border-ivory/25 bg-transparent px-0 py-2.5 text-[1.05rem] text-ivory placeholder:text-ivory/35 transition-colors focus:border-gold-soft focus:ring-0 focus:outline-none'

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const [form, setForm] = useState({ name: '', phone: '', date: '', type: EVENTS[0], venue: '', note: '' })
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please tell us your name.'
    if (!/^[+\d\s-]{8,}$/.test(form.phone.trim())) errs.phone = 'Please enter a valid phone number.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    const msg = [
      `Hi Blooming Flower Events! I'd like to plan an event.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Event: ${form.type}`,
      form.date && `Date: ${form.date}`,
      form.venue && `Venue / city: ${form.venue}`,
      form.note && `Notes: ${form.note}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <section id="contact" ref={ref} className="grain relative overflow-hidden bg-ink py-12 text-ivory sm:py-14 lg:py-16">
      <motion.div style={{ y: bgY }} className="absolute inset-[-12%_0] opacity-25" aria-hidden="true">
        <img src={IMAGES.nightLights} alt="" loading="lazy" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" aria-hidden="true" />

      <div className="container-x relative grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[0.95rem] text-gold-soft">Let&apos;s begin</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1] font-normal">Tell us the date and the venue.</h2>
          <p className="mt-4 max-w-sm text-[1.05rem] leading-relaxed text-ivory/75">
            Share a few details and we&apos;ll open WhatsApp with your message ready to send. Or simply call — we love a
            good conversation about flowers.
          </p>

          <Reveal className="mt-8 space-y-5">
            <a href={`tel:+${CONTACT.phoneRaw}`} className="group flex items-center gap-5">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 transition-colors group-hover:border-gold-soft group-hover:text-gold-soft">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 5c0 8.3 6.7 15 15 15l1-4-4-2-2 2c-2.5-1-4.5-3-5.5-5.5l2-2-2-4L4 5z" strokeLinejoin="round" /></svg>
              </span>
              <span>
                <span className="block text-[0.85rem] text-ivory/60">Call / WhatsApp</span>
                <span className="block text-[1.05rem] text-ivory">{CONTACT.phone}</span>
              </span>
            </a>
            <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="group flex items-center gap-5">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 transition-colors group-hover:border-gold-soft group-hover:text-gold-soft">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" /></svg>
              </span>
              <span>
                <span className="block text-[0.85rem] text-ivory/60">Instagram</span>
                <span className="block text-[1.05rem] text-ivory">@{CONTACT.instagram}</span>
              </span>
            </a>
            <div className="flex items-start gap-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
              </span>
              <span>
                <span className="block text-[0.85rem] text-ivory/60">Studio</span>
                <span className="block text-[1.05rem] text-ivory max-w-xs leading-relaxed">{CONTACT.address}</span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.15}>
          <form onSubmit={submit} noValidate className="rounded-[20px] border border-ivory/12 bg-ivory/[0.04] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Your name *" id="name" error={errors.name}>
                <input id="name" autoComplete="name" value={form.name} onChange={set('name')} className={inputCls} placeholder="Ananya & Rahul" aria-invalid={!!errors.name} />
              </Field>
              <Field label="Phone *" id="phone" error={errors.phone}>
                <input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+91 98xxx xxxxx" aria-invalid={!!errors.phone} />
              </Field>
              <Field label="Event type" id="type">
                <select id="type" value={form.type} onChange={set('type')} className={`${inputCls} cursor-pointer [&>option]:bg-ink`}>
                  {EVENTS.map((ev) => (
                    <option key={ev}>{ev}</option>
                  ))}
                </select>
              </Field>
              <Field label="Event date" id="date">
                <input id="date" type="date" value={form.date} onChange={set('date')} className={`${inputCls} [color-scheme:dark]`} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Venue / city" id="venue">
                  <input id="venue" value={form.venue} onChange={set('venue')} className={inputCls} placeholder="e.g. Garden resort, Whitefield" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Anything we should know?" id="note">
                  <textarea id="note" rows={3} value={form.note} onChange={set('note')} className={`${inputCls} resize-none`} placeholder="Colours, guest count, Pinterest boards…" />
                </Field>
              </div>
            </div>
            <button
              type="submit"
              className="group mt-8 flex w-full cursor-pointer items-center justify-between rounded-full bg-gold-soft px-7 py-4 text-[1rem] font-semibold text-ink transition-colors duration-300 hover:bg-ivory"
            >
              Send on WhatsApp
              <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-center text-[0.85rem] text-ivory/55">Opens WhatsApp with your details pre-filled. Nothing is stored on this site.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
