'use client'

import { InstantSearch, Configure, SearchBox } from 'react-instantsearch'
import { algoliaSearchClient } from '@/lib/algoliaSearchClient'
import { InfiniteBreedersGrid } from '@/components/breeders/InfiniteBreedersGrid'

export default function BreedersPage() {
  return (
    <InstantSearch searchClient={algoliaSearchClient} indexName="breeders">
      <Configure hitsPerPage={12} />
      <div className="mx-auto max-w-6xl p-11">
        <h1>Find a trusted breeder</h1>
        <SearchBox
          placeholder="Search by business name or breed..."
          classNames={{
            root: 'mb-8',
            input: 'w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-base text-white',
          }}
        />
        <InfiniteBreedersGrid />
      </div>
    </InstantSearch>
  )
}
