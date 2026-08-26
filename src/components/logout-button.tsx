"use client"

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/users/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/auth/login')
      router.refresh() // Clear server component state
    } catch {
      toast.error('Failed to log out')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-red-50 hover:text-red-600 text-zinc-700 rounded-lg transition-colors font-medium disabled:opacity-50"
    >
      <LogOut size={18} />
      {loading ? 'Signing Out...' : 'Sign Out'}
    </button>
  )
}