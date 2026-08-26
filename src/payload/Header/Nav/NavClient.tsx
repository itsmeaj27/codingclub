'use client'

import { Button } from '@/components/ui/button'
import { Menu, Moon, Sun, Wallet, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'

function NavClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button className="hidden md:flex bg-[#FE9601] hover:bg-[#E5860A] text-white">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t">
          <nav className="flex flex-col space-y-4 mt-4">
            <a href="#about" className="hover:text-[#FE9601] transition-colors">
              About
            </a>
            <a href="#creators" className="hover:text-[#FE9601] transition-colors">
              For Creators
            </a>
            <a href="#readers" className="hover:text-[#FE9601] transition-colors">
              For Readers
            </a>
            <a href="#faq" className="hover:text-[#FE9601] transition-colors">
              FAQ
            </a>
            <Button className="bg-[#FE9601] hover:bg-[#E5860A] text-white">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}

export default NavClient
