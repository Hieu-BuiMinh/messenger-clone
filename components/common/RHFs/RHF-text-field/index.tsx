'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type TRHFTextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	description?: string
	label?: string
	placeholder?: string
	className?: string
	inputClassName?: string
	autoComplete?: string
}

function RHFTextField({
	name,
	description,
	label,
	placeholder,
	className,
	inputClassName,
	autoComplete,
}: TRHFTextFieldProps) {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn('w-full', className)}>
					{label && <FormLabel className="text-xs">{label}</FormLabel>}
					<FormControl>
						<Input
							className={cn(
								'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6',
								inputClassName,
								field.disabled && 'opacity-50 cursor-default',
								control._formState.errors[name] && 'focus:ring-rose-500'
							)}
							placeholder={placeholder}
							autoComplete={autoComplete}
							{...field}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage className="text-red-500" />
				</FormItem>
			)}
		/>
	)
}

export default RHFTextField
