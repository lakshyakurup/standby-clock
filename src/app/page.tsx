'use client';

import React, { useState, useEffect } from 'react';
import WidgetHub from '@/components/widgets/WidgetHub';
import { Sparkles, Moon, Sun, Shield, Settings, Maximize } from 'lucide-react';

export default function StandByPage() {
  const [time, setTime] = useState(new Date());
  const [isNightMode, setIsNightMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <main className={`min-h-screen w-full flex flex-col justify-between p-6 md:p-12 transition-colors duration-500 ${isNightMode ? 'bg-black text-red-500' : 'bg-zinc-950 text-zinc-100'}`}>
      {/* Top Bar / Settings Header */}
      <header className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-zinc-900 rounded-xl border border-zinc-800">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-zinc-200">StandBy OS Pro</h1>
            <p className="text-xs text-zinc-500 font-mono">Next.js 14+ App Router Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono border transition-all ${
              isNightMode 
                ? 'bg-red-950/40 text-red-400 border-red-900/50' 
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isNightMode ? 'Night Red' : 'Standard'}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-8">
        {/* Left / Center Clock Hero Section */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Atomic Clock
          </div>
          
          <div className="text-7xl md:text-9xl font-extrabold font-mono tracking-tighter my-6 text-zinc-100 drop-shadow-lg">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>

          <p className="text-sm md:text-base font-mono text-zinc-400 tracking-wide uppercase">
            {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Right Modular Widget Hub Section */}
        <div className="lg:col-span-5 flex flex-col">
          <WidgetHub />
        </div>
      </div>

      {/* Footer Status Bar */}
      <footer className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 border-t border-zinc-800/80 pt-4 gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>System Status: Fully Operational & Secure</span>
        </div>
        <div>
          <span>Designed & Built by Lakshya Kurup</span>
        </div>
      </footer>
    </main>
  );
}
