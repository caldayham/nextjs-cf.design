import type { Metadata } from 'next'
import SpecialtyLayout from '@/components/specialties/SpecialtyLayout'
import type { SpecialtyFrontmatter } from '@/components/specialties/SpecialtyLayout'

export const metadata: Metadata = {
  title: 'Tree & Shrub Removal — CF Design',
  description: 'Safe removal of trees, shrubs, and stumps with full cleanup — by CF Design in Palo Alto.',
}

const frontmatter: SpecialtyFrontmatter = {
  title: 'Tree & Shrub Removal',
  description: 'Safe removal of trees, shrubs, and stumps with full cleanup.',
}

export default function TreeShrubRemovalPage() {
  return (
    <SpecialtyLayout frontmatter={frontmatter} currentHref="/specialties/tree-shrub-removal">
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> Coming Soon
      </h2>
      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Content for this specialty is on the way.
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We&apos;re putting together examples of our tree and shrub removal work. In the meantime, feel free to reach out — we&apos;d love to hear about your project.
      </p>
    </SpecialtyLayout>
  )
}
