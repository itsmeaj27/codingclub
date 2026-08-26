import { getCachedGlobal } from '@/payload/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import Link from 'next/link'
import { Logo } from '@/components/payload/Logo/Logo'
import NavClient from './Nav/NavClient'
import { CMSLink } from '@/components/payload/Link'
import { SearchIcon } from 'lucide-react'
import { AdminBar } from '@/components/payload-admin/AdminBar'
import { draftMode } from 'next/headers'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const navItems = headerData?.navItems || []
  const { isEnabled } = await draftMode()

  return (
    <>
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b`}
      >
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Logo loading="eager" priority="high" className="" />
              </Link>
            </div>

            <nav className="flex gap-3 items-center">
              {navItems.map(({ link }, i) => {
                return <CMSLink key={i} {...link} appearance="link" />
              })}
              <Link 
                href="/verify" 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#1a365d] text-white hover:bg-[#112340] rounded-full transition-colors mr-2"
              >
                Verify Certificate
              </Link>
              <Link href="/search">
                <span className="sr-only">Search</span>
                <SearchIcon className="w-5 text-primary" />
              </Link>
            </nav>

            {/* <HeaderNav data={headerData} /> */}

            {/* Desktop Navigation
            <nav className="hidden md:flex items-center space-x-8">
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
            </nav> */}

            <NavClient />
          </div>
        </div>
      </header>
    </>
  )
}

// return <HeaderClient data={headerData} />
