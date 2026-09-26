"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDocumentInfo } from "@payloadcms/ui";

export default function MyCustomAction() {
  const pathname = usePathname();
  const router = useRouter();
  const docInfo = useDocumentInfo();

  // Extract collection slug and whether we are on an edit or create page
  const match = pathname?.match(/\/admin\/collections\/([^/]+)(?:\/([^/]+))?/);
  const collectionSlug = docInfo?.collectionSlug || (match ? match[1] : null);
  const isDocView = Boolean(match && match[2]); // Either document ID or 'create'

  // Format collection title nicely (e.g. 'gallery' -> 'Gallery')
  const collectionLabel = collectionSlug
    ? collectionSlug.charAt(0).toUpperCase() + collectionSlug.slice(1)
    : "List";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {isDocView && collectionSlug && (
        <Link
          href={`/admin/collections/${collectionSlug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            fontSize: "12px",
            fontWeight: 500,
            borderRadius: "6px",
            background: "var(--theme-elevation-150, #222)",
            color: "var(--theme-elevation-800, #eee)",
            border: "1px solid var(--theme-elevation-250, #444)",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          title={`Back to ${collectionLabel} List`}
        >
          <span>⬅</span> Back to {collectionLabel}
        </Link>
      )}

      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "4px 10px",
          fontSize: "12px",
          fontWeight: 500,
          borderRadius: "6px",
          background: "var(--theme-elevation-100, #181818)",
          color: "var(--theme-elevation-650, #bbb)",
          border: "1px solid var(--theme-elevation-200, #333)",
          textDecoration: "none",
        }}
      >
        <span>🌐</span> Visit Website
      </Link>
    </div>
  );
}
