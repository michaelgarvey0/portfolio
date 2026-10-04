'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WORK_ITEMS, type WorkItem } from '@/content/liveflow';
import WorkSwitcher from './WorkSwitcher';
import BadgePopover from './BadgePopover';

export interface Slide {
  id: string;
  label: string;
  content: React.ReactNode;
}

/**
 * Full-screen takeover, not a page section. No Navbar/Footer while this is
 * mounted - it IS the page. All slides stay mounted and crossfade (same
 * technique that fixed PrototypeStage's open/close jump) so state inside a
 * slide, like the live demo, survives navigating away and back.
 */
export default function SlideDeck({ work, slides }: { work: WorkItem; slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const workIndex = WORK_ITEMS.findIndex((i) => i.id === work.id);
  const nextItem = WORK_ITEMS[workIndex + 1];
  const onLastSlide = index === slides.length - 1;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [slides.length]);

  return (
    <div className="flex flex-col" style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: '#fff' }}>
      <div style={{ padding: '1.25rem 2rem 0', flexShrink: 0 }}>
        <WorkSwitcher current={work} />
        <div className="flex flex-wrap items-center" style={{ gap: '0.5rem', marginTop: '-1.5rem', marginBottom: '0.5rem' }}>
          <BadgePopover variant="kind" value={work.kind} current={work} />
          {work.themes.map((theme) => (
            <BadgePopover key={theme} variant="theme" value={theme} current={work} />
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        {slides.map((s, i) => (
          <motion.div
            key={s.id}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            aria-hidden={i !== index}
            inert={i !== index}
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'auto',
              pointerEvents: i === index ? 'auto' : 'none',
            }}
          >
            {s.content}
          </motion.div>
        ))}
      </div>

      <div
        className="flex items-center justify-between flex-wrap"
        style={{ gap: '1rem', padding: '1rem 2rem', borderTop: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}
      >
        <div className="flex items-center flex-wrap" style={{ gap: '0.4rem' }}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className="cursor-pointer font-semibold"
              style={{
                fontSize: '0.75rem',
                padding: '0.4rem 0.75rem',
                borderRadius: '999px',
                color: i === index ? '#fff' : '#888',
                backgroundColor: i === index ? '#2E54AB' : 'rgba(0,0,0,0.05)',
                transition: 'background-color 150ms ease-out, color 150ms ease-out',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center" style={{ gap: '0.6rem' }}>
          <button
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            disabled={index === 0}
            className="font-semibold"
            style={{
              fontSize: '0.85rem',
              padding: '0.5rem 1rem',
              color: index === 0 ? '#ccc' : '#444',
              border: `1px solid ${index === 0 ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.18)'}`,
              cursor: index === 0 ? 'default' : 'pointer',
            }}
          >
            Back
          </button>

          {onLastSlide ? (
            <Link
              href={nextItem ? `/work/liveflow-v7/${nextItem.id}` : '/work'}
              className="font-bold inline-flex items-center"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem', color: '#fff', backgroundColor: '#2E54AB' }}
            >
              {nextItem ? `Next case study: ${nextItem.title}` : 'Back to all work'}
            </Link>
          ) : (
            <button
              onClick={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}
              className="font-bold"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem', color: '#fff', backgroundColor: '#2E54AB', cursor: 'pointer' }}
            >
              Next: {slides[index + 1]?.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
