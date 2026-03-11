export interface Service {
  slug: string
  title: string
  href: string
  description: string
  longDescription: string
  category: 'carpentry' | 'outdoor' | 'maintenance' | 'design'
  keywords: string[]
  relatedServices: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'garden-boxes',
    title: 'Garden Boxes',
    href: '/specialties/garden-boxes',
    description: 'Custom raised garden beds and planter boxes built to last.',
    longDescription: 'Built from rot-resistant redwood and cedar, our raised garden beds are designed for the Peninsula climate. We handle soil depth planning, drainage, and optional irrigation hookups to create beds that produce for years.',
    category: 'outdoor',
    keywords: ['raised garden bed', 'planter box', 'garden box', 'raised bed installation', 'custom planter'],
    relatedServices: ['hardscape', 'landscape-design', 'custom-carpentry'],
  },
  {
    slug: 'tree-shrub-removal',
    title: 'Tree & Shrub Removal',
    href: '/specialties/tree-shrub-removal',
    description: 'Safe removal of trees, shrubs, and stumps with full cleanup.',
    longDescription: 'We handle everything from overgrown hedges to large tree removals, including stump grinding and root ball extraction. All debris is hauled away and the site is left clean and ready for the next phase of your project.',
    category: 'outdoor',
    keywords: ['tree removal', 'shrub removal', 'stump grinding', 'tree cutting service', 'brush clearing'],
    relatedServices: ['landscape-design', 'demolition-hauling', 'hardscape'],
  },
  {
    slug: 'shed-renovation',
    title: 'Shed Renovation',
    href: '/specialties/shed-renovation',
    description: 'Complete shed cleanouts, repairs, and renovations — including critter-infested spaces.',
    longDescription: 'From structural repairs and re-roofing to full interior buildouts, we transform neglected sheds into functional spaces. We handle critter damage cleanup, dry rot replacement, and weatherproofing so the structure lasts.',
    category: 'maintenance',
    keywords: ['shed repair', 'shed renovation', 'shed cleanout', 'outbuilding repair', 'shed restoration'],
    relatedServices: ['custom-carpentry', 'painting', 'squirrel-rat-excluders'],
  },
  {
    slug: 'fences-gates-decks',
    title: 'Fences, Gates & Decks',
    href: '/specialties/fences-gates-decks',
    description: 'Custom fences, gates, and decks in redwood, cedar, and composite.',
    longDescription: 'We build privacy fences, decorative gates, and decks using redwood, cedar, and composite materials suited to the Peninsula fog and sun cycle. Every project includes proper post setting, hardware selection, and finish options.',
    category: 'outdoor',
    keywords: ['fence installation', 'deck building', 'gate installation', 'redwood fence', 'cedar deck', 'composite deck'],
    relatedServices: ['custom-carpentry', 'painting', 'hardscape'],
  },
  {
    slug: 'custom-carpentry',
    title: 'Custom Carpentry',
    href: '/specialties/custom-carpentry',
    description: 'One-of-a-kind woodwork — furniture, built-ins, and bespoke projects.',
    longDescription: 'From floating shelves and built-in bookcases to custom furniture and one-off architectural details, we work with hardwoods, reclaimed lumber, and specialty materials to build pieces that fit your space exactly.',
    category: 'carpentry',
    keywords: ['custom woodwork', 'built-in shelves', 'custom furniture', 'bespoke carpentry', 'finish carpentry'],
    relatedServices: ['refinishing', 'fences-gates-decks', 'shed-renovation'],
  },
  {
    slug: 'hardscape',
    title: 'Hardscape',
    href: '/specialties/hardscape',
    description: 'Patios, walkways, retaining walls, and stone work.',
    longDescription: 'We design and install patios, walkways, retaining walls, and stone features using flagstone, pavers, and natural stone. Proper grading, drainage, and base preparation ensure the work holds up through wet seasons.',
    category: 'outdoor',
    keywords: ['patio installation', 'walkway construction', 'retaining wall', 'stone patio', 'paver installation'],
    relatedServices: ['landscape-design', 'garden-boxes', 'fences-gates-decks'],
  },
  {
    slug: 'painting',
    title: 'Painting',
    href: '/specialties/painting',
    description: 'Interior and exterior painting — prep, prime, and finish.',
    longDescription: 'We handle full surface preparation including scraping, sanding, patching, and priming before applying finish coats. We use premium paints rated for coastal and fog-belt climates to ensure long-lasting results.',
    category: 'maintenance',
    keywords: ['house painting', 'exterior painting', 'interior painting', 'fence painting', 'deck staining'],
    relatedServices: ['refinishing', 'fences-gates-decks', 'custom-carpentry'],
  },
  {
    slug: 'squirrel-rat-excluders',
    title: 'Squirrel & Rat Excluders',
    href: '/specialties/squirrel-rat-excluders',
    description: 'Humane exclusion solutions to keep critters out for good.',
    longDescription: 'We seal entry points with steel mesh, custom-fitted excluder devices, and carpentry repairs to permanently keep rodents and squirrels out of attics, crawl spaces, and sheds without harming the animals.',
    category: 'maintenance',
    keywords: ['rodent exclusion', 'rat proofing', 'squirrel exclusion', 'pest exclusion', 'critter proofing'],
    relatedServices: ['shed-renovation', 'custom-carpentry', 'demolition-hauling'],
  },
  {
    slug: 'refinishing',
    title: 'Refinishing',
    href: '/specialties/refinishing',
    description: 'Bringing worn surfaces back to life — wood, metal, and more.',
    longDescription: 'We strip, sand, and refinish worn decks, fences, furniture, and architectural details. Whether it is teak outdoor furniture or a vintage front door, we restore the original beauty and add protective finishes.',
    category: 'maintenance',
    keywords: ['wood refinishing', 'deck refinishing', 'furniture restoration', 'surface restoration', 'wood restoration'],
    relatedServices: ['painting', 'custom-carpentry', 'fences-gates-decks'],
  },
  {
    slug: 'landscape-design',
    title: 'Landscape Design',
    href: '/specialties/landscape-design',
    description: 'Thoughtful landscape design that balances beauty and function.',
    longDescription: 'We create landscape plans that work with the Peninsula microclimate, native plants, and your property layout. Designs integrate hardscape, planting zones, drainage, and outdoor living areas into a cohesive plan.',
    category: 'design',
    keywords: ['landscape design', 'garden design', 'yard design', 'outdoor living design', 'landscape planning'],
    relatedServices: ['hardscape', 'garden-boxes', 'fences-gates-decks'],
  },
  {
    slug: 'demolition-hauling',
    title: 'Demolition & Hauling',
    href: '/specialties/demolition-hauling',
    description: 'Clean demolition and debris hauling — fast turnaround, no mess left behind.',
    longDescription: 'We handle selective demolition of structures, old fences, concrete, and landscape features. All materials are sorted for recycling where possible, and the site is swept clean and ready for the next phase.',
    category: 'maintenance',
    keywords: ['demolition service', 'debris hauling', 'junk removal', 'concrete removal', 'structure demolition'],
    relatedServices: ['tree-shrub-removal', 'hardscape', 'shed-renovation'],
  },
]

export const SERVICE_BY_SLUG = new Map(SERVICES.map(s => [s.slug, s]))
export const SERVICE_SLUGS = SERVICES.map(s => s.slug) as readonly string[]
export type ServiceSlug = typeof SERVICES[number]['slug']
