import { type NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}

export default function middleware(_req: NextRequest) {
  return NextResponse.next()
}
