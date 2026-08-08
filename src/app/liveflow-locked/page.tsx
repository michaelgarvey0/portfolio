'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LiveFlowLocked() {
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
    <div className="min-h-screen bg-white relative flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm pt-24 pb-16">
          <div className="w-12 h-12 mb-8 flex items-center justify-center border border-[rgba(0,0,0,0.12)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <h1 className="text-[1.75rem] font-bold text-[#333] mb-3">This case study is private</h1>
          <p className="text-[1rem] text-[#666] leading-relaxed mb-8">
            The password is on my resume or in your application materials - if you don&apos;t have it, reach out and I&apos;m happy to share it.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter password to unlock"
              autoFocus
              className="w-full px-4 py-3 border border-[rgba(0,0,0,0.16)] focus:outline-none focus:border-[#0066cc] transition-colors"
            />
            {error && (
              <p className="text-sm text-red-600">That password didn&apos;t work - try again.</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full px-4 py-3 bg-[#0066cc] text-white font-semibold transition-opacity hover:bg-[#0052a3] disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto px-6 md:px-12 w-full" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}
