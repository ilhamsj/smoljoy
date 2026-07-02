import type { BasePayload } from 'payload'
import type { Province } from '@/payload-types'
import citiesData from './citiesData.json'

export async function citySeed(payload: BasePayload, provinces: Province[]) {
  const existing = await payload.find({ collection: 'cities', limit: 1 })
  if (existing.totalDocs > 0) {
    payload.logger.info('cities: already seeded, skipping')
    return payload.find({ collection: 'cities', limit: citiesData.length }).then((res) => res.docs)
  }

  const provinceIdByCode = new Map<number, string>()
  for (const province of provinces) {
    if (province.code != null && !provinceIdByCode.has(province.code)) {
      provinceIdByCode.set(province.code, province.id)
    }
  }

  const cities = []
  for (const [index, item] of citiesData.entries()) {
    const provinceId = provinceIdByCode.get(item.provinceCode)
    if (!provinceId) {
      payload.logger.info(`cities: no province for code ${item.provinceCode} (${item.name})`)
      continue
    }

    cities.push(
      await payload.create({
        collection: 'cities',
        data: { name: item.name, province: provinceId },
      }),
    )

    if ((index + 1) % 100 === 0) {
      payload.logger.info(`cities: seeded ${index + 1}/${citiesData.length}`)
    }
  }
  return cities
}
