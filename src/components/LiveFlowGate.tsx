'use client';

import { useState } from 'react';

export default function LiveFlowGate() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const res = await fetch('/api/liveflow-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = '/work/liveflow';
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-6">
      <div className="w-full max-w-sm bg-white p-8 shadow-2xl">
        <div className="w-10 h-10 mb-6 flex items-center justify-center border border-[rgba(0,0,0,0.12)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h2 className="text-[1.4rem] font-bold text-[#333] mb-2">This case study is private</h2>
        <p className="text-sm text-[#666] leading-relaxed mb-6">
          Password is on my resume - reach out if you don&apos;t have it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter password to unlock"
              autoFocus
              className="w-full px-4 py-3 border border-[rgba(0,0,0,0.16)] text-sm focus:outline-none focus:border-[#0066cc] transition-colors"
            />
            <p
              className="absolute left-0 top-full mt-1.5 text-sm text-red-600 transition-opacity duration-300"
              style={{ opacity: error ? 1 : 0, pointerEvents: 'none' }}
            >
              That password didn&apos;t work - try again.
            </p>
          </div>
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full px-4 py-3 bg-[#0066cc] text-white font-semibold hover:bg-[#0052a3] transition-colors disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}
