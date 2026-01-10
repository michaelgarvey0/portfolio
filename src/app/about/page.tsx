'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      {/* Content */}
      <div className="mx-auto px-12 pt-32 pb-32" style={{ maxWidth: 'var(--max-width)' }}>
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
              className="w-[240px] h-[240px] object-cover flex-shrink-0"
            />
            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#999] mb-6">IN A NUTSHELL</h2>
              <p className="text-[1.75rem] text-[#333] leading-[1.4] font-bold">
                User-centered design, gymnastics, the cello, Christmas, and puppies.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
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
      </div>

      <div className="mx-auto px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}
