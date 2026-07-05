import Link from 'next/link'
import type { ReactNode } from 'react'

export function ScrollRow({
  id,
  title,
  subtitle,
  viewAllHref,
  children,
}: {
  id?: string
  title: string
  subtitle?: string
  viewAllHref?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="m-0 text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="shrink-0 text-sm text-blue-600 no-underline transition-colors hover:underline"
          >
            Lihat semua →
          </Link>
        )}
      </div>
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {children}
      </div>
    </section>
  )
}
