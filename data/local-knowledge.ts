import { CITY_SLUGS } from './cities'

export interface LocalKnowledge {
  citySlug: string
  permits: string[]
  hoaNotes: string
  housingStock: string[]
  landmarks: string[]
  climateNotes: string
}

export const LOCAL_KNOWLEDGE: Record<string, LocalKnowledge> = {
  burlingame: {
    citySlug: 'burlingame',
    permits: [
      'Permits issued through Community Development Department at City Hall on Primrose Road',
      'Design review required for second-story additions visible from the street',
      'Heritage tree removal requires arborist report and Planning Commission approval',
    ],
    hoaNotes:
      'Mills Estate and Ray Park have active HOAs that review exterior paint colors, fence heights, and front-yard landscaping changes. Easton Addition is largely non-HOA.',
    housingStock: [
      '1920s-1940s Tudor and Colonial Revival homes along hillside streets',
      'Mid-century ranches in Ray Park and Burlingame Hills',
      'Craftsman bungalows near Broadway commercial district',
      'Newer townhomes and condos along El Camino Real corridor',
    ],
    landmarks: [
      'Broadway commercial district with Mediterranean-style storefronts',
      'Burlingame Avenue shopping and dining corridor',
      'Washington Park with its historic eucalyptus grove',
      'Village Park with the Burlingame train station (Caltrain)',
    ],
    climateNotes:
      'Moderate coastal influence with morning fog burning off by midday most of the year. Slightly cooler than inland Peninsula cities due to proximity to SFO and Bay. Summer highs typically 68-75F. Wood fences and decks see moderate moisture exposure.',
  },
  'san-mateo': {
    citySlug: 'san-mateo',
    permits: [
      'Building permits through the Building Division at City Hall on South Delaware Street',
      'Fence permits required for fences over 6 feet; front yard fences limited to 3.5 feet',
      'Grading permits required for any hillside work in Baywood or Highlands areas',
    ],
    hoaNotes:
      'Bay Meadows redevelopment area and newer Hillsdale condos have strict HOAs governing exterior modifications. San Mateo Park has deed restrictions limiting fence styles. Older neighborhoods like Aragon are mostly non-HOA.',
    housingStock: [
      'Victorian and Edwardian homes in the downtown San Mateo Park neighborhood',
      'Post-war ranches and split-levels in Hillsdale and Baywood',
      'New construction condos and townhomes in Bay Meadows area',
      'Spanish Colonial Revival homes near Central Park',
    ],
    landmarks: [
      'Central Park with Japanese Tea Garden and rose garden',
      'Hillsdale Shopping Center (major regional mall)',
      'San Mateo County History Museum in the old courthouse',
      'Coyote Point Recreation Area on the Bay',
    ],
    climateNotes:
      'Protected from heaviest coastal fog by hills to the west. Warmer than Pacifica and Half Moon Bay but cooler than Redwood City. Summer highs 72-78F. Bayside neighborhoods get more wind. Good conditions for outdoor wood projects with moderate moisture.',
  },
  'foster-city': {
    citySlug: 'foster-city',
    permits: [
      'Permits through the Community Development Department on Foster City Boulevard',
      'Strict building height limits (35 feet max residential) due to planned community zoning',
      'Waterfront setback requirements for properties on lagoon edges — minimum 20-foot setback from water',
    ],
    hoaNotes:
      'Nearly all Foster City neighborhoods have HOAs due to the planned community origin. Common restrictions include approved color palettes, fence material requirements (no chain link), and mandatory landscape maintenance. Pilgrim Triton condos have especially detailed exterior rules.',
    housingStock: [
      '1960s-1970s single-family tract homes (Eichler-influenced and ranches)',
      '1980s waterfront townhomes along lagoon edges',
      'Multi-story condominium complexes near Metro Center',
      'Some 1990s-2000s infill homes replacing original tract houses',
    ],
    landmarks: [
      'Foster City Lagoon system with 15+ miles of waterfront paths',
      'Leo J. Ryan Memorial Park on the Bay shore',
      'Sea Cloud Park with sports fields and community center',
      'Mariners Island with offices and the Crowne Plaza hotel',
    ],
    climateNotes:
      'Built entirely on Bay fill, Foster City gets consistent Bay breezes that accelerate salt-air corrosion on metal hardware and fasteners. Fog is lighter here than on the coast side. Summer highs 70-76F. Deck and fence hardware should be stainless or hot-dipped galvanized to resist salt air.',
  },
  belmont: {
    citySlug: 'belmont',
    permits: [
      'Permits through Community Development Department on Fifth Avenue',
      'Hillside construction requires geotechnical reports for properties above Ralston Avenue',
      'Tree removal permits required for protected species including coast live oak and bay laurel',
    ],
    hoaNotes:
      'Belmont Hills and Hallmark neighborhoods have HOAs that regulate fence heights, exterior colors, and accessory structures. Sterling Downs has minimal HOA oversight. Canyon properties often have no HOA but may have view easements affecting tall structures.',
    housingStock: [
      'Mid-century ranches in Sterling Downs (flat area near Ralston)',
      'Hillside custom homes from the 1960s-1980s with multilevel construction',
      'Canyon homes along Hastings Drive and Hallmark Drive with steep lot access',
      'Some newer infill construction replacing smaller post-war homes',
    ],
    landmarks: [
      'Twin Pines Park with community center and redwood grove',
      'Ralston Hall at Notre Dame de Namur University (Italianate mansion)',
      'Carlmont Shopping Center at Ralston and El Camino',
      'Waterdog Lake trail in the hills above Hallmark',
    ],
    climateNotes:
      'Pronounced fog/sun line runs through Belmont — hillside homes above Ralston Avenue often sit in fog while lower neighborhoods are sunny. Canyon properties stay cooler and damper year-round. Summer highs range from 65F in the hills to 75F near El Camino. Wood in canyon locations needs extra moisture protection.',
  },
  'san-carlos': {
    citySlug: 'san-carlos',
    permits: [
      'Permits through Community Development Department on Elm Street',
      'Design review required for new construction and major additions in residential zones',
      'ADU permits streamlined under city\'s 2020 updated accessory dwelling unit ordinance',
    ],
    hoaNotes:
      'White Oaks neighborhood has an active HOA with exterior modification review. Devonshire Canyon properties are mostly non-HOA with CC&Rs only. Howard Park and Alder Manor are largely unrestricted. "City of Good Living" identity means neighbors tend to maintain high standards informally.',
    housingStock: [
      'Craftsman and Tudor homes on the east side near Laurel Street',
      'Ranch-style homes from the 1950s in White Oaks and Beverly Terrace',
      'Hillside custom homes in Devonshire Canyon with larger lots',
      'Newer infill and ADU conversions throughout the flatter neighborhoods',
    ],
    landmarks: [
      'Laureola Park with hiking trails connecting to Edgewood',
      'Burton Park with playground and historic Burton home site',
      'Big Canyon Park open space preserve in the western hills',
      'Laurel Street downtown with restaurants and shops',
    ],
    climateNotes:
      'East-side San Carlos is one of the sunnier mid-Peninsula spots, sheltered from fog by the ridgeline. Western canyon areas get patchy fog. Summer highs 74-80F on the east side, 68-74F in the canyons. Excellent conditions for outdoor carpentry — moderate UV exposure, low moisture most of the year.',
  },
  'redwood-city': {
    citySlug: 'redwood-city',
    permits: [
      'Building permits through the Community Development Department on Bradford Street downtown',
      'Sidewalk encroachment permits needed for front-yard fences near public right-of-way',
      'Accessory structure permits required for sheds over 120 square feet',
    ],
    hoaNotes:
      'Emerald Hills has CC&Rs with architectural review for exterior changes. Farm Hill and Woodside Plaza are largely non-HOA. Newer Stambaugh-Heller development has strict HOA. Downtown condo buildings have individual association rules for patios and balconies.',
    housingStock: [
      'Victorian and Edwardian homes near Courthouse Square downtown',
      '1950s-1960s ranches in Woodside Plaza and Farm Hill',
      'Large custom homes on wooded lots in Emerald Hills',
      'New mixed-use condos and townhomes in the downtown/Sequoia Station area',
    ],
    landmarks: [
      'Courthouse Square with the historic San Mateo County Courthouse',
      'Fox Theatre (restored 1929 movie palace)',
      'Bair Island ecological preserve along the Bay',
      'Sequoia Station transit hub and surrounding redevelopment',
    ],
    climateNotes:
      '"Climate Best by Government Test" — Redwood City consistently records the warmest temperatures on the Peninsula. Summer highs 80-88F. Sun exposure is significant; deck and fence finishes fade faster here. UV-resistant stains and sealers are recommended. Very little fog penetration.',
  },
  hillsborough: {
    citySlug: 'hillsborough',
    permits: [
      'All permits through the Building & Planning Department; every exterior change requires Design Review Board approval',
      'No ministerial approvals for visible exterior work — even fence replacement triggers review',
      'Minimum lot sizes enforced (typically 0.5 to 1+ acre); setback requirements are generous',
    ],
    hoaNotes:
      'Hillsborough has no HOAs because the town itself functions as the architectural review authority. The Design Review Board reviews all exterior modifications including fences, gates, driveways, and accessory structures. Approval timelines run 4-8 weeks. Pre-application meetings with planning staff are strongly recommended.',
    housingStock: [
      'Grand estate homes from the early 1900s (Tudor, Mediterranean, Georgian)',
      'Mid-century modern estates on large wooded parcels',
      'Contemporary custom builds on hillside lots with Bay views',
      'Some 1960s-1970s ranches on larger lots being renovated or rebuilt',
    ],
    landmarks: [
      'Carolands Chateau (98-room Beaux-Arts mansion, now event venue)',
      'Crystal Springs reservoir and adjacent watershed trails',
      'North Hillsborough Boulevard with its signature stone walls',
      'Vista Park with panoramic Bay views',
    ],
    climateNotes:
      'Hillsborough straddles the fog/sun line — lower eastern areas near El Camino are sunny while western hillside properties near Crystal Springs catch coastal fog. Summer highs range 68-78F depending on elevation. Estate properties have mature tree canopy that keeps soil moist, affecting fence post longevity.',
  },
  atherton: {
    citySlug: 'atherton',
    permits: [
      'All building permits require town-wide design review through the Building Department on Dinkelspiel Station Lane',
      'Minimum lot size is 1 acre in most residential zones; some areas require 2+ acres',
      'Tree removal permits required for any tree over 12 inches in diameter — arborist report mandatory',
    ],
    hoaNotes:
      'Atherton has no traditional HOAs; the town itself strictly regulates all exterior work through design review. Lindenwood has additional CC&Rs. Many properties have private gates and long driveways, so fence and gate work often involves coordinating with security systems and intercom wiring.',
    housingStock: [
      'Grand estates from the 1920s-1940s on multi-acre parcels',
      'Modernist architect-designed homes from the 1950s-1960s',
      'Contemporary tear-down-and-rebuild custom mansions (common since 2000s)',
      'Some original ranch homes being preserved as guest houses during rebuilds',
    ],
    landmarks: [
      'Holbrook-Palmer Park (town park with historic buildings and gardens)',
      'Menlo Circus Club (private equestrian and social club)',
      'Atherton Caltrain station on the historic right-of-way',
      'Sacred Heart Schools campus along Valparaiso Avenue',
    ],
    climateNotes:
      'Atherton sits in a warm, sheltered pocket with mature tree canopy providing natural shade. Summer highs 78-85F. The heavy oak and redwood canopy means fence and deck projects often work around major root systems. Many properties have irrigation systems that keep soil moist year-round, requiring careful post-hole placement.',
  },
  'menlo-park': {
    citySlug: 'menlo-park',
    permits: [
      'Permits through the Community Development Department on Laurel Street',
      'Belle Haven neighborhood has its own specific plan with separate design guidelines',
      'Heritage tree ordinance protects oaks over 12 inches DBH and redwoods over 18 inches DBH',
    ],
    hoaNotes:
      'Sharon Heights has an active HOA with exterior modification review. The Willows is non-HOA with a strong informal neighborhood character. Allied Arts neighborhood has CC&Rs but minimal enforcement. Suburban Park condos have strict association rules.',
    housingStock: [
      'Modest 1940s-1950s bungalows in The Willows neighborhood',
      'Luxury homes in Sharon Heights on the western hill',
      'Craftsman and cottage-style homes in Allied Arts near the Guild',
      'Newer tech-wealth custom builds replacing original tract homes',
    ],
    landmarks: [
      'Burgess Park with community pool, gymnasium, and sports fields',
      'Allied Arts Guild (historic artisan studios and gardens)',
      'Menlo Park Library on Alma Street',
      'Meta (Facebook) campus along Bayfront Expressway in Belle Haven',
    ],
    climateNotes:
      'Menlo Park gets warmer as you move east toward the Bay and cooler toward the western hills. Summer highs 76-84F in flatlands, 70-76F in Sharon Heights. The Willows area is protected from wind. Good year-round building conditions for outdoor projects, with occasional winter rain as the main moisture concern.',
  },
  woodside: {
    citySlug: 'woodside',
    permits: [
      'Permits through Town Hall on Woodside Road; all exterior work requires planning review',
      'Septic system setback requirements affect accessory structure placement on most parcels',
      'Grading permits required for any earthwork over 50 cubic yards due to steep terrain',
    ],
    hoaNotes:
      'Woodside has very few HOAs. The town planning department serves as the de facto design authority. Woodside Hills subdivision has CC&Rs limiting fence heights and requiring natural materials. Skywood/Skylonda properties in unincorporated county follow San Mateo County rules instead of town rules.',
    housingStock: [
      'Rustic ranch homes on 2-5 acre wooded parcels',
      'Contemporary architect homes with walls of glass overlooking valleys',
      'Historic horse ranch properties with barns and riding rings',
      'Cabin-style homes in the Skylonda/Kings Mountain redwood areas',
    ],
    landmarks: [
      'Wunderlich Park with its historic Folger Estate stable buildings',
      'Huddart Park in the redwood canyon with hiking and equestrian trails',
      'Roberts Market (the town\'s only grocery store and community hub)',
      'The Village at Woodside commercial center (small shops at town center)',
    ],
    climateNotes:
      'Woodside has dramatic microclimate variation. Valley floors are warm (summer highs 80-85F) while ridgetop properties at Skylonda sit in fog and redwood drip (summer highs 60-68F). Heavy tree canopy means many projects work in shade with damp conditions. Redwood tannin staining is common on outdoor surfaces.',
  },
  'portola-valley': {
    citySlug: 'portola-valley',
    permits: [
      'All permits through the Town Planning Department on Alpine Road; Architectural and Site Control Commission (ASCC) reviews exterior changes',
      'Oak woodland preservation ordinance restricts removal of coast live oaks — replacement planting often required',
      'Wildfire hazard zone designations require fire-resistant materials for decks and fences in many areas',
    ],
    hoaNotes:
      'Portola Valley Ranch has an active HOA with strict exterior guidelines including approved fence styles and colors. Westridge has CC&Rs but more flexible enforcement. Blue Oaks community has moderate restrictions. Properties outside subdivisions follow town ASCC review only.',
    housingStock: [
      'Mid-century modern homes on large wooded lots (1+ acre typical)',
      'Ranch-style homes from the 1960s surrounded by oak woodland',
      'Contemporary custom homes with green building features',
      'The Sequoias retirement community (campus-style residential)',
    ],
    landmarks: [
      'Windy Hill Open Space Preserve with grassland and forest trails',
      'Coal Mine Ridge (historic coal mining area, now open space)',
      'Portola Valley Ranch community and trail system',
      'Alpine Road historic corridor connecting to La Honda',
    ],
    climateNotes:
      'Portola Valley sits in the coastal fog belt — morning fog is frequent from May through September, burning off by early afternoon. Summer highs 70-78F. The oak woodland canopy retains moisture, and many properties have seasonal creek drainage to work around. Fire-resistant materials (composite decking, metal fencing) increasingly required.',
  },
  'palo-alto': {
    citySlug: 'palo-alto',
    permits: [
      'Permits through Development Services at City Hall on Hamilton Avenue; individual design review (IDR) required for visible additions and new construction',
      'Heritage tree ordinance protects coast live oaks over 11.5 inches diameter — permits needed even for root-zone work near protected trees',
      'Accessory structures over 120 sq ft require building permits; setbacks vary by zone (R-1, R-2, RM)',
    ],
    hoaNotes:
      'Professorville is a designated historic district with additional design review requirements. Eichler neighborhoods (Greenmeadow, Fairmeadow) have informal community standards preserving mid-century character. Old Palo Alto and Crescent Park are non-HOA but have strong neighborhood associations that monitor development.',
    housingStock: [
      'Eichler homes in south Palo Alto (Greenmeadow, Fairmeadow) — flat roofs, post-and-beam, atrium plans',
      'Craftsman and Colonial Revival homes in Professorville historic district',
      'Large traditional homes on wide lots in Old Palo Alto and Crescent Park',
      'Mid-century ranches in Barron Park and Midtown',
    ],
    landmarks: [
      'Stanford University campus bordering the western edge',
      'Mitchell Park and the Mitchell Park Library (Rinconada-style modern)',
      'Gamble Garden (historic house and demonstration gardens)',
      'California Avenue commercial district with weekly farmers market',
    ],
    climateNotes:
      'Palo Alto is one of the sunnier Peninsula cities, sheltered from coastal fog by the foothills. Summer highs 80-88F. South Palo Alto near the Bay gets more wind. Heritage oak root zones constrain fence post and deck footing placement on many properties. UV exposure is significant — stains and sealers need reapplication every 2-3 years.',
  },
  'los-altos': {
    citySlug: 'los-altos',
    permits: [
      'Permits through the Community Development Department on Main Street; design review required for new construction and major remodels',
      'Single-family residential character strictly enforced — no multi-family development in most zones',
      'Tree protection ordinance covers heritage oaks, redwoods, and cedars over 12 inches diameter',
    ],
    hoaNotes:
      'Country Club neighborhood has active CC&Rs limiting fence materials (wood only, no vinyl). North Los Altos has minimal HOA presence. Old Los Altos near downtown has no HOA but strong community expectations for maintaining neighborhood character. Loyola Corners is non-HOA.',
    housingStock: [
      'Orchard-era ranch homes from the 1950s-1960s on generous lots',
      'Contemporary custom builds replacing original ranch stock (accelerating since 2015)',
      'Some Eichler-influenced homes in the northern neighborhoods',
      'Large estate homes in the Country Club area with mature landscaping',
    ],
    landmarks: [
      'Downtown Village along Main Street and State Street (independent shops and restaurants)',
      'Shoup Park along Adobe Creek with picnic areas and paths',
      'Redwood Grove Nature Preserve (old-growth redwood stand)',
      'Heritage Orchard (preserved apricot orchard from the Valley of Heart\'s Delight era)',
    ],
    climateNotes:
      'Los Altos is warm and sunny, sitting in the rain shadow of the coastal hills. Summer highs 82-90F. Low humidity means wood dries out and cracks if not properly sealed. The orchard-era lots have deep topsoil that makes fence post setting straightforward. Minimal fog penetration — excellent conditions for outdoor projects.',
  },
  'los-altos-hills': {
    citySlug: 'los-altos-hills',
    permits: [
      'Permits through the Town Planning Department on Main Street; all exterior work requires planning approval',
      'Minimum 1-acre lot sizes enforced town-wide; some parcels are 5+ acres',
      'Grading ordinance limits earthwork to 200 cubic yards without special permit due to hillside erosion concerns',
    ],
    hoaNotes:
      'Los Altos Hills has no HOAs — the town itself acts as the sole architectural authority. The rural residential character is maintained by zoning rather than private covenants. No commercial zoning exists in the entire town. Fence heights limited to 6 feet in front setback and 8 feet elsewhere.',
    housingStock: [
      'Custom hillside homes from the 1960s-1980s on 1-3 acre parcels',
      'Contemporary architect-designed homes with panoramic valley views',
      'Original ranch homes being expanded or rebuilt while preserving rural character',
      'Some equestrian properties with barns, paddocks, and riding arenas',
    ],
    landmarks: [
      'Byrne Preserve with grassland trails and views of the Bay',
      'Rancho San Antonio Open Space Preserve (adjacent)',
      'Foothill College campus on the eastern edge',
      'Path and trail network connecting neighborhoods without sidewalks',
    ],
    climateNotes:
      'Los Altos Hills properties span a wide elevation range — lower parcels near Foothill are warm (summer highs 85-90F) while ridgetop homes catch afternoon breezes and some fog (75-82F). Limited street lighting by design means outdoor structures blend into the landscape. Wind exposure on hilltops affects fence and structure longevity.',
  },
  'mountain-view': {
    citySlug: 'mountain-view',
    permits: [
      'Permits through the Community Development Department on Dana Street; online portal available for basic permits',
      'Precise plan areas (North Bayshore, East Whisman) have separate design guidelines for residential projects',
      'ADU permits are streamlined — Mountain View is among the most ADU-friendly Peninsula cities',
    ],
    hoaNotes:
      'Waverly Park has active CC&Rs with fence style and height restrictions. Rex Manor is non-HOA. Old Mountain View near Castro Street has no HOA but is within the historic overlay zone. Newer Cuesta Park condos have strict association rules. The city is generally permissive compared to smaller Peninsula towns.',
    housingStock: [
      '1950s-1960s ranch homes in established neighborhoods like Rex Manor and Waverly Park',
      'Original cottages and bungalows near Old Mountain View/Castro Street',
      'New mid-rise condos and townhomes near San Antonio and North Bayshore',
      'Mixed housing types from single-family to multiplexes across the city',
    ],
    landmarks: [
      'Castro Street downtown with restaurants, shops, and farmers market',
      'Shoreline Amphitheatre and Shoreline Park on the Bay',
      'Stevens Creek Trail (paved multi-use path connecting to Cupertino)',
      'Computer History Museum on Shoreline Boulevard',
    ],
    climateNotes:
      'Mountain View is warm and sunny with minimal fog. Summer highs 82-90F. Shoreline-area properties near the Bay get consistent afternoon winds. Inland neighborhoods are sheltered and can be very hot. The warm, dry climate means wood needs UV protection but moisture is less of a concern than in coastal cities.',
  },
}

// Validate that LOCAL_KNOWLEDGE has an entry for every city slug
const missingCities = CITY_SLUGS.filter(slug => !(slug in LOCAL_KNOWLEDGE))
if (missingCities.length > 0) {
  throw new Error(`LOCAL_KNOWLEDGE missing entries for: ${missingCities.join(', ')}`)
}
