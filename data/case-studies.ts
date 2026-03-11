export interface CaseStudy {
  title: string
  href: string
  image: string
  location: string
  description: string
  citySlug: string
  nearbyCities: string[]
  serviceCategories: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Perry's Double-Decker Little Library",
    href: '/case-studies/perry-little-library',
    image: '/case-studies/perry-little-library/hero-collage.jpg',
    location: 'Palo Alto, CA',
    description: 'A custom redwood little library with two levels, a dog treat box, and push-to-open doors.',
    citySlug: 'palo-alto',
    nearbyCities: ['menlo-park', 'los-altos', 'mountain-view', 'atherton'],
    serviceCategories: ['custom-carpentry'],
  },
  {
    title: "Michelle's Walnut & Marble Tables",
    href: '/case-studies/michelle-speaker-tables',
    image: '/case-studies/michelle-speaker-tables/IMG_0481.JPG',
    location: 'Palo Alto, CA',
    description: 'A dead walnut tree and two marble slabs become bespoke twin tables — a birthday surprise.',
    citySlug: 'palo-alto',
    nearbyCities: ['menlo-park', 'los-altos', 'mountain-view', 'atherton'],
    serviceCategories: ['custom-carpentry', 'refinishing'],
  },
  {
    title: "Peggy's Backyard Dog Fence",
    href: '/case-studies/peggy-backyard-fence',
    image: '/case-studies/peggy-backyard-fence/finished-fence-from-neighbors-side.JPG',
    location: 'Palo Alto, CA',
    description: 'A sturdy redwood fence with custom gate — built in two days, including tree removal and hauling.',
    citySlug: 'palo-alto',
    nearbyCities: ['menlo-park', 'los-altos', 'mountain-view', 'atherton'],
    serviceCategories: ['fences-gates-decks', 'tree-shrub-removal', 'demolition-hauling'],
  },
  {
    title: "Tina's Redwood Potting Station",
    href: '/case-studies/tina-potting-station',
    image: '/case-studies/tina-potting-station/hero-collage.jpg',
    location: 'Palo Alto, CA',
    description: 'A custom redwood potting station with corrugated steel roof, tool rack, and slatted storage — built in two days.',
    citySlug: 'palo-alto',
    nearbyCities: ['menlo-park', 'los-altos', 'mountain-view', 'atherton'],
    serviceCategories: ['custom-carpentry', 'garden-boxes'],
  },
  {
    title: "Robin's Composite Deck & Awning",
    href: '/case-studies/composite-deck-awning',
    image: '/case-studies/composite-deck-awning/IMG_3073.PNG',
    location: 'Palo Alto, CA',
    description: 'A mahogany Timbertech composite deck and redwood awning with corrugated stainless roof — replacing a critter-infested deck.',
    citySlug: 'palo-alto',
    nearbyCities: ['menlo-park', 'los-altos', 'mountain-view', 'atherton'],
    serviceCategories: ['fences-gates-decks', 'custom-carpentry', 'demolition-hauling'],
  },
]
