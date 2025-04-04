'use client'

import type { User } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import Button from '@/components/common/buttons'
import RHFTextField from '@/components/common/RHFs/RHF-text-field'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

interface SettingsModalProps {
	isOpen: boolean
	onClose: () => void
	currentUser: User
}

const _schema = z.object({
	name: z.string().nonempty({ message: 'Name can not be empty' }),
	image: z.string(),
})

function SettingModal({ currentUser, isOpen, onClose }: SettingsModalProps) {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const methods = useForm<z.infer<typeof _schema>>({
		defaultValues: {
			name: currentUser?.name || '',
			image: currentUser?.image || '',
		},
	})

	const image = methods.watch('image')

	const handleUpload = (result: any) => {
		methods.setValue('image', result?.info?.secure_url, {
			shouldValidate: true,
		})
	}

	const onSubmit: SubmitHandler<z.infer<typeof _schema>> = (data) => {
		setIsLoading(true)

		const promise = axios.post('', data).then(() => {
			router.refresh()
			onClose()
		})

		toast.promise(promise, {
			loading: 'Updating profile',
			success: 'Successfully updated',
			error: 'Something went wrong',
		})
	}

	useEffect(() => {
		if (!isOpen) {
			onClose()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])
	return (
		<Dialog open={isOpen}>
			<DialogTrigger>Open</DialogTrigger>
			<DialogContent>
				<DialogTitle className="hidden" />
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<div className="space-y-12">
							<div className="border-b border-e-gray-900/10 pb-12">
								<h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
								<p className="mt-1 text-sm leading-6 text-gray-600">Edit your public information</p>

								<div className="mt-10 flex flex-col gap-y-8">
									<RHFTextField disabled={isLoading} label="Name" id="name" required name="name" />
									<div className="mt-2 flex items-center gap-x-3">
										<Image
											src={image || currentUser.image || '/images/placeholder.jpg'}
											width={48}
											height={48}
											className="rounded-full"
											alt="avatar"
										/>
										{/* <CldUploadButton
										options={{
											maxFiles: 1,
										}}
										onUpload={handleUpload}
										uploadPreset="weopayd7"
									>
										<Button disabled={isLoading} type="button">
											Change
										</Button>
									</CldUploadButton> */}
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 flex items-center justify-end gap-x-6">
							<Button disabled={isLoading} secondary type="button" onClick={onClose}>
								Cancel
							</Button>
							<Button disabled={isLoading} type="submit" onClick={onClose}>
								Submit
							</Button>
						</div>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}

export default SettingModal
