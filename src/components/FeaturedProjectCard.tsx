'use client';

import Link from 'next/link';
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
}

export default function FeaturedProjectCard({
  href,
  title,
  tag,
  description,
  linkText,
  delay,
  isExiting,
  imageSrc
}: FeaturedProjectCardProps) {
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
      <Link
        href={href}
        className="w-full bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden group featured-card"
      >
        <div className="featured-content relative z-[1]">
          <div className="mb-6">
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
          <span className="inline-flex items-center gap-2 text-base font-bold text-[#0066cc]">
            {linkText} →
          </span>
        </div>

        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full p-8 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff3e00 0%, #ff8c00 100%)', aspectRatio: '1/1', maxWidth: '100%' }}>
            {imageSrc && (
              <img src={imageSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
