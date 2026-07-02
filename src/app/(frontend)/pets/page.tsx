'use client'

import { InstantSearch, Configure, SearchBox } from 'react-instantsearch'
import { algoliaSearchClient } from '@/lib/algoliaSearchClient'
import { InfinitePetsGrid } from '@/components/pets/InfinitePetsGrid'
import './pets.css'

export default function PetsPage() {
  return (
    <InstantSearch searchClient={algoliaSearchClient} indexName="pets">
      <Configure hitsPerPage={12} />
      <div className="petsPage">
        <h1>Find your new best friend</h1>
        <SearchBox placeholder="Search by name or breed..." />
        <InfinitePetsGrid />
      </div>
    </InstantSearch>
  )
}
