import { getPayload } from "payload";
import configPromise from "@payload-config";
import GalleryClient from "./gallery.client";

export default async function GallerySection() {
  const payload = await getPayload({ config: configPromise });
  
  const galleryReq = await payload.find({
    collection: "gallery",
    limit: 20,
    sort: '-createdAt',
  });
  const photos = galleryReq.docs || [];

  if (photos.length === 0) return null;

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-handjet tracking-wider">Club Gallery</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Glimpses of our workshops, events, and community.</p>
        </div>
        
        {/* Pass data to client component for filtering and lightbox */}
        <GalleryClient photos={photos} />
      </div>
    </section>
  );
}
