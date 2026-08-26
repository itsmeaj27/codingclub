import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/payload/CollectionArchive";
import { PageRange } from "@/components/payload/PageRange";
import { Pagination } from "@/components/payload/Pagination";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import PageHeader from "@/components/page-header";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
  });

  return (
    <section className="">
      {/* Reuse consistent PageHeader */}
      <PageHeader
        pagetitle="Latest Posts"
        image1="/images/icons/info.png"
        image2="/images/icons/node.png"
        pagedescription="Explore articles, tutorials, and updates from our community."
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-0 py-8">
        {/* Top Section with Title and Controls */}

        {/* Pagination Info */}
        <div className="mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        {/* Posts Archive */}
        <CollectionArchive posts={posts.docs} />

        {/* Pagination Controls */}
        {posts.totalPages > 1 && posts.page && (
          <div className="mt-12 flex justify-center">
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}
      </div>
    </section>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Coding Club CUH - Posts",
  };
}
