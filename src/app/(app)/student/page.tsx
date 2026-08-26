import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Award, User, ShieldCheck } from 'lucide-react'
import { LogoutButton } from '@/components/logout-button'
import type { Certificate } from '@/payload-types'

export default async function StudentDashboard() {
  const payload = await getPayload({ config: configPromise })
  
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    redirect('/auth/login')
  }

  let user = null
  try {
    const meReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    }).catch(() => null)
    
    if (meReq?.ok) {
        const meData = await meReq.json()
        user = meData?.user
    }
  } catch (error) {
    console.error("Failed to fetch user session", error)
  }

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch certificates linked to this user account (by student relationship)
  const userCerts = await payload.find({
    collection: 'certificates',
    where: {
      student: {
        equals: user.id
      }
    }
  })

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#1a365d] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {String(user.name)?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 font-handjet tracking-wide">
                Welcome back, {user.name}!
              </h1>
              <p className="text-zinc-500">{user.email}</p>
            </div>
          </div>
          
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">
              <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-[#1a365d]" />
                Student Profile
              </h3>
              <div className="space-y-3 text-sm text-zinc-600">
                <div className="flex justify-between border-b border-zinc-100 pb-2">
                  <span className="font-medium">Name:</span>
                  <span>{user.name}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-100 pb-2">
                  <span className="font-medium">Roll No:</span>
                  <span className="font-mono text-zinc-700">{user.username || '—'}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-100 pb-2">
                  <span className="font-medium">Email:</span>
                  <span className="truncate max-w-[140px]">{user.email}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-100 pb-2">
                  <span className="font-medium">Role:</span>
                  <span className="uppercase text-xs bg-zinc-100 px-2 py-1 rounded font-bold">Student</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a365d] rounded-2xl shadow-sm text-white p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <ShieldCheck size={100} />
               </div>
               <h3 className="text-lg font-bold mb-2 relative z-10">Verify Center</h3>
               <p className="text-sm text-blue-100 mb-6 relative z-10">Check the authenticity of any Coding Club certificate.</p>
               <Link href="/verify" className="inline-flex bg-white text-[#1a365d] px-4 py-2 rounded-lg font-bold text-sm relative z-10 hover:bg-blue-50 transition-colors">
                 Go to Verifier
               </Link>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <Award size={20} className="text-[#d4af37]" />
                  Your Certificates
                </h3>
                <span className="bg-[#d4af37] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {userCerts.docs.filter(c => c.isIssued).length} Issued
                </span>
              </div>

              {userCerts.docs.filter(c => c.isIssued).length > 0 ? (
                <div className="grid gap-4">
                  {userCerts.docs.filter(c => c.isIssued).map((cert: Certificate) => (
                    <div key={cert.id} className="border border-zinc-200 rounded-xl p-4 hover:border-[#2d7a5e] hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Issued</span>
                          </div>
                          <h4 className="font-bold text-zinc-800 text-base">{cert.internship}</h4>
                          <p className="text-xs text-zinc-500 mt-1">
                            <span className="font-medium text-zinc-600">Certificate ID:</span> {cert.certificateId}
                          </p>
                          {cert.issueDate && (
                            <p className="text-xs text-zinc-500">
                              <span className="font-medium text-zinc-600">Issued on:</span>{' '}
                              {new Date(cert.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                          <Link
                            href={`/certificate/${cert.certificateId}`}
                            className="text-sm font-bold bg-[#2d7a5e] text-white px-5 py-2.5 rounded-lg hover:bg-[#1a5c42] transition-colors text-center"
                          >
                            🎓 View & Download
                          </Link>
                          <Link
                            href={`/verify/${cert.certificateId}`}
                            className="text-sm font-medium border border-zinc-300 text-zinc-600 px-5 py-2 rounded-lg hover:border-[#2d7a5e] hover:text-[#2d7a5e] transition-colors text-center"
                          >
                            🔍 Verify
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-zinc-400 border-2 border-dashed border-zinc-100 rounded-xl">
                  <Award size={48} className="mb-2 opacity-20" />
                  <p className="font-medium text-zinc-500">No certificates issued yet.</p>
                  <p className="text-sm text-zinc-400">Complete an event or internship to earn one!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Courses and Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <span className="text-xl">📚</span>
              Enrolled Courses
            </h3>
            <div className="flex flex-col items-center justify-center h-32 text-zinc-400 border-2 border-dashed border-zinc-100 rounded-xl">
              <p className="font-medium text-zinc-500">No active courses.</p>
              <p className="text-sm text-zinc-400">Enroll in upcoming courses to see your progress!</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <span className="text-xl">📅</span>
              Upcoming Events
            </h3>
            <div className="flex flex-col items-center justify-center h-32 text-zinc-400 border-2 border-dashed border-zinc-100 rounded-xl">
              <p className="font-medium text-zinc-500">No registered events.</p>
              <p className="text-sm text-zinc-400">Join the next Coding Club event!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
