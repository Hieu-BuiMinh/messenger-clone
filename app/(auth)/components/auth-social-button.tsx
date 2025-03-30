// import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'
import type { IconType } from 'react-icons'

import { Button } from '@/components/ui/button'

interface AuthSocialButtonProps {
	icon: IconType
	onClick: () => void
}

const AuthSocialButton: FC<AuthSocialButtonProps> = ({ icon: Icon, onClick }) => {
	return (
		<Button
			type="button"
			onClick={onClick}
			className="inline-flex grow justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 cursor-pointer"
		>
			<Icon />
		</Button>
	)
}

export default AuthSocialButton
