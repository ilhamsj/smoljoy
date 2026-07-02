'use client'

import { useEffect, useRef } from 'react'
import { useInfiniteHits } from 'react-instantsearch'
import { BreederHitCard, type BreederHit } from './BreederHitCard'

export function InfiniteBreedersGrid() {
  const { items, isLastPage, showMore } = useInfiniteHits<BreederHit>()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || isLastPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          showMore()
        }
      },
      { rootMargin: '400px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [isLastPage, showMore])

  if (items.length === 0) {
    return <p className="breedersGrid__empty">No breeders found.</p>
  }

  return (
    <>
      <div className="breedersGrid">
        {items.map((hit) => (
          <BreederHitCard key={hit.objectID} hit={hit} />
        ))}
      </div>
      {!isLastPage && <div ref={sentinelRef} className="breedersGrid__sentinel" />}
    </>
  )
}
