'use client'

import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { FC } from 'react'

import { Button as ShadcnButton } from '@/components/ui/button'

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset' | undefined
	fullWidth?: boolean
	children?: React.ReactNode
	onClick?: () => void
	secondary?: boolean
	danger?: boolean
	disabled?: boolean
}

const buttonVariants = cva(
	'flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-offset-2 cursor-pointer',
	{
		variants: {
			color: {
				primary: 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 text-white',
				secondary: 'text-gray-900',
				danger: 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
			},
			fullWidth: {
				true: 'w-full',
				false: '',
			},
			disabled: {
				true: 'opacity-50 cursor-default cursor-not-allowed',
				false: '',
			},
		},
		defaultVariants: {
			color: 'primary',
			fullWidth: false,
			disabled: false,
		},
	}
)

const Button: FC<ButtonProps & VariantProps<typeof buttonVariants>> = ({
	type,
	fullWidth,
	children,
	onClick,
	secondary,
	danger,
	disabled,
}) => {
	return (
		<ShadcnButton
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={buttonVariants({
				color: secondary ? 'secondary' : danger ? 'danger' : 'primary',
				fullWidth: fullWidth ? true : false,
				disabled: disabled ? true : false,
			})}
		>
			{children}
		</ShadcnButton>
	)
}

export default Button
