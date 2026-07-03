import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import type { Breeder } from '@/payload-types'
import { algoliaSyncHooks } from '@/payload/hooks/algoliaSync'
import { breederToRecord } from '@/payload/algolia/records'

const breederHooks = algoliaSyncHooks<Breeder>('breeders', breederToRecord)

export const Breeders: CollectionConfig = {
  slug: 'breeders',
  admin: {
    group: 'Master Data',
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
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'breeds', type: 'relationship', relationTo: 'breeds', hasMany: true },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'address', type: 'text' },
        { name: 'province', type: 'relationship', relationTo: 'provinces' },
        {
          name: 'city',
          type: 'relationship',
          relationTo: 'cities',
          filterOptions: ({ siblingData }) => {
            const data = siblingData as { province?: string | null }
            if (!data?.province) return true
            return { province: { equals: data.province } }
          },
        },
        { name: 'zip', type: 'text' },
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
