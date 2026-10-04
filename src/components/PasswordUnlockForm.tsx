'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PasswordUnlockFormProps {
  onSuccess: () => void;
  autoFocus?: boolean;
  inlineError?: boolean;
}

export default function PasswordUnlockForm({ onSuccess, autoFocus = false, inlineError = false }: PasswordUnlockFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = loading || !password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    setError(false);
    setLoading(true);

    const res = await fetch('/api/liveflow-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      onSuccess();
    } else {
      setError(true);
      setLoading(false);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div
          className={`flex items-center gap-2 pl-4 pr-1.5 py-1.5 border bg-white transition-colors duration-200 ${
            error ? 'border-[#b91c1c]' : 'border-[rgba(0,0,0,0.12)] focus-within:border-[#0066cc]'
          }`}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Enter password to unlock"
            aria-label="Password"
            autoFocus={autoFocus}
            className="flex-1 min-w-0 py-1.5 text-sm bg-transparent focus:outline-none text-[#1a1a1a] placeholder:text-[#999]"
          />
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="flex-shrink-0 p-1 text-[#999] hover:text-[#666] transition-colors cursor-pointer"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              type="submit"
              aria-disabled={isDisabled}
              className={`px-4 py-2 text-sm font-bold transition-colors flex-shrink-0 flex items-center justify-center ${
                isDisabled ? 'cursor-default' : 'hover:bg-[#0052a3] cursor-pointer'
              }`}
              style={{ minWidth: '5.25rem', backgroundColor: '#0066cc', color: '#ffffff', opacity: isDisabled ? 0.5 : 1 }}
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                'Unlock'
              )}
            </button>
            {showTooltip && !password && !loading && (
              <div
                className="absolute pointer-events-none tooltip-pop"
                style={{ bottom: '100%', left: '50%', marginBottom: '12px', zIndex: 99999 }}
              >
                <div
                  style={{
                    backgroundColor: '#4B5563',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    padding: '6px 10px',
                  }}
                >
                  Enter the password
                </div>
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .tooltip-pop {
            transform: translate(-50%, 4px);
            opacity: 0;
            animation: tooltipIn 150ms ease-out forwards;
          }
          @keyframes tooltipIn {
            to {
              transform: translate(-50%, 0);
              opacity: 1;
            }
          }
        `}</style>
        {inlineError ? (
          <AnimatePresence initial={false}>
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="text-xs text-red-700" style={{ marginTop: '0.375rem' }}>Incorrect password - try again.</p>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <span
            className="absolute left-0 top-full mt-1.5 text-xs text-red-700 transition-opacity duration-200"
            style={{ opacity: error ? 1 : 0, pointerEvents: 'none' }}
          >
            Incorrect password - try again.
          </span>
        )}
      </div>
    </form>
  );
}
