'use client'

import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ActivityUser {
  id: string
  name: string
  avatar: string | null
  status: 'online' | 'offline' | 'idle' | 'dnd'
  activity: {
    type: 'listening' | 'playing'
    name: string
    detail: string
  }
}

const mockActivities: ActivityUser[] = [
  {
    id: 'a1',
    name: '! Pewyan | لالا ロロロ ᕦᕤᕦ MADARA',
    avatar: null,
    status: 'online',
    activity: {
      type: 'listening',
      name: 'Ecoute Spotify',
      detail: 'Hate Me — Ellie Goulding, Juice WRLD',
    },
  },
]

export function ActivityPanel() {
  return (
    <div className="hidden w-[360px] shrink-0 flex-col border-l border-[#3f4147] bg-[#313338] xl:flex">
      <div className="shrink-0 px-4 pb-3 pt-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#949ba4]">
          En ligne — {mockActivities.length}
        </span>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col p-4">
          {mockActivities.map((user) => (
            <div key={user.id} className="flex flex-col gap-3 rounded-lg bg-[#2b2d31] p-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar ?? undefined} />
                  <AvatarFallback className="bg-[#5865f2] text-[10px] font-semibold text-white">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate text-sm font-semibold text-[#f2f3f5]">
                  {user.name}
                </span>
              </div>

              <div className="flex items-start gap-3 rounded bg-[#1e1f22] p-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#1db954]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium text-[#f2f3f5]">
                    {user.activity.detail}
                  </span>
                  <span className="truncate text-xs text-[#949ba4]">
                    {user.activity.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
