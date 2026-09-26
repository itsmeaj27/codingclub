import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const CertificateSettings: GlobalConfig = {
  slug: 'certificate-settings',
  label: 'Certificate Settings & Signatures',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Club Core',
    description: 'Manage course batches, student rosters, 1-click certificate generation, and upload global signatures.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🎓 Certificate Hub (Batches & Students)',
          fields: [
            {
              name: 'certificateHubUI',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/payload-admin/CertificateHub#default',
                },
              },
            },
          ],
        },
        {
          label: '✍️ Signatures & Email Settings',
          fields: [
            {
              type: 'collapsible',
              label: 'Official Signatures (One-Time Upload)',
              admin: {
                description: 'Upload official signatures here once. They will automatically be attached to all generated certificates.',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'signatureInstructor',
                  label: 'Default Program Instructor Signature',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Digital signature image for Program Instructor (PNG with transparent background recommended).',
                  },
                },
                {
                  name: 'signatureCoordinator',
                  label: 'Default Program Co-ordinator Signature',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Digital signature image for Program Co-ordinator.',
                  },
                },
                {
                  name: 'signatureStudentCoordinator',
                  label: 'Default Student Co-ordinator Signature',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Digital signature image for Student Co-ordinator.',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Issuance & Email Defaults',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'senderEmail',
                      label: 'Certificate Sender Email',
                      type: 'email',
                      defaultValue: 'cuhcodingclub@gmail.com',
                      admin: {
                        description: 'Email address shown as sender for certificate notifications.',
                      },
                    },
                    {
                      name: 'autoSendEmailOnIssue',
                      label: 'Automatically email certificate link upon generation',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
