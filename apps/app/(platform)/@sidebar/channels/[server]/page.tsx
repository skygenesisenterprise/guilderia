import { SidebarChannelServerList } from '@/components/platform/server/SidebarChannelServerList'
import { getServerById } from '@/lib/server-data'

interface ServerSidebarPageProps {
  params: Promise<{ server: string }>
}

export default async function ServerSidebarPage({ params }: ServerSidebarPageProps) {
  const { server } = await params
  const serverData = getServerById(server)

  return <SidebarChannelServerList serverName={serverData?.name ?? server} />
}
