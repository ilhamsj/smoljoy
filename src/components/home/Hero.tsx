import Link from 'next/link'

export function Hero() {
  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
        <span className="inline-block rounded-full border border-gray-200 px-3 py-1 text-xs uppercase tracking-wide text-gray-500">
          Platform Adopsi &amp; Breeder Tepercaya
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold text-gray-900 md:text-6xl md:leading-tight">
          Temukan Sahabat Berbulu Impianmu dari Breeder Tepercaya
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-gray-500 md:text-lg">
          Smoljoy mempertemukan calon pemilik dengan breeder kucing &amp; anjing yang telah
          diverifikasi, transparan, dan mengutamakan kesejahteraan hewan.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pets"
            className="rounded-lg bg-rose-500 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-rose-600"
          >
            Cari Pet
          </Link>
          <Link
            href="/breeders"
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 no-underline transition-colors hover:border-gray-900"
          >
            Cari Breeder
          </Link>
        </div>
      </div>
    </section>
  )
}
