'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface FriendListToolbarProps {
  onlineCount?: number
  totalCount?: number
}

export function FriendListToolbar({ onlineCount = 0, totalCount = 0 }: FriendListToolbarProps) {
  const [activeTab, setActiveTab] = React.useState('online')

  const tabs = [
    { id: 'online', label: `En ligne${onlineCount > 0 ? ` — ${onlineCount}` : ''}` },
    { id: 'all', label: `Tous${totalCount > 0 ? ` — ${totalCount}` : ''}` },
    { id: 'pending', label: 'En attente' },
    { id: 'blocked', label: 'Bloqué' },
  ]

  return (
    <div className="flex h-12 shrink-0 items-center border-b border-[#1e1f22] bg-[#313338] px-4">
      <nav className="flex min-w-0 items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded px-2.5 py-0.5 text-sm font-medium leading-6 transition-colors',
              activeTab === tab.id
                ? 'bg-[#404249] text-[#f2f3f5]'
                : 'text-[#b5bac1] hover:bg-[#35373c] hover:text-[#dbdee1]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="ml-auto flex h-6 shrink-0 items-center gap-1 rounded-sm bg-[#248046] px-2 text-xs font-medium text-white transition-colors hover:bg-[#1a6334]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" x2="19" y1="8" y2="14" />
          <line x1="22" x2="16" y1="11" y2="11" />
        </svg>
        Ajouter un ami
      </button>
    </div>
  )
}
