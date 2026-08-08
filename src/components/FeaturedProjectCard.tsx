'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface FeaturedProjectCardProps {
  href: string;
  title: string;
  tag: string;
  description: string;
  linkText: string;
  delay: number;
  isExiting: boolean;
  imageSrc?: string;
  gradientFrom?: string;
  gradientTo?: string;
  locked?: boolean;
}

export default function FeaturedProjectCard({
  href,
  title,
  tag,
  description,
  linkText,
  delay,
  isExiting,
  imageSrc,
  gradientFrom = '#ff3e00',
  gradientTo = '#ff8c00',
  locked = false
}: FeaturedProjectCardProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const res = await fetch('/api/liveflow-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(href);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const content = (
    <>
      <div className="featured-content relative z-[1]">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {locked && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-800 text-white text-xs font-semibold tracking-wider uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Password protected
            </span>
          )}
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold tracking-wider uppercase">
            {tag}
          </span>
        </div>
        <h3 className="font-sans text-[3rem] font-bold mb-4 text-[#333] tracking-tight">
          {title}
        </h3>
        <p className="text-[1.2rem] text-[#666] leading-[1.6] mb-8">
          {description}
        </p>

        {locked ? (
          <form onSubmit={handleUnlock} className="flex flex-col gap-2 max-w-[22rem]">
            <p className="text-xs text-[#999]">Password is on my resume - reach out if you don&apos;t have it.</p>
            <div className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 border border-gray-300 bg-white focus-within:border-[#0066cc] transition-colors">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Enter password to unlock"
                aria-label="Password"
                className="flex-1 min-w-0 py-1.5 text-sm bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !password}
                className="px-4 py-2 bg-[#0066cc] text-white text-sm font-bold hover:bg-[#0052a3] transition-colors disabled:opacity-50 flex-shrink-0"
              >
                {loading ? '...' : 'Unlock'}
              </button>
            </div>
            {error && <span className="text-xs text-red-600">Incorrect password - try again.</span>}
          </form>
        ) : (
          <span className="inline-flex items-center gap-2 text-base font-bold text-[#0066cc]">
            {linkText} →
          </span>
        )}
      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full p-8 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`, aspectRatio: '1/1', maxWidth: '100%' }}>
          {imageSrc && (
            <img src={imageSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 30 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isExiting ? 0 : delay }}
      className="flex"
    >
      <style jsx>{`
        :global(.featured-card) {
          display: flex !important;
          flex-direction: row !important;
        }
        :global(.featured-image) {
          width: 50%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          background-color: white;
          padding: 16px;
        }
        :global(.featured-content) {
          width: 50%;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 767px) {
          :global(.featured-card) {
            flex-direction: column !important;
          }
          :global(.featured-card) > div:first-child {
            order: 2;
          }
          :global(.featured-card) > div:last-child {
            order: 1;
            width: 100% !important;
            padding: 1rem 1rem 0 1rem !important;
            align-items: flex-start !important;
          }
          :global(.featured-card) > div:last-child > div {
            aspect-ratio: 5/2 !important;
            padding: 0 !important;
          }
          :global(.featured-card) > div:last-child > div img {
            object-position: center 10% !important;
          }
          :global(.featured-content) {
            width: 100% !important;
            padding: 2.5rem !important;
            order: 2;
          }
          :global(.featured-content h3) {
            font-size: 2rem !important;
          }
          :global(.featured-content p) {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
      {locked ? (
        <div className="w-full bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative overflow-hidden featured-card">
          {content}
        </div>
      ) : (
        <Link
          href={href}
          className="w-full bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden group featured-card"
        >
          {content}
        </Link>
      )}
    </motion.div>
  );
}
