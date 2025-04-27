import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/get-current-user'

export async function POST(res: Request) {
	try {
		const currentUser = await getCurrentUser()
		const { name, image } = await res.json()

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const updatedUser = await prisma?.user.update({
			where: { id: currentUser.id },
			data: {
				name,
				image,
			},
		})

		return NextResponse.json(updatedUser)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error', error)
	}
}
