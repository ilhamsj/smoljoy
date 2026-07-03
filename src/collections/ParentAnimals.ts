import type { CollectionConfig } from 'payload'

export const ParentAnimals: CollectionConfig = {
  slug: 'parent-animals',
  admin: {
    group: 'Master Data',
    useAsTitle: 'name',
    defaultColumns: ['name', 'breed', 'breeder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'breeder', type: 'relationship', relationTo: 'breeders', required: true },
    { name: 'breed', type: 'relationship', relationTo: 'breeds', required: true },
    { name: 'sire', type: 'relationship', relationTo: 'parent-animals' },
    { name: 'dam', type: 'relationship', relationTo: 'parent-animals' },
    { name: 'pedigreeDocument', type: 'upload', relationTo: 'media' },
    {
      name: 'healthClearances',
      type: 'array',
      fields: [
        { name: 'test', type: 'text', required: true },
        { name: 'result', type: 'text' },
        { name: 'document', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'littersAsDam',
      type: 'join',
      collection: 'litters',
      on: 'dam',
    },
    {
      name: 'littersAsSire',
      type: 'join',
      collection: 'litters',
      on: 'sire',
    },
  ],
  timestamps: true,
}
