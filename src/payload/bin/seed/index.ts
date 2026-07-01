import type { SanitizedConfig, BasePayload } from 'payload'
import { getPayload } from 'payload'
import { userSeed } from './users'

async function seed(payload: BasePayload) {
  await userSeed(payload)
}
export async function script(config: SanitizedConfig) {
  const payload = await getPayload({ config })
  await seed(payload)
}
