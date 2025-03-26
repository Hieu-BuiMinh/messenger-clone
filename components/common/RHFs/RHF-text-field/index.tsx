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
							className={cn('', inputClassName)}
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
