import { Breeder, ParentAnimal } from '@/payload-types'
import type { BasePayload } from 'payload'

export async function parentAnimalSeed(payload: BasePayload, breeders: Breeder[]) {
  const existing = await payload.find({ collection: 'parent-animals', limit: 10 })
  if (existing.totalDocs > 0) {
    payload.logger.info('parent-animals: already seeded, skipping')
    return existing.docs
  }

  const namesByBreeder: Record<string, { sire: string; dam: string }> = {
    'Golden Paws Kennel': { sire: 'Max', dam: 'Bella' },
    'Silken Whiskers Cattery': { sire: 'Milo', dam: 'Luna' },
  }

  const parentAnimals: ParentAnimal[] = []
  for (const breeder of breeders) {
    const breedId = breeder.breeds?.[0]
    const breed = typeof breedId === 'string' ? breedId : breedId?.id
    if (!breed) continue

    const names = namesByBreeder[breeder.businessName] ?? { sire: 'Sire', dam: 'Dam' }

    const sire = await payload.create({
      collection: 'parent-animals',
      data: { name: names.sire, breeder: breeder.id, breed },
    })
    const dam = await payload.create({
      collection: 'parent-animals',
      data: { name: names.dam, breeder: breeder.id, breed },
    })
    parentAnimals.push(sire, dam)
  }

  return parentAnimals
}
