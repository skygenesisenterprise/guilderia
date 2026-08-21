import { SidebarServerUserList } from '@/components/platform/server/SidebarServerUserList'
import { getChannelById, getServerById } from '@/lib/server-data'
import { Hash } from 'lucide-react'

interface ChannelPageProps {
  params: Promise<{ server: string; channels: string }>
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { server, channels } = await params
  const channelData = getChannelById(channels)
  const serverData = getServerById(server)
  const channelName = channelData?.name ?? channels
  const serverName = serverData?.name ?? server

  return (
    <div className="flex h-full min-w-0 flex-1 overflow-hidden bg-[#313338]">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[#1f2124] px-4 shadow-sm">
          <Hash className="h-5 w-5 shrink-0 text-[#949ba4]" />
          <span className="truncate text-base font-semibold text-white">{channelName}</span>
        </header>
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-[#949ba4]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#404249]">
            <Hash className="h-8 w-8 text-[#dbdee1]" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">Bienvenue dans #{channelName}</h2>
          <p className="mt-1 text-sm">Début de ce salon du serveur {serverName}</p>
        </div>
      </div>
      <SidebarServerUserList />
    </div>
  )
}
