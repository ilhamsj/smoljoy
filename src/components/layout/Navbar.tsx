'use client'

import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Cari Pet', href: '/pets' },
  { label: 'Cari Breeder', href: '/breeders' },
  { label: 'Tentang Kami', href: '/#tentang-kami' },
  { label: 'Jadi Breeder', href: '/#jadi-breeder' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold tracking-tight text-white no-underline">
          smoljoy
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-300 no-underline transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/breeders"
          className="hidden rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black no-underline transition-opacity hover:opacity-85 md:inline-block"
        >
          Temukan Breeder
        </a>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 text-white md:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-neutral-800 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm text-neutral-300 no-underline transition-colors hover:bg-neutral-900 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/breeders"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-black no-underline"
          >
            Temukan Breeder
          </a>
        </nav>
      )}
    </header>
  )
}
