import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import type { Breed, Breeder, Litter, Media, ParentAnimal, Pet } from '@/payload-types'

export default async function PetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pets',
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 1,
  })

  const pet = docs[0]
  if (!pet) notFound()

  const breed = pet.breed as Breed
  const breeder = pet.breeder as Breeder
  const litter = pet.litter as Litter | null | undefined
  const sire = litter?.sire as ParentAnimal | null | undefined
  const dam = litter?.dam as ParentAnimal | null | undefined
  const images = (pet.images ?? []) as Media[]

  const siblings = litter
    ? (
        await payload.find({
          collection: 'pets',
          where: { litter: { equals: litter.id }, id: { not_equals: pet.id } },
          depth: 1,
          limit: 8,
          sort: 'name',
        })
      ).docs
    : []

  return (
    <div className="mx-auto max-w-5xl p-11">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="grid content-start grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
          {images.length > 0 ? (
            images.map((image) => (
              <div
                key={image.id}
                className="aspect-square overflow-hidden rounded-xl bg-neutral-800"
              >
                <img
                  className="h-full w-full object-cover"
                  src={image.url ?? undefined}
                  alt={pet.name}
                />
              </div>
            ))
          ) : (
            <div className="aspect-square rounded-xl bg-neutral-700" />
          )}
        </div>

        <div>
          <h1 className="mb-2">{pet.name}</h1>
          {pet.status && pet.status !== 'available' && (
            <span className="mb-3 inline-block rounded bg-white px-2 py-0.5 text-xs uppercase text-black">
              {pet.status}
            </span>
          )}

          <p className="m-0 text-base opacity-80">{breed?.name}</p>
          {breeder?.slug && (
            <Link
              className="mt-1 inline-block text-sm text-inherit opacity-70"
              href={`/breeders/${breeder.slug}`}
            >
              {breeder.businessName}
            </Link>
          )}

          {(sire || dam) && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: 'Sire', animal: sire },
                { label: 'Dam', animal: dam },
              ].map(({ label, animal }) => {
                if (!animal) return null
                const animalBreed = animal.breed as Breed | undefined
                const animalImage = animal.images?.[0] as Media | undefined
                const content = (
                  <>
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-neutral-800">
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
                      <p className="m-0 text-sm">{animal.name}</p>
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
                    className="flex items-center gap-2.5 rounded-lg border border-neutral-700 p-2.5 text-inherit no-underline transition-colors hover:border-white"
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-lg border border-neutral-700 p-2.5"
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          )}

          <dl className="my-6 grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-xs uppercase opacity-60">Gender</dt>
              <dd className="m-0 text-[15px]">{pet.gender}</dd>
            </div>
            {pet.dateOfBirth && (
              <div>
                <dt className="text-xs uppercase opacity-60">Date of birth</dt>
                <dd className="m-0 text-[15px]">
                  {new Date(pet.dateOfBirth).toLocaleDateString()}
                </dd>
              </div>
            )}
            {pet.color && (
              <div>
                <dt className="text-xs uppercase opacity-60">Color</dt>
                <dd className="m-0 text-[15px]">{pet.color}</dd>
              </div>
            )}
            {typeof pet.weight === 'number' && (
              <div>
                <dt className="text-xs uppercase opacity-60">Weight</dt>
                <dd className="m-0 text-[15px]">{pet.weight} lbs</dd>
              </div>
            )}
            {pet.registryName && (
              <div>
                <dt className="text-xs uppercase opacity-60">Registry</dt>
                <dd className="m-0 text-[15px]">{pet.registryName}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs uppercase opacity-60">Microchipped</dt>
              <dd className="m-0 text-[15px]">{pet.microchipped ? 'Yes' : 'No'}</dd>
            </div>
          </dl>

          {typeof pet.price === 'number' && (
            <div className="mb-6 flex items-baseline gap-3 text-2xl font-semibold">
              <span>${pet.price.toLocaleString()}</span>
              {typeof pet.depositAmount === 'number' && (
                <span className="text-[13px] font-normal opacity-60">
                  ${pet.depositAmount.toLocaleString()} deposit
                </span>
              )}
            </div>
          )}

          {pet.temperamentNotes && (
            <div className="mt-6 border-t border-neutral-700 pt-6">
              <h2 className="m-0 mb-3 text-base">Temperament</h2>
              <RichText data={pet.temperamentNotes} />
            </div>
          )}

          {pet.vaccinations && pet.vaccinations.length > 0 && (
            <div className="mt-6 border-t border-neutral-700 pt-6">
              <h2 className="m-0 mb-3 text-base">Vaccinations</h2>
              <ul className="m-0 list-disc pl-5">
                {pet.vaccinations.map((vaccination, index) => (
                  <li key={vaccination.id ?? index}>
                    {vaccination.name}
                    {vaccination.date && ` — ${new Date(vaccination.date).toLocaleDateString()}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {siblings.length > 0 && litter && (
        <div className="mt-10 border-t border-neutral-700 pt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="m-0 text-lg font-semibold">More from this litter</h2>
            <Link
              href={`/litters/${litter.slug}`}
              className="shrink-0 text-sm text-neutral-300 no-underline transition-colors hover:text-white"
            >
              Lihat semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {(siblings as Pet[]).map((sibling) => {
              const siblingImage = sibling.images?.[0] as Media | undefined
              return (
                <Link
                  key={sibling.id}
                  href={`/pets/${sibling.slug}`}
                  className="block overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950 text-inherit no-underline transition-colors hover:border-white"
                >
                  <div className="aspect-square bg-neutral-800">
                    {siblingImage?.url ? (
                      <img
                        className="h-full w-full object-cover"
                        src={siblingImage.url}
                        alt={sibling.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-700" />
                    )}
                  </div>
                  <div className="px-3 py-2.5">
                    <h3 className="m-0 truncate text-sm">{sibling.name}</h3>
                    {typeof sibling.price === 'number' && (
                      <p className="m-0 text-xs opacity-70">${sibling.price.toLocaleString()}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
