'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

interface CaseStudyHeroProps {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  imageSrc: string;
  imageAlt: string;
  textColor?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaColor?: string;
}

export default function CaseStudyHero({
  title,
  description,
  gradientFrom,
  gradientTo,
  imageSrc,
  imageAlt,
  textColor = 'white',
  ctaText,
  ctaHref,
  ctaColor
}: CaseStudyHeroProps) {
  const { scrollYProgress } = useScroll();

  const imageY = useTransform(scrollYProgress, [0, 0.3], [0, 300]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <motion.div
      id="hero-section"
      className="pt-20 pb-0 relative overflow-hidden hero-section"
      style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <style jsx>{`
        .hero-inner {
          padding-left: 3rem;
          padding-right: 3rem;
        }
        @media (max-width: 767px) {
          :global(.hero-section) {
            padding-top: 8rem !important;
          }
          .hero-inner {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .hero-text {
            margin-top: 0;
          }
          :global(.hero-title), :global(.hero-description) {
            text-align: center !important;
          }
          .hero-cta {
            align-self: center !important;
            margin-bottom: 3rem !important;
          }
          .hero-container {
            gap: 2rem !important;
          }
        }
      `}</style>
      <div className="mx-auto relative hero-inner" style={{ maxWidth: 'var(--max-width)' }}>
        <div className="flex md:flex-row flex-col justify-between gap-12 hero-container">
          {/* Left: Text - 40% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ y: textY, opacity: textOpacity }}
            className="md:w-[40%] w-full flex flex-col justify-center hero-text"
          >
            <h1 className="font-sans text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 tracking-tight hero-title" style={{ color: textColor }}>
              {title}
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] leading-relaxed mb-10 hero-description" style={{ color: textColor }} dangerouslySetInnerHTML={{ __html: description }} />
            {ctaText && ctaHref && ctaColor && (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 font-bold text-base shadow-lg self-start text-white hero-cta"
                style={{
                  backgroundColor: ctaColor,
                  transition: 'all 0.3s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {ctaText} &nbsp;&nbsp;→
              </a>
            )}
          </motion.div>

          {/* Right: Image - 60% */}
          <div className="md:w-[60%] w-full flex flex-col">
            <div className="md:h-20 h-0"></div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
            >
              <img src={imageSrc} alt={imageAlt} className="w-full block" style={{ aspectRatio: '16/10' }} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
