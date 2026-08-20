'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Download, Home, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Server {
  id: string
  name: string
  icon: string | null
  acronym: string
  unread?: boolean
  mentions?: number
}

const mockServers: Server[] = [
  { id: 'gc-gd', name: 'GC GD', icon: null, acronym: 'GC', unread: true },
  { id: 'gt-gc', name: 'GT GC', icon: null, acronym: 'GT' },
  { id: '1', name: 'Serveur Gaming', icon: null, acronym: 'SG', unread: true, mentions: 3 },
  { id: '2', name: 'Sky Genesis', icon: null, acronym: 'SKY' },
  { id: '3', name: 'Dev Team', icon: null, acronym: 'DEV', unread: true },
  { id: '4', name: 'Anime Club', icon: null, acronym: 'AC' },
  { id: '5', name: 'Music Lounge', icon: null, acronym: 'ML' },
]



function PillIndicator({ isActive, isUnread }: { isActive: boolean; isUnread?: boolean }) {
  if (!isActive && !isUnread) return null

  return (
    <span
      className={cn(
        'absolute -left-[18px] top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-white transition-all duration-200',
        isActive ? 'h-10' : isUnread ? 'h-2' : 'h-0',
      )}
    />
  )
}

function MentionBadge({ count }: { count: number }) {
  return (
    <span className="absolute -bottom-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f23f43] px-1 text-[11px] font-bold text-white ring-4 ring-[#313338]">
      {count > 99 ? '99+' : count}
    </span>
  )
}

function ServerIcon({ server, isActive }: { server: Server; isActive: boolean }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <PillIndicator isActive={isActive} isUnread={server.unread} />

      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center overflow-hidden text-sm font-semibold transition-all duration-200',
          isActive
            ? 'rounded-[16px]'
            : 'rounded-[24px] hover:rounded-[16px]',
          server.icon
            ? ''
            : 'bg-[#2b2d31] text-white',
        )}
      >
        {server.icon ? (
          <img src={server.icon} alt={server.name} className="h-full w-full object-cover" />
        ) : (
          <span>{server.acronym}</span>
        )}
      </div>

      {server.mentions && server.mentions > 0 && (
        <MentionBadge count={server.mentions} />
      )}
    </div>
  )
}

export function SidebarServerList() {
  const pathname = usePathname()
  const isHomeActive = pathname === '/channels/me'

  return (
    <div className="flex h-full w-[72px] shrink-0 flex-col items-center border-r border-[#3f4147] bg-[#313338] py-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/channels/me"
            className={cn(
              'relative flex h-12 w-12 items-center justify-center transition-all duration-200',
              isHomeActive
                ? 'rounded-[16px] bg-[#5865f2] text-white'
                : 'rounded-[24px] bg-[#2b2d31] text-[#dbdee1] hover:rounded-[16px] hover:bg-[#5865f2] hover:text-white',
            )}
          >
            <PillIndicator isActive={isHomeActive} />
            <Home className="h-6 w-6" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Messages privés</TooltipContent>
      </Tooltip>

      <div className="my-2 h-0.5 w-8 rounded-full bg-[#35363c]" />

      <div className="flex flex-1 flex-col items-center gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {mockServers.map((server) => {
          const isActive = pathname.startsWith(`/channels/${server.id}`)
          return (
            <Tooltip key={server.id}>
              <TooltipTrigger asChild>
                <Link href={`/channels/${server.id}`}>
                  <ServerIcon server={server} isActive={isActive} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{server.name}</TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[#2b2d31] text-[#3ba55d] transition-all duration-200 hover:rounded-[16px] hover:bg-[#3ba55d] hover:text-white">
            <Plus className="h-6 w-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Ajouter un serveur</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[#2b2d31] text-[#3ba55d] transition-all duration-200 hover:rounded-[16px] hover:bg-[#3ba55d] hover:text-white">
            <Compass className="h-6 w-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Explorer les serveurs publics</TooltipContent>
      </Tooltip>

      <div className="my-2 h-0.5 w-8 rounded-full bg-[#35363c]" />

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[#2b2d31] text-[#3ba55d] transition-all duration-200 hover:rounded-[16px] hover:bg-[#3ba55d] hover:text-white">
            <Download className="h-6 w-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Télécharger les applications</TooltipContent>
      </Tooltip>
    </div>
  )
}
