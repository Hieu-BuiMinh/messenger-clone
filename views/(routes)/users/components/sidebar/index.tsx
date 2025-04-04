import React from 'react'

import getCurrentUser from '@/actions/get-current-user'
import Spinner from '@/components/common/spinner'
import DesktopSidebar from '@/views/(routes)/users/components/sidebar/desktop-sidebar'
import MobileFooter from '@/views/(routes)/users/components/sidebar/mobile-footer'

export default async function Sidebar({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return (
			<div className="size-full flex items-center justify-center">
				<Spinner />
			</div>
		)
	}

	return (
		<div className="h-full">
			<DesktopSidebar currentUser={currentUser!} />
			<MobileFooter />
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	)
}
