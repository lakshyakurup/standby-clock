"use client"
import { useEffect, useState } from 'react'

const cities = [
  { name: 'New York', tz: 'America/New_York', x: 120, y: 110 },
  { name: 'London', tz: 'Europe/London', x: 220, y: 80 },
  { name: 'Tokyo', tz: 'Asia/Tokyo', x: 430, y: 110 },
  { name: 'Sydney', tz: 'Australia/Sydney', x: 500, y: 150 },
]

function tzTime(tz: string) {
  try {
    return new Date().toLocaleTimeString(undefined, { timeZone: tz, hour: '2-digit', minute: '2-digit' })
  } catch {
    return '--:--'
  }
}

export default function WorldClockMap() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // compute simple terminator rotation based on UTC hour
  const now = new Date()
  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60
  const rotation = (utcHours / 24) * 360

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="relative w-[760px] h-[360px] bg-transparent rounded-lg overflow-hidden">
        <svg viewBox="0 0 760 360" className="w-full h-full">
          <rect width="100%" height="100%" fill="#050505" rx="8" />
          {/* simple dotted 'map' background */}
          {Array.from({ length: 300 }).map((_, i) => (
            <circle key={i} cx={(i * 47) % 760} cy={((i * 73) % 360)} r={0.6} fill="#111" />
          ))}
          {/* a subtle night overlay using rotation to simulate terminator */}
        </svg>

        <div style={{ transform: `rotate(${rotation}deg)` }} className="absolute inset-0 pointer-events-none mix-blend-multiply" aria-hidden>
          <div style={{ width: '60%', height: '200%', left: '-10%', top: '-50%', transform: 'translate3d(0,0,0)' }} className="absolute bg-gradient-to-r from-black/88 to-transparent" />
        </div>

        {/* city pins and list */}
        {cities.map((c) => (
          <div key={c.name} className="absolute" style={{ left: c.x, top: c.y }}>
            <div className="w-3 h-3 rounded-full" style={{ background: 'var(--theme-color)' }} />
          </div>
        ))}

        <div className="absolute left-4 top-4 text-sm text-gray-300 space-y-2">
          {cities.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-color)' }} />
              <div>{c.name} <span className="text-gray-400">{tzTime(c.tz)}</span></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
