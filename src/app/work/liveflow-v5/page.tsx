'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Demo } from '@/components/liveflow-demos';
import {
  KIND_LABELS,
  LOOP_STAGES,
  THEME_LABELS,
  WORK_ITEMS,
  type LoopStage,
  type WorkItem,
  type WorkKind,
  type WorkTheme,
} from '@/content/liveflow';

/**
 * v5 - Workspace.
 *
 * Master/detail with its own internal scroll regions, so it reads as a tool
 * rather than a document. The lens toggle reorganizes the identical corpus
 * three ways, which makes the shape of the work inspectable instead of
 * asserted.
 *
 * The site Navbar is fixed with responsive padding (py-3 -> lg:py-6), so its
 * height changes at the breakpoint. Rather than hardcode an offset that drifts
 * the moment anyone edits the nav, it gets measured at runtime.
 */

type Lens = 'type' | 'loop' | 'theme';

const LENSES: { id: Lens; label: string; short: string }[] = [
  { id: 'type', label: 'By type', short: 'Type' },
  { id: 'loop', label: 'By loop stage', short: 'Loop' },
  { id: 'theme', label: 'By theme', short: 'Theme' },
];

const KIND_TONE: Record<WorkKind, string> = {
  shipped: '#15803d',
  prototype: '#b45309',
  system: '#2E54AB',
  research: '#6d28d9',
};

const KIND_ORDER: WorkKind[] = ['shipped', 'system', 'prototype', 'research'];
const THEME_ORDER: WorkTheme[] = [
  'ai',
  'multi-entity',
  'data-integrity',
  'accounting-core',
  'design-ops',
];

interface Group {
  key: string;
  label: string;
  sublabel?: string;
  items: WorkItem[];
}

function buildGroups(lens: Lens): Group[] {
  if (lens === 'type') {
    return KIND_ORDER.map((kind) => ({
      key: kind,
      label: KIND_LABELS[kind],
      items: WORK_ITEMS.filter((i) => i.kind === kind),
    })).filter((g) => g.items.length > 0);
  }
  if (lens === 'loop') {
    return LOOP_STAGES.map((stage) => ({
      key: stage.id,
      label: stage.title,
      sublabel: stage.blurb,
      items: WORK_ITEMS.filter((i) => i.loopStage === (stage.id as LoopStage)),
    })).filter((g) => g.items.length > 0);
  }
  return THEME_ORDER.map((theme) => ({
    key: theme,
    label: THEME_LABELS[theme],
    items: WORK_ITEMS.filter((i) => i.themes.includes(theme)),
  })).filter((g) => g.items.length > 0);
}

