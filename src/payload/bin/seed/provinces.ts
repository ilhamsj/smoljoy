import { Province } from '@/payload-types'
import type { BasePayload, RequiredDataFromCollection } from 'payload'

export const prefillProvinces: RequiredDataFromCollection<Province>[] = [
  { name: 'Aceh', code: 11 },
  { name: 'Sumatera Utara', code: 12 },
  { name: 'Sumatera Barat', code: 13 },
  { name: 'Riau', code: 14 },
  { name: 'Jambi', code: 15 },
  { name: 'Sumatera Selatan', code: 16 },
  { name: 'Bengkulu', code: 17 },
  { name: 'Lampung', code: 18 },
  { name: 'Kepulauan Bangka Belitung', code: 19 },
  { name: 'Kepulauan Riau', code: 21 },
  { name: 'DKI Jakarta', code: 31 },
  { name: 'Jawa Barat', code: 32 },
  { name: 'Jawa Tengah', code: 33 },
  { name: 'Daerah Istimewa Yogyakarta', code: 34 },
  { name: 'Jawa Timur', code: 35 },
  { name: 'Banten', code: 36 },
  { name: 'Bali', code: 51 },
  { name: 'Nusa Tenggara Barat', code: 52 },
  { name: 'Nusa Tenggara Timur', code: 53 },
  { name: 'Kalimantan Barat', code: 61 },
  { name: 'Kalimantan Tengah', code: 62 },
  { name: 'Kalimantan Selatan', code: 63 },
  { name: 'Kalimantan Timur', code: 64 },
  { name: 'Kalimantan Utara', code: 65 },
  { name: 'Sulawesi Utara', code: 71 },
  { name: 'Sulawesi Tengah', code: 72 },
  { name: 'Sulawesi Selatan', code: 73 },
  { name: 'Sulawesi Tenggara', code: 74 },
  { name: 'Gorontalo', code: 75 },
  { name: 'Sulawesi Barat', code: 76 },
  { name: 'Maluku', code: 81 },
  { name: 'Maluku Utara', code: 82 },
  { name: 'Papua', code: 91 },
  { name: 'Papua Tengah', code: 91 },
  { name: 'Papua Pegunungan', code: 91 },
  { name: 'Papua Selatan', code: 91 },
  { name: 'Papua Barat', code: 92 },
  { name: 'Papua Barat Daya', code: 92 },
]

export async function provinceSeed(payload: BasePayload) {
  const existing = await payload.find({ collection: 'provinces', limit: 10 })
  if (existing.totalDocs > 0) {
    payload.logger.info('provinces: already seeded, skipping')
    return payload.find({ collection: 'provinces', limit: prefillProvinces.length }).then(
      (res) => res.docs,
    )
  }

  const provinces = []
  for (const data of prefillProvinces) {
    provinces.push(await payload.create({ collection: 'provinces', data }))
  }
  return provinces
}
