'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NewportInBloom() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const brandColor = '#0066cc';

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'background', title: 'Background', secondary: true },
    { id: 'final-product', title: 'Final product', secondary: true },
    { id: 'research', title: 'Research' },
    { id: 'stakeholder-interviews', title: 'Stakeholder interviews', secondary: true },
    { id: 'user-interviews', title: 'User interviews', secondary: true },
    { id: 'peer-analysis', title: 'Peer analysis', secondary: true },
    { id: 'define', title: 'Define' },
    { id: 'content-structure', title: 'Content and structure', secondary: true },
    { id: 'design', title: 'Design' },
    { id: 'wireframes', title: 'Wireframes', secondary: true },
    { id: 'styling', title: 'Styling', secondary: true },
    { id: 'test', title: 'Test' },
    { id: 'usability-testing', title: 'Usability testing', secondary: true },
    { id: 'priority-fixes', title: 'Priority fixes', secondary: true },
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
              Newport in Bloom
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#666] leading-relaxed mb-10 max-w-[800px]">
              Designing and developing a responsive website for two nonprofits.
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
                Me (researcher, designer, developer)
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TIMELINE</h5>
              <p className="text-[#666] leading-relaxed">April - May 2022</p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TASK</h5>
              <p className="text-[#666] leading-relaxed">
                Design and develop a site that combines Newport in Bloom with the Daffodil Days Festival.
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TOOLS & LANGUAGES</h5>
              <p className="text-[#666] leading-relaxed">
                Figma, Adobe Illustrator, WordPress, Elementor Pro, CSS & HTML
              </p>
            </div>
          </div>

          <img
            src="https://cdn.prod.website-files.com/63154f9ce7c1627c547a9773/63c8aa2e868edc2e9805c752_nib-header-v2.png"
            alt="Newport in Bloom website mockup"
            className="w-full"
          />
        </motion.section>

        {/* Background */}
        <section id="background" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            "Two" many sites
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Newport in Bloom and Daffodil Days are nonprofits committed to beautifying Newport, Rhode Island, with flowers. Newport in Bloom hosts city events, and Daffodil Days is a festival to celebrate the daffodils they plant in fall, which bloom every April. These two groups have significant membership overlap and wanted to combine their websites. Specifically, the Newport in Bloom site wanted to absorb Daffodil Days.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="border border-[rgba(0,0,0,0.08)] shadow-md">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">newport in bloom: Before</h5>
                <p className="text-[#666]">A screenshot of the Newport in Bloom home page in December 2020.</p>
              </div>
              <img
                src="https://cdn.prod.website-files.com/63154f9ce7c1627c547a9773/63ad90ab3ba6d1007af1e0d0_newport-in-bloom-before.png"
                alt="Newport in Bloom before"
                className="w-full"
              />
            </div>
            <div className="border border-[rgba(0,0,0,0.08)] shadow-md">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">daffodil days: Before</h5>
                <p className="text-[#666]">A screenshot of the Daffodil Days home page in December 2020.</p>
              </div>
              <img
                src="https://cdn.prod.website-files.com/63154f9ce7c1627c547a9773/63ad90b532bfdb0db626b64d_daffodil-days-before.png"
                alt="Daffodil Days before"
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Final Product */}
        <section id="final-product" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            A new brand, consolidation, intuitive structure, and responsivity
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The design system is now fully integrated with modern web capabilities, resulting in a more scalable and accessible system.
          </p>

          <div className="flex gap-4 mb-12">
            <a href="https://newportinbloom.org" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#0066cc] text-white font-semibold hover:bg-[#004499] transition-colors">
              View the live site
            </a>
            <a href="https://www.figma.com/proto/xqTOYLNNVrtn7EHGsMA5Jl/Newport-in-Bloom---Portfolio-Prototype" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#0066cc] text-[#0066cc] font-semibold hover:bg-[rgba(0,102,204,0.05)] transition-colors">
              Figma prototype
            </a>
          </div>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">RESULTS</h5>
            <ul className="space-y-4">
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                <strong className="font-bold text-[#212121]">Website costs cut in half.</strong> The hosting costs for the Newport Daffodil Days site were eliminated, and having all the information in one place simplifies their web hosting process.
              </li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                <strong className="font-bold text-[#212121]">A reorganized site map.</strong> This simplified website updates and improved user navigation. The redesign was tailored to the needs of the new Newport in Bloom webmaster and the users who would visit the site.
              </li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                <strong className="font-bold text-[#212121]">An opportunity to show off their new brand.</strong> They feel proud and happy to put their new logo on their stationery, flyers, and posters!
              </li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                <strong className="font-bold text-[#212121]">Full responsivity.</strong> Whatever device you're viewing the site on, its layout makes sense and adjusts to fit the screen.
              </li>
            </ul>
          </div>
        </section>

        {/* Research */}
        <section id="research" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Research</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Before beginning the design process, I formulated a set of research questions to guide my investigation. These questions pertained to the current websites, the users, and the goals of the committees. The guiding questions were:
          </p>

          <ul className="space-y-3 mb-12 ml-6">
            <li className="text-[1.15rem] text-[#666] leading-[1.8]">What are the current purposes of the sites?</li>
            <li className="text-[1.15rem] text-[#666] leading-[1.8]">Why do stakeholders want the sites merged and redesigned?</li>
            <li className="text-[1.15rem] text-[#666] leading-[1.8]">What do people think of the current sites?</li>
            <li className="text-[1.15rem] text-[#666] leading-[1.8]">Has anyone ever visited these sites? If so, why?</li>
            <li className="text-[1.15rem] text-[#666] leading-[1.8]">How do other nonprofits structure their sites?</li>
          </ul>
        </section>

        {/* Stakeholder Interviews */}
        <section id="stakeholder-interviews" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Stakeholder interviews: Getting to know the organizations
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            First, I needed to understand who and what I was working with-- what do committee members want, why do they want it, and what are the sites like now? I talked to three committee members and the Newport in Bloom webmaster to figure this out.
          </p>
        </section>

        {/* User Interviews */}
        <section id="user-interviews" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            User interviews: Gathering user perspectives
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            With a clear understanding of the committees' goals, I conducted user research by interviewing 6 individuals, evenly divided between those who had participated in Newport in Bloom events (gardeners) and those who had not (non-gardeners). The aim was to gain insights into their goals and needs.
          </p>
        </section>

        {/* Peer Analysis */}
        <section id="peer-analysis" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Peer analysis: Analyzing navigation and site structure
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I analyzed 20 nonprofit websites to understand the common components and site structures. I found two common approaches to designing nonprofit homepages.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="border border-[rgba(0,0,0,0.08)] shadow-md">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">Strategy 1</h5>
                <p className="text-[#666]">Blatant call to action, not much information</p>
              </div>
              <div className="p-8">
                <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
                  This strategy presents a blatant call to action (donate, volunteer, etc.) without giving you much information about the organization. It's a more visual experience-- the site "grabs you" with imagery and a lack of words.
                </p>
                <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                  [Placeholder: Strategy 1 example screenshot]
                </div>
              </div>
            </div>

            <div className="border border-[rgba(0,0,0,0.08)] shadow-md">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">Strategy 2</h5>
                <p className="text-[#666]">More info about the organization</p>
              </div>
              <div className="p-8">
                <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
                  This strategy provides more information about the organization. More words, more sections, more info that might be found in the "about" page. Calls to action are usually in the navigation bar and less obvious on the page itself.
                </p>
                <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                  [Placeholder: Strategy 2 example screenshot]
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">TAKEAWAYS</h5>
            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
              While both types of sites displayed the information users were likely to want to find, they differed in the amount of clutter. I knew from stakeholders that Newport in Bloom wanted their site to be image-heavy, but I also knew from the research that they wanted to share their story and mission with everyone who landed on the site.
            </p>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              It was important to <strong className="font-bold text-[#212121]">find a balance where the home page could tell their story but also avoid text-heavy chunks.</strong>
            </p>
          </div>
        </section>

        <section id="define" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Define</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            The goals were ambitious: I had to combine two nonprofit websites, make a better user experience, implement Newport in Bloom's new brand, and make the site responsive to tablet and phone screens. Once the research was concluded, I synthesized the results to define two design goals. These goals specifically targeted the aspects I wanted to prioritize in order to create a more user-friendly site.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
              <div className="text-[2.5rem] font-bold text-[#0066cc] mb-4">1</div>
              <h4 className="text-[1.5rem] font-bold text-[#333] mb-4">
                Minimize site clutter and streamline content across all pages.
              </h4>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                The main issue with the current sites (particularly the Newport in Bloom site) is that there is too much to sift through to find the information a user wants. Ultimately, all types of users want simple information. The way the old site presents itself does not help users do this. I will design this site to guide every category of users toward the information that would be most relevant to them-- quickly and clearly.
              </p>
            </div>

            <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
              <div className="text-[2.5rem] font-bold text-[#0066cc] mb-4">2</div>
              <h4 className="text-[1.5rem] font-bold text-[#333] mb-4">
                Design the site to be accessible on multiple devices.
              </h4>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                I heard from a couple people that they wished these sites looked good on their phones. The site should be fully accessible on phones, tablets, laptops, and desktops. I chose to follow a mobile-first design process in order to ensure responsivity.
              </p>
            </div>
          </div>
        </section>

        <section id="content-structure" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Content and structure: Merging and reorganizing
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I evaluated the existing content to find what should stay and what should go. This was very collaborative with the stakeholders: I made some recommendations, they made some recommendations, and we worked toward a final site map.
          </p>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">BEFORE: TWO SITES</h5>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="font-bold text-[#333] mb-3">Newport in Bloom</p>
                <ul className="space-y-2 text-[1.15rem] text-[#666]">
                  <li>• Home</li>
                  <li>• About Us</li>
                  <li>• Beautification Projects</li>
                  <li>• Adopt-A-Spot</li>
                  <li>• How You Can Help</li>
                  <li>• Events</li>
                  <li>• Calendar</li>
                  <li>• Gallery</li>
                  <li>• Contact Us</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-[#333] mb-3">Daffodil Days</p>
                <ul className="space-y-2 text-[1.15rem] text-[#666]">
                  <li>• Home</li>
                  <li>• Festival Events</li>
                  <li>• Photo Contest</li>
                  <li>• About Us</li>
                  <li>• Support Our Mission</li>
                  <li>• Contact</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">AFTER: ONE CONSOLIDATED SITE</h5>
            <ul className="space-y-2 text-[1.15rem] text-[#666]">
              <li>• Home</li>
              <li>• About</li>
              <li>• Beautification Projects</li>
              <li>• Daffodil Days Festival</li>
              <li>• Gallery</li>
              <li>• Get Involved</li>
              <li>• Contact</li>
            </ul>
          </div>

          <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500 mb-12">
            [Placeholder: Site map diagram]
          </div>
        </section>

        <section id="design" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Design</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            With a clear understanding of the goals, I began the design process. I started with wireframes to establish the structure and flow, then moved into high-fidelity mockups that incorporated Newport in Bloom's new branding.
          </p>
        </section>

        <section id="wireframes" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Wireframes: Establishing information hierarchy
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I started by sketching out initial ideas for the home page layout. These rough sketches helped me quickly iterate on different approaches to organizing the content.
          </p>

          <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500 mb-12">
            [Placeholder: Paper wireframe sketches]
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            After sketching, I created digital wireframes in Figma. I focused on mobile-first design to ensure the site would work well on all devices.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Mobile wireframe 1]
            </div>
            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Mobile wireframe 2]
            </div>
            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Mobile wireframe 3]
            </div>
          </div>

          <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500 mb-12">
            [Placeholder: Desktop wireframe]
          </div>
        </section>

        <section id="styling" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Styling: Implementing the new brand
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Newport in Bloom had recently worked with a graphic designer to create a new logo and brand identity. My task was to take this new branding and apply it to the website design.
          </p>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">BRAND ELEMENTS</h5>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-bold text-[#333] mb-3">Colors</p>
                <div className="flex gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#0066cc] flex items-center justify-center text-white text-xs">#0066cc</div>
                  <div className="w-20 h-20 bg-[#FFD700] flex items-center justify-center text-xs">#FFD700</div>
                  <div className="w-20 h-20 bg-[#228B22] flex items-center justify-center text-white text-xs">#228B22</div>
                </div>
              </div>
              <div>
                <p className="font-bold text-[#333] mb-3">Typography</p>
                <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                  Primary: Montserrat<br />
                  Secondary: Open Sans
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500 mb-12">
            [Placeholder: High-fidelity mockup - Home page]
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
              [Placeholder: Mobile mockup]
            </div>
            <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
              [Placeholder: Tablet mockup]
            </div>
          </div>
        </section>

        <section id="test" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Test</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Before finalizing the design, I conducted usability testing to identify any issues and ensure the site met user needs. I tested with both gardeners and non-gardeners to get a comprehensive understanding of the user experience.
          </p>
        </section>

        <section id="usability-testing" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Usability testing: Finding pain points
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I conducted moderated usability tests with 5 participants (3 gardeners, 2 non-gardeners). Each participant was given a series of tasks to complete while thinking aloud. I observed their behavior and noted any points of confusion or frustration.
          </p>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">TEST TASKS</h5>
            <ul className="space-y-3">
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">1. Find information about the Daffodil Days Festival</li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">2. Learn how to get involved with Newport in Bloom</li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">3. View photos from past events</li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">4. Find contact information</li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">5. Navigate to the about page</li>
            </ul>
          </div>

          <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500 mb-12">
            [Placeholder: Usability testing session photo]
          </div>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">KEY FINDINGS</h5>
            <ul className="space-y-4">
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                <strong className="font-bold text-[#212121]">Navigation confusion:</strong> 2 participants struggled to find the Daffodil Days information, expecting it to be more prominent.
              </li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                <strong className="font-bold text-[#212121]">Gallery location:</strong> Participants expected the gallery to be in the main navigation rather than a subpage.
              </li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                <strong className="font-bold text-[#212121]">Mobile menu:</strong> The hamburger menu icon was too small on mobile devices.
              </li>
              <li className="text-[1.15rem] text-[#666] leading-[1.8]">
                <strong className="font-bold text-[#212121]">Call to action visibility:</strong> Users wanted more prominent buttons for "Get Involved" and "Donate".
              </li>
            </ul>
          </div>
        </section>

        <section id="priority-fixes" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Priority fixes: Addressing usability issues
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Based on the usability testing results, I prioritized the issues and made the following changes:
          </p>

          <div className="grid grid-cols-1 gap-6 mb-12">
            <div className="p-8 border border-[rgba(0,0,0,0.08)] shadow-sm">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#0066cc] text-white flex items-center justify-center font-bold text-xl">1</div>
                <div className="flex-1">
                  <h5 className="font-bold text-[#333] mb-3 text-lg">Improved navigation hierarchy</h5>
                  <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-4">
                    Made "Daffodil Days Festival" a top-level navigation item instead of hiding it under "Events".
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 text-sm">
                      [Before: Hidden menu item]
                    </div>
                    <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 text-sm">
                      [After: Top-level menu item]
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border border-[rgba(0,0,0,0.08)] shadow-sm">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#0066cc] text-white flex items-center justify-center font-bold text-xl">2</div>
                <div className="flex-1">
                  <h5 className="font-bold text-[#333] mb-3 text-lg">Larger mobile menu icon</h5>
                  <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-4">
                    Increased the hamburger menu icon size from 24px to 40px for better tap targets on mobile.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 text-sm">
                      [Before: 24px icon]
                    </div>
                    <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 text-sm">
                      [After: 40px icon]
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border border-[rgba(0,0,0,0.08)] shadow-sm">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#0066cc] text-white flex items-center justify-center font-bold text-xl">3</div>
                <div className="flex-1">
                  <h5 className="font-bold text-[#333] mb-3 text-lg">More prominent CTAs</h5>
                  <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-4">
                    Added larger, more colorful buttons for key actions like "Get Involved" and "Donate" on the homepage.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 text-sm">
                      [Before: Subtle links]
                    </div>
                    <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 text-sm">
                      [After: Prominent buttons]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="final-ui" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Final UI</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            After incorporating feedback from usability testing, I finalized the design and developed the site using WordPress and Elementor Pro. The final product is a fully responsive, accessible website that successfully combines Newport in Bloom and Daffodil Days.
          </p>

          <div className="bg-gray-200 h-[600px] flex items-center justify-center text-gray-500 mb-12">
            [Placeholder: Final home page desktop]
          </div>

          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Mobile home]
            </div>
            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Mobile about]
            </div>
            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Mobile festival]
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Desktop about page]
            </div>
            <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
              [Placeholder: Desktop festival page]
            </div>
          </div>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">REFLECTION</h5>
            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
              This project taught me the importance of balancing stakeholder desires with user needs. While the Newport in Bloom committee had strong opinions about what they wanted, user research revealed some different priorities. By combining insights from both groups, I was able to create a solution that satisfied everyone.
            </p>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              The mobile-first approach was crucial to the project's success. By starting with the most constrained layout, I ensured that the content hierarchy was clear and that the site would work well on any device. This also made the development process much smoother, as I could progressively enhance the experience for larger screens rather than trying to retrofit responsive behavior later.
            </p>
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
              <div className="w-12 h-12 bg-[#0066cc] flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <span className="font-bold text-xl text-[#333]">Newport in Bloom</span>
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
          <Link href="/work/orgo-brand" className="flex flex-col items-start gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-1/2">
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
              Orgo: The Brand
            </span>
          </Link>

          <Link href="/work/beeline" className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-1/2">
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
              Beeline
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
