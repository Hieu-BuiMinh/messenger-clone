import getCurrentUser from '@/actions/get-current-user'

export const getConversations = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser?.id || !currentUser.email) {
		return []
	}

	try {
		const conversations = await prisma?.conversation.findMany({
			orderBy: {
				lastMessageAt: 'desc',
			},
			where: {
				userIds: {
					has: currentUser.id,
				},
			},
			include: { users: true, messages: { include: { sender: true, seenUsers: true } } },
		})

		if (!conversations) {
			return []
		}

		return conversations
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('[GET_CONVERSATIONS]', error)
		return []
	}
}
