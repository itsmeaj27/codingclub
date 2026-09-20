import { getPayload } from "payload";
import configPromise from "@payload-config";
import GalleryClient from "./gallery.client";
import { SectionHeading } from "@/components/ui/section-heading";
import { CLOUDINARY_GALLERY_PHOTOS } from "@/lib/cloudinary-gallery";

export default async function GallerySection() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const galleryReq = await payload.find({
      collection: "gallery",
      limit: 30,
      sort: '-createdAt',
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let photos: any[] = galleryReq.docs || [];

    // Fallback seamlessly to the organized Cloudinary Gallery if CMS has no entries yet
    if (photos.length === 0) {
      photos = CLOUDINARY_GALLERY_PHOTOS.map((p) => ({
        id: p.id,
        caption: p.caption,
        category: p.category,
        image: {
          url: p.url,
          width: p.width,
          height: p.height,
        },
      }));
    }

    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title="Club Gallery"
            subtitle="Explore moments from our workshops, hackathons, and community activities."
            badge="Cloudinary Gallery"
          />
          <GalleryClient photos={photos} />
        </div>
      </section>
    );
  } catch (e) {
    console.error("Error loading gallery section:", e);
    // Direct Cloudinary Gallery fallback
    const fallbackPhotos = CLOUDINARY_GALLERY_PHOTOS.map((p) => ({
      id: p.id,
      caption: p.caption,
      category: p.category,
      image: {
        url: p.url,
        width: p.width,
        height: p.height,
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any[];

    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title="Club Gallery"
            subtitle="Explore moments from our workshops, hackathons, and community activities."
            badge="Cloudinary Gallery"
          />
          <GalleryClient photos={fallbackPhotos} />
        </div>
      </section>
    );
  }
}
