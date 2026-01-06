'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NumberBadge from '@/components/NumberBadge';
import CaseStudyHero from '@/components/CaseStudyHero';

export default function OrgoCaseAlt() {
  const [activeSection, setActiveSection] = useState('glance');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const brandColor = '#ff3e00';

  const sections = [
    { id: 'glance', title: 'At a Glance' },
    { id: 'problem', title: 'The Problem' },
    { id: 'how-i-got-here', title: 'How I Got Here' },
    { id: 'validation', title: 'Validation' },
    { id: 'sketches-to-alpha', title: 'Sketches to Alpha' },
    { id: 'alpha-launch', title: 'Alpha Launch' },
    { id: 'public-launch', title: 'Public Launch' },
    { id: 'pivot', title: 'The Pivot' },
    { id: 'iteration-cycle', title: 'Iteration Cycle' },
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
        ctaText="Download on the App Store"
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
          @media (max-width: 767px) {
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
        {/* At a Glance */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          id="glance"
          className="mb-32 scroll-mt-32"
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">At a Glance</h2>

          <div className="grid grid-cols-2 gap-6 mb-12 p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm">
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

          <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">IMPACT</h5>
            <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8]">
              <li><strong className="text-[#333]">150 paying families</strong> in 2 months of monetization, $10K ARR</li>
              <li><strong className="text-[#333]">4.8 App Store rating</strong> from 1,100+ weekly active users</li>
              <li><strong className="text-[#333]">40% free-to-paid conversion</strong> (3-4x industry standard)</li>
              <li><strong className="text-[#333]">4x daily opens</strong> per user - highly engaged</li>
              <li><strong className="text-[#333]">Grew to 2,500 users</strong> completely organically before any paid marketing</li>
            </ul>
          </div>

          <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm mb-12">
            <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">MY CONTRIBUTION</h5>
            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              Solo product designer who taught himself React Native to build it. Led all user research, designed every screen, coded the frontend, set up analytics infrastructure, managed app deployments, and handled everything from brand to monetization strategy.
            </p>
          </div>

          <div className="w-full h-[500px] bg-gradient-to-br from-gray-200 to-gray-300" />
        </motion.section>

        {/* The Problem */}
        <section id="problem" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The Problem</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Picture this: Your kid has soccer at 5:30 PM. The field is 20 minutes away. You want to arrive 10 minutes early. You need 15 minutes to get them ready. Suddenly you're doing mental math to figure out you need to start at 4:45 PM.
          </p>
          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Now multiply that by three kids, across different activities, with different drivers, at different locations.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            <strong className="text-[#333]">30 million sports families</strong> in the US are drowning in this complexity. They're juggling Google Calendar, team apps like TeamSnap, group texts, and mental math—all while trying not to be late.
          </p>

          <div className="w-full h-[350px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">What we heard from parents:</h3>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { quote: "When I put a 10:30 in my calendar, it's not actually a 10:30—we have to leave at 9:45.", author: "Adam, dad of 2" },
              { quote: "I'm not a teleporting unicorn, but my calendar thinks I am.", author: "Zoya, mom of 3" },
              { quote: "The only enjoyable part of this is when an activity gets cancelled.", author: "Katie, mom of 2" }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
                <p className="text-[1.1rem] text-[#333] italic mb-6 leading-relaxed">"{item.quote}"</p>
                <p className="text-sm text-[#666] font-bold">— {item.author}</p>
              </div>
            ))}
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            <strong className="text-[#333]">The core problem:</strong> Calendars track when things happen, not when you need to act. No tool handled prep time, travel time, early arrival, driver coordination, or the reality that your 6-year-old can't teleport between locations.
          </p>
        </section>

        {/* How I Got Here */}
        <section id="how-i-got-here" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">How I Got Here</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            In March 2023, my boss's boss at Webster Bank quit to solve this problem. Zoya had been a tech exec for 20+ years but became a sports mom and realized the logistics were impossible.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            She asked if I wanted to help build something—unpaid, nights and weekends. I was 24, working on digital banking products for 800K users, and ready for a new challenge. I said yes.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We met at a Starbucks in Morristown, New Jersey with a developer named Mike. My first question: "How do we know this is actually a problem?"
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            <strong className="text-[#333]">I refused to build anything without validation.</strong>
          </p>
        </section>

        {/* Validation */}
        <section id="validation" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Validation: Talking to 20+ Families</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            I ran a focus group at Zoya's house with 12 parents. Then Zoya and I interviewed 20 more individually.
          </p>

          <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">The five pain points we heard repeatedly:</h3>

          <ol className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] mb-12">
            {[
              { title: 'Coordinating people, places, and times', desc: 'across multiple kids and activities' },
              { title: 'Reverse-calculating departure times', desc: 'and forgetting prep steps' },
              { title: 'Adapting to constant changes', desc: '(weather, cancellations, carpool swaps)' },
              { title: 'Collaborating across families', desc: 'for carpools without endless texts' },
              { title: 'Maintaining an accurate view', desc: 'of what the day actually looks like' }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <NumberBadge number={i + 1} color={brandColor} />
                <div className="pt-1">
                  <strong className="text-[#333]">{item.title}</strong> {item.desc}
                </div>
              </li>
            ))}
          </ol>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
            <strong className="text-[#333]">The insight:</strong> People don't just need a calendar. They need a <em>logistics engine</em> that works backward from when things happen to when they need to act.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            We had our problem. Now we needed to build the solution.
          </p>
        </section>

        {/* From Sketches to Alpha */}
        <section id="sketches-to-alpha" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">From Sketches to Alpha: Designing the Core Experience</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            I started in FigJam, sketching the four core areas:
          </p>

          <ol className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] mb-12 list-decimal ml-6">
            <li><strong className="text-[#333]">Registration</strong> - Get people in fast</li>
            <li><strong className="text-[#333]">Crew Management</strong> - Who's in your family/circle</li>
            <li><strong className="text-[#333]">Activity Addition</strong> - The heart of the product</li>
            <li><strong className="text-[#333]">Calendar Views</strong> - See your day unfold realistically</li>
          </ol>

          <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Then I moved to Figma to create detailed wireframes and user flows.
          </p>

          <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">The First Big Decision: Activity Structure</h3>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            Traditional calendars ask: "What time does it start?"
          </p>
          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We needed to ask: "When do you need to START PREPARING?"
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
            I designed events with multiple segments:
          </p>
          <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-12">
            <li><strong className="text-[#333]">Prep time</strong> (get ready at home)</li>
            <li><strong className="text-[#333]">Early arrival buffer</strong> (don't be late)</li>
            <li><strong className="text-[#333]">Travel time</strong> (auto-calculated)</li>
            <li><strong className="text-[#333]">Event time</strong> (the actual activity)</li>
            <li><strong className="text-[#333]">Return trip</strong> (home or next location)</li>
          </ul>

          <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            This meant building something fundamentally different from Google Calendar. It was riskier, but it solved the actual problem.
          </p>
        </section>

        {/* Alpha Launch */}
        <section id="alpha-launch" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">October 2023: Alpha Launch & Brutal Feedback</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We launched to 25 users via Expo (not even TestFlight yet—they had to scan QR codes to download).
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            <strong className="text-[#333]">The feedback was swift and humbling:</strong>
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Users loved the concept but kept asking: <em>"Where's my Google Calendar data?"</em> and <em>"How do I change the default location?"</em>
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
                Our events assumed origin and return were always "home." But real life is messier—pickup from school, going straight to the next activity, carpooling from a friend's house.
              </p>
            </div>
          </div>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            <strong className="text-[#333]">The hard truth:</strong> We'd built for our idealized version of the problem, not the messy reality of how families actually live.
          </p>
        </section>

        {/* Public Launch */}
        <section id="public-launch" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">April 2024: Public Launch (And Things Got Worse)</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We pushed a public App Store release. Users flooded in organically—500 registered users, all from word of mouth.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            For 8 months, we iterated within the constraints of our initial platform. Our developers were talented but moonlighting like we were, which meant limited bandwidth for the ambitious features users wanted.
          </p>

          <div className="w-full h-[300px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            By January 2025, we faced a strategic choice: continue incremental improvements or rebuild the foundation to unlock faster iteration. We chose the latter.
          </p>
        </section>

        {/* The Pivot */}
        <section id="pivot" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The Pivot: Rebuilding Everything</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            We converted from LLC to C-Corp and raised $80K from angel investors. We immediately hired a development team in Brazil and started a complete rewrite.
          </p>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
            <strong className="text-[#333]">May-July 2025:</strong> Three months of ground-up rebuilding.
          </p>
          <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-12">
            <li>Firebase → Supabase (I taught myself SQL to query the database directly)</li>
            <li>Everything hardened, optimized, professionalized</li>
          </ul>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
            <strong className="text-[#333]">I became the operational glue:</strong>
          </p>
          <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-12">
            <li>Set up RevenueCat for monetization</li>
            <li>Implemented PostHog for analytics</li>
            <li>Configured iOS SKAN tracking for Meta ads</li>
            <li>Handled every app deployment</li>
            <li>Built the financial model</li>
            <li>Created the pitch deck</li>
          </ul>

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            All while freelancing on the side to pay rent.
          </p>
        </section>

        {/* Iteration Cycle */}
        <section id="iteration-cycle" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The Iteration Cycle: Building the Features That Mattered</h2>

          <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
            Once we had a solid foundation, we moved fast. Here's how the product evolved through user feedback:
          </p>

          {/* Round 1 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <NumberBadge number={1} color={brandColor} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666] mb-6 leading-[40px]">Round 1: Adding Origin & Return Locations (April 2024)</h5>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                    <strong className="text-[#333]">The problem:</strong> Events assumed everything started and ended at home.
                  </p>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                    <strong className="text-[#333]">The solution:</strong> Let users specify origin, destination, and return addresses for each trip segment.
                  </p>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                    <strong className="text-[#333]">Why it mattered:</strong> Parents needed to go from school → soccer → home, not just home → soccer → home.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Round 2 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <NumberBadge number={2} color={brandColor} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666] mb-6 leading-[40px]">Round 2: Calendar Integration (June 2025)</h5>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                    <strong className="text-[#333]">The problem:</strong> Manual entry was killing adoption.
                  </p>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                    <strong className="text-[#333]">The solution:</strong> Deep integration with Google Calendar, Apple Calendar, and TeamSnap. Events flow in automatically.
                  </p>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                    <strong className="text-[#333]">Why it mattered:</strong> This was the #1 user request. It went from "nice idea" to "actively using daily."
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Round 3 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <NumberBadge number={3} color={brandColor} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666] mb-6 leading-[40px]">Round 3: Monetization Strategy (September 2025)</h5>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                    <strong className="text-[#333]">The problem:</strong> App was entirely free until August. First attempt at monetization (free trial, no credit card) had only 10% conversion.
                  </p>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                    <strong className="text-[#333]">The solution:</strong> Switched to upfront payment in September. Users pay $6.95/month from day one, with clear value proposition.
                  </p>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                    <strong className="text-[#333]">Why it mattered:</strong> Conversion jumped from 10% to 40%—4x better than before, and 3-4x industry standard. Got 150 paid families in first 2 months.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Round 4 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <NumberBadge number={4} color={brandColor} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666] mb-6 leading-[40px]">Round 4: Import Rules (October 2025)</h5>
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
              </div>
              <div className="flex justify-center">
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Round 5 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <NumberBadge number={5} color={brandColor} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666] mb-6 leading-[40px]">Round 5: Multi-Stop Trips (September 2025)</h5>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                    <strong className="text-[#333]">The problem:</strong> Real life has stops. "Grab Starbucks on the way" or "Pick up Emma before practice."
                  </p>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4">
                    <strong className="text-[#333]">The solution:</strong> Let users add multiple stops to any trip, with time buffers for each.
                  </p>
                  <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-8">
                    <strong className="text-[#333]">Why it mattered:</strong> Finally reflected how people <em>actually</em> move through their day.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Round 6 */}
          <div className="mb-16">
            <div className="bg-white border border-[rgba(0,0,0,0.08)] shadow-md p-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <NumberBadge number={6} color={brandColor} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold tracking-widest uppercase text-[#666] mb-6 leading-[40px]">Round 6: Other Crews (November 2025)</h5>
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
              </div>
              <div className="flex justify-center">
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Current Product */}
        <section id="current-product" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Current Product: The Full Experience</h2>

          <div className="w-full h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-12">
            <span className="text-white/20 text-2xl font-bold">Video Placeholder</span>
          </div>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">What makes Orgo different:</h3>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.2rem] font-bold text-[#333] mb-4">For Scheduling</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6]">
                <li>• Auto-calculated travel times using actual routes</li>
                <li>• Prep time tracked separately from event time</li>
                <li>• Early arrival buffers (show up 15 min before start)</li>
                <li>• Multi-stop routing for errands and carpools</li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.2rem] font-bold text-[#333] mb-4">For Coordination</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6]">
                <li>• Driver assignment for pickup, dropoff, and staying</li>
                <li>• Cross-family crew connections for carpooling</li>
                <li>• Smart notifications (only when you need to act)</li>
                <li>• Three views: Calendar, Agenda, Text summary</li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.2rem] font-bold text-[#333] mb-4">For Accuracy</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6]">
                <li>• Import rules for bulk setup from existing calendars</li>
                <li>• AI name detection in event titles</li>
                <li>• Weather integrated per event location</li>
                <li>• Conflict detection on a per-person basis</li>
              </ul>
            </div>
          </div>

          <div className="w-full h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

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

        {/* Results */}
        <section id="results" className="mb-32 scroll-mt-32">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">The Results</h2>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">From Launch to Traction</h3>

          <div className="space-y-6 mb-12">
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.2rem] font-bold text-[#333] mb-3">April 2024 - Public Launch</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6]">
                <li>• 500 registered users in first few months, 100% organic</li>
                <li>• 4.8 App Store rating</li>
                <li>• Feature requests flooding in</li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.2rem] font-bold text-[#333] mb-3">January 2025 - Platform Rewrite</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6]">
                <li>• Transitioned development teams</li>
                <li>• Rebuilt on stronger technical foundation</li>
                <li>• 3 months to ship V2 with calendar integrations</li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.2rem] font-bold text-[#333] mb-3">August 2025 - Monetization Launch</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6]">
                <li>• Switched from no-credit-card trial → upfront payment</li>
                <li>• Conversion jumped from 10% → 40%</li>
                <li>• Started first paid marketing campaigns</li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h4 className="text-[1.2rem] font-bold text-[#333] mb-3">Current (January 2026)</h4>
              <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6]">
                <li>• 150 paid families in first 2 months ($6.95/month = ~$10K ARR)</li>
                <li>• 1,100 weekly active users</li>
                <li>• 4x daily opens per user (highly habitual)</li>
                <li>• 400K notifications sent from 85K created events</li>
                <li>• 2,500 beta users still active (grandfathered free)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Marketing Efficiency</h3>
          <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-12">
            <li>$50.61 CAC with 30% install-to-paid (3-4x industry standard)</li>
            <li>Grew organically to 2,500 users before any paid marketing</li>
            <li>Started paid ads in August 2025, now at 250K+ monthly impressions</li>
          </ul>

          <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

          <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">What Users Say:</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Orgo allowed me to have a single version of the truth.", author: "Brosseau Family, 5-star review" },
              { quote: "I never thought that type of reminder would be so useful until now.", author: "Ammlswcc, 5-star review" },
              { quote: "My husband and I know exactly what is happening each day!", author: "Kstap4, 5-star review" }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
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
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Running that first focus group was the best decision we made. It prevented us from building in a vacuum.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">2. Users will tell you what's broken—listen</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Every major feature came from user feedback. Google Calendar integration, origin/return locations, import rules—all user-driven.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">3. Being designer + developer = better product decisions</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Learning React Native let me make real-time tradeoffs between ideal design and technical feasibility. No "hand it off and hope" friction.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">4. Bootstrapping requires strategic tradeoffs</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Working unpaid for 2.5 years while freelancing taught me to ruthlessly prioritize. Limited time meant every feature decision had to count. When we finally raised funding, the difference in velocity was night and day.
              </p>
            </div>

            <div>
              <h3 className="text-[1.4rem] font-bold text-[#333] mb-4">5. Operational skills matter as much as design skills</h3>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Setting up analytics, monetization, ad tracking, database queries—these aren't "design" but they're essential to shipping real products.
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

          <div className="w-full h-[300px] bg-gradient-to-br from-gray-200 to-gray-300 mb-12" />

          <p className="text-[1.15rem] text-[#666] leading-[1.8]">
            But the core insight remains: <strong className="text-[#333]">Calendars should reflect reality, not just record events.</strong> That's what we built. That's what users love.
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
      <div className="mx-auto px-12 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <style jsx>{`
          @media (max-width: 767px) {
            div {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
          }
        `}</style>
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
