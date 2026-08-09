import { NextResponse } from 'next/server'
import { getGeoFromIP, serverTimeInfo } from '../../../lib/time'

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
  const geo = await getGeoFromIP(ip)
  const server = serverTimeInfo()

  return NextResponse.json({
    server,
    geo,
  })
}
