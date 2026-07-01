import type { CollectionConfig } from 'payload'
import type { Litter } from '@/payload-types'
import { algoliaSyncHooks } from '@/payload/hooks/algoliaSync'
import { litterToRecord } from '@/payload/algolia/records'

const litterHooks = algoliaSyncHooks<Litter>('litters', litterToRecord)

export const Litters: CollectionConfig = {
  slug: 'litters',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'breeder', 'breed', 'status', 'dateOfBirth'],
  },
  access: {
    read: () => true,
  },
  hooks: litterHooks,
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'breeder', type: 'relationship', relationTo: 'breeders', required: true },
    { name: 'breed', type: 'relationship', relationTo: 'breeds', required: true },
    { name: 'dam', type: 'relationship', relationTo: 'parent-animals' },
    { name: 'sire', type: 'relationship', relationTo: 'parent-animals' },
    { name: 'dateOfBirth', type: 'date' },
    { name: 'expectedReadyDate', type: 'date' },
    { name: 'totalPuppies', type: 'number', min: 0 },
    {
      name: 'puppies',
      type: 'join',
      collection: 'pets',
      on: 'litter',
    },
    { name: 'priceMin', type: 'number', min: 0 },
    { name: 'priceMax', type: 'number', min: 0 },
    {
      name: 'healthClearances',
      type: 'array',
      fields: [
        { name: 'test', type: 'text', required: true },
        { name: 'result', type: 'text' },
        { name: 'document', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'coverImages', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'description', type: 'richText' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'planned',
      options: [
        { label: 'Planned', value: 'planned' },
        { label: 'Born', value: 'born' },
        { label: 'Available', value: 'available' },
        { label: 'Sold Out', value: 'sold-out' },
      ],
    },
  ],
  timestamps: true,
}
