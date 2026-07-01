import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Pets: CollectionConfig = {
  slug: 'pets',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'breed', 'gender', 'status', 'price'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField(),
    { name: 'litter', type: 'relationship', relationTo: 'litters' },
    { name: 'breeder', type: 'relationship', relationTo: 'breeders', required: true },
    { name: 'breed', type: 'relationship', relationTo: 'breeds', required: true },
    {
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    { name: 'dateOfBirth', type: 'date' },
    { name: 'color', type: 'text' },
    { name: 'weight', type: 'number', min: 0 },
    { name: 'price', type: 'number', min: 0 },
    { name: 'depositAmount', type: 'number', min: 0 },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Reserved', value: 'reserved' },
        { label: 'Sold', value: 'sold' },
        { label: 'Not for Sale', value: 'not-for-sale' },
      ],
    },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'vaccinations',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'date', type: 'date' },
        { name: 'document', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'microchipped', type: 'checkbox', defaultValue: false },
    { name: 'registryName', type: 'text', admin: { description: 'e.g. AKC, CKC, CFA, TICA' } },
    { name: 'temperamentNotes', type: 'richText' },
    { name: 'reservedBy', type: 'relationship', relationTo: 'users' },
    { name: 'reservedAt', type: 'date' },
  ],
  timestamps: true,
}
