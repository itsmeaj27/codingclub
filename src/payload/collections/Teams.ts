import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Teams: CollectionConfig<'teams'> = {
  slug: 'teams',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'category', 'order'],
    description: 'Manage Coding Club Core Committee, Technical Team, and Faculty Coordinators.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the team member or committee group',
      },
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      admin: { description: 'Role or designation, e.g. Core Lead, Full-Stack Developer, Workshop Lead' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'core',
      options: [
        { label: 'Core Committee', value: 'core' },
        { label: 'Technical Team', value: 'technical' },
        { label: 'Faculty Coordinator & Leadership', value: 'faculty' },
        { label: 'Design & Media', value: 'design' },
        { label: 'Event & Outreach', value: 'outreach' },
      ],
      admin: {
        description: 'Category determines which section on the Team page this member appears under',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 10,
      admin: {
        description: 'Sort order within the category (lower numbers appear first, e.g. 1, 2, 3...)',
      },
    },
    {
      name: 'courseYear',
      type: 'text',
      label: 'Course & Year / Department',
      admin: { description: 'E.g. B.Tech Computer Science & Engineering, 3rd Year' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload member photo (automatically uploaded and organized in Cloudinary)',
      },
    },
    {
      name: 'photoUrl',
      type: 'text',
      label: 'Photo Direct URL (Cloudinary / Web URL)',
      admin: {
        description: 'Direct Cloudinary or image link (used if no media upload is attached)',
      },
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn Profile URL',
      admin: { description: 'https://linkedin.com/in/username' },
    },
    {
      name: 'github',
      type: 'text',
      label: 'GitHub Profile URL',
      admin: { description: 'https://github.com/username' },
    },
  ],
}
