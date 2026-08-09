"use client"
import OversizedClock from './OversizedClock'
import DualWidget from './DualWidget'
import WorldClockMap from './WorldClockMap'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const faces = [
  { id: 'digital', label: 'Oversized', comp: <OversizedClock /> },
  { id: 'dual', label: 'Dual', comp: <DualWidget /> },
  { id: 'world', label: 'World', comp: <WorldClockMap /> },
]

export default function WatchFaceSwitcher({ activeIndex, onChange, slideRef }: { activeIndex: number; onChange: (n: number) => void; slideRef?: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <button
          aria-label="previous"
          onClick={() => onChange(Math.max(0, activeIndex - 1))}
          className="p-2 bg-white/6 rounded-full"
        >
          <ArrowLeft size={26} />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <button
          aria-label="next"
          onClick={() => onChange(Math.min(faces.length - 1, activeIndex + 1))}
          className="p-2 bg-white/6 rounded-full"
        >
          <ArrowRight size={26} />
        </button>
      </div>

      <div className="h-full w-full">
        <div
          ref={slideRef}
          className="flex h-full w-full"
          style={{ transform: `translateX(${ -activeIndex * 100 }%)`, transition: 'transform 420ms cubic-bezier(.2,.9,.2,1)' }}
        >
          {faces.map((f) => (
            <div key={f.id} className="w-full flex-shrink-0 h-full flex items-center justify-center">
              {f.comp}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
