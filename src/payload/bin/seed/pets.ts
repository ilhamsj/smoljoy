import { Litter, Pet } from '@/payload-types'
import type { BasePayload } from 'payload'

function breederIdOf(litter: Litter) {
  return typeof litter.breeder === 'string' ? litter.breeder : litter.breeder.id
}

function breedIdOf(litter: Litter) {
  return typeof litter.breed === 'string' ? litter.breed : litter.breed.id
}

export async function petSeed(payload: BasePayload, litters: Litter[]) {
  const existing = await payload.find({ collection: 'pets', limit: 10 })
  if (existing.totalDocs > 0) {
    payload.logger.info('pets: already seeded, skipping')
    return existing.docs
  }

  const pets: Pet[] = []
  for (const litter of litters) {
    const namePrefix = litter.label.split(' ')[0]
    const puppiesToCreate: { name: string; slug: string; gender: 'male' | 'female' }[] = [
      { name: `${namePrefix}'s Pup 1`, slug: `${litter.id}-pup-1`, gender: 'male' },
      { name: `${namePrefix}'s Pup 2`, slug: `${litter.id}-pup-2`, gender: 'female' },
    ]

    for (const pup of puppiesToCreate) {
      const pet = await payload.create({
        collection: 'pets',
        data: {
          name: pup.name,
          slug: pup.slug,
          litter: litter.id,
          breeder: breederIdOf(litter),
          breed: breedIdOf(litter),
          gender: pup.gender,
          dateOfBirth: litter.dateOfBirth,
          price: litter.priceMin ?? 1500,
          depositAmount: 200,
          status: 'available',
        },
      })
      pets.push(pet)
    }
  }

  return pets
}
