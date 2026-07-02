import { faker } from '@faker-js/faker'
import { Breed, Breeder, City, Province } from '@/payload-types'
import type { BasePayload } from 'payload'

const INDONESIAN_CITIES: { city: string; province: string }[] = [
  { city: 'KOTA ADM. JAKARTA PUSAT', province: 'DKI Jakarta' },
  { city: 'KOTA BANDUNG', province: 'Jawa Barat' },
  { city: 'KOTA SURABAYA', province: 'Jawa Timur' },
  { city: 'KOTA YOGYAKARTA', province: 'Daerah Istimewa Yogyakarta' },
  { city: 'KOTA SEMARANG', province: 'Jawa Tengah' },
  { city: 'KOTA DENPASAR', province: 'Bali' },
  { city: 'KOTA MEDAN', province: 'Sumatera Utara' },
  { city: 'KOTA MAKASSAR', province: 'Sulawesi Selatan' },
  { city: 'KOTA MALANG', province: 'Jawa Timur' },
  { city: 'KOTA BOGOR', province: 'Jawa Barat' },
]

const BREEDER_COUNT = 50

function pickBreeds(breeds: Breed[], count: number) {
  return faker.helpers.arrayElements(breeds, { min: 1, max: count }).map((b) => b.id)
}

export async function breederSeed(
  payload: BasePayload,
  breeds: Breed[],
  provinces: Province[],
  cities: City[],
) {
  const existing = await payload.find({ collection: 'breeders', limit: 1 })
  if (existing.totalDocs > 0) {
    payload.logger.info('breeders: already seeded, skipping')
    return payload
      .find({ collection: 'breeders', limit: BREEDER_COUNT * 2 })
      .then((res) => res.docs)
  }

  const provinceByName = new Map(provinces.map((province) => [province.name, province.id]))
  const cityByName = new Map(cities.map((city) => [city.name, city.id]))

  const dogBreeds = breeds.filter((b) => b.species === 'dog')
  const catBreeds = breeds.filter((b) => b.species === 'cat')

  const breeders: Breeder[] = []
  for (let i = 0; i < BREEDER_COUNT; i++) {
    const isDogBreeder = i % 2 === 0
    const speciesBreeds = isDogBreeder ? dogBreeds : catBreeds
    const location = faker.helpers.arrayElement(INDONESIAN_CITIES)
    const suffix = isDogBreeder ? 'Kennel' : 'Cattery'
    const businessName = `${faker.person.lastName()} ${suffix}`
    const email = faker.internet.email({ provider: 'example.com' }).toLowerCase()

    const user = await payload.create({
      collection: 'users',
      data: { email, password: email },
    })

    const breeder = await payload.create({
      collection: 'breeders',
      data: {
        user: user.id,
        businessName,
        slug: faker.helpers.slugify(`${businessName}-${i}`).toLowerCase(),
        bio: undefined,
        breeds: pickBreeds(speciesBreeds, 3),
        location: {
          address: faker.location.streetAddress(),
          city: cityByName.get(location.city),
          province: provinceByName.get(location.province),
          zip: faker.location.zipCode(),
        },
        yearsExperience: faker.number.int({ min: 1, max: 20 }),
        contactPhone: faker.phone.number(),
        verificationStatus: faker.helpers.arrayElement(['pending', 'verified', 'verified']),
        status: 'active',
      },
    })
    breeders.push(breeder)

    if ((i + 1) % 10 === 0) {
      payload.logger.info(`breeders: seeded ${i + 1}/${BREEDER_COUNT}`)
    }
  }

  return breeders
}
