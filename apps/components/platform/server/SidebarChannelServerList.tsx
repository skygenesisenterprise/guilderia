'use client'

import { ServerMessageChannelsList } from './ServerMessageChannelsList'
import { ChevronDown } from 'lucide-react'

interface SidebarChannelServerListProps {
  serverName?: string
}

export function SidebarChannelServerList({ serverName = 'Serveur' }: SidebarChannelServerListProps) {
  return (
    <div className="flex h-full flex-col bg-[#2b2d31]">
      <button
        type="button"
        className="group flex h-12 shrink-0 items-center justify-between border-b border-[#1f2124] px-4 shadow-sm hover:bg-[#35373c]"
      >
        <span className="truncate text-base font-semibold text-white">{serverName}</span>
        <ChevronDown className="h-5 w-5 shrink-0 text-white" />
      </button>
      <ServerMessageChannelsList />
    </div>
  )
}
