'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Friend {
  id: string
  name: string
  avatar: string | null
  status: 'online' | 'offline' | 'idle' | 'dnd'
  customStatus?: string
  activity?: {
    type: 'listening' | 'playing'
    name: string
    detail?: string
  }
}

const mockFriends: Friend[] = [
  {
    id: 'f1',
    name: '! Pewyan | لالا ロロロ ᕦᕤᕦ MADARA',
    avatar: null,
    status: 'online',
    customStatus: 'just__redou',
    activity: {
      type: 'listening',
      name: 'Ellie Goulding, Juice WRLD',
      detail: 'Discord, please reply to my intent request',
    },
  },
  { id: 'f2', name: 'Azerloop', avatar: null, status: 'online', customStatus: 'RGS' },
  { id: 'f3', name: 'Baookaman', avatar: null, status: 'online', customStatus: 'Cpt KitKat on Duty' },
  {
    id: 'f4',
    name: "Gandoulf 1er d'Erebor",
    avatar: null,
    status: 'online',
    customStatus: 'La vie est un long chemin sinueux et tumultueux',
  },
  { id: 'f5', name: 'Ghost Black', avatar: null, status: 'online', customStatus: 'AURA' },
  { id: 'f6', name: 'Il Hyphy16', avatar: null, status: 'online', customStatus: 'Gl' },
  { id: 'f7', name: 'lGazak', avatar: null, status: 'online' },
  {
    id: 'f8',
    name: "Medho le pack d'eau",
    avatar: null,
    status: 'dnd',
    customStatus: 'Ne pas deranger',
  },
  { id: 'f9', name: 'pakarasi', avatar: null, status: 'idle', customStatus: 'BKRM' },
  { id: 'f10', name: 'Rithy', avatar: null, status: 'idle', customStatus: 'KAT' },
  { id: 'f11', name: 'Sappienear', avatar: null, status: 'online', customStatus: 'SLFR' },
  { id: 'f12', name: '[ J u s t M e ]', avatar: null, status: 'online', customStatus: '#S2F' },
  { id: 'f13', name: 'Enis', avatar: null, status: 'online', customStatus: 'fitna' },
]

const statusColors: Record<string, string> = {
  online: 'bg-[#23a559]',
  offline: 'bg-[#80848e]',
  idle: 'bg-[#f0b232]',
  dnd: 'bg-[#f23f43]',
}

export function FriendList() {
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredFriends = mockFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#313338]">
      <div className="shrink-0 px-4 pb-2 pt-4">
        <div className="flex h-8 items-center rounded border border-[#1e1f22] bg-[#1e1f22] px-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0 text-[#949ba4]">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#dbdee1] placeholder-[#949ba4] outline-none"
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-[#3f4147] px-4 pb-2 pt-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#949ba4]">
          En ligne — {filteredFriends.length}
        </span>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col px-2">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="group flex min-h-14 items-center gap-3 rounded px-2 py-2 transition-colors hover:bg-[#35373c]"
            >
              <div className="relative shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={friend.avatar ?? undefined} />
                  <AvatarFallback className="bg-[#5865f2] text-[11px] font-semibold text-white">
                    {friend.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className={cn(
                  'absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-[#313338]',
                  statusColors[friend.status],
                )} />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium text-[#f2f3f5]">
                  {friend.name}
                </span>
                <div className="flex items-center gap-1 truncate">
                  {friend.activity && (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#949ba4]">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                      <span className="truncate text-xs text-[#949ba4]">
                        {friend.activity.detail || friend.activity.name}
                      </span>
                    </>
                  )}
                  {!friend.activity && friend.customStatus && (
                    <span className="truncate text-xs text-[#949ba4]">
                      {friend.customStatus}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2b2d31] text-[#b5bac1] transition-colors hover:bg-[#35373c] hover:text-[#dbdee1]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2b2d31] text-[#b5bac1] transition-colors hover:bg-[#35373c] hover:text-[#dbdee1]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
