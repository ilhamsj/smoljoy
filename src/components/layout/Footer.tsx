import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

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
]

const CONTACT_LINKS = [
  { label: 'hello@smoljoy.id', href: 'mailto:hello@smoljoy.id' },
  { label: 'Instagram @smoljoy.id', href: 'https://instagram.com/smoljoy.id' },
]

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-rose-500 no-underline">
              <Logo className="h-6 w-auto" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              Mempertemukan calon pemilik dengan breeder kucing &amp; anjing tepercaya di seluruh
              Indonesia.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">{column.title}</h3>
              <ul className="m-0 list-none space-y-3 p-0">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 no-underline transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Kontak</h3>
            <ul className="m-0 list-none space-y-3 p-0">
              {CONTACT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 no-underline transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} Smoljoy. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}
