'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isExiting, setIsExiting] = useState(false);
  const [showWorkDropdown, setShowWorkDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're coming from the home page on mount
  const isFromHome = typeof window !== 'undefined' && sessionStorage.getItem('isFromHome') === 'true';
  const shouldAnimate = isFromHome;

  useEffect(() => {
    // Clear the flag after first render
    if (isFromHome) {
      sessionStorage.removeItem('isFromHome');
    }
  }, []);

  const handleExit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      sessionStorage.setItem('isReturning', 'true');
      router.push('/');
    }, 800);
  };

  const caseStudies = [
    { href: '/work/orgo', title: 'Orgo: The App', tag: 'Mobile App Design + Development', logo: '/assets/logos/orgo.svg' },
    { href: '/work/webster', title: 'Webster Bank', tag: 'Design System', logo: '/assets/logos/webster.svg' },
    { href: '/work/inkbench-ez-mode', title: 'Inkbench EZ Mode', tag: 'Web App Design', logo: '/assets/logos/inkbench.svg' },
    { href: '/work/orgo-brand', title: 'Orgo: The Brand', tag: 'Branding and Site Design', logo: '/assets/logos/orgo.svg' },
    { href: '/work/newport-in-bloom', title: 'Newport in Bloom', tag: 'Site Design + Development', logo: null },
    { href: '/work/beeline', title: 'Beeline', tag: 'Mobile App Concept', logo: null },
  ];

  return (
    <>
      {/* White fade overlay for exit */}
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-white z-[100] pointer-events-none"
        />
      )}

      {/* Overlay for mobile menu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black z-[40]"
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
        onClick={() => setMobileMenuOpen(false)}
      />

      <motion.nav
        initial={shouldAnimate ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 bg-white/95 border-b border-[rgba(0,0,0,0.08)] z-50"
      >
        <style jsx>{`
          .nav-container {
            padding-left: 3rem;
            padding-right: 3rem;
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }
          .desktop-nav {
            display: flex;
          }
          .mobile-menu-button {
            display: none;
          }
          @media (max-width: 991px) {
            .nav-container {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
              padding-top: 1rem;
              padding-bottom: 1rem;
            }
            .desktop-nav {
              display: none;
            }
            .mobile-menu-button {
              display: flex;
            }
          }
        `}</style>
        <div className="mx-auto flex justify-between items-center nav-container" style={{ maxWidth: 'var(--max-width)' }}>
          <Link href="/work" className="text-2xl font-bold text-[#1e3f66] hover:text-[#0d243f] transition-colors" style={{ letterSpacing: 0 }}>
            Michael Garvey
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-button items-center justify-center w-10 h-10 text-[#666] hover:text-[#1a1a1a] transition-colors relative cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
                animate={{
                  x1: mobileMenuOpen ? 6 : 3,
                  y1: mobileMenuOpen ? 6 : 6,
                  x2: mobileMenuOpen ? 18 : 21,
                  y2: mobileMenuOpen ? 18 : 6,
                  rotate: mobileMenuOpen ? 0 : 0
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
                animate={{
                  x1: mobileMenuOpen ? 6 : 3,
                  y1: mobileMenuOpen ? 18 : 18,
                  x2: mobileMenuOpen ? 18 : 21,
                  y2: mobileMenuOpen ? 6 : 18,
                  rotate: mobileMenuOpen ? 0 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </button>

          {/* Desktop Nav */}
          <div className="desktop-nav items-center gap-10">
            <div className="relative group">
              <Link href="/work" className="text-[0.95rem] font-medium text-[#666] hover:text-[#1a1a1a] transition-colors duration-300 flex items-center gap-2">
                Work
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>
              <div className="absolute top-full left-[-20px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-lg min-w-[320px]">
                  {caseStudies.map((study, index) => (
                    <Link
                      key={study.href}
                      href={study.href}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-[rgba(0,0,0,0.02)] transition-colors duration-150 border-b border-[rgba(0,0,0,0.06)] last:border-b-0"
                    >
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center p-2">
                        {study.logo && <img src={study.logo} alt={study.title} className="w-full h-full object-contain" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-[0.9rem] text-[#333] font-bold">{study.title}</div>
                        <div className="text-[0.75rem] text-[#999] mt-1">{study.tag}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/about" className="text-[0.95rem] font-medium text-[#666] hover:text-[#1a1a1a] transition-colors duration-300 mr-4 ml-2">
              About
            </Link>
            <a href="/" onClick={handleExit} className="text-[0.95rem] font-medium text-[#666] hover:text-[#1a1a1a] transition-colors duration-300 cursor-pointer flex items-center gap-2">
              Exit
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-[rgba(0,0,0,0.08)] bg-white overflow-hidden"
        >
            <div className="px-6 py-6 flex flex-col gap-6">
              {/* Work Section */}
              <div>
                <Link
                  href="/work"
                  className="text-[1.1rem] font-bold text-[#1a1a1a] block mb-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Work
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  {caseStudies.map((study) => (
                    <Link
                      key={study.href}
                      href={study.href}
                      className="flex flex-col items-center gap-2 py-3 px-2 hover:bg-[rgba(0,0,0,0.02)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.08)] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {study.logo && (
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                          <img src={study.logo} alt={study.title} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-[0.85rem] text-[#333] font-semibold leading-tight">{study.title}</div>
                        <div className="text-[0.65rem] text-[#999] mt-1 leading-tight">{study.tag}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Pages */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/about"
                  className="text-[1.1rem] font-bold text-[#1a1a1a] py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <a
                  href="/"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleExit(e);
                  }}
                  className="text-[1.1rem] font-bold text-[#1a1a1a] cursor-pointer flex items-center gap-2 py-1"
                >
                  Exit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </a>
              </div>
            </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
