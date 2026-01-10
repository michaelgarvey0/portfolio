'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/CaseStudyHero';
import Accordion from '@/components/Accordion';

export default function NewportInBloom() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const brandColor = '#00C49A';

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'research', title: 'Research' },
    { id: 'define', title: 'Define' },
    { id: 'design', title: 'Design' },
    { id: 'test', title: 'Test' },
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
        title="Newport in Bloom"
        description="Designing and developing a responsive website for two nonprofits."
        gradientFrom="#00C49A"
        gradientTo="#008c73"
        imageSrc="/assets/case-studies/newport-in-bloom/hero.png"
        imageAlt="Newport in Bloom Website"
        ctaText="Visit the site"
        ctaHref="https://newportinbloom.org"
        ctaColor="#212121"
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

          <img src="/assets/case-studies/newport-in-bloom/final-website.png" alt="Newport in Bloom website mockup" className="w-full border border-[rgba(0,0,0,0.08)] shadow-md" />
        </motion.section>

        {/* Summary */}
        <section id="summary" className="mb-32 scroll-mt-32">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            "Two" many sites
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Newport in Bloom and Daffodil Days are nonprofits committed to <strong>beautifying Newport, Rhode Island, with flowers</strong>. Newport in Bloom hosts city events, and Daffodil Days is a festival to <strong>celebrate the daffodils they plant in fall</strong>, which bloom every April. These two groups have <strong>significant membership overlap</strong> and wanted to <strong>combine their websites</strong>. Specifically, the Newport in Bloom site wanted to <strong>absorb Daffodil Days</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-[rgba(0,0,0,0.08)] shadow-md">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">newport in bloom: Before</h5>
                <p className="text-[#666]">A screenshot of the Newport in Bloom home page in December 2020.</p>
              </div>
              <img src="/assets/case-studies/newport-in-bloom/nib-before.png" alt="Newport in Bloom website before redesign" className="w-full border border-[rgba(0,0,0,0.08)] shadow-md" />
            </div>
            <div className="border border-[rgba(0,0,0,0.08)] shadow-md">
              <div className="p-6 bg-[#fafafa] border-b border-[rgba(0,0,0,0.08)]">
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-2">daffodil days: Before</h5>
                <p className="text-[#666]">A screenshot of the Daffodil Days home page in December 2020.</p>
              </div>
              <img src="/assets/case-studies/newport-in-bloom/daffy-before.png" alt="Daffodil Days website before redesign" className="w-full border border-[rgba(0,0,0,0.08)] shadow-md" />
            </div>
          </div>

          {/* Final Product */}
          <div className="mb-16">
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
              A new brand, consolidation, intuitive structure, and responsivity
            </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The design system is now <strong>fully integrated with modern web capabilities</strong>, resulting in a <strong>more scalable and accessible system</strong>.
          </p>

          <div className="flex gap-4 mb-12">
            <a href="https://newportinbloom.org" target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-white font-semibold transition-colors" style={{ backgroundColor: brandColor }}>
              View the live site
            </a>
            <a href="https://www.figma.com/proto/xqTOYLNNVrtn7EHGsMA5Jl/Newport-in-Bloom---Portfolio-Prototype" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border font-semibold transition-colors" style={{ borderColor: brandColor, color: brandColor }}>
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
        </div>
        </section>

        {/* Research */}
        <section id="research" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Research</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Before beginning the design process, I formulated a <strong>set of research questions</strong> to guide my investigation. These questions pertained to the <strong>current websites, the users, and the goals of the committees</strong>. The guiding questions were:
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
        <div className="mb-16">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Stakeholder interviews: Getting to know the organizations
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            First, I needed to <strong>understand who and what I was working with</strong>-- what do committee members want, why do they want it, and what are the sites like now? I talked to <strong>three committee members and the Newport in Bloom webmaster</strong> to figure this out.
          </p>
        </div>

        {/* User Interviews */}
        <div className="mb-16">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            User interviews: Gathering user perspectives
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            With a clear understanding of the committees' goals, I conducted <strong>user research by interviewing 6 individuals</strong>, evenly divided between those who had participated in Newport in Bloom events (gardeners) and those who had not (non-gardeners). The aim was to <strong>gain insights into their goals and needs</strong>.
          </p>
        </div>

        {/* Peer Analysis */}
        <div className="mb-16">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            What are other nonprofits doing?
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I also <strong>researched other nonprofit organizations</strong> as part of my investigation. I examined the websites of <strong>nonprofits in Newport, national-level organizations, and other local garden and flower-related nonprofits or festivals</strong>. This broad research helped me <strong>identify patterns across categories</strong>.
          </p>

          <h4 className="text-[1.4rem] font-bold text-[#333] mb-6">Newport nonprofits</h4>

          <div className="grid md:grid-cols-2 gap-4 mb-8 items-start">
            <Accordion
              id="preservation"
              title="Newport Preservation Society"
              logoSrc="/assets/case-studies/newport-in-bloom/preservation-society.png"
              url="https://www.newportmansions.org"
              description="The Preservation Society of Newport County preserves and protects the area's architectural, decorative arts, landscape, and social history. They run the Newport Mansions, which primarily make Newport a tourist destination."
              bulletPoints={[
                "Significant amount of information",
                "All pages are accessible from the primary navigation menu— some have four levels of dropdowns",
                "Photo-heavy (pictures of mansion interiors, exteriors, gardens, etc.)",
                "On specific pages, they employ secondary navigation in the form of a sidebar",
                "Primary CTAs are for member login, ticket purchase, and donations",
                "Several auto-rotating carousels with full-page pictures"
              ]}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
              brandColor={brandColor}
            />
            <Accordion
              id="ymca"
              title="Newport County YMCA"
              logoSrc="/assets/case-studies/newport-in-bloom/ymca.png"
              url="https://www.newportymca.org"
              description="The Newport County YMCA is an organization that tries to bring together the community through programs and activities that help develop spiritual, mental, and physical well-being."
              bulletPoints={[
                "Photo-heavy; includes several photos of happy children and employees",
                "Also a significant amount of information, structured within the primary navigation",
                "For particular events, a good reusable template: hero image, title, program contact, related programs, and action items",
                "Primary navigation takes up a significant portion of the page real estate",
                "Primary CTAs are to view upcoming events and to register for particular programs",
                "Several different places to donate"
              ]}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
              brandColor={brandColor}
            />
          </div>

          <h4 className="text-[1.4rem] font-bold text-[#333] mb-6">Garden and flower nonprofits</h4>

          <div className="grid md:grid-cols-2 gap-4 mb-8 items-start">
            <Accordion
              id="portland"
              title="Portland Rose Festival"
              logoSrc="/assets/case-studies/newport-in-bloom/rose-festival.png"
              url="https://www.rosefestival.org"
              description="The Portland Rose Festival is an event held every June in Portland, Oregon, with lots of parades and activities promoting both Portland and its beautiful flowers."
              bulletPoints={[
                "Simple, flowery monochrome logo",
                "Calendar of upcoming events",
                "Primary CTAs are donate and purchase tickets",
                "Lots of focus on the directly upcoming event (even a live countdown)",
                "Several full-page images",
                "Event pages include a hero image, title, and a sidebar with relevant information",
                "Can search through events and filter them",
                "Whole-site search functionality"
              ]}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
              brandColor={brandColor}
            />
            <Accordion
              id="cherry"
              title="Cherry Blossom Festival"
              logoSrc="/assets/case-studies/newport-in-bloom/cherry-blossom.png"
              url="https://www.nationalcherryblossomfestival.org"
              description="The National Cherry Blossom Festival is an organization devoted to hosting activities to promote and educate about the environment, arts, and culture in Washington, DC. The primary event promotes cherry blossoms, which bloom in late March and early April."
              bulletPoints={[
                "Brand color (pink) extends throughout site",
                "An autoplaying carousel is the main focal point of the homepage",
                "The primary CTA is donate",
                "For each event, there's a sidebar with general important information",
                "Lots of cards with a similar format (title, picture, subtext, learn more button)",
                "Two navigation bars at the top, one sticky, one not"
              ]}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
              brandColor={brandColor}
            />
          </div>

          <h4 className="text-[1.4rem] font-bold text-[#333] mb-6">National nonprofits</h4>

          <div className="grid md:grid-cols-2 gap-4 mb-12 items-start">
            <Accordion
              id="aclu"
              title="American Civil Liberties Union"
              logoSrc="/assets/case-studies/newport-in-bloom/aclu.png"
              url="https://www.aclu.org"
              description="ACLU is an organization devoted to preserving people's constitutional rights by offering legal assistance in cases where civil liberties are at risk."
              bulletPoints={[
                'Primary CTA is very clearly "Donate"',
                "Carousel of images is general hero; includes the option to stop autoplaying",
                "Sticky email subscription input",
                "Site is organized by issue",
                "Search and filter available for particularly long results pages"
              ]}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
              brandColor={brandColor}
            />
            <Accordion
              id="bgc"
              title="Boys and Girls Club"
              logoSrc="/assets/case-studies/newport-in-bloom/bgc.png"
              url="https://www.bgca.org"
              description="The Boys & Girls Club of America provides programs for kids and young adults across the country."
              bulletPoints={[
                "Carousel hero with images of happy children; similar to Newport County YMCA",
                '"I am a <dropdown>" form field which brings you to a specific page dependent on the option you choose',
                "Various types of templates used, generally lacking a consistent format across the site",
                "Breadcrumbs to facilitate user navigation",
                "Some reused templates, especially for programs"
              ]}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
              brandColor={brandColor}
            />
          </div>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">TAKEAWAYS</h5>
            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
              I found two common approaches to designing nonprofit homepages: one that presents a blatant call to action without much information (a more visual, grabbing experience), and another that provides more information about the organization with CTAs less obvious on the page.
            </p>
            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
              While both types of sites displayed the information users were likely to want to find, they differed in the amount of clutter. I knew from stakeholders that Newport in Bloom wanted their site to be image-heavy, but I also knew from the research that they wanted to share their story and mission with everyone who landed on the site.
            </p>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              It was important to <strong className="font-bold text-[#212121]">find a balance where the home page could tell their story but also avoid text-heavy chunks.</strong>
            </p>
          </div>
        </div>

        <section id="define" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Define</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            The goals were ambitious: I had to <strong>combine two nonprofit websites</strong>, make a <strong>better user experience</strong>, implement <strong>Newport in Bloom's new brand</strong>, and make the site <strong>responsive to tablet and phone screens</strong>. Once the research was concluded, I <strong>synthesized the results to define two design goals</strong>. These goals specifically targeted the aspects I wanted to prioritize in order to <strong>create a more user-friendly site</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
              <div className="text-[2.5rem] font-bold mb-4" style={{ color: brandColor }}>1</div>
              <h4 className="text-[1.5rem] font-bold text-[#333] mb-4">
                Minimize site clutter and streamline content across all pages.
              </h4>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                The main issue with the current sites (particularly the Newport in Bloom site) is that there is too much to sift through to find the information a user wants. Ultimately, all types of users want simple information. The way the old site presents itself does not help users do this. I will design this site to guide every category of users toward the information that would be most relevant to them-- quickly and clearly.
              </p>
            </div>

            <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)]">
              <div className="text-[2.5rem] font-bold mb-4" style={{ color: brandColor }}>2</div>
              <h4 className="text-[1.5rem] font-bold text-[#333] mb-4">
                Design the site to be accessible on multiple devices.
              </h4>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                I heard from a couple people that they wished these sites looked good on their phones. The site should be fully accessible on phones, tablets, laptops, and desktops. I chose to follow a mobile-first design process in order to ensure responsivity.
              </p>
            </div>
          </div>
        </section>

        <div className="mb-16">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Content and structure: Merging and reorganizing
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I <strong>evaluated the existing content</strong> to find what should stay and what should go. This was <strong>very collaborative with the stakeholders</strong>: I made some recommendations, they made some recommendations, and we <strong>worked toward a final site map</strong>.
          </p>

          <div className="p-8 bg-[#fafafa] border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">BEFORE: TWO SITES</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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

          <img src="/assets/case-studies/newport-in-bloom/sitemap-v2.png" alt="Site map diagram showing information architecture" className="w-full mb-12" />
        </div>

        <section id="design" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Design</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            With a clear understanding of the goals, I began the <strong>design process</strong>. I started with <strong>wireframes to establish the structure and flow</strong>, then moved into <strong>high-fidelity mockups</strong> that incorporated <strong>Newport in Bloom's new branding</strong>.
          </p>
        </section>

        <div className="mb-16">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Wireframes: Establishing information hierarchy
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            I started by <strong>sketching out initial ideas</strong> for the home page layout. These rough sketches helped me <strong>quickly iterate on different approaches</strong> to organizing the content.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            After sketching, I created <strong>digital wireframes in Figma</strong>. I focused on <strong>mobile-first design</strong> to ensure the site would <strong>work well on all devices</strong>.
          </p>

        </div>

        <div className="mb-16">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Styling: Implementing the new brand
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Newport in Bloom had recently worked with a graphic designer to <strong>create a new logo and brand identity</strong>. My task was to <strong>take this new branding and apply it to the website design</strong>. Their font remained the same but was paired with a <strong>new color palette, featuring colors that complement plants and flowers</strong>.
          </p>

          <div className="p-8 bg-white border border-[rgba(0,0,0,0.08)] mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">COLORS AND TYPOGRAPHY</h5>

            <div className="mb-8">
              <p className="font-bold text-[#333] mb-4">Color Palette</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="w-full h-24 mb-2" style={{ backgroundColor: '#00C49A' }}></div>
                  <p className="text-sm font-bold text-[#212121]">Primary</p>
                  <p className="text-sm text-[#212121]">#00C49A</p>
                </div>
                <div>
                  <div className="w-full h-24 mb-2" style={{ backgroundColor: '#FFD203' }}></div>
                  <p className="text-sm font-bold text-[#212121]">Secondary</p>
                  <p className="text-sm text-[#212121]">#FFD203</p>
                </div>
                <div>
                  <div className="w-full h-24 mb-2" style={{ background: 'linear-gradient(to right, #FFC58D, #FF8266)' }}></div>
                  <p className="text-sm font-bold text-[#212121]">Primary Decorative</p>
                  <p className="text-sm text-[#212121]">#FFC58D ➞ #FF8266</p>
                </div>
                <div>
                  <div className="w-full h-24 mb-2" style={{ backgroundColor: '#062F3D' }}></div>
                  <p className="text-sm font-bold text-[#212121]">Accent Dark</p>
                  <p className="text-sm text-[#212121]">#062F3D</p>
                </div>
                <div>
                  <div className="w-full h-24 mb-2" style={{ backgroundColor: '#333333' }}></div>
                  <p className="text-sm font-bold text-[#212121]">Dark</p>
                  <p className="text-sm text-[#212121]">#333333</p>
                </div>
                <div>
                  <div className="w-full h-24 mb-2 border border-[rgba(0,0,0,0.1)]" style={{ backgroundColor: '#FBFEFF' }}></div>
                  <p className="text-sm font-bold text-[#212121]">Light</p>
                  <p className="text-sm text-[#212121]">#FBFEFF</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-[#333] mb-4">Typography</p>
              <div className="space-y-4">
                <div>
                  <p className="text-[2rem] font-bold text-[#212121]" style={{ fontFamily: 'var(--font-raleway)' }}>Aa Raleway Bold</p>
                  <p className="text-[#666] font-bold" style={{ fontFamily: 'var(--font-raleway)' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div>
                  <p className="text-[2rem] text-[#212121]" style={{ fontFamily: 'var(--font-raleway)' }}>Aa Raleway Regular</p>
                  <p className="text-[#666]" style={{ fontFamily: 'var(--font-raleway)' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
          </div>

          <img src="/assets/case-studies/newport-in-bloom/final-website.png" alt="High-fidelity mockup of home page" className="w-full mb-12 border border-[rgba(0,0,0,0.08)] shadow-md" />
        </div>

        <section id="test" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Test</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Before finalizing the design, I conducted <strong>usability testing</strong> to <strong>identify any issues</strong> and ensure the site <strong>met user needs</strong>. I tested with both <strong>gardeners and non-gardeners</strong> to get a <strong>comprehensive understanding of the user experience</strong>.
          </p>
        </section>

        <div className="mb-16">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Usability testing: Finding pain points
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I conducted <strong>moderated usability tests with 5 participants</strong> (3 gardeners, 2 non-gardeners). Each participant was given a <strong>series of tasks to complete while thinking aloud</strong>. I <strong>observed their behavior</strong> and noted any <strong>points of confusion or frustration</strong>.
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
        </div>

        <div className="mb-16">
          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">
            Priority fixes: Addressing usability issues
          </h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            After <strong>reviewing usability testing notes</strong>, re-watching the Zoom recordings, and <strong>consulting with committee members</strong>, I identified <strong>three main issues to address</strong>, along with several additional minor improvements.
          </p>

          {/* Fix 1: Happening Now Section */}
          <div className="mb-20">
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-6">Fix 1: "Happening Now" section</h4>

            <div className="mb-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PREVIOUS STATE</h5>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-4">
                An auto-rotating carousel of events and updates.
              </p>
              <img src="/assets/case-studies/newport-in-bloom/nib-carousel-v1.png" alt="Previous carousel design" className="w-full mb-8 border border-[rgba(0,0,0,0.08)] shadow-md" />

              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PROBLEMS</h5>
              <ul className="space-y-3 mb-8 ml-6 list-disc">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">People don't love automatically moving parts.</strong> Moving parts can detract attention and cause overwhelm.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">Only one update was visible at a time.</strong> People like to see all their options, so the initial design violated the "recognition rather than recall" heuristic.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">The system was in control.</strong> The autoplay takes control from the user.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">REVISED STATE</h5>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-4">
                The updates are placed into vertical tabs, with each update summarized in the tab title.
              </p>
              <img src="/assets/case-studies/newport-in-bloom/nib-carousel-v2.png" alt="Revised vertical tabs design" className="w-full mb-8 border border-[rgba(0,0,0,0.08)] shadow-md" />

              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">HOW IT ADDRESSES THE PROBLEMS</h5>
              <ul className="space-y-3 ml-6 list-disc">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">No moving parts.</strong> The new section is static by default.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">All update headlines are visible.</strong> If a user is interested in one, all they have to do is click to learn more.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">The user is in control.</strong> They can click whichever update they'd like to see.</li>
              </ul>
            </div>
          </div>

          {/* Fix 2: Event Page Details */}
          <div className="mb-20">
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-6">Fix 2: Event page details</h4>

            <div className="mb-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PREVIOUS STATE</h5>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-4">
                The header had action buttons in the header picture, and event information was below, separated by headings.
              </p>
              <img src="/assets/case-studies/newport-in-bloom/event-details-v1.png" alt="Previous event page design" className="w-full mb-8 border border-[rgba(0,0,0,0.08)] shadow-md" />

              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PROBLEMS</h5>
              <ul className="space-y-3 mb-8 ml-6 list-disc">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">People didn't know what else was on the page.</strong> Scrolling down allowed you to see photos and competition results. The header didn't tell them that.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">The visual hierarchy was off.</strong> Participants described the headers as difficult to follow; they weren't sure where to look.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">REVISED STATE</h5>
              <img src="/assets/case-studies/newport-in-bloom/event-details-v2.png" alt="Revised event page design with numbered annotations" className="w-full mb-4 border border-[rgba(0,0,0,0.08)] shadow-md" />
              <ul className="space-y-3 mb-8 ml-6">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">1.</strong> Location and date information replaced the action items (which, for most events, will not exist). The header serves as a quick summary of the event.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">2.</strong> Quick links for a) action items and b) section links (e.g., clicking "photos" scrolls to the photos section below)</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">3.</strong> General description of the event</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">4.</strong> "Latest news" ➞ "Updates" and boxed in a separate area</li>
              </ul>

              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">HOW IT ADDRESSES THE PROBLEM</h5>
              <ul className="space-y-3 ml-6 list-disc">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">The section links inform the users what information they can access from this page.</strong> This was a problem during usability testing, and some quick re-testing on that particular task proved this to be an effective solution.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">Improved visual hierarchy.</strong> There aren't as many homogenous blocks of text— the intention here is to drive the user's attention to the header, then to the update, and then to the rest of the copy.</li>
              </ul>
            </div>
          </div>

          {/* Fix 3: Reconfigured Sitemap */}
          <div className="mb-12">
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-6">Fix 3: Reconfigured sitemap</h4>

            <div className="mb-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PREVIOUS STATE</h5>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-4">
                Six event pages, and Daffy Days as a primary menu item.
              </p>
              <img src="/assets/case-studies/newport-in-bloom/sitemap-v1.png" alt="Sitemap v1" className="w-full mb-8" />

              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PROBLEMS</h5>
              <ul className="space-y-3 mb-8 ml-6 list-disc">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">Committee members wanted to include pages for NIB-sponsored events.</strong> Now, these were not accessible in the site.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">Daffodil Days needed a restructure.</strong> Certain changes were requested by the committee. For example, the Daffodil Bulb Giveaway, while technically a "Daffy" event, took place in October, while the actual festival (called "Daffodil Days") takes places in April, and they decided this distinction was important.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">REVISED STATE</h5>
              <img src="/assets/case-studies/newport-in-bloom/sitemap-v2.png" alt="Sitemap v2" className="w-full mb-4" />
              <ul className="space-y-3 mb-8 ml-6">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">1.</strong> Four additional event pages, including those that are sponsored by Newport in Bloom.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">2.</strong> Daffodil days nested into a "Let's Get Daffy" header, with Daffodil Days specific events as tertiary items.</li>
              </ul>

              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">HOW IT ADDRESSES THE PROBLEM</h5>
              <ul className="space-y-3 ml-6 list-disc">
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">Inclusion of NIB-sponsored events.</strong> Previously, these were inaccessible, so the fix was simply to add them in.</li>
                <li className="text-[1.15rem] text-[#666] leading-[1.8]"><strong className="font-bold text-[#212121]">Daffodil Days structure more closely resembles the organization's structure.</strong> While not necessarily a UX fix, this was required by the committee and allowed them to rest easy at night.</li>
              </ul>
            </div>
          </div>
        </div>

        <section id="final-ui" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Final UI</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            After <strong>incorporating feedback from usability testing</strong>, I <strong>finalized the design and developed the site</strong> using WordPress and Elementor Pro. The final product is a <strong>fully responsive, accessible website</strong> that <strong>successfully combines Newport in Bloom and Daffodil Days</strong>.
          </p>

          <img src="/assets/case-studies/newport-in-bloom/final-website.png" alt="Final home page desktop design" className="w-full mb-12 border border-[rgba(0,0,0,0.08)] shadow-md" />


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
              <img src="/assets/case-studies/newport-in-bloom/logo.png" alt="Newport in Bloom" className="w-12 h-12" />
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
                      paddingLeft: '1.5rem'
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
      <div className="mx-auto px-12 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <style jsx>{`
          @media (max-width: 767px) {
            div {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
          }
        `}</style>
        <div className="flex flex-col md:flex-row justify-between pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20 gap-8">
          <Link href="/work/orgo-brand" className="flex flex-col items-start gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2">
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

          <Link href="/work/beeline" className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2">
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
