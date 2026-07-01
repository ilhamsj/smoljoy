import { faker } from '@faker-js/faker'
import { Litter, Pet } from '@/payload-types'
import type { BasePayload } from 'payload'

function breederIdOf(litter: Litter) {
  return typeof litter.breeder === 'string' ? litter.breeder : litter.breeder.id
}

function breedIdOf(litter: Litter) {
  return typeof litter.breed === 'string' ? litter.breed : litter.breed.id
}

export async function petSeed(payload: BasePayload, litters: Litter[]) {
  const existing = await payload.find({ collection: 'pets', limit: 1 })
  if (existing.totalDocs > 0) {
    payload.logger.info('pets: already seeded, skipping')
    return existing.docs
  }

  const pets: Pet[] = []
  for (const [i, litter] of litters.entries()) {
    const puppyCount = faker.number.int({ min: 2, max: 3 })

    for (let j = 0; j < puppyCount; j++) {
      const gender = faker.helpers.arrayElement<'male' | 'female'>(['male', 'female'])
      const name = faker.person.firstName(gender === 'male' ? 'male' : 'female')
      const price = litter.priceMin
        ? faker.number.int({ min: litter.priceMin, max: litter.priceMax ?? litter.priceMin + 500 })
        : faker.number.int({ min: 800, max: 2500 })

      const pet = await payload.create({
        collection: 'pets',
        data: {
          name,
          slug: `${litter.id}-pup-${j + 1}`,
          litter: litter.id,
          breeder: breederIdOf(litter),
          breed: breedIdOf(litter),
          gender,
          dateOfBirth: litter.dateOfBirth,
          color: faker.color.human(),
          weight: faker.number.float({ min: 0.5, max: 15, fractionDigits: 1 }),
          price,
          depositAmount: Math.round(price * 0.2),
          status: faker.helpers.arrayElement(['available', 'available', 'reserved', 'sold']),
          microchipped: faker.datatype.boolean(),
        },
      })
      pets.push(pet)
    }

    if ((i + 1) % 25 === 0) {
      payload.logger.info(`pets: seeded for ${i + 1}/${litters.length} litters`)
    }
  }

  return pets
}
