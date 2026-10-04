'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LF } from './theme';

/**
 * Hand-rolled spotlight tour instead of a library.
 *
 * react-joyride (the default choice) uses deprecated React APIs
 * (unmountComponentAtNode) and is broken on React 19, which this project
 * runs. The React-19-compatible alternative (react-tourlight) is a
 * single-maintainer package a month old - too thin to depend on for a
 * portfolio piece. This does the same job - a dimmed backdrop with a cutout
 * around one real DOM element at a time, plus a short adjacent tooltip -
 * with Framer Motion, already a dependency used everywhere else here.
 *
 * Targets are found by `data-tour="<id>"` so the tour never needs refs
 * threaded through the demo it's guiding.
 */

export interface TourStep {
  target: string;
  title: string;
  body: string;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function measure(id: string): Rect | null {
  const el = document.querySelector(`[data-tour="${id}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

export default function GuidedTour({
  steps,
  onDone,
}: {
  steps: TourStep[];
  onDone: () => void;
}) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const step = steps[i];

  useEffect(() => {
    if (!step) return;
    const update = () => setRect(measure(step.target));
    update();
    // Retry a couple frames in - the tour can start before layout settles
    // (e.g. right after the fullscreen dialog's open animation).
    const raf1 = requestAnimationFrame(update);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(update));
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener('resize', update);
    };
  }, [step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onDone();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!step) return null;

  const pad = 6;
  const box = rect
    ? { top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 }
    : null;

  // Tooltip sits below the target by default, flips above if there's no room.
  const spaceBelow = box ? window.innerHeight - (box.top + box.height) : 0;
  const placeAbove = box ? spaceBelow < 160 && box.top > 160 : false;

  return (
    <div className="fixed inset-0" style={{ zIndex: 10050 }}>
      {/* Dimmed backdrop with a cutout - four rects framing the hole rather
          than an SVG mask, cheaper and no browser-support fuss. */}
      {box && (
        <>
          <div
            style={{
              position: 'fixed',
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
              borderRadius: '0.65rem',
              boxShadow: '0 0 0 9999px rgba(17,17,20,0.62)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            layout
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
              borderRadius: '0.65rem',
              boxShadow: `0 0 0 2px ${LF.primary[900]}`,
              pointerEvents: 'none',
            }}
          />
          <motion.div
            key={i}
            initial={{ opacity: 0, y: placeAbove ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: placeAbove ? undefined : box.top + box.height + 12,
              bottom: placeAbove ? window.innerHeight - box.top + 12 : undefined,
              left: Math.max(12, Math.min(box.left, window.innerWidth - 300)),
              width: '17rem',
              borderRadius: '0.75rem',
              backgroundColor: LF.grey[0],
              boxShadow: '0 20px 50px rgba(0,0,0,0.28)',
              padding: '0.9rem 1rem',
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: '0.35rem' }}>
              <span className="font-semibold" style={{ fontSize: '0.82rem', color: LF.grey[900] }}>
                {step.title}
              </span>
              <span style={{ fontSize: '0.68rem', color: LF.grey[600] }}>
                {i + 1}/{steps.length}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: LF.grey[700], lineHeight: 1.5, marginBottom: '0.75rem' }}>{step.body}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={onDone}
                style={{ fontSize: '0.75rem', color: LF.grey[600] }}
              >
                Skip
              </button>
              <button
                onClick={() => (i + 1 < steps.length ? setI(i + 1) : onDone())}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: LF.primary[50],
                  backgroundColor: LF.primary[900],
                  padding: '0.35rem 0.75rem',
                  borderRadius: '0.45rem',
                }}
              >
                {i + 1 < steps.length ? 'Next' : 'Got it'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
