const img = (name) => `/images/${name}.webp`

export const CONTACT = {
  phone: '+91 84313 32716',
  phoneRaw: '918431332716',
  instagram: 'bloomingflower_events',
  website: 'bloomingflowerevents.com',
  address: "56/2, behind St. Xavier's School, Bettadasanapura, Electronic City, Bengaluru 560100",
}

export const NAV = [
  { label: 'Story', href: '#about' },
  { label: 'The Day', href: '#the-day' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'FAQs', href: '#faqs' },
]

export const IMAGES = {
  gardenMandap: img('garden-mandap'),
  roseCanopy: img('rose-canopy'),
  haldiFlorals: img('haldi-florals'),
  petalShower: img('petal-shower'),
  nightLights: img('night-lights'),
  lotusStage: img('lotus-stage'),
  floralEntrance: img('floral-entrance'),
  haldiSwing: img('haldi-swing'),
  garlandCouple: img('garland-couple'),
  peacockMandap: img('peacock-mandap'),
  cottageEntry: img('cottage-entry'),
  nandiStage: img('nandi-stage'),
  petalAisle: img('petal-aisle'),
}

export const DAY = [
  { time: '07:00', title: 'The Arrival', label: 'Entrance', text: 'Rose-wrapped arches and welcome boards that set the tone before a single word is spoken.', image: IMAGES.floralEntrance },
  { time: '10:30', title: 'Turmeric & Laughter', label: 'Haldi', text: 'Marigold yellows, brass urlis and a swing for two — bright, playful and made for photographs.', image: IMAGES.haldiSwing },
  { time: '13:00', title: 'The Sacred Vow', label: 'Mandap', text: 'Hand-strung garland curtains and carved pillars framing the moment the families become one.', image: IMAGES.peacockMandap },
  { time: '19:00', title: 'Music Under Lights', label: 'Sangeet', text: 'Fairy-light canopies and our own in-house lighting rigs turn a lawn into a dance floor.', image: IMAGES.nightLights },
  { time: '21:00', title: 'The Grand Evening', label: 'Reception', text: 'Glowing stages and blossom installations for the last, most-photographed hours of the day.', image: IMAGES.lotusStage },
]

export const SERVICES = [
  { no: '01', title: 'Theme Wedding Décor', text: 'Mandap, stage, entrance arches, haldi and mehendi setups, sangeet nights and reception stages — designed as one story.', tags: ['Mandap', 'Stage', 'Haldi', 'Sangeet'], image: IMAGES.roseCanopy },
  { no: '02', title: 'Outdoor Venue Lighting', text: 'Our own lighting stock — fairy canopies, chandeliers, uplights and pathway glow — so evenings look as good as mornings.', tags: ['In-house stock', 'Canopies', 'Pathways'], image: IMAGES.nightLights },
  { no: '03', title: 'Custom Event Décor', text: 'Birthdays, anniversaries, naming ceremonies, housewarmings and corporate events, styled with the same care as a wedding.', tags: ['Birthdays', 'Naming', 'Corporate'], image: IMAGES.cottageEntry },
]

export const SIGNATURES = [
  { title: 'Mandap', note: 'Garland curtains, carved pillars, floral ceilings', image: '/images/banner-sunlit-mandap.webp' },
  { title: 'Haldi', note: 'Marigold, brass and sunshine yellows', image: '/images/banner-golden-haldi.webp' },
  { title: 'Reception', note: 'Statement stages and glowing installations', image: '/images/banner-garden-stage.webp' },
  { title: 'Sangeet', note: 'Lights, drapes and a stage for the family', image: IMAGES.roseCanopy },
]

export const GALLERY_FILTERS = ['All', 'Décor', 'Ritual', 'Ceremony', 'Haldi', 'Reception', 'Evening']

