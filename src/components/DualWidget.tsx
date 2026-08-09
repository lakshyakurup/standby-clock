"use client"
import AnalogClock from './AnalogClock'
import CalendarWidget from './CalendarWidget'

export default function DualWidget() {
  return (
    <div className="w-full h-full max-w-5xl flex items-stretch justify-center gap-8 px-6">
      <div className="flex-1 flex items-center justify-center">
        <AnalogClock size={340} />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <CalendarWidget />
      </div>
    </div>
  )
}
