'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import FeaturedProjectCard from '@/components/FeaturedProjectCard';

export default function Work() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleExit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      sessionStorage.setItem('isReturning', 'true');
      router.push('/');
    }, 800);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText('michaelgarvey0@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] overflow-x-hidden">
      {/* Noise texture overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full opacity-[0.03] z-[1] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />

      <div className="max-w-[1000px] mx-auto px-12 relative z-[2]">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-[rgba(0,0,0,0.08)] z-50"
        >
          <div className="max-w-[1000px] mx-auto px-12 flex justify-between items-center py-6">
            <div className="text-2xl font-semibold tracking-tight text-[#333]">
              Michael Garvey
            </div>
            <div className="flex items-center gap-10">
              <Link href="#work" className="text-[0.95rem] font-medium text-[#666] hover:text-[#1a1a1a] transition-colors duration-300">Work</Link>
              <Link href="#about" className="text-[0.95rem] font-medium text-[#666] hover:text-[#1a1a1a] transition-colors duration-300">About</Link>
              <button
                onClick={handleExit}
                className="text-[0.95rem] font-medium text-[#666] hover:text-[#1a1a1a] transition-colors duration-300"
              >
                Exit
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="mt-52 mb-40 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 30 : 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: isExiting ? 0 : 0.2 }}
          >
            <h1 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.4] text-[#333] tracking-tight">
              I'm Michael Garvey, currently Head of Product and UX at <a href="https://www.orgohq.com" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:no-underline">Orgo</a>, building experiences that bridge creativity and logic.
            </h1>
          </motion.div>
        </section>

        {/* Featured Work Section */}
        <section className="mb-20" id="work">
          <div className="grid gap-12">
            {/* Hero Project */}
            <FeaturedProjectCard
              href="/work/orgo"
              title="Orgo: The App"
              tag="Mobile App Design + Development"
              description="B2C mobile app for managing daily life. End-to-end product design from research to launch."
              linkText="View project"
              delay={0.5}
              isExiting={isExiting}
            />

            {/* Secondary Projects */}
            <div className="grid grid-cols-2 gap-8 auto-rows-fr">
              <ProjectCard
                href="/work/webster"
                title="Webster Bank"
                tag="Design System"
                description="Migrated and enhanced their design system from Sketch to Figma."
                delay={0.65}
                isExiting={isExiting}
              />

              <ProjectCard
                href="/work/inkbench-ez-mode"
                title="Inkbench EZ Mode"
                tag="Web App Design"
                description="Converting wireframes to high-fidelity designs."
                delay={0.8}
                isExiting={isExiting}
              />

              {showMore && (
                <>
                  <ProjectCard
                    href="/work/orgo-brand"
                    title="Orgo: The Brand"
                    tag="Branding and Site Design"
                    description="Defining a brand for a B2C mobile app."
                    delay={0}
                    isExiting={isExiting}
                  />

                  <ProjectCard
                    href="/work/newport-in-bloom"
                    title="Newport in Bloom"
                    tag="Site Design + Development"
                    description="Designing and developing a responsive website for a local nonprofit."
                    delay={0.15}
                    isExiting={isExiting}
                  />

                  <ProjectCard
                    href="/work/beeline"
                    title="Beeline"
                    tag="Mobile App Concept"
                    description="A GPS for your grocery shopping experience."
                    delay={0.3}
                    isExiting={isExiting}
                  />
                </>
              )}
            </div>
          </div>

          {!showMore && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 30 : 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isExiting ? 0 : 0.95 }}
              className="flex justify-center my-20"
            >
              <button
                onClick={() => setShowMore(true)}
                className="px-8 py-3 bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[#333] font-bold text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
              >
                Load more
              </button>
            </motion.div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-[rgba(0,0,0,0.08)] pt-12 pb-12">
          <div className="flex justify-between items-center text-sm text-[#666]">
            <div className="flex items-center gap-8">
              <button
                onClick={copyEmail}
                className="hover:text-[#0066cc] transition-colors duration-300 cursor-pointer flex items-center gap-2 group"
                title={emailCopied ? 'Copied!' : 'Click to copy email'}
              >
                <span>michaelgarvey0@gmail.com</span>
                <span className="relative w-[14px] h-[14px] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute transition-opacity ${emailCopied ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'}`}
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute transition-opacity ${emailCopied ? 'opacity-100' : 'opacity-0'} text-green-600`}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </button>
              <a
                href="https://www.linkedin.com/in/michaelgarvey0/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0066cc] transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
            <div>
              © 2025 Michael Garvey
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
