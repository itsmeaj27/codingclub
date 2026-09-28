"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentInfo } from "@payloadcms/ui";
import Image from "next/image";

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
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      {/* Back to List Button (Doc View) */}
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

      {/* Maintenance Mode Quick Toggle Button */}
      <button
        onClick={handleToggleMaintenance}
        disabled={loadingMaintenance}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 12px",
          fontSize: "11.5px",
          fontWeight: 700,
          borderRadius: "8px",
          cursor: "pointer",
          border: maintenanceMode
            ? "1px solid rgba(239, 68, 68, 0.6)"
            : "1px solid rgba(16, 185, 129, 0.4)",
          background: maintenanceMode
            ? "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(185, 28, 28, 0.35))"
            : "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.2))",
          color: maintenanceMode ? "#fca5a5" : "#6ee7b7",
          boxShadow: maintenanceMode
            ? "0 0 14px rgba(239, 68, 68, 0.4)"
            : "0 0 10px rgba(16, 185, 129, 0.2)",
          transition: "all 0.2s ease",
        }}
        title="Click to toggle Maintenance Mode on/off"
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: maintenanceMode ? "#ef4444" : "#10b981",
            boxShadow: maintenanceMode
              ? "0 0 8px #ef4444"
              : "0 0 8px #10b981",
          }}
        />
        {loadingMaintenance
          ? "Updating..."
          : maintenanceMode
          ? "MAINTENANCE: ON"
          : "SITE: LIVE"}
      </button>

      {/* Visit Website Button */}
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 11px",
          fontSize: "12px",
          fontWeight: 500,
          borderRadius: "6px",
          background: "var(--theme-elevation-100, #181818)",
          color: "var(--theme-elevation-650, #bbb)",
          border: "1px solid var(--theme-elevation-200, #333)",
          textDecoration: "none",
        }}
      >
        <span>🌐</span> View Site
      </Link>

      {/* Super Admin Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 10px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))",
          border: "1px solid rgba(59, 130, 246, 0.35)",
          color: "#93c5fd",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          userSelect: "none",
        }}
        title="Logged in as Super Administrator"
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/ccc_logo.png"
            width={16}
            height={16}
            alt="Admin"
            style={{ objectFit: "contain" }}
          />
        </div>
        <span>SUPER ADMIN</span>
      </div>

      {/* High-Visibility Header Logout Button */}
      <Link
        href="/admin/logout"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 12px",
          fontSize: "12px",
          fontWeight: 700,
          borderRadius: "8px",
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(185, 28, 28, 0.35))",
          border: "1px solid rgba(239, 68, 68, 0.5)",
          color: "#ffffff",
          textDecoration: "none",
          boxShadow: "0 2px 10px rgba(239, 68, 68, 0.25)",
          transition: "all 0.2s ease",
        }}
        title="Log Out from Admin Portal"
      >
        <span>🚪</span> Log Out
      </Link>
    </div>
  );
}
