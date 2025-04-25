import getSession from '@/actions/get-session'
import prisma from '@/app/libs/prismadb'

/* eslint-disable no-console */
const getCurrentUser = async () => {
	try {
		const session = await getSession()

		if (!session?.user?.email) {
			return null
		}

		const currentUser = await prisma?.user.findUnique({
			where: { email: session.user.email },
		})

		if (!currentUser) {
			return null
		}

		return currentUser
	} catch (error) {
		console.log('error', error)
		return null
	}
}

export default getCurrentUser
