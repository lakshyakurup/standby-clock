import { NextResponse } from 'next/server'
import { fetchWeatherForCoords } from '../../../lib/weather'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const lat = url.searchParams.get('lat')
  const lon = url.searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat and lon required' }, { status: 400 })
  }

  try {
    const data = await fetchWeatherForCoords(Number(lat), Number(lon))
    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'failed' }, { status: 500 })
  }
}