export const GALLERY = [
  { src: IMAGES.gardenMandap, alt: 'Outdoor garden mandap with pink and white floral strings and aisle seating', cat: 'Ceremony', tall: true },
  { src: IMAGES.roseCanopy, alt: 'Red rose canopy installations around a couple seating stage', cat: 'Décor', tall: true },
  { src: IMAGES.petalShower, alt: 'Couple under a petal shower beneath a floral ceiling', cat: 'Ritual', tall: true },
  { src: IMAGES.haldiSwing, alt: 'Haldi setup with cane sofa, umbrellas and brass décor', cat: 'Haldi' },
  { src: IMAGES.nightLights, alt: 'Fairy-light installations hanging from trees at night', cat: 'Evening', tall: true },
  { src: IMAGES.nandiStage, alt: 'Traditional ritual stage with wine-red floor and Nandi sculptures', cat: 'Ritual' },
  { src: IMAGES.lotusStage, alt: 'Golden lotus reception stage glowing at dusk', cat: 'Reception', tall: true },
  { src: IMAGES.floralEntrance, alt: 'Pink and white rose entrance arch with ivory drapes', cat: 'Décor', tall: true },
  { src: IMAGES.garlandCouple, alt: 'Couple in front of a jasmine and rose garland curtain', cat: 'Ceremony', tall: true },
  { src: IMAGES.cottageEntry, alt: 'Cottage-style welcome entrance with pink florals', cat: 'Décor' },
  { src: IMAGES.haldiFlorals, alt: 'Pink and white flower arrangements in brass pots for haldi', cat: 'Haldi', tall: true },
  { src: IMAGES.peacockMandap, alt: 'White pillared mandap with peacock sculpture and green garlands', cat: 'Ceremony', tall: true },
  { src: IMAGES.petalAisle, alt: 'Rose-petal aisle under ivory draped tent', cat: 'Reception', tall: true },
]

export const WHY = [
  { title: 'Flowers bought late', text: 'We buy as close to the day as possible, so blooms are at their freshest when guests arrive.' },
  { title: 'Itemised quotes', text: 'Every function priced line by line. You see exactly where your budget goes.' },
  { title: '4 a.m. on site', text: 'Our team starts before sunrise so everything is finished, checked and photographed early.' },
  { title: 'We measure the venue', text: 'Real measurements, not guesses — designs that fit the space on the first try.' },
  { title: 'In-house lighting', text: 'Our own lighting stock, so evening décor is never an afterthought or an add-on.' },
  { title: 'We travel', text: 'Bengaluru, across South India and Goa — the same crew, the same standard.' },
]

export const PROCESS = [
  { step: 'Talk', text: 'A call to understand the dates, venue, functions and the feeling you want.' },
  { step: 'Design', text: 'Mood boards, references and an itemised quote — built from your photos if you have them.' },
  { step: 'Confirm', text: 'Lock the plan, flowers and colours. We measure and walk the venue.' },
  { step: 'Build', text: 'Our crew is on site from 4 a.m., setting up with fresh-bought flowers.' },
  { step: 'The Day', text: 'You arrive to finished décor. We handle the changeovers between functions.' },
]

export const PRICING = [
  { label: 'Intimate', range: 'from ₹40,000', for: 'Haldi, engagement, mehendi or a single function', points: ['One function setup', 'Fresh florals & props', 'Itemised quote'] },
  { label: 'Full Wedding', range: 'from ₹2,00,000', for: 'Multi-function wedding décor, start to finish', points: ['Mandap, stage & entrance', 'Haldi, sangeet, reception', 'In-house lighting'], featured: true },
  { label: 'Grand', range: 'up to ₹15,00,000', for: 'Large venues, destination weddings & statement installs', points: ['Bespoke installations', 'Destination travel', 'Full event planning'] },
]

export const FAQS = [
  { q: 'What services do you offer?', a: 'Complete wedding décor — mandap, stage, florals, entrance arches, haldi and mehendi setups, sangeet nights, reception stages, seating and lighting — along with full event planning and décor for birthdays, anniversaries, naming ceremonies, housewarmings and corporate events.' },
  { q: 'Which locations do you cover?', a: 'We are based in Electronic City, Bengaluru, and regularly work across Bangalore, South India and Goa.' },
  { q: 'How much does wedding décor cost?', a: 'Smaller setups such as haldi or engagement start from around ₹40,000. Full wedding décor starts from around ₹2,00,000, and large setups can go up to around ₹15,00,000. Every quote is itemised by function.' },
  { q: 'How early should we book?', a: 'For peak wedding season, reach out as early as you can — popular dates fill up first. Smaller events can often be arranged at shorter notice; call us to check availability.' },
  { q: 'Can you recreate a design from photos?', a: 'Yes. Share your Pinterest boards or reference photos and we will adapt them to your venue, colours and budget.' },
  { q: 'Do you use fresh or artificial flowers?', a: 'We work primarily with fresh flowers, bought as late as possible so they look their best on the day. We will advise where premium artificial elements make sense.' },
  { q: 'Do you provide lighting?', a: 'Yes — we own our lighting stock, from fairy-light canopies to uplighting and pathway lights.' },
]
