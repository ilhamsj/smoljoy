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
    <a className="breederCard" href={`/breeders/${hit.slug}`}>
      <div className="breederCard__image">
        {hit.image ? (
          <img src={hit.image} alt={hit.businessName} loading="lazy" />
        ) : (
          <div className="breederCard__placeholder" />
        )}
        {hit.verificationStatus === 'verified' && (
          <span className="breederCard__badge">Verified</span>
        )}
      </div>
      <div className="breederCard__body">
        <h3>{hit.businessName}</h3>
        {location && <p className="breederCard__location">{location}</p>}
        {hit.breeds && hit.breeds.length > 0 && (
          <p className="breederCard__breeds">{hit.breeds.join(', ')}</p>
        )}
      </div>
    </a>
  )
}
