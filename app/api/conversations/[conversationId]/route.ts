import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		return NextResponse.json({}, { status: 200 })
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('[CONVERSATIONS_ERROR]', error)
		return new NextResponse('Internal server error', { status: 500 })
	}
}
