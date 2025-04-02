import type { AuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'

import { authOptions } from '../app/api/auth/[...nextauth]/auth-option'

export default async function getSession() {
	return await getServerSession(authOptions as AuthOptions)
}
