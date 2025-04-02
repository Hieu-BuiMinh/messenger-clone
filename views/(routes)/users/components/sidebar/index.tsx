import React from 'react'

import getCurrentUser from '@/actions/get-current-user'
import DesktopSidebar from '@/views/(routes)/users/components/sidebar/desktop-sidebar'
import MobileFooter from '@/views/(routes)/users/components/sidebar/mobile-footer'

export default async function Sidebar({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser()

	return (
		<div className="h-full">
			<DesktopSidebar currentUser={currentUser!} />
			<MobileFooter />
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	)
}
