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
> & {
  id?: number;
  images?: unknown[] | null;
  description?: string | null;
};

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
    relationTo = "posts",
    showCategories,
    title: titleFromProps,
  } = props;

  const { slug, categories, meta, title, heroImage } = doc || {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docAny = doc as any;
  const rawDesc = docAny?.description || meta?.description;
  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedDescription = rawDesc?.replace(/\s/g, " ");

  const imageToUse =
    heroImage && typeof heroImage !== "string"
      ? heroImage
      : docAny?.images &&
        Array.isArray(docAny.images) &&
        docAny.images.length > 0 &&
        typeof docAny.images[0] === "object"
      ? docAny.images[0]
      : null;

  const docId = docAny?.id;
  const href = slug
    ? `/${relationTo}/${slug}`
    : docId
    ? `/${relationTo}/${docId}`
    : `/${relationTo}`;
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
        {imageToUse ? (
          <Media size="33vw" resource={imageToUse} />
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

        {sanitizedDescription && (
          <p className="text-sm text-muted-foreground dark:text-muted-foreground line-clamp-3 min-h-[4.5rem]">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  );
};
