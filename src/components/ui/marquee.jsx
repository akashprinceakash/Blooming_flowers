/**
 * Marquee — continuously scrolling row (adapted from the supplied team component's
 * Marquee for this Vite + React + JS project). Content is repeated so the loop is seamless.
 * Tune with CSS vars on className: [--gap:1.5rem] [--duration:40s]
 */
export function Marquee({ children, className = '', reverse = false, pauseOnHover = false, repeat = 4 }) {
  return (
    <div className={`group flex overflow-hidden p-2 [--duration:40s] [--gap:1.5rem] [gap:var(--gap)] ${className}`}>
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 ? 'true' : undefined}
          className={`animate-marquee flex shrink-0 justify-around [gap:var(--gap)] ${
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
          } ${reverse ? '[animation-direction:reverse]' : ''}`}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export default Marquee
