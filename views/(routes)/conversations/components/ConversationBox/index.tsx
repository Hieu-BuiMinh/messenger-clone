'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { useCallback, useMemo } from 'react'

import useOtherUser from '@/hooks/use-otherUser'
import { cn } from '@/lib/utils'
import type { FullConversationType } from '@/types'
import Avatar from '@/views/(routes)/users/components/avatar'
import AvatarGroup from '@/views/(routes)/users/components/avatar/avatar-group'

interface ConversationBoxProps {
	conversation: FullConversationType
	selected: boolean
}

function ConversationBox({ conversation, selected }: ConversationBoxProps) {
	const otherUser = useOtherUser(conversation)
	const session = useSession()
	const router = useRouter()

	const handleClick = useCallback(() => {
		router.push(`/conversations/${conversation.id}`)
	}, [conversation.id, router])

	const lastMessage = useMemo(() => {
		const messages = conversation.messages || []

		return messages[messages.length - 1]
	}, [conversation.messages])

	const userEmail = useMemo(() => {
		return session.data?.user?.email
	}, [session.data])

	const hasSeen = useMemo(() => {
		if (!lastMessage) {
			return false
		}

		const seen = lastMessage.seenUsers || []

		if (!userEmail) {
			return false
		}

		return seen.filter((user) => user.email === userEmail).length !== 0
	}, [userEmail, lastMessage])

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return 'Sent an image'
		}

		if (lastMessage?.body) {
			return lastMessage.body
		}

		return 'Start a conversation'
	}, [lastMessage])

	return (
		<div
			onClick={handleClick}
			className={cn(
				'w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3',
				selected ? 'bg-neutral-100' : 'bg-white'
			)}
		>
			{conversation.isGroup ? <AvatarGroup users={conversation.users} /> : <Avatar user={otherUser} />}
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<p className="text-md font-medium text-gray-900">{conversation?.name || otherUser?.name}</p>
						{lastMessage?.createdAt && (
							<p className="text-xs text-gray-400 font-light">
								{format(new Date(lastMessage.createdAt), 'p')}
							</p>
						)}
					</div>
					<p className={cn('truncate text-sm', hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
						{lastMessageText}
					</p>
				</div>
			</div>
		</div>
	)
}

export default ConversationBox
