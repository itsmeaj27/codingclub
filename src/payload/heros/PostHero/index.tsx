import { formatDateTime } from "@/payload/utilities/formatDateTime";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User as UserIcon } from "lucide-react";

import type { Post } from "@/payload-types";
import { formatAuthors } from "@/payload/utilities/formatAuthors";
import { PostCarousel } from "@/components/payload/PostCarousel";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const { categories, heroImage, images, populatedAuthors, publishedAt, title } = post;

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== "";

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

        {/* Instagram-Style Post Carousel or Featured Image */}
        <div className="mt-8">
          <PostCarousel
            images={images}
            heroImage={heroImage}
            title={title}
          />
        </div>
      </div>
    </div>
  );
};
