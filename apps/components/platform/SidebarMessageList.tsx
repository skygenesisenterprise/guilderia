'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface DirectMessage {
  id: string
  user: {
    id: string
    name: string
    avatar: string | null
    status: 'online' | 'offline' | 'idle' | 'dnd'
    activity?: string
  }
}

function FriendsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M5 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M2 18a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1Z" />
      <path d="M14.77 14.23A5 5 0 0 1 18 13h0a5 5 0 0 1 5 5v1a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-1a4.97 4.97 0 0 1 .77-2.77Z" />
    </svg>
  )
}

const navItems = [
  { id: 'friends', label: 'Amis', href: '/channels/me', icon: <FriendsIcon /> },
  {
    id: 'nitro',
    label: 'Nitro',
    href: '/nitro',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    id: 'shop',
    label: 'Boutique',
    href: '/shop',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="M2 7h20" />
      </svg>
    ),
    badge: 'NOUVEAU',
  },
]

const mockDirectMessages: DirectMessage[] = [
  { id: 'dm-1', user: { id: 'u1', name: 'Zelnikov', avatar: null, status: 'online' } },
  { id: 'dm-2', user: { id: 'u2', name: 'Sappi', avatar: null, status: 'online', activity: 'Developpeur professionnel' } },
  { id: 'dm-3', user: { id: 'u3', name: 'Zephiris1450', avatar: null, status: 'online' } },
  { id: 'dm-4', user: { id: 'u4', name: 'Alane', avatar: null, status: 'idle' } },
  { id: 'dm-5', user: { id: 'u5', name: 'Futuray', avatar: null, status: 'online' } },
  { id: 'dm-6', user: { id: 'u6', name: 'Sky Genesis Enterprise', avatar: null, status: 'online' } },
  { id: 'dm-7', user: { id: 'u7', name: 'Martina Condora', avatar: null, status: 'online' } },
  { id: 'dm-8', user: { id: 'u8', name: 'IGazak', avatar: null, status: 'online' } },
  { id: 'dm-9', user: { id: 'u9', name: 'Shiro Akami', avatar: null, status: 'dnd' } },
  { id: 'dm-10', user: { id: 'u10', name: 'Lhony', avatar: null, status: 'offline' } },
]

const statusColors: Record<string, string> = {
  online: 'bg-[#23a559]',
  offline: 'bg-[#80848e]',
  idle: 'bg-[#f0b232]',
  dnd: 'bg-[#f23f43]',
}

export function SidebarMessageList() {
  const pathname = usePathname()

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#313338]">
      <div className="shrink-0 p-2">
        <button className="flex h-8 w-full items-center rounded bg-[#1e1f22] px-2 text-xs text-[#949ba4] transition-colors hover:text-[#dbdee1]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="truncate">Rechercher ou commencer une conversation</span>
        </button>
      </div>

      <nav className="shrink-0 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded px-2 py-1 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#404249] text-[#f2f3f5]'
                  : 'text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]',
              )}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">{item.icon}</span>
              <span className="flex-1 truncate">{item.label}</span>
              {'badge' in item && item.badge && (
                <span className="rounded bg-white px-1 py-px text-[9px] font-bold text-[#2b2d31]">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-[#1e1f22] px-4 pb-2 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#949ba4]">Messages prives</span>
          <button className="text-[#949ba4] hover:text-[#dbdee1]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="flex flex-col gap-px">
          {mockDirectMessages.map((dm) => {
            const isActive = pathname === `/channels/me/${dm.user.id}`
            return (
              <Link
                key={dm.id}
                href={`/channels/me/${dm.user.id}`}
                className={cn(
                  'group flex items-center gap-3 rounded px-2 py-1.5 transition-colors',
                  isActive
                    ? 'bg-[#404249]'
                    : 'hover:bg-[#35373c]',
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={dm.user.avatar ?? undefined} />
                    <AvatarFallback className="bg-[#5865f2] text-[11px] font-semibold text-white">
                      {dm.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn(
                    'absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#313338]',
                    statusColors[dm.user.status],
                  )} />
                </div>

                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className={cn(
                    'truncate text-sm font-medium',
                    isActive ? 'text-white' : 'text-[#dbdee1]',
                  )}>
                    {dm.user.name}
                  </span>
                  {dm.user.activity && (
                    <span className="truncate text-xs text-[#949ba4]">{dm.user.activity}</span>
                  )}
                </div>

                <button className="shrink-0 text-[#949ba4] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[#dbdee1]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
