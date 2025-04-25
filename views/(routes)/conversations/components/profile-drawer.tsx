'use client'

import type { Conversation, User } from '@prisma/client'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useActiveList from '@/hooks/use-active-list'
import useOtherUser from '@/hooks/use-otherUser'
import ConfirmModal from '@/views/(routes)/conversations/components/confirm-modal'

interface ProfileDrawerProps {
	data: Conversation & {
		users: User[]
	}
}

function ProfileDrawer({ data }: ProfileDrawerProps) {
	const otherUser = useOtherUser(data)
	const [confirmOpen, setConfirmOpen] = useState(false)

	const { members } = useActiveList()
	const isActive = members.indexOf(otherUser?.email || '') !== -1

	const joinedDate = useMemo(() => {
		return format(new Date(otherUser?.createdAt || ''), 'PP')
	}, [otherUser?.createdAt])

	const title = useMemo(() => {
		return data?.name || otherUser?.name
	}, [data.name, otherUser?.name])

	return (
		<>
			<ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />

			<Sheet>
				<SheetTrigger>
					<HiEllipsisHorizontal
						size={32}
						className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
					/>
				</SheetTrigger>
				<SheetContent>
					<SheetTitle />
				</SheetContent>
			</Sheet>
		</>
	)
}

export default ProfileDrawer
