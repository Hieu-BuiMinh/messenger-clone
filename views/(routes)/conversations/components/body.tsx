'use client'

import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

import useConversation from '@/hooks/use-conversation'
import type { FullMessageType } from '@/types'
import MessageBox from '@/views/(routes)/conversations/components/message-box'

function Body({ initialMessages }: { initialMessages: FullMessageType[] }) {
	const [messages, setMessages] = useState(initialMessages)
	const bottomRef = useRef<HTMLDivElement>(null)

	const { conversationId } = useConversation()

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`)
	}, [conversationId])

	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message, index) => (
				<MessageBox isLast={index === messages.length - 1} key={message.id} message={message} />
			))}
			<div ref={bottomRef} className="pt-24" />
		</div>
	)
}

export default Body
