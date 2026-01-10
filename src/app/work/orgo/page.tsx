'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NumberBadge from '@/components/NumberBadge';
import CaseStudyHero from '@/components/CaseStudyHero';

export default function OrgoCaseAlt() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const brandColor = '#ff3e00';

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'background', title: 'Background' },
    { id: 'problem', title: 'The Problem' },
    { id: 'sketches-to-alpha', title: 'Ideation' },
    { id: 'alpha-launch', title: 'Alpha Testing' },
    { id: 'public-launch', title: 'Public Launch' },
    { id: 'pivot', title: 'The Pivot' },
    { id: 'iteration-cycle', title: 'Feature Evolution' },
    { id: 'current-product', title: 'Current Product' },
    { id: 'results', title: 'The Results' },
    { id: 'learned', title: 'What I Learned' },
    { id: 'next', title: "What's Next" }
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
        setActiveSection('next');
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
        title="Orgo"
        description="Building a scheduling engine for real life."
        gradientFrom="#ff3e00"
        gradientTo="#ff8c00"
        imageSrc="/assets/case-studies/orgo/hero.png"
        imageAlt="Orgo App"
        ctaText="Download the App"
        ctaHref="https://www.orgohq.com/download"
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
            width: 190px;
            flex-shrink: 0;
            position: sticky;
            top: 8rem;
            height: fit-content;
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm">
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">ROLE</h5>
              <p className="text-[#666] leading-relaxed">
                Co-Founder, Head of Product & Design
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TEAM</h5>
              <p className="text-[#666] leading-relaxed">
                Michael Garvey (me), Zoya Lehrer (CEO), Development team
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TIMELINE</h5>
              <p className="text-[#666] leading-relaxed">April 2023 - Present (2.5 years)</p>
            </div>
            <div>
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TOOLS</h5>
              <p className="text-[#666] leading-relaxed">
                Figma, React Native, Expo, Supabase, PostHog, RevenueCat, Adobe After Effects
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
              <div className="text-center p-4 lg:p-6 bg-[rgba(255,62,0,0.08)] border-2 border-[#ff3e00] shadow-sm">
                <div className="text-[3rem] font-bold text-[#ff3e00] mb-2">150</div>
                <p className="text-[1rem] text-[#666] leading-relaxed">Paying families in 2 months with &lt;$3K marketing spend</p>
              </div>
              <div className="text-center p-4 lg:p-6 bg-[rgba(255,62,0,0.08)] border-2 border-[#ff3e00] shadow-sm">
                <div className="text-[3rem] font-bold text-[#ff3e00] mb-2">4.8</div>
                <p className="text-[1rem] text-[#666] leading-relaxed">App Store rating from active users</p>
              </div>
              <div className="text-center p-4 lg:p-6 bg-[rgba(255,62,0,0.08)] border-2 border-[#ff3e00] shadow-sm">
                <div className="text-[3rem] font-bold text-[#ff3e00] mb-2">40%</div>
                <p className="text-[1rem] text-[#666] leading-relaxed">Free-to-paid conversion (3-4x industry standard)</p>
              </div>
              <div className="text-center p-4 lg:p-6 bg-[rgba(255,62,0,0.08)] border-2 border-[#ff3e00] shadow-sm">
                <div className="text-[3rem] font-bold text-[#ff3e00] mb-2">4x</div>
                <p className="text-[1rem] text-[#666] leading-relaxed">Daily opens per user - highly engaged</p>
              </div>
              <div className="text-center p-4 lg:p-6 bg-[rgba(255,62,0,0.08)] border-2 border-[#ff3e00] shadow-sm">
                <div className="text-[3rem] font-bold text-[#ff3e00] mb-2">2,500</div>
                <p className="text-[1rem] text-[#666] leading-relaxed">Users grown completely organically</p>
              </div>
              <div className="text-center p-4 lg:p-6 bg-[rgba(255,62,0,0.08)] border-2 border-[#ff3e00] shadow-sm">
                <div className="text-[3rem] font-bold text-[#ff3e00] mb-2">$10K</div>
                <p className="text-[1rem] text-[#666] leading-relaxed">ARR in first 2 months post-launch</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">MY CONTRIBUTION</h5>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              Product designer who taught myself React Native to contribute to the frontend. Led user research, designed all screens, built features and UI components, set up analytics infrastructure, managed app deployments, and handled brand and monetization strategy.
            </p>
          </div>
        </motion.section>

        {/* Background */}
        <section id="background" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Background</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            In March 2023, my boss's boss at Webster Bank quit to solve a problem. Zoya had been a tech exec for 20+ years but became a sports mom and realized the logistics were impossible.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            She tagged me in to help. I was 24, working on digital banking products for 800K users, and moonlighting seemed like a good challenge. We met at a Starbucks in Morristown, New Jersey with a developer and got started.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            My first question: "How do we know this is actually a problem?" Zoya had experienced it firsthand, but one person's frustration doesn't validate a market. We needed to talk to real families before building anything. So we got to work recruiting parents and setting up interviews.
          </p>
        </section>

        {/* The Problem */}
        <section id="problem" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The Problem</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Picture this: Your kid has soccer at 5:30 PM. The field is 20 minutes away. You want to arrive 10 minutes early. You need 15 minutes to get them ready. Suddenly, you're doing T-minus mental math to figure out you need to start at 4:45 PM.
          </p>
          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Now multiply that by three kids, across different activities, with different drivers, at different locations.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            30 million sports families in the US manage this complexity daily. They're juggling Google Calendar, team apps like TeamSnap, group texts, and carpools, all while simply trying to be on time.
          </p>

          <img src="/assets/case-studies/orgo/problem2.png" alt="The chaos of coordinating family schedules" className="w-full mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            I facilitated a focus group with 20 parents, and we individually interviewed 12 more.
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">What we heard from parents:</h3>

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

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8 mt-12">Five core pain points:</h3>

          <ol className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] mb-12 md:ml-6">
            {[
              { title: 'Coordinating people, places, and times', desc: 'across multiple kids and activities' },
              { title: 'Reverse-calculating departure times', desc: 'and forgetting prep steps' },
              { title: 'Adapting to constant changes', desc: '(weather, cancellations, carpool swaps)' },
              { title: 'Collaborating across families', desc: 'for carpools without endless texts' },
              { title: 'Maintaining an accurate view', desc: 'of what the day actually looks like' }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 mb-3 items-start">
                <NumberBadge number={i + 1} color={brandColor} />
                <div className="pt-[0.1rem]">
                  <strong className="text-[#333]">{item.title}</strong> {item.desc}
                </div>
              </li>
            ))}
          </ol>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            <strong className="text-[#333]">The core problem:</strong> Schedules live everywhere - emails, team apps, group texts, Google Calendar. No single tool brought it all together while handling prep time, travel time, early arrival, driver coordination, or the reality that you have to traverse space and time to actually execute on commitments.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
            <strong className="text-[#333]">The insight:</strong> People don't just need a calendar. They need a logistics engine that works backward from when things happen to when they need to act.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            We had our problem. Now we needed to build the solution.
          </p>
        </section>

        {/* Ideation */}
        <section id="sketches-to-alpha" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Ideation: Designing the Core Experience</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I started in FigJam, sketching the four core areas:
          </p>

          <ol className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] mb-12 list-decimal ml-6">
            <li><strong className="text-[#333]">Registration</strong> - Get people in fast</li>
            <li><strong className="text-[#333]">Crew Management</strong> - Who's in your family/circle</li>
            <li><strong className="text-[#333]">Activity Addition</strong> - The heart of the product</li>
            <li><strong className="text-[#333]">Calendar Views</strong> - See your day unfold realistically</li>
          </ol>

          <img src="/assets/case-studies/orgo/sketches.png" alt="Early sketches in FigJam" className="w-full mb-12 border border-[rgba(0,0,0,0.08)] shadow-md" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Then I moved to Figma to create detailed wireframes and user flows.
          </p>

          <img src="/assets/case-studies/orgo/wireframes.png" alt="Detailed wireframes in Figma" className="w-full mb-12" />

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">The First Big Decision: Activity Structure</h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            <strong>Traditional calendars ask:</strong> "What time does it start?"
          </p>
          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            <strong>We needed to ask:</strong> "When do you need to START PREPARING?"
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
            I designed events with multiple segments:
          </p>
          <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-12">
            <li><strong className="text-[#333]">Early arrival buffer</strong> (don't be late)</li>
            <li><strong className="text-[#333]">Travel time</strong> (auto-calculated from home)</li>
            <li><strong className="text-[#333]">Event time</strong> (the actual activity)</li>
          </ul>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            This meant building something fundamentally different from Google Calendar. It was riskier, but it solved the actual problem. Getting the activity addition screen right took three iterations - refining the structure, testing different UI approaches, and figuring out how much information to show without overwhelming users.
          </p>

          <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-20 md:gap-[2.5%]">
            {/* Iteration 1 */}
            <div className="flex-1 max-w-[300px] md:max-w-[700px] mx-auto md:mx-0">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="h-8 flex items-center">
                  <h4 className="text-[1.1rem] font-bold text-[#333]">Iteration</h4>
                </div>
                <NumberBadge number={1} color={brandColor} />
              </div>
              <img src="/assets/case-studies/orgo/iteration1.png" alt="Iteration 1 of the activity screen" className="w-full mb-4" />
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-8">
                <li>Early arrival buffer</li>
                <li>Role assignment (driving TO, AT, FROM)</li>
              </ul>
            </div>

            {/* Iteration 2 */}
            <div className="flex-1 max-w-[300px] md:max-w-[700px] mx-auto md:mx-0">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="h-8 flex items-center">
                  <h4 className="text-[1.1rem] font-bold text-[#333]">Iteration</h4>
                </div>
                <NumberBadge number={2} color={brandColor} />
              </div>
              <img src="/assets/case-studies/orgo/iteration2.png" alt="Iteration 2 of the activity screen" className="w-full mb-4" />
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-8">
                <li>Variant cards for recurring activities</li>
                <li>Transportation method selection</li>
              </ul>
            </div>

            {/* Iteration 3 */}
            <div className="flex-1 max-w-[300px] md:max-w-[700px] mx-auto md:mx-0">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="h-8 flex items-center">
                  <h4 className="text-[1.1rem] font-bold text-[#333]">Iteration</h4>
                </div>
                <NumberBadge number={3} color={brandColor} />
              </div>
              <img src="/assets/case-studies/orgo/iteration3.png" alt="Iteration 3 of the activity screen" className="w-full mb-4" />
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-8">
                <li>Prep time field</li>
                <li>Redesigned timing UI</li>
                <li>Notes field</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Alpha Testing */}
        <section id="alpha-launch" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">October 2023: Alpha Testing</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            We launched to 25 users via Expo (not even TestFlight yet - they had to scan QR codes to download). The alpha group used the app for a couple of weeks, and we had a GroupMe where they could report bugs, feedback, and issues.
          </p>

          <img src="/assets/case-studies/orgo/alpha.png" alt="Alpha version of Orgo" className="w-full mb-12 shadow-lg" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            <strong className="text-[#333]">The feedback was swift and humbling:</strong>
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Users understood the concept but kept asking: <em>"Can I import my Google Calendar?"</em> and <em>"How do I change the default location?"</em>
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Two critical flaws emerged:
          </p>

          <div className="space-y-8 mb-12">
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.4rem] font-bold text-[#333] mb-4">Flaw #1: No Integration</h4>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                People already had their schedules in Google Calendar and TeamSnap. Asking them to manually re-enter everything was a non-starter.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.4rem] font-bold text-[#333] mb-4">Flaw #2: Assumed Everyone Lives at Home</h4>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Our events assumed origin and return were always "home." But real life is messier - pickup from school, going straight to the next activity, carpooling from a friend's house.
              </p>
            </div>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            <strong className="text-[#333]">The hard truth:</strong> We'd built for our idealized version of the problem, not the messy reality of how families actually live.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            We went back to the drawing board. Between October 2023 and April 2024, I redesigned the activity structure to support flexible origin and return locations. Users could now go from school → soccer → home, not just home → soccer → home.
          </p>

          <div className="flex justify-center mb-12">
            <img src="/assets/case-studies/orgo/post-alpha-activity.png" alt="Redesigned activity screen with origin and return locations" className="max-w-[300px] w-full" />
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We also knew Google Calendar integration was critical - it was the #1 request. But we considered Google a fast follower. If we waited to build everything perfectly, someone else would launch first. So we shipped what we had and planned to iterate fast.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            Between alpha and public launch, there was significant under-the-hood work to get the app production-ready for Apple's App Store - setting up TestFlight for beta distribution, implementing App Store Connect workflows, and ensuring compliance with Apple's review guidelines.
          </p>
        </section>

        {/* Public Launch */}
        <section id="public-launch" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">April 2024: Public Launch</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We pushed a public App Store release with the updated activity structure. Users came in from our waitlist - 500 registered users.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            For 8 months, we iterated within the constraints of our initial platform. Our developers were talented but moonlighting like we were, which meant limited bandwidth for the ambitious features users wanted.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            By January 2025, we faced a strategic choice: continue incremental improvements or rebuild the foundation to unlock faster iteration. We chose the latter.
          </p>
        </section>

        {/* The Pivot */}
        <section id="pivot" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The Pivot: Rebuilding Everything</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We converted from LLC to C-Corp, restacked the cap table, and raised $80K from angel investors. We brought on new developers - a full-time development team in Brazil - and started a complete rewrite.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            <strong className="text-[#333]">May-July 2025:</strong> Three months of ground-up rebuilding. We migrated from Firebase to Supabase, rewrote the entire codebase, and professionalized the infrastructure.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
            During this rebuild, I took on the operational work:
          </p>
          <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-8">
            <li>Set up RevenueCat for monetization</li>
            <li>Implemented PostHog for analytics</li>
            <li>Configured iOS SKAN tracking for Meta ads</li>
            <li>Managed app deployments</li>
          </ul>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            The new foundation unlocked the speed we needed to build and iterate.
          </p>
        </section>

        {/* Iteration Cycle */}
        <section id="iteration-cycle" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Feature Evolution: Building What Mattered</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Once we had a solid foundation, we moved fast. Here's how the product evolved through user feedback:
          </p>

          {/* Round 1 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                <NumberBadge number={1} color={brandColor} />
                <div className="flex items-center md:h-8">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666]">Round 1: Calendar Integration (June 2025)</h5>
                </div>
              </div>
              <div className="md:ml-[56px]">
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The problem:</strong> Manual entry was limiting adoption.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The solution:</strong> Leveraged existing APIs, webhooks (Google), and ICS link parsing to automatically translate 2D calendar events into our 3D logistics model - capturing not just when events happen, but how families actually move through their day.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                  <strong className="text-[#333]">Why it mattered:</strong> This was the #1 user request. It went from "nice idea" to "actively using daily."
                </p>
              </div>
              <div className="flex justify-center">
                <img src="/assets/case-studies/orgo/import.png" alt="Calendar import integration" className="max-w-[400px] w-full" />
              </div>
            </div>
          </div>

          {/* Round 2 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                <NumberBadge number={2} color={brandColor} />
                <div className="flex items-center md:h-8">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666]">Round 2: Monetization Strategy (September 2025)</h5>
                </div>
              </div>
              <div className="md:ml-[56px]">
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The problem:</strong> App was entirely free until August. First attempt at monetization (free trial, no credit card) had only 10% conversion.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The solution:</strong> Switched to upfront payment in September. Users pay $6.95/month from day one, with clear value proposition.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                  <strong className="text-[#333]">Why it mattered:</strong> Conversion jumped from 10% to 40% - 4x better than before, and 3-4x industry standard. Got 150 paid families in first 2 months.
                </p>
              </div>
              <div className="flex justify-center">
                <img src="/assets/case-studies/orgo/monetization.png" alt="Monetization paywall" className="max-w-[300px] w-full" />
              </div>
            </div>
          </div>

          {/* Round 3 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                <NumberBadge number={3} color={brandColor} />
                <div className="flex items-center md:h-8">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666]">Round 3: Import Rules (October 2025)</h5>
                </div>
              </div>
              <div className="md:ml-[56px]">
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The problem:</strong> When 50 events imported from Google, they all defaulted to the user. But "Tommy's Soccer Practice" should auto-assign to Tommy.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The solution:</strong> Smart import rules that let users set defaults (participants, drivers, locations) + AI name detection in event titles.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                  <strong className="text-[#333]">Why it mattered:</strong> Turned 2 hours of setup into 5 minutes.
                </p>
              </div>
              <div className="flex justify-center">
                <img src="/assets/case-studies/orgo/import-rules.png" alt="Smart import rules with AI name detection" className="max-w-[630px] w-full" />
              </div>
            </div>
          </div>

          {/* Round 4 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                <NumberBadge number={4} color={brandColor} />
                <div className="flex items-center md:h-8">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666]">Round 4: Multi-Stop Trips (September 2025)</h5>
                </div>
              </div>
              <div className="md:ml-[56px]">
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The problem:</strong> Real life has stops. "Grab Starbucks on the way" or "Pick up Emma before practice."
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The solution:</strong> Let users add multiple stops to any trip, with time buffers for each.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                  <strong className="text-[#333]">Why it mattered:</strong> Finally reflected how people actually move through their day.
                </p>
              </div>
              <div className="flex justify-center">
                <img src="/assets/case-studies/orgo/multi-stop.png" alt="Multi-stop trip functionality" className="max-w-[630px] w-full" />
              </div>
            </div>
          </div>

          {/* Round 5 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-8">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                <NumberBadge number={5} color={brandColor} />
                <div className="flex items-center md:h-8">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666]">Round 5: Other Crews (November 2025)</h5>
                </div>
              </div>
              <div className="md:ml-[56px]">
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The problem:</strong> Carpooling required coordinating across families via endless texts.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                  <strong className="text-[#333]">The solution:</strong> Connect with other families ("crews") in the app. Assign drivers from other crews, they get notified, confirm or decline.
                </p>
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                  <strong className="text-[#333]">Why it mattered:</strong> Eliminated the "who's driving?" group text chaos.
                </p>
              </div>
              <div className="flex justify-center">
                <img src="/assets/case-studies/orgo/other-crews.png" alt="Other crews carpooling feature" className="max-w-[630px] w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Current Product */}
        <section id="current-product" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Current Product: The Full Experience</h2>

          <video
            src="/assets/case-studies/orgo/promo.mp4"
            className="w-full mb-2"
            controls
            playsInline
          />
          <p className="text-[0.9rem] text-[#999] italic mb-12">
            Video created from scratch in After Effects, including 3D phone model
          </p>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">What makes Orgo different:</h3>

          <div className="space-y-6 mb-12">
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff3e00]">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                  <path d="M16 3v4" />
                  <path d="M8 3v4" />
                  <path d="M4 11h16" />
                  <path d="M11 15h1" />
                  <path d="M12 15v3" />
                </svg>
                <h4 className="text-[1.2rem] font-bold text-[#333]">For Scheduling</h4>
              </div>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-6">
                <li>Auto-calculated travel times using actual routes</li>
                <li>Prep time tracked separately from event time</li>
                <li>Early arrival buffers (show up 15 min before start)</li>
                <li>Multi-stop routing for errands and carpools</li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff3e00]">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
                <h4 className="text-[1.2rem] font-bold text-[#333]">For Coordination</h4>
              </div>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-6">
                <li>Driver assignment for pickup, dropoff, and staying</li>
                <li>Cross-family crew connections for carpooling</li>
                <li>Smart notifications (only when you need to act)</li>
                <li>Three views: Calendar, Agenda, Text summary</li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff3e00]">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                <h4 className="text-[1.2rem] font-bold text-[#333]">For Accuracy</h4>
              </div>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-6">
                <li>Import rules for bulk setup from existing calendars</li>
                <li>AI name detection in event titles</li>
                <li>Weather integrated per event location</li>
                <li>Conflict detection on a per-person basis</li>
              </ul>
            </div>
          </div>

          <a
            href="https://www.orgohq.com/download"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-8 py-4 text-white font-bold text-base shadow-lg"
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
            Download the App
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </section>

        {/* Results */}
        <section id="results" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The Results</h2>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">From Launch to Traction</h3>

          <div className="space-y-8 mb-12">
            <div className="p-6 bg-[#fafafa] border-l-8 border-[#ff3e00] shadow-sm">
              <p className="text-[0.9rem] font-semibold text-[#ff3e00] mb-2">April 2024</p>
              <h4 className="text-[1.2rem] font-bold mb-3 text-[#333]">Public Launch</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-6">
                <li>500 registered users in first few months, 100% organic</li>
                <li>4.8 App Store rating</li>
                <li>Feature requests flooding in</li>
              </ul>
            </div>

            <div className="p-6 bg-[#fafafa] border-l-8 border-[#ff3e00] shadow-sm">
              <p className="text-[0.9rem] font-semibold text-[#ff3e00] mb-2">January 2025</p>
              <h4 className="text-[1.2rem] font-bold mb-3 text-[#333]">Platform Rewrite</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-6">
                <li>Transitioned development teams</li>
                <li>Rebuilt on stronger technical foundation</li>
                <li>3 months to ship V2 with calendar integrations</li>
              </ul>
            </div>

            <div className="p-6 bg-[#fafafa] border-l-8 border-[#ff3e00] shadow-sm">
              <p className="text-[0.9rem] font-semibold text-[#ff3e00] mb-2">August 2025</p>
              <h4 className="text-[1.2rem] font-bold mb-3 text-[#333]">Monetization Launch</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-6">
                <li>Switched from no-credit-card trial → upfront payment</li>
                <li>Conversion jumped from 10% → 40%</li>
                <li>Started first paid marketing campaigns</li>
              </ul>
            </div>

            <div className="p-6 bg-[#fafafa] border-l-8 border-[#ff3e00] shadow-sm">
              <p className="text-[0.9rem] font-semibold text-[#ff3e00] mb-2">January 2026</p>
              <h4 className="text-[1.2rem] font-bold mb-3 text-[#333]">Current</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-6">
                <li>150 paid families in first 2 months ($6.95/month = ~$10K ARR)</li>
                <li>1,100 weekly active users</li>
                <li>4x daily opens per user (highly habitual)</li>
                <li>400K notifications sent from 85K created events</li>
                <li>2,500 beta users still active (grandfathered free)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Marketing Efficiency</h3>
          <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-12">
            <li>$50.61 CAC with 30% install-to-paid (3-4x industry standard)</li>
            <li>Grew organically to 2,500 users before any paid marketing</li>
            <li>Started paid ads in August 2025, now at 250K+ monthly impressions</li>
          </ul>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">What Users Say:</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Orgo allowed me to have a single version of the truth.", author: "Brosseau Family" },
              { quote: "I never thought that type of reminder would be so useful until now.", author: "Ammlswcc" },
              { quote: "My husband and I know exactly what is happening each day!", author: "Kstap4" }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg key={starIndex} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#ff3e00" stroke="#ff3e00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[1.1rem] text-[#333] italic mb-6 leading-relaxed">"{item.quote}"</p>
                <p className="text-sm text-[#666] font-bold">— {item.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What I Learned */}
        <section id="learned" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">What I Learned</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">1. Start with validation, not vision</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] ml-6">
                Running that first focus group was the best decision we made. It prevented us from building in a vacuum.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">2. Users will tell you what's broken - listen</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] ml-6">
                Every major feature came from user feedback. Google Calendar integration, origin/return locations, import rules - all user-driven.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">3. Being designer + developer = better product decisions</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] ml-6">
                Learning React Native let me make real-time tradeoffs between ideal design and technical feasibility. No "hand it off and hope" friction.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">4. Bootstrapping requires strategic tradeoffs</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] ml-6">
                Working unpaid for 2.5 years while freelancing taught me to ruthlessly prioritize. Limited time meant every feature decision had to count. When we finally raised funding, the difference in velocity was significant.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">5. Operational skills matter as much as design skills</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] ml-6">
                Setting up analytics, monetization, ad tracking, database queries - these aren't "design" but they're essential to shipping real products.
              </p>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section id="next" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">What's Next</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            We're not done. The vision is bigger than sports families.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Near term:</h3>
              <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
                <li>Deeper AI features (suggest optimal carpool routes, predict conflicts)</li>
                <li>B2B expansion into real estate, caregiving, enterprise teams</li>
                <li>Continued funnel optimization to reach profitability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">Long term:</h3>
              <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
                <li>Become the scheduling infrastructure for any team coordinating people, places, and time</li>
                <li>$16.3B TAM across sports families, real estate, and caregiving</li>
              </ul>
            </div>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mt-12">
            The core insight remains: Calendars should reflect reality, not just record events. We built that, and we're continuing to refine it as we grow.
          </p>
        </section>
        </main>

        {/* Sidebar */}
        <aside className="w-[190px] flex-shrink-0 sticky top-32 h-fit sidebar pb-32">
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
      <div className="mx-auto px-12 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <style jsx>{`
          @media (max-width: 767px) {
            div {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
          }
        `}</style>
        <div className="flex flex-col md:flex-row justify-end pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20">
          <Link href="/work/webster" className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2">
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
