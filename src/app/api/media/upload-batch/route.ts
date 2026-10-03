import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { uploadToCloudinary } from '@/payload/utilities/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;

    const allFiles: File[] = [];
    if (files && files.length > 0) {
      allFiles.push(...files);
    } else if (singleFile) {
      allFiles.push(singleFile);
    }

    if (allFiles.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 });
    }

    const payload = await getPayload({ config: configPromise });
    // Upload all files concurrently to Cloudinary and create Media documents
    const createdDocs = await Promise.all(
      allFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const altText = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const folder = 'gallery/2026';

        // 1. Upload directly to Cloudinary
        const uploadResult = await uploadToCloudinary(
          buffer,
          file.name,
          file.type || 'image/jpeg',
          `codingclub/${folder}`
        );

        // 2. Persist media document in Payload DB
        const mediaDoc = await payload.create({
          collection: 'media',
          overrideAccess: true,
          data: {
            alt: altText,
            folder: folder,
            filename: `${uploadResult.public_id.split('/').pop()}.${uploadResult.format || 'jpg'}`,
            url: uploadResult.secure_url,
            filesize: uploadResult.bytes || buffer.length,
            width: uploadResult.width || null,
            height: uploadResult.height || null,
            mimeType: `image/${uploadResult.format || 'jpeg'}`,
          },
        });

        return {
          id: mediaDoc.id,
          filename: mediaDoc.filename,
          url: mediaDoc.url,
          alt: mediaDoc.alt,
          width: mediaDoc.width,
          height: mediaDoc.height,
        };
      })
    );

    return NextResponse.json({
      success: true,
      docs: createdDocs,
    });
  } catch (error) {
    console.error('Batch upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
