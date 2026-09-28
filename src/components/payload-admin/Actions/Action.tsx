"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentInfo } from "@payloadcms/ui";

export default function MyCustomAction() {
  const pathname = usePathname();
  const docInfo = useDocumentInfo();
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [loadingMaintenance, setLoadingMaintenance] = useState<boolean>(false);

  // Extract collection slug and whether we are on an edit or create page
  const match = pathname?.match(/\/admin\/collections\/([^/]+)(?:\/([^/]+))?/);
  const collectionSlug = docInfo?.collectionSlug || (match ? match[1] : null);
  const isDocView = Boolean(match && match[2]); // Either document ID or 'create'

  // Format collection title nicely (e.g. 'gallery' -> 'Gallery')
  const collectionLabel = collectionSlug
    ? collectionSlug.charAt(0).toUpperCase() + collectionSlug.slice(1)
    : "List";

  // Fetch current maintenance status
  useEffect(() => {
    fetch("/api/maintenance")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.maintenanceMode === "boolean") {
          setMaintenanceMode(data.maintenanceMode);
        }
      })
      .catch(() => {});
  }, []);

  // Toggle Maintenance Mode
  const handleToggleMaintenance = async () => {
    const newState = !maintenanceMode;
    const confirmMsg = newState
      ? "Turn ON Maintenance Mode? Students will NOT be able to log in, and a maintenance banner will be displayed on the home page."
      : "Turn OFF Maintenance Mode? Student login will be restored.";

    if (!window.confirm(confirmMsg)) return;

    setLoadingMaintenance(true);
    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenanceMode: newState }),
      });
      const data = await res.json();
      if (res.ok) {
        setMaintenanceMode(data.maintenanceMode);
      } else {
        alert(data.error || "Failed to update maintenance mode.");
      }
    } catch {
      alert("Error contacting maintenance API.");
    } finally {
      setLoadingMaintenance(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
      }}
    >
      {/* Back to List Button (Doc View) */}
      {isDocView && collectionSlug && (
        <Link
          href={`/admin/collections/${collectionSlug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            fontSize: "11px",
            fontWeight: 500,
            borderRadius: "6px",
            background: "var(--theme-elevation-150, #222)",
            color: "var(--theme-elevation-800, #eee)",
            border: "1px solid var(--theme-elevation-250, #444)",
            textDecoration: "none",
          }}
          title={`Back to ${collectionLabel} List`}
        >
          ⬅ {collectionLabel}
        </Link>
      )}

      {/* Maintenance Mode Quick Toggle */}
      <button
        onClick={handleToggleMaintenance}
        disabled={loadingMaintenance}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "4px 10px",
          fontSize: "11px",
          fontWeight: 700,
          borderRadius: "6px",
          cursor: "pointer",
          border: maintenanceMode
            ? "1px solid rgba(239, 68, 68, 0.5)"
            : "1px solid rgba(16, 185, 129, 0.35)",
          background: maintenanceMode
            ? "rgba(239, 68, 68, 0.15)"
            : "rgba(16, 185, 129, 0.1)",
          color: maintenanceMode ? "#fca5a5" : "#6ee7b7",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
        title="Toggle Maintenance Mode"
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: maintenanceMode ? "#ef4444" : "#10b981",
            boxShadow: maintenanceMode
              ? "0 0 6px #ef4444"
              : "0 0 6px #10b981",
            flexShrink: 0,
          }}
        />
        {loadingMaintenance
          ? "..."
          : maintenanceMode
          ? "MAINTENANCE"
          : "LIVE"}
      </button>

      {/* Visit Website */}
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 8px",
          fontSize: "11px",
          fontWeight: 500,
          borderRadius: "6px",
          background: "var(--theme-elevation-100, #181818)",
          color: "var(--theme-elevation-650, #bbb)",
          border: "1px solid var(--theme-elevation-200, #333)",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        🌐 View Site
      </Link>

      {/* Super Admin Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 8px",
          borderRadius: "6px",
          background: "rgba(59, 130, 246, 0.12)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          color: "#93c5fd",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          flexShrink: 0,
        }}
        title="Super Administrator"
      >
        ⚙️ ADMIN
      </div>

      {/* Log Out Button */}
      <Link
        href="/admin/logout"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 10px",
          fontSize: "11px",
          fontWeight: 700,
          borderRadius: "6px",
          background: "rgba(239, 68, 68, 0.2)",
          border: "1px solid rgba(239, 68, 68, 0.45)",
          color: "#fca5a5",
          textDecoration: "none",
          flexShrink: 0,
        }}
        title="Log Out"
      >
        🚪 Log Out
      </Link>
    </div>
  );
}