export default function LiveFlowV5() {
  const [lens, setLens] = useState<Lens>('type');
  const [selectedId, setSelectedId] = useState<string>(WORK_ITEMS[0].id);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(73);
  const detailRef = useRef<HTMLDivElement>(null);

  // Measure the fixed site navbar so the workspace sits exactly beneath it at
  // any breakpoint, and re-measure when it changes (mobile menu, resize).
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const measure = () => setNavHeight(nav.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Mirror state into the hash so any view is a link someone can send.
  useEffect(() => {
    const [hashLens, hashId] = window.location.hash.slice(1).split('/');
    if (LENSES.some((l) => l.id === hashLens)) setLens(hashLens as Lens);
    if (hashId && WORK_ITEMS.some((i) => i.id === hashId)) setSelectedId(hashId);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#${lens}/${selectedId}`);
  }, [lens, selectedId]);

  const groups = useMemo(() => buildGroups(lens), [lens]);
  const selected = WORK_ITEMS.find((i) => i.id === selectedId) ?? WORK_ITEMS[0];

  const select = (id: string) => {
    setSelectedId(id);
    setMobileDetailOpen(true);
    detailRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <Navbar />

      <div
        className="flex flex-col"
        style={{
          marginTop: navHeight,
          height: `calc(100dvh - ${navHeight}px)`,
          overflow: 'hidden',
        }}
      >
        {/* Context bar - identity + lens toggle. Not site nav; that's above. */}
        <header
          className="flex items-center justify-between flex-wrap flex-shrink-0"
          style={{
            padding: '0.875rem clamp(1rem, 3vw, 2rem)',
            gap: '1rem',
            background: 'linear-gradient(135deg, #0C1163 0%, #2E54AB 100%)',
          }}
        >
          <div>
            <div
              className="text-white font-bold leading-tight"
              style={{ fontSize: '1.15rem' }}
            >
              LiveFlow
            </div>
            <div
              className="leading-tight"
              style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}
            >
              {WORK_ITEMS.length} pieces of work &middot; sole designer
            </div>
          </div>

          <div
            className="flex flex-shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.28)' }}
          >
            {LENSES.map((l) => (
              <button
                key={l.id}
                onClick={() => setLens(l.id)}
                aria-pressed={lens === l.id}
                className="font-semibold transition-colors duration-200 cursor-pointer"
                style={{
                  fontSize: '0.78rem',
                  padding: '0.45rem 0.8rem',
                  backgroundColor: lens === l.id ? '#ffffff' : 'transparent',
                  color: lens === l.id ? '#0C1163' : 'rgba(255,255,255,0.78)',
                }}
              >
                <span className="hidden sm:inline">{l.label}</span>
                <span className="sm:hidden">{l.short}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-1" style={{ minHeight: 0 }}>
          {/* Master rail */}
          <nav
            className={`${mobileDetailOpen ? 'hidden' : 'block'} md:block flex-shrink-0 w-full md:w-[20rem] lg:w-[23rem]`}
            style={{
              borderRight: '1px solid rgba(0,0,0,0.1)',
              overflowY: 'auto',
              backgroundColor: '#ffffff',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={lens}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {groups.map((group) => (
                  <div key={group.key}>
                    <div
                      className="sticky top-0 z-10"
                      style={{
                        padding: '0.7rem 1.25rem',
                        borderBottom: '1px solid rgba(0,0,0,0.07)',
                        backgroundColor: '#f6f7f9',
                      }}
                    >
                      <div
                        className="flex items-center justify-between"
                        style={{ gap: '0.5rem' }}
                      >
                        <span className="text-xs font-bold tracking-widest uppercase text-[#555]">
                          {group.label}
                        </span>
                        <span className="text-xs text-[#aaa]">{group.items.length}</span>
                      </div>
                      {group.sublabel && (
                        <p
                          className="text-[#999] leading-[1.5]"
                          style={{ fontSize: '0.72rem', marginTop: '0.35rem' }}
                        >
                          {group.sublabel}
                        </p>
                      )}
                    </div>

                    {group.items.map((item) => {
                      const active = item.id === selected.id;
                      return (
                        <button
                          key={`${group.key}-${item.id}`}
                          onClick={() => select(item.id)}
                          className="w-full text-left transition-colors duration-150 cursor-pointer hover:bg-[rgba(46,84,171,0.05)]"
                          style={{
                            padding: '0.8rem 1.25rem 0.8rem 1rem',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                            backgroundColor: active ? 'rgba(46,84,171,0.09)' : 'transparent',
                            borderLeft: `3px solid ${active ? '#2E54AB' : 'transparent'}`,
                          }}
                        >
                          <div
                            className="flex items-center"
                            style={{ gap: '0.5rem', marginBottom: '0.2rem' }}
                          >
                            <span
                              className="flex-shrink-0"
                              style={{
                                width: '6px',
                                height: '6px',
                                backgroundColor: KIND_TONE[item.kind],
                              }}
                            />
                            <span
                              className="font-semibold leading-tight"
                              style={{
                                fontSize: '0.9rem',
                                color: active ? '#2E54AB' : '#333',
                              }}
                            >
                              {item.title}
                            </span>
                          </div>
                          <div
                            className="text-[#999] leading-[1.45]"
                            style={{ fontSize: '0.76rem', paddingLeft: '0.875rem' }}
                          >
                            {item.oneLiner}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </nav>

          {/* Detail pane */}
          <main
            ref={detailRef}
            className={`${mobileDetailOpen ? 'block' : 'hidden'} md:block flex-1`}
            style={{ overflowY: 'auto', minWidth: 0, backgroundColor: '#fcfcfd' }}
          >
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="md:hidden flex items-center text-sm font-semibold text-[#666] w-full"
              style={{
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                backgroundColor: '#ffffff',
              }}
            >
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
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              All work
            </button>

            <AnimatePresence mode="wait">
              <motion.article
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  maxWidth: '44rem',
                  margin: '0 auto',
                  padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem) 5rem',
                }}
              >
                <div
                  className="flex flex-wrap items-center"
                  style={{ gap: '0.5rem', marginBottom: '1.25rem' }}
                >
                  <span
                    className="text-[0.65rem] font-bold tracking-widest uppercase"
                    style={{
                      padding: '0.3rem 0.6rem',
                      color: KIND_TONE[selected.kind],
                      border: `1px solid ${KIND_TONE[selected.kind]}`,
                    }}
                  >
                    {KIND_LABELS[selected.kind]}
                  </span>
                  {selected.themes.map((theme) => (
                    <span
                      key={theme}
                      className="text-[0.65rem] font-semibold tracking-widest uppercase text-[#666]"
                      style={{
                        padding: '0.3rem 0.6rem',
                        backgroundColor: 'rgba(0,0,0,0.04)',
                      }}
                    >
                      {THEME_LABELS[theme]}
                    </span>
                  ))}
                </div>

                <h1
                  className="font-bold text-[#1a1a1a] tracking-tight leading-tight"
                  style={{
                    fontSize: 'clamp(1.75rem,3.5vw,2.5rem)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {selected.title}
                </h1>
                <p
                  className="text-[#666] leading-[1.6]"
                  style={{ fontSize: '1.15rem', marginBottom: '2.5rem' }}
                >
                  {selected.oneLiner}
                </p>

                <Field label="The problem" body={selected.problem} />
                <Field label="What I did" body={selected.action} />

                {selected.media?.some((m) => m.src === 'command-bar') && (
                  <div style={{ marginBottom: '2.5rem' }}>
                    <Demo demoKey="command-bar" />
                  </div>
                )}

                <Field label="Outcome" body={selected.outcome} />
              </motion.article>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

function Field({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        className="text-xs font-bold tracking-widest uppercase text-[#999]"
        style={{ marginBottom: '0.625rem' }}
      >
        {label}
      </div>
      <p className="text-[1.15rem] text-[#666] leading-[1.8]" style={{ color: '#666' }}>
        {body}
      </p>
    </div>
  );
}
