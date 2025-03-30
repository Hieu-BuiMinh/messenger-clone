import { withAuth } from 'next-auth/middleware'

export default withAuth({
	pages: {
		signIn: '/',
	},
})

export const config = {
	// all routes that start with /users or /conversations is protected
	matcher: ['/users/:path*', '/conversations/:path*'],
}
