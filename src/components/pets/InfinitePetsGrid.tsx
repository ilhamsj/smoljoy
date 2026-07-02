'use client'

import { useEffect, useRef } from 'react'
import { useInfiniteHits } from 'react-instantsearch'
import { PetHitCard, type PetHit } from './PetHitCard'

export function InfinitePetsGrid() {
  const { items, isLastPage, showMore } = useInfiniteHits<PetHit>()
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
    return <p className="opacity-70">No pets found.</p>
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        {items.map((hit) => (
          <PetHitCard key={hit.objectID} hit={hit} />
        ))}
      </div>
      {!isLastPage && <div ref={sentinelRef} className="h-px" />}
    </>
  )
}
