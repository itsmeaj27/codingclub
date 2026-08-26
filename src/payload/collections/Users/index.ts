import type { CollectionConfig } from 'payload'
import type { User } from '@/payload-types'

import { authenticated } from '../../access/authenticated'

const isAdmin = ({ req }: { req: { user?: User | null } }): boolean => {
  const user = req?.user;
  if (user?.role === 'admin') return true;
  if (user?.email === 'ajays.sharma27@gmail.com') return true;
  return false;
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isAdmin,
    create: () => true, // Allow public signups
    delete: isAdmin,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: true,
      requireUsername: false,
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Student', value: 'student' },
      ],
      defaultValue: 'student',
      required: true,
      access: {
        create: isAdmin,
        update: isAdmin,
      },
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'username',
      type: 'text',
      label: 'Roll Number / Username',
      unique: true,
      admin: {
        description: 'Optional roll number for student login without email.',
      },
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
