"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck } from "lucide-react";

export default function VerifySearchPage() {
  const [certId, setCertId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      router.push(`/verify/${certId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">CODING CLUB CUH</h1>
          <p className="text-sm text-slate-500 font-medium">Certificate Verification System</p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1a365d] bg-opacity-10 text-[#1a365d] rounded-full flex items-center justify-center mb-4">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 text-center">Verify Certificate</h2>
            <p className="text-slate-500 text-center mt-2">Enter the Certificate ID to verify its authenticity.</p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Certificate ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="e.g. CCCUH-INT-2026-0001"
                  className="w-full p-4 pl-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1a365d] outline-none text-slate-800 font-mono"
                  required
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#1a365d] hover:bg-[#112340] text-white font-bold py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Verify Now
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
