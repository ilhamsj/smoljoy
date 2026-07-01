import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import type { Breeder } from '@/payload-types'
import { algoliaSyncHooks } from '@/payload/hooks/algoliaSync'
import { relationField } from '@/lib/relation'

const breederHooks = algoliaSyncHooks<Breeder>('breeders', (doc) => ({
  businessName: doc.businessName,
  slug: doc.slug,
  city: doc.location?.city,
  state: doc.location?.state,
  breeds: doc.breeds?.map((b) => relationField(b, 'name')).filter(Boolean),
  verificationStatus: doc.verificationStatus,
  status: doc.status,
  image: relationField(doc.avatar, 'url'),
}))

export const Breeders: CollectionConfig = {
  slug: 'breeders',
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'verificationStatus', 'status'],
  },
  access: {
    read: () => true,
  },
  hooks: breederHooks,
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users', required: true, unique: true },
    { name: 'businessName', type: 'text', required: true },
    slugField({ useAsSlug: 'businessName' }),
    { name: 'bio', type: 'richText' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'breeds', type: 'relationship', relationTo: 'breeds', hasMany: true },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'address', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'zip', type: 'text' },
        { name: 'country', type: 'text' },
        { name: 'coordinates', type: 'point' },
      ],
    },
    { name: 'yearsExperience', type: 'number', min: 0 },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'issuer', type: 'text' },
        { name: 'document', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'policies',
      type: 'group',
      fields: [
        { name: 'healthGuarantee', type: 'richText' },
        { name: 'depositPolicy', type: 'richText' },
        { name: 'returnPolicy', type: 'richText' },
      ],
    },
    {
      name: 'verificationStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Verified', value: 'verified' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    { name: 'verifiedAt', type: 'date' },
    { name: 'contactPhone', type: 'text' },
    {
      name: 'litters',
      type: 'join',
      collection: 'litters',
      on: 'breeder',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
      ],
    },
  ],
  timestamps: true,
}
