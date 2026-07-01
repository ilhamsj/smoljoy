import { Breeder, Litter, ParentAnimal } from '@/payload-types'
import type { BasePayload } from 'payload'

function breederIdOf(doc: ParentAnimal) {
  return typeof doc.breeder === 'string' ? doc.breeder : doc.breeder.id
}

export async function litterSeed(
  payload: BasePayload,
  breeders: Breeder[],
  parentAnimals: ParentAnimal[],
) {
  const existing = await payload.find({ collection: 'litters', limit: 10 })
  if (existing.totalDocs > 0) {
    payload.logger.info('litters: already seeded, skipping')
    return existing.docs
  }

  const litters: Litter[] = []
  for (const breeder of breeders) {
    const breedId = breeder.breeds?.[0]
    const breed = typeof breedId === 'string' ? breedId : breedId?.id
    if (!breed) continue

    const ownParentAnimals = parentAnimals.filter((p) => breederIdOf(p) === breeder.id)
    const sire = ownParentAnimals.find((p) => p.name === 'Sire' || p.name === 'Max' || p.name === 'Milo')
    const dam = ownParentAnimals.find((p) => p !== sire)

    const litter = await payload.create({
      collection: 'litters',
      data: {
        label: `${sire?.name ?? 'Sire'} x ${dam?.name ?? 'Dam'} - Spring 2026`,
        breeder: breeder.id,
        breed,
        dam: dam?.id,
        sire: sire?.id,
        dateOfBirth: '2026-05-01',
        expectedReadyDate: '2026-07-01',
        totalPuppies: 4,
        priceMin: 1500,
        priceMax: 2500,
        status: 'available',
      },
    })
    litters.push(litter)
  }

  return litters
}
