'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  KIND_DEFINITIONS,
  KIND_LABELS,
  THEME_DEFINITIONS,
  THEME_LABELS,
  WORK_ITEMS,
  type WorkItem,
  type WorkKind,
  type WorkTheme,
} from '@/content/liveflow';

/**
 * Clickable taxonomy badge. Copied from v4's BadgePopover with the route
 * prefix swapped to /work/liveflow-v7.
 */

const KIND_TONE: Record<WorkKind, string> = {
  shipped: '#15803d',
  prototype: '#b45309',
  system: '#2E54AB',
  research: '#6d28d9',
};

type BadgeProps =
  | { variant: 'kind'; value: WorkKind; current: WorkItem }
  | { variant: 'theme'; value: WorkTheme; current: WorkItem };

export default function BadgePopover(props: BadgeProps) {
  const { variant, current } = props;
  const [open, setOpen] = useState(false);
  const [showFade, setShowFade] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const updateFade = () => {
    const el = listRef.current;
    if (!el) return;
    setShowFade(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  };

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(updateFade);
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isKind = variant === 'kind';
  const label = isKind
    ? KIND_LABELS[props.value as WorkKind]
    : THEME_LABELS[props.value as WorkTheme];
  const definition = isKind
    ? KIND_DEFINITIONS[props.value as WorkKind]
    : THEME_DEFINITIONS[props.value as WorkTheme];
  const accent = isKind ? KIND_TONE[props.value as WorkKind] : '#2E54AB';

  const siblings = WORK_ITEMS.filter(
    (item) =>
      item.id !== current.id &&
      (isKind
        ? item.kind === (props.value as WorkKind)
        : item.themes.includes(props.value as WorkTheme))
  );

  return (
    <span ref={wrapRef} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center text-[0.72rem] font-bold tracking-widest uppercase cursor-pointer"
        style={{
          padding: '0.3rem 0.6rem',
          color: isKind ? '#ffffff' : '#555',
          backgroundColor: isKind
            ? accent
            : open
              ? 'rgba(0,0,0,0.09)'
              : 'rgba(0,0,0,0.04)',
          opacity: isKind && open ? 0.85 : 1,
          transition: 'background-color 150ms ease-out, opacity 150ms ease-out',
        }}
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bg-white border border-[rgba(0,0,0,0.12)] shadow-[0_16px_44px_rgba(0,0,0,0.16)]"
            style={{
              top: 'calc(100% + 6px)',
              left: 0,
              width: 'min(22rem, calc(100vw - 3rem))',
              zIndex: 70,
              textTransform: 'none',
              letterSpacing: 'normal',
            }}
          >
            <div
              style={{
                padding: '0.875rem 1rem',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                borderTop: `3px solid ${accent}`,
              }}
            >
              <div
                className="text-[0.7rem] font-bold tracking-widest uppercase"
                style={{ color: accent, marginBottom: '0.4rem' }}
              >
                {label}
              </div>
              <p
                className="leading-[1.6]"
                style={{ fontSize: '0.9rem', color: '#555', fontWeight: 400 }}
              >
                {definition}
              </p>
            </div>

            <div style={{ paddingTop: '0.625rem' }}>
              <div
                className="text-[0.7rem] font-bold tracking-widest uppercase"
                style={{ color: '#999', padding: '0 1rem', marginBottom: '0.4rem' }}
              >
                {siblings.length > 0
                  ? `${siblings.length} other${siblings.length === 1 ? '' : 's'} tagged this`
                  : 'Nothing else tagged this'}
              </div>

              <div
                ref={listRef}
                onScroll={updateFade}
                style={{
                  maxHeight: '13rem',
                  overflowY: 'auto',
                  maskImage: showFade
                    ? 'linear-gradient(to bottom, #000 calc(100% - 1.75rem), transparent 100%)'
                    : undefined,
                  WebkitMaskImage: showFade
                    ? 'linear-gradient(to bottom, #000 calc(100% - 1.75rem), transparent 100%)'
                    : undefined,
                }}
              >
                {siblings.map((item) => (
                  <Link
                    key={item.id}
                    href={`/work/liveflow-v7/${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center hover:bg-[rgba(46,84,171,0.07)] transition-colors"
                    style={{ gap: '0.5rem', padding: '0.4rem 1rem' }}
                  >
                    <span
                      className="flex-shrink-0"
                      style={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: KIND_TONE[item.kind],
                      }}
                    />
                    <span
                      className="leading-snug"
                      style={{ fontSize: '0.9rem', color: '#444', fontWeight: 500 }}
                    >
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
