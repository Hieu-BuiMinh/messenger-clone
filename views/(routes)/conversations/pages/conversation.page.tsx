import React from 'react'

import getConversationById from '@/actions/get-conversation-by-id'
import getMessages from '@/actions/get-messages'
import EmptyState from '@/components/common/empty-state'
import Body from '@/views/(routes)/conversations/components/body'
import Form from '@/views/(routes)/conversations/components/form'
import Header from '@/views/(routes)/conversations/components/header'

async function ConversationPageView({ conversationId }: { conversationId: string }) {
	const conversation = await getConversationById(conversationId)
	const messages = await getMessages(conversationId)

	if (!conversation) {
		return (
			<div className="lg:pl-80 h-full">
				<div className="h-full flex flex-col">
					<EmptyState />
				</div>
			</div>
		)
	}

	return (
		<div className="lg:pl-80 h-screen">
			<div className="h-full flex flex-col">
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	)
}

export default ConversationPageView
