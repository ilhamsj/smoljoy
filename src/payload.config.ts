import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Media } from './collections/Media'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Breeds } from './collections/Breeds'
import { Breeders } from './collections/Breeders'
import { Provinces } from './collections/Provinces'
import { ParentAnimals } from './collections/ParentAnimals'
import { Litters } from './collections/Litters'
import { Pets } from './collections/Pets'
import { syncToAlgoliaTask } from './payload/jobs/syncToAlgolia'
import path from 'path'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  onInit: async (payload) => {
    payload.logger.info('Payload initialized')
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: {
      prefillOnly: true,
      email: 'dev@example.com',
      password: 'dev@example.com',
    },
  },
  collections: [Users, Media, Breeds, Provinces, Breeders, ParentAnimals, Litters, Pets],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  jobs: {
    jobsCollectionOverrides: ({ defaultJobsCollection }) => {
      if (!defaultJobsCollection.admin) {
        defaultJobsCollection.admin = {}
      }

      defaultJobsCollection.admin.hidden = false
      return defaultJobsCollection
    },
    deleteJobOnComplete: false,
    tasks: [syncToAlgoliaTask],
    autoRun: [
      {
        cron: '* * * * *',
        limit: 20,
        queue: 'default',
      },
    ],
  },
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: !!process.env.S3_FORCE_PATH_STYLE,
      },
    }),
  ],
  bin: [
    {
      scriptPath: path.resolve(dirname, 'payload/bin/seed/index.ts'),
      key: 'seed',
    },
    {
      scriptPath: path.resolve(dirname, 'payload/bin/reindex/index.ts'),
      key: 'reindex',
    },
  ],
})
