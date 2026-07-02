import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import type { Breed, Breeder, Media } from '@/payload-types'

export default async function PetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pets',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const pet = docs[0]
  if (!pet) notFound()

  const breed = pet.breed as Breed
  const breeder = pet.breeder as Breeder
  const images = (pet.images ?? []) as Media[]

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 p-11 md:grid-cols-2">
      <div className="grid content-start grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="aspect-square overflow-hidden rounded-xl bg-neutral-800">
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
          <a
            className="mt-1 inline-block text-sm text-inherit opacity-70"
            href={`/breeders/${breeder.slug}`}
          >
            {breeder.businessName}
          </a>
        )}

        <dl className="my-6 grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <dt className="text-xs uppercase opacity-60">Gender</dt>
            <dd className="m-0 text-[15px]">{pet.gender}</dd>
          </div>
          {pet.dateOfBirth && (
            <div>
              <dt className="text-xs uppercase opacity-60">Date of birth</dt>
              <dd className="m-0 text-[15px]">{new Date(pet.dateOfBirth).toLocaleDateString()}</dd>
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
  )
}
