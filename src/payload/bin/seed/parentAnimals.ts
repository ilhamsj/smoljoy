import { faker } from '@faker-js/faker'
import { Breeder, ParentAnimal } from '@/payload-types'
import type { BasePayload } from 'payload'

export async function parentAnimalSeed(payload: BasePayload, breeders: Breeder[]) {
  const existing = await payload.find({ collection: 'parent-animals', limit: 1 })
  if (existing.totalDocs > 0) {
    payload.logger.info('parent-animals: already seeded, skipping')
    return payload
      .find({ collection: 'parent-animals', limit: breeders.length * 4 })
      .then((res) => res.docs)
  }

  const parentAnimals: ParentAnimal[] = []
  for (const [i, breeder] of breeders.entries()) {
    const breedId = breeder.breeds?.[0]
    const breed = typeof breedId === 'string' ? breedId : breedId?.id
    if (!breed) continue

    const sire = await payload.create({
      collection: 'parent-animals',
      data: { name: faker.person.firstName('male'), breeder: breeder.id, breed },
    })
    const dam = await payload.create({
      collection: 'parent-animals',
      data: { name: faker.person.firstName('female'), breeder: breeder.id, breed },
    })
    parentAnimals.push(sire, dam)

    if ((i + 1) % 10 === 0) {
      payload.logger.info(`parent-animals: seeded for ${i + 1}/${breeders.length} breeders`)
    }
  }

  return parentAnimals
}
