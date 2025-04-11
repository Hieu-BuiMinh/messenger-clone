import UsersPageView from '@/views/(routes)/users/pages/users.page'

export default async function UsersPage() {
	return <UsersPageView />
}

export const dynamic = 'force-dynamic'
// https://next-auth.js.org/getting-started/client#getsession
/*
	do app có dùng getServerSession thì phải có dòng 'force-dynamic' ở trên
	mà getServerSession request lại dùng header và cookie của request hiện tại

	req = {
      headers: Object.fromEntries((await headers()) as Headers),
      cookies: Object.fromEntries(
        (await cookies()).getAll().map((c) => [c.name, c.value])
      ),
    }

	nếu không có 'force-dynamic' thì khi build lỗi
	*Error: Dynamic server usage: Route /users couldn't be rendered statically because it used `headers`.
	sẽ xuất hiện
*/
