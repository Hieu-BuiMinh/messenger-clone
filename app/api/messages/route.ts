import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/get-current-user'
import prisma from '@/app/libs/prismadb'

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser()

		const body = await req.json()

		const { message, image, conversationId } = body

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const newMessage = await prisma.message.create({
			data: {
				body: message,
				image,
				Conversation: {
					connect: {
						id: conversationId,
					},
				},
				sender: { connect: { id: currentUser.id } },
				seenUsers: { connect: { id: currentUser.id } },
			},
			include: { sender: true, seenUsers: true },
		})

		const updatedConversation = await prisma.conversation.update({
			where: { id: conversationId },
			data: {
				lastMessageAt: new Date(),
				messages: {
					connect: {
						id: newMessage.id,
					},
				},
			},
			include: {
				users: true,
				messages: {
					include: { seenUsers: true },
				},
			},
		})

		// await pusher here...

		const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]

		updatedConversation.users.map((user) => {
			// await pusher here...
		})

		return NextResponse.json(newMessage)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error:', error)
	}
}
