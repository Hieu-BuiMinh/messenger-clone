import Sidebar from '@/views/(routes)/users/components/sidebar'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
	// const users = await getUsers()

	return (
		<Sidebar>
			<div className="h-screen">
				{/* <UserList users={users} /> */}
				{children}
			</div>
		</Sidebar>
	)
}
