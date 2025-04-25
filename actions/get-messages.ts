import prisma from '@/app/libs/prismadb'

const getMessages = async (conversationId: string) => {
	try {
		const messages = await prisma?.message.findMany({
			where: { id: conversationId },
			orderBy: {
				createdAt: 'asc',
			},
			include: {
				sender: true,
				seenUsers: true,
			},
		})
		if (!messages) {
			return []
		}
		return messages
	} catch (error) {
		console.error('Error fetching messages:', error)
		return []
	}
}

export default getMessages
