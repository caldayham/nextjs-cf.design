export interface City {
  slug: string
  name: string
  county: 'San Mateo' | 'Santa Clara'
  neighborhoods: string[]
  characteristics: string[]
  lat: number
  lng: number
}

export const CITIES: City[] = [
  {
    slug: 'burlingame',
    name: 'Burlingame',
    county: 'San Mateo',
    neighborhoods: ['Broadway', 'Easton Addition', 'Mills Estate', 'Ray Park'],
    characteristics: ['tree-lined streets', '1920s-1940s homes', 'hillside properties'],
    lat: 37.5841,
    lng: -122.3661,
  },
  {
    slug: 'san-mateo',
    name: 'San Mateo',
    county: 'San Mateo',
    neighborhoods: ['Hillsdale', 'Baywood', 'San Mateo Park', 'Aragon'],
    characteristics: ['diverse housing stock', 'downtown core', 'Central Park area'],
    lat: 37.5630,
    lng: -122.3255,
  },
  {
    slug: 'foster-city',
    name: 'Foster City',
    county: 'San Mateo',
    neighborhoods: ['Foster City', 'Pilgrim Triton'],
    characteristics: ['planned waterfront community', 'lagoon system', 'newer construction'],
    lat: 37.5585,
    lng: -122.2711,
  },
  {
    slug: 'belmont',
    name: 'Belmont',
    county: 'San Mateo',
    neighborhoods: ['Belmont Hills', 'Hallmark', 'Sterling Downs'],
    characteristics: ['hillside homes', 'canyon properties', 'mid-century ranches'],
    lat: 37.5202,
    lng: -122.2758,
  },
  {
    slug: 'san-carlos',
    name: 'San Carlos',
    county: 'San Mateo',
    neighborhoods: ['White Oaks', 'Devonshire', 'Alder Manor', 'Howard Park'],
    characteristics: ['Laurel Street downtown', 'craftsman homes', 'hill properties'],
    lat: 37.5072,
    lng: -122.2602,
  },
  {
    slug: 'redwood-city',
    name: 'Redwood City',
    county: 'San Mateo',
    neighborhoods: ['Emerald Hills', 'Woodside Plaza', 'Farm Hill', 'Edgewood Park area'],
    characteristics: ['downtown renaissance', 'diverse neighborhoods', 'climate microzone'],
    lat: 37.4852,
    lng: -122.2364,
  },
  {
    slug: 'hillsborough',
    name: 'Hillsborough',
    county: 'San Mateo',
    neighborhoods: [],
    characteristics: ['estate properties', 'large lots', 'gated drives', 'no commercial district'],
    lat: 37.5741,
    lng: -122.3794,
  },
  {
    slug: 'atherton',
    name: 'Atherton',
    county: 'San Mateo',
    neighborhoods: ['Lindenwood', 'West Atherton', 'Atherton Oaks'],
    characteristics: ['estate properties', 'equestrian trails', 'no sidewalks in many areas', 'gated estates'],
    lat: 37.4613,
    lng: -122.1979,
  },
  {
    slug: 'menlo-park',
    name: 'Menlo Park',
    county: 'San Mateo',
    neighborhoods: ['Allied Arts', 'The Willows', 'Sharon Heights', 'Belle Haven', 'Suburban Park'],
    characteristics: ['mix of tech campus area and residential', 'Stanford Research Park proximity'],
    lat: 37.4530,
    lng: -122.1817,
  },
  {
    slug: 'woodside',
    name: 'Woodside',
    county: 'San Mateo',
    neighborhoods: ['Woodside Hills', 'Skywood/Skylonda', 'Kings Mountain'],
    characteristics: ['rural-feel properties', 'horse country', 'redwood groves', 'winding roads'],
    lat: 37.4299,
    lng: -122.2540,
  },
  {
    slug: 'portola-valley',
    name: 'Portola Valley',
    county: 'San Mateo',
    neighborhoods: ['Portola Valley Ranch', 'Westridge', 'Blue Oaks'],
    characteristics: ['open space preserves', 'rural residential', 'equestrian', 'oak woodlands'],
    lat: 37.3841,
    lng: -122.2350,
  },
  {
    slug: 'palo-alto',
    name: 'Palo Alto',
    county: 'Santa Clara',
    neighborhoods: ['Old Palo Alto', 'Crescent Park', 'Barron Park', 'College Terrace', 'Professorville', 'Midtown', 'Greenmeadow'],
    characteristics: ['historic craftsman homes', 'mature oak canopy', 'Stanford University proximity'],
    lat: 37.4419,
    lng: -122.1430,
  },
  {
    slug: 'los-altos',
    name: 'Los Altos',
    county: 'Santa Clara',
    neighborhoods: ['Country Club', 'North Los Altos', 'Loyola Corners', 'Old Los Altos'],
    characteristics: ['suburban residential', 'orchard heritage', 'downtown village feel'],
    lat: 37.3852,
    lng: -122.1141,
  },
  {
    slug: 'los-altos-hills',
    name: 'Los Altos Hills',
    county: 'Santa Clara',
    neighborhoods: [],
    characteristics: ['large lots (1+ acre minimum)', 'hillside properties', 'horse country', 'limited street lighting'],
    lat: 37.3795,
    lng: -122.1377,
  },
  {
    slug: 'mountain-view',
    name: 'Mountain View',
    county: 'Santa Clara',
    neighborhoods: ['Old Mountain View', 'Cuesta Park', 'Rex Manor', 'Waverly Park', 'Gemello'],
    characteristics: ['tech campus proximity', 'Castro Street downtown', 'diverse housing mix'],
    lat: 37.3861,
    lng: -122.0839,
  },
]

export const CITY_BY_SLUG = new Map(CITIES.map(c => [c.slug, c]))
export const CITY_SLUGS = CITIES.map(c => c.slug) as readonly string[]
export type CitySlug = typeof CITIES[number]['slug']
