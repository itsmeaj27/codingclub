import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    read: () => true, // 👈 Public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'instructorName',
      type: 'text',
      required: true,
    },
    {
      name: 'startingDate',
      type: 'date',
      required: true,
    },
  ],
}
