/**
 * bento-gallery — adapted from the supplied InteractiveImageBentoGallery for this
 * Vite + React (JavaScript) project:
 *  - JSX instead of TSX; `cn` replaced by a tiny join helper
 *  - lucide-react `X` replaced by an inline SVG (no extra dependency)
 *  - styled with the site tokens (ink / ivory / gold, Cormorant Garamond)
 *  - captions always visible on touch screens; hover-reveal on desktop
 *  - a drag guard so dragging the strip never opens an image by accident
 */
import { AnimatePresence, animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const cn = (...c) => c.filter(Boolean).join(' ')

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

const ImageModal = ({ item, onClose }) => {
  useEffect(() => {
    window.__lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <motion.figure
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative flex w-full max-w-4xl flex-col items-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.url} alt={item.title} className="h-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain" />
        <figcaption className="mt-4 text-center text-ivory">
          <span className="font-display text-xl">{item.title}</span>
          <span className="mt-1 block text-sm font-light text-ivory/70">{item.desc}</span>
        </figcaption>
      </motion.figure>
      <button
        onClick={onClose}
        className="absolute top-5 right-5 grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ivory/25 text-ivory/80 transition-colors hover:text-ivory"
        aria-label="Close image view"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  )
}

export default function InteractiveImageBentoGallery({ imageItems, header }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [dragConstraint, setDragConstraint] = useState(0)
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const targetRef = useRef(null)
  const dragging = useRef(false)
  const x = useMotionValue(0)
  const minX = useRef(0)
  const progress = useTransform(x, (v) => (minX.current ? Math.min(1, Math.max(0, v / minX.current)) : 0))
  const progressWidth = useTransform(progress, (p) => `${Math.max(8, p * 100)}%`)
  const clampX = (v) => Math.max(minX.current, Math.min(0, v))
  const slide = (dir) => {
    const step = (containerRef.current?.offsetWidth || 800) * 0.6
    animate(x, clampX(x.get() - dir * step), { type: 'spring', stiffness: 120, damping: 22 })
  }

  // trackpad / shift+wheel: horizontal gestures slide the strip (and don't reach the page scroller)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (!dx) return
      e.preventDefault()
      e.stopPropagation()
      x.set(clampX(x.get() - dx))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [x])

  useEffect(() => {
    const calc = () => {
      if (gridRef.current && containerRef.current) {
        const c = Math.min(0, containerRef.current.offsetWidth - gridRef.current.scrollWidth - 32)
        minX.current = c
        setDragConstraint(c)
        if (x.get() < c) x.set(c)
      }
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [imageItems])

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  const open = (item) => {
    if (!dragging.current) setSelectedItem(item)
  }

  return (
    <div ref={targetRef} className="relative w-full">
      <motion.div style={{ opacity, y }}>{header}</motion.div>

      <div ref={containerRef} className="relative mt-8 w-full cursor-grab active:cursor-grabbing">
        <motion.div
          className="w-max touch-pan-y"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
          onDragStart={() => (dragging.current = true)}
          onDragEnd={() => setTimeout(() => (dragging.current = false), 80)}
        >
          <motion.div
            ref={gridRef}
            className="grid auto-cols-[17rem] grid-flow-col grid-rows-[22rem] md:auto-cols-[minmax(15rem,1fr)] gap-4 px-4 md:grid-rows-[15rem_15rem] md:px-8 lg:grid-rows-[16rem_16rem]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 'some' }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  'group relative flex h-full min-h-[15rem] w-full min-w-[15rem] cursor-pointer items-end overflow-hidden rounded-xl border border-ivory/10 bg-ink p-4 shadow-sm transition-shadow duration-300 ease-in-out select-none hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)] focus-visible:ring-2 focus-visible:ring-gold-soft focus-visible:outline-none sm:p-5',
                  item.span,
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => open(item)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  draggable="false"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />
                <div className="relative z-10 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {item.tag && (
                    <span className="inline-block rounded-full bg-ivory/90 px-2.5 py-0.5 text-[0.6rem] font-medium tracking-[0.16em] text-ink uppercase">
                      {item.tag}
                    </span>
                  )}
                  <h3 className="mt-2 font-display text-[1.35rem] leading-tight text-ivory">{item.title}</h3>
                  <p className="mt-1 text-sm font-light text-ivory/80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* slide controls */}
      <div className="mx-auto mt-6 flex max-w-[1440px] items-center gap-5 px-4 md:px-8">
        <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-ivory/15">
          <motion.div style={{ width: progressWidth }} className="absolute inset-y-0 left-0 bg-gold-soft" />
        </div>
        <button onClick={() => slide(-1)} aria-label="Slide gallery left" className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-ink">
          <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={() => slide(1)} aria-label="Slide gallery right" className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-ink">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <AnimatePresence>{selectedItem && <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />}</AnimatePresence>
    </div>
  )
}
