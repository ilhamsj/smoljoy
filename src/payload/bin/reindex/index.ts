import type { BasePayload, CollectionSlug, SanitizedConfig } from 'payload'
import { getPayload } from 'payload'
import { algoliaClient } from '@/lib/algolia'
import { breederToRecord, litterToRecord, petToRecord } from '@/payload/algolia/records'
import type { Breeder, Litter, Pet } from '@/payload-types'

async function fetchAll<T>(payload: BasePayload, collection: CollectionSlug) {
  const docs: T[] = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const result = await payload.find({ collection, page, limit: 200, depth: 1 })
    docs.push(...(result.docs as T[]))
    hasNextPage = result.hasNextPage
    page += 1
  }

  return docs
}

async function reindexCollection<T>(
  payload: BasePayload,
  collection: CollectionSlug,
  indexName: string,
  toRecord: (doc: T) => Record<string, unknown>,
) {
  const docs = await fetchAll<T>(payload, collection)
  const objects = docs.map(toRecord)

  await algoliaClient.replaceAllObjects({ indexName, objects })
  payload.logger.info(`reindex: ${indexName} done (${objects.length} objects)`)
}

async function reindex(payload: BasePayload) {
  await reindexCollection<Breeder>(payload, 'breeders', 'breeders', breederToRecord)
  await reindexCollection<Litter>(payload, 'litters', 'litters', litterToRecord)
  await reindexCollection<Pet>(payload, 'pets', 'pets', petToRecord)
}

export async function script(config: SanitizedConfig) {
  const payload = await getPayload({ config })
  await reindex(payload)
}
