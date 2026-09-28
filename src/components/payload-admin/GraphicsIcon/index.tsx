import Image from "next/image";
import React from "react";

export default function CustomAdminIcon() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Image
        src="/ccc_logo.png"
        width={20}
        height={20}
        alt="CC"
        style={{
          width: "auto",
          height: "100%",
          maxHeight: "22px",
          objectFit: "contain",
          filter: "drop-shadow(0 1px 3px rgba(59, 130, 246, 0.4))",
        }}
        priority
      />
    </div>
  );
}