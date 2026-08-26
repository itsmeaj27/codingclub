import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig<'gallery'> = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'category'],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Brief description of the photo' },
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Events', value: 'events' },
        { label: 'Workshops', value: 'workshops' },
        { label: 'Interaction Programs', value: 'interaction' },
        { label: 'Coding Classes', value: 'classes' },
        { label: 'Team Photos', value: 'team' },
        { label: 'Activities', value: 'activities' },
      ],
      admin: { position: 'sidebar' }
    },
  ],
}
