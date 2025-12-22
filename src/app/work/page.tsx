'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Work() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleExit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      sessionStorage.setItem('isReturning', 'true');
      router.push('/');
    }, 800);
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

      <div className="max-w-[1400px] mx-auto px-12 relative z-[2]">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-[rgba(0,0,0,0.08)] z-50"
        >
          <div className="max-w-[1400px] mx-auto px-12 flex justify-between items-center py-6">
            <div className="text-2xl font-semibold tracking-tight text-[#0A0E27]">
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
        <section className="mt-40 mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 30 : 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: isExiting ? 0 : 0.2 }}
            className="max-w-[900px]"
          >
            <h1 className="font-sans text-[clamp(3rem,7vw,5rem)] font-semibold leading-[1.1] text-[#0A0E27] tracking-tight">
              Michael Garvey
            </h1>
          </motion.div>
        </section>

        {/* Featured Work Section */}
        <section className="mb-40" id="work">

          <div className="grid gap-12">
            {/* Hero Project */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 30 : 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isExiting ? 0 : 0.5 }}
            >
              <Link
                href="/work/orgo"
                className="grid grid-cols-2 gap-16 items-center p-16 bg-white border border-[rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden group"
              >

                <div className="w-full h-[400px] bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8] flex items-center justify-center relative overflow-hidden">
                  <span className="font-sans text-[8rem] font-semibold text-[rgba(0,0,0,0.05)] absolute tracking-tight">
                    ORGO
                  </span>
                </div>

                <div className="relative z-[1]">
                  <h3 className="font-sans text-[3rem] font-semibold mb-4 text-[#0A0E27] tracking-tight">
                    Orgo
                  </h3>
                  <p className="text-[1.2rem] text-[#666] leading-[1.6]">
                    Mobile app to help with the logistics of daily life.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Secondary Projects */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 30 : 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isExiting ? 0 : 0.65 }}
              >
                <Link
                  href="/work/webster"
                  className="block p-10 bg-white border border-[rgba(0,0,0,0.08)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.15)]"
                >
                  <h3 className="font-sans text-[2rem] font-semibold mb-4 text-[#0A0E27] tracking-tight">
                    Webster Bank
                  </h3>
                  <p className="text-[1.1rem] text-[#666] leading-[1.6]">
                    Design system migration from Sketch to Figma.
                  </p>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? 30 : 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isExiting ? 0 : 0.8 }}
              >
                <Link
                  href="/work/beeline"
                  className="block p-10 bg-white border border-[rgba(0,0,0,0.08)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.15)]"
                >
                  <h3 className="font-sans text-[2rem] font-semibold mb-4 text-[#0A0E27] tracking-tight">
                    Beeline
                  </h3>
                  <p className="text-[1.1rem] text-[#666] leading-[1.6]">
                    GPS for your grocery shopping experience.
                  </p>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
