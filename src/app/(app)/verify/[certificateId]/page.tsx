"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface CertificateData {
  certificateId: string;
  studentName: string;
  department: string;
  course: string;
  semester: string;
  internship: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  isIssued: boolean;
}

export default function CertificateVerificationPage() {
  const params = useParams();
  const router = useRouter();
  const certificateId = params.certificateId as string;
  
  const [loading, setLoading] = useState(true);
  const [certData, setCertData] = useState<CertificateData | null>(null);

  useEffect(() => {
    async function verifyCertificate() {
      try {
        const res = await fetch(`/api/certificates?where[certificateId][equals]=${certificateId}`);
        const data = await res.json();
        
        if (data.docs && data.docs.length > 0) {
          const cert = data.docs[0];
          // Only verified if isIssued is true
          if (cert.isIssued) {
            setCertData(cert);
          }
        }
      } catch (e) {
        console.error("Error verifying certificate", e);
      } finally {
        setLoading(false);
      }
    }

    if (certificateId) {
      verifyCertificate();
    }
  }, [certificateId]);

  function formatDate(dateInput: string) {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">CODING CLUB CUH</h1>
          <p className="text-sm text-slate-500 font-medium">Certificate Verification System</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <button 
            onClick={() => router.push('/verify')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Search
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-2">
                <ShieldCheck className="text-[#1a365d]" size={28} />
                Certificate Verification
              </h2>
              <p className="text-slate-500 font-mono bg-slate-100 px-4 py-1 rounded-full text-sm">
                ID: {certificateId}
              </p>
            </div>

            <div className="p-8 bg-slate-50/50">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1a365d] rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-500 font-medium animate-pulse">Verifying certificate...</p>
                </div>
              ) : certData ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 flex flex-col items-center text-center">
                    <CheckCircle className="text-emerald-500 mb-3" size={48} />
                    <h3 className="text-xl font-bold text-emerald-800 mb-1">Certificate Verified</h3>
                    <p className="text-emerald-600">This certificate has been successfully verified.</p>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                      
                      <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Student Name</p>
                        <p className="text-slate-800 font-semibold text-lg">{certData.studentName}</p>
                      </div>
                      
                      <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Department</p>
                        <p className="text-slate-800 font-medium">{certData.department}</p>
                      </div>
                      
                      <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Course / Semester</p>
                        <p className="text-slate-800 font-medium">{certData.course}, {certData.semester}</p>
                      </div>
                      
                      <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Internship / Event</p>
                        <p className="text-slate-800 font-medium text-[#1a365d]">{certData.internship}</p>
                      </div>
                      
                      <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</p>
                        <p className="text-slate-800 font-medium">
                          {formatDate(certData.startDate)} - {formatDate(certData.endDate)}
                        </p>
                      </div>
                      
                      <div className="p-4 sm:p-5 hover:bg-slate-50 transition-colors border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Issuing Organization</p>
                        <p className="text-slate-800 font-medium">Coding Club CUH</p>
                        <p className="text-xs text-slate-500 mt-1">Date of Issue: {formatDate(certData.issueDate)}</p>
                      </div>
                      
                    </div>
                  </div>

                  {/* Add View & Download Button here */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <Link 
                      href={`/certificate/${certificateId}`}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#137558] text-white font-bold rounded-xl hover:bg-[#0e5641] transition-colors shadow-sm"
                    >
                      🎓 View & Download Official Certificate
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-8 flex flex-col items-center">
                    <XCircle className="text-red-500 mb-4" size={56} />
                    <h3 className="text-2xl font-bold text-red-800 mb-2">Certificate Not Found</h3>
                    <p className="text-red-600 max-w-sm">
                      The certificate ID entered is invalid or could not be verified in our system. Please check the ID and try again.
                    </p>
                    <button
                      onClick={() => router.push('/verify')}
                      className="mt-6 px-6 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Try Another ID
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
