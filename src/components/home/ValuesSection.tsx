const VALUES = [
  {
    icon: '🤝',
    title: 'Kepercayaan',
    description: 'Setiap breeder terverifikasi agar calon pemilik bisa mengadopsi dengan tenang.',
  },
  {
    icon: '🔍',
    title: 'Transparansi',
    description: 'Riwayat kesehatan, harga, dan informasi pet disampaikan apa adanya.',
  },
  {
    icon: '❤️',
    title: 'Kasih Sayang',
    description: 'Kesejahteraan hewan selalu menjadi pertimbangan utama dalam setiap keputusan.',
  },
  {
    icon: '🌱',
    title: 'Pertumbuhan Berkelanjutan',
    description: 'Kami mendukung breeder untuk berkembang tanpa mengorbankan standar etik.',
  },
]

export function ValuesSection() {
  return (
    <section id="value-kami" className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="m-0 text-2xl font-bold text-white">Value Kami</h2>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Nilai-nilai yang menjadi pegangan kami dalam membangun ekosistem adopsi pet yang sehat.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-xl border border-neutral-800 bg-black p-6">
              <span className="text-3xl">{value.icon}</span>
              <h3 className="m-0 mt-4 mb-2 text-base font-semibold text-white">{value.title}</h3>
              <p className="m-0 text-sm text-neutral-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
