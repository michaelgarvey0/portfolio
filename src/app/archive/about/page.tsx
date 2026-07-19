'use client';

import { motion } from 'framer-motion';
import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import { IconPalette, IconComponents, IconCode, IconSearch, IconPaint, IconBolt, IconChartBar } from '@tabler/icons-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      {/* Content */}
      <div className="mx-auto px-6 md:px-12 pt-32 pb-32" style={{ maxWidth: 'var(--max-width)' }}>
        {/* Hero with Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20">
            <img
              src="/assets/case-studies/michael-headshot.jpeg"
              alt="Michael Garvey"
              className="w-[240px] h-[240px] object-cover flex-shrink-0 shadow-lg"
            />
            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">IN A NUTSHELL</h2>
              <p className="text-[1.75rem] text-[#333] leading-[1.4] font-bold">
                User-centered design, gymnastics, the cello, Christmas, and puppies. 🎄🐶
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-8">BACKGROUND</h2>
          <div className="space-y-6 text-[1.15rem] text-[#666] leading-[1.8]">
            <p>
              I graduated from <a href="https://www.yale.edu" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0066cc] underline decoration-1 hover:text-[#004499] hover:decoration-2 transition-all duration-100">Yale</a> with a degree in Cognitive Science, specifically focusing on Human-Computer Interaction. I took a ton of computer science and psychology courses during my time there, and I've come to realize that UX is the perfect intersection of creativity and logic - my studies and interests naturally drew me to the field.
            </p>

            <p>
              Currently, I'm helping build <a href="https://www.orgohq.com" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0066cc] underline decoration-1 hover:text-[#004499] hover:decoration-2 transition-all duration-100">Orgo</a> from the ground up. Previously, I worked as a UX/UI designer and researcher at <a href="https://www.websterbank.com" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0066cc] underline decoration-1 hover:text-[#004499] hover:decoration-2 transition-all duration-100">Webster Bank</a>, where I helped to redefine our design system and consolidate our digital offerings after a recent merger with Sterling National Bank. Before this, I had a gig as a UX Specialist for a small startup called Inkbench, where I gained a lot of QA and customer support experience.
            </p>

            <p>
              Because I took so many computer science classes at Yale, I can code in various languages and love to work closely with developers. My passion for creative problem-solving and technical thinking definitely spills over into my design work, which is always a plus. During college, I also worked in a social cognitive development research lab and wrote my senior thesis on a study I designed and conducted about the associations children have between wealth and social obligation across development.
            </p>

            <p>
              In my free time, I like to play the cello and do gymnastics, and I may or may not have a slight obsession with Christmas and puppies (but let's be real, who doesn't love Christmas and puppies?). These hobbies of mine just go to show that technical skill and creativity can make for some pretty awesome results.
            </p>
          </div>
        </motion.div>

        {/* What I Do Best */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-8">WHAT I DO BEST</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-md transition-shadow duration-300">
              <IconPalette size={32} stroke={1.5} className="text-blue-600 mb-3" />
              <h3 className="text-[1.25rem] font-bold text-[#333] mb-3">End-to-End Product Design</h3>
              <p className="text-[1.05rem] text-[#666] leading-[1.7]">
                From user research and wireframes to high-fidelity prototypes and developer handoff, I own the entire design process and ensure seamless execution.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-md transition-shadow duration-300">
              <IconComponents size={32} stroke={1.5} className="text-purple-600 mb-3" />
              <h3 className="text-[1.25rem] font-bold text-[#333] mb-3">Design Systems</h3>
              <p className="text-[1.05rem] text-[#666] leading-[1.7]">
                Building scalable, accessible component libraries that maintain consistency across products while empowering teams to move faster.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-md transition-shadow duration-300">
              <IconCode size={32} stroke={1.5} className="text-green-600 mb-3" />
              <h3 className="text-[1.25rem] font-bold text-[#333] mb-3">Technical Collaboration</h3>
              <p className="text-[1.05rem] text-[#666] leading-[1.7]">
                With a strong CS background, I bridge design and development, writing code when needed and speaking the same language as engineering teams.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-md transition-shadow duration-300">
              <IconSearch size={32} stroke={1.5} className="text-orange-600 mb-3" />
              <h3 className="text-[1.25rem] font-bold text-[#333] mb-3">User Research & Strategy</h3>
              <p className="text-[1.05rem] text-[#666] leading-[1.7]">
                Conducting user interviews, usability testing, and competitive analysis to inform design decisions with real insights, not assumptions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-8">FUN FACTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-gradient-to-br from-red-50 to-white border-2 border-red-200 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-2">🎻</div>
              <p className="text-[1.05rem] font-semibold text-[#333]">Plays the cello</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-2">🤸</div>
              <p className="text-[1.05rem] font-semibold text-[#333]">Does gymnastics</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-2">🎄</div>
              <p className="text-[1.05rem] font-semibold text-[#333]">Christmas enthusiast</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-2">🐶</div>
              <p className="text-[1.05rem] font-semibold text-[#333]">Puppy lover</p>
            </div>
          </div>
        </motion.div>

        {/* Skills & Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-8">SKILLS & TOOLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-pink-50 to-white border border-pink-100">
              <h3 className="text-[1.1rem] font-bold text-[#333] mb-4 flex items-center gap-2">
                <IconPaint size={24} stroke={1.5} className="text-pink-600" />
                Design
              </h3>
              <ul className="space-y-2 text-[1.05rem] text-[#666] list-disc pl-6">
                <li>Figma</li>
                <li>Adobe Creative Suite</li>
                <li>Prototyping</li>
                <li>Design Systems</li>
                <li>Wireframing</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-white border border-cyan-100">
              <h3 className="text-[1.1rem] font-bold text-[#333] mb-4 flex items-center gap-2">
                <IconBolt size={24} stroke={1.5} className="text-cyan-600" />
                Development
              </h3>
              <ul className="space-y-2 text-[1.05rem] text-[#666] list-disc pl-6">
                <li>React & Next.js</li>
                <li>TypeScript/JavaScript</li>
                <li>HTML & CSS</li>
                <li>Tailwind CSS</li>
                <li>Git/GitHub</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-amber-50 to-white border border-amber-100">
              <h3 className="text-[1.1rem] font-bold text-[#333] mb-4 flex items-center gap-2">
                <IconChartBar size={24} stroke={1.5} className="text-amber-600" />
                Research
              </h3>
              <ul className="space-y-2 text-[1.05rem] text-[#666] list-disc pl-6">
                <li>User Interviews</li>
                <li>Usability Testing</li>
                <li>Competitive Analysis</li>
                <li>Survey Design</li>
                <li>Data Analysis</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}
