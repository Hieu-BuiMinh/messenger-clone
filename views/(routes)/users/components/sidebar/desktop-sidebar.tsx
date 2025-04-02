'use client'

import type { User } from '@prisma/client'
import type { FC } from 'react'
import React, { useState } from 'react'

import useRoutes from '@/hooks/use-routes'
import DesktopItem from '@/views/(routes)/users/components/sidebar/desktop-item'

interface DesktopSidebarProps {
	currentUser: User
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
	const routes = useRoutes()

	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto xl:px-6 lg:bg-white lg:border-r[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
			<nav className="mt-4 flex flex-col justify-between">
				<ul role="list" className="flex flex-col items-center space-y-1">
					{routes.map((item) => {
						return (
							<DesktopItem
								key={item.label}
								href={item.href}
								label={item.label}
								icon={item.icon}
								active={item.active}
								onClick={item.onClick}
							/>
						)
					})}
				</ul>
			</nav>
		</div>
	)
}

export default DesktopSidebar
