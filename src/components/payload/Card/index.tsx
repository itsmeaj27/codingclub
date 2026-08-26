"use client";
import { cn } from "@/lib/utils";
import useClickableCard from "@/payload/utilities/useClickableCard";
import Link from "next/link";
import React, { Fragment } from "react";

import type { Post } from "@/payload-types";
import { Media } from "@/components/payload/Media";

export type CardPostData = Pick<
  Post,
  "slug" | "categories" | "meta" | "title" | "heroImage"
>;

export const Card: React.FC<{
  className?: string;
  doc?: CardPostData;
  relationTo?: "posts";
  showCategories?: boolean;
  title?: string;
}> = (props) => {
  const { card, link } = useClickableCard({});
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props;

  const { slug, categories, meta, title, heroImage } = doc || {};
  const { description } = meta || {};

  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedDescription = description?.replace(/\s/g, " ");
  const href = `/${relationTo}/${slug}`;
  return (
    <article
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer",
        "text-foreground dark:text-foreground flex flex-col",
        className
      )}
      ref={card.ref}
    >
      {/* Image Section with fixed ratio */}
      <div className="relative w-full aspect-[16/9] bg-muted dark:bg-muted overflow-hidden">
        {heroImage && typeof heroImage !== "string" ? (
          <Media size="33vw" resource={heroImage} />
        ) : (
          <div className="flex items-center justify-center size-full text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {showCategories && hasCategories && (
          <div className="uppercase text-xs font-medium mb-3 text-muted-foreground dark:text-muted-foreground">
            {categories?.map((category, index) => {
              if (typeof category === "object") {
                const { title: titleFromCategory } = category;
                const categoryTitle = titleFromCategory || "Untitled category";
                const isLast = index === categories.length - 1;

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                );
              }
              return null;
            })}
          </div>
        )}

        {titleToUse && (
          <h3 className="text-lg font-semibold leading-snug mb-2 line-clamp-2 min-h-[3.5rem]">
            <Link
              href={href}
              ref={link.ref}
              className="hover:text-primary transition-colors"
            >
              {titleToUse}
            </Link>
          </h3>
        )}

        {description && (
          <p className="text-sm text-muted-foreground dark:text-muted-foreground line-clamp-3 min-h-[4.5rem]">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  );
};
