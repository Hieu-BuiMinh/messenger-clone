import Image from 'next/image'

import AuthForm from '@/app/(site)/components/auth-form'

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Image alt="logo" src="/images/logo.png" width={48} height={48} className="mx-auto w-auto" />
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
					Sign in to your account
				</h2>
			</div>
			<AuthForm />
		</div>
	)
}
