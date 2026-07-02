const STANDARDS = [
  {
    title: 'Kesehatan di Atas Segalanya',
    description:
      'Kesehatan dan kesejahteraan induk maupun anakan selalu menjadi prioritas utama, bukan keuntungan semata.',
  },
  {
    title: 'Verifikasi Identitas & Legalitas',
    description:
      'Setiap breeder melalui proses verifikasi identitas, lokasi, dan legalitas usaha sebelum bisa terdaftar di Smoljoy.',
  },
  {
    title: 'Transparansi Riwayat Kesehatan',
    description:
      'Riwayat vaksinasi, microchip, dan kondisi kesehatan pet wajib diinformasikan secara jujur dan lengkap.',
  },
  {
    title: 'Lingkungan Perawatan Layak',
    description:
      'Breeder wajib merawat hewan di lingkungan yang bersih, aman, dan sesuai standar kesejahteraan hewan.',
  },
  {
    title: 'Tanpa Overbreeding',
    description:
      'Kami menolak praktik perkawinan berlebihan yang mengorbankan kesehatan induk demi jumlah produksi.',
  },
  {
    title: 'Dukungan Purna-Adopsi',
    description:
      'Breeder tetap memberikan pendampingan dan informasi kepada pemilik baru setelah proses adopsi selesai.',
  },
]

export function EthicsSection() {
  return (
    <section id="kode-etik" className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="m-0 text-2xl font-bold text-white">
          Standar &amp; Kode Etik Breeder di Smoljoy
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Setiap breeder yang bergabung di Smoljoy wajib mematuhi standar berikut demi kesejahteraan
          hewan dan kepercayaan calon pemilik.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((standard, index) => (
            <div
              key={standard.title}
              className="rounded-xl border border-neutral-800 bg-black p-5"
            >
              <span className="text-xs font-semibold text-neutral-500">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="m-0 mt-2 mb-2 text-base font-semibold text-white">
                {standard.title}
              </h3>
              <p className="m-0 text-sm text-neutral-400">{standard.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
