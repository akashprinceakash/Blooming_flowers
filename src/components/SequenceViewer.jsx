import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToId } from './Nav.jsx'
import { Arrow, EASE } from './ui.jsx'

const FRAME_COUNT = 50
const frameUrl = (set, i) => `/images/sequence/${set}/${String(i + 1).padStart(3, '0')}.webp`

// captions shown over parts of the scroll (progress 0..1)
const CAPTIONS = [
  { from: 0.02, to: 0.28, eyebrow: 'Step inside', text: 'Every celebration begins with a path.' },
  { from: 0.36, to: 0.62, eyebrow: 'Fresh florals', text: 'Roses, lanterns and soft evening light.' },
  { from: 0.7, to: 0.92, eyebrow: 'The reception', text: 'Into a tent made for the two of you.' },
]

/**
 * Full-screen, scroll-scrubbed image sequence.
 * Scrolling (wheel, trackpad or touch) inside the overlay moves through the frames;
 * "Auto-play" glides through it on its own. Works with touch on phones.
 */
export default function SequenceViewer({ open, onClose }) {
  const scroller = useRef(null)
  const canvas = useRef(null)
  const images = useRef([])
  const target = useRef(0) // frame we want (from scroll)
  const current = useRef(0) // frame drawn (eased toward target)
  const raf = useRef(0)
  const autoplay = useRef(null)

  const [loaded, setLoaded] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const ready = loaded >= FRAME_COUNT

  // draw one frame with "object-fit: cover" behaviour, crisp on high-DPI screens
  const draw = useCallback((index) => {
    const c = canvas.current
    const img = images.current[index]
    if (!c || !img || !img.complete || !img.naturalWidth) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = c.clientWidth
    const h = c.clientHeight
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr)
      c.height = Math.round(h * dpr)
    }
    const ctx = c.getContext('2d')
    const scale = Math.max((w * dpr) / img.naturalWidth, (h * dpr) / img.naturalHeight)
    const dw = img.naturalWidth * scale
    const dh = img.naturalHeight * scale
    ctx.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh)
  }, [])

  // preload frames when opened (smaller set on phones)
  useEffect(() => {
    if (!open) return
    const set = window.innerWidth < 768 ? 'sm' : 'lg'
    let count = 0
    images.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = img.onerror = () => {
        count += 1
        setLoaded(count)
        if (i === 0) draw(0)
      }
      img.src = frameUrl(set, i)
      return img
    })
    return () => {
      images.current = []
      setLoaded(0)
    }
  }, [open, draw])

  // lock the page behind, close on Escape
  useEffect(() => {
    if (!open) return
    window.__lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      window.__lenis?.start()
      cancelAnimationFrame(raf.current)
      autoplay.current?.stop?.()
      setPlaying(false)
      setProgress(0)
      target.current = 0
      current.current = 0
    }
  }, [open, onClose])

  // render loop: ease the drawn frame toward the scroll target for smooth motion
  useEffect(() => {
    if (!open) return
    const tick = () => {
      const diff = target.current - current.current
      current.current = Math.abs(diff) < 0.01 ? target.current : current.current + diff * 0.18
      draw(Math.round(current.current))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    const onResize = () => draw(Math.round(current.current))
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', onResize)
    }
  }, [open, draw])

  const onScroll = () => {
    const el = scroller.current
    const max = el.scrollHeight - el.clientHeight
    const p = max > 0 ? el.scrollTop / max : 0
    setProgress(p)
    target.current = p * (FRAME_COUNT - 1)
  }

  const stopAutoplay = () => {
    if (autoplay.current) {
      cancelAnimationFrame(autoplay.current.id)
      autoplay.current = null
      setPlaying(false)
    }
  }

  const togglePlay = () => {
    if (playing) return stopAutoplay()
    const el = scroller.current
    const max = el.scrollHeight - el.clientHeight
    if (el.scrollTop >= max - 2) el.scrollTop = 0
    const start = el.scrollTop
    const duration = 9000 * (1 - start / max)
    const t0 = performance.now()
    const step = (now) => {
      if (!autoplay.current) return
      const t = Math.min(1, (now - t0) / duration)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      el.scrollTop = start + (max - start) * eased
      if (t < 1) autoplay.current.id = requestAnimationFrame(step)
      else stopAutoplay()
    }
    autoplay.current = { id: requestAnimationFrame(step), stop: () => cancelAnimationFrame(autoplay.current?.id) }
    setPlaying(true)
  }

  const planWedding = () => {
    onClose()
    setTimeout(() => scrollToId('#contact'), 350)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-ink text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Wedding garden walkthrough animation"
        >
          {/* scroll area — its scroll position drives the frames */}
          <div
            ref={scroller}
            onScroll={onScroll}
            onWheel={stopAutoplay}
            onTouchStart={stopAutoplay}
            data-lenis-prevent
            className="absolute inset-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="relative h-[500vh]">
              <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
                <canvas ref={canvas} className="h-full w-full" aria-hidden="true" />
                {/* gentle vignette + bottom shade for captions */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_75%_at_50%_45%,transparent_50%,rgba(20,6,10,0.65)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />

                {/* captions */}
                {CAPTIONS.map((c) => {
                  const visible = progress >= c.from && progress <= c.to
                  return (
                    <div
                      key={c.text}
                      className={`pointer-events-none absolute inset-x-0 bottom-28 px-6 text-center transition-all duration-700 ease-[var(--ease-luxe)] sm:bottom-32 ${
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <p className="text-[0.95rem] text-gold-soft">{c.eyebrow}</p>
                      <p className="mx-auto mt-1 max-w-xl font-display text-[clamp(1.8rem,5vw,3.2rem)] leading-tight [text-shadow:0_2px_20px_rgba(20,6,10,0.6)]">
                        {c.text}
                      </p>
                    </div>
                  )
                })}

                {/* end card */}
                <div
                  className={`absolute inset-x-0 bottom-24 flex flex-col items-center px-6 text-center transition-all duration-700 ease-[var(--ease-luxe)] sm:bottom-28 ${
                    progress > 0.95 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
                  }`}
                >
                  <p className="font-display text-[clamp(1.8rem,5vw,3.2rem)] leading-tight [text-shadow:0_2px_20px_rgba(20,6,10,0.6)]">Let your wedding bloom.</p>
                  <button
                    onClick={planWedding}
                    className="mt-5 inline-flex cursor-pointer items-center gap-3 rounded-full bg-gold-soft px-7 py-3.5 text-[1rem] font-semibold text-ink transition-colors hover:bg-ivory"
                  >
                    Plan your wedding <Arrow className="h-4 w-4" />
                  </button>
                </div>

                {/* scroll hint */}
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-28 flex flex-col items-center gap-2 transition-opacity duration-500 sm:bottom-32 ${
                    progress < 0.015 && ready ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <p className="text-[1rem] text-ivory/85">Scroll or swipe up to walk through</p>
                  <svg viewBox="0 0 24 24" className="h-6 w-6 animate-bounce text-gold-soft" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* loader */}
          <AnimatePresence>
            {!ready && (
              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-display text-2xl italic">Blooming Flower</p>
                <div className="mt-5 h-[2px] w-48 overflow-hidden rounded-full bg-ivory/15">
                  <div className="h-full bg-gold-soft transition-[width] duration-300" style={{ width: `${(loaded / FRAME_COUNT) * 100}%` }} />
                </div>
                <p className="mt-3 text-[0.9rem] text-ivory/60">Preparing the walkthrough… {Math.round((loaded / FRAME_COUNT) * 100)}%</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* top bar */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6">
            <p className="font-display text-xl italic [text-shadow:0_1px_12px_rgba(20,6,10,0.6)]">Blooming Flower</p>
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={togglePlay}
                disabled={!ready}
                aria-label={playing ? 'Pause animation' : 'Play animation'}
                className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-ivory/35 bg-ink/40 px-4 text-[0.95rem] backdrop-blur-sm transition-colors hover:bg-ivory hover:text-ink disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  {playing ? <path d="M7 5h3v14H7zM14 5h3v14h-3z" /> : <path d="M8 5v14l11-7z" />}
                </svg>
                {playing ? 'Pause' : 'Auto-play'}
              </button>
              <button
                onClick={onClose}
                aria-label="Close animation"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ivory/35 bg-ink/40 backdrop-blur-sm transition-colors hover:bg-ivory hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* progress */}
          <div className="pointer-events-none absolute inset-x-4 bottom-6 z-20 sm:inset-x-6">
            <div className="h-[2px] overflow-hidden rounded-full bg-ivory/20">
              <div className="h-full bg-gold-soft" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
