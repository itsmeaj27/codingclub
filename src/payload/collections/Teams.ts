import type { CollectionConfig } from 'payload'

export const Teams: CollectionConfig<'teams'> = {
  slug: 'teams',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'category'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      admin: { description: 'E.g. President, Developer, etc.' }
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Faculty Coordinator', value: 'faculty' },
        { label: 'Core Team', value: 'core' },
        { label: 'Technical Team', value: 'technical' },
        { label: 'Design & Media', value: 'design' },
        { label: 'Event & Outreach', value: 'outreach' },
      ],
    },
    {
      name: 'courseYear',
      type: 'text',
      label: 'Course & Year',
      admin: { description: 'E.g. B.Tech CSE, 3rd Year' }
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'linkedin',
      type: 'text',
      admin: { description: 'LinkedIn Profile URL' }
    },
    {
      name: 'github',
      type: 'text',
      admin: { description: 'GitHub Profile URL' }
    },
  ],
}
