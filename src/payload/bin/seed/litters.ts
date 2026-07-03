import { faker } from '@faker-js/faker'
import { Breeder, Litter, ParentAnimal } from '@/payload-types'
import type { BasePayload } from 'payload'

const LITTERS_PER_BREEDER = 3

function breederIdOf(doc: ParentAnimal) {
  return typeof doc.breeder === 'string' ? doc.breeder : doc.breeder.id
}

export async function litterSeed(
  payload: BasePayload,
  breeders: Breeder[],
  parentAnimals: ParentAnimal[],
) {
  const existing = await payload.find({ collection: 'litters', limit: 1 })
  if (existing.totalDocs > 0) {
    payload.logger.info('litters: already seeded, skipping')
    return payload
      .find({ collection: 'litters', limit: breeders.length * LITTERS_PER_BREEDER * 2 })
      .then((res) => res.docs)
  }

  const litters: Litter[] = []
  for (const [i, breeder] of breeders.entries()) {
    const breedId = breeder.breeds?.[0]
    const breed = typeof breedId === 'string' ? breedId : breedId?.id
    if (!breed) continue

    const ownParentAnimals = parentAnimals.filter((p) => breederIdOf(p) === breeder.id)
    const sire = ownParentAnimals[0]
    const dam = ownParentAnimals[1]

    for (let j = 0; j < LITTERS_PER_BREEDER; j++) {
      const dateOfBirth = faker.date.past({ years: 2 })
      const priceMin = faker.number.int({ min: 800, max: 2000 })
      const label = `${sire?.name ?? 'Sire'} x ${dam?.name ?? 'Dam'} - Litter ${j + 1}`

      const litter = await payload.create({
        collection: 'litters',
        data: {
          label,
          slug: faker.helpers.slugify(`${label}-${breeder.id}`).toLowerCase(),
          breeder: breeder.id,
          breed,
          dam: dam?.id,
          sire: sire?.id,
          dateOfBirth: dateOfBirth.toISOString(),
          expectedReadyDate: faker.date.soon({ days: 60, refDate: dateOfBirth }).toISOString(),
          totalPuppies: faker.number.int({ min: 2, max: 4 }),
          priceMin,
          priceMax: priceMin + faker.number.int({ min: 200, max: 800 }),
          status: faker.helpers.arrayElement(['available', 'available', 'sold-out', 'born']),
        },
      })
      litters.push(litter)
    }

    if ((i + 1) % 10 === 0) {
      payload.logger.info(`litters: seeded for ${i + 1}/${breeders.length} breeders`)
    }
  }

  return litters
}
