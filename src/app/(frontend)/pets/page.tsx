'use client'

import { InstantSearch, Configure, SearchBox } from 'react-instantsearch'
import { algoliaSearchClient } from '@/lib/algoliaSearchClient'
import { InfinitePetsGrid } from '@/components/pets/InfinitePetsGrid'

export default function PetsPage() {
  return (
    <InstantSearch
      searchClient={algoliaSearchClient}
      indexName="pets"
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure hitsPerPage={12} />
      <div className="mx-auto max-w-6xl bg-white p-11">
        <h1 className="text-gray-900">Find your new best friend</h1>
        <SearchBox
          placeholder="Search by name or breed..."
          classNames={{
            root: 'mb-8',
            input:
              'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none',
          }}
        />
        <InfinitePetsGrid />
      </div>
    </InstantSearch>
  )
}
