"use client"
import { useEffect, useState } from 'react'

function twoDigits(n: number) {
  return n.toString().padStart(2, '0')
}

export default function OversizedClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const hoursRaw = now.getHours()
  const hours = twoDigits(hoursRaw)
  const minutes = twoDigits(now.getMinutes())
  const seconds = twoDigits(now.getSeconds())

  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <div className="select-none relative flex items-center gap-6">
        <div className="relative">
          <div style={{ WebkitTextStroke: '1px rgba(0,0,0,0.25)' }} className="absolute -left-2 -top-4 text-[14rem] leading-[0.78] font-extrabold opacity-20" aria-hidden>
            {hours}
          </div>
          <div style={{ background: 'var(--theme-gradient)', WebkitBackgroundClip: 'text', color: 'transparent' }} className="text-[14rem] leading-[0.78] font-extrabold">
            {hours}
          </div>
        </div>

        <div className="text-[6.5rem] font-bold" style={{ color: 'var(--theme-color)', textShadow: '0 0 18px rgba(255,106,90,0.18)' }}>
          :
        </div>

        <div className="relative">
          <div style={{ WebkitTextStroke: '1px rgba(0,0,0,0.18)' }} className="absolute -left-2 -top-4 text-[14rem] leading-[0.78] font-extrabold opacity-14" aria-hidden>
            {minutes}
          </div>
          <div style={{ background: 'var(--theme-gradient)', WebkitBackgroundClip: 'text', color: 'transparent' }} className="text-[14rem] leading-[0.78] font-extrabold">
            {minutes}
          </div>
        </div>

        <div className="ml-4 mt-12 text-[2.4rem] text-gray-400 opacity-70">{seconds}</div>
      </div>
    </div>
  )
}
