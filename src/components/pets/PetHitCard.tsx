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
    <a className="petCard" href={`/pets/${hit.slug}`}>
      <div className="petCard__image">
        {hit.image ? (
          <img src={hit.image} alt={hit.name} loading="lazy" />
        ) : (
          <div className="petCard__placeholder" />
        )}
        {hit.status && hit.status !== 'available' && (
          <span className="petCard__badge">{hit.status}</span>
        )}
      </div>
      <div className="petCard__body">
        <h3>{hit.name}</h3>
        <p className="petCard__breed">{hit.breed}</p>
        <p className="petCard__breeder">{hit.breederName}</p>
        <div className="petCard__footer">
          <span>{hit.gender}</span>
          {typeof hit.price === 'number' && <span>${hit.price.toLocaleString()}</span>}
        </div>
      </div>
    </a>
  )
}
