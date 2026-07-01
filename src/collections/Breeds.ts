import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Breeds: CollectionConfig = {
  slug: 'breeds',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'species', 'group'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField(),
    {
      name: 'species',
      type: 'select',
      required: true,
      options: [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
      ],
    },
    {
      name: 'group',
      type: 'select',
      admin: {
        description: 'Breed grouping, e.g. toy/working for dogs, longhair/shorthair for cats',
      },
      options: [
        { label: 'Toy', value: 'toy' },
        { label: 'Working', value: 'working' },
        { label: 'Herding', value: 'herding' },
        { label: 'Sporting', value: 'sporting' },
        { label: 'Hound', value: 'hound' },
        { label: 'Terrier', value: 'terrier' },
        { label: 'Non-Sporting', value: 'non-sporting' },
        { label: 'Longhair', value: 'longhair' },
        { label: 'Shorthair', value: 'shorthair' },
      ],
    },
    { name: 'description', type: 'textarea' },
  ],
  timestamps: true,
}
