"use client"

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
    const router = useRouter()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Determine if they are logging in with email or roll number
        const isEmail = identifier.includes('@')
        const loginData = isEmail 
            ? { email: identifier, password }
            : { username: identifier, password }

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })

            const data = await res.json()

            if (res.ok && data.user) {
                toast.success('Login successful!')
                router.push('/student')
                router.refresh() // Force refresh layout to pick up cookie
            } else {
                toast.error(data.errors?.[0]?.message || 'Invalid email or password.')
            }
        } catch {
            toast.error('An error occurred during login. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form onSubmit={handleSubmit} className="bg-muted m-auto h-fit w-full max-w-md overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <Link href="/" aria-label="go home" className="mx-auto block w-fit">
                            <Logo />
                        </Link>
                        <h1 className="text-title mb-1 mt-4 text-2xl font-semibold font-handjet tracking-wider">Coding Club CUH</h1>
                        <p className="text-sm">Sign in to your member account</p>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="identifier">University Email or Roll Number</Label>
                            <Input 
                                id="identifier" 
                                type="text" 
                                placeholder="student@example.com or 2109..." 
                                required 
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-muted-foreground hover:text-foreground text-sm font-medium underline-offset-4 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="••••••••" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <div className="flex justify-center">
                            <Button type="button" variant="outline" asChild className="w-full">
                                <Link href="/admin">
                                    Go to Admin Panel
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Not a member yet?
                        <Button asChild variant="link" className="px-2">
                            <Link href="/auth/signup">Register</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
