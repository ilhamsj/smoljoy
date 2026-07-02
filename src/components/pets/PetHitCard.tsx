import Link from 'next/link'
import type { BaseHit } from 'instantsearch.js'

export type PetHit = BaseHit & {
  name: string
  slug: string
  breed?: string
  breederName?: string
  gender?: string
  price?: number
  status?: string
  image?: string
}

export function PetHitCard({ hit }: { hit: PetHit }) {
  return (
    <Link
      className="block overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950 text-inherit no-underline transition-colors hover:border-white"
      href={`/pets/${hit.slug}`}
    >
      <div className="relative aspect-square bg-neutral-800">
        {hit.image ? (
          <img
            className="h-full w-full object-cover"
            src={hit.image}
            alt={hit.name}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-neutral-700" />
        )}
        {hit.status && hit.status !== 'available' && (
          <span className="absolute top-2 right-2 rounded bg-white px-2 py-0.5 text-xs uppercase text-black">
            {hit.status}
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <h3 className="m-0 mb-1 text-lg leading-6">{hit.name}</h3>
        <p className="m-0 text-sm opacity-80">{hit.breed}</p>
        <p className="m-0 mb-2 text-[13px] opacity-60">{hit.breederName}</p>
        <div className="flex justify-between text-sm opacity-90">
          <span>{hit.gender}</span>
          {typeof hit.price === 'number' && <span>${hit.price.toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  )
}
