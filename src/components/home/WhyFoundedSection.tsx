export function WhyFoundedSection() {
  return (
    <section id="kenapa-kami" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="m-0 text-2xl font-bold text-white">Kenapa Kami Mendirikan Smoljoy?</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-400 md:text-base">
            <p className="m-0">
              Mencari pet dari breeder yang benar-benar bertanggung jawab masih menjadi tantangan
              besar. Banyak calon pemilik terjebak informasi yang tidak transparan, riwayat
              kesehatan yang tidak jelas, bahkan praktik breeding yang mengabaikan kesejahteraan
              hewan.
            </p>
            <p className="m-0">
              Smoljoy hadir untuk menjembatani hal ini — sebuah platform yang mempertemukan calon
              pemilik dengan breeder yang telah diverifikasi, sehingga proses adopsi menjadi lebih
              aman, transparan, dan penuh kepercayaan bagi kedua belah pihak.
            </p>
            <p className="m-0">
              Kami percaya setiap pet berhak tumbuh dalam perawatan yang layak, dan setiap keluarga
              berhak mendapatkan sahabat baru tanpa keraguan.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8">
          <dl className="grid grid-cols-2 gap-6 text-center">
            <div>
              <dt className="text-3xl font-bold text-white">100%</dt>
              <dd className="m-0 mt-1 text-xs text-neutral-400">Breeder terverifikasi</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-white">0</dt>
              <dd className="m-0 mt-1 text-xs text-neutral-400">Toleransi overbreeding</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-white">24/7</dt>
              <dd className="m-0 mt-1 text-xs text-neutral-400">Dukungan purna-adopsi</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-white">1</dt>
              <dd className="m-0 mt-1 text-xs text-neutral-400">Standar kode etik untuk semua</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
