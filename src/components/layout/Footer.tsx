const FOOTER_COLUMNS = [
  {
    title: 'Jelajahi',
    links: [
      { label: 'Cari Pet', href: '/pets' },
      { label: 'Cari Breeder', href: '/breeders' },
      { label: 'Semua Ras', href: '/#semua-ras' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Kenapa Kami', href: '/#kenapa-kami' },
      { label: 'Value Kami', href: '/#value-kami' },
      { label: 'Kode Etik Breeder', href: '/#kode-etik' },
    ],
  },
  {
    title: 'Kontak',
    links: [
      { label: 'hello@smoljoy.id', href: 'mailto:hello@smoljoy.id' },
      { label: 'Instagram @smoljoy.id', href: 'https://instagram.com/smoljoy.id' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="/" className="text-xl font-bold tracking-tight text-white no-underline">
              smoljoy
            </a>
            <p className="mt-3 max-w-xs text-sm text-neutral-400">
              Mempertemukan calon pemilik dengan breeder kucing &amp; anjing tepercaya di seluruh
              Indonesia.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold text-white">{column.title}</h3>
              <ul className="m-0 list-none space-y-3 p-0">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-400 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} Smoljoy. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}
