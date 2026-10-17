'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { CaseStudy } from '@/content/liveflowCaseStudies';
import SlideMedia from './SlideMedia';

export default function StoryViewer({ study, open, onClose: close }: { study: CaseStudy; open: boolean; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const onClose = useCallback(() => {
    setIndex(0);
    close();
  }, [close]);
  const count = study.slides.length;

  const next = useCallback(() => {
    if (index < count - 1) setIndex(index + 1);
    else onClose();
  }, [index, count, onClose]);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, next, prev, onClose]);

  if (typeof document === 'undefined') return null;
  const slide = study.slides[index];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0C1164]/90"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${study.title} story`}
        >
          <div
            className="relative bg-white overflow-hidden flex flex-col w-full h-full sm:w-auto sm:h-[min(90vh,52rem)] sm:aspect-[9/16] sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-3">
              {study.slides.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 rounded-full bg-black/15 overflow-hidden">
                  <div className="h-full bg-[#2E54AB]" style={{ width: i <= index ? '100%' : '0%' }} />
                </div>
              ))}
            </div>
            <button
              onClick={onClose}
              className="absolute top-6 right-3 z-20 w-8 h-8 flex items-center justify-center text-[#333] text-xl"
              aria-label="Close story"
            >
              ×
            </button>

            <div className="px-6 pt-12 pb-4">
              <div className="text-[0.65rem] font-bold tracking-widest uppercase text-[#999] mb-2">
                {study.title} · {index + 1}/{count}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{slide.heading}</h3>
              <p className="text-[0.95rem] leading-[1.6] text-[#555]">{slide.body}</p>
            </div>

            <div className="flex-1 min-h-0 relative">
              {slide.media && <SlideMedia media={slide.media} story />}
            </div>

            <button className="absolute left-0 top-0 bottom-0 w-1/3 z-[5]" onClick={prev} aria-label="Previous" />
            <button className="absolute right-0 top-0 bottom-0 w-1/3 z-[5]" onClick={next} aria-label="Next" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
