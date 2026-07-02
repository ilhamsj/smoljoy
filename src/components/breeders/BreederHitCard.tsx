import Link from 'next/link'
import type { BaseHit } from 'instantsearch.js'

export type BreederHit = BaseHit & {
  businessName: string
  slug: string
  city?: string
  state?: string
  breeds?: string[]
  verificationStatus?: string
  status?: string
  image?: string
}

export function BreederHitCard({ hit }: { hit: BreederHit }) {
  const location = [hit.city, hit.state].filter(Boolean).join(', ')

  return (
    <Link
      className="block overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950 text-inherit no-underline transition-colors hover:border-white"
      href={`/breeders/${hit.slug}`}
    >
      <div className="relative aspect-square bg-neutral-800">
        {hit.image ? (
          <img
            className="h-full w-full object-cover"
            src={hit.image}
            alt={hit.businessName}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-neutral-700" />
        )}
        {hit.verificationStatus === 'verified' && (
          <span className="absolute top-2 right-2 rounded bg-white px-2 py-0.5 text-xs uppercase text-black">
            Verified
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <h3 className="m-0 mb-1 text-lg leading-6">{hit.businessName}</h3>
        {location && <p className="m-0 text-sm opacity-80">{location}</p>}
        {hit.breeds && hit.breeds.length > 0 && (
          <p className="m-0 mt-1 text-[13px] opacity-60">{hit.breeds.join(', ')}</p>
        )}
      </div>
    </Link>
  )
}
