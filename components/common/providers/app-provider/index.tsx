import { ThemeProvider } from '@/components/common/providers/theme-provider'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
			{children}
		</ThemeProvider>
	)
}

export default AppProvider
