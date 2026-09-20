import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token, password } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Reset token is missing. Please request a new link.' },
        { status: 400 },
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    await payload.resetPassword({
      collection: 'users',
      data: {
        token,
        password,
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      success: true,
      message: 'Password reset successful! You can now sign in with your new password.',
    })
  } catch (error: unknown) {
    console.error('Reset password error:', error)
    const errMessage =
      error instanceof Error && error.message.includes('Token')
        ? 'The password reset link is invalid or has expired. Please request a new one.'
        : 'Failed to reset password. The link may have expired or is invalid.'

    return NextResponse.json({ error: errMessage }, { status: 400 })
  }
}
