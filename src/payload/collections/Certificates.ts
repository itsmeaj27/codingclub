import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'certificateId', 'internship', 'isIssued'],
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'isIssued',
      type: 'checkbox',
      label: 'Issue Certificate (Make visible to user)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'certificateId',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Leave empty to auto-generate (e.g. CCCUH-INT-2026-XXXX)',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (!value) {
              const year = new Date().getFullYear();
              const randomNum = Math.floor(1000 + Math.random() * 9000);
              return `CCCUH-INT-${year}-${randomNum}`;
            }
            return value;
          }
        ]
      }
    },
    {
      name: 'student',
      label: 'Student (User Account)',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Link this certificate to the student\'s login account so they can see it in their dashboard.',
      },
    },
    {
      name: 'studentName',
      type: 'text',
      required: true,
    },
    {
      name: 'department',
      type: 'select',
      defaultValue: 'Computer Science and IT',
      options: [
        { label: 'Computer Science and IT', value: 'Computer Science and IT' },
        { label: 'Computer Science', value: 'Computer Science' },
        { label: 'Information Technology', value: 'Information Technology' },
        { label: 'Other', value: 'Other' },
      ],
      required: true,
    },
    {
      name: 'course',
      type: 'select',
      defaultValue: 'MCA',
      options: [
        { label: 'MCA', value: 'MCA' },
        { label: 'BCA', value: 'BCA' },
        { label: 'B.Tech', value: 'B.Tech' },
        { label: 'M.Tech', value: 'M.Tech' },
        { label: 'Other', value: 'Other' },
      ],
      required: true,
    },
    {
      name: 'semester',
      type: 'select',
      defaultValue: '1st Semester',
      options: [
        { label: '1st Semester', value: '1st Semester' },
        { label: '2nd Semester', value: '2nd Semester' },
        { label: '3rd Semester', value: '3rd Semester' },
        { label: '4th Semester', value: '4th Semester' },
        { label: '1st Year', value: '1st Year' },
        { label: '2nd Year', value: '2nd Year' },
        { label: '3rd Year', value: '3rd Year' },
      ],
      required: true,
    },
    {
      name: 'internship',
      label: 'Programme Name',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'issueDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        position: 'sidebar'
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (!value) {
              return new Date().toISOString();
            }
            return value;
          }
        ]
      }
    },
    {
      type: 'collapsible',
      label: 'Signatures (upload when ready)',
      admin: {
        description: 'Upload signature images. These will appear on the certificate.',
      },
      fields: [
        {
          name: 'signatureInstructor',
          label: 'Program Instructor Signature',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'signatureCoordinator',
          label: 'Program Co-ordinator Signature',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'signatureStudentCoordinator',
          label: 'Student Co-ordinator Signature',
          type: 'upload',
          relationTo: 'media',
        },
      ]
    }
  ],
}
