'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import PasswordUnlockForm from './PasswordUnlockForm';

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
  const lockedCardRef = useRef<HTMLDivElement>(null);
  const [browserUnlocked, setBrowserUnlocked] = useState(false);

  useEffect(() => {
    if (!locked) return;
    fetch('/api/liveflow-auth')
      .then((res) => res.json())
      .then((data) => setBrowserUnlocked(!!data.authed))
      .catch(() => {});
  }, [locked]);

  const stillLocked = locked && !browserUnlocked;

  const focusPasswordInput = () => {
    lockedCardRef.current?.querySelector('input')?.focus();
  };

  const content = (
    <>
      <div className="relative order-2 md:order-1 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold tracking-wider uppercase">
            {tag}
          </span>
        </div>
        <h3 className="font-sans text-[2rem] md:text-[3rem] font-bold mb-4 text-[#333] tracking-tight">
          {title}
        </h3>
        <p className="text-[1.1rem] md:text-[1.2rem] text-[#666] leading-[1.6] mb-8">
          {description}
        </p>

        {stillLocked ? (
          <div className="max-w-[22rem]">
            <p className="text-xs text-[#999] mb-2">Password is on my resume</p>
            <PasswordUnlockForm onSuccess={() => router.push(href)} />
          </div>
        ) : (
          <span className="inline-flex items-center gap-2 text-base font-bold text-[#0066cc]">
            {linkText}
            <IconArrowRight size={18} stroke={2.5} />
          </span>
        )}

        {locked && !stillLocked && (
          <p className="mt-4 md:mt-0 md:absolute md:bottom-8 md:left-8 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#15803d' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Password remembered by your browser
          </p>
        )}
      </div>

      <div className="order-1 md:order-2 w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div
          className="w-full aspect-[5/2] md:aspect-square"
          style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
        >
          {imageSrc && (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" style={{ objectPosition: 'center 10%' }} />
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
      {stillLocked ? (
        <div
          ref={lockedCardRef}
          onClick={focusPasswordInput}
          className="w-full bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative flex flex-col md:flex-row cursor-text"
        >
          {content}
        </div>
      ) : (
        <Link
          href={href}
          className="w-full bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden group flex flex-col md:flex-row"
        >
          {content}
        </Link>
      )}
    </motion.div>
  );
}
