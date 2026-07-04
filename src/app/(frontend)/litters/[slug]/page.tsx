import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import type { Breed, Breeder, Media, ParentAnimal, Pet } from '@/payload-types'

export default async function LitterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'litters',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const litter = docs[0]
  if (!litter) notFound()

  const breed = litter.breed as Breed
  const breeder = litter.breeder as Breeder
  const dam = litter.dam as ParentAnimal | null | undefined
  const sire = litter.sire as ParentAnimal | null | undefined
  const coverImages = (litter.coverImages ?? []) as Media[]

  const { docs: puppies } = await payload.find({
    collection: 'pets',
    where: { litter: { equals: litter.id } },
    depth: 1,
    limit: 50,
    sort: 'name',
  })

  return (
    <div className="mx-auto max-w-3xl px-11 pb-11">
      <div className="grid content-start grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 pt-11">
        {coverImages.length > 0 ? (
          coverImages.map((image) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-xl bg-neutral-800"
            >
              <img
                className="h-full w-full object-cover"
                src={image.url ?? undefined}
                alt={litter.label}
              />
            </div>
          ))
        ) : (
          <div className="aspect-square rounded-xl bg-neutral-700" />
        )}
      </div>

      <div className="mt-6">
        <h1 className="mb-1 flex items-center gap-2.5">
          {litter.label}
          {litter.status && (
            <span className="rounded bg-white px-2 py-0.5 text-xs uppercase text-black">
              {litter.status}
            </span>
          )}
        </h1>
        <p className="m-0 text-base opacity-80">{breed?.name}</p>
        {breeder?.slug && (
          <Link
            className="mt-1 inline-block text-sm text-inherit opacity-70"
            href={`/breeders/${breeder.slug}`}
          >
            {breeder.businessName}
          </Link>
        )}
      </div>

      <dl className="my-6 grid grid-cols-2 gap-x-6 gap-y-3">
        {litter.dateOfBirth && (
          <div>
            <dt className="text-xs uppercase opacity-60">Date of birth</dt>
            <dd className="m-0 text-[15px]">{new Date(litter.dateOfBirth).toLocaleDateString()}</dd>
          </div>
        )}
        {litter.expectedReadyDate && (
          <div>
            <dt className="text-xs uppercase opacity-60">Ready date</dt>
            <dd className="m-0 text-[15px]">
              {new Date(litter.expectedReadyDate).toLocaleDateString()}
            </dd>
          </div>
        )}
        {typeof litter.totalPuppies === 'number' && (
          <div>
            <dt className="text-xs uppercase opacity-60">Total puppies</dt>
            <dd className="m-0 text-[15px]">{litter.totalPuppies}</dd>
          </div>
        )}
      </dl>

      {(sire || dam) && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          {[
            { label: 'Sire', animal: sire },
            { label: 'Dam', animal: dam },
          ].map(({ label, animal }) => {
            if (!animal) return null
            const animalBreed = animal.breed as Breed | undefined
            const animalImage = animal.images?.[0] as Media | undefined
            const content = (
              <>
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-neutral-800">
                  {animalImage?.url ? (
                    <img
                      className="h-full w-full object-cover"
                      src={animalImage.url}
                      alt={animal.name}
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-700" />
                  )}
                </div>
                <div>
                  <p className="m-0 text-xs uppercase opacity-60">{label}</p>
                  <p className="m-0 text-[15px]">{animal.name}</p>
                  {animalBreed?.name && (
                    <p className="m-0 text-xs opacity-60">{animalBreed.name}</p>
                  )}
                </div>
              </>
            )
            return animal.slug ? (
              <Link
                key={label}
                href={`/parents/${animal.slug}`}
                className="flex items-center gap-3 rounded-lg border border-neutral-700 p-3 text-inherit no-underline transition-colors hover:border-white"
              >
                {content}
              </Link>
            ) : (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-neutral-700 p-3">
                {content}
              </div>
            )
          })}
        </div>
      )}

      {typeof litter.priceMin === 'number' && (
        <div className="mb-6 text-2xl font-semibold">
          ${litter.priceMin.toLocaleString()}
          {typeof litter.priceMax === 'number' &&
            litter.priceMax !== litter.priceMin &&
            ` – $${litter.priceMax.toLocaleString()}`}
        </div>
      )}

      {litter.description && (
        <div className="mt-6 border-t border-neutral-700 pt-6">
          <h2 className="m-0 mb-3 text-base">About this litter</h2>
          <RichText data={litter.description} />
        </div>
      )}

      {litter.healthClearances && litter.healthClearances.length > 0 && (
        <div className="mt-6 border-t border-neutral-700 pt-6">
          <h2 className="m-0 mb-3 text-base">Health clearances</h2>
          <ul className="m-0 list-disc pl-5">
            {litter.healthClearances.map((clearance, index) => (
              <li key={clearance.id ?? index}>
                {clearance.test}
                {clearance.result && ` — ${clearance.result}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {puppies.length > 0 && (
        <div className="mt-6 border-t border-neutral-700 pt-6">
          <h2 className="m-0 mb-3 text-base">Puppies</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            {(puppies as Pet[]).map((pet) => (
              <Link
                key={pet.id}
                className="flex justify-between rounded-lg border border-neutral-700 px-4 py-3 text-inherit no-underline transition-colors hover:border-white"
                href={`/pets/${pet.slug}`}
              >
                <h3 className="m-0 text-sm">{pet.name}</h3>
                {typeof pet.price === 'number' && <span>${pet.price.toLocaleString()}</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
