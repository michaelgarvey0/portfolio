'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PasswordUnlockForm from './PasswordUnlockForm';

export default function LiveFlowGate() {
  const gateRef = useRef<HTMLDivElement>(null);

  const focusPasswordInput = () => {
    gateRef.current?.querySelector('input')?.focus();
  };

  // Lock body scroll while the gate is up - the fake content behind it is
  // tall on purpose, but the real page underneath should never scroll.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const fakeSections = [
    {
      title: 'Nice Try',
      body: "You scrolled. Respect. But this section, like everything else on this page, is fake - same fonts, same spacing, same sidebar as the real thing, just with nothing real in it.",
    },
    {
      title: 'Still Fake',
      body: 'This paragraph too. Nothing behind the password leaks out here - the real case study only renders once you actually have it.',
    },
    {
      title: 'The Password Is On My Resume',
      body: "That part's true. If you're a recruiter and don't have it, reach out - happy to send it over.",
    },
  ];

  return (
    <div ref={gateRef} onClick={focusPasswordInput} className="fixed inset-0 z-[9999] overflow-hidden bg-white cursor-text">
      <style jsx>{`
        .hero-inner {
          padding-left: 3rem;
          padding-right: 3rem;
        }
        .content-container {
          padding-left: 3rem;
          padding-right: 3rem;
        }
      `}</style>

      {/* Container 1: the fake page body - hero + content + sidebar, all decorative */}
      <div aria-hidden="true">
        {/* Hero - identical markup/classes to CaseStudyHero.tsx, joke copy instead */}
        <div className="pt-20 pb-0 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C1163 0%, #2E54AB 100%)' }}>
          <div className="mx-auto relative hero-inner" style={{ maxWidth: 'var(--max-width)' }}>
            <div className="flex md:flex-row flex-col justify-between gap-12">
              <div className="md:w-[40%] w-full flex flex-col justify-center">
                <h1 className="font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 tracking-tight text-white">
                  Ha, nice try.
                </h1>
                <p className="text-[clamp(1rem,2vw,1.25rem)] leading-relaxed mb-10 text-white">
                  This isn&apos;t the real case study - it&apos;s a decoy built the same size as the real hero so there&apos;s nothing to find by looking around the password.
                </p>
              </div>
              <div className="md:w-[60%] w-full flex flex-col">
                <div className="md:h-20 h-0" />
                <div
                  className="w-full flex items-center justify-center"
                  style={{ aspectRatio: '16/10', background: 'linear-gradient(135deg, #0C1163 0%, #2E54AB 100%)' }}
                >
                  <span className="text-white/50 text-sm font-medium tracking-wide">Also not a real screenshot</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content with sidebar - identical markup/classes to work/liveflow/page.tsx, joke copy instead */}
        <div className="mx-auto pt-20 flex gap-20 content-container" style={{ maxWidth: 'var(--max-width)' }}>
          <main className="flex-1 min-w-0">
            {fakeSections.map((section) => (
              <section key={section.title} className="mb-32">
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">{section.title}</h2>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">{section.body}</p>
              </section>
            ))}
          </main>

          <aside className="w-[190px] flex-shrink-0 h-fit">
            <div className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">Contents</div>
            <nav className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#e5e5e5]" />
              <div
                className="absolute w-[3px] rounded-[99px]"
                style={{ backgroundColor: '#2E54AB', top: 0, height: '36px', left: '-1px' }}
              />
              <div className="relative">
                {fakeSections.map((section, i) => (
                  <div
                    key={section.title}
                    className="block w-full text-left pl-6 pr-4 py-2 text-sm"
                    style={{ fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#2E54AB' : '#666' }}
                  >
                    {section.title}
                  </div>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      </div>

      {/* Overlay - dims/blurs the fake background so the popup reads clearly on top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 9998, backgroundColor: 'rgba(75,85,99,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
        aria-hidden="true"
      />

      {/* Container 2: password card - sibling to container 1, fixed and centered */}
      <motion.div
        layout
        className="z-[10000]"
        style={{ position: 'fixed', top: '50vh', left: '50vw', transform: 'translate(-50%, -50%)' }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div layout className="w-[26rem] max-w-[90vw] bg-white shadow-2xl" style={{ padding: '2rem' }}>
          <div className="w-10 h-10 mb-6 flex items-center justify-center" style={{ background: '#374151' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <h2 className="text-[1.4rem] font-bold text-[#333] mb-2">This case study is private</h2>
          <p className="text-sm text-[#666] leading-relaxed mb-6">Password is on my resume</p>

          <PasswordUnlockForm autoFocus inlineError onSuccess={() => { window.location.href = '/work/liveflow'; }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
