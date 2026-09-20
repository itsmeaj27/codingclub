"use client"

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { toast } from 'sonner'
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react'

function ResetPasswordForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    if (!token) {
        return (
            <div className="text-center space-y-6">
                <div className="mx-auto w-14 h-14 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-destructive" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">Invalid or Missing Link</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        This password reset link is invalid, incomplete, or may have already expired.
                    </p>
                </div>
                <Button asChild className="w-full bg-gradient-to-r from-primary to-accent text-white">
                    <Link href="/auth/forgot-password">
                        Request a New Reset Link
                    </Link>
                </Button>
                <div className="pt-2">
                    <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Link href="/auth/login" className="flex items-center gap-1.5">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Return to Sign In
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.')
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match. Please re-enter.')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password,
                }),
            })

            const data = await res.json()

            if (res.ok && data.success) {
                setSuccess(true)
                toast.success('Password reset successfully!')
                setTimeout(() => {
                    router.push('/auth/login')
                }, 2000)
            } else {
                toast.error(data.error || 'Failed to reset password. Please request a new link.')
            }
        } catch {
            toast.error('An error occurred. Please check your connection and try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="text-center space-y-6">
                <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">Password Reset Complete!</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Your password has been securely updated. You will now be redirected to the sign-in page.
                    </p>
                </div>
                <Button asChild className="w-full bg-gradient-to-r from-primary to-accent text-white">
                    <Link href="/auth/login">
                        Sign In Now
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="new-password" className="text-foreground">
                    New Password
                </Label>
                <div className="relative">
                    <Input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="focus:ring-primary/50 focus:border-primary bg-background border-border text-foreground pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Must be at least 6 characters.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-foreground">
                    Confirm New Password
                </Label>
                <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="focus:ring-primary/50 focus:border-primary bg-background border-border text-foreground"
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 glow-hover transition-all"
                disabled={loading}
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating Password...
                    </span>
                ) : (
                    'Set New Password'
                )}
            </Button>
        </form>
    )
}

export default function ResetPasswordPage() {
    return (
        <section className="flex min-h-screen bg-background relative px-4 py-16 md:py-32 overflow-hidden">
            {/* Background gradient light */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <div className="relative z-10 bg-card glass-card m-auto h-fit w-full max-w-md overflow-hidden rounded-2xl border border-border shadow-xl">
                {/* Top gradient accent */}
                <div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />

                <div className="p-8 pb-6">
                    <div className="text-center mb-6">
                        <Link href="/" aria-label="go home" className="mx-auto block w-fit">
                            <Logo />
                        </Link>
                        <h1 className="mb-1 mt-4 text-3xl font-semibold font-handjet tracking-wider text-gradient">
                            Create New Password
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Choose a strong, secure password for your student account
                        </p>
                    </div>

                    <Suspense
                        fallback={
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            </div>
                        }
                    >
                        <ResetPasswordForm />
                    </Suspense>
                </div>

                <div className="p-4 bg-muted/40 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                        Coding Club CUH • Central University of Haryana
                    </p>
                </div>
            </div>
        </section>
    )
}
