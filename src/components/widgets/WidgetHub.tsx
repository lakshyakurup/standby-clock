'use client';

import React, { useState } from 'react';
import GitHubWidget from './GitHubWidget';
import ScratchpadWidget from './ScratchpadWidget';
import { LayoutGrid, Terminal, FileText } from 'lucide-react';

export default function WidgetHub() {
  const [activeTab, setActiveTab] = useState<'github' | 'scratchpad'>('github');

  return (
    <div className="flex flex-col h-full">
      {/* Tab Switcher Header */}
      <div className="flex items-center justify-between bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-800/80 mb-4">
        <button
          onClick={() => setActiveTab('github')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'github'
              ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          GitHub Stats
        </button>
        <button
          onClick={() => setActiveTab('scratchpad')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'scratchpad'
              ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          Scratchpad
        </button>
      </div>

      {/* Active Widget View */}
      <div className="flex-1 min-h-[280px]">
        {activeTab === 'github' ? <GitHubWidget /> : <ScratchpadWidget />}
      </div>
    </div>
  );
}
