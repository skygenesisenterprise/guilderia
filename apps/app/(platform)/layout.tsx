import * as React from 'react'
import { HeaderPlatform } from '@/components/platform/HeaderPlatform'
import { SidebarServerList } from '@/components/platform/SidebarServerList'
import { UserActivityPanel } from '@/components/platform/UserActivityPanel'

export default function PlatformLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#313338]">
      <HeaderPlatform />
      <div className="grid min-h-0 flex-1 grid-cols-[auto_auto_1fr] grid-rows-[1fr_auto]">
        <div className="col-start-1 row-start-1 flex flex-col">
          <SidebarServerList />
        </div>
        <div className="col-start-2 row-start-1 flex h-full w-71.25 flex-col border-r border-[#3f4147]">
          {sidebar}
        </div>
        <div className="col-start-3 row-span-2 row-start-1 flex min-w-0 flex-col overflow-hidden">
          {children}
        </div>
        <div className="col-span-2 col-start-1 row-start-2">
          <UserActivityPanel />
        </div>
      </div>
    </div>
  )
}
