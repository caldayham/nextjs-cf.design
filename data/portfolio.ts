export interface PortfolioItem {
  title: string
  location: string
  published: boolean
  images: string[]
  caseStudy?: string
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { title: "Perry's Double-Decker Little Library & Dog Amenities Station", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/25_perry_library.jpg", "/assets/jobs/25_perry_library.jpg"], caseStudy: "/case-studies/perry-little-library" },
  { title: "Michelle's Marble Topped Black Walnut Speaker Tables", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/26_michelle_tables.jpg", "/assets/jobs/26_michelle_tables.jpg"], caseStudy: "/case-studies/michelle-speaker-tables" },
  { title: "Perry's Tri-Door Redwood Irrigation Control Box", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/13_perry_irrigation.jpg", "/assets/jobs/13_perry_irrigation.jpg"] },
  { title: "Suzi's Redwood Burl Cut-Out Fence", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/21_suzi_fence.jpg", "/assets/jobs/21_suzi_fence.jpg"] },
  { title: "Tina's Redwood & Stainless Steel Potting Station", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/11_tina_potting.jpg", "/assets/jobs/11_tina_potting.jpg"], caseStudy: "/case-studies/tina-potting-station" },
  { title: "Peggy's Back Yard Dog Fence", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/cal-peggy-fence.jpg", "/assets/jobs/cal-peggy-fence.jpg"], caseStudy: "/case-studies/peggy-backyard-fence" },
  { title: "Kathy's Redwood Crawlspace Cover", location: "Santa Clara County, CA", published: true, images: ["/assets/jobs/16_kathy_crawlspace.jpg", "/assets/jobs/16_kathy_crawlspace.jpg"] },
  { title: "Leslie's Twin Fence", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/15_leslie_fence.jpg", "/assets/jobs/15_leslie_fence.jpg"] },
  { title: "Marsha's Dual Bay Door Garden Bed Cover", location: "Santa Clara County, CA", published: true, images: ["/assets/jobs/14_marsha_excluder.jpg", "/assets/jobs/14_marsha_excluder.jpg"] },
  { title: "Robin's Composite Deck & Redwood Awning", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/Robin-deck-after.jpg", "/assets/jobs/Robin-deck-after.jpg"], caseStudy: "/case-studies/composite-deck-awning" },
  { title: "Karen's Back Yard Sand-Set Runnen Patio", location: "Santa Clara County, CA", published: true, images: ["/assets/jobs/10_kerstin_patio.jpg", "/assets/jobs/10_kerstin_patio.jpg"] },
  { title: "Karen's Chicken Run Fence & Gate", location: "Santa Clara County, CA", published: true, images: ["/assets/jobs/fynn-karen-fence.jpg", "/assets/jobs/fynn-karen-fence.jpg"] },
  { title: "Kay-Marie's Tomato Protection Squirrel Excluder", location: "Santa Clara County, CA", published: true, images: ["/assets/jobs/07_kay_excluder.jpg", "/assets/jobs/07_kay_excluder.jpg"] },
  { title: "Tina's Split Design Coffee Table & Umbrella Base", location: "San Mateo County, CA", published: true, images: ["/assets/jobs/11_tina_table.jpg", "/assets/jobs/11_tina_table.jpg"] },
  { title: "Michele's Redwood Garden Box", location: "Santa Clara County, CA", published: true, images: ["/assets/jobs/04_michele_gardenbox.jpg", "/assets/jobs/04_michele_gardenbox.jpg"] },
  { title: "Amy's Outdoor Table Sand and Restain", location: "San Mateo County, CA", published: false, images: ["/assets/jobs/cal-fynn-amy-table.jpg", "/assets/jobs/cal-fynn-amy-table.jpg"] },
  { title: "Ruthellen's Redwood Garden Box", location: "San Mateo County, CA", published: false, images: ["/assets/jobs/fynn-digging-ruthellen.jpg", "/assets/jobs/fynn-digging-ruthellen.jpg"] },
  { title: "Kamala's Custom Window Sill Planters", location: "San Mateo County, CA", published: false, images: ["/assets/jobs/cal-fynn-garden-box.jpg", "/assets/jobs/cal-fynn-garden-box.jpg"] },
  { title: "Susanne's Wrap Around Storage Bench", location: "San Mateo County, CA", published: false, images: ["/assets/jobs/27_susanne_bench.jpg", "/assets/jobs/27_susanne_bench.jpg"] },
  { title: "Leah's Black Oak Fireplace Topper", location: "San Mateo County, CA", published: false, images: ["/assets/jobs/28_leah_table.jpg", "/assets/jobs/28_leah_table.jpg"] },
  { title: "Jane & Glenn's Teak Bench Refinishing", location: "San Mateo County, CA", published: false, images: ["/assets/jobs/jane_teakbench.jpg", "/assets/cal-fynn-outdoor-design.jpg"] },
  { title: "Suzi's Awning Demolition, Hauling, & Rebuild", location: "San Mateo County, CA", published: false, images: ["/assets/jobs/cal-fynn-robin-deck.jpg", "/assets/jobs/cal-fynn-robin-deck.jpg"] },
  { title: "Susan's Slate Grill Area", location: "Santa Clara County, CA", published: false, images: ["/assets/jobs/cal-fynn-tina.jpg", "/assets/jobs/cal-fynn-tina.jpg"] },
  { title: "Angela's Rinconada Garden Box", location: "Santa Clara County, CA", published: false, images: ["/assets/jobs/ignite-and-cal-after.jpg", "/assets/jobs/ignite-and-cal-after.jpg"] },
]
