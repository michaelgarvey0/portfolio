'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../../_components/Navbar';
import Footer from '../../_components/Footer';
import CaseStudyHero from '../../_components/CaseStudyHero';

export default function OrgoBrand() {
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
    { id: 'brand', title: 'Brand creation' },
    { id: 'initial-teaser', title: 'Initial teaser site' },
    { id: 'expanded-teaser', title: 'Expanded teaser site' },
    { id: 'launch-site', title: 'Launch site' },
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
      <CaseStudyHero
        title="Orgo: The Brand"
        description="Defining a brand for a B2C mobile app."
        gradientFrom="#ff3e00"
        gradientTo="#ff8c00"
        imageSrc="/assets/case-studies/orgo-brand/hero.png"
        imageAlt="Orgo Brand"
        ctaText="View website"
        ctaHref="https://www.orgohq.com"
        ctaColor="#212121"
      />

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm">
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TEAM</h5>
              <p className="text-[#666] leading-relaxed">
                Me (Founder and Principal Designer)<br />
                Zoya Lehrer (Founder and CEO)<br />
                Christiana Davies (Design Advisor)
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TIMELINE</h5>
              <p className="text-[#666] leading-relaxed">June 2023 - Present</p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TASK</h5>
              <p className="text-[#666] leading-relaxed">
                Create a brand for a B2C mobile app.
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TOOLS & LANGUAGES</h5>
              <p className="text-[#666] leading-relaxed">
                Figma, Illustrator, After Effects, React Native
              </p>
            </div>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Orgo is a mobile app that <strong>streamlines personal logistics</strong>—ensuring the <strong>right people get to the right places on time</strong>. While our initial focus is on <strong>busy families</strong>, the app's utility extends to various scheduling scenarios. As a co-founder, I contributed across multiple areas: <strong>brand creation, marketing site design, and app design and development</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            This case study outlines the <strong>journey of creating Orgo's brand identity and web presence from scratch</strong>. I created the <strong>original logo files</strong>, and, using Webflow, I <strong>personally designed and built each iteration of our site</strong>. The process unfolded in several key stages:
          </p>

          <ol className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] mb-12 list-decimal ml-8">
            <li><strong>Brand Creation:</strong> Developing our logo and visual identity</li>
            <li><strong>Initial teaser site:</strong> A minimalist web presence during stealth mode</li>
            <li><strong>Expanded teaser site:</strong> An enhanced site with more information, still pre-launch</li>
            <li><strong>Launch Site:</strong> Our current website, featuring app visuals and a download CTA</li>
          </ol>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Throughout this process, I <strong>adapted our online presence to match Orgo's development stages</strong>, from <strong>building anticipation to driving app adoption</strong>. My hands-on approach ensured <strong>consistency across our brand and web presence at every step</strong>.
          </p>

          <a
            href="https://www.orgohq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-white font-bold text-base shadow-lg mb-12"
            style={{
              backgroundColor: brandColor,
              transition: 'all 0.3s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e63700';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = brandColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            View the current marketing site →
          </a>
        </motion.section>

        {/* Brand Creation */}
        <section id="brand" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Brand creation</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Our journey began with <strong>finding the perfect name</strong>. After exploring various options, we landed on <strong>'Orgo'</strong>. This name resonated as a <strong>clever derivative of 'organization on the go'</strong>, and our target audience found it <strong>appealing and memorable</strong>. Importantly, both the <strong>domain and App Store names were available</strong>. We deliberately <strong>avoided terms like 'fam' or 'kids'</strong> to ensure our brand could <strong>expand beyond our initial family-oriented use case</strong>. Feedback from potential users described the name as 'super cute', which we saw as a positive sign for its broader appeal. With our name in place, we moved on to the crucial task of logo design.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Logo development</h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            We centered our logomark on a <strong>circular shape</strong>, echoing the leading 'O' in Orgo. Our goal was to <strong>incorporate elements of time, driving, or movement</strong> within this form, <strong>reflecting our app's core functions</strong>. Through <strong>multiple iterations</strong>, we explored various designs, trying to <strong>balance simplicity with meaningful representation of Orgo's purpose</strong>.
          </p>

          <img src="/assets/case-studies/orgo-brand/logomark-ideation.png" alt="Logomark ideation and iterations" className="w-full mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Parallel to logomark development, we crafted a complementary wordmark and color scheme. We tested various typographic styles, prioritizing readability based on user feedback. Simultaneously, we explored vibrant color combinations using orange, yellow, and blue to create an appealing palette that aligned with our brand vision.
          </p>

          <img src="/assets/case-studies/orgo-brand/wordmark-ideation.png" alt="Wordmark and color scheme iterations" className="w-full mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Our <strong>breakthrough concept centered on the transition from chaos to order</strong>. We designed the 'O' in Orgo with a <strong>fragmented left side evolving into a whole right side</strong>, <strong>symbolizing this transformation</strong>. This design represented our app's purpose: <strong>bringing order to chaotic schedules</strong>.
          </p>

          <img src="/assets/case-studies/orgo-brand/breakthrough-concept.png" alt="Breakthrough concept showing chaos to order transformation" className="w-full mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            For the remaining letters 'rgo', we kept the design clean and whole, ensuring readability. This approach addressed user preferences for clarity while complementing the dynamic 'O' concept.
          </p>

          <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-12">
            <img src="/assets/case-studies/orgo-brand/final-logo.svg" alt="Final Orgo logo" className="w-full mb-8 px-12 py-8" />
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">THE FINAL LOGO</h5>
            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-4">
              The final Orgo logo embodies our core concept through its thoughtful design:
            </p>
            <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
              <li>The 'O' transitions from fragmented to whole, representing the shift from chaotic schedules to organized routines</li>
              <li>The circular shapes evokes ideas of time, cycles, and continuous improvement</li>
              <li>Clean, readable typography in 'rgo' balances the dynamic 'O', ensuring clarity and brand recognition</li>
            </ul>
          </div>
        </section>

        {/* Initial Teaser Site */}
        <section id="initial-teaser" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Initial teaser site</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Our initial web presence aimed to <strong>generate interest and build a waitlist</strong> while <strong>maintaining a level of stealth</strong>. We created a <strong>flashy, exciting, and professional site</strong> without revealing app images, using <strong>animations to engage visitors</strong> and lead them to the waitlist. Our target audience was primarily our <strong>professional network and potential consumers</strong>, reached through LinkedIn and Facebook groups.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            The site featured a 20-second animated introduction:
          </p>

          <ol className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] mb-12 list-decimal ml-8">
            <li><strong>Text messages:</strong> Building tension with real family scheduling messages</li>
            <li><strong>Brand introduction:</strong> Our logo 'absorbing' messages, symbolizing clarity</li>
            <li><strong>Brand explanation:</strong> Revealing our concept of 'order out of chaos' and 'organization on the go'</li>
            <li><strong>Waitlist signup:</strong> A focused CTA on a non-scrollable page</li>
          </ol>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            This approach allowed us to drum up interest, begin building accountability to potential users, and introduce our brand concept in an engaging way.
          </p>

          <a
            href="https://orgo-marketing.webflow.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-white font-bold text-base shadow-lg mb-12"
            style={{
              backgroundColor: brandColor,
              transition: 'all 0.3s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e63700';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = brandColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            View the teaser site →
          </a>

          <img src="/assets/case-studies/orgo-brand/teaser-site.png" alt="Initial teaser site screenshot" className="w-full mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            The site proved <strong>highly effective in capturing attention</strong>. We received <strong>numerous compliments</strong> and observed audible laughs during the text buildup, as well as <strong>'aha' moments</strong> when people realized the meaning behind Orgo. Over two months, we garnered <strong>over 300 signups</strong>, a satisfying result for our teaser site approach.
          </p>
        </section>

        {/* Expanded Teaser Site */}
        <section id="expanded-teaser" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Expanded teaser site</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            As we approached launch, we recognized the need to <strong>evolve our web presence</strong>. This new iteration had <strong>two primary objectives</strong>: provide <strong>more detailed information to our waitlist members</strong> and <strong>capture the interest of potential investors</strong>. While not actively fundraising, we aimed to <strong>establish a meaningful presence in the investment community</strong>. This expanded site allowed us to <strong>build upon our initial narrative and showcase more of Orgo's potential</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We established specific goals for this iteration of the site:
          </p>

          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse border border-[rgba(0,0,0,0.08)]">
              <thead>
                <tr className="bg-[#333]">
                  <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-white">Goal</th>
                  <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-white">Action plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Continue waitlist growth</td>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Maintain the signup form from the previous site as the primary CTA</td>
                </tr>
                <tr>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Articulate the problem</td>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Highlight the challenges of managing children's calendars, emphasizing the inefficiencies of current tools</td>
                </tr>
                <tr>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Introduce our solution</td>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Draw parallels between the identified problems and our solution, without revealing specific features or app screenshots</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            With these goals in mind, we focused on designing an impactful hero section, recognizing it as the most crucial element for driving conversions. We mocked up several options to find the most effective approach.
          </p>

          <img src="/assets/case-studies/orgo-brand/expanded-teaser-ideation.png" alt="Hero section ideation and mockups" className="w-full mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Eventually, one concept emerged as the clear winner:
          </p>

          <a
            href="https://orgo-marketing-pre-launch.webflow.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-white font-bold text-base shadow-lg mb-12"
            style={{
              backgroundColor: brandColor,
              transition: 'all 0.3s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e63700';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = brandColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            View the expanded teaser site →
          </a>

          <img src="/assets/case-studies/orgo-brand/expanded-teaser-final.png" alt="Final expanded teaser site design" className="w-full mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            This design resonated with our audience for several key reasons. The appealing color scheme caught viewers' attention, while a dynamic, rotating H1 headline maintained their interest. Our engaging storytelling approach effectively communicated our value proposition.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Below the hero, we structured the content to reinforce our message:
          </p>

          <ol className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] mb-12 list-decimal ml-8">
            <li><strong>Problem orientation:</strong> Clearly articulating the challenges in family scheduling</li>
            <li><strong>Limitations of current tools:</strong> Highlighting the shortcomings of existing solutions</li>
            <li><strong>Orgo's solutions:</strong> Drawing direct parallels between each limitation and how Orgo addresses it</li>
          </ol>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            This comprehensive approach deepened understanding among those already familiar with Orgo, clarifying both the problem we were addressing and our solution. The enhanced design and content structure served their purpose well, generating increased engagement and interest in our product during the development phase.
          </p>
        </section>

        {/* Launch Site */}
        <section id="launch-site" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Launch site</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            As we prepared to launch our app, we recognized the need for a website that would effectively showcase Orgo and drive downloads. We set three primary goals for this iteration:
          </p>

          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse border border-[rgba(0,0,0,0.08)]">
              <thead>
                <tr className="bg-[#333]">
                  <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-white">Goal</th>
                  <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-white">Action plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Drive downloads</td>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Implement direct download links, with QR codes for desktop users to easily access the mobile app</td>
                </tr>
                <tr>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Explain the problem</td>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Refine our problem statement based on feedback, maintaining the core message from our previous site while adding more specific details</td>
                </tr>
                <tr>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Provide app overview</td>
                  <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Lead with app functionality, showcasing specific screens and explaining key features</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            This approach aimed to create a seamless transition from website visitor to app user, while providing a clear understanding of Orgo's value proposition and functionality.
          </p>

          <a
            href="https://www.orgohq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-white font-bold text-base shadow-lg mb-12"
            style={{
              backgroundColor: brandColor,
              transition: 'all 0.3s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e63700';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = brandColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            View the current site →
          </a>

          <img src="/assets/case-studies/orgo-brand/launch-site.png" alt="Current launch site design" className="w-full" />
        </section>

        {/* Next Steps */}
        <section id="next-steps" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Next steps</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Our launch site is <strong>effectively driving downloads and showcasing Orgo</strong>. However, we're aware that for mobile apps, <strong>websites aren't typically the primary conversion driver</strong>. With this in mind, we're content with the site's current performance and are now <strong>focusing on other channels for user acquisition</strong>.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            We <strong>periodically review the site</strong> to ensure it <strong>aligns with our evolving product and brand</strong>. This includes <strong>updating app screenshots and feature descriptions</strong> to accurately reflect Orgo's current functionality. While no longer our primary focus, the website remains a <strong>valuable component of our overall marketing strategy</strong>, serving as a reliable information source for potential users and partners.
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
              <img src="/assets/case-studies/orgo/logo.svg" alt="Orgo" className="w-12 h-12" />
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
      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <div className="flex flex-col md:flex-row justify-between pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20 gap-8">
          <Link href="/archive/work/inkbench-ez-mode" className="flex flex-col items-start gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2">
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
              Inkbench EZ Mode
            </span>
          </Link>

          <Link href="/archive/work/newport-in-bloom" className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2">
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
              Newport in Bloom
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
