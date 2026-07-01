import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export function algoliaSyncHooks<T extends { id: string | number }>(
  indexName: string,
  toRecord: (doc: T) => Record<string, unknown>,
) {
  const afterChange: CollectionAfterChangeHook<T> = async ({ doc, req }) => {
    await req.payload.jobs.queue({
      task: 'syncToAlgolia',
      input: {
        indexName,
        objectID: String(doc.id),
        operation: 'upsert',
        body: toRecord(doc),
      },
      req,
    })
    return doc
  }

  const afterDelete: CollectionAfterDeleteHook<T> = async ({ doc, req }) => {
    await req.payload.jobs.queue({
      task: 'syncToAlgolia',
      input: {
        indexName,
        objectID: String(doc.id),
        operation: 'delete',
      },
      req,
    })
    return doc
  }

  return {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  }
}
