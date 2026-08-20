'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface HeaderPlatformProps {
  title?: string
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function InboxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function deriveTitle(pathname: string): string {
  if (pathname.startsWith('/channels/me')) {
    return 'Amis'
  }
  if (pathname.startsWith('/channels/discovery')) {
    return 'Découvrir'
  }
  if (pathname.startsWith('/quest-home')) {
    return 'Quêtes'
  }
  return 'Amis'
}

export function HeaderPlatform({ title }: HeaderPlatformProps) {
  const router = useRouter()
  const pathname = usePathname()
  const resolvedTitle = title ?? deriveTitle(pathname)

  return (
    <header className="flex h-12 shrink-0 items-center border-b border-[#1e1f22] bg-[#313338] px-4">
      <div className="flex shrink-0 items-center gap-1 text-[#b5bac1]">
        <button
          type="button"
          aria-label="Précédent"
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-[#35373c] hover:text-[#dbdee1]"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Suivant"
          onClick={() => router.forward()}
          className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-[#35373c] hover:text-[#dbdee1]"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center px-4">
        <span className="truncate text-base font-semibold leading-none text-[#f2f3f5]">
          {resolvedTitle}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-[#b5bac1]">
        <button type="button" aria-label="Réceptions" className="hover:text-[#dbdee1]">
          <InboxIcon />
        </button>
        <button type="button" aria-label="Aide" className="hover:text-[#dbdee1]">
          <HelpIcon />
        </button>
      </div>
    </header>
  )
}
