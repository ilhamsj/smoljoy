import { liteClient } from 'algoliasearch/lite'

export const algoliaSearchClient = liteClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
)
