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
      where: {
        showOnWebsite: {
          not_equals: false,
        },
      },
      limit: 50,
      sort: "order",
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let docs: any[] = galleryReq.docs || [];

    // Map docs so image url can come from uploaded media OR direct imageUrl
    let photos = docs
      .map((p) => {
        let url: string | null = null;
        let width = 800;
        let height = 600;

        if (p.image && typeof p.image === "object" && p.image.url) {
          url = p.image.url;
          width = p.image.width || 800;
          height = p.image.height || 600;
        } else if (p.imageUrl) {
          url = p.imageUrl;
        }

        if (!url) return null;

        return {
          id: p.id,
          caption: p.caption,
          category: p.category,
          image: {
            url,
            width,
            height,
          },
        };
      })
      .filter(Boolean);

    // Fallback seamlessly to the organized Cloudinary Gallery if CMS has no active entries yet
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
            badge="Club Moments"
          />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <GalleryClient photos={photos as any[]} />
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
            badge="Club Moments"
          />
          <GalleryClient photos={fallbackPhotos} />
        </div>
      </section>
    );
  }
}
