'use client'

import type { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

import Spinner from '@/components/common/spinner'
import Avatar from '@/views/(routes)/users/components/avatar'

interface UserBoxProps {
	user: User
}

const UserBox: FC<UserBoxProps> = ({ user }) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = useCallback(() => {
		setIsLoading(true)

		axios
			.post('/api/conversations', {
				userId: user.id,
			})
			.then((res) => {
				router.push(`/conversations/${res.data.id}`)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [user, router])

	return (
		<>
			{isLoading && (
				<div className="size-screen flex items-center justify-center">
					<Spinner size="lg" />
				</div>
			)}
			<div
				onClick={handleClick}
				className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
			>
				<Avatar user={user} />
				<div className="min-w-0 flex-1">
					<div className="focus:outline-none">
						<div className="flex justify-between items-center mb-1">
							<p className="text-sm font-medium text-gray-900">{user.name}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserBox
