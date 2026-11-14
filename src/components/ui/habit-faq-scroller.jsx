/**
 * habit-faq-scroller — adapted from the supplied component for this project:
 *  - plain JSX (the project is JavaScript, not TypeScript)
 *  - styled with the site's tokens (Cormorant Garamond, ivory / wine / gold)
 *  - rows pause on hover and keyboard focus so answers can be read
 *  - motion stops entirely for prefers-reduced-motion (handled in index.css)
 */

/** FaqCard — one question + answer. */
export const FaqCard = ({ question, answer }) => {
  return (
    <article
      tabIndex={0}
      className="faq-card flex w-[290px] shrink-0 flex-col gap-3 rounded-lg border border-wine/10 bg-white/80 p-6 shadow-[0_18px_40px_-28px_rgba(42,14,20,0.45)] transition-colors duration-300 hover:border-wine/30 focus:border-wine/40 sm:w-[380px]"
    >
      <h3 className="font-display text-[1.3rem] leading-snug text-ink">{question}</h3>
      <p className="text-[0.92rem] leading-relaxed text-muted">{answer}</p>
    </article>
  )
}

/** HorizontalScroller — seamless looping row (content is duplicated once). */
export const HorizontalScroller = ({ children, speed = '40s', direction = 'left' }) => {
  const animationClass = direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal'
  const style = { '--scroll-duration': speed }

  return (
    <div className="scroller-mask group relative w-full overflow-hidden">
      <div className={`flex w-max ${animationClass}`} style={style}>
        <div className="flex shrink-0 items-stretch gap-5 px-2.5 sm:gap-6 sm:px-3">{children}</div>
        <div className="flex shrink-0 items-stretch gap-5 px-2.5 sm:gap-6 sm:px-3" aria-hidden="true" inert="">
          {children}
        </div>
      </div>
    </div>
  )
}

/** FaqSection — optional header + several rows. */
const FaqSection = ({ data, header }) => {
  return (
    <div className="relative flex w-full flex-col gap-10">
      {header}
      <div className="flex w-full flex-col gap-5 sm:gap-6">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard key={item.id} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  )
}

export default FaqSection
