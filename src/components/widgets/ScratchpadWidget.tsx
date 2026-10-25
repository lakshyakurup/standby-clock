'use client';

import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, RefreshCw } from 'lucide-react';

export default function ScratchpadWidget() {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem('standby_scratchpad');
    if (cached) setNote(cached);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNote(val);
    localStorage.setItem('standby_scratchpad', val);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="flex flex-col justify-between h-full p-6 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl text-zinc-100 shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-zinc-800 rounded-2xl border border-zinc-700/50">
            <FileText className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-wide text-zinc-200">Desk Scratchpad</h3>
            <p className="text-xs text-zinc-500 font-mono">Auto-saves to local storage</p>
          </div>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Type quick thoughts, reminders, or code snippets here..."
        className="w-full flex-1 bg-zinc-950/60 border border-zinc-800/60 rounded-2xl p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none font-mono"
        rows={4}
      />

      <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-3 border-t border-zinc-800/80">
        <span>{note.length} characters</span>
        <button
          onClick={() => {
            setNote('');
            localStorage.removeItem('standby_scratchpad');
          }}
          className="hover:text-zinc-300 transition-colors"
        >
          Clear notes
        </button>
      </div>
    </div>
  );
}
