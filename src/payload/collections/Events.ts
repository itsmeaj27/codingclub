import type { CollectionConfig } from 'payload'
import { slugField } from '@/payload/fields/slug'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateEvent, revalidateEventDelete } from './Events/hooks/revalidateEvent'
import { getEffectiveEventStatus } from '../utilities/eventStatus'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status'],
  },
  hooks: {
    afterChange: [revalidateEvent],
    afterDelete: [revalidateEventDelete],
    afterRead: [
      ({ doc }) => {
        if (doc && doc.date) {
          doc.status = getEffectiveEventStatus(doc);
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
      ],
      required: true,
      admin: { position: 'sidebar' }
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Workshop', value: 'workshop' },
        { label: 'Hackathon', value: 'hackathon' },
        { label: 'Competition', value: 'competition' },
        { label: 'Seminar', value: 'seminar' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' }
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'startTime',
      type: 'text',
      admin: { description: 'E.g. 10:00 AM' }
    },
    {
      name: 'endTime',
      type: 'text',
      admin: { description: 'E.g. 05:00 PM' }
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullDescription',
      type: 'richText',
    },
    {
      name: 'registrationLink',
      type: 'text',
      admin: { description: 'Google Form or other registration link' }
    },
    {
      name: 'speakers',
      type: 'text',
      admin: { description: 'E.g. John Doe, Jane Smith' }
    },
    {
      name: 'coverPhoto',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    },
    {
      name: 'participants',
      type: 'text',
      admin: { description: 'E.g. "120+ Students"' }
    },
    ...slugField(),
  ],
}
