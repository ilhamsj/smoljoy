import type { Breed, Breeder, Media, Pet } from '@/payload-types'

export function PetCard({ pet }: { pet: Pet }) {
  const breed = pet.breed as Breed
  const breeder = pet.breeder as Breeder
  const image = pet.images?.[0] as Media | undefined

  return (
    <a
      href={`/pets/${pet.slug}`}
      className="block w-56 shrink-0 snap-start overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950 text-inherit no-underline transition-colors hover:border-white"
    >
      <div className="relative aspect-square bg-neutral-800">
        {image?.url ? (
          <img
            className="h-full w-full object-cover"
            src={image.url}
            alt={pet.name}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-neutral-700" />
        )}
        {pet.status && pet.status !== 'available' && (
          <span className="absolute top-2 right-2 rounded bg-white px-2 py-0.5 text-xs uppercase text-black">
            {pet.status}
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <h3 className="m-0 mb-1 truncate text-lg leading-6">{pet.name}</h3>
        <p className="m-0 truncate text-sm opacity-80">{breed?.name}</p>
        <p className="m-0 mb-2 truncate text-[13px] opacity-60">{breeder?.businessName}</p>
        {typeof pet.price === 'number' && (
          <p className="m-0 text-sm font-semibold opacity-90">${pet.price.toLocaleString()}</p>
        )}
      </div>
    </a>
  )
}
