import Link from 'next/link'
import type { Breeder, City, Media, Province } from '@/payload-types'
import { formatCityName } from '@/lib/format'

export function BreederProfileCard({ breeder }: { breeder: Breeder }) {
  const avatar = breeder.avatar as Media | undefined
  const city = breeder.location?.city as City | undefined
  const province = breeder.location?.province as Province | undefined
  const isVerified = breeder.verificationStatus === 'verified'

  return (
    <Link
      href={`/breeders/${breeder.slug}`}
      className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-inherit no-underline transition-colors hover:border-gray-300"
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
        {avatar?.url && (
          <img src={avatar.url} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-sm font-semibold text-gray-900">{breeder.businessName}</p>
        {isVerified && (
          <p className="m-0 mt-0.5 flex items-center gap-1 text-xs text-green-600">
            <span aria-hidden>✓</span> Breeder terverifikasi
          </p>
        )}
        {(city || province) && (
          <p className="m-0 mt-0.5 truncate text-xs text-gray-500">
            {[city ? formatCityName(city.name) : null, province?.name].filter(Boolean).join(', ')}
          </p>
        )}
      </div>
      <span aria-hidden className="shrink-0 text-gray-300">
        →
      </span>
    </Link>
  )
}
