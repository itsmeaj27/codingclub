import Image from "next/image";
import React from "react";

export default function CustomAdminLogo() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
        padding: "6px 0",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25))",
          border: "1px solid rgba(59, 130, 246, 0.4)",
          boxShadow: "0 0 20px -4px rgba(59, 130, 246, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src="/ccc_logo.png"
          width={36}
          height={36}
          alt="Coding Club CUH"
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 2px 8px rgba(59, 130, 246, 0.5))",
          }}
          priority
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "19px",
              fontWeight: 800,
              letterSpacing: "0.04em",
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            CODING CLUB
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 7px",
              borderRadius: "6px",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(244, 63, 94, 0.2))",
              border: "1px solid rgba(239, 68, 68, 0.45)",
              color: "#fca5a5",
              textTransform: "uppercase",
              boxShadow: "0 0 10px rgba(239, 68, 68, 0.3)",
            }}
          >
            🛡️ SUPER ADMIN
          </span>
        </div>
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#94a3b8",
            marginTop: "3px",
          }}
        >
          Central University of Haryana
        </span>
      </div>
    </div>
  );
}