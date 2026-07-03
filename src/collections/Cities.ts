import type { CollectionConfig } from 'payload'

export const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    group: 'Location',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'province',
      type: 'relationship',
      relationTo: 'provinces',
      required: true,
      index: true,
    },
  ],
}
