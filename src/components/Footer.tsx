'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Footer() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [showTechModal, setShowTechModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [perimeter, setPerimeter] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showTechModal && mounted) {
      setIsClosing(false);
      // Calculate perimeter after modal renders
      setTimeout(() => {
        const modalEl = document.querySelector('.tech-modal-box');
        if (modalEl) {
          const rect = modalEl.getBoundingClientRect();
          const perim = 2 * (rect.width + rect.height);
          setPerimeter(perim);
        }
      }, 50);
    }
  }, [showTechModal, mounted]);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowTechModal(false);
      setIsClosing(false);
    }, 300); // Match the fade out animation duration
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText('michaelgarvey0@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <footer className="border-t border-[rgba(0,0,0,0.08)] pt-12 pb-12">
      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            background: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
          }
          100% {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
          }
        }
        @keyframes fadeOut {
          0% {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
          }
          100% {
            background: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
          }
        }
        @keyframes sketchIn {
          0% {
            stroke-dashoffset: var(--perimeter);
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes modalFadeIn {
          0% {
            background-color: transparent;
          }
          100% {
            background-color: white;
          }
        }
        @keyframes modalFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        @keyframes modalContentFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
      <style jsx>{`
        .footer-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-links {
          display: flex;
          align-items: center;
          gap: 3rem;
          flex-wrap: nowrap;
        }
        @media (max-width: 767px) {
          .footer-container {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
          .footer-links {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
        }
      `}</style>
      <div className="footer-container text-base text-[#666]">
        <div className="footer-links">
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
          <button
            onClick={() => setShowTechModal(true)}
            className="hover:text-[#0066cc] transition-colors duration-300 cursor-pointer"
          >
            How I built this
          </button>
        </div>
        <div>
          © 2025 Michael Garvey
        </div>
      </div>

      {/* Tech Stack Modal - Using Portal */}
      {mounted && showTechModal && createPortal(
        <>
          <div
            className="fixed inset-0 z-[10000]"
            onClick={handleCloseModal}
            style={{
              animation: isClosing
                ? 'fadeOut 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
                : 'fadeIn 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
            }}
          />
          <div
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <div
              className="max-w-2xl w-full p-8 relative tech-modal-box"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'transparent',
                animation: isClosing
                  ? 'modalFadeOut 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
                  : 'modalFadeIn 0.5s 0.8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
              }}
            >
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ borderRadius: '3px' }}
              >
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  rx="3"
                  style={{
                    strokeDasharray: perimeter || 3000,
                    strokeDashoffset: perimeter || 3000,
                    animation: perimeter ? 'sketchIn 0.5s 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards' : 'none',
                    '--perimeter': `${perimeter}px`
                  } as any}
                />
              </svg>

              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-[#666] hover:text-[#333] transition-colors z-10 cursor-pointer"
                style={{
                  opacity: 0,
                  animation: 'modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <h2
                className="text-3xl font-bold text-[#333] mb-4"
                style={{
                  opacity: 0,
                  animation: 'modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
                }}
              >How I Built This Portfolio</h2>
              <p
                className="text-lg text-[#666] mb-6"
                style={{
                  opacity: 0,
                  animation: 'modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
                }}
              >
                Designed and developed from scratch to showcase both design and development skills.
              </p>

              <div
                className="mb-8"
                style={{
                  opacity: 0,
                  animation: 'modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
                }}
              >
                <h3 className="text-xl font-bold text-[#333] mb-3">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-[#666] text-sm mb-2">FRAMEWORK</h4>
                    <ul className="space-y-1 text-[#666] list-disc ml-6 pl-2">
                      <li>Next.js 14</li>
                      <li>React 18</li>
                      <li>TypeScript</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#666] text-sm mb-2">STYLING</h4>
                    <ul className="space-y-1 text-[#666] list-disc ml-6 pl-2">
                      <li>Tailwind CSS</li>
                      <li>Framer Motion</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="mb-6"
                style={{
                  opacity: 0,
                  animation: 'modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
                }}
              >
                <h3 className="text-xl font-bold text-[#333] mb-3">Key Features</h3>
                <ul className="space-y-2 text-[#666] list-disc ml-6 pl-2">
                  <li>Custom door animation created in After Effects, exported as Lottie JSON</li>
                  <li>Scroll-based parallax effects with Framer Motion</li>
                  <li>Custom SVG border drawing animation on this modal</li>
                  <li>Server-side rendering with Next.js App Router</li>
                </ul>
              </div>

              <a
                href="https://github.com/michaelgarvey/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#0066cc] text-white font-bold transition-all duration-300 hover:bg-[#0052a3] hover:-translate-y-1"
                style={{
                  opacity: 0,
                  animation: 'modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
                }}
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </>,
        document.body
      )}
    </footer>
  );
}
