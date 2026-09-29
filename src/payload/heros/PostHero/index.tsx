import { formatDateTime } from "@/payload/utilities/formatDateTime";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User as UserIcon } from "lucide-react";

import type { Post, Media as MediaType } from "@/payload-types";
import { formatAuthors } from "@/payload/utilities/formatAuthors";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const { categories, heroImage, images, populatedAuthors, publishedAt, title } = post;

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== "";

  // Determine cover image URL (prefer heroImage, fallback to first gallery image)
  let coverUrl: string | null = null;
  let coverAlt = title;

  if (heroImage && typeof heroImage === "object" && heroImage.url) {
    coverUrl = heroImage.url;
    coverAlt = heroImage.alt || title;
  } else if (images && Array.isArray(images) && images.length > 0) {
    const firstImg = images[0];
    if (typeof firstImg === "object" && firstImg !== null && (firstImg as MediaType).url) {
      coverUrl = (firstImg as MediaType).url!;
      coverAlt = (firstImg as MediaType).alt || title;
    }
  }

  return (
    <div className="w-full bg-background border-b border-border/60 pb-8 pt-4">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1 px-2.5 rounded-lg hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Posts</span>
          </Link>
        </div>

        {/* Categories */}
        {categories && Array.isArray(categories) && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => {
              if (typeof category === "object" && category !== null) {
                const titleToUse = category.title || "Category";
                return (
                  <span
                    key={category.id || index}
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {titleToUse}
                  </span>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
          {title}
        </h1>

        {/* Metadata: Author & Published Date */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground pb-6 border-b border-border/60">
          {hasAuthors && (
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">{formatAuthors(populatedAuthors)}</span>
            </div>
          )}

          {publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <time dateTime={publishedAt}>
                {formatDateTime(publishedAt)}
              </time>
            </div>
          )}
        </div>

        {/* Featured Cover Image */}
        {coverUrl && (
          <div className="mt-8 relative aspect-[16/9] sm:aspect-[21/9] max-h-[480px] w-full rounded-2xl overflow-hidden border border-border shadow-md bg-muted">
            <Image
              src={coverUrl}
              alt={coverAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};
