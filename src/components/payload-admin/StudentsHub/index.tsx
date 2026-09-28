"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Download,
  RefreshCw,
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  ExternalLink,
  ChevronRight,
  X,
  Mail,
  Building,
  Hash,
  ShieldCheck,
} from "lucide-react";

interface StudentUser {
  id: string | number;
  name?: string;
  email: string;
  username?: string; // Roll number
  course?: string;
  semester?: string;
  department?: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
  enrollmentsCount?: number;
  certificatesCount?: number;
  enrolledCourses?: Array<{ id: string | number; title: string; status: string }>;
  certificates?: Array<{ id: string | number; certificateId: string; courseTitle: string; issueDate: string }>;
}

const STYLES = `
  .sh-root {
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #f1f5f9;
    box-sizing: border-box;
    padding: 4px 0 24px 0;
  }
  .sh-glass {
    background: rgba(15, 17, 26, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
  }
  .sh-header-card {
    padding: 24px 28px;
    margin-bottom: 24px;
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%);
    border: 1px solid rgba(14, 165, 233, 0.25);
    border-radius: 20px;
  }
  .sh-stat-card {
    padding: 18px 20px;
    border-radius: 14px;
    background: rgba(18, 20, 32, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.2s ease;
  }
  .sh-stat-card:hover {
    border-color: rgba(14, 165, 233, 0.4);
    transform: translateY(-2px);
  }
  .sh-filter-input {
    background: #0f1322 !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: 10px !important;
    color: #ffffff !important;
    padding: 8px 14px !important;
    font-size: 13.5px !important;
    outline: none !important;
    transition: all 0.2s ease !important;
  }
  .sh-filter-input:focus {
    border-color: #0ea5e9 !important;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.25) !important;
  }
  .sh-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    font-size: 13.5px;
  }
  .sh-table th {
    padding: 14px 16px;
    background: rgba(12, 14, 22, 0.9);
    color: #94a3b8;
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .sh-table td {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    vertical-align: middle;
  }
  .sh-table tr:hover td {
    background: rgba(255, 255, 255, 0.025);
  }
  .sh-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
  }
  .sh-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  .sh-btn-primary {
    background: linear-gradient(135deg, #0ea5e9, #3b82f6);
    color: #ffffff;
    box-shadow: 0 2px 10px rgba(14, 165, 233, 0.3);
  }
  .sh-btn-primary:hover {
    box-shadow: 0 4px 16px rgba(14, 165, 233, 0.5);
    transform: translateY(-1px);
  }
  .sh-btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .sh-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
  }
  .sh-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.82);
    backdrop-filter: blur(10px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
`;

