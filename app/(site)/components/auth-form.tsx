'use client'

import { useCallback, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

import RHFTextField from '@/components/common/RHFs/RHF-text-field'

type Variant = 'LOGIN' | 'REGISTER'

function AuthForm() {
	const [variant, setVariant] = useState<Variant>('LOGIN')
	const [isLoading, setIsLoading] = useState(false)

	const toggleVariant = useCallback(() => {
		if (variant === 'LOGIN') {
			setVariant('REGISTER')
		} else {
			setVariant('LOGIN')
		}
	}, [variant])

	const methods = useForm<FieldValues>({
		defaultValues: { name: '', email: '', password: '' },
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)
		if (variant === 'REGISTER') {
			// Axios register
		}
		if (variant === 'LOGIN') {
			// Next auth Sign in
		}
	}

	const socicalAction = (action: string) => {
		setIsLoading(true)

		// Next auth social Sign in
	}

	return (
		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-foreground">
			<div className="bg-background px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
						<RHFTextField name="email" />
					</form>
				</FormProvider>
			</div>
		</div>
	)
}

export default AuthForm
