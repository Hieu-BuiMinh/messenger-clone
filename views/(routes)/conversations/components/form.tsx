'use client'

import axios from 'axios'
import { CldUploadButton } from 'next-cloudinary'
import React from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi'
import { HiPhoto } from 'react-icons/hi2'

import RHFTextField from '@/components/common/RHFs/RHF-text-field'
import useConversation from '@/hooks/use-conversation'

function Form() {
	const { conversationId } = useConversation()
	const methods = useForm<FieldValues>({
		defaultValues: {
			message: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		methods.setValue('message', '', { shouldValidate: true })

		axios.post('/api/messages', {
			...data,
			conversationId,
		})
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleUpload = (result: any) => {
		axios.post('/api/messages', {
			image: result?.info?.secure_url,
			conversationId,
		})
	}

	return (
		<div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
			<CldUploadButton
				options={{
					maxFiles: 1,
				}}
				onSuccess={handleUpload}
				uploadPreset="messenger-clone"
			>
				<HiPhoto size={30} className="text-sky-500" />
			</CldUploadButton>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
					<div className="relative w-full">
						<RHFTextField
							type="text"
							name="message"
							autoComplete="message"
							placeholder="Write a message"
							className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white"
							required
						/>
					</div>
					<button
						type="submit"
						className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
					>
						<HiPaperAirplane size={18} className="text-white" />
					</button>
				</form>
			</FormProvider>
		</div>
	)
}

export default Form
