'use client'

import { InstantSearch, Configure, SearchBox } from 'react-instantsearch'
import { algoliaSearchClient } from '@/lib/algoliaSearchClient'
import { InfiniteBreedersGrid } from '@/components/breeders/InfiniteBreedersGrid'
import './breeders.css'

export default function BreedersPage() {
  return (
    <InstantSearch searchClient={algoliaSearchClient} indexName="breeders">
      <Configure hitsPerPage={12} />
      <div className="breedersPage">
        <h1>Find a trusted breeder</h1>
        <SearchBox placeholder="Search by business name or breed..." />
        <InfiniteBreedersGrid />
      </div>
    </InstantSearch>
  )
}
