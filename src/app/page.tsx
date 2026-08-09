"use client"
import { useEffect, useRef, useState } from 'react'
import WatchFaceSwitcher from '../components/WatchFaceSwitcher'
import SettingsBar from '../components/SettingsBar'

export default function Home() {
  const [active, setActive] = useState(0) // 0: Digital, 1: Dual, 2: World
  const containerRef = useRef<HTMLDivElement | null>(null)

  // keyboard listeners
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActive((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setActive((i) => Math.min(2, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // mouse drag / touch swipe
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let startX = 0
    let currentX = 0
    let dragging = false

    const onDown = (e: MouseEvent | TouchEvent) => {
      dragging = true
      startX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      currentX = startX
      el.style.transition = 'none'
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      const dx = x - startX
      currentX = x
      const total = el.clientWidth
      const faceWidth = total / 3
      el.style.transform = `translateX(${ -active * faceWidth + dx }px)`
    }
    const onUp = () => {
      if (!dragging) return
      dragging = false
      const total = el.clientWidth
      const faceWidth = total / 3
      const dx = currentX - startX
      const threshold = 80
      // animate back to the proper position
      el.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)'
      if (dx > threshold) setActive((i) => Math.max(0, i - 1))
      else if (dx < -threshold) setActive((i) => Math.min(2, i + 1))
      else el.style.transform = `translateX(${ -active * faceWidth }px)`
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.addEventListener('touchstart', onDown)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)

    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      el.removeEventListener('touchstart', onDown)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [active])

  return (
    <main className="h-screen w-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full max-w-6xl max-h-[90vh]">
          <WatchFaceSwitcher activeIndex={active} onChange={setActive} slideRef={containerRef} />
        </div>
      </div>
      <SettingsBar />
    </main>
  )
}
