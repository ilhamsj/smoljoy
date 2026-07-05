import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import type { Breed, City, Media, Pet, Province } from '@/payload-types'
import { formatCityName } from '@/lib/format'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

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
  const city = breeder.location?.city as City | null | undefined
  const province = breeder.location?.province as Province | null | undefined
  const location = [formatCityName(city?.name), province?.name].filter(Boolean).join(', ')

  return (
    <div className="mx-auto max-w-3xl px-6 pb-11">
      <div className="py-4">
        <Breadcrumb
          items={[
            { label: 'Beranda', href: '/' },
            { label: 'Cari Breeder', href: '/breeders' },
            { label: breeder.businessName },
          ]}
        />
      </div>

      {coverImage?.url && (
        <div className="mb-6 aspect-[4/1] overflow-hidden rounded-xl bg-gray-100">
          <img className="h-full w-full object-cover" src={coverImage.url} alt="" />
        </div>
      )}

      <div className="flex items-center gap-5">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
          {avatar?.url ? (
            <img
              className="h-full w-full object-cover"
              src={avatar.url}
              alt={breeder.businessName}
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>
        <div>
          <h1 className="m-0 mb-1 flex items-center gap-2.5 text-xl font-bold text-gray-900">
            {breeder.businessName}
            {breeder.verificationStatus === 'verified' && (
              <span className="flex items-center gap-1 rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                ✓ Terverifikasi
              </span>
            )}
          </h1>
          {location && <p className="m-0 text-sm text-gray-500">{location}</p>}
          {breeds.length > 0 && (
            <p className="m-0 mt-1 text-sm text-gray-500">{breeds.map((b) => b.name).join(', ')}</p>
          )}
        </div>
      </div>

      <dl className="my-6 flex gap-8">
        {typeof breeder.yearsExperience === 'number' && (
          <div>
            <dt className="text-xs uppercase text-gray-500">Pengalaman</dt>
            <dd className="m-0 text-[15px] text-gray-900">{breeder.yearsExperience} tahun</dd>
          </div>
        )}
        {breeder.contactPhone && (
          <div>
            <dt className="text-xs uppercase text-gray-500">Kontak</dt>
            <dd className="m-0 text-[15px] text-gray-900">{breeder.contactPhone}</dd>
          </div>
        )}
      </dl>

      {breeder.bio && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="m-0 mb-3 text-sm font-semibold text-gray-900">Tentang</h2>
          <div className="text-sm text-gray-700">
            <RichText data={breeder.bio} />
          </div>
        </div>
      )}

      {breeder.certifications && breeder.certifications.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="m-0 mb-3 text-sm font-semibold text-gray-900">Sertifikasi</h2>
          <ul className="m-0 list-disc pl-5 text-sm text-gray-700">
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
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="m-0 mb-3 text-sm font-semibold text-gray-900">Pet Tersedia</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {(pets as Pet[]).map((pet) => {
              const petImage = pet.images?.[0] as Media | undefined
              return (
                <Link
                  key={pet.id}
                  className="block overflow-hidden rounded-xl border border-gray-200 bg-white text-inherit no-underline transition-colors hover:border-gray-300"
                  href={`/pets/${pet.slug}`}
                >
                  <div className="aspect-square bg-gray-100">
                    {petImage?.url ? (
                      <img
                        className="h-full w-full object-cover"
                        src={petImage.url}
                        alt={pet.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200" />
                    )}
                  </div>
                  <div className="px-3 py-2.5">
                    <h3 className="m-0 truncate text-sm text-gray-900">{pet.name}</h3>
                    {typeof pet.price === 'number' && (
                      <p className="m-0 text-xs text-gray-500">
                        Rp{pet.price.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {litters.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="m-0 mb-3 text-sm font-semibold text-gray-900">Litter</h2>
          <ul className="m-0 flex list-none flex-col gap-0 p-0">
            {litters.map((litter) => (
              <li
                key={litter.id}
                className="flex justify-between border-b border-gray-100 py-2.5 text-sm last:border-b-0"
              >
                <Link
                  className="text-blue-600 no-underline hover:underline"
                  href={`/litters/${litter.slug}`}
                >
                  {litter.label}
                </Link>
                {typeof litter.priceMin === 'number' && (
                  <span className="text-gray-500">
                    Rp{litter.priceMin.toLocaleString('id-ID')}
                    {typeof litter.priceMax === 'number' &&
                      litter.priceMax !== litter.priceMin &&
                      ` – Rp${litter.priceMax.toLocaleString('id-ID')}`}
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
