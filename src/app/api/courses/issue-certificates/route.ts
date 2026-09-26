import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers, cookies } from 'next/headers'
import { sendCertificateEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const headersList = await headers()
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value

    // Authenticate user
    let authResult = await payload.auth({ headers: headersList })
    let user = authResult.user

    if (!user && token) {
      try {
        const customHeaders = new Headers(headersList)
        customHeaders.set('Authorization', `JWT ${token}`)
        authResult = await payload.auth({ headers: customHeaders })
        user = authResult.user
      } catch {
        // Fallback failed
      }
    }

    // Verify Admin permission
    const isAdmin = user?.role === 'admin' || user?.email === 'ajays.sharma27@gmail.com'
    if (!user || !isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Only administrators can issue course certificates.' },
        { status: 403 }
      )
    }

    const body = await req.json().catch(() => ({}))
    const courseId = body.courseId

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required.' },
        { status: 400 }
      )
    }

    // Fetch Course details
    const course = await payload.findByID({
      collection: 'courses',
      id: courseId,
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found.' }, { status: 404 })
    }

    // Find all enrollments for this course where admin selected the student
    const selectedEnrollments = await payload.find({
      collection: 'enrollments',
      where: {
        and: [
          { course: { equals: course.id } },
          { selectedForCertificate: { equals: true } },
        ],
      },
      depth: 2,
      limit: 500,
    })

    const results = {
      totalSelected: selectedEnrollments.totalDocs,
      certificatesCreated: 0,
      emailsSent: 0,
      details: [] as Array<{ student: string; email: string; certificateId: string; emailStatus: string }>,
    }

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://codingclubcuh.online'

    for (const enrollment of selectedEnrollments.docs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const studentObj = enrollment.student as any
      if (!studentObj || !studentObj.id) continue

      const studentName = studentObj.name || studentObj.username || 'Student'
      const studentEmail = studentObj.email

      let certificateId = ''
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let certDoc = enrollment.certificate as any

      // 1. Create Certificate document if one does not exist yet
      if (!certDoc || !certDoc.id) {
        const year = new Date().getFullYear()
        const randomNum = Math.floor(1000 + Math.random() * 9000)
        certificateId = `CCCUH-CRS-${year}-${randomNum}`

        certDoc = await payload.create({
          collection: 'certificates',
          data: {
            student: studentObj.id,
            studentName,
            department: (course.department === 'Computer Science' || course.department === 'Information Technology' || course.department === 'Other') ? course.department : 'Computer Science and IT',
            course: 'Other',
            semester: 'Completed',
            internship: course.title,
            startDate: course.startingDate,
            endDate: course.completionDate || new Date().toISOString(),
            issueDate: new Date().toISOString(),
            isIssued: true,
            certificateId,
            courseRef: course.id,
          },
        })

        // Link certificate back to enrollment
        await payload.update({
          collection: 'enrollments',
          id: enrollment.id,
          data: {
            certificate: certDoc.id,
            status: 'completed',
          },
        })

        results.certificatesCreated++
      } else {
        certificateId = certDoc.certificateId
      }

      // 2. Dispatch Certificate Email from cuhcodingclub@gmail.com
      let emailStatus = 'skipped'
      if (studentEmail && !enrollment.certificateSent) {
        const emailResult = await sendCertificateEmail({
          to: studentEmail,
          studentName,
          courseTitle: course.title,
          certificateId,
          issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          serverUrl,
        })

        if (emailResult.success) {
          await payload.update({
            collection: 'enrollments',
            id: enrollment.id,
            data: {
              certificateSent: true,
              certificateSentAt: new Date().toISOString(),
            },
          })
          results.emailsSent++
          emailStatus = emailResult.simulated ? 'simulated_sent' : 'sent'
        } else {
          emailStatus = `failed: ${emailResult.error}`
        }
      } else if (enrollment.certificateSent) {
        emailStatus = 'already_sent'
      }

      results.details.push({
        student: studentName,
        email: studentEmail || 'No email',
        certificateId,
        emailStatus,
      })
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${results.totalSelected} student(s): ${results.certificatesCreated} certificate(s) generated, ${results.emailsSent} email(s) dispatched.`,
      summary: results,
    })
  } catch (error) {
    console.error('Certificate batch issuance error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred during certificate issuance.' },
      { status: 500 }
    )
  }
}
