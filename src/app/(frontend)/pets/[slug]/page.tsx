import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import type { Breed, Breeder, Litter, Media, ParentAnimal, Pet } from '@/payload-types'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PetImageGallery } from '@/components/pets/PetImageGallery'
import { BreederProfileCard } from '@/components/breeders/BreederProfileCard'

const STATUS_LABEL: Record<string, string> = {
  available: 'Tersedia',
  reserved: 'Dipesan',
  sold: 'Terjual',
  'not-for-sale': 'Tidak dijual',
}

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

  const waHref = breeder?.contactPhone
    ? `https://wa.me/${breeder.contactPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
        `Halo, saya tertarik dengan ${pet.name} di Smoljoy.`,
      )}`
    : undefined

  const infoRows: { label: string; value: string }[] = [
    { label: 'Kategori', value: [breed?.species === 'cat' ? 'Kucing' : 'Anjing', breed?.name].filter(Boolean).join(' · ') },
    { label: 'Jenis kelamin', value: pet.gender === 'male' ? 'Jantan' : 'Betina' },
    ...(pet.dateOfBirth
      ? [{ label: 'Tanggal lahir', value: new Date(pet.dateOfBirth).toLocaleDateString('id-ID') }]
      : []),
    ...(pet.color ? [{ label: 'Warna', value: pet.color }] : []),
    ...(typeof pet.weight === 'number' ? [{ label: 'Berat', value: `${pet.weight} kg` }] : []),
    ...(pet.registryName ? [{ label: 'Registry', value: pet.registryName }] : []),
    { label: 'Microchip', value: pet.microchipped ? 'Ya' : 'Tidak' },
  ]

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: 'Beranda', href: '/' },
            { label: 'Cari Pet', href: '/pets' },
            ...(breed?.name ? [{ label: breed.name }] : []),
            { label: pet.name },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <PetImageGallery images={images} alt={pet.name} />
        </div>

        <div>
          <h1 className="m-0 mb-1 text-xl font-bold text-gray-900">{pet.name}</h1>
          <p className="m-0 text-sm text-gray-500">{breed?.name}</p>

          {pet.status && pet.status !== 'available' && (
            <span className="mt-3 inline-block rounded bg-gray-900 px-2 py-0.5 text-xs font-medium uppercase text-white">
              {STATUS_LABEL[pet.status] ?? pet.status}
            </span>
          )}

          {typeof pet.price === 'number' && (
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">
                Rp{pet.price.toLocaleString('id-ID')}
              </span>
              {typeof pet.depositAmount === 'number' && (
                <span className="text-[13px] text-gray-500">
                  DP Rp{pet.depositAmount.toLocaleString('id-ID')}
                </span>
              )}
            </div>
          )}

          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-full bg-rose-500 py-3 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-rose-600"
            >
              Hubungi Breeder
            </a>
          )}

          {siblings.length > 0 && litter && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="m-0 text-xs font-semibold text-gray-900">Saudara Sekandung</h2>
                <Link
                  href={`/litters/${litter.slug}`}
                  className="shrink-0 text-xs text-gray-500 no-underline transition-colors hover:text-gray-900"
                >
                  Lihat semua →
                </Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {(siblings as Pet[]).map((sibling) => {
                  const siblingImage = sibling.images?.[0] as Media | undefined
                  return (
                    <Link
                      key={sibling.id}
                      href={`/pets/${sibling.slug}`}
                      className="block w-20 shrink-0 text-inherit no-underline"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                        {siblingImage?.url ? (
                          <img
                            className="h-full w-full object-cover"
                            src={siblingImage.url}
                            alt={sibling.name}
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200" />
                        )}
                      </div>
                      <p className="m-0 mt-1 truncate text-xs text-gray-900">{sibling.name}</p>
                      {typeof sibling.price === 'number' && (
                        <p className="m-0 truncate text-xs text-gray-500">
                          Rp{sibling.price.toLocaleString('id-ID')}
                        </p>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {(sire || dam) && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: 'Sire', animal: sire },
                { label: 'Dam', animal: dam },
              ].map(({ label, animal }) => {
                if (!animal) return null
                const animalBreed = animal.breed as Breed | undefined
                const animalImage = animal.images?.[0] as Media | undefined
                const content = (
                  <>
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                      {animalImage?.url ? (
                        <img
                          className="h-full w-full object-cover"
                          src={animalImage.url}
                          alt={animal.name}
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200" />
                      )}
                    </div>
                    <div>
                      <p className="m-0 text-xs uppercase text-gray-500">{label}</p>
                      <p className="m-0 text-sm text-gray-900">{animal.name}</p>
                      {animalBreed?.name && (
                        <p className="m-0 text-xs text-gray-500">{animalBreed.name}</p>
                      )}
                    </div>
                  </>
                )
                return animal.slug ? (
                  <Link
                    key={label}
                    href={`/parents/${animal.slug}`}
                    className="flex items-center gap-2.5 rounded-lg border border-gray-200 p-2.5 text-inherit no-underline transition-colors hover:border-gray-300"
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-lg border border-gray-200 p-2.5"
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          )}

          {pet.temperamentNotes && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="m-0 mb-3 text-sm font-semibold text-gray-900">Tentang Pet Ini</h2>
              <div className="text-sm text-gray-700">
                <RichText data={pet.temperamentNotes} />
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="m-0 mb-3 text-sm font-semibold text-gray-900">Informasi Produk</h2>
            <dl className="m-0">
              {infoRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline gap-4 border-b border-gray-100 py-2.5 text-sm last:border-0"
                >
                  <dt className="w-28 shrink-0 text-gray-500">{row.label}</dt>
                  <dd className="m-0 text-gray-900">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {pet.vaccinations && pet.vaccinations.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="m-0 mb-3 text-sm font-semibold text-gray-900">Vaksinasi</h2>
              <ul className="m-0 list-disc pl-5 text-sm text-gray-700">
                {pet.vaccinations.map((vaccination, index) => (
                  <li key={vaccination.id ?? index}>
                    {vaccination.name}
                    {vaccination.date && ` — ${new Date(vaccination.date).toLocaleDateString('id-ID')}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {breeder && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="m-0 mb-3 text-sm font-semibold text-gray-900">Breeder</h2>
              <BreederProfileCard breeder={breeder} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
