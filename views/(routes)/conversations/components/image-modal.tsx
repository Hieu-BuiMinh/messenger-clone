'use client'

import Image from 'next/image'
import { type FC, useEffect } from 'react'

import { Dialog } from '@/components/ui/dialog'

interface ImageModalProps {
	src?: string | null
	onClose: () => void
	isOpen?: boolean
}

const ImageModal: FC<ImageModalProps> = ({ src, onClose, isOpen }) => {
	useEffect(() => {
		if (!isOpen) {
			onClose()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	if (!src) {
		return null
	}
	return (
		<Dialog open={isOpen}>
			<div className="w-80 h-80">
				<Image src={src} alt="Image" fill className="object-cover" />
			</div>
		</Dialog>
	)
}

export default ImageModal
