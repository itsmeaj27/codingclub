import React from "react";
import Link from "next/link";

const BeforeDashboard: React.FC = () => {
  return (
    <div
      style={{
        margin: "24px 0 32px 0",
        padding: "24px 28px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, rgba(15, 15, 22, 0.95), rgba(24, 24, 36, 0.85))",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "9999px",
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              color: "#60a5fa",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Club Admin Portal
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to Coding Club CUH Admin
          </h2>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: "14px",
              color: "#94a3b8",
            }}
          >
            Manage Core Committee & Technical Team members, events, gallery, and student certificates.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
        >
          <span>🌐 View Live Website</span>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
          marginTop: "16px",
        }}
      >
        <Link
          href="/admin/collections/teams"
          style={{
            display: "block",
            padding: "14px 16px",
            borderRadius: "12px",
            backgroundColor: "rgba(30, 41, 59, 0.4)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            textDecoration: "none",
            transition: "border-color 0.2s ease",
          }}
        >
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>👥</div>
          <div style={{ fontWeight: 700, fontSize: "14px", color: "#60a5fa" }}>Core & Tech Team</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Edit & add team members</div>
        </Link>

        <Link
          href="/admin/collections/events"
          style={{
            display: "block",
            padding: "14px 16px",
            borderRadius: "12px",
            backgroundColor: "rgba(30, 41, 59, 0.4)",
            border: "1px solid rgba(139, 92, 246, 0.25)",
            textDecoration: "none",
            transition: "border-color 0.2s ease",
          }}
        >
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>📅</div>
          <div style={{ fontWeight: 700, fontSize: "14px", color: "#a78bfa" }}>Events & Workshops</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Publish club events</div>
        </Link>

        <Link
          href="/admin/collections/media"
          style={{
            display: "block",
            padding: "14px 16px",
            borderRadius: "12px",
            backgroundColor: "rgba(30, 41, 59, 0.4)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            textDecoration: "none",
            transition: "border-color 0.2s ease",
          }}
        >
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>☁️</div>
          <div style={{ fontWeight: 700, fontSize: "14px", color: "#34d399" }}>Cloudinary Media</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Upload & organize photos</div>
        </Link>

        <Link
          href="/admin/collections/certificates"
          style={{
            display: "block",
            padding: "14px 16px",
            borderRadius: "12px",
            backgroundColor: "rgba(30, 41, 59, 0.4)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            textDecoration: "none",
            transition: "border-color 0.2s ease",
          }}
        >
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>🎓</div>
          <div style={{ fontWeight: 700, fontSize: "14px", color: "#fbbf24" }}>Certificates</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Issue student certs</div>
        </Link>
      </div>
    </div>
  );
};

export default BeforeDashboard;
