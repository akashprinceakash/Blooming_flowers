import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const EASE = [0.22, 1, 0.36, 1]

/** Fades + lifts children into view once. */
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div', amount = 0.3 }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

/** Splits a line into words that rise out of a mask. `lines` is an array of strings or nodes. */
export function MaskText({ lines, className = '', delay = 0, stagger = 0.08, animateOnMount = false }) {
  const reduce = useReducedMotion()
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.5 } }
  return (
    <motion.span
      className={className}
      initial={reduce ? false : 'hidden'}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      style={{ display: 'block' }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: '110%', rotate: 2 },
              show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Image that wipes in from a clip-path and settles from a slight zoom. */
export function ClipImage({ src, alt, className = '', imgClassName = '', delay = 0, from = 'bottom', eager = false }) {
  const reduce = useReducedMotion()
  const clips = {
    bottom: 'inset(100% 0% 0% 0%)',
    top: 'inset(0% 0% 100% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: clips[from] }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={reduce ? false : { scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      />
    </motion.div>
  )
}

/** Image that drifts inside its frame as the frame scrolls through the viewport. */
export function ParallaxImg({ src, alt = '', className = '', strength = 14, eager = false }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ y, scale: reduce ? 1 : 1 + (strength * 2.2) / 100 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

/** Wraps content and moves it at a different speed than the scroll (speed < 0 = slower/up). */
export function Speed({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed * 300, speed * -300])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

export function Arrow({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Petal({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 2c6 8 10 14 10 21a10 10 0 0 1-20 0C10 16 14 10 20 2z" fill="currentColor" />
    </svg>
  )
}

/** Small decorative ornament: line – flower – line */
export function Ornament({ className = '' }) {
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <path d="M0 8h46M74 8h46" strokeWidth="0.8" />
      <g transform="translate(60 8)" fill="currentColor" stroke="none">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} rx="2.4" ry="5.5" transform={`rotate(${r}) translate(0 -5)`} opacity="0.85" />
        ))}
        <circle r="1.8" />
      </g>
    </svg>
  )
}

/** Button that drifts slightly toward the cursor (desktop only). */
export function Magnetic({ children, className = '', href, onClick, ariaLabel, target, rel }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const handleMove = (e) => {
    if (reduce || !ref.current || window.matchMedia('(hover: none)').matches) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.25
    const y = (e.clientY - r.top - r.height / 2) * 0.35
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-flex cursor-pointer items-center justify-center transition-transform duration-300 ease-[var(--ease-luxe)] ${className}`}
    >
      {children}
    </Comp>
  )
}

/** Consistent section header used across the site. */
export function SectionHead({ index, label, title, text, light = false, center = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto flex max-w-2xl flex-col items-center text-center' : 'grid gap-6 lg:grid-cols-12 lg:items-end'} ${className}`}>
      <div className={center ? '' : 'lg:col-span-8'}>
        <Reveal>
          <div className={center ? 'flex justify-center' : ''}>
            <SectionLabel index={index} light={light}>{label}</SectionLabel>
          </div>
          <h2 className={`mt-3 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] font-light [text-wrap:balance] ${light ? 'text-ivory' : 'text-ink'}`}>
            {title}
          </h2>
        </Reveal>
      </div>
      {text && (
        <Reveal delay={0.1} className={center ? 'mt-4' : 'lg:col-span-4 lg:col-start-9'}>
          <p className={`leading-relaxed ${light ? 'text-ivory/70' : 'text-muted'}`}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}

export function SectionLabel({ index, children, light = false }) {
  return (
    <div className={`flex items-center gap-4 ${light ? 'text-gold-soft' : 'text-gold'}`}>
      <span className={`h-px w-10 ${light ? 'bg-gold-soft/50' : 'bg-gold/50'}`} />
      <span className="eyebrow">{children}</span>
    </div>
  )
}
