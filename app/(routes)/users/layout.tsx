import getUsers from '@/actions/get-users'
import Sidebar from '@/views/(routes)/users/components/sidebar'
import UserList from '@/views/(routes)/users/components/users/user-list'

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
	const users = await getUsers()

	return (
		<Sidebar>
			<div className="h-screen">
				<UserList users={users} />
				{children}
			</div>
		</Sidebar>
	)
}
