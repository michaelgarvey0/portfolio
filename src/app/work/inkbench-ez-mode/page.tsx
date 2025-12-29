'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function InkbenchEZMode() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const brandColor = '#3b3668';

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'background', title: 'Background', secondary: true },
    { id: 'final-product', title: 'Final product', secondary: true },
    { id: 'previous-dashboard', title: 'Previous dashboard' },
    { id: 'functionality', title: 'Functionality', secondary: true },
    { id: 'areas-of-opportunity', title: 'Areas of opportunity', secondary: true },
    { id: 'analyzing-wireframes', title: 'Analyzing the wireframes' },
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
      <div id="hero-section" className="pt-32 pb-16" style={{ backgroundColor: '#fafafa' }}>
        <div className="mx-auto px-12" style={{ maxWidth: 'var(--max-width)' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="font-sans text-[clamp(3rem,6vw,5rem)] font-bold mb-6 text-[#333] tracking-tight">
              Inkbench EZ Mode
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#666] leading-relaxed mb-10 max-w-[800px]">
              Rethinking the Inkbench dashboard for both administrators and users.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content with Sidebar */}
      <div className="mx-auto px-12 pt-20 flex gap-20" style={{ maxWidth: 'var(--max-width)' }}>
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

            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Inkbench dashboard mockup]
            </div>
          </motion.section>

          {/* Background */}
          <section id="background" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              What's Inkbench?
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              Inkbench is a now-defunct brand management SaaS startup I worked for from May 2020 until May 2022. The startup aimed to address a common pain point for marketing teams in multi-location franchise or enterprise systems, where those distributing the marketing materials - primarily, franchisees - often "go rogue" and distribute off-brand materials because they're easy to make (think two-sentence memos printed on an 8.5 x 11 using Microsoft Word).
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              In Inkbench, a franchise could store their digital assets (logos, images, etc.) and tag them so they're easy to find. Then, they could use these assets in an in-platform design canvas, where they could make templates where certain elements are locked down and others open for customization. Then, administrators could push these templates to standard users.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              The Inkbench dashboard was the first screen post-login. However, there were issues with the dashboard that made it not as useful as it could be. I was tasked with the UI design portion of a dashboard redesign.
            </p>
          </section>

          {/* Final Product */}
          <section id="final-product" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              Analytics and simplified template editing
            </h3>

            <div className="flex gap-4 mb-12">
              <a href="https://www.figma.com/proto/xqTOYLNNVrtn7EHGsMA5Jl/Inkbench-Prototype" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#3b3668] text-white font-semibold hover:bg-[#2d2850] transition-colors">
                View the final prototype
              </a>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              Though the designs were never developed due to Inkbench's shutdown, it was clear that users desired a dashboard with these capabilities. For many, it would have greatly reduced stress related to the distribution of branded materials by providing pre-approved options and significantly speeding up their workflow. Additionally, it would have allowed each franchise location to customize materials to their specific needs, reducing the need for one-off creations.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              You can explore the prototype above to gain a better understanding of each aspect of the design.
            </p>

            <div className="mb-12">
              <p className="text-[1.15rem] font-bold text-[#333] mb-6">For franchisors, a true analytics dashboard</p>
              <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
                [Placeholder: Franchisor dashboard]
              </div>
            </div>

            <div className="mb-12">
              <p className="text-[1.15rem] font-bold text-[#333] mb-6">For franchisees, a form-powered, always-on-brand template editor</p>
              <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
                [Placeholder: Franchisee dashboard]
              </div>
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
              I analyzed the previous dashboard to better understand the differences between that state and the wireframes that I had been given. It helped me identify areas for improvement and informed my decisions on future designs. I also used it to understand user needs and ensure the new design met their expectations.
            </p>
          </section>

          {/* Functionality */}
          <section id="functionality" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              How it looked and worked
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              The previous dashboard's goal was to provide the user with the most relevant items to them when they logged in. Administrators could pin certain brand assets or design templates to the dashboard for everyone to see, and support articles could be accessed at the bottom of the screen.
            </p>

            <div className="border border-[rgba(0,0,0,0.08)] shadow-md mb-12">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">THE PREVIOUS DASHBOARD</h5>
                <p className="text-[#666]">A view of the dashboard in July of 2020.</p>
              </div>
              <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
                [Placeholder: Previous dashboard screenshot]
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">1</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Action buttons.</strong> Search or open the Brand Library, or create a new project.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">2</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Tabs setup.</strong> The Home tab is the same across the Enterprise (i.e., everyone sees the same stuff). Approvals are projects pending approval, and favorites are assets or projects you've marked as special to you.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">3</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Pinned items.</strong> Administrators can "pin" items to the dashboard for everyone to see, access, and use.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">4</div>
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

            <div className="border border-[rgba(0,0,0,0.08)] shadow-md mb-12">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">THE DESIGN CANVAS</h5>
                <p className="text-[#666]">A screenshot of the design canvas, which many users thought was complex.</p>
              </div>
              <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
                [Placeholder: Design canvas screenshot]
              </div>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              The initial dashboard design had good intentions but failed to meet user expectations. One major issue was that administrators and users were presented with the same screens despite having different goals.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              For example, franchisees were looking for an easy way to customize a template and export it for distribution. However, many expressed frustration with the complex design canvas (pictured above). They often only needed to make small changes such as an address, color, or photo.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              On the other hand, franchisors wanted to monitor franchisee activity and access analytics such as who had done what, when, and which templates were getting the most use. The current format did not provide these analytics even though they were available in the backend and sent out in weekly status reports to customer success employees. This led us to consider democratizing the data for administrator use in the redesign.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Overall, the dashboard redesign would be the largest single project in terms of added functionality and user impact that I had participated in yet.
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

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              I was tasked with converting wireframes to high-fidelity designs. Heather O'Neill, CEO of Pixels for Humans, created these wireframes after conducting in-depth interviews with our clients. To ensure a successful outcome, I needed to understand the design decisions made in the wireframes.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              The wireframes consisted of two parts: the franchisor dashboard and the franchisee dashboard. The franchisee dashboard included a simpler templating functionality that avoided the need for using the more complex design canvas. The franchisor dashboard included a usage analytics section. In general, franchises were our target audience, but as a general use case, one dashboard is intended for administrators and the other for standard users.
            </p>

            <div className="border border-[rgba(0,0,0,0.08)] shadow-md mb-12">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">FRANCHISOR DASHBOARD WIREFRAME</h5>
                <p className="text-[#666]">The Franchisor Dashboard included three major upgrades: a messaging system, usage overview, and notifications.</p>
              </div>
              <div className="bg-gray-200 h-[600px] flex items-center justify-center text-gray-500">
                [Placeholder: Franchisor wireframe with annotations]
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">1</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Communication with franchisees.</strong> Administrators can push content to users, such as messages and "recommendations" they can customize.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">2</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Active users.</strong> Active = has signed in and made one export, download, or print, for today, the last week, and the last month.
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">3</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Most active users.</strong> (Excludes administrators) Who's done the most of the actions?
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">4</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Most active projects and templates.</strong> What projects have the greatest number of unique users exporting them?
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">5</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Recently used projects and templates.</strong> What is the most recent activity on the platform?
                </p>
              </div>
              <div className="p-6 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
                <div className="text-[2rem] font-bold text-[#3b3668] mb-3">6</div>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  <strong className="font-bold text-[#212121]">Notifications.</strong> A hub for updates about usage statistics, approval workflow requests, and messages from franchisees.
                </p>
              </div>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              The wireframes were designed with two main principles in mind: 1) to enable franchisors to provide franchisees with all the necessary materials while monitoring their activity, and 2) to make it as simple as possible for franchisees to customize their designs. With this understanding, and armed with valuable insights gathered through customer success conversations, I proceeded with the UI design.
            </p>
          </section>

          {/* UI Design */}
          <section id="ui-design" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">UI Design</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              The UI design process was the majority of my work, and it required me to define a set of styles and apply them consistently throughout the product. By making adjustments to some functionality represented in the wireframes, I was able to better align the design with user expectations and incorporate any missing features.
            </p>
          </section>

          {/* UI Kit */}
          <section id="ui-kit" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              Defining design standards
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              As Inkbench did not have an established design system in place, I took the initiative to create my own UI kit based on industry best practices and design principles. This helped ensure consistency and usability throughout the product, which is crucial for a positive user experience. Additionally, by following a set of design guidelines, I was able to create a more polished and user-friendly interface.
            </p>

            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500 mb-12">
              [Placeholder: UI kit with buttons, inputs, toggles]
            </div>
          </section>

          {/* Styling */}
          <section id="styling" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              High-fidelity mockups
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Below are mockups of the three areas depicted in the wireframes: the franchisor dashboard, the franchisee dashboard, and the (affectionately titled) "EZ" templating feature. These mockups were created to provide a clear visual representation of the final product.
            </p>

            <div className="grid grid-cols-1 gap-8 mb-12">
              <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
                [Placeholder: Franchisor dashboard mockup]
              </div>
              <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
                [Placeholder: Franchisee dashboard mockup]
              </div>
              <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
                [Placeholder: EZ templating mockup]
              </div>
            </div>
          </section>

          {/* Key Changes */}
          <section id="key-changes" className="mb-32 scroll-mt-32">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              Key changes from the wireframes
            </h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              As I progressed through the UI design, I identified several opportunities to better meet user expectations and improve accessibility. As a result, certain areas of the high-fidelity UI differ from the wireframes. The two main changes I made involve EZ templating and the usage overview, and you can fully experience them in the prototype.
            </p>

            {/* Change 1 */}
            <div className="mb-20">
              <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Change 1: EZ templating → form</h4>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">WIREFRAME STATE</h5>
                <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
                  Clickable fields (outlined with a dotted, pink border below) that allow users to customize a template.
                </p>
                <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
                  [Placeholder: Wireframe with clickable fields]
                </div>
              </div>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">PROBLEMS</h5>
                <ul className="space-y-4">
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Accessibility.</strong> The low visibility of these pink borders may cause confusion for users, as they may not be able to see the editable elements within the design.
                  </li>
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Potential overwhelm.</strong> The graphics that franchisees are often already detailed, and including borders on top of that could result in overwhelm and users contacting us to ask if the borders would be visible on export, creating additional workload for customer support.
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
                <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
                  [Placeholder: Hi-fi mockup with form]
                </div>
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
                  Each segment of the usage overview included a link to more in-depth analytics (inferred). No detailed screens showed these views.
                </p>
                <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
                  [Placeholder: Wireframe usage overview]
                </div>
              </div>

              <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-8">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">PROBLEMS</h5>
                <ul className="space-y-4">
                  <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                    <strong className="font-bold text-[#212121]">Completeness.</strong> To provide our developers with these mockups, it was necessary to define the destinations of these links.
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
                <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
                  [Placeholder: Hi-fi usage overview modal]
                </div>
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
              Below, you'll find a screenshot of the final UI design. To fully experience the product, I recommend exploring the prototype. The "user preview" button allows you to toggle between the franchisor and franchisee dashboard views.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              It is worth noting that if Inkbench were still with us, I would have loved to conduct usability tests with our clients to validate some of the changes I made. This would have provided valuable insights and feedback and helped ensure that the final product met the needs of our users.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Overall, my goal was to create a user-friendly, efficient, and accessible product that would meet the needs of both franchisors and franchisees. I believe that the changes I made and the final UI design achieved this goal and would have been well-received by our clients.
            </p>

            <div className="flex gap-4 mb-12">
              <a href="https://www.figma.com/proto/xqTOYLNNVrtn7EHGsMA5Jl/Inkbench-Prototype" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#3b3668] text-white font-semibold hover:bg-[#2d2850] transition-colors">
                View the final prototype
              </a>
            </div>

            <div className="bg-gray-200 h-[600px] flex items-center justify-center text-gray-500 mb-12">
              [Placeholder: Final UI dashboard screenshot]
            </div>

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
        <aside className="w-[190px] flex-shrink-0 sticky top-32 h-fit">
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
              <img src="/assets/logos/inkbench.svg" alt="Inkbench" className="w-12 h-12" />
              <span className="font-bold text-xl text-[#333]">Inkbench EZ Mode</span>
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
      <div className="mx-auto px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <div className="flex justify-between pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20 gap-8">
          <Link href="/work/webster" className="flex flex-col items-start gap-3 p-6 border border-[#3b3668] transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(59,54,104,0.05)] w-1/2">
            <div className="flex items-center gap-2 font-bold text-[#3b3668]">
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

          <Link href="/work/orgo-brand" className="flex flex-col items-end gap-3 p-6 border border-[#3b3668] transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(59,54,104,0.05)] w-1/2">
            <div className="flex items-center gap-2 font-bold text-[#3b3668]">
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

      <div className="mx-auto px-12 mt-20" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}
