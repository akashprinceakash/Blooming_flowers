import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import DayCarousel from './components/DayCarousel.jsx'
import Services from './components/Services.jsx'
import Signatures from './components/Signatures.jsx'
import Portfolio from './components/Portfolio.jsx'
import Why from './components/Why.jsx'
import Pricing from './components/Pricing.jsx'
import ParallaxBand from './components/ParallaxBand.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import SequenceViewer from './components/SequenceViewer.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [showAnim, setShowAnim] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    window.__lenis = lenis
    let id
    const raf = (time) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = loading ? 'hidden' : ''
    if (window.__lenis) loading ? window.__lenis.stop() : window.__lenis.start()
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>
      <div className="site-vignette" aria-hidden="true" />
      <Nav />
      <main>
        <Hero ready={!loading} onViewAnimation={() => setShowAnim(true)} />
        <About />
        <DayCarousel />
        <Services />
        <ParallaxBand />
        <Signatures />
        <Portfolio />
        <Why />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <SequenceViewer open={showAnim} onClose={() => setShowAnim(false)} />
    </>
  )
}
