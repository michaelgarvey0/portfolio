'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { KIND_LABELS, WORK_ITEMS, type WorkItem, type WorkKind } from '@/content/liveflow';

/**
 * In-page navigation for the v7 slide decks. Copied from v4's WorkSwitcher
 * with the route prefix swapped to /work/liveflow-v7.
 */

const KIND_TONE: Record<WorkKind, string> = {
  shipped: '#15803d',
  prototype: '#b45309',
  system: '#2E54AB',
  research: '#6d28d9',
};

const KIND_ORDER: WorkKind[] = ['shipped', 'system', 'prototype', 'research'];

export default function WorkSwitcher({ current }: { current: WorkItem }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const index = WORK_ITEMS.findIndex((i) => i.id === current.id);
  const prev = WORK_ITEMS[index - 1];
  const next = WORK_ITEMS[index + 1];

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

  return (
    <div ref={wrapRef} className="relative" style={{ marginBottom: '3rem' }}>
      <div
        className="flex items-center justify-between"
        style={{ gap: '1rem', paddingBottom: '0.75rem' }}
      >
        <div className="flex items-center min-w-0" style={{ gap: '0.5rem' }}>
          <Link
            href="/work/liveflow-v7"
            className="text-[0.95rem] font-medium text-[#666] hover:text-[#2E54AB] transition-colors flex-shrink-0"
            style={{ color: '#666' }}
          >
            All work
          </Link>
          <span className="flex-shrink-0" style={{ color: '#bbb' }}>
            /
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex items-center min-w-0 cursor-pointer group"
            style={{ gap: '0.375rem' }}
          >
            <span
              className="text-[1.05rem] font-bold truncate group-hover:text-[#2E54AB] transition-colors"
              style={{ color: '#1a1a1a' }}
            >
              {current.title}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
              style={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease-out',
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <div className="flex items-center flex-shrink-0" style={{ gap: '0.375rem' }}>
          <span
            className="text-[0.8rem] font-medium"
            style={{ color: '#888', marginRight: '0.5rem' }}
          >
            {index + 1} / {WORK_ITEMS.length}
          </span>
          <Chevron item={prev} direction="prev" />
          <Chevron item={next} direction="next" />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 bg-white border border-[rgba(0,0,0,0.12)] shadow-[0_20px_50px_rgba(0,0,0,0.14)]"
            style={{ top: 'calc(100% + 6px)', zIndex: 60, padding: '1.5rem' }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              style={{ gap: '1.5rem' }}
            >
              {KIND_ORDER.map((kind) => {
                const items = WORK_ITEMS.filter((i) => i.kind === kind);
                if (items.length === 0) return null;
                return (
                  <div key={kind}>
                    <div
                      className="text-[0.7rem] font-bold tracking-widest uppercase"
                      style={{
                        color: KIND_TONE[kind],
                        marginBottom: '0.625rem',
                        paddingBottom: '0.375rem',
                        borderBottom: `1px solid ${KIND_TONE[kind]}33`,
                      }}
                    >
                      {KIND_LABELS[kind]} &middot; {items.length}
                    </div>
                    <div style={{ display: 'grid', gap: '0.125rem' }}>
                      {items.map((item) => (
                        <PanelRow
                          key={item.id}
                          item={item}
                          active={item.id === current.id}
                          onNavigate={() => setOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PanelRow({
  item,
  active,
  onNavigate,
}: {
  item: WorkItem;
  active: boolean;
  onNavigate: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const background = active
    ? 'rgba(46,84,171,0.09)'
    : hovered
      ? 'rgba(46,84,171,0.07)'
      : 'transparent';

  return (
    <Link
      href={`/work/liveflow-v7/${item.id}`}
      onClick={onNavigate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="leading-snug"
      style={{
        fontSize: '0.9rem',
        padding: '0.375rem 0.5rem',
        color: active || hovered ? '#2E54AB' : '#555',
        fontWeight: active ? 700 : 500,
        backgroundColor: background,
        transition: 'background-color 120ms ease-out, color 120ms ease-out',
      }}
    >
      {item.title}
    </Link>
  );
}

function Chevron({ item, direction }: { item?: WorkItem; direction: 'prev' | 'next' }) {
  const [hovered, setHovered] = useState(false);

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === 'prev' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );

  if (!item) {
    return (
      <span
        aria-hidden="true"
        className="flex items-center justify-center"
        style={{
          width: '1.85rem',
          height: '1.85rem',
          border: '1px solid rgba(0,0,0,0.08)',
          color: '#ddd',
        }}
      >
        {icon}
      </span>
    );
  }

  return (
    <Link
      href={`/work/liveflow-v7/${item.id}`}
      title={item.title}
      aria-label={`${direction === 'prev' ? 'Previous' : 'Next'}: ${item.title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="flex items-center justify-center"
      style={{
        width: '1.85rem',
        height: '1.85rem',
        border: `1px solid ${hovered ? '#2E54AB' : 'rgba(0,0,0,0.18)'}`,
        backgroundColor: hovered ? '#2E54AB' : 'transparent',
        color: hovered ? '#ffffff' : '#444',
        transition: 'background-color 150ms ease-out, border-color 150ms ease-out, color 150ms ease-out',
      }}
    >
      {icon}
    </Link>
  );
}
