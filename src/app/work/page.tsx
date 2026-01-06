'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import FeaturedProjectCard from '@/components/FeaturedProjectCard';
import Footer from '@/components/Footer';

export default function Work() {
  const [showMore, setShowMore] = useState(false);
  const [show404Toast, setShow404Toast] = useState(false);
  const [toast404Visible, setToast404Visible] = useState(false);

  useEffect(() => {
    const shouldShow404 = sessionStorage.getItem('show404Toast');
    if (shouldShow404) {
      setShow404Toast(true);
      sessionStorage.removeItem('show404Toast');
      // Small delay to trigger enter animation
      setTimeout(() => setToast404Visible(true), 50);
      // Start fade out after 1.5s
      setTimeout(() => setToast404Visible(false), 1500);
      // Remove from DOM after fade completes
      setTimeout(() => setShow404Toast(false), 2000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-[#1a1a1a] overflow-x-hidden">
      <style jsx>{`
        .main-container {
          padding-left: 3rem;
          padding-right: 3rem;
        }
        .hero-section {
          margin-top: 13rem;
          margin-bottom: 10rem;
        }
        .projects-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 767px) {
          .main-container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .hero-section {
            margin-top: 8rem;
            margin-bottom: 6rem;
          }
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Noise texture overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full opacity-[0.03] z-[1] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />

      <Navbar />

      <div className="mx-auto relative z-[2] main-container" style={{ maxWidth: 'var(--max-width)' }}>
        {/* Hero Section */}
        <section className="relative hero-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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
              title="Orgo"
              tag="Mobile App Design + Development"
              description="B2C mobile app for managing daily life. End-to-end product design from research to launch."
              linkText="View project"
              delay={0.5}
              isExiting={false}
              imageSrc="/assets/case-studies/orgo/preview.png"
            />

            {/* Secondary Projects */}
            <div className="grid gap-8 auto-rows-fr projects-grid">
              <ProjectCard
                href="/work/webster"
                title="Webster Bank"
                tag="Design System"
                description="Migrated and enhanced their design system from Sketch to Figma."
                delay={0.65}
                isExiting={false}
                imageSrc="/assets/case-studies/webster/preview.png"
              />

              <ProjectCard
                href="/work/inkbench-ez-mode"
                title="Inkbench EZ Mode"
                tag="Web App Design"
                description="Converting wireframes to high-fidelity designs."
                delay={0.8}
                isExiting={false}
                imageSrc="/assets/case-studies/inkbench/preview.png"
              />

              {showMore && (
                <>
                  <ProjectCard
                    href="/work/orgo-brand"
                    title="Orgo: The Brand"
                    tag="Branding and Site Design"
                    description="Defining a brand for a B2C mobile app."
                    delay={0}
                    isExiting={false}
                    imageSrc="/assets/case-studies/orgo-brand/preview.png"
                  />

                  <ProjectCard
                    href="/work/newport-in-bloom"
                    title="Newport in Bloom"
                    tag="Site Design + Development"
                    description="Designing and developing a responsive website for a local nonprofit."
                    delay={0.15}
                    isExiting={false}
                    imageSrc="/assets/case-studies/newport-in-bloom/preview.png"
                  />

                  <ProjectCard
                    href="/work/beeline"
                    title="Beeline"
                    tag="Mobile App Concept"
                    description="A GPS for your grocery shopping experience."
                    delay={0.3}
                    isExiting={false}
                    imageSrc="/assets/case-studies/beeline/preview.png"
                  />
                </>
              )}
            </div>
          </div>

          {!showMore && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
              className="flex justify-center my-20"
            >
              <button
                onClick={() => setShowMore(true)}
                className="px-8 py-3 bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[#333] font-bold text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] cursor-pointer"
              >
                Show more
              </button>
            </motion.div>
          )}
        </section>

        <Footer />
      </div>

      {/* 404 Toast Notification */}
      {show404Toast && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black transition-opacity duration-500 ease-out"
            style={{
              opacity: toast404Visible ? 0.4 : 0,
              zIndex: 9999
            }}
          />

          {/* Toast */}
          <div
            className="fixed bottom-8 bg-white text-[#333] px-6 py-3 shadow-lg transition-all duration-500 ease-out"
            style={{
              zIndex: 10000,
              borderLeft: '4px solid #0066cc',
              left: '50%',
              opacity: toast404Visible ? 1 : 0,
              transform: toast404Visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)'
            }}
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span className="text-sm font-medium">Page not found</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
