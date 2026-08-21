'use client'

import { cn } from '@/lib/utils'
import { mockCategories, type Channel } from '@/lib/server-data'
import { Hash, Volume2, ChevronDown, Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

function ChannelIcon({ type }: { type: Channel['type'] }) {
  if (type === 'voice') {
    return <Volume2 className="h-5 w-5 shrink-0" />
  }
  return <Hash className="h-5 w-5 shrink-0" />
}

function CategoryHeader({ name }: { name: string }) {
  return (
    <div className="group flex items-center px-2 py-1.5">
      <ChevronDown className="mr-0.5 h-3 w-3 shrink-0 text-[#949ba4]" />
      <span className="text-xs font-semibold uppercase tracking-wide text-[#949ba4] group-hover:text-[#dbdee1]">
        {name}
      </span>
      <Plus className="ml-auto h-4 w-4 shrink-0 text-[#949ba4] opacity-0 group-hover:opacity-100" />
    </div>
  )
}

function ChannelItem({ channel, serverId, isActive }: { channel: Channel; serverId: string; isActive: boolean }) {
  return (
    <Link
      href={`/channels/${serverId}/${channel.id}`}
      className={cn(
        'group flex items-center gap-1.5 rounded px-2 py-1 text-sm transition-colors',
        isActive
          ? 'bg-[#404249] text-white'
          : 'text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]',
      )}
    >
      <ChannelIcon type={channel.type} />
      <span className={cn('truncate', isActive ? 'font-medium text-white' : '')}>{channel.name}</span>
      {channel.unread && !isActive && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-white" />}
    </Link>
  )
}

export function ServerMessageChannelsList() {
  const params = useParams<{ server: string }>()
  const pathname = usePathname()
  const serverId = params?.server ?? ''

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-1 py-2 scrollbar-thin">
      {mockCategories.map((category) => (
        <div key={category.id} className="mb-2">
          <CategoryHeader name={category.name} />
          <div className="mt-0.5 flex flex-col gap-px">
            {category.channels.map((channel) => {
              const isActive = pathname === `/channels/${serverId}/${channel.id}`
              return <ChannelItem key={channel.id} channel={channel} serverId={serverId} isActive={isActive} />
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
