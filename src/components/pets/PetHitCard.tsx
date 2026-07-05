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
      className="block overflow-hidden rounded-xl border border-gray-200 bg-white text-inherit no-underline transition-colors hover:border-gray-400"
      href={`/pets/${hit.slug}`}
    >
      <div className="relative aspect-square bg-gray-100">
        {hit.image ? (
          <img
            className="h-full w-full object-cover"
            src={hit.image}
            alt={hit.name}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
        {hit.status && hit.status !== 'available' && (
          <span className="absolute top-2 right-2 rounded bg-gray-900 px-2 py-0.5 text-xs uppercase text-white">
            {hit.status}
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <h3 className="m-0 mb-1 text-lg leading-6 text-gray-900">{hit.name}</h3>
        <p className="m-0 text-sm text-gray-500">{hit.breed}</p>
        <p className="m-0 mb-2 text-[13px] text-gray-400">{hit.breederName}</p>
        <div className="flex justify-between text-sm text-gray-900">
          <span>{hit.gender}</span>
          {typeof hit.price === 'number' && <span>Rp{hit.price.toLocaleString('id-ID')}</span>}
        </div>
      </div>
    </Link>
  )
}
