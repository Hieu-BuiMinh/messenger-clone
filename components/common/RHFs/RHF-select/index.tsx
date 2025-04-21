import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

type TRHFTextFieldProps = React.InputHTMLAttributes<HTMLSelectElement> & {
	name: string
	description?: string
	label?: string
	placeholder?: string
	className?: string
	selectClassName?: string
	autoComplete?: string
	data: [{ value: string; label: string }]
}

function RHFSelect({
	name,
	className,
	label,
	placeholder,
	selectClassName,
	// autoComplete,
	data,
	description,
}: TRHFTextFieldProps) {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn('w-full', className)}>
					{label && <FormLabel className="text-xs">{label}</FormLabel>}
					<Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} className={cn({ selectClassName }, '')} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{data.map((item) => {
								return (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								)
							})}
						</SelectContent>
					</Select>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage className="text-red-500" />
				</FormItem>
			)}
		/>
	)
}

export default RHFSelect
