'use client'

import useConversation from '@/hooks/use-conversation'
import useRoutes from '@/hooks/use-routes'
import MobileItem from '@/views/(routes)/users/components/sidebar/mobile-item'

const MobileFooter = () => {
	const routes = useRoutes()
	const { isOpen } = useConversation()

	if (isOpen) {
		return null
	}

	return (
		<div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
			{routes.map((route) => (
				<MobileItem
					label={route.label}
					key={route.href}
					href={route.href}
					icon={route.icon}
					onClick={route.onClick}
					active={route.active}
				/>
			))}
		</div>
	)
}

export default MobileFooter
