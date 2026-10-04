'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/CaseStudyHero';
import CaseStudyNav from './CaseStudyNav';

export interface ShellSection {
  id: string;
  title: string;
}

interface CaseStudyShellProps {
  sections: ShellSection[];
  brandColor: string;
  /** Sidebar title shown once the hero scrolls away. */
  sidebarTitle: string;
  /** Optional sidebar logo. Falls back to a gradient square when absent. */
  logoSrc?: string;
  gradientFrom: string;
  gradientTo: string;
  heroTitle: string;
  heroDescription: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaColor?: string;
  nextHref: string;
  nextTitle: string;
  children: React.ReactNode;
}

/**
 * Shared chrome for case studies: hero, sticky sidebar TOC with scrollspy,
 * content column, prev/next footer.
 *
 * Extracted from src/app/work/liveflow/page.tsx, which every other case study
 * duplicates almost verbatim (~210 lines each). Only the new /work/liveflow-v*
 * routes use this for now; migrating the existing seven is a separate change.
 */
export default function CaseStudyShell({
  sections,
  brandColor,
  sidebarTitle,
  logoSrc,
  gradientFrom,
  gradientTo,
  heroTitle,
  heroDescription,
  heroImageSrc,
  heroImageAlt,
  ctaText,
  ctaHref,
  ctaColor,
  nextHref,
  nextTitle,
  children,
}: CaseStudyShellProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        setShowSidebarTitle(heroSection.getBoundingClientRect().bottom < 100);
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        // The original hardcoded 'next' here, which is wrong on any page whose
        // last section isn't literally called 'next'.
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.getBoundingClientRect().top <= 750) {
          setActiveSection(sections[i].id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.pageYOffset - 100,
      behavior: 'smooth',
    });
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      <CaseStudyHero
        title={heroTitle}
        description={heroDescription}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
        ctaText={ctaText}
        ctaHref={ctaHref}
        ctaColor={ctaColor}
      />

      <div
        className="mx-auto pt-20 flex content-container"
        style={{ maxWidth: 'var(--max-width)', gap: '5rem' }}
      >
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

        <main className="flex-1 min-w-0">{children}</main>

        <aside className="sidebar">
          <div
            className="overflow-hidden ease-out"
            style={{
              maxHeight: showSidebarTitle ? '200px' : '0',
              opacity: showSidebarTitle ? 1 : 0,
              marginBottom: showSidebarTitle ? '2.5rem' : '0',
              transition: showSidebarTitle ? 'all 800ms ease-out' : 'all 400ms ease-out',
            }}
          >
            <div className="flex items-center mb-3" style={{ gap: '1rem' }}>
              {logoSrc ? (
                <img src={logoSrc} alt={sidebarTitle} className="w-12 h-12" />
              ) : (
                <div
                  className="w-12 h-12"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                  }}
                />
              )}
              <span className="font-bold text-xl text-[#333]">{sidebarTitle}</span>
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
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#e5e5e5]" />
              <div
                className="absolute w-[3px] transition-all duration-300 ease-out rounded-[99px]"
                style={{
                  backgroundColor: brandColor,
                  top: `${Math.max(activeIndex, 0) * 36}px`,
                  height: '36px',
                  transform: 'translate3d(0, 0, 0)',
                  contain: 'layout paint',
                  left: '-1px',
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
                      transitionProperty: 'opacity',
                      paddingLeft: '1.5rem',
                      paddingRight: '1rem',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                    }}
                    className="block w-full text-left text-sm transition-opacity duration-300 hover:opacity-80"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </nav>
        </aside>
      </div>

      <CaseStudyNav next={{ href: nextHref, title: nextTitle }} />

      <div className="mx-auto mt-20 px-6 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}
