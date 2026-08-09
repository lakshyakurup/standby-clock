"use client"
import { useEffect, useRef, useState } from 'react'

export default function AnalogClock({ size = 240 }: { size?: number }) {
  const [now, setNow] = useState<Date>(() => new Date())
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const loop = () => {
      setNow(new Date())
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const ms = now.getMilliseconds()
  const seconds = now.getSeconds() + ms / 1000
  const minutes = now.getMinutes() + seconds / 60
  const hours = (now.getHours() % 12) + minutes / 60

  const center = size / 2

  return (
    <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <defs>
          <filter id="f" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>
        <circle cx={center} cy={center} r={center - 2} fill="#050505" stroke="#222" strokeWidth={2} />
        {/* ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2
          const outer = center - 8
          const inner = i % 5 === 0 ? center - 28 : center - 22
          const x1 = center + outer * Math.cos(angle - Math.PI / 2)
          const y1 = center + outer * Math.sin(angle - Math.PI / 2)
          const x2 = center + inner * Math.cos(angle - Math.PI / 2)
          const y2 = center + inner * Math.sin(angle - Math.PI / 2)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#666" strokeWidth={i % 5 === 0 ? 2.2 : 1} />
        })}

        {/* hour hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (center - 80) * Math.cos((hours / 12) * Math.PI * 2 - Math.PI / 2)}
          y2={center + (center - 80) * Math.sin((hours / 12) * Math.PI * 2 - Math.PI / 2)}
          stroke="#ddd"
          strokeWidth={6}
          strokeLinecap="round"
          filter="url(#f)"
        />
        {/* minute hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (center - 50) * Math.cos((minutes / 60) * Math.PI * 2 - Math.PI / 2)}
          y2={center + (center - 50) * Math.sin((minutes / 60) * Math.PI * 2 - Math.PI / 2)}
          stroke="var(--theme-color)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* sweeping seconds hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (center - 30) * Math.cos((seconds / 60) * Math.PI * 2 - Math.PI / 2)}
          y2={center + (center - 30) * Math.sin((seconds / 60) * Math.PI * 2 - Math.PI / 2)}
          stroke="rgba(255,255,255,0.9)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
