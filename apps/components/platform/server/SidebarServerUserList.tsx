'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface ServerMember {
  id: string
  name: string
  displayName?: string
  avatar: string | null
  status: 'online' | 'offline' | 'idle' | 'dnd'
  activity?: string
  role?: string
  bot?: boolean
}

const mockRoles = [
  {
    name: 'Activité — 3',
    members: [
      { id: 'u1', name: 'Alane', avatar: null, status: 'online', activity: 'Bassline Club Vibes' },
    ] as ServerMember[],
  },
  {
    name: 'Direction — 2',
    members: [
      { id: 'u2', name: 'Alane', displayName: 'Alane', avatar: null, status: 'online', activity: 'We are back ! V...' },
      { id: 'u3', name: 'Liam Von Astoria', avatar: null, status: 'online', activity: 'Sky Genesis Enterprise' },
    ] as ServerMember[],
  },
  {
    name: 'Administrator — 1',
    members: [
      { id: 'u4', name: 'Sappienear', avatar: null, status: 'online', activity: 'Développeur professionnel' },
    ] as ServerMember[],
  },
  {
    name: 'Member — 3',
    members: [
      { id: 'u5', name: 'Baookaman', avatar: null, status: 'online', activity: 'Cpt KitKat on Duty' },
      { id: 'u6', name: 'dapsvi', avatar: null, status: 'online' },
      { id: 'u7', name: 'Rithy', avatar: null, status: 'online' },
    ] as ServerMember[],
  },
]

const statusColors: Record<string, string> = {
  online: 'bg-[#23a559]',
  offline: 'bg-[#80848e]',
  idle: 'bg-[#f0b232]',
  dnd: 'bg-[#f23f43]',
}

function MemberItem({ member }: { member: ServerMember }) {
  const displayName = member.displayName ?? member.name

  return (
    <div className="group flex cursor-pointer items-center gap-3 rounded px-2 py-1.5 hover:bg-[#35373c]">
      <div className="relative shrink-0">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.avatar ?? undefined} />
          <AvatarFallback className="bg-[#5865f2] text-[11px] font-semibold text-white">
            {member.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className={cn(
          'absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#2b2d31]',
          statusColors[member.status],
        )} />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-[#dbdee1] group-hover:text-white">
          {displayName}
        </span>
        {member.activity && (
          <span className="truncate text-xs text-[#949ba4]">{member.activity}</span>
        )}
      </div>
    </div>
  )
}

export function SidebarServerUserList() {
  return (
    <div className="flex h-full w-60 shrink-0 flex-col overflow-y-auto border-l border-[#1f2124] bg-[#2b2d31] px-2 py-4 scrollbar-thin">
      {mockRoles.map((role) => (
        <div key={role.name} className="mb-4">
          <h3 className="mb-1 truncate px-2 text-xs font-semibold uppercase tracking-wide text-[#949ba4]">
            {role.name}
          </h3>
          <div className="flex flex-col gap-px">
            {role.members.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
