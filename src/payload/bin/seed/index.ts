import type { SanitizedConfig, BasePayload } from 'payload'
import { getPayload } from 'payload'
import { userSeed } from './users'
import { breedSeed } from './breeds'
import { provinceSeed } from './provinces'
import { breederSeed } from './breeders'
import { parentAnimalSeed } from './parentAnimals'
import { litterSeed } from './litters'
import { petSeed } from './pets'

async function seed(payload: BasePayload) {
  await userSeed(payload)
  const breeds = await breedSeed(payload)
  const provinces = await provinceSeed(payload)
  const breeders = await breederSeed(payload, breeds, provinces)
  const parentAnimals = await parentAnimalSeed(payload, breeders)
  const litters = await litterSeed(payload, breeders, parentAnimals)
  await petSeed(payload, litters)
}
export async function script(config: SanitizedConfig) {
  const payload = await getPayload({ config })
  await seed(payload)
}
