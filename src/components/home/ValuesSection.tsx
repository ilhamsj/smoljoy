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
    <section id="value-kami" className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="m-0 text-2xl font-bold text-gray-900">Value Kami</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Nilai-nilai yang menjadi pegangan kami dalam membangun ekosistem adopsi pet yang sehat.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-xl border border-gray-200 bg-white p-6">
              <span className="text-3xl">{value.icon}</span>
              <h3 className="m-0 mt-4 mb-2 text-base font-semibold text-gray-900">
                {value.title}
              </h3>
              <p className="m-0 text-sm text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
