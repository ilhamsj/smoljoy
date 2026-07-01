import { Breed } from '@/payload-types'
import type { BasePayload, RequiredDataFromCollection } from 'payload'

export const prefillBreeds: RequiredDataFromCollection<Breed>[] = [
  { name: 'Golden Retriever', slug: 'golden-retriever', species: 'dog', group: 'sporting' },
  { name: 'French Bulldog', slug: 'french-bulldog', species: 'dog', group: 'non-sporting' },
  { name: 'Ragdoll', slug: 'ragdoll', species: 'cat', group: 'longhair' },
  { name: 'British Shorthair', slug: 'british-shorthair', species: 'cat', group: 'shorthair' },
]

export async function breedSeed(payload: BasePayload) {
  const existing = await payload.find({ collection: 'breeds', limit: 10 })
  if (existing.totalDocs > 0) {
    payload.logger.info('breeds: already seeded, skipping')
    return existing.docs
  }

  const breeds = []
  for (const data of prefillBreeds) {
    breeds.push(await payload.create({ collection: 'breeds', data }))
  }
  return breeds
}
