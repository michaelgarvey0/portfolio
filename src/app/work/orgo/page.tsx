'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NumberBadge from '@/components/NumberBadge';

export default function OrgoCaseAlt() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const { scrollYProgress } = useScroll();
  const brandColor = '#ff3e00';

  const imageY = useTransform(scrollYProgress, [0, 0.3], [0, 300]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'problem', title: 'The problem' },
    { id: 'interviews', title: 'User interviews' },
    { id: 'ideation', title: 'Ideation and design' },
    { id: 'testing', title: 'Testing and iteration' },
    { id: 'current', title: 'The current product' },
    { id: 'reflection', title: 'Reflection' }
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

      // Check if we're at the bottom of the page (within 50px)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        // If at bottom, activate the last section
        setActiveSection('reflection');
      } else {
        // Find which section we're currently in
        // Prioritize sections whose top is past the detection point (750px)
        let activeId = null;

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            // If section top has passed the detection point, this is our active section
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
    handleScroll(); // Initial check
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

      {/* Hero */}
      <motion.div
        id="hero-section"
        className="pt-20 pb-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ff3e00 0%, #ff8c00 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto relative px-12" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="flex justify-between gap-12">
            {/* Left: Text - 40% */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ y: textY, opacity: textOpacity }}
              className="w-[40%] flex flex-col justify-center"
            >
              <h1 className="font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-white tracking-tight">
                Orgo
              </h1>
              <p className="text-[clamp(1rem,2vw,1.25rem)] text-white leading-relaxed mb-10">
                Creating a B2C mobile app to help with the logistics of daily life.
              </p>
              <a
                href="https://www.orgohq.com/download"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 font-bold text-base shadow-lg self-start"
                style={{
                  backgroundColor: '#212121',
                  color: 'white',
                  transition: 'all 0.3s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#212121';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Download on the App Store
              </a>
            </motion.div>

            {/* Right: Image - 60% */}
            <div className="w-[60%] flex flex-col">
              <div className="h-20"></div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
              >
                <img src="/assets/case-studies/orgo-feature.png" alt="Orgo App" className="w-full block" style={{ aspectRatio: '16/10' }} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content with Sidebar */}
      <div className="mx-auto pt-20 content-with-sidebar" style={{ maxWidth: 'var(--max-width)' }}>
        <style jsx>{`
          .content-with-sidebar {
            padding-left: 3rem;
            padding-right: 3rem;
            display: flex;
            gap: 5rem;
          }
          .sidebar {
            display: block;
          }
          @media (max-width: 991px) {
            .content-with-sidebar {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            }
            .sidebar {
              display: none;
            }
          }
        `}</style>
        <main className="flex-1">
        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          id="summary"
          className="mb-32 scroll-mt-32"
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Summary</h2>

          <div className="grid grid-cols-2 gap-6 mb-12 p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm">
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TEAM</h5>
              <p className="text-[#666] leading-relaxed">
                Me (Founder and principal designer)<br />
                Michal Glowacki (Founder and principal engineer)<br />
                Zoya Lehrer (Founder and CEO)
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TIMELINE</h5>
              <p className="text-[#666] leading-relaxed">April 2023 - Present</p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TASK</h5>
              <p className="text-[#666] leading-relaxed">
                Design and code a mobile app to help families get the right people, to the right places, on time.
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TOOLS & LANGUAGES</h5>
              <p className="text-[#666] leading-relaxed">
                Figma, Illustrator, After Effects, React Native
              </p>
            </div>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Orgo is a mobile app that streamlines personal logistics—ensuring the right people get to the right places on time. While our initial focus is on busy families, the app's utility extends to various scheduling scenarios. As a co-founder, I contributed across multiple areas: brand creation, marketing site design, and app design and development.
          </p>

          <div className="w-full h-[500px] bg-gradient-to-br from-gray-200 to-gray-300" />
        </motion.section>

        {/* Problem */}
        <section id="problem" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The problem</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Picture this: You have a 6:00 PM dinner reservation. The restaurant's 20 minutes away, you want to arrive 5 minutes early, and you need 20 minutes to get ready. Suddenly, you're doing mental gymnastics to figure out you should start preparing at 5:15 PM.
          </p>
          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            We're constantly performing these reverse calculations, but they often evaporate from our minds. For parents, it's even more complex. You're not just calculating for yourself, but for your kids too.
          </p>

          <div className="w-full h-[350px] bg-gradient-to-br from-gray-200 to-gray-300" />
        </section>

        {/* User Interviews */}
        <section id="interviews" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">User Interviews</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            To validate our concept, we began with a focus group I facilitated, followed by individual user interviews. Our goal was to confirm if this problem was real and identify its most painful aspects. We engaged 12 parents in the initial focus group and interviewed over 20 before starting any design work.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { quote: "When I put a 10:30 in my calendar, it's not actually a 10:30 - we have to leave at 9:45.", author: "Adam, dad of 2" },
              { quote: "I'm not a teleporting unicorn, but my calendar thinks I am.", author: "Zoya, mom of 3" },
              { quote: "The only enjoyable part of this is when an activity gets cancelled.", author: "Katie, mom of 2" }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
                <p className="text-[1.1rem] text-[#333] italic mb-6 leading-relaxed">"{item.quote}"</p>
                <p className="text-sm text-[#666] font-bold">— {item.author}</p>
              </div>
            ))}
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
            Our research confirmed the problem and highlighted five recurring pain points:
          </p>
          <ol className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8]">
            {[
              'Coordinating people, places, and times',
              'Managing departure times and necessary preparations',
              'Adapting to unexpected changes',
              'Collaborating within and across families',
              'Maintaining an overall schedule'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <NumberBadge number={i + 1} color={brandColor} />
                <span className="pt-1">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Ideation */}
        <section id="ideation" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Ideation and design</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            With our interview data synthesized, we moved into the ideation phase. We started by drafting requirements and sketching initial screen designs.
          </p>

          <div className="w-full h-[600px] bg-gradient-to-br from-gray-200 to-gray-300 mb-16" />
          <div className="w-full h-[600px] bg-gradient-to-br from-gray-200 to-gray-300" />
        </section>

        {/* Testing */}
        <section id="testing" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Testing and iteration</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Before moving to development, we conducted design testing using Figma's prototyping tool. This allowed us to validate our initial designs and make necessary adjustments.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            A concrete example: adding an activity
          </h3>
          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            A core feature of Orgo is activity addition. Below are four key iterations of our design, each informed by user feedback.
          </p>

          {['Round 1', 'Round 2', 'Round 3', 'Round 4'].map((round, i) => (
            <div key={i} className="mb-16">
              <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <NumberBadge number={i + 1} color={brandColor} />
                  </div>
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666]">{round}</h5>
                </div>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                  Description of changes made in this iteration based on user feedback. Key improvements focused on usability and addressing pain points discovered through testing.
                </p>
                <div className="flex justify-center">
                  <div className="w-[320px] h-[640px] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl" />
                </div>
              </div>
              {i < 3 && (
                <div className="flex justify-center mt-16" style={{ color: brandColor }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path d="M480-80 240-320l56-58 144 144v-526h80v526l144-144 56 58L480-80Z"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Current Product */}
        <section id="current" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The current product</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Currently, Orgo has been live for about 90 days and has attracted approximately 500 registered users, all without a marketing budget. We're actively iterating towards product-market fit based on user feedback.
          </p>

          <div className="w-full h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-12">
            <span className="text-white/20 text-2xl font-bold">Video Placeholder</span>
          </div>

          <a
            href="https://www.orgohq.com/download"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-white font-bold text-base shadow-lg"
            style={{
              backgroundColor: '#ff3e00',
              transition: 'all 0.3s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e63700';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff3e00';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Download on the App Store
          </a>
        </section>

        {/* Reflection */}
        <section id="reflection" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Reflection</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Building Orgo from concept to launch has reinforced several key lessons about product development and user-centered design:
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Start with the problem, not the solution</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Our extensive user research phase prevented us from building features users didn't need. By talking to over 20 families before designing a single screen, we understood the nuances of the scheduling problem and avoided common pitfalls.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Iterate quickly, but deliberately</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Each iteration of our activity addition flow was informed by specific user feedback. Rather than making sweeping changes, we adjusted one or two elements at a time, allowing us to measure the impact of each decision.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Balance founder vision with user needs</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                While user feedback is invaluable, we learned that not every suggestion should be implemented. The key is understanding the underlying need behind the feedback and solving it in a way that aligns with the product vision.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Design and development go hand-in-hand</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Wearing both the designer and developer hat allowed me to make informed tradeoffs between ideal design and technical feasibility. This dual perspective led to more practical solutions that didn't compromise on user experience.
              </p>
            </div>
          </div>

          <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Next steps</h3>
          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            As we continue to refine Orgo, our focus remains on achieving product-market fit through continuous iteration and user feedback. We're committed to regular testing and updates, ensuring that each new feature or adjustment directly addresses user needs.
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
              <img src="/assets/logos/orgo.svg" alt="Orgo" className="w-12 h-12" />
              <span className="font-bold text-xl text-[#333]">Orgo</span>
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
      <div className="mx-auto px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <div className="flex justify-end pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20">
          <Link href="/work/webster" className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-1/2">
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
              Webster Bank
            </span>
          </Link>
        </div>
      </div>

      <div className="mx-auto px-12 mt-20" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}
