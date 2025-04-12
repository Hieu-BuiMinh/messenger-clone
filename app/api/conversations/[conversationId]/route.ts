import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/get-current-user'

interface IParams {
	conversationId?: string
}

export async function POST(req: Request, { params }: any) {
	try {
		const { conversationId } = params
		const currentUser = await getCurrentUser()

		if (!currentUser?.id || !currentUser.email) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		if (!conversationId) {
			return new NextResponse('Bad Request', { status: 400 })
		}

		const conversation = await prisma?.conversation.findUnique({
			where: { id: conversationId },
			include: { Users: true },
		})

		if (!conversation) {
			return new NextResponse('Conversation not found', { status: 404 })
		}
		return NextResponse.json({}, { status: 200 })
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('[CONVERSATIONS_ERROR]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
