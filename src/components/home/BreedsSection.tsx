import type { Breed } from '@/payload-types'

export function BreedsSection({ breeds }: { breeds: Breed[] }) {
  if (breeds.length === 0) return null

  return (
    <section id="semua-ras" className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="m-0 text-2xl font-bold text-white">Jelajahi Semua Ras</h2>
      <p className="mt-1 text-sm text-neutral-400">
        Temukan pet berdasarkan ras kucing dan anjing favoritmu.
      </p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {breeds.map((breed) => (
          <a
            key={breed.id}
            href="/pets"
            className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-200 no-underline transition-colors hover:border-white hover:text-white"
          >
            {breed.species === 'cat' ? '🐱' : '🐶'} {breed.name}
          </a>
        ))}
      </div>
    </section>
  )
}
