'use client'

import { useCallback, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

import Button from '@/components/common/buttons'
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
			<div className="bg-background px-4 py-8 shadow dark:bg-background sm:rounded-lg sm:px-10">
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
						{variant === 'REGISTER' && <RHFTextField name="name" id="name" label="Name" />}
						<RHFTextField name="email" id="email" label="Email" />
						<RHFTextField name="password" id="password" label="Password" />
						<div className="">
							<Button disabled={isLoading} fullWidth type="submit">
								{variant === 'LOGIN' ? 'Sign in' : 'Register'}
							</Button>
						</div>
					</form>
				</FormProvider>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-background px-2 text-gray-500">Or continue with</span>
						</div>
					</div>

					<div className="mt-6 flex gap-2">
						{/* <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
						<AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} /> */}
					</div>
				</div>
				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
					<div>{variant === 'LOGIN' ? "Don't have an account?" : 'Already have an account?'}</div>
					<div onClick={toggleVariant} className="underline cursor-pointer">
						{variant === 'LOGIN' ? 'Register' : 'Sign in'}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthForm
