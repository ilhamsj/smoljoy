'use client'

import { useState } from 'react'
import type { Media } from '@/payload-types'

export function PetImageGallery({ images, alt }: { images: Media[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) {
    return <div className="aspect-square w-full rounded-xl bg-gray-100" />
  }

  const active = images[activeIndex]

  return (
    <div className="flex gap-3">
      {images.length > 1 && (
        <div className="flex w-16 shrink-0 flex-col gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Lihat foto ${index + 1}`}
              aria-current={index === activeIndex}
              className={`aspect-square overflow-hidden rounded-lg border-2 bg-gray-100 transition-colors ${
                index === activeIndex
                  ? 'border-gray-900'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              {image.url && (
                <img src={image.url} alt="" className="h-full w-full object-cover" loading="lazy" />
              )}
            </button>
          ))}
        </div>
      )}
      <div className="aspect-square flex-1 overflow-hidden rounded-xl bg-gray-100">
        {active?.url && (
          <img src={active.url} alt={alt} className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  )
}
