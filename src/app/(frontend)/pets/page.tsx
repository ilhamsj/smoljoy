'use client'

import { InstantSearch, Configure, SearchBox } from 'react-instantsearch'
import { algoliaSearchClient } from '@/lib/algoliaSearchClient'
import { InfinitePetsGrid } from '@/components/pets/InfinitePetsGrid'

export default function PetsPage() {
  return (
    <InstantSearch searchClient={algoliaSearchClient} indexName="pets">
      <Configure hitsPerPage={12} />
      <div className="mx-auto max-w-6xl p-11">
        <h1>Find your new best friend</h1>
        <SearchBox
          placeholder="Search by name or breed..."
          classNames={{
            root: 'mb-8',
            input: 'w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-base text-white',
          }}
        />
        <InfinitePetsGrid />
      </div>
    </InstantSearch>
  )
}
