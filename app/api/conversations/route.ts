import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/get-current-user'
import prisma from '@/app/libs/prismadb'

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser()
		const boby = await req.json()

		const { userId, isGroup, members, name } = boby

		if (!currentUser?.id || !currentUser.email) {
			return new NextResponse('Unauthorized', { status: 401 })
		}
		if (isGroup && (!members || members.length < 2 || !name)) {
			return new NextResponse('Invalid request', { status: 400 })
		}

		if (isGroup) {
			const newConversation = await prisma?.conversation.create({
				data: {
					name,
					isGroup,
					Users: {
						connect: [
							...members.map((member: { value: string }) => ({ id: member.value })),
							{ id: currentUser.id },
						],
					},
				},
				/* 
				by using 'include' we can have user information in the conversation, instead of just the userIds list
				because we already use the @relations in the conversation schema for users
				this will return the user information in the conversation object
				so we can use it to show the user's data
				*/
				include: {
					Users: true,
				},
			})

			newConversation?.Users.forEach((user) => {
				if (user.email) {
					//
				}
			})

			return NextResponse.json(newConversation)
		}

		const existingConversation = await prisma?.conversation.findMany({
			/*
			specical query like WHERE | OR only supported by 'findMany' method not 'findUnique' method
			we can use 'equals' to check if the userId is in the userIds array
			*/
			where: {
				// if the chat only have 2 users, and these 2 users-ids are the same as the current existing chat's users-ids, we don't need to create a new chat
				OR: [
					{ userIds: { equals: [userId, currentUser.id] } },
					{ userIds: { equals: [currentUser.id, userId] } },
				],
			},
		})

		const singleConversation = existingConversation?.[0]

		if (singleConversation) {
			return NextResponse.json(singleConversation)
		}

		const newConversation = await prisma?.conversation.create({
			data: { Users: { connect: [{ id: currentUser.id }, { id: userId }] } },
			include: { Users: true },
		})

		newConversation?.Users.forEach((user) => {
			if (user.email) {
				//
			}
		})

		return NextResponse.json(newConversation)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('[CONVERSATIONS_ERROR]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
