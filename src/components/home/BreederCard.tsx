import Link from 'next/link'
import type { Breed, Breeder, City, Media, Province } from '@/payload-types'
import { formatCityName } from '@/lib/format'

export function BreederCard({ breeder }: { breeder: Breeder }) {
  const avatar = breeder.avatar as Media | undefined
  const city = breeder.location?.city as City | null | undefined
  const province = breeder.location?.province as Province | null | undefined
  const location = [formatCityName(city?.name), province?.name].filter(Boolean).join(', ')
  const breeds = ((breeder.breeds ?? []) as Breed[]).map((breed) => breed.name).filter(Boolean)

  return (
    <Link
      href={`/breeders/${breeder.slug}`}
      className="block w-56 shrink-0 snap-start overflow-hidden rounded-xl border border-gray-200 bg-white text-inherit no-underline transition-colors hover:border-gray-900"
    >
      <div className="relative aspect-square bg-gray-100">
        {avatar?.url ? (
          <img
            className="h-full w-full object-cover"
            src={avatar.url}
            alt={breeder.businessName}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
        {breeder.verificationStatus === 'verified' && (
          <span className="absolute top-2 right-2 rounded bg-green-50 px-2 py-0.5 text-xs uppercase text-green-700">
            ✓ Verified
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <h3 className="m-0 mb-1 truncate text-lg leading-6 text-gray-900">
          {breeder.businessName}
        </h3>
        {location && <p className="m-0 truncate text-sm text-gray-500">{location}</p>}
        {breeds.length > 0 && (
          <p className="m-0 mt-2 truncate text-[13px] text-gray-500">{breeds.join(', ')}</p>
        )}
      </div>
    </Link>
  )
}
