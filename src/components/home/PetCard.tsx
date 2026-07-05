import Link from 'next/link'
import type { Breed, Breeder, Media, Pet } from '@/payload-types'

export function PetCard({ pet }: { pet: Pet }) {
  const breed = pet.breed as Breed
  const breeder = pet.breeder as Breeder
  const image = pet.images?.[0] as Media | undefined

  return (
    <Link
      href={`/pets/${pet.slug}`}
      className="block w-56 shrink-0 snap-start overflow-hidden rounded-xl border border-gray-200 bg-white text-inherit no-underline transition-colors hover:border-gray-900"
    >
      <div className="relative aspect-square bg-gray-100">
        {image?.url ? (
          <img
            className="h-full w-full object-cover"
            src={image.url}
            alt={pet.name}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
        {pet.status && pet.status !== 'available' && (
          <span className="absolute top-2 right-2 rounded bg-gray-900 px-2 py-0.5 text-xs uppercase text-white">
            {pet.status}
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <h3 className="m-0 mb-1 truncate text-lg leading-6 text-gray-900">{pet.name}</h3>
        <p className="m-0 truncate text-sm text-gray-500">{breed?.name}</p>
        <p className="m-0 mb-2 truncate text-[13px] text-gray-500">{breeder?.businessName}</p>
        {typeof pet.price === 'number' && (
          <p className="m-0 text-sm font-semibold text-gray-900">
            Rp{pet.price.toLocaleString('id-ID')}
          </p>
        )}
      </div>
    </Link>
  )
}
