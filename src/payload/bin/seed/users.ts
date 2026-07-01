import { User } from '@/payload-types'
import type { BasePayload, RequiredDataFromCollection, SanitizedConfig } from 'payload'
import { getPayload } from 'payload'

export const prefillUser: RequiredDataFromCollection<User> = {
  email: 'dev@example.com',
  password: 'dev@example.com',
}

export async function userSeed(payload: BasePayload) {
  const existing = await payload.find({ collection: 'users', limit: 10 })
  if (existing.totalDocs > 0) {
    payload.logger.info('users: already seeded, skipping')
    return existing.docs
  }
  const user = await payload.create({
    collection: 'users',
    data: { ...prefillUser },
  })
  return [user]
}

export async function script(config: SanitizedConfig) {
  const payload = await getPayload({ config })
  await userSeed(payload)
}
