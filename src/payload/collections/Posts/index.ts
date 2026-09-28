import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import { slugField } from '@/payload/fields/slug'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    description: true,
    heroImage: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'showOnHome', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content & Media',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Give your post a title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'About this Post',
      admin: {
        description: 'Write a short summary or description about this post (shown in previews & cards)',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
      admin: {
        description: 'Optional cover/hero image for the post',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: 'Post Content',
      required: true,
      admin: {
        description: 'Write your post content here. Use the toolbar for formatting.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
        description: 'Auto-set when you publish',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: 'Show on Home Page',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Display this post in the blog section on home page',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // Hidden field for populating author data
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
