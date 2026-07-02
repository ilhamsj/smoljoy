export function Hero() {
  return (
    <section className="border-b border-neutral-800 bg-gradient-to-b from-neutral-900 to-black">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
        <span className="inline-block rounded-full border border-neutral-700 px-3 py-1 text-xs uppercase tracking-wide text-neutral-400">
          Platform Adopsi &amp; Breeder Tepercaya
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold text-white md:text-6xl md:leading-tight">
          Temukan Sahabat Berbulu Impianmu dari Breeder Tepercaya
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-neutral-400 md:text-lg">
          Smoljoy mempertemukan calon pemilik dengan breeder kucing &amp; anjing yang telah
          diverifikasi, transparan, dan mengutamakan kesejahteraan hewan.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/pets"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black no-underline transition-opacity hover:opacity-85"
          >
            Cari Pet
          </a>
          <a
            href="/breeders"
            className="rounded-lg border border-neutral-700 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:border-white"
          >
            Cari Breeder
          </a>
        </div>
      </div>
    </section>
  )
}
