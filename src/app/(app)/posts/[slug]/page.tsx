import type { Metadata } from "next";

import { RelatedPosts } from "@/payload/blocks/RelatedPosts/Component";
import { PayloadRedirects } from "@/components/payload/PayloadRedirects";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import RichText from "@/components/payload/RichText";

import { PostHero } from "@/payload/heros/PostHero";
import { PostGallery } from "@/components/payload/PostGallery";
import { generateMeta } from "@/payload/utilities/generateMeta";
import PageClient from "./page.client";
import { LivePreviewListener } from "@/components/payload/LivePreviewListener";

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise });
    const posts = await payload.find({
      collection: "posts",
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    });

    const params = posts.docs
      .filter((doc) => Boolean(doc.slug && typeof doc.slug === "string"))
      .map(({ slug }) => ({ slug: slug! }));

    return params || [];
  } catch (error) {
    console.warn("Unable to query posts during generateStaticParams:", error);
    return [];
  }
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { isEnabled: draft } = await draftMode();
  const { slug = "" } = await params;

  if (!slug || slug === "null" || slug === "undefined") {
    notFound();
  }

  const url = "/posts/" + slug;
  const post = await queryPostBySlug({ slug });

  if (!post) return <PayloadRedirects url={url} />;

  // Check if content has actual text/blocks
  const hasRichContent = Boolean(
    post.content &&
      typeof post.content === "object" &&
      post.content.root &&
      Array.isArray(post.content.root.children) &&
      post.content.root.children.length > 0
  );

  return (
    <article className="pb-20 bg-background min-h-screen">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Post Hero Section */}
      <PostHero post={post} />

      {/* Main Post Body */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 pt-10">
        {/* Full Post Description / Announcement Section */}
        {post.description && (
          <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-mono">
              About this Post / Announcement
            </h3>
            <div className="text-foreground/90 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
              {post.description}
            </div>
          </div>
        )}

        {/* RichText Content */}
        {hasRichContent && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <RichText data={post.content} enableGutter={false} />
          </div>
        )}

        {/* Up to 10 Image Gallery */}
        {post.images && Array.isArray(post.images) && post.images.length > 0 && (
          <PostGallery images={post.images} postTitle={post.title} />
        )}

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-border">
            <RelatedPosts
              className="max-w-none"
              docs={post.relatedPosts.filter(
                (p: any) => typeof p === "object"
              ) as any}
            />
          </div>
        )}
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug = "" } = await params;
  if (!slug || slug === "null" || slug === "undefined") {
    return {};
  }
  const post = await queryPostBySlug({ slug });

  return generateMeta({ doc: post });
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  if (!slug || slug === "null" || slug === "undefined") {
    return null;
  }

  try {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });

    const isNumeric = /^\d+$/.test(slug);

    // Try finding by slug, or by ID if slug is numeric
    const result = await payload.find({
      collection: "posts",
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      depth: 2,
      where: isNumeric
        ? {
            or: [
              { slug: { equals: slug } },
              { id: { equals: Number(slug) } },
            ],
          }
        : {
            slug: {
              equals: slug,
            },
          },
    });

    return result.docs?.[0] || null;
  } catch (error) {
    console.warn("Unable to query post by slug:", error);
    return null;
  }
});
