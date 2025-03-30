'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

import { Toaster } from '@/components/common/toaster'

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	return (
		<NextThemesProvider defaultTheme="light" {...props}>
			{children}
			<Toaster />
		</NextThemesProvider>
	)
}
