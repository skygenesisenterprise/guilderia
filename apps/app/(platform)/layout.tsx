import * as React from 'react'
import { HeaderPlatform } from '@/components/platform/HeaderPlatform'
import { SidebarServerList } from '@/components/platform/SidebarServerList'
import { SidebarMessageList } from '@/components/platform/SidebarMessageList'
import { UserActivityPanel } from '@/components/platform/UserActivityPanel'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#313338]">
      <HeaderPlatform />
      <div className="flex min-h-0 flex-1">
        <div className="flex h-full flex-col">
          <div className="flex min-h-0 flex-1">
            <SidebarServerList />
            <div className="flex h-full w-[240px] shrink-0 flex-col border-r border-[#3f4147]">
              <SidebarMessageList />
            </div>
          </div>
          <UserActivityPanel />
        </div>
        <div className="flex min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
