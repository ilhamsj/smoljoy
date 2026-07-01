import { Breed } from '@/payload-types'
import type { BasePayload, RequiredDataFromCollection } from 'payload'

export const prefillBreeds: RequiredDataFromCollection<Breed>[] = [
  { name: 'Golden Retriever', slug: 'golden-retriever', species: 'dog', group: 'sporting' },
  { name: 'Labrador Retriever', slug: 'labrador-retriever', species: 'dog', group: 'sporting' },
  { name: 'French Bulldog', slug: 'french-bulldog', species: 'dog', group: 'non-sporting' },
  { name: 'Poodle', slug: 'poodle', species: 'dog', group: 'non-sporting' },
  { name: 'Siberian Husky', slug: 'siberian-husky', species: 'dog', group: 'working' },
  { name: 'Rottweiler', slug: 'rottweiler', species: 'dog', group: 'working' },
  { name: 'Beagle', slug: 'beagle', species: 'dog', group: 'hound' },
  { name: 'Dachshund', slug: 'dachshund', species: 'dog', group: 'hound' },
  { name: 'Yorkshire Terrier', slug: 'yorkshire-terrier', species: 'dog', group: 'toy' },
  { name: 'Chihuahua', slug: 'chihuahua', species: 'dog', group: 'toy' },
  { name: 'Border Collie', slug: 'border-collie', species: 'dog', group: 'herding' },
  { name: 'Australian Shepherd', slug: 'australian-shepherd', species: 'dog', group: 'herding' },
  { name: 'Ragdoll', slug: 'ragdoll', species: 'cat', group: 'longhair' },
  { name: 'Persian', slug: 'persian', species: 'cat', group: 'longhair' },
  { name: 'Maine Coon', slug: 'maine-coon', species: 'cat', group: 'longhair' },
  { name: 'British Shorthair', slug: 'british-shorthair', species: 'cat', group: 'shorthair' },
  { name: 'American Shorthair', slug: 'american-shorthair', species: 'cat', group: 'shorthair' },
  { name: 'Russian Blue', slug: 'russian-blue', species: 'cat', group: 'shorthair' },
  { name: 'Bengal', slug: 'bengal', species: 'cat', group: 'shorthair' },
  { name: 'Scottish Fold', slug: 'scottish-fold', species: 'cat', group: 'shorthair' },
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
