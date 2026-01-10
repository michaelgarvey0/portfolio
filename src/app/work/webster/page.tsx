'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/CaseStudyHero';

export default function Webster() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const brandColor = '#002d82';

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'background', title: 'Background' },
    { id: 'final-product', title: 'Final product' },
    { id: 'previous-state', title: 'Previous state' },
    { id: 'scope', title: 'Scope definition' },
    { id: 'styles', title: 'Styles' },
    { id: 'components', title: 'Components' },
    { id: 'fixes', title: 'Fixes' },
    { id: 'tokens', title: 'Tokens' },
    { id: 'next-steps', title: 'Next steps' }
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
        setActiveSection('next-steps');
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

      <CaseStudyHero
        title="Webster Bank"
        description="Revamping our design system for scalability and accessibility during its migration from Sketch to Figma."
        gradientFrom="#002d82"
        gradientTo="#0047cc"
        imageSrc="/assets/case-studies/webster/hero.png"
        imageAlt="Webster Design System"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm">
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TEAM</h5>
              <p className="text-[#666] leading-relaxed">
                Me (designer, "implementer")<br />
                Ryan Carey (UI designer, advisor)
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TIMELINE</h5>
              <p className="text-[#666] leading-relaxed">August - September 2022</p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TASK</h5>
              <p className="text-[#666] leading-relaxed">
                Migrate Webster Bank's design system from Sketch to Figma.
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TOOLS & LANGUAGES</h5>
              <p className="text-[#666] leading-relaxed">
                Figma, Sketch, Miro, Excel
              </p>
            </div>
          </div>
        </motion.section>

        {/* Background */}
        <section id="background" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Background</h2>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            A design system stuck in transition
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            When I joined <a href="https://websterbank.com" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">Webster Bank</a> in June 2022, I discovered their design system was <strong>in the middle of a migration from Sketch to Figma</strong>. The problem? <strong>The migration had stalled.</strong> The only progress made was a <strong>direct import of the Sketch file into Figma</strong>, which meant we <strong>weren't taking advantage of any of Figma's powerful features</strong>.
          </p>
          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            I saw an opportunity to <strong>not just complete the migration, but to truly revamp the system</strong>. I offered to <strong>lead the initiative</strong>, using my Figma knowledge to build something the team could be proud of - a system that was <strong>scalable, accessible, and built with modern best practices</strong>.
          </p>
        </section>

        {/* Final Product */}
        <section id="final-product" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Final product</h2>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            A system built for scale
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The revamped design system now <strong>takes full advantage of Figma's capabilities</strong>. With features like <strong>auto layout, variants, and boolean properties</strong>, the system is <strong>far more flexible and maintainable</strong> than before. We established <strong>consistent naming conventions</strong> for colors and typography, making it <strong>easy to identify and add new elements</strong>.
          </p>

          <img src="/assets/case-studies/webster/final-state.png" alt="Final state of the Webster design system" className="w-full mb-8" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            I <strong>standardized components like buttons</strong> to align with industry best practices, using <strong>constraints, absolute positioning, and other Figma features</strong> to make them <strong>pixel-perfect and adaptable to future changes</strong>.
          </p>
        </section>

        {/* Previous State */}
        <section id="previous-state" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Previous state</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The design system in Sketch was actually <strong>pretty well-organized</strong> - it had a solid collection of nested symbols. But when it came to Figma, it <strong>just didn't translate well</strong>. Despite the generally good setup, there were <strong>several areas that needed improvement</strong>:
          </p>

          <img src="/assets/case-studies/webster/previous-state.png" alt="Previous state of the Webster design system in Sketch" className="w-full mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            First, there were <strong>a lot of redundant components</strong> because of Sketch's limitations. For example, we had <strong>two separate hero components</strong> - one with one link, another with two - even though everything else about them was identical. This meant <strong>changing the hero design required making the same edit twice</strong>. With Figma's boolean properties, I could <strong>consolidate these into a single, smarter component</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Second, <strong>the styles were a mess</strong>. We had <strong>143 text styles</strong>, and many colors were <strong>poorly named</strong> - things like "New Color Variable" or random numbers with no logic. This made the system <strong>really hard to manage</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Finally, the system <strong>lacked smart layout features</strong>. Without auto layout, <strong>resizing and positioning elements was tedious and time-consuming</strong>. I knew Figma's auto layout could <strong>make this process much smoother</strong>.
          </p>
        </section>

        {/* Scope Definition */}
        <section id="scope" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Scope definition</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Before diving into Figma, I needed to <strong>understand what we actually needed</strong>. I created <strong>an Excel spreadsheet listing every component</strong> in the existing system, noting <strong>which ones were actually being used</strong> and which had inconsistencies. For instance, several components <strong>jumped straight from "medium" to "extra large" sizing</strong> with nothing in between.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Using this spreadsheet, I <strong>brainstormed the necessary variants and property values</strong> for each component. This planning phase was <strong>crucial</strong> - it gave me a <strong>clear roadmap</strong> and helped me <strong>identify what we could cut versus what needed to be built out</strong>. I also consulted with the other designers to <strong>make sure my decisions aligned with the overall design strategy</strong>.
          </p>

          <img src="/assets/case-studies/webster/planning-excel.png" alt="Excel spreadsheet used for planning component variants" className="w-full" />
        </section>

        {/* Styles */}
        <section id="styles" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Styles</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            With the components scoped out, I turned my attention to the foundational styles - colors and typography. Getting these right was essential for building a consistent, accessible system.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Colors: Building an accessible palette
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            For the color system, I wanted to make sure we had <strong>all the colors we needed and that they were accessible</strong>. I adopted a <strong>naming convention used by established design systems</strong>, where colors are defined by a letter representing their function (like P for Primary) followed by a number. The number <strong>500 represents the base color</strong>, with lower numbers for lighter shades and higher numbers for darker shades.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            To <strong>ensure accessibility</strong>, I used a <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">contrast checker</a> to <strong>test our neutral shades against background colors</strong>. This helped us <strong>identify color combinations that met accessibility standards</strong> - something that <strong>hadn't been given much attention before</strong>.
          </p>

          <img src="/assets/case-studies/webster/colors.png" alt="Webster color palette system" className="w-full mb-12" />

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Typography: Organizing 143 text styles
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The typography situation was <strong>overwhelming at first</strong> - <strong>143 text styles in Sketch with no clear organization</strong>. I sorted through them all and created <strong>four clear categories</strong>: Headings, Body, Body Sans, and Taxonomy.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            The <strong>"Body Sans" category was particularly important</strong>. Our standard body font was a serif, but there were places on the site where our heading font was being used as a body font (like in forms). In the previous system, this <strong>alternate body font was spread out and ungrouped</strong>, making it hard to manage. <strong>Creating a dedicated category simplified the hierarchy</strong> and made it <strong>much easier to design pages that used this font</strong>.
          </p>
        </section>

        {/* Components */}
        <section id="components" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Components</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            The <strong>bulk of the work involved rebuilding the components</strong>. From my scope definition, I knew <strong>exactly which components and variants we needed</strong>. Now I had to <strong>leverage Figma's features</strong> to make them <strong>pixel-perfect and maintainable</strong>.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Auto layout, constraints, and positioning
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            <a href="https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">Auto layout</a> in Figma <strong>simplifies responsive design</strong> by automatically resizing content based on the container or its contents. The old Sketch system <strong>wasn't using anything similar</strong>, so this was a <strong>great opportunity to finally implement it properly</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            One example shows the difference clearly. The old card component had <strong>major issues when resized</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm font-semibold text-[#999] mb-2">Before</p>
              <video
                src="/assets/case-studies/webster/auto-layout-before.mp4"
                className="w-full border border-[rgba(0,0,0,0.08)] shadow-md"
                autoPlay
                playsInline
                muted
                loop
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#999] mb-2">After</p>
              <video
                src="/assets/case-studies/webster/auto-layout-after.mp4"
                className="w-full border border-[rgba(0,0,0,0.08)] shadow-md"
                autoPlay
                playsInline
                muted
                loop
              />
            </div>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            <strong>The problems:</strong> The video thumbnail, play icon, and button would <strong>distort when resized</strong>. The "Learn more" text would <strong>stray from its line</strong> on vertical resize and from the play icon on horizontal resize. These issues mattered because <strong>cards needed to flex for different text lengths and row widths</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            <strong>The solution:</strong> I set the image to <strong>"fill" (maintaining aspect ratio)</strong>, centered the play icon with constraints, and used <strong>absolute positioning for the "Learn more" link</strong> with "left and right" + "bottom" constraints. The line next to "Learn more" was set to <strong>fill container, so it stretches with the card width</strong>. Now <strong>everything resizes smoothly and predictably</strong>.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Breaking down components
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I used <strong>atomic design principles</strong> to break components into <strong>smaller, modular parts</strong>. The input component is a perfect example - I <strong>split it into a label and a field</strong>, each with its own configurable properties. This modular approach made it possible to <strong>create countless variations of a single component without duplicating work</strong>.
          </p>

          <video
            src="/assets/case-studies/webster/input.mov"
            className="w-full border border-[rgba(0,0,0,0.08)] shadow-md mb-8"
            autoPlay
            playsInline
            muted
            loop
          />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            In the video above, I demonstrate how this works. I change the input's state to error, which <strong>makes the error message property available</strong>. I turn it on to <strong>display a configurable error message</strong>. Then I click into the label component and <strong>toggle on the info icon and tooltip properties</strong>. Next, I drill into the field component and <strong>add a left icon</strong>, then customize it by <strong>changing its type from "user" to "lock."</strong> Each nested component has <strong>its own set of properties that can be mixed and matched</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            This was made possible by using <strong>boolean properties to control the visibility of specific layers</strong> - like error messages, icons, and tooltips. Each property is <strong>only available in the states where it makes sense</strong> (for example, only error states can show error messages). This modular design meant I could <strong>build one flexible input component instead of dozens of separate variants</strong>.
          </p>
        </section>

        {/* Fixes */}
        <section id="fixes" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Fixes</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            While working on the system, I identified <strong>two major issues that needed immediate attention</strong> - one affecting <strong>accessibility</strong>, the other affecting <strong>usability</strong>.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Fixing color contrast for accessibility
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I noticed right away that <strong>some of our color combinations had accessibility issues</strong>. Specifically, when we used "Dark Gray" on "Webster Yellow" (#FFD107), the text <strong>didn't adequately contrast with the background</strong>. This was <strong>causing problems on our public-facing site</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-[rgba(0,0,0,0.08)] shadow-sm p-8">
              <p className="text-sm font-semibold text-[#999] mb-6">Previous state</p>
              <div className="bg-[#FFD107] p-6 mb-6 flex items-center justify-center" style={{ minHeight: '120px' }}>
                <p className="text-[#5F5F5F] font-bold text-xl">Dark Gray Text</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">Contrast ratio</span>
                  <span className="font-bold text-[#333]">4.37</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">WCAG AA</span>
                  <span className="font-bold text-red-600">Fail</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">Color</span>
                  <span className="font-mono text-sm text-[#333]">#5F5F5F</span>
                </div>
              </div>
            </div>

            <div className="border border-[rgba(0,0,0,0.08)] shadow-sm p-8">
              <p className="text-sm font-semibold text-[#999] mb-6">Revised state</p>
              <div className="bg-[#FFD107] p-6 mb-6 flex items-center justify-center" style={{ minHeight: '120px' }}>
                <p className="text-[#4B4B4B] font-bold text-xl">Dark Gray Text</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">Contrast ratio</span>
                  <span className="font-bold text-[#333]">5.97</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">WCAG AA</span>
                  <span className="font-bold text-green-600">Pass</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">Color</span>
                  <span className="font-mono text-sm text-[#333]">#4B4B4B</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            The fix was <strong>simple but impactful</strong>: I changed our "Dark Gray" from N600 (#5F5F5F) to N700 (#4B4B4B), which <strong>increased the contrast ratio from 4.37 to 5.97</strong> - <strong>exceeding the WCAG AA threshold of 4.5:1</strong>. A small tweak that made a big difference.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Rethinking primary buttons
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            In the previous system, Webster was <strong>using outline buttons</strong> (commonly called "<a href="https://uxplanet.org/ghost-buttons-in-ux-design-4cf3717334f8" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">ghost buttons</a>") <strong>as primary buttons</strong>. This is <strong>inconsistent with general design practice</strong> - typically, primary buttons should be <strong>solid colors to make them more prominent</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The design team collectively decided that a <strong>solid blue button would be our primary style</strong> going forward. I used this opportunity to also <strong>define clear hover, active, and focus states</strong>, which had been <strong>inconsistent in the previous system</strong>.
          </p>

          <img src="/assets/case-studies/webster/buttons.png" alt="Webster button variants showing primary, secondary, and different states" className="w-full" />
        </section>

        {/* Tokens */}
        <section id="tokens" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Tokens</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            With all the components updated, we wanted to <strong>take things a step further and research design tokens</strong> to make the system <strong>even more scalable</strong>. I used the <a href="https://tokens.studio/" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">Tokens Studio for Figma</a> plugin to <strong>brainstorm all possible tokens</strong> - fonts, colors, border radius, sizing, and more.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I created <strong>a mind map in <a href="https://miro.com" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">Miro</a></strong> to map our styles to <strong>specific tokens and aliases</strong>. For example, our primary blue was labeled "color-primary-dark" and also <strong>aliased as "color-background-dark"</strong> to specify where that color is used throughout the system.
          </p>

          <img src="/assets/case-studies/webster/miro-planning.png" alt="Miro mind map showing token planning and organization" className="w-full border border-[rgba(0,0,0,0.08)] shadow-sm mb-8" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            As a first step, I focused on <strong>organizing our typography tokens</strong>, which are <strong>compositions of several other tokens</strong> like font family and font size. This helped <strong>simplify the hierarchy of text styles</strong> and made the system <strong>easier to maintain</strong>.
          </p>

          <div className="-mx-12 md:mx-0 mb-12">
            <div className="overflow-x-auto border border-[rgba(0,0,0,0.08)] shadow-sm" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', minWidth: '600px' }}>
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 text-sm font-bold text-[#333] border-b border-[rgba(0,0,0,0.08)]" style={{ minWidth: '120px' }}></th>
                  <th className="text-left p-4 text-sm font-bold text-[#333] border-b border-[rgba(0,0,0,0.08)]" style={{ minWidth: '150px' }}>Heading 4<br/><code className="inline-block mt-2 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs font-normal rounded">$font-heading-4</code></th>
                  <th className="text-left p-4 text-sm font-bold text-[#333] border-b border-[rgba(0,0,0,0.08)]" style={{ minWidth: '150px' }}>Body<br/><code className="inline-block mt-2 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs font-normal rounded">$font-body</code></th>
                  <th className="text-left p-4 text-sm font-bold text-[#333] border-b border-[rgba(0,0,0,0.08)]" style={{ minWidth: '150px' }}>Body Sans<br/><code className="inline-block mt-2 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs font-normal rounded">$font-body-sans</code></th>
                </tr>
              </thead>
                <tbody>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <td className="p-4 text-sm font-semibold text-[#666]">Font family</td>
                    <td className="p-4 text-sm text-[#333]">Roboto<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-family-heading</code></td>
                    <td className="p-4 text-sm text-[#333]">Source Serif Pro<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-family-body</code></td>
                    <td className="p-4 text-sm text-[#333]">Roboto<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-family-heading</code></td>
                  </tr>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <td className="p-4 text-sm font-semibold text-[#666]">Font size</td>
                    <td className="p-4 text-sm text-[#333]">30px<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-size-7</code></td>
                    <td className="p-4 text-sm text-[#333]">18px<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-size-4</code></td>
                    <td className="p-4 text-sm text-[#333]">18px<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-size-4</code></td>
                  </tr>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <td className="p-4 text-sm font-semibold text-[#666]">Font weight</td>
                    <td className="p-4 text-sm text-[#333]">light<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-weight-light</code></td>
                    <td className="p-4 text-sm text-[#333]">regular<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-weight-regular</code></td>
                    <td className="p-4 text-sm text-[#333]">regular<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$font-weight-regular</code></td>
                  </tr>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <td className="p-4 text-sm font-semibold text-[#666]">Letter spacing</td>
                    <td className="p-4 text-sm text-[#333]">0<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$letter-spacing-default</code></td>
                    <td className="p-4 text-sm text-[#333]">0<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$letter-spacing-default</code></td>
                    <td className="p-4 text-sm text-[#333]">0<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$letter-spacing-default</code></td>
                  </tr>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <td className="p-4 text-sm font-semibold text-[#666]">Line height</td>
                    <td className="p-4 text-sm text-[#333]">1.2<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$line-height-short</code></td>
                    <td className="p-4 text-sm text-[#333]">1.5<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$line-height-default</code></td>
                    <td className="p-4 text-sm text-[#333]">1.5<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$line-height-default</code></td>
                  </tr>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <td className="p-4 text-sm font-semibold text-[#666]">Paragraph spacing</td>
                    <td className="p-4 text-sm text-[#333]">0<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$paragraph-spacing-none</code></td>
                    <td className="p-4 text-sm text-[#333]">0<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$paragraph-spacing-none</code></td>
                    <td className="p-4 text-sm text-[#333]">0<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$paragraph-spacing-none</code></td>
                  </tr>
                  <tr className="border-b border-[rgba(0,0,0,0.08)]">
                    <td className="p-4 text-sm font-semibold text-[#666]">Text case</td>
                    <td className="p-4 text-sm text-[#333]">none<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$text-case-none</code></td>
                    <td className="p-4 text-sm text-[#333]">none<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$text-case-none</code></td>
                    <td className="p-4 text-sm text-[#333]">none<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$text-case-none</code></td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm font-semibold text-[#666]">Text decoration</td>
                    <td className="p-4 text-sm text-[#333]">none<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$text-decoration-none</code></td>
                    <td className="p-4 text-sm text-[#333]">none<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$text-decoration-none</code></td>
                    <td className="p-4 text-sm text-[#333]">none<br/><code className="inline-block mt-1 px-2 py-1 bg-black text-[#39ff14] font-mono text-xs rounded">$text-decoration-none</code></td>
                  </tr>
              </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section id="next-steps" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Next steps</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            There's still work to do - <strong>building out the remaining tokens</strong> and <strong>getting developers fully onboarded with Figma</strong>. But this process taught me a lot about <strong>the complexities of design systems</strong> and gave me <strong>valuable hands-on experience with Figma's more advanced features</strong>.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Design systems, when done well, are incredibly powerful</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Having a single, well-built input component that can be applied to any input field is a game-changer. And tokens make scaling even easier - I'm excited to see how they work in practice with our development team.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Planning was crucial</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Taking the time to inventory the existing system and map out a clear plan helped me understand all the pieces and organize them logically. It would have been much messier without that upfront work.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Iteration is key</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                This is a strong first iteration, but design systems need continuous testing and refinement. As we use it more, we'll discover areas for improvement and ways to optimize it for our workflow. The work is never truly "done."
              </p>
            </div>
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
              <img src="/assets/case-studies/webster/logo.svg" alt="Webster Bank" className="w-12 h-12" />
              <span className="font-bold text-xl text-[#333]">Webster Bank</span>
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
      <div className="mx-auto px-12 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <style jsx>{`
          @media (max-width: 767px) {
            div {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
          }
        `}</style>
        <div className="flex justify-between pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20 gap-8">
          <Link href="/work/orgo" className="flex flex-col items-start gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-1/2">
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
              Orgo: The App
            </span>
          </Link>

          <Link href="/work/inkbench-ez-mode" className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-1/2">
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
              Inkbench EZ Mode
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
