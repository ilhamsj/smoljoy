import Link from 'next/link'

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="overflow-x-auto whitespace-nowrap text-xs text-gray-500">
      <ol className="flex items-center gap-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-gray-300">/</span>}
            {item.href ? (
              <Link href={item.href} className="text-blue-600 no-underline hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
