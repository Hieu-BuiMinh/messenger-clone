import getCurrentUser from '@/actions/get-current-user'
import prisma from '@/app/libs/prismadb'

const getConversationById = async (conversationId: string) => {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser?.email) {
			return null
		}

		const conversation = await prisma?.conversation.findUnique({
			where: { id: conversationId },
			include: {
				users: true,
			},
		})

		if (!conversation) {
			return null
		}

		return conversation
	} catch (error) {
		console.error('Error fetching conversation by ID:', error)
		return null
	}
}

export default getConversationById
