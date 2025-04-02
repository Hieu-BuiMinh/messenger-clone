'use client'

import Link from 'next/link'
import type { FC } from 'react'

import { cn } from '@/lib/utils'

interface DesktopItemProps {
	label: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any
	href: string
	active?: boolean
	onClick?: () => void
}

const DesktopItem: FC<DesktopItemProps> = ({ label, icon: Icon, href, active, onClick }) => {
	const handleClick = () => {
		if (onClick) {
			return onClick()
		}
	}

	return (
		<li onClick={handleClick}>
			<Link
				href={href}
				className={cn(
					'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100',
					active && 'bg-gray-100 text-black'
				)}
			>
				<Icon className="size-6 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	)
}

export default DesktopItem
