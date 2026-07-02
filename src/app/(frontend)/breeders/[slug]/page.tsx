import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import type { Breed, Media, Pet, Province } from '@/payload-types'

export default async function BreederPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'breeders',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const breeder = docs[0]
  if (!breeder) notFound()

  const [{ docs: litters }, { docs: pets }] = await Promise.all([
    payload.find({
      collection: 'litters',
      where: { breeder: { equals: breeder.id } },
      depth: 1,
      limit: 20,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'pets',
      where: { breeder: { equals: breeder.id }, status: { equals: 'available' } },
      depth: 1,
      limit: 20,
      sort: '-createdAt',
    }),
  ])

  const breeds = (breeder.breeds ?? []) as Breed[]
  const avatar = breeder.avatar as Media | null | undefined
  const coverImage = breeder.coverImage as Media | null | undefined
  const province = breeder.location?.province as Province | null | undefined
  const location = [breeder.location?.city, province?.name].filter(Boolean).join(', ')

  return (
    <div className="mx-auto max-w-3xl px-11 pb-11">
      {coverImage?.url && (
        <div className="-mx-11 mb-6 aspect-[4/1] overflow-hidden bg-neutral-800">
          <img className="h-full w-full object-cover" src={coverImage.url} alt="" />
        </div>
      )}

      <div className={`flex items-center gap-5 ${coverImage?.url ? '' : 'pt-11'}`}>
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-neutral-800">
          {avatar?.url ? (
            <img
              className="h-full w-full object-cover"
              src={avatar.url}
              alt={breeder.businessName}
            />
          ) : (
            <div className="h-full w-full bg-neutral-700" />
          )}
        </div>
        <div>
          <h1 className="mb-1 flex items-center gap-2.5">
            {breeder.businessName}
            {breeder.verificationStatus === 'verified' && (
              <span className="rounded bg-white px-2 py-0.5 text-xs uppercase text-black">
                Verified
              </span>
            )}
          </h1>
          {location && <p className="m-0 opacity-80">{location}</p>}
          {breeds.length > 0 && (
            <p className="m-0 mt-1 text-sm opacity-60">{breeds.map((b) => b.name).join(', ')}</p>
          )}
        </div>
      </div>

      <dl className="my-6 flex gap-8">
        {typeof breeder.yearsExperience === 'number' && (
          <div>
            <dt className="text-xs uppercase opacity-60">Years experience</dt>
            <dd className="m-0 text-[15px]">{breeder.yearsExperience}</dd>
          </div>
        )}
        {breeder.contactPhone && (
          <div>
            <dt className="text-xs uppercase opacity-60">Contact</dt>
            <dd className="m-0 text-[15px]">{breeder.contactPhone}</dd>
          </div>
        )}
      </dl>

      {breeder.bio && (
        <div className="mt-6 border-t border-neutral-700 pt-6">
          <h2 className="m-0 mb-3 text-base">About</h2>
          <RichText data={breeder.bio} />
        </div>
      )}

      {breeder.certifications && breeder.certifications.length > 0 && (
        <div className="mt-6 border-t border-neutral-700 pt-6">
          <h2 className="m-0 mb-3 text-base">Certifications</h2>
          <ul className="m-0 list-disc pl-5">
            {breeder.certifications.map((cert, index) => (
              <li key={cert.id ?? index}>
                {cert.name}
                {cert.issuer && ` — ${cert.issuer}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {pets.length > 0 && (
        <div className="mt-6 border-t border-neutral-700 pt-6">
          <h2 className="m-0 mb-3 text-base">Available pets</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            {(pets as Pet[]).map((pet) => (
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

      {litters.length > 0 && (
        <div className="mt-6 border-t border-neutral-700 pt-6">
          <h2 className="m-0 mb-3 text-base">Litters</h2>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {litters.map((litter) => (
              <li
                key={litter.id}
                className="flex justify-between border-b border-neutral-700 py-2.5 last:border-b-0"
              >
                <span>{litter.label}</span>
                {typeof litter.priceMin === 'number' && (
                  <span className="opacity-70">
                    ${litter.priceMin.toLocaleString()}
                    {typeof litter.priceMax === 'number' &&
                      litter.priceMax !== litter.priceMin &&
                      ` – $${litter.priceMax.toLocaleString()}`}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
