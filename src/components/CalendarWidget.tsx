"use client"
import { useMemo } from 'react'

function monthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1)
  const startDay = first.getDay() // 0-6 Sun-Sat
  const days = new Date(year, month + 1, 0).getDate()
  const weeks: number[][] = []
  let week: number[] = Array(7).fill(0)
  let day = 1
  for (let i = 0; i < 6; i++) {
    week = Array(7).fill(0)
    for (let d = 0; d < 7; d++) {
      if ((i === 0 && d < startDay) || day > days) continue
      if (d >= startDay || i > 0) {
        if (day <= days) {
          week[d] = day++
        }
      }
    }
    weeks.push(week)
  }
  return weeks
}

export default function CalendarWidget() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const weeks = useMemo(() => monthMatrix(year, month), [year, month])

  return (
    <div className="w-[360px] p-6 bg-transparent rounded-lg">
      <div className="text-white/90 mb-4 flex items-baseline justify-between">
        <h3 className="text-2xl font-semibold">{today.toLocaleString(undefined, { month: 'long' })} {year}</h3>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-400">
        {['S','M','T','W','T','F','S'].map((d) => (
          <div key={d} className="opacity-80">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-3">
        {weeks.map((week, i) => (
          <div key={i} className="contents">
            {week.map((d, j) => (
              <div key={j} className={`h-12 flex items-center justify-center ${d === today.getDate() ? 'bg-[var(--theme-color)] text-black rounded-md font-semibold' : 'text-gray-300'}`}>
                {d || ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
