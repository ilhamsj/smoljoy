'use client'

import { Children, useRef, useState, type ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'

import 'swiper/css'

export function ScrollRow({
  id,
  title,
  subtitle,
  viewAllHref,
  children,
}: {
  id?: string
  title: string
  subtitle?: string
  viewAllHref?: string
  children: ReactNode
}) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollState = (swiper: SwiperInstance) => {
    setCanScrollPrev(!swiper.isBeginning)
    setCanScrollNext(!swiper.isEnd)
  }

  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="m-0 text-2xl font-bold text-white">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-neutral-400">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="shrink-0 text-sm text-neutral-300 no-underline transition-colors hover:text-white"
          >
            Lihat semua →
          </a>
        )}
      </div>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            updateScrollState(swiper)
          }}
          onSlideChange={updateScrollState}
          onReachBeginning={updateScrollState}
          onReachEnd={updateScrollState}
          onFromEdge={updateScrollState}
          slidesPerView="auto"
          spaceBetween={16}
          className="!py-2"
        >
          {Children.map(children, (child, index) => (
            <SwiperSlide key={index} className="!w-56">
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={!canScrollPrev}
          className="absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-black/80 text-white backdrop-blur transition-opacity hover:border-white disabled:pointer-events-none disabled:opacity-0"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={!canScrollNext}
          className="absolute top-1/2 right-0 z-10 flex h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-neutral-700 bg-black/80 text-white backdrop-blur transition-opacity hover:border-white disabled:pointer-events-none disabled:opacity-0"
        >
          →
        </button>
      </div>
    </section>
  )
}
