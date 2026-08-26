"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Gallery } from "@/payload-types";

export default function GalleryClient({ photos }: { photos: Gallery[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "events", label: "Events" },
    { id: "workshops", label: "Workshops" },
    { id: "team", label: "Team" },
  ];

  const filteredPhotos = activeCategory === "all" 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id 
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" 
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            className="relative group rounded-xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 break-inside-avoid"
            onClick={() => setSelectedImage(photo)}
          >
            {photo.image && typeof photo.image === 'object' && photo.image.url && (
              <Image 
                src={photo.image.url} 
                alt={photo.caption || "Gallery image"}
                width={photo.image.width || 800}
                height={photo.image.height || 600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <div className="text-white text-center p-4">
                <Maximize2 className="w-8 h-8 mx-auto mb-2 opacity-75" />
                <p className="font-medium text-sm">{photo.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" className="rounded-full px-8">
          View All Gallery
        </Button>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden">
             {selectedImage.image && typeof selectedImage.image === 'object' && selectedImage.image.url && (
              <Image 
                src={selectedImage.image.url} 
                alt={selectedImage.caption || "Gallery image"}
                fill
                className="object-contain"
              />
             )}
          </div>
          {selectedImage.caption && (
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-6 py-2 rounded-full backdrop-blur-md">
              {selectedImage.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
