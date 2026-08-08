'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/CaseStudyHero';

export default function LiveFlow() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const brandColor = '#4B5563';

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'background', title: 'Background' },
    { id: 'problem', title: 'The Problem' },
    { id: 'process', title: 'Building Flow' },
    { id: 'results', title: 'Results' },
    { id: 'next', title: "What's Next" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setShowSidebarTitle(heroRect.bottom < 100);
      }

      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        setActiveSection('next');
      } else {
        let activeId = null;

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            if (rect.top <= 750) {
              activeId = section.id;
              break;
            }
          }
        }

        if (activeId) {
          setActiveSection(activeId);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      {/* Hero — no image yet, CaseStudyHero falls back to a gray placeholder */}
      <CaseStudyHero
        title="LiveFlow"
        description="Agentic accounting that closes the books on its own."
        gradientFrom="#9CA3AF"
        gradientTo="#4B5563"
        ctaText="Visit LiveFlow"
        ctaHref="https://liveflow.com"
        ctaColor="#374151"
      />

      {/* Content with Sidebar */}
      <div className="mx-auto pt-20 flex gap-20 content-container" style={{ maxWidth: 'var(--max-width)' }}>
        <style jsx>{`
          .content-container {
            padding-left: 3rem;
            padding-right: 3rem;
          }
          .sidebar {
            width: 190px;
            flex-shrink: 0;
            position: sticky;
            top: 8rem;
            height: fit-content;
          }
          @media (max-width: 991px) {
            .content-container {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            }
            .sidebar {
              display: none;
            }
          }
        `}</style>
        <main className="flex-1 min-w-0">
          {/* Summary */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            id="summary"
            className="mb-32 scroll-mt-32"
          >
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm">
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">ROLE</h5>
                <p className="text-[#666] leading-relaxed">Product Designer - the only designer on the team</p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TEAM</h5>
                <p className="text-[#666] leading-relaxed">[Add team]</p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TIMELINE</h5>
                <p className="text-[#666] leading-relaxed">[Add timeline]</p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TOOLS</h5>
                <p className="text-[#666] leading-relaxed">[Add tools]</p>
              </div>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              LiveFlow builds Flow, an AI-native, agentic ERP for multi-entity businesses - it closes the books, reconciles accounts, and consolidates across entities in real time instead of the usual manual month-end grind. [Add a sentence or two on your specific contribution.]
            </p>
          </motion.section>

          {/* Background */}
          <section id="background" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Background</h2>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              [What LiveFlow is, why you joined, and the context going in.]
            </p>
          </section>

          {/* The Problem */}
          <section id="problem" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The Problem</h2>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              [What was broken about legacy ERPs / manual close for multi-entity businesses, and what you were asked to solve.]
            </p>
          </section>

          {/* Building Flow */}
          <section id="process" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Building Flow</h2>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              [Design and research process, key decisions, how the agentic architecture (Orchestrator, Closer, Reconciler, Categorizer, and the rest of the agent team) shaped the product design, notable iterations.]
            </p>
          </section>

          {/* Results */}
          <section id="results" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Results</h2>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              [Metrics, launch outcomes, customer reception.]
            </p>
          </section>

          {/* What's Next */}
          <section id="next" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">What&apos;s Next</h2>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              [Where the product and your role are headed.]
            </p>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="w-[190px] flex-shrink-0 sticky top-32 h-fit sidebar">
          <div
            className="overflow-hidden ease-out"
            style={{
              maxHeight: showSidebarTitle ? '200px' : '0',
              opacity: showSidebarTitle ? 1 : 0,
              marginBottom: showSidebarTitle ? '2.5rem' : '0',
              transition: showSidebarTitle
                ? 'all 800ms ease-out'
                : 'all 400ms ease-out'
            }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12" style={{ background: 'linear-gradient(135deg, #9CA3AF 0%, #4B5563 100%)' }} />
              <span className="font-bold text-xl text-[#333]">LiveFlow</span>
            </div>
          </div>

          <nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6"
            >
              Contents
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="relative"
            >
              {/* Background line */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#e5e5e5]" />

              {/* Active indicator line */}
              <div
                className="absolute w-[3px] transition-all duration-300 ease-out rounded-[99px]"
                style={{
                  backgroundColor: brandColor,
                  top: `${sections.findIndex(s => s.id === activeSection) * 36}px`,
                  height: '36px',
                  transform: 'translate3d(0, 0, 0)',
                  contain: 'layout paint',
                  left: '-1px'
                }}
              />

              <div className="relative">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    style={{
                      transform: 'translate3d(0, 0, 0)',
                      contain: 'layout paint',
                      fontWeight: activeSection === section.id ? 700 : 500,
                      color: activeSection === section.id ? brandColor : '#666',
                      transitionProperty: 'opacity'
                    }}
                    className="block w-full text-left pl-6 pr-4 py-2 text-sm transition-opacity duration-300 hover:opacity-80"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </nav>
        </aside>
      </div>

      {/* Navigation Footer */}
      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <div className="flex flex-col md:flex-row justify-end pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20">
          <Link href="/work/orgo" className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2">
            <div className="flex items-center gap-2 font-bold text-[#0066cc]">
              <span>Up next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
              </svg>
            </div>
            <span className="text-[1.5rem] text-[#666] transition-colors font-bold">
              Orgo: The App
            </span>
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-20 px-12 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <style jsx>{`
          @media (max-width: 767px) {
            div {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
          }
        `}</style>
        <Footer />
      </div>
    </div>
  );
}
