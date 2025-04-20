import React from 'react'

import { getConversations } from '@/actions/get-conversations'
import getUsers from '@/actions/get-users'
import ConversationList from '@/views/(routes)/conversations/components/conversation-list'
import Sidebar from '@/views/(routes)/users/components/sidebar'

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
	const conversations = await getConversations()
	const users = await getUsers()

	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList conversations={conversations} users={users} />
				{children}
			</div>
		</Sidebar>
	)
}
