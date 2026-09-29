"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from "lucide-react";
import type { Media } from "@/payload-types";

interface PostGalleryProps {
  images?: (number | Media | null)[] | null;
  postTitle?: string;
}

export function PostGallery({ images, postTitle = "Post" }: PostGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract valid image objects with URLs
  const validImages: Media[] = React.useMemo(() => {
    if (!images || !Array.isArray(images)) return [];
    return images.filter(
      (img): img is Media =>
        typeof img === "object" && img !== null && typeof img.url === "string" && img.url.length > 0
    );
  }, [images]);

  const handleOpen = (idx: number) => {
    setLightboxIndex(idx);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? validImages.length - 1 : prev - 1;
    });
  }, [validImages.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === validImages.length - 1 ? 0 : prev + 1;
    });
  }, [validImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  if (validImages.length === 0) return null;

  return (
    <section className="my-10 w-full max-w-[54rem] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Photo Gallery
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          {validImages.length} {validImages.length === 1 ? "Image" : "Images"}
        </span>
      </div>

      {/* Grid Layout depending on image count (1 to 10) */}
      <div
        className={
          validImages.length === 1
            ? "grid grid-cols-1 gap-4"
            : validImages.length === 2
            ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
            : validImages.length === 3
            ? "grid grid-cols-1 sm:grid-cols-3 gap-4"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        }
      >
        {validImages.map((img, idx) => {
          const isSingle = validImages.length === 1;
          const altText = img.alt || `${postTitle} photo ${idx + 1}`;

          return (
            <div
              key={img.id || idx}
              onClick={() => handleOpen(idx)}
              className={`group relative overflow-hidden rounded-xl border border-border bg-muted cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 ${
                isSingle ? "aspect-[16/9] w-full max-h-[500px]" : "aspect-square"
              }`}
            >
              <Image
                src={img.url!}
                alt={altText}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay with zoom icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>
              {/* Photo number indicator */}
              <span className="absolute bottom-2 right-2 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm opacity-90">
                {idx + 1}/{validImages.length}
              </span>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && validImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          {validImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Navigation Next */}
          {validImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Main Lightbox Image View */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh] flex items-center justify-center">
              <Image
                src={validImages[lightboxIndex].url!}
                alt={validImages[lightboxIndex].alt || `${postTitle} photo`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption & Counter */}
            <div className="mt-3 text-center">
              <p className="text-white/70 text-xs font-mono">
                {lightboxIndex + 1} of {validImages.length}
              </p>
              {validImages[lightboxIndex].alt && (
                <p className="text-white/90 text-sm mt-1 max-w-lg">
                  {validImages[lightboxIndex].alt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
