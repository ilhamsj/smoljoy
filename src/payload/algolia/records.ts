import type { Breeder, Litter, Pet } from '@/payload-types'
import { relationField, relationId } from '@/lib/relation'

export const petToRecord = (doc: Pet) => ({
  objectID: String(doc.id),
  name: doc.name,
  slug: doc.slug,
  breed: relationField(doc.breed, 'name'),
  breederId: relationId(doc.breeder),
  breederName: relationField(doc.breeder, 'businessName'),
  gender: doc.gender,
  price: doc.price,
  status: doc.status,
  image: relationField(doc.images?.[0], 'url'),
})

export const litterToRecord = (doc: Litter) => ({
  objectID: String(doc.id),
  label: doc.label,
  breed: relationField(doc.breed, 'name'),
  breederId: relationId(doc.breeder),
  breederName: relationField(doc.breeder, 'businessName'),
  status: doc.status,
  priceMin: doc.priceMin,
  priceMax: doc.priceMax,
  dateOfBirth: doc.dateOfBirth,
  image: relationField(doc.coverImages?.[0], 'url'),
})

export const breederToRecord = (doc: Breeder) => ({
  objectID: String(doc.id),
  businessName: doc.businessName,
  slug: doc.slug,
  city: doc.location?.city,
  state: doc.location?.state,
  breeds: doc.breeds?.map((b) => relationField(b, 'name')).filter(Boolean),
  verificationStatus: doc.verificationStatus,
  status: doc.status,
  image: relationField(doc.avatar, 'url'),
})
