import { Breed, Breeder } from '@/payload-types'
import type { BasePayload } from 'payload'

export async function breederSeed(payload: BasePayload, breeds: Breed[]) {
  const existing = await payload.find({ collection: 'breeders', limit: 10 })
  if (existing.totalDocs > 0) {
    payload.logger.info('breeders: already seeded, skipping')
    return existing.docs
  }

  const dogBreeds = breeds.filter((b) => b.species === 'dog')
  const catBreeds = breeds.filter((b) => b.species === 'cat')

  const breedersToCreate: {
    email: string
    businessName: string
    slug: string
    breeds: Breed[]
    city: string
    state: string
  }[] = [
    {
      email: 'goldenpaws.breeder@example.com',
      businessName: 'Golden Paws Kennel',
      slug: 'golden-paws-kennel',
      breeds: dogBreeds,
      city: 'Bandung',
      state: 'West Java',
    },
    {
      email: 'silkenwhiskers.breeder@example.com',
      businessName: 'Silken Whiskers Cattery',
      slug: 'silken-whiskers-cattery',
      breeds: catBreeds,
      city: 'Jakarta',
      state: 'DKI Jakarta',
    },
  ]

  const breeders: Breeder[] = []
  for (const item of breedersToCreate) {
    const user = await payload.create({
      collection: 'users',
      data: { email: item.email, password: item.email },
    })

    const breeder = await payload.create({
      collection: 'breeders',
      data: {
        user: user.id,
        businessName: item.businessName,
        slug: item.slug,
        breeds: item.breeds.map((b) => b.id),
        location: { city: item.city, state: item.state, country: 'Indonesia' },
        verificationStatus: 'verified',
        status: 'active',
      },
    })
    breeders.push(breeder)
  }

  return breeders
}
