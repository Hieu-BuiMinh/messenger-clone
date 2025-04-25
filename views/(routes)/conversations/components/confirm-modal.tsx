'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { toast } from 'sonner'

import Button from '@/components/common/buttons'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import useConversation from '@/hooks/use-conversation'

interface ConfirmModalProps {
	isOpen: boolean
	onClose: () => void
}

function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
	const router = useRouter()
	const { conversationId } = useConversation()
	const [isLoading, setIsLoading] = useState(false)

	const handleDelete = useCallback(() => {
		setIsLoading(true)

		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose()
				toast.success('Conversation deleted')
				router.push('/conversations')
				router.refresh()
			})
			.catch(() => {
				toast.error('Something went wrong')
			})
			.finally(() => setIsLoading(false))
	}, [conversationId, onClose, router])

	useEffect(() => {
		if (!isOpen) {
			onClose()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	return (
		<Dialog open={isOpen}>
			<DialogContent>
				<div className="sm:flex sm:items-start">
					<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
						<FiAlertTriangle className="h-6 w-6 text-red-600" />
					</div>
					<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-black">
						<DialogTitle className="text-base font-semibold leading-6 text-gray-900">
							Delete conversation
						</DialogTitle>
						<div className="mt-2">
							<p className="text-sm text-gray-500">
								Are you sure you want to delete this conversation? This action cannot be undone.
							</p>
						</div>
					</div>
				</div>
				<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<Button disabled={isLoading} danger onClick={handleDelete}>
						Delete
					</Button>
					<Button disabled={isLoading} secondary onClick={onClose}>
						Cancel
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ConfirmModal
