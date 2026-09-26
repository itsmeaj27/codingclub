"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

interface EnrollButtonProps {
  courseId: number | string;
  courseTitle: string;
  isEnrollmentOpen?: boolean;
  isCompleted?: boolean;
  isAlreadyEnrolled?: boolean;
}

export function EnrollButton({
  courseId,
  courseTitle,
  isEnrollmentOpen = true,
  isCompleted = false,
  isAlreadyEnrolled = false,
}: EnrollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(
    isAlreadyEnrolled ? "You are currently enrolled in this program." : null
  );

  const handleEnroll = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          // Redirect to login with callback
          router.push(`/auth/login?redirect=/courses/${courseId}`);
          return;
        }
        throw new Error(data.error || "Enrollment failed. Please try again.");
      }

      setSuccess(data.message || `Successfully enrolled in ${courseTitle}!`);
      // Short delay then navigate to student dashboard
      setTimeout(() => {
        router.push("/student");
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to enroll";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 text-center">
        <p className="text-sm font-semibold text-zinc-400">
          This course cohort has concluded. Certificates have been issued.
        </p>
      </div>
    );
  }

  if (!isEnrollmentOpen) {
    return (
      <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 text-center">
        <p className="text-sm font-semibold text-amber-400">
          Enrollment is temporarily closed for this course.
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center">
        <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-base mb-2">
          <CheckCircle2 size={20} />
          {success}
        </div>
        <p className="text-xs text-zinc-400 mb-4">
          Access your courses, materials, and certificates in the student portal.
        </p>
        <button
          onClick={() => router.push("/student")}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/30"
        >
          <span>Go to Student Dashboard</span>
          <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      <button
        onClick={handleEnroll}
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing Enrollment...</span>
          </>
        ) : (
          <>
            <BookOpen size={18} />
            <span>Enroll Now (1-Click)</span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-zinc-500">
        Instant registration &bull; Requires student account login
      </p>
    </div>
  );
}
