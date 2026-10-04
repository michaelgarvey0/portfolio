'use client';

import { motion } from 'framer-motion';

/**
 * The repeated type and box treatments from the existing case studies,
 * extracted so the three LiveFlow explorations stay visually identical to the
 * rest of the site. Class strings lifted verbatim from work/orgo and
 * work/webster.
 *
 * Load-bearing spacing uses inline styles rather than Tailwind utilities -
 * Turbopack's Tailwind v4 compiler intermittently drops utility classes
 * (tailwindlabs/tailwindcss#19825), and a collapsed layout reads as a broken
 * page where a wrong color merely reads as a wrong color.
 */

export function Section({
  id,
  children,
  animate = false,
}: {
  id: string;
  children: React.ReactNode;
  animate?: boolean;
}) {
  if (animate) {
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="scroll-mt-32"
        style={{ marginBottom: '8rem' }}
      >
        {children}
      </motion.section>
    );
  }
  return (
    <section id={id} className="scroll-mt-32" style={{ marginBottom: '8rem' }}>
      {children}
    </section>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#333]"
      style={{ marginBottom: '3rem' }}
    >
      {children}
    </h2>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[1.8rem] font-bold text-[#333]" style={{ marginBottom: '2rem' }}>
      {children}
    </h3>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h5
      className="text-xs font-bold tracking-widest uppercase text-[#999]"
      style={{ marginBottom: '1rem' }}
    >
      {children}
    </h5>
  );
}

export function Prose({
  children,
  spacing = '2rem',
}: {
  children: React.ReactNode;
  spacing?: string;
}) {
  return (
    <p className="text-[1.15rem] text-[#666] leading-[1.8]" style={{ marginBottom: spacing }}>
      {children}
    </p>
  );
}

/** The site's universal card treatment. */
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm"
      style={{ padding: '2rem', ...style }}
    >
      {children}
    </div>
  );
}

export function Figure({
  type,
  src,
  alt,
  caption,
}: {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure style={{ marginBottom: '3rem' }}>
      {type === 'video' ? (
        <video
          src={src}
          autoPlay
          playsInline
          muted
          loop
          className="w-full border border-[rgba(0,0,0,0.08)] shadow-md"
        />
      ) : (
        <img
          src={src}
          alt={alt ?? ''}
          className="w-full border border-[rgba(0,0,0,0.08)] shadow-md"
        />
      )}
      {caption && (
        <figcaption
          className="text-[0.9rem] text-[#999] italic"
          style={{ marginTop: '0.75rem' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Metadata grid - ROLE / TEAM / TIMELINE / TOOLS. */
export function MetaGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-gray-50 to-white border border-[rgba(0,0,0,0.08)] shadow-sm"
      style={{ gap: '1.5rem', padding: '2.5rem', marginBottom: '3rem' }}
    >
      {items.map((item) => (
        <div key={item.label}>
          <Eyebrow>{item.label}</Eyebrow>
          <p className="text-[#666] leading-relaxed">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

/** Anchored numbers. Only ever used with figures that survive an interview. */
export function AnchorRow({
  anchors,
  brandColor,
}: {
  anchors: { value: string; label: string }[];
  brandColor: string;
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: '1.5rem', marginBottom: '3rem' }}
    >
      {anchors.map((anchor) => (
        <div
          key={anchor.label}
          className="text-center border-2 shadow-sm"
          style={{
            padding: '1.5rem',
            borderColor: brandColor,
            backgroundColor: 'rgba(46,84,171,0.06)',
          }}
        >
          <div
            className="text-[2.25rem] font-bold"
            style={{ color: brandColor, marginBottom: '0.5rem' }}
          >
            {anchor.value}
          </div>
          <p className="text-[0.95rem] text-[#666] leading-relaxed">{anchor.label}</p>
        </div>
      ))}
    </div>
  );
}
