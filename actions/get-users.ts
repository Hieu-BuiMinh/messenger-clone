import getSession from '@/actions/get-session'
import prisma from '@/app/libs/prismadb'

const getUsers = async () => {
	const section = await getSession()

	if (!section?.user?.email) {
		return []
	}

	try {
		const users = await prisma.user.findMany({
			where: { NOT: { email: section.user.email } },
		})
		if (!users) {
			return []
		}

		return users
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('error', error)
		throw new Error('Failed to fetch users')
	}
}

export default getUsers
