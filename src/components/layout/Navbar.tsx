'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

const NAV_LINKS = [
  { label: 'Cari Pet', href: '/pets' },
  { label: 'Cari Breeder', href: '/breeders' },
  { label: 'Tentang Kami', href: '/#tentang-kami' },
  { label: 'Jadi Breeder', href: '/#jadi-breeder' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-rose-500 no-underline">
          <Logo className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 no-underline transition-colors hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/breeders"
          className="hidden rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-rose-600 md:inline-block"
        >
          Temukan Breeder
        </Link>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-900 md:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-gray-200 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm text-gray-600 no-underline transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/breeders"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-rose-500 px-4 py-2.5 text-center text-sm font-semibold text-white no-underline"
          >
            Temukan Breeder
          </Link>
        </nav>
      )}
    </header>
  )
}
