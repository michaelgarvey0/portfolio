'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Webster() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const { scrollYProgress } = useScroll();
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

      {/* Hero */}
      <div id="hero-section" className="pt-32 pb-16" style={{ backgroundColor: '#fafafa' }}>
        <div className="mx-auto px-12" style={{ maxWidth: 'var(--max-width)' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="font-sans text-[clamp(3rem,6vw,5rem)] font-bold mb-6 text-[#333] tracking-tight">
              Webster Bank Design System
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#666] leading-relaxed mb-10 max-w-[800px]">
              Revamping our design system for scalability and accessibility during its migration from Sketch to Figma.
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

          <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300"></div>
        </motion.section>

        {/* Background */}
        <section id="background" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Background</h2>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            A design system revamp
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            After joining <a href="https://websterbank.com" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">Webster Bank</a> in June of 2022, I noticed that they were in the process of migrating their design system from Sketch to Figma. However, progress on this migration had been limited, with the only step taken being a direct import of the Sketch design file into Figma.
          </p>
          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Recognizing the potential benefits that a revamp of the design system could bring, I offered to lead the initiative and use my extensive knowledge of Figma, which I had gained through self-study. I jokingly called it the "Figmatization of Webster" and set out to give the team a design system we could be proud of.
          </p>
        </section>

        {/* Final Product */}
        <section id="final-product" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Final product</h2>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Logical organization, scalability, and accessibility
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The design system is now fully integrated with Figma's capabilities, resulting in a more scalable and accessible system. A consistent naming convention and organization of colors and typography has been established, making it easier to identify, add, and categorize elements.
          </p>

          <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300 mb-8"></div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            For example, I standardized the buttons to align with industry best practices using features such as auto layout, constraints, absolute positioning, variants, and boolean properties. This made the system more adaptable and easy to update in response to future changes.
          </p>
        </section>

        {/* Previous State */}
        <section id="previous-state" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Previous state</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            The design system in Sketch was a well-organized collection of nested symbols, but it didn't translate well to Figma. Despite the generally good setup, there were a few key areas that needed improvement.
          </p>

          <div className="border border-[rgba(0,0,0,0.08)] shadow-md mb-12">
            <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">The Sketch UI library</h5>
              <p className="text-[#666]">Below is a view of some Symbols in the Sketch library.</p>
            </div>
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300"></div>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Firstly, there were a lot of redundant components due to Sketch's limitations. For example, there were two separate hero components - one with one link, and another with two, all other elements being identical. This meant that in order to change the hero's design, you would have to make identical edits to both components. By leveraging booleans properties in Figma, I could reduce the number of components and create a cleaner, more organized setup.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Additionally, certain components had unnecessary layers, adding to the clutter in the layers panel. Furthermore, there was an excessive number of text and color styles, which presented a challenge when it came to making the design system more manageable. Some styles were simply listed as "New Color Variable" and others numbered with no apparent logic to the numbering convention.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Lastly, the design system lacked smart layout features, making it a bit of a hassle to resize and move elements around. To fix this, I wanted to take advantage of Figma's powerful auto layout feature to make the design process a lot smoother.
          </p>
        </section>

        {/* Scope Definition */}
        <section id="scope" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Scope definition</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            When reviewing the existing design system components, I noticed that not all of them were being used. I created an Excel sheet listing all of the components to better assess which were necessary and which were not. I also noted inconsistencies in the naming conventions and usage of certain components, such as several that skipped directly from "medium" to "extra large" when it came to sizing.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            To address this, I used the spreadsheet to brainstorm and ideate on the necessary variants and property values for each component. This allowed me to create a set of necessary components and variants that were tailored to our specific needs. I also consulted with the other designers to ensure that my choices were in line with the overall design strategy.
          </p>

          <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300"></div>
        </section>

        {/* Styles */}
        <section id="styles" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Styles</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            In this design system revamp project, we focused on updating our color palette and typography to ensure accessibility and scalability. We adopted a naming convention for colors and used a <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">contrast checker</a> to test for accessibility. For typography, we sorted through existing styles and created categories for consistency and ease of editing. These changes simplified the hierarchy and ensured consistency throughout the design system.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Colors: A colorful upgrade
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            For styling, we wanted to update the color palette to make sure we had all the colors we needed and that they were accessible. To start this, we adopted a naming convention used by other well-established design systems where colors are defined by a letter representing their function (e.g., P = Primary) followed by a number. In our design system, the number 500 represents the base color, with lower numbers representing lighter shades and higher numbers representing darker shades.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            To make sure our design system met accessibility standards, I used the contrast checker to test the neutral shades against our background colors. This helped us identify and implement color combinations that met these standards, something that wasn't given much attention before.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Typography: Type-Rework
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            In terms of typography, I sorted through the 143 Sketch styles and came up with four categories: Headings, Body, Body Sans, and Taxonomy. The usual body font was a serif font, but there were several places on the site where our heading font doubled as a body font (e.g., form text). In the previous design system, this alternate body font was spread out and ungrouped, making it hard to manage.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            To fix this, I created the separate category "Body Sans," which not only simplified the hierarchy of text styles but also made it easier to design pages that used this font. I linked the styles to the components so that any change in a style would reflect across all components, ensuring consistency and making it easy to edit our design system.
          </p>
        </section>

        {/* Components */}
        <section id="components" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Components</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            The bulk of the work I did had to do with organizing the components. In my scope definition, I had defined the components and their variants, which was a great starting point. From there, I knew I needed to leverage Figma's formatting capabilities to come up with components that were pixel-perfect.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Auto layout, constraints, and absolute positioning
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            <a href="https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">Auto layout</a> in Figma simplifies responsive design by automatically resizing content based on the container or its own content, reducing tedious manual adjustments. In the old design system, we weren't using the similar feature in Sketch, so it was a great opportunity to finally implement it during the revamp.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Atomic design: Smaller building blocks
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            By breaking down our components into smaller, modular parts using the principles of atomic design, I was able to create a more flexible and efficient system. For example, our input component consisted of a label and a field, which allowed me to easily make changes that needed to be applied across multiple variants of the same component.
          </p>
        </section>

        {/* Fixes */}
        <section id="fixes" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Fixes</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            I made several updates to the design system, but there were two updates that had the highest impact. The first pertains to the accessibility of our color palette, specifically addressing the issue of dark gray text on a yellow background. The second update concerns the primary button style, where we made the decision to switch to a solid button style, in line with general design practices.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Accessibility: Ensuring we meet color contrast standards
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            An immediate fix I noticed had to do with the contrast ratio of some of our main components. Specifically, when we had what was called "Dark Gray" (#5F5F5F) on "Webster Yellow" (#FFD107), the text did not adequately contrast the background, and this had caused some accessibility issues on our public-facing site.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            To solve this, I decided to make a slight change to our "Dark Gray" color. I re-established it as N700 instead of N600, which increased the contrast ratio to meet accessibility requirements. This little tweak made a big difference in ensuring our website is accessible to all of our users.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Buttons: Building out our button component
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Second, in the previous state, Webster had been using a button with an outline (commonly called a "<a href="https://uxplanet.org/ghost-buttons-in-ux-design-4cf3717334f8" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">ghost button</a>") as its primary button. This is inconsistent with general design practice - typically, primary buttons are solid colors.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The designers collectively made a decision that a solid blue button would be the primary one going forward. I took this opportunity to also define some hover, active, and focus states for the new buttons as there was no clear pattern to these states in the previous design system.
          </p>

          <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300"></div>
        </section>

        {/* Tokens */}
        <section id="tokens" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Tokens</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Now that all of the components had been updated, we wanted to research design tokens to make our design system more scalable. To brainstorm, I made a list of all of the possible tokens within the <a href="https://tokens.studio/" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">Tokens Studio for Figma</a> plugin (formerly Figma Tokens; fonts, colors, border radius, sizing, etc.) using a mind map in <a href="https://miro.com" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] underline hover:text-[#004499] transition-all duration-100">Miro</a>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Using this Miro board, I mapped our styles to specific tokens and aliases. For example, our primary blue color was labeled as "color-primary-dark" and also aliased as "color-background-dark" to specifically point out where that color is used throughout the design system.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            As a first step in implementing these tokens, I organized our typography tokens, which are a composition of several other tokens such as font family and font size. This helped to simplify the hierarchy of text styles, making it easier to edit and maintain consistency throughout the design system.
          </p>

          <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300"></div>
        </section>

        {/* Next Steps */}
        <section id="next-steps" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Next steps</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            There's still a lot of work to do in terms of building out the tokens and getting our developers to adopt Figma. However, this process allowed me to familiarize myself with the design system and its complexities, and it was a valuable opportunity to further develop my Figma skills. I look forward to scaling the system and making continuous improvements as we implement it.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Design systems, when executed well, are incredibly valuable</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                I found it interesting that by having a single input component, it could be applied to any input field needed. Additionally, utilizing tokens allows for easy scalability, and I'm excited to see them in action with our developers.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Planning ahead was crucial for this process</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                By taking inventory of the existing design system and mapping out a plan for its revamp, I was able to gain a comprehensive understanding of all its parts and sort them in a logical manner.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Test, test, test</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                This is a great first iteration, but it's important to continue testing and using the design system to identify areas for improvement and optimize it for our workflow. While it's off to a strong start, it's important to keep in mind that design systems are constantly evolving and there is always room for improvement.
              </p>
            </div>
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
              <img src="/assets/logos/webster.svg" alt="Webster Bank" className="w-12 h-12" />
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
      <div className="mx-auto px-12" style={{ maxWidth: 'var(--max-width)' }}>
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

      <div className="mx-auto px-12 mt-20" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}
