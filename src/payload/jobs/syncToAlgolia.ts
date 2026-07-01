import type { TaskConfig } from 'payload'
import { algoliaClient } from '@/lib/algolia'

export const syncToAlgoliaTask: TaskConfig<'syncToAlgolia'> = {
  slug: 'syncToAlgolia',
  retries: 3,
  inputSchema: [
    { name: 'indexName', type: 'text', required: true },
    { name: 'objectID', type: 'text', required: true },
    {
      name: 'operation',
      type: 'select',
      required: true,
      options: ['upsert', 'delete'],
    },
    { name: 'body', type: 'json' },
  ],
  outputSchema: [{ name: 'success', type: 'checkbox', required: true }],
  handler: async ({ input }) => {
    if (input.operation === 'delete') {
      await algoliaClient.deleteObject({
        indexName: input.indexName,
        objectID: input.objectID,
      })
    } else {
      await algoliaClient.addOrUpdateObject({
        indexName: input.indexName,
        objectID: input.objectID,
        body: (input.body as Record<string, unknown>) ?? {},
      })
    }
    return { output: { success: true } }
  },
}
