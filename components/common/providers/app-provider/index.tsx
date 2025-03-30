import AuthSessionProvider from '@/components/common/providers/auth-session-provider'
import { ThemeProvider } from '@/components/common/providers/theme-provider'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
			<AuthSessionProvider>{children}</AuthSessionProvider>
		</ThemeProvider>
	)
}

export default AppProvider
