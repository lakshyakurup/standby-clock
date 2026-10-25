'use client';

import React, { useEffect, useState } from 'react';
import { GitBranch, Star, GitCommit, Code, Terminal } from 'lucide-react';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  login: string;
}

export default function GitHubWidget({ username = 'lakshyakurup' }: { username?: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return (
    <div className="flex flex-col justify-between h-full p-6 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl text-zinc-100 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-zinc-800 rounded-2xl border border-zinc-700/50">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-wide text-zinc-200">GitHub Activity</h3>
            <p className="text-xs text-zinc-500 font-mono">@{username}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Live sync
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-400"></div>
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/60 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
              <Code className="w-3.5 h-3.5 text-blue-400" /> Repositories
            </span>
            <span className="text-2xl font-bold font-mono tracking-tight mt-2 text-zinc-100">
              {stats.public_repos}
            </span>
          </div>
          <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/60 flex flex-col justify-between">
            <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
              <GitBranch className="w-3.5 h-3.5 text-purple-400" /> Followers
            </span>
            <span className="text-2xl font-bold font-mono tracking-tight mt-2 text-zinc-100">
              {stats.followers}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-xs text-zinc-500 py-4 text-center font-mono">
          Unable to fetch GitHub metrics
        </div>
      )}

      <div className="text-[11px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-800/80 pt-3">
        <span>Status: Operational</span>
        <span className="text-emerald-400">● Synced</span>
      </div>
    </div>
  );
}
