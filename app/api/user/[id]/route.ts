import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	return NextResponse.json({ id: 1, username: "dj", fName: "Deepak", avatarUrl: "https://avatars.githubusercontent.com/u/688055?s=40&v=4" })
}
