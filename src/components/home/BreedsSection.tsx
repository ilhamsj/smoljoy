import Link from 'next/link'
import type { Breed } from '@/payload-types'

export function BreedsSection({ breeds }: { breeds: Breed[] }) {
  if (breeds.length === 0) return null

  return (
    <section id="semua-ras" className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="m-0 text-2xl font-bold text-gray-900">Jelajahi Semua Ras</h2>
      <p className="mt-1 text-sm text-gray-500">
        Temukan pet berdasarkan ras kucing dan anjing favoritmu.
      </p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {breeds.map((breed) => (
          <Link
            key={breed.id}
            href="/pets"
            className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 no-underline transition-colors hover:border-gray-900 hover:text-gray-900"
          >
            {breed.species === 'cat' ? '🐱' : '🐶'} {breed.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
