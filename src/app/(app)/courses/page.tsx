import PageHeader from "@/components/page-header";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import { Calendar, User, BookOpen, ArrowRight, Award, CheckCircle2 } from "lucide-react";
import type { Course } from "@/payload-types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CoursesPage() {
  const payload = await getPayload({ config: configPromise });

  let cmsCourses: Course[] = [];
  try {
    const coursesReq = await payload.find({
      collection: "courses",
      limit: 50,
      sort: "-startingDate",
    });
    cmsCourses = coursesReq.docs || [];
  } catch (error) {
    console.error("Error loading courses from CMS:", error);
  }

  // Active / Upcoming Courses
  const activeCourses = cmsCourses.filter(
    (c) => c.status === "active" || c.status === "upcoming" || !c.status
  );

  // Completed Courses
  const completedCourses = cmsCourses.filter((c) => c.status === "completed");

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white pb-20">
      <PageHeader
        pagetitle="Courses & Workshops"
        pagedescription="Hands-on technical masterclasses, live bootcamps, and certification programs by Coding Club CUH."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Section 1: Active & Upcoming Programs */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                Active & Upcoming Courses
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Open for student registration. Complete the course to qualify for official certification.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300">
              {activeCourses.length} Programs
            </span>
          </div>

          {activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCourses.map((course) => {
                const courseSlug = course.slug || course.id;
                const isFree = !course.price || course.price === 0;

                return (
                  <div
                    key={course.id}
                    className="group relative bg-zinc-950/80 border border-zinc-800/80 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.25)] flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {course.status === "active" ? "In Progress" : "Enrollment Open"}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {isFree ? "Free for Students" : `₹${course.price}`}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      {/* Description */}
                      {course.description && (
                        <p className="text-zinc-400 text-sm mt-3 line-clamp-3 leading-relaxed">
                          {course.description}
                        </p>
                      )}

                      {/* Metadata */}
                      <div className="mt-6 pt-4 border-t border-zinc-900 space-y-2.5 text-xs text-zinc-400">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-blue-400" />
                          <span>Instructor: <strong className="text-zinc-200">{course.instructorName}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-emerald-400" />
                          <span>Starts: <strong className="text-zinc-200">{formatDate(course.startingDate)}</strong></span>
                        </div>
                        {course.department && (
                          <div className="flex items-center gap-2">
                            <BookOpen size={14} className="text-purple-400" />
                            <span>{course.department}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-4 border-t border-zinc-900/60">
                      <Link
                        href={`/courses/${courseSlug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 group-hover:gap-3"
                      >
                        <span>View & Enroll</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center bg-zinc-950/40">
              <BookOpen size={48} className="mx-auto text-zinc-600 mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-zinc-300">No new courses launched right now</h3>
              <p className="text-sm text-zinc-500 mt-1">
                New technical bootcamps and certifications are scheduled regularly. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Completed Programs Archive */}
        {completedCourses.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                  <Award className="text-amber-400" size={24} />
                  Completed Programs & Certifications
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Past courses completed by student cohorts. Certificates have been issued to selected candidates.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400">
                {completedCourses.length} Archived
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-zinc-950/50 border border-zinc-800/60 rounded-2xl p-6 flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                        <CheckCircle2 size={12} /> Completed
                      </span>
                      <span className="text-xs text-zinc-400">
                        {formatDate(course.startingDate)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-zinc-400">
                      Instructor: <strong className="text-zinc-300">{course.instructorName}</strong>
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      🎓 Certificates Awarded
                    </span>
                    <Link
                      href={`/verify`}
                      className="text-blue-400 hover:text-blue-300 underline font-medium"
                    >
                      Verify Credentials
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
