"use client"

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SignupPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('') // Roll number
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // First, create the user
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password,
                    role: 'student' // even if we send it, access control forces default/ignores if not admin
                }),
            })

            const data = await res.json()

            if (res.ok) {
                toast.success('Account created! Logging you in...')
                
                // Automatically log them in after signup
                const loginRes = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                })

                if (loginRes.ok) {
                    router.push('/student')
                    router.refresh()
                } else {
                    router.push('/auth/login')
                }
            } else {
                toast.error(data.errors?.[0]?.message || 'Failed to create account. Email or Roll No might already exist.')
            }
        } catch {
            toast.error('An error occurred. Please try again.')
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
                        <h1 className="text-title mb-1 mt-4 text-2xl font-semibold font-handjet tracking-wider">Join Coding Club CUH</h1>
                        <p className="text-sm">Register to become an official member of the club</p>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullname" className="block text-sm">Full Name</Label>
                            <Input 
                                type="text" 
                                required 
                                id="fullname" 
                                placeholder="Student Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="studentid" className="block text-sm">Student ID / Roll No</Label>
                            <Input 
                                type="text" 
                                required 
                                id="studentid" 
                                placeholder="University Roll No"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="block text-sm">University Email</Label>
                            <Input 
                                type="email" 
                                required 
                                id="email" 
                                placeholder="example@cuh.ac.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pwd" className="block text-sm">Password</Label>
                            <Input 
                                type="password" 
                                required 
                                id="pwd" 
                                placeholder="Create a secure password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full mt-4 bg-[#1a365d] text-white hover:bg-[#112340]" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Already a member?
                        <Button asChild variant="link" className="px-2">
                            <Link href="/auth/login">Sign In</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
