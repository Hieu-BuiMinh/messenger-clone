import React from 'react'

import ConversationPageView from '@/views/(routes)/conversations/pages/conversation.page'

async function ConversationPage({ params }: { params: Promise<{ conversationId: string }> }) {
	const { conversationId } = await params

	if (!conversationId) {
		return null
	}

	return <ConversationPageView conversationId={conversationId} />
}

export default ConversationPage
