'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  href: string;
  title: string;
  tag: string;
  description: string;
  delay: number;
  isExiting: boolean;
  imageHeight?: string;
  imageSrc?: string;
}

export default function ProjectCard({
  href,
  title,
  tag,
  description,
  delay,
  isExiting,
  imageHeight = "200px",
  imageSrc
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 30 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isExiting ? 0 : delay }}
      className="flex"
    >
      <Link
        href={href}
        className="flex flex-col bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-gray-300 w-full overflow-hidden"
      >
        <div className="w-full pt-4 px-4">
          <div className="w-full bg-gray-100" style={{ aspectRatio: '5/2' }}>
            {imageSrc && (
              <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
            )}
          </div>
        </div>
        <div className="p-10 flex flex-col flex-1">
          <div className="flex gap-4 mb-6">
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold tracking-wider uppercase">
              {tag}
            </span>
          </div>
          <h3 className="font-sans text-[2rem] font-bold mb-4 text-[#333] tracking-tight">
            {title}
          </h3>
          <p className="text-[1.1rem] text-[#666] leading-[1.6] mb-8 flex-1">
            {description}
          </p>
          <span className="inline-flex items-center gap-2 text-base font-bold text-[#0066cc] mt-auto">
            View project →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
