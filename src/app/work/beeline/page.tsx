'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyHero from '@/components/CaseStudyHero';

export default function Beeline() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const brandColor = '#003049';

  const sections = [
    { id: 'summary', title: 'Summary' },
    { id: 'background', title: 'Background' },
    { id: 'final-product', title: 'Final product' },
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

      <CaseStudyHero
        title="Beeline"
        description="A GPS for your grocery shopping experience."
        gradientFrom="#fec106b3"
        gradientTo="#fea104e6"
        imageSrc="/assets/case-studies/beeline/hero.png"
        imageAlt="Beeline App"
        textColor="#003049"
        ctaText="Figma prototype"
        ctaHref="https://www.figma.com/proto/ZX4MmVGBeE0NCMPxVL73CB/Beeline---Portfolio-Prototype?page-id=554%3A9732&node-id=554%3A11595&viewport=437%2C646%2C0.27&scaling=scale-down&starting-point-node-id=554%3A11595"
        ctaColor="#003049"
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
                  Me (researcher, designer)
                </p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TIMELINE</h5>
                <p className="text-[#666] leading-relaxed">February - March 2022</p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TASK</h5>
                <p className="text-[#666] leading-relaxed">
                  Design an end-to-end mobile app to make grocery shopping easier and more efficient.
                </p>
              </div>
              <div>
                <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">TOOLS & LANGUAGES</h5>
                <p className="text-[#666] leading-relaxed">
                  Figma, Adobe Illustrator, Lucidchart
                </p>
              </div>
            </div>
          </motion.section>

          {/* Background */}
          <section id="background" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Background</h2>
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">A hypothesis about grocery shopping</h3>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              <strong>Grocery shopping can be a bit of a hassle</strong>, but have you ever wondered <strong>why</strong> that is? I set out to find the <strong>root of the problem</strong> and see if I could make the experience a little more pleasant.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              My <strong>hypothesis</strong> was that the <strong>difficulty of finding items in the store</strong> was a big part of the problem. So, I set out to <strong>validate this hypothesis</strong> and <strong>create a solution</strong> that would make that aspect of grocery shopping a breeze.
            </p>
          </section>

          {/* Final Product */}
          <section id="final-product" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Final product and results</h2>
            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Frictionless food finding</h3>

            <a
              href="https://www.figma.com/proto/ZX4MmVGBeE0NCMPxVL73CB/Beeline---Portfolio-Prototype?page-id=554%3A9732&node-id=554%3A11595&viewport=437%2C646%2C0.27&scaling=scale-down&starting-point-node-id=554%3A11595"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-white font-bold text-base shadow-lg mb-12"
              style={{
                backgroundColor: brandColor,
                transition: 'all 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#002237';
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = brandColor;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Figma prototype →
            </a>

            <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 mb-12"></div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              In this example, I have to do my <strong>Thanksgiving shopping at Stop and Shop</strong>. I've already made a list, and I'm in the store, but <strong>I'm having trouble finding the flour.</strong> I use the app to look at the store map to <strong>find that item's location.</strong>
            </p>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">RESULTS</h5>
              <ul className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
                <li><strong>Real-time item information.</strong> See and mark whether an item is in stock and access a complete nutrition label.</li>
                <li><strong>Store map.</strong> Can't find an item? Just look at the map. It'll tell you exactly where it is.</li>
                <li><strong>Your list, mapped out.</strong> See where all the items on your list are on an accurate store map.</li>
                <li><strong>The most efficient path.</strong> The app will show you the most efficient path to gather all the items on your list, so you can get in and out of the store quickly.</li>
              </ul>
            </div>
          </section>

          {/* Research */}
          <section id="research" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Research</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              This was a <strong>generative research process</strong> - I didn't quite know if people hated grocery shopping or, if they did, why people hated it. So, I came up with a <strong>set of questions</strong> to generate some answers.
            </p>

            <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-12">
              <li>Is finding items in stores difficult? (<strong>problem validation</strong>)</li>
              <li>How do people <strong>find things in stores they've never been in</strong>?</li>
              <li>(How) Do <strong>other apps/stores</strong> solve the problem?</li>
              <li>Do people use <strong>shopping lists</strong>? If so, how?</li>
              <li>What, in stores, <strong>helps shoppers find items</strong>?</li>
            </ul>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">User interviews</h3>
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Gleaning insights through interviews</h4>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              First, I needed to <strong>validate the problem</strong>. I did this by <strong>interviewing potential users</strong>: those who go grocery shopping.
            </p>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              It turns out <strong>people generally dislike grocery shopping</strong>, and their most significant pain point is <strong>when they can't find something</strong>. They'll <strong>usually use brute force</strong> to find the item, which is often slow. They want to be guided in the right way and save time.
            </p>

            <h5 className="text-[1.3rem] font-bold text-[#333] mb-8">User perspectives</h5>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4 italic">
                  "When I can't find an item, I walk up and down aisles where it might be. Customer service is far away, so it takes less time to go up and down all the aisles. And I feel really, really frustrated."
                </p>
                <p className="text-sm text-[#999] font-bold">Sandy, age 59</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4 italic">
                  "I get wicked frustrated if it takes longer than normal to find something. If I can't find it in 5 minutes, I'll get pissed and ask someone near me or find a worker."
                </p>
                <p className="text-sm text-[#999] font-bold">Conner, age 23</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
                <p className="text-[1.1rem] text-[#666] leading-[1.8] mb-4 italic">
                  "If I can't find something, I give up. I don't think I've ever asked someone for help--it feels embarrassing. I'm very determined to find things by myself and feel stupid if I can't."
                </p>
                <p className="text-sm text-[#999] font-bold">Juliana, 22</p>
              </div>
            </div>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">TAKEAWAYS: USER INTERVIEWS</h5>
              <ul className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
                <li><strong>People dislike grocery shopping.</strong> Common complaints included that items are sometimes hard to find, it feels like a chore, and it takes a lot of time.</li>
                <li><strong>People feel frustrated when items are hard to find.</strong> Whether the item isn't where it's expected or out of stock, every participant said the word "frustrated" when asked to think about the last time an item was hard to find. One even said she usually wants to scream.</li>
                <li><strong>Typically, brute force is the algorithm for a hard-to-find item.</strong> People will look for an aisle they think matches what they're looking for and then will look at every item on the aisle until they recognize a color, logo, or packaging.</li>
              </ul>
            </div>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Competitor analysis</h3>
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Understanding the market landscape</h4>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              <strong>I couldn't find anyone who alleviated the exact pain point</strong> I was trying to target. Still, <strong>I found some awesome apps</strong> (some of which I will undoubtedly use in the future) that gave me insight into what's already out there.
            </p>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">TAKEAWAYS: COMPETITOR ANALYSIS</h5>
              <ul className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
                <li><strong>Inventory and location information is often readily available.</strong> This information is necessary for employees to restock shelves, and tons of stores' shopping apps share this information with customers.</li>
                <li><strong>Item information is essentially standardized.</strong> There is specific information required to be disclosed about food items, especially on the nutrition label. Most also include aisle number, price, and unit price.</li>
                <li><strong>Most apps focus on either sales or lists.</strong> The closest I could get to solving users' primary pain point was with the Target app, but most of the apps I found focused on saving money or just keeping lists.</li>
              </ul>
            </div>
          </section>

          {/* Define */}
          <section id="define" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Define</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              After conducting research, I <strong>defined the key features and functionalities of the app</strong>. I created a <strong>user flow</strong> to ensure the most efficient and streamlined experience for users. I also <strong>outlined the specific requirements</strong> for the app to meet the needs of the target market.
            </p>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">User flow</h3>
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Mapping out the shopper's journey</h4>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              I defined two cases where the user may use the app:
            </p>

            <ol className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] mb-12 list-decimal ml-8">
              <li><strong>As a list-keeping app.</strong> This includes assigning a store to a list, adding items to that list, and checking off those items as you go along.</li>
              <li><strong>As an item locator.</strong> You just want to find a hard-to-locate item-- you don't want to make a list.</li>
            </ol>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">USER FLOW</h5>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
                The flow allows users to either <strong>shop with a pre-made list</strong> or <strong>search for a specific item</strong> and ends when all items on the list have been located or when the user has found the item they were searching for.
              </p>
              <div className="w-full aspect-[3/1] bg-gradient-to-br from-gray-200 to-gray-300"></div>
            </div>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Product requirements</h3>
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Clarifying the product vision</h4>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              I came up with <strong>six high-level sections</strong> to wireframe and test based on feature brainstorming and flows from the persona's tasks.
            </p>

            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse border border-[rgba(0,0,0,0.08)]">
                <thead>
                  <tr className="bg-gradient-to-br from-gray-50 to-white">
                    <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-[#333]">Area</th>
                    <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-[#333]">High-level requirements</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Log in / sign up</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Allows user to create or access an account</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">All lists</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Allows user to see all lists they have and create new lists</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Single list</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Allows user to view a single list and its associated information</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Shopping mode</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Allows user to indicate that they're shopping from a specific list and to be guided through the store</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Search</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Allows user to enter keywords to search for items at a specific store</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Account</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Shows information about a user's account, including sharing capacities and list history</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8]">
              With the product and its requirements defined, I began to design.
            </p>
          </section>

          {/* Design */}
          <section id="design" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Design</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Designing a product is a delicate balance of form and function. I began my design process by creating <strong>wireframes using Figma</strong> to map out the user interface and ensure an efficient user flow. With the foundation of the user interface in place, I then set about <strong>creating a unique brand</strong>, including the development of a logo, brand colors, and typography. I used these branding elements <strong>to style the wireframes and bring the app to life</strong> visually, ensuring a cohesive and consistent look and feel throughout the user experience.
            </p>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Wireframes</h3>
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Creating the blueprint</h4>

            <a
              href="https://www.figma.com/proto/ZX4MmVGBeE0NCMPxVL73CB/Beeline---Portfolio-Prototype?page-id=175%3A1964&node-id=177%3A1602&viewport=495%2C407%2C0.13&scaling=scale-down&starting-point-node-id=177%3A1514"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 font-bold text-base shadow-lg mb-12"
              style={{
                backgroundColor: 'white',
                color: brandColor,
                border: `2px solid ${brandColor}`,
                transition: 'all 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 48, 73, 0.05)';
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              View wireframes in Figma →
            </a>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              My wireframes served as a <strong>blueprint for the final product</strong> and as a <strong>tool to test and iterate</strong> on the user flow and interface design.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300"></div>
            </div>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Styling</h3>
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Creating the brand</h4>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Because I was making this app, <strong>I decided to name it Beeline</strong>, as the idea is that <strong>you can use it to go directly to the items you need</strong>.
            </p>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">LOGO DESIGN</h5>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
                The three hexagons represent a beehive, and the colors are meant to be warm but also clean.
              </p>
              <div className="w-full aspect-[2/1] bg-gradient-to-br from-gray-200 to-gray-300"></div>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              I made a <strong>general UI kit</strong> following the logo creation based on common elements from my wireframes.
            </p>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-12">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">COLORS AND TYPOGRAPHY</h5>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
                <strong>I considered using yellow as the primary color</strong> to match the "bee" theme, but I realized that <strong>it could be challenging</strong> to use consistently and may not always look great. Instead, <strong>I decided to use a dark blue instead</strong> and use yellow as an accent color for a more cohesive and visually pleasing design. I also chose a <strong>clean, sans-serif font</strong> to look good on mobile devices.
              </p>
              <div className="w-full aspect-[3/1] bg-gradient-to-br from-gray-200 to-gray-300"></div>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              <strong>I applied the UI kit to the wireframes</strong> to come up with a first-round version of how the app may look.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300"></div>
            </div>

            {/* Design Decisions */}
            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Below is a mockup of <strong>a single list</strong> and its <strong>associated map view</strong>. Annotated are a few design decisions I made in the process.
            </p>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">DESIGN DECISIONS</h5>
              <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300 mb-8"></div>
              <ul className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
                <li>The primary blue was used for buttons and the bottom navigation. Because it was a dark color, it generally stood out from the rest of the design.</li>
                <li>I chose to use a variation of a ghost button for the secondary button style to keep some contrast but to not overtake the primary actions.</li>
                <li>I found it difficult to incorporate the accent color into the design; one place I did was to represent the active tab.</li>
                <li>One change I made from the wireframes was to include a swipe-to-view (similar to Photos in iOS) of the grocery items on their list.</li>
              </ul>
            </div>
          </section>

          {/* Test */}
          <section id="test" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Test</h2>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Bringing a product to market is a iterative process that requires constant testing and refining. I conducted usability testing to gather feedback on the app's user interface, navigation flow, and overall user experience. Based on the feedback, I identified and prioritized the key usability issues that needed to be addressed. Using the results of the testing, I was able to iterate on the design and make improvements to the user experience, ensuring that Beeline was as user-friendly and efficient as possible.
            </p>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Usability testing</h3>
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-8">Putting it to the test</h4>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              I conducted usability tests with six participants over two days. To do this, I came up with seven core tasks and had participants click through the Figma prototype.
            </p>

            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse border border-[rgba(0,0,0,0.08)]">
                <thead>
                  <tr className="bg-gradient-to-br from-gray-50 to-white">
                    <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-[#333]">Task</th>
                    <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-[#333]">Direct success</th>
                    <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-[#333]">Indirect success</th>
                    <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-[#333]">Gave up</th>
                    <th className="border border-[rgba(0,0,0,0.08)] p-4 text-left font-bold text-[#333]">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Add list</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">100%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">All participants immediately did the expected behavior (tap the "New List" button) and understood that each list must be associated with a store</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Add item to list</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">100%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Feedback was that search was quick and familiar</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Locate item in store (from list)</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">33%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">50%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">16%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Participants went to map view and had trouble performing the right interaction (swipe); the participant who gave up reported not thinking they could drag on the computer</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Locate item in store (from search)</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">100%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Involved searching and tapping map view; no dragging</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Look over list</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">100%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Involved tapping a list</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Change store (from search)</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">100%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Participants reported that this made sense (no issues)</td>
                  </tr>
                  <tr>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 font-bold text-[#666]">Check off item</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">100%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">0%</td>
                    <td className="border border-[rgba(0,0,0,0.08)] p-4 text-[#666]">Intuitive; same flow as other list applications (tapping a checkbox)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-8">
              Generally, the app was easy to navigate, and there was 100% direct success on every task besides one: find the flour at Stop & Shop. The expected behavior involved swiping to the left on the preview list at the bottom of the screen. I hypothesized two reasons why this could have happened:
            </p>

            <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-12">
              <li>The prototype was on a computer. This was primarily because the testing took place over Zoom, and swiping isn't natural on computers.</li>
              <li>The prototype was finicky. Some users tried to drag and got "halfway" through the swipe before releasing, resetting the preview bar to its original position. Sometimes, I dragged, and the list didn't move at all.</li>
            </ul>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              I tested these hypotheses by recruiting a few in-person volunteers to perform that specific task on a mobile device. They passed with flying colors, so I determined that it was not a priority fix.
            </p>

            <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 mb-12 mx-auto max-w-md"></div>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-16">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">TAKEAWAYS: USABILITY TESTING</h5>
              <ul className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
                <li>Generally, the app was easy to navigate, and there was 100% direct success on every task besides one: find the flour at Stop & Shop.</li>
                <li>Map view required some further exploration. A few issues and questions on that page led me to review that screen for clarity and consistent functionality.</li>
              </ul>
            </div>

            <h3 className="text-[1.8rem] font-bold text-[#333] mb-8">Priority fixes</h3>
            <h4 className="text-[1.5rem] font-bold text-[#333] mb-12">Areas of opportunity</h4>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-16">
              The core tasks of the usability testing didn't uncover any major problems, but after watching the Zoom recordings and going over my notes, I saw two areas of opportunity. So, I focused on those to improve the overall experience for users.
            </p>

            {/* Fix 1 */}
            <h5 className="text-[1.3rem] font-bold text-[#333] mb-8">Fix 1: Show auto-sort more visibly</h5>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-8">
              <h6 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PREVIOUS STATE</h6>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
                Users believed that the items were listed in the order in which they were added to the list, like a queue.
              </p>
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 mb-6 mx-auto max-w-md"></div>
              <h6 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PROBLEMS</h6>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Users were not aware that the list was already sorted in an efficient shopping order. They saw a collection of location icons but didn't understand that the order had been optimized for them.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="text-4xl text-[#999]">↓</div>
            </div>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-16">
              <h6 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">REVISED STATE</h6>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
                I included a "path" toggle in the map view, which would highlight the path to take to find the items in their list, from the store entrance.
              </p>
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 mb-6 mx-auto max-w-md"></div>
              <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-6">
                <li>Added "path" toggle that turns on or off the highlighted path</li>
                <li>Highlighted path with directional arrows</li>
              </ul>
              <h6 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">HOW IT ADDRESSES THE PROBLEM</h6>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                The path guides users through the store as they would see on a map, using arrows to show them the most efficient route and making it clear which item they should pick up next.
              </p>
            </div>

            {/* Fix 2 */}
            <h5 className="text-[1.3rem] font-bold text-[#333] mb-8">Fix 2: Item checkoff in each view</h5>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-8">
              <h6 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PREVIOUS STATE</h6>
              <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-6">
                Users can only view - not check off - items once they expand the map.
              </p>
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 mb-6 mx-auto max-w-md"></div>
              <h6 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">PROBLEM</h6>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                General inconsistency caused confusion. Users expected to be able to check off items in this view.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="text-4xl text-[#999]">↓</div>
            </div>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] mb-16">
              <h6 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">REVISED STATE</h6>
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 mb-6 mx-auto max-w-md"></div>
              <ul className="space-y-3 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6 mb-6">
                <li>Added checkbox in expanded map view to facilitate item check-off</li>
              </ul>
              <h6 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-4">HOW IT ADDRESSES THE PROBLEM</h6>
              <p className="text-[1.15rem] text-[#666] leading-[1.8]">
                Increases consistency. This better aligned with user expectations and didn't unnecessarily restrict functionality.
              </p>
            </div>

          </section>

          {/* Final UI */}
          <section id="final-ui" className="mb-32 scroll-mt-32">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333] mb-12">Final UI</h2>

            <a
              href="https://www.figma.com/proto/ZX4MmVGBeE0NCMPxVL73CB/Beeline---Portfolio-Prototype?page-id=554%3A9732&node-id=554%3A11595&viewport=437%2C646%2C0.27&scaling=scale-down&starting-point-node-id=554%3A11595"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-white font-bold text-base shadow-lg mb-12"
              style={{
                backgroundColor: brandColor,
                transition: 'all 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#002237';
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = brandColor;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Figma prototype →
            </a>

            <p className="text-[1.15rem] text-[#666] leading-[1.8] mb-12">
              Here's a preview of the final UI after integrating the priority fixes. Because this is a concept, there are no next steps. But I do believe that this is a significant pain point and would love to have this solved. It would be interesting to see it become part of some existing grocery store shopping initiatives, such as Amazon Go. Although, I think if I showed a developer this, they may cry once they see the map view, and I'd love to ideate alternatives to my first priority fix. I share some more concrete takeaways below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300"></div>
            </div>

            <div className="p-10 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)]">
              <h5 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">TAKEAWAYS: FINAL UI</h5>
              <ul className="space-y-4 text-[1.1rem] text-[#666] leading-[1.8] list-disc ml-6">
                <li><strong>I like constraints.</strong> This was a fun project, but I felt a bit lost when it came to thinking about what was feasible and what wasn't. There is some intrinsic allure to being able to do anything you want, but if it's not realistic, it's not as fun. I want to create tangible things with real impact.</li>
                <li><strong>In-depth documentation makes everything so much easier.</strong> I've always enjoyed being thorough, but being clear about my requirements made the design process more manageable because I was never scared of missing anything. I felt on top of the project at all times.</li>
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
              <img src="/assets/case-studies/beeline/logo.svg" alt="Beeline" className="w-12 h-12" />
              <span className="font-bold text-xl text-[#333]">Beeline</span>
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
