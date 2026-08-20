import { FriendListToolbar } from '@/components/platform/FriendListToolbar'
import { FriendList } from '@/components/platform/FriendList'
import { ActivityPanel } from '@/components/platform/ActivityPanel'

export default function MePage() {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
      <FriendListToolbar onlineCount={13} totalCount={24} />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <FriendList />
        <ActivityPanel />
      </div>
    </div>
  )
}
