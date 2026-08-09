"use client"
import { useState, useEffect } from 'react'
import { Maximize2, Clock, SunMoon, Palette } from 'lucide-react'

export default function SettingsBar() {
  const [is24, setIs24] = useState<boolean>(() => {
    try { return localStorage.getItem('is24') === '1' } catch { return false }
  })
  const [night, setNight] = useState<boolean>(() => {
    try { return localStorage.getItem('night') === '1' } catch { return false }
  })
  const [theme, setTheme] = useState<string>(() => {
    try { return localStorage.getItem('theme') || '#ff6a5a' } catch { return '#ff6a5a' }
  })

  useEffect(() => {
    try { localStorage.setItem('is24', is24 ? '1' : '0') } catch {}
  }, [is24])
  useEffect(() => {
    try { localStorage.setItem('night', night ? '1' : '0') } catch {}
    if (night) document.body.classList.add('night-mode')
    else document.body.classList.remove('night-mode')
  }, [night])
  useEffect(() => {
    try { localStorage.setItem('theme', theme) } catch {}
    document.documentElement.style.setProperty('--theme-color', theme)
  }, [theme])

  const toggleFull = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => {})
    } else {
      await document.exitFullscreen().catch(() => {})
    }
  }

  return (
    <div className="w-full px-6 py-4 border-t border-white/6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={() => setIs24((s) => !s)} className="px-3 py-2 bg-white/6 rounded-md flex items-center gap-2">
          <Clock size={16} />
          <span>{is24 ? '24-hour' : '12-hour'}</span>
        </button>
        <button onClick={() => setNight((s) => !s)} className="px-3 py-2 bg-white/6 rounded-md flex items-center gap-2">
          <SunMoon size={16} />
          <span>{night ? 'Night' : 'Day'}</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-2 bg-white/6 rounded-md">
          <Palette size={16} />
          <input aria-label="theme" value={theme} onChange={(e) => setTheme(e.target.value)} type="color" className="w-8 h-8 p-0 border-0 bg-transparent" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggleFull} className="px-3 py-2 bg-white/6 rounded-md flex items-center gap-2">
          <Maximize2 size={16} />
          <span>Fullscreen</span>
        </button>
      </div>
    </div>
  )
}
