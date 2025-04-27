import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/get-current-user'
import prisma from '@/app/libs/prismadb'

interface IParams {
	conversationId?: string
}

export async function POST(_res: Request, { params }: { params: Promise<IParams> }) {
	try {
		const currentUser = await getCurrentUser()
		const { conversationId } = await params

		if (!currentUser?.id || !currentUser.email) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!conversationId) {
			return new NextResponse('Bad Request', { status: 400 })
		}

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
				messages: {
					include: {
						seenUsers: true,
					},
				},
			},
		})

		if (!conversation) {
			return new NextResponse('Not Found', { status: 404 })
		}

		const lastMessage = conversation.messages[conversation.messages.length - 1]

		if (!lastMessage) {
			return NextResponse.json(conversation)
		}

		const updatedMessage = await prisma.message.update({
			where: {
				id: lastMessage.id,
			},
			data: {
				seenUsers: {
					connect: {
						id: currentUser.id,
					},
				},
			},
			include: {
				seenUsers: true,
				sender: true,
			},
		})

		if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
			return NextResponse.json(conversation)
		}

		return NextResponse.json(updatedMessage)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error: ', error)
	}
}
