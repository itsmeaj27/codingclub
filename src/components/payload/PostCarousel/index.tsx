"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
} from "lucide-react";
import type { Media } from "@/payload-types";
import { cn } from "@/lib/utils";

interface PostCarouselProps {
  images?: (number | Media | null)[] | null;
  heroImage?: number | Media | null;
  title?: string;
  className?: string;
}

export function PostCarousel({
  images,
  heroImage,
  title = "Post",
  className,
}: PostCarouselProps) {
  // Extract and normalize all valid media images
  const mediaList: Media[] = React.useMemo(() => {
    const list: Media[] = [];

    // First check multi-images
    if (images && Array.isArray(images)) {
      for (const item of images) {
        if (
          item &&
          typeof item === "object" &&
          typeof item.url === "string" &&
          item.url.length > 0
        ) {
          list.push(item);
        }
      }
    }

    // If no multi-images, fallback to heroImage
    if (list.length === 0 && heroImage && typeof heroImage === "object" && heroImage.url) {
      list.push(heroImage);
    }

    return list;
  }, [images, heroImage]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      emblaApi?.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      emblaApi?.scrollNext();
    },
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  // Lightbox handlers
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleLightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? mediaList.length - 1 : prev - 1;
    });
  }, [mediaList.length]);

  const handleLightboxNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === mediaList.length - 1 ? 0 : prev + 1;
    });
  }, [mediaList.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handleLightboxPrev();
      if (e.key === "ArrowRight") handleLightboxNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleLightboxNext, handleLightboxPrev]);

  if (mediaList.length === 0) return null;

  const totalCount = mediaList.length;
  const isMulti = totalCount > 1;

  return (
    <>
      <div
        className={cn(
          "relative w-full rounded-2xl overflow-hidden border border-border shadow-md bg-neutral-950 select-none group",
          className
        )}
      >
        {/* Main Viewport Container */}
        <div ref={emblaRef} className="overflow-hidden w-full">
          <div className="flex touch-pan-y">
            {mediaList.map((media, idx) => {
              const altText = media.alt || `${title} photo ${idx + 1}`;
              const isFirst = idx === 0;

              return (
                <div
                  key={media.id || idx}
                  className="relative min-w-0 shrink-0 grow-0 basis-full aspect-[16/10] sm:aspect-[16/9] max-h-[520px] flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => handleOpenLightbox(idx)}
                >
                  {/* Subtle Blurred Background of Image for Portrait/Variable aspect ratios */}
                  <Image
                    src={media.url!}
                    alt=""
                    fill
                    aria-hidden
                    className="object-cover blur-2xl scale-125 opacity-25 pointer-events-none"
                    priority={isFirst}
                  />

                  {/* Sharp Front Image with object-contain */}
                  <Image
                    src={media.url!}
                    alt={altText}
                    fill
                    priority={isFirst}
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Top-Right Badge: Instagram Counter or Multi-photo Tag */}
        {isMulti && (
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold tracking-wide shadow-md border border-white/10 pointer-events-none">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>
              {selectedIndex + 1} / {totalCount}
            </span>
          </div>
        )}

        {/* Top-Left Expand Hint */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenLightbox(selectedIndex);
          }}
          className="absolute top-3.5 left-3.5 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-md border border-white/10"
          title="View full screen"
          aria-label="View full screen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Instagram Left Arrow Button */}
        {isMulti && canScrollPrev && (
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/15 transition-all hover:scale-105 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </button>
        )}

        {/* Instagram Right Arrow Button */}
        {isMulti && canScrollNext && (
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/15 transition-all hover:scale-105 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 -mr-0.5" />
          </button>
        )}

        {/* Instagram Bottom Dots Pagination Indicator */}
        {isMulti && (
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/10">
            {mediaList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => scrollTo(idx, e)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  idx === selectedIndex
                    ? "w-5 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal (Fullscreen Zoom / Slideshow) */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10 text-white w-full max-w-6xl mx-auto pt-2 px-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">
                {title}
              </span>
              {isMulti && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/15 font-mono">
                  {lightboxIndex + 1} / {totalCount}
                </span>
              )}
            </div>
            <button
              onClick={handleCloseLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Lightbox Image Viewport */}
          <div
            className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isMulti && (
              <button
                onClick={handleLightboxPrev}
                className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative w-full h-full max-h-[82vh] flex items-center justify-center">
              <Image
                src={mediaList[lightboxIndex].url!}
                alt={mediaList[lightboxIndex].alt || `${title} photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {isMulti && (
              <button
                onClick={handleLightboxNext}
                className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip for Quick Switching */}
          {isMulti && (
            <div
              className="flex items-center justify-center gap-2 overflow-x-auto max-w-2xl mx-auto py-2 px-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {mediaList.map((thumb, idx) => (
                <button
                  key={thumb.id || idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={cn(
                    "relative size-12 sm:size-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                    idx === lightboxIndex
                      ? "border-primary scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={thumb.url!}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
