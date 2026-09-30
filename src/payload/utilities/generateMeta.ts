import type { Metadata } from "next";

import type { Media, Page, Post, Config } from "@/payload-types";

import { mergeOpenGraph } from "./mergeOpenGraph";
import { getServerSideURL } from "./getURL";

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + "/website-template-OG.webp";

  if (image && typeof image === "object" && "url" in image) {
    const ogUrl = image.sizes?.og?.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null;
}): Promise<Metadata> => {
  const { doc } = args;
  const docMeta = (doc as any)?.meta;

  const ogImage = getImageURL(docMeta?.image);

  const title = docMeta?.title
    ? docMeta?.title + " | CUH Coding Club Post"
    : "CUH Coding Club Post";

  return {
    description: docMeta?.description,
    openGraph: mergeOpenGraph({
      description: docMeta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title,
  };
};
