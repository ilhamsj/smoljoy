import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Breed, Breeder, Litter, Media, ParentAnimal } from '@/payload-types'

export default async function ParentAnimalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'parent-animals',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const parent = docs[0]
  if (!parent) notFound()

  const breed = parent.breed as Breed
  const breeder = parent.breeder as Breeder
  const sire = parent.sire as ParentAnimal | null | undefined
  const dam = parent.dam as ParentAnimal | null | undefined
  const images = (parent.images ?? []) as Media[]

  const [{ docs: littersAsDam }, { docs: littersAsSire }] = await Promise.all([
    payload.find({
      collection: 'litters',
      where: { dam: { equals: parent.id } },
      depth: 0,
      limit: 20,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'litters',
      where: { sire: { equals: parent.id } },
      depth: 0,
      limit: 20,
      sort: '-createdAt',
    }),
  ])
  const litters = [...littersAsDam, ...littersAsSire] as Litter[]

  return (
    <div className="mx-auto max-w-3xl px-11 pb-11">
      <div className="grid content-start grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 pt-11">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-xl bg-neutral-800"
            >
              <img
                className="h-full w-full object-cover"
                src={image.url ?? undefined}
                alt={parent.name}
              />
            </div>
          ))
        ) : (
          <div className="aspect-square rounded-xl bg-neutral-700" />
        )}
      </div>

      <div className="mt-6">
        <h1 className="mb-1">{parent.name}</h1>
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

      {(sire?.name || dam?.name) && (
        <dl className="my-6 grid grid-cols-2 gap-x-6 gap-y-3">
          {sire?.name && (
            <div>
              <dt className="text-xs uppercase opacity-60">Sire</dt>
              <dd className="m-0 text-[15px]">
                {sire.slug ? (
                  <Link className="text-inherit no-underline hover:underline" href={`/parents/${sire.slug}`}>
                    {sire.name}
                  </Link>
                ) : (
                  sire.name
                )}
              </dd>
            </div>
          )}
          {dam?.name && (
            <div>
              <dt className="text-xs uppercase opacity-60">Dam</dt>
              <dd className="m-0 text-[15px]">
                {dam.slug ? (
                  <Link className="text-inherit no-underline hover:underline" href={`/parents/${dam.slug}`}>
                    {dam.name}
                  </Link>
                ) : (
                  dam.name
                )}
              </dd>
            </div>
          )}
        </dl>
      )}

      {parent.healthClearances && parent.healthClearances.length > 0 && (
        <div className="mt-6 border-t border-neutral-700 pt-6">
          <h2 className="m-0 mb-3 text-base">Health clearances</h2>
          <ul className="m-0 list-disc pl-5">
            {parent.healthClearances.map((clearance, index) => (
              <li key={clearance.id ?? index}>
                {clearance.test}
                {clearance.result && ` — ${clearance.result}`}
              </li>
            ))}
          </ul>
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
                <Link
                  className="text-inherit no-underline hover:underline"
                  href={`/litters/${litter.slug}`}
                >
                  {litter.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
