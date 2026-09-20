import Image from "next/image";
import React from "react";

export default function CustomAdminIcon() {
  return (
    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))",
        border: "1px solid rgba(59, 130, 246, 0.5)",
        boxShadow: "0 0 12px -2px rgba(59, 130, 246, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src="/ccc_logo.png"
        width={26}
        height={26}
        alt="CC"
        style={{
          objectFit: "contain",
          filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.5))",
        }}
      />
    </div>
  );
}