export default function StudentsHub() {
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [selectedSemester, setSelectedSemester] = useState("ALL");
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [selectedStudent, setSelectedStudent] = useState<StudentUser | null>(null);

  // Load all students and related metrics
  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Users
      const usersRes = await fetch("/api/users?limit=1000&sort=-createdAt").then((r) => r.json()).catch(() => null);
      const allUsers: any[] = usersRes?.docs || [];

      // 2. Fetch Enrollments
      const enrollmentsRes = await fetch("/api/enrollments?limit=1000&depth=1").then((r) => r.json()).catch(() => null);
      const allEnrollments: any[] = enrollmentsRes?.docs || [];

      // 3. Fetch Certificates
      const certsRes = await fetch("/api/certificates?limit=1000&depth=1").then((r) => r.json()).catch(() => null);
      const allCerts: any[] = certsRes?.docs || [];

      // Filter for students (role === 'student' or all users)
      const mappedStudents: StudentUser[] = allUsers.map((u) => {
        const studentEnrollments = allEnrollments.filter((e) => {
          const sId = typeof e.student === "object" ? e.student?.id : e.student;
          return String(sId) === String(u.id);
        });

        const studentCerts = allCerts.filter((c) => {
          const sId = typeof c.student === "object" ? c.student?.id : c.student;
          return String(sId) === String(u.id);
        });

        return {
          id: u.id,
          name: u.name || "Student",
          email: u.email || "",
          username: u.username || "",
          course: u.course || "",
          semester: u.semester || "",
          department: u.department || "",
          role: u.role || "student",
          createdAt: u.createdAt || new Date().toISOString(),
          updatedAt: u.updatedAt,
          enrollmentsCount: studentEnrollments.length,
          certificatesCount: studentCerts.length,
          enrolledCourses: studentEnrollments.map((e) => ({
            id: typeof e.course === "object" ? e.course?.id : e.course,
            title: typeof e.course === "object" ? e.course?.title : "Course",
            status: e.status || "enrolled",
          })),
          certificates: studentCerts.map((c) => ({
            id: c.id,
            certificateId: c.certificateId || String(c.id),
            courseTitle: typeof c.course === "object" ? c.course?.title : c.courseTitle || "Certificate",
            issueDate: c.issueDate || c.createdAt,
          })),
        };
      });

      setStudents(mappedStudents);
    } catch (err) {
      console.error("Failed to load students directory:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter options derived from data
  const coursesList = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.course && s.course.trim()) set.add(s.course.trim());
    });
    return Array.from(set).sort();
  }, [students]);

  const semestersList = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.semester && s.semester.trim()) set.add(s.semester.trim());
    });
    return Array.from(set).sort();
  }, [students]);

  const yearsList = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.createdAt) {
        const y = new Date(s.createdAt).getFullYear();
        if (!isNaN(y)) set.add(String(y));
      }
    });
    return Array.from(set).sort().reverse();
  }, [students]);

  const monthsList = [
    { num: "01", name: "January" },
    { num: "02", name: "February" },
    { num: "03", name: "March" },
    { num: "04", name: "April" },
    { num: "05", name: "May" },
    { num: "06", name: "June" },
    { num: "07", name: "July" },
    { num: "08", name: "August" },
    { num: "09", name: "September" },
    { num: "10", name: "October" },
    { num: "11", name: "November" },
    { num: "12", name: "December" },
  ];

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = s.name?.toLowerCase().includes(q);
        const matchesEmail = s.email?.toLowerCase().includes(q);
        const matchesUsername = s.username?.toLowerCase().includes(q);
        const matchesDept = s.department?.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesUsername && !matchesDept) return false;
      }

      // Course filter
      if (selectedCourse !== "ALL" && s.course?.trim() !== selectedCourse) return false;

      // Semester / Batch filter
      if (selectedSemester !== "ALL" && s.semester?.trim() !== selectedSemester) return false;

      // Year filter
      if (selectedYear !== "ALL") {
        const y = String(new Date(s.createdAt).getFullYear());
        if (y !== selectedYear) return false;
      }

      // Month filter
      if (selectedMonth !== "ALL") {
        const m = String(new Date(s.createdAt).getMonth() + 1).padStart(2, "0");
        if (m !== selectedMonth) return false;
      }

      return true;
    });
  }, [students, search, selectedCourse, selectedSemester, selectedYear, selectedMonth]);

  // Export Filtered Students to CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Roll Number / Username", "Email", "Course", "Semester", "Department", "Role", "Enrolled Courses", "Certificates Earned", "Joined Date"];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.name || ""}"`,
      `"${s.username || ""}"`,
      `"${s.email || ""}"`,
      `"${s.course || ""}"`,
      `"${s.semester || ""}"`,
      `"${s.department || ""}"`,
      s.role,
      s.enrollmentsCount || 0,
      s.certificatesCount || 0,
      `"${new Date(s.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `codingclub_students_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="sh-root">
      <style>{STYLES}</style>

      {/* Top Header Card */}
      <div className="sh-header-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(14, 165, 233, 0.4)",
                }}
              >
                <Users size={22} color="#ffffff" />
              </div>
              <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em" }}>
                Student Directory & Academic Roster
              </h1>
            </div>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "14px" }}>
              Filter, search, and view registered students by course, semester batch, month, and year.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={loadData} className="sh-btn sh-btn-secondary" title="Refresh Student List">
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button onClick={handleExportCSV} className="sh-btn sh-btn-primary">
              <Download size={15} />
              Export CSV ({filteredStudents.length})
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginTop: "24px" }}>
          <div className="sh-stat-card">
            <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Total Registered Students</div>
            <div style={{ fontSize: "26px", fontWeight: 800, color: "#38bdf8", marginTop: "4px" }}>
              {students.length}
            </div>
          </div>
          <div className="sh-stat-card">
            <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Filtered View</div>
            <div style={{ fontSize: "26px", fontWeight: 800, color: "#a78bfa", marginTop: "4px" }}>
              {filteredStudents.length}
            </div>
          </div>
          <div className="sh-stat-card">
            <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Available Courses</div>
            <div style={{ fontSize: "26px", fontWeight: 800, color: "#34d399", marginTop: "4px" }}>
              {coursesList.length || 0}
            </div>
          </div>
          <div className="sh-stat-card">
            <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Batch Semesters</div>
            <div style={{ fontSize: "26px", fontWeight: 800, color: "#fbbf24", marginTop: "4px" }}>
              {semestersList.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="sh-glass" style={{ padding: "18px 20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          {/* Search Box */}
          <div style={{ position: "relative", flex: "1 1 240px" }}>
            <Search size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "11px" }} />
            <input
              type="text"
              className="sh-filter-input"
              style={{ width: "100%", paddingLeft: "36px" }}
              placeholder="Search by name, roll no, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Course Dropdown */}
          <div style={{ flex: "1 1 140px" }}>
            <select
              className="sh-filter-input"
              style={{ width: "100%" }}
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="ALL">All Courses</option>
              {coursesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Semester / Batch Dropdown */}
          <div style={{ flex: "1 1 140px" }}>
            <select
              className="sh-filter-input"
              style={{ width: "100%" }}
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="ALL">All Semesters / Batches</option>
              {semestersList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div style={{ flex: "1 1 110px" }}>
            <select
              className="sh-filter-input"
              style={{ width: "100%" }}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="ALL">All Years</option>
              {yearsList.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Month Dropdown */}
          <div style={{ flex: "1 1 120px" }}>
            <select
              className="sh-filter-input"
              style={{ width: "100%" }}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="ALL">All Months</option>
              {monthsList.map((m) => (
                <option key={m.num} value={m.num}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {(search || selectedCourse !== "ALL" || selectedSemester !== "ALL" || selectedYear !== "ALL" || selectedMonth !== "ALL") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCourse("ALL");
                setSelectedSemester("ALL");
                setSelectedYear("ALL");
                setSelectedMonth("ALL");
              }}
              className="sh-btn sh-btn-secondary"
              style={{ fontSize: "12px", padding: "6px 10px" }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Students Table */}
      <div className="sh-glass" style={{ overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#94a3b8" }}>
            <RefreshCw size={32} className="animate-spin" style={{ margin: "0 auto 12px auto", color: "#0ea5e9" }} />
            <div>Loading student directory...</div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#94a3b8" }}>
            <Users size={36} style={{ margin: "0 auto 12px auto", opacity: 0.4 }} />
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#e2e8f0" }}>No students found</div>
            <div style={{ fontSize: "13px", marginTop: "4px" }}>Try adjusting your search query or filter options.</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="sh-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Course & Semester</th>
                  <th>Department</th>
                  <th>Joined Date</th>
                  <th>Academics</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(99, 102, 241, 0.25))",
                            border: "1px solid rgba(14, 165, 233, 0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            color: "#38bdf8",
                            fontSize: "14px",
                          }}
                        >
                          {s.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "#ffffff" }}>{s.name}</div>
                          <div style={{ fontSize: "12px", color: "#94a3b8" }}>{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontFamily: "monospace", color: "#cbd5e1", fontSize: "12.5px" }}>
                        {s.username || "—"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span className="sh-badge" style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
                          <GraduationCap size={12} />
                          {s.course || "Not Specified"}
                        </span>
                        {s.semester && (
                          <span style={{ fontSize: "11px", color: "#94a3b8", marginLeft: "4px" }}>
                            {s.semester}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ color: "#cbd5e1", fontSize: "12.5px" }}>
                        {s.department || "—"}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                        {new Date(s.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <span
                          className="sh-badge"
                          style={{
                            background: "rgba(16, 185, 129, 0.15)",
                            color: "#34d399",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                          }}
                          title="Enrolled Courses"
                        >
                          <BookOpen size={11} /> {s.enrollmentsCount || 0}
                        </span>
                        <span
                          className="sh-badge"
                          style={{
                            background: "rgba(245, 158, 11, 0.15)",
                            color: "#fbbf24",
                            border: "1px solid rgba(245, 158, 11, 0.3)",
                          }}
                          title="Earned Certificates"
                        >
                          <Award size={11} /> {s.certificatesCount || 0}
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="sh-btn sh-btn-secondary"
                        style={{ fontSize: "12px", padding: "5px 12px" }}
                      >
                        View Details
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="sh-modal-backdrop" onClick={() => setSelectedStudent(null)}>
          <div
            className="sh-glass"
            style={{
              maxWidth: "560px",
              width: "100%",
              padding: "28px",
              position: "relative",
              border: "1px solid rgba(14, 165, 233, 0.3)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                borderRadius: "8px",
                padding: "6px",
                cursor: "pointer",
                color: "#94a3b8",
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#ffffff",
                  boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
                }}
              >
                {selectedStudent.name?.charAt(0)?.toUpperCase() || "S"}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>
                  {selectedStudent.name}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "13px", color: "#94a3b8" }}>{selectedStudent.email}</span>
                  <span
                    className="sh-badge"
                    style={{
                      background: selectedStudent.role === "admin" ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)",
                      color: selectedStudent.role === "admin" ? "#fca5a5" : "#6ee7b7",
                    }}
                  >
                    {selectedStudent.role.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "20px",
                background: "rgba(10, 12, 18, 0.5)",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Roll Number
                </div>
                <div style={{ fontSize: "14px", color: "#e2e8f0", marginTop: "2px", fontFamily: "monospace" }}>
                  {selectedStudent.username || "Not assigned"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Course / Degree
                </div>
                <div style={{ fontSize: "14px", color: "#e2e8f0", marginTop: "2px" }}>
                  {selectedStudent.course || "Not set"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Semester / Batch
                </div>
                <div style={{ fontSize: "14px", color: "#e2e8f0", marginTop: "2px" }}>
                  {selectedStudent.semester || "Not set"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Department
                </div>
                <div style={{ fontSize: "14px", color: "#e2e8f0", marginTop: "2px" }}>
                  {selectedStudent.department || "Not set"}
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
                Enrolled Courses ({selectedStudent.enrolledCourses?.length || 0})
              </div>
              {selectedStudent.enrolledCourses && selectedStudent.enrolledCourses.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedStudent.enrolledCourses.map((c) => (
                    <span
                      key={c.id}
                      className="sh-badge"
                      style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", padding: "5px 10px" }}
                    >
                      <BookOpen size={12} /> {c.title}
                    </span>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: "13px", color: "#64748b" }}>Not enrolled in any courses yet.</div>
              )}
            </div>

            {/* Earned Certificates */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
                Certificates Earned ({selectedStudent.certificates?.length || 0})
              </div>
              {selectedStudent.certificates && selectedStudent.certificates.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedStudent.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: "rgba(245, 158, 11, 0.1)",
                        border: "1px solid rgba(245, 158, 11, 0.2)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Award size={15} color="#fbbf24" />
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#fbbf24" }}>{cert.courseTitle}</div>
                          <div style={{ fontSize: "11px", color: "#94a3b8" }}>ID: {cert.certificateId}</div>
                        </div>
                      </div>
                      <Link
                        href={`/verify/${cert.certificateId}`}
                        target="_blank"
                        className="sh-btn sh-btn-secondary"
                        style={{ fontSize: "11px", padding: "4px 8px" }}
                      >
                        Verify <ExternalLink size={11} />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: "13px", color: "#64748b" }}>No certificates issued yet.</div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <Link
                href={`/admin/collections/users/${selectedStudent.id}`}
                className="sh-btn sh-btn-primary"
                style={{ fontSize: "12.5px" }}
              >
                Edit in Admin Panel <ExternalLink size={13} />
              </Link>
              <button onClick={() => setSelectedStudent(null)} className="sh-btn sh-btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
