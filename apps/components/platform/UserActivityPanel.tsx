'use client'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserActivityPanelProps {
  user?: {
    id: string
    name: string
    displayName: string
    avatar: string | null
    status: 'online' | 'offline' | 'idle' | 'dnd'
    customStatus?: string
  }
}

const defaultUser = {
  id: 'me',
  name: 'Liam Von Astoria',
  displayName: 'Liam Von Astoria',
  avatar: null,
  status: 'online' as const,
  customStatus: 'Sky Genesis Enterprise',
}

const statusColors: Record<string, string> = {
  online: 'bg-[#23a559]',
  offline: 'bg-[#80848e]',
  idle: 'bg-[#f0b232]',
  dnd: 'bg-[#f23f43]',
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function HeadphonesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function UserActivityPanel({
  user = defaultUser,
}: UserActivityPanelProps) {
  return (
    <div className="mx-2 mb-2 flex h-13 shrink-0 items-center gap-1 rounded-xl bg-[#313338] px-2 shadow-lg shadow-black/30">
      <button type="button" className="group relative flex flex-1 items-center gap-2 rounded px-1 py-0.5 hover:bg-[#35373c]">
        <div className="relative shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar ?? undefined} />
            <AvatarFallback className="bg-[#5865f2] text-[10px] font-semibold text-white">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className={cn(
            'absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-[#313338]',
            statusColors[user.status],
          )} />
        </div>

        <div className="flex min-w-0 flex-col items-start">
          <span className="truncate text-sm font-semibold text-[#f2f3f5]">
            {user.displayName}
          </span>
          {user.customStatus && (
            <span className="truncate text-[11px] text-[#b5bac1]">
              {user.customStatus}
            </span>
          )}
        </div>
      </button>

      <div className="flex shrink-0 items-center">
        <button
          type="button"
          aria-label="Microphone"
          className="flex h-8 w-8 items-center justify-center rounded text-[#b5bac1] transition-colors hover:bg-[#35373c] hover:text-[#dbdee1]"
        >
          <MicIcon />
        </button>
        <button
          type="button"
          aria-label="Casque"
          className="flex h-8 w-8 items-center justify-center rounded text-[#b5bac1] transition-colors hover:bg-[#35373c] hover:text-[#dbdee1]"
        >
          <HeadphonesIcon />
        </button>
        <button
          type="button"
          aria-label="Paramètres"
          className="flex h-8 w-8 items-center justify-center rounded text-[#b5bac1] transition-colors hover:bg-[#35373c] hover:text-[#dbdee1]"
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  )
}
