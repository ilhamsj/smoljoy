import type { Breed, Breeder, Media } from '@/payload-types'

export function BreederCard({ breeder }: { breeder: Breeder }) {
  const avatar = breeder.avatar as Media | undefined
  const location = [breeder.location?.city, breeder.location?.state].filter(Boolean).join(', ')
  const breeds = ((breeder.breeds ?? []) as Breed[]).map((breed) => breed.name).filter(Boolean)

  return (
    <a
      href={`/breeders/${breeder.slug}`}
      className="block w-56 shrink-0 snap-start overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950 text-inherit no-underline transition-colors hover:border-white"
    >
      <div className="relative aspect-square bg-neutral-800">
        {avatar?.url ? (
          <img
            className="h-full w-full object-cover"
            src={avatar.url}
            alt={breeder.businessName}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-neutral-700" />
        )}
        {breeder.verificationStatus === 'verified' && (
          <span className="absolute top-2 right-2 rounded bg-white px-2 py-0.5 text-xs uppercase text-black">
            Verified
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <h3 className="m-0 mb-1 truncate text-lg leading-6">{breeder.businessName}</h3>
        {location && <p className="m-0 truncate text-sm opacity-80">{location}</p>}
        {breeds.length > 0 && (
          <p className="m-0 mt-2 truncate text-[13px] opacity-60">{breeds.join(', ')}</p>
        )}
      </div>
    </a>
  )
}
