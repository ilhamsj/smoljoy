'use client'

import { InstantSearch, Configure, SearchBox } from 'react-instantsearch'
import { algoliaSearchClient } from '@/lib/algoliaSearchClient'
import { InfiniteBreedersGrid } from '@/components/breeders/InfiniteBreedersGrid'

export default function BreedersPage() {
  return (
    <InstantSearch
      searchClient={algoliaSearchClient}
      indexName="breeders"
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure hitsPerPage={12} />
      <div className="mx-auto max-w-6xl bg-white p-11">
        <h1 className="text-gray-900">Find a trusted breeder</h1>
        <SearchBox
          placeholder="Search by business name or breed..."
          classNames={{
            root: 'mb-8',
            input:
              'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none',
          }}
        />
        <InfiniteBreedersGrid />
      </div>
    </InstantSearch>
  )
}
