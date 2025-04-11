import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
	} catch (error) {
		console.log('[CONVERSATIONS_ERROR]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
