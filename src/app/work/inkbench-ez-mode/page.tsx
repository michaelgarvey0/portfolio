'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/CaseStudyHero';
import NumberBadge from '@/components/NumberBadge';

export default function InkbenchEZMode() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const [activeMockupTab, setActiveMockupTab] = useState('franchisor');
  const brandColor = '#3b3668';

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'background', title: 'Background', secondary: true },
    { id: 'final-product', title: 'Final product', secondary: true },
    { id: 'previous-dashboard', title: 'Previous dashboard' },
    { id: 'functionality', title: 'Functionality', secondary: true },
    { id: 'areas-of-opportunity', title: 'Opportunities', secondary: true },
    { id: 'analyzing-wireframes', title: 'Wireframe analysis' },
    { id: 'ui-design', title: 'UI design' },
    { id: 'ui-kit', title: 'UI kit', secondary: true },
    { id: 'styling', title: 'Styling', secondary: true },
    { id: 'key-changes', title: 'Key changes', secondary: true },
    { id: 'final-ui', title: 'Final UI' }
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
        setActiveSection('final-ui');
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

      {/* Hero */}
      <CaseStudyHero
        title="Inkbench"
        description="Rethinking the dashboard for both administrators and users."
        gradientFrom="#6B5ACC"
        gradientTo="#3b3668"
        imageSrc="/assets/case-studies/inkbench/hero.png"
        imageAlt="Inkbench Dashboard"
        ctaText="View prototype"
        ctaHref="https://www.figma.com/proto/JXG6FasDkwTBcNDmkYSOcI/Inkbench-EZ-Mode---Portfolio-Prototype?page-id=0%3A1&node-id=4%3A508&viewport=370%2C2%2C0.09&scaling=scale-down-width&starting-point-node-id=4%3A508"
        ctaColor="#588cfa"
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
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TEAM</h5>
                <p className="text-[#666] leading-relaxed">
                  Me (UI designer)
                </p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TIMELINE</h5>
                <p className="text-[#666] leading-relaxed">September 2021</p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TASK</h5>
                <p className="text-[#666] leading-relaxed">
                  Convert wireframes to high-fidelity designs while incorporating insights from customer feedback and support requests.
                </p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TOOLS & LANGUAGES</h5>
                <p className="text-[#666] leading-relaxed">
                  Figma
                </p>
              </div>
            </div>
          </motion.section>

          {/* Background */}
          <section id="background" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              What's Inkbench?
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              Inkbench was a <strong>brand management SaaS startup</strong> I worked for from May 2020 until May 2022. We helped <strong>franchises maintain brand consistency</strong> by letting them store digital assets, create locked-down templates, and distribute them to franchisees - preventing the "off-brand materials" problem common in multi-location systems.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              I was tasked with <strong>redesigning the dashboard</strong>, which was the first screen users saw after login. The existing version had <strong>usability issues</strong> that limited its effectiveness.
            </p>
          </section>

          {/* Final Product */}
          <section id="final-product" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Final product</h2>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              Analytics and simplified template editing
            </h3>

            <div className="flex gap-4 mb-12">
              <a href="https://www.figma.com/proto/JXG6FasDkwTBcNDmkYSOcI/Inkbench-EZ-Mode---Portfolio-Prototype?page-id=0%3A1&node-id=4%3A508&viewport=370%2C2%2C0.09&scaling=scale-down-width&starting-point-node-id=4%3A508" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#3b3668] text-white font-semibold hover:bg-[#2d2850] transition-colors">
                View the final prototype
              </a>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Though <strong>never developed due to Inkbench's shutdown</strong>, user research showed these features would have <strong>reduced stress around brand distribution</strong> and allowed franchises to <strong>customize materials without one-off requests</strong>.
            </p>

            <div className="mb-20">
              <p className="text-[1.15rem] font-bold text-[#333] mb-6">For franchisors, a true analytics dashboard</p>
              <video
                src="/assets/case-studies/inkbench/franchisor-dashboard.mov"
                className="w-full border border-[rgba(0,0,0,0.08)] shadow-md"
                autoPlay
                playsInline
                muted
                loop
              />
            </div>

            <div className="mb-20">
              <p className="text-[1.15rem] font-bold text-[#333] mb-6">For franchisees, a form-powered, always-on-brand template editor</p>
              <video
                src="/assets/case-studies/inkbench/franchisee-editor.mp4"
                className="w-full border border-[rgba(0,0,0,0.08)] shadow-md"
                autoPlay
                playsInline
                muted
                loop
              />
            </div>

            <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">KEY FEATURES</h5>
              <ul className="space-y-4">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Messaging system.</strong> Franchisors can give their franchisees directions, materials, and customizable templates all in the same place.
                </li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Usage trends.</strong> Detailed graphs that give franchisors a sense of platform engagement with the option to export as a PDF or CSV.
                </li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Pre-approved, locked-down templates.</strong> Users can export immediately from the customization screen, eliminating any back-and-forth between franchisor and franchisee.
                </li>
              </ul>
            </div>
          </section>

          {/* Previous Dashboard */}
          <section id="previous-dashboard" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Previous dashboard</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              I analyzed the previous dashboard to understand how it differed from the wireframes I'd been given, which helped me identify improvement areas and ensure the new design met user needs.
            </p>
          </section>

          {/* Functionality */}
          <section id="functionality" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              How it looked and worked
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              The previous dashboard's goal was to <strong>provide the user with the most relevant items</strong> to them when they logged in. <strong>Administrators could pin certain brand assets or design templates</strong> to the dashboard for everyone to see, and <strong>support articles could be accessed at the bottom of the screen</strong>.
            </p>

            <div className="border border-[rgba(0,0,0,0.08)] shadow-md mb-12">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">THE PREVIOUS DASHBOARD</h5>
                <p className="text-[#666]">A view of the dashboard in July of 2020.</p>
              </div>
              <img src="/assets/case-studies/inkbench/previous-dashboard.png" alt="Previous Inkbench dashboard from July 2020" className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={1} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Action buttons.</strong> Search or open the Brand Library, or create a new project.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={2} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Tabs setup.</strong> The Home tab is the same across the Enterprise (i.e., everyone sees the same stuff). Approvals are projects pending approval, and favorites are assets or projects you've marked as special to you.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={3} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Pinned items.</strong> Administrators can "pin" items to the dashboard for everyone to see, access, and use.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={4} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Support links.</strong> Helpful Center articles to get started on the platform
                </p>
              </div>
            </div>
          </section>

          {/* Areas of Opportunity */}
          <section id="areas-of-opportunity" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              Untapped potential
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              The dashboard <strong>showed everyone the same screen</strong> despite franchisors and franchisees having <strong>different goals</strong>. Franchisees wanted <strong>simple template customization</strong> (not our complex design canvas), while franchisors wanted <strong>analytics on platform usage</strong> - data that <strong>existed in the backend but wasn't accessible to them</strong>.
            </p>

            <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">AREAS OF OPPORTUNITY</h5>
              <ul className="space-y-4">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">It's the same for everyone.</strong> Franchisors and franchisees have very different goals when using the platform, but the first thing they see is identical. The different goals imply that seeing different things to cater to these goals may be helpful.
                </li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">No oversight for franchisors.</strong> Franchisors can't see what franchisees are doing. They want more oversight and insight into their platform usage-- what's being used, who's using it, and how the platform is being picked up.
                </li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Lack of communication ability.</strong> While franchisors can pin items to the dashboard, there's no way to communicate what they want their franchisees to do or send them messages, requiring them to leave the platform to communicate.
                </li>
              </ul>
            </div>
          </section>

          {/* Analyzing the Wireframes */}
          <section id="analyzing-wireframes" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Analyzing the wireframes</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              I <strong>converted wireframes into high-fidelity designs</strong>. The wireframes <strong>split into two dashboards</strong>: one for franchisors with <strong>analytics</strong>, and one for franchisees with <strong>simplified templating</strong>.
            </p>

            <div className="border border-[rgba(0,0,0,0.08)] shadow-md mb-12">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">FRANCHISOR DASHBOARD WIREFRAME</h5>
                <p className="text-[#666]">The Franchisor Dashboard included three major upgrades: a messaging system, usage overview, and notifications.</p>
              </div>
              <img src="/assets/case-studies/inkbench/franchisor-dashboard-wire.png" alt="Franchisor dashboard wireframe with annotations" className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={1} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Communication with franchisees.</strong> Administrators can push content to users, such as messages and "recommendations" they can customize.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={2} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Active users.</strong> Active = has signed in and made one export, download, or print, for today, the last week, and the last month.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={3} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Most active users.</strong> (Excludes administrators) Who's done the most of the actions?
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={4} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Most active projects and templates.</strong> What projects have the greatest number of unique users exporting them?
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={5} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Recently used projects and templates.</strong> What is the most recent activity on the platform?
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="mb-4">
                  <NumberBadge number={6} color="#3b3668" />
                </div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Notifications.</strong> A hub for updates about usage statistics, approval workflow requests, and messages from franchisees.
                </p>
              </div>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              The wireframes were designed with <strong>two main principles</strong> in mind: 1) to <strong>enable franchisors to provide franchisees with materials while monitoring their activity</strong>, and 2) to <strong>make it as simple as possible for franchisees to customize their designs</strong>.
            </p>
          </section>

          {/* UI Design */}
          <section id="ui-design" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">UI Design</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              The UI design process was the majority of my work, and it required me to <strong>define a set of styles and apply them consistently</strong> throughout the product. By <strong>making adjustments to some functionality</strong> represented in the wireframes, I was able to <strong>better align the design with user expectations</strong>.
            </p>
          </section>

          {/* UI Kit */}
          <section id="ui-kit" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              Defining design standards
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Since Inkbench <strong>didn't have an established design system</strong>, I created <strong>a UI kit based on industry best practices</strong> to ensure consistency throughout the product.
            </p>

            <img src="/assets/case-studies/inkbench/ui-kit.png" alt="Inkbench UI kit showing buttons, inputs, and toggles" className="w-full mb-12" />
          </section>

          {/* Styling */}
          <section id="styling" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              High-fidelity mockups
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              High-fidelity mockups for the franchisor dashboard, franchisee dashboard, and "EZ" templating feature.
            </p>

            <div className="mb-12">
              <div className="flex gap-2 mb-6 border-b border-[rgba(0,0,0,0.08)] overflow-auto">
                <button
                  onClick={() => setActiveMockupTab('franchisor')}
                  className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
                    activeMockupTab === 'franchisor'
                      ? 'text-[#3b3668] border-b-2 border-[#3b3668]'
                      : 'text-[#999] hover:text-[#666]'
                  }`}
                >
                  Franchisor Dashboard
                </button>
                <button
                  onClick={() => setActiveMockupTab('franchisee')}
                  className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
                    activeMockupTab === 'franchisee'
                      ? 'text-[#3b3668] border-b-2 border-[#3b3668]'
                      : 'text-[#999] hover:text-[#666]'
                  }`}
                >
                  Franchisee Dashboard
                </button>
                <button
                  onClick={() => setActiveMockupTab('ez')}
                  className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
                    activeMockupTab === 'ez'
                      ? 'text-[#3b3668] border-b-2 border-[#3b3668]'
                      : 'text-[#999] hover:text-[#666]'
                  }`}
                >
                  EZ Templating
                </button>
              </div>

              <div>
                {activeMockupTab === 'franchisor' && (
                  <img src="/assets/case-studies/inkbench/franchisor-dashboard-full.png" alt="Franchisor dashboard high-fidelity mockup" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm" />
                )}
                {activeMockupTab === 'franchisee' && (
                  <img src="/assets/case-studies/inkbench/franchisee-dashboard-full.png" alt="Franchisee dashboard high-fidelity mockup" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm" />
                )}
                {activeMockupTab === 'ez' && (
                  <img src="/assets/case-studies/inkbench/ez-modal-full.png" alt="EZ templating feature mockup" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm" />
                )}
              </div>
            </div>
          </section>

          {/* Key Changes */}
          <section id="key-changes" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              Key changes from the wireframes
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              During design, I identified <strong>opportunities to improve usability and accessibility</strong>, leading to <strong>two main changes from the wireframes</strong>: EZ templating and the usage overview.
            </p>

            {/* Change 1 */}
            <div className="mb-20">
              <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Change 1: EZ templating → form</h4>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">WIREFRAME STATE</h5>
                <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
                  Clickable fields (outlined with a dotted, pink border below) that allow users to customize a template.
                </p>
                <img src="/assets/case-studies/inkbench/ez-templating-wire.png" alt="EZ templating wireframe with clickable fields" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm" />
              </div>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">PROBLEMS</h5>
                <ul className="space-y-4">
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Accessibility.</strong> The low visibility of these pink borders may cause confusion for users, as they may not be able to see the editable elements within the design.
                  </li>
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Visual clutter.</strong> Graphics are already detailed - adding borders could overwhelm users and create support requests about export visibility.
                  </li>
                </ul>
              </div>

              <div className="flex justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 -960 960 960" fill="#3b3668">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                </svg>
              </div>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">HI-FI STATE</h5>
                <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
                  Instead of having clickable fields embedded within the graphic, I implemented a form-like structure for editing.
                </p>
                <img src="/assets/case-studies/inkbench/ez-modal-full.png" alt="EZ templating high-fidelity mockup with form structure" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm" />
              </div>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">HOW IT ADDRESSES THE PROBLEMS</h5>
                <ul className="space-y-4">
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Fewer accessibility concerns.</strong> The fields users can edit can be named by the template creator, helping to better identify them on the graphic and view their potential options in the form.
                  </li>
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">The preview is what you get.</strong> Users can rest assured that whatever they see in the preview is exactly what they'll see on export.
                  </li>
                </ul>
              </div>
            </div>

            {/* Change 2 */}
            <div className="mb-12">
              <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Change 2: Building out the usage overview</h4>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">WIREFRAME STATE</h5>
                <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
                  Links suggested in-depth analytics views, but no detailed screens existed.
                </p>
                <img src="/assets/case-studies/inkbench/franchisor-dashboard-wire.png" alt="Wireframe usage overview section" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm" />
              </div>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">PROBLEMS</h5>
                <ul className="space-y-4">
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Completeness.</strong> I needed to define where these links would go for developer handoff.
                  </li>
                </ul>
              </div>

              <div className="flex justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 -960 960 960" fill="#3b3668">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                </svg>
              </div>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">HI-FI STATE</h5>
                <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
                  Each button opens a modal containing more in-depth views of the data.
                </p>
                <img src="/assets/case-studies/inkbench/franchisor-dashboard-full.png" alt="High-fidelity usage overview with analytics" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm" />
              </div>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">HOW IT ADDRESSES THE PROBLEMS</h5>
                <ul className="space-y-4">
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Completion.</strong> The screens exist! Woo!
                  </li>
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Facilitates data analysis.</strong> Giving the user the option to download as a PDF or CSV allows them to perform data analysis that is not native to Inkbench.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Final UI */}
          <section id="final-ui" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Final UI</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              Below, you'll find a screenshot of the final UI design. To <strong>fully experience the product</strong>, I recommend <strong>exploring the prototype</strong>. The "user preview" button allows you to <strong>toggle between the franchisor and franchisee dashboard views</strong>.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              It is worth noting that if Inkbench were still with us, I would have loved to <strong>conduct usability tests with our clients</strong> to validate some of the changes I made. This would have provided valuable insights and feedback and helped ensure that the final product met the needs of our users.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Overall, my goal was to create a <strong>user-friendly, efficient, and accessible product</strong> that would meet the needs of both franchisors and franchisees. I believe that the changes I made and the final UI design <strong>achieved this goal and would have been well-received by our clients</strong>.
            </p>

            <div className="flex gap-4 mb-12">
              <a href="https://www.figma.com/proto/JXG6FasDkwTBcNDmkYSOcI/Inkbench-EZ-Mode---Portfolio-Prototype?page-id=0%3A1&node-id=4%3A508&viewport=370%2C2%2C0.09&scaling=scale-down-width&starting-point-node-id=4%3A508" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#3b3668] text-white font-semibold hover:bg-[#2d2850] transition-colors">
                View the final prototype
              </a>
            </div>

            <img src="/assets/case-studies/inkbench/franchisor-dashboard-full.png" alt="Final UI dashboard design" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm mb-12" />

            <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">TAKEAWAYS: FINAL UI</h5>
              <ul className="space-y-4">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Participating in the research is something I want.</strong> I regret not being able to participate in the initial research process, as it made the project more challenging for me. However, it was a great learning experience and an opportunity for me to test and strengthen my skills.
                </li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Design systems are important.</strong> The absence of a pre-existing design system presented an additional challenge for the project and required me to create one from scratch. This introduced me to new concepts, such as atomic design, and allowed me to expand my design knowledge.
                </li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Communication with developers is essential.</strong> Designing within technical constraints is crucial, and I collaborated with developers to ensure the feasibility of my design.
                </li>
              </ul>
            </div>
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
              <img src="/assets/case-studies/inkbench/logo.svg" alt="Inkbench" className="w-12 h-12" />
              <span className="font-bold text-xl text-[#333]">Inkbench</span>
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
                      transitionProperty: 'opacity',
                      paddingLeft: section.secondary ? '1.5rem' : '1.5rem'
                    }}
                    className="block w-full text-left pr-4 py-2 text-sm transition-opacity duration-300 hover:opacity-80"
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
        <div className="flex flex-col md:flex-row justify-between pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20 gap-8">
          <Link href="/work/webster" className="flex flex-col items-start gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2">
            <div className="flex items-center gap-2 font-bold text-[#0066cc]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
              </svg>
              <span>Previous</span>
            </div>
            <span className="text-[1.5rem] text-[#666] transition-colors font-bold">
              Webster Bank
            </span>
          </Link>

          <Link href="/work/orgo-brand" className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2">
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
              Orgo: The Brand
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
