'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

import { Button } from '@/components/ui/button'

const UsersPage = () => {
	return (
		<div>
			<Button
				onClick={() => {
					signOut()
				}}
			>
				Out
			</Button>
		</div>
	)
}

export default UsersPage
