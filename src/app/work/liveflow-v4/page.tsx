'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyNav from '@/components/casestudy/CaseStudyNav';
import {
  KIND_LABELS,
  LOOP_STAGES,
  THUMB_HEIGHT,
  WORK_ITEMS,
  type WorkItem,
  type WorkKind,
} from '@/content/liveflow';

/**
 * v4 - Hub and spoke.
 *
 * Not a document. This is the index page for a small site: every piece of work
 * has its own route at /work/liveflow-v4/[slug] and its own URL you can send
 * someone. The hub carries the argument - how the work happens - and the tiles
 * are the evidence.
 */

const KIND_TONE: Record<WorkKind, string> = {
  shipped: '#15803d',
  prototype: '#b45309',
  system: '#2E54AB',
  research: '#6d28d9',
};

/** Tint of each status colour, for the badge background. */
const KIND_TINT: Record<WorkKind, string> = {
  shipped: 'rgba(21,128,61,0.10)',
  prototype: 'rgba(180,83,9,0.10)',
  system: 'rgba(46,84,171,0.10)',
  research: 'rgba(109,40,217,0.10)',
};

const KIND_ORDER: WorkKind[] = ['shipped', 'system', 'prototype', 'research'];

/**
 * Filters are one flat row, not two taxonomies. "AI" is a theme and the rest
 * are types, which is impure - but AI is the first thing people look for here,
 * and one list means nothing to learn before you can browse.
 */
type Filter = 'all' | 'ai' | WorkKind;

const AI_TONE = '#6d28d9';

/**
 * The three claims this page has to land, each with one piece of work that
 * proves it. Written as assertions rather than description - a hiring manager
 * skims headlines, and these are the headlines.
 */
const CLAIMS = [
  {
    headline: 'I get my research from our recorded customer calls.',
    body: 'Every sales and customer call here is recorded. That is hundreds of hours of accountants describing exactly what is broken, and nobody has time to watch it. I query it with agents and pull reports out of it, pointed at whatever I am designing that week.',
    proofId: 'gong-research-agents',
    proofLabel: 'See how',
  },
  {
    headline: 'I build working prototypes, not mockups.',
    body: 'Real code, in front of a real accountant. They can use it badly and tell me why, which is worth more than any amount of reviewing static frames. Four accounting modules got prototyped this way before anyone committed engineering to them.',
    proofId: 'ai-transaction-categorization',
    proofLabel: 'Try a working demo',
  },
  {
    headline: 'I wrote a Claude skill so engineers can ship without me.',
    body: 'Nobody reviews every screen in a product this size. The skill encodes our design system as rules it can actually enforce, catches drift, and gives engineers enough to build smaller features correctly on their own.',
    proofId: 'design-system-claude-skill',
    proofLabel: 'See the system',
  },
] as const;

/**
 * Placeholders. Michael does not have these numbers yet - the $60K figure was
 * one example contract, not a headline stat, so nothing real goes here until
 * he pulls the actual data. Swap value/label and delete the placeholder flag.
 */
const STATS = [
  { value: '--', label: '[TODO] revenue or contracts influenced by this work' },
  { value: '--', label: '[TODO] adoption or usage of something I shipped' },
  { value: '--', label: '[TODO] leverage - work that happened without me' },
];

function Thumb({ work }: { work: WorkItem }) {
  return (
    <div
      style={{
        width: '100%',
        height: THUMB_HEIGHT,
        flexShrink: 0,
        // Light tint of the brand gradient. The full-strength version is fine
        // once per page, but nineteen of them at card size is overwhelming.
        background: 'linear-gradient(135deg, #E8EAF6 0%, #DCE5F5 100%)',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {work.thumbSrc ? (
        <img
          src={work.thumbSrc}
          alt={work.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span
          className="font-bold tracking-widest uppercase"
          style={{ fontSize: '0.62rem', color: '#97A3C4' }}
        >
          Screenshot
        </span>
      )}
    </div>
  );
}

function Tile({ work, index }: { work: WorkItem; index: number }) {
  const hasDemo = work.media?.some((m) => m.type === 'demo');
  const isAI = work.themes.includes('ai');
  // Flagship items render in the two-up grid, so they are physically wider and
  // carry larger type.
  const wide = work.depth === 'deep';

  return (
    <motion.div
      className={wide ? 'lf-card-lg' : 'lf-card-sm'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.4), ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/work/liveflow-v4/${work.id}`}
        className="group flex flex-col h-full bg-white border border-gray-200 shadow-[0_4px_48px_rgba(0,0,0,0.08)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] hover:border-gray-300"
        style={{ padding: '1.5rem' }}
      >
        <Thumb work={work} />

        <div
          className="flex items-center justify-between"
          style={{ marginBottom: '0.75rem', gap: '0.5rem' }}
        >
          <div className="flex items-center flex-wrap" style={{ gap: '0.375rem' }}>
            <span
              className="font-bold tracking-widest uppercase"
              style={{
                fontSize: '0.7rem',
                color: KIND_TONE[work.kind],
                backgroundColor: KIND_TINT[work.kind],
                padding: '0.25rem 0.5rem',
              }}
            >
              {KIND_LABELS[work.kind]}
            </span>
            {isAI && (
              <span
                className="font-bold tracking-widest uppercase"
                style={{
                  fontSize: '0.7rem',
                  color: AI_TONE,
                  backgroundColor: 'rgba(109,40,217,0.10)',
                  padding: '0.25rem 0.5rem',
                }}
              >
                AI
              </span>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0 transition-all duration-300 group-hover:stroke-[#2E54AB] group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>

        <h3
          className="font-bold text-[#333] leading-tight"
          style={{ fontSize: wide ? '1.6rem' : '1.25rem', marginBottom: '0.5rem' }}
        >
          {work.title}
        </h3>
        <p
          className="text-[#666] leading-[1.6]"
          style={{ fontSize: wide ? '1.1rem' : '1rem', marginBottom: '1rem' }}
        >
          {work.oneLiner}
        </p>

        {hasDemo && (
          <span
            className="inline-flex items-center self-start font-bold tracking-widest uppercase mt-auto"
            style={{
              fontSize: '0.62rem',
              paddingTop: '0.25rem',
              gap: '0.375rem',
              padding: '0.3rem 0.6rem',
              color: '#2E54AB',
              border: '1px solid #2E54AB',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Live demo
          </span>
        )}
      </Link>
    </motion.div>
  );
}

function Segment({
  label,
  tone = '#2E54AB',
  active,
  first = false,
  onClick,
}: {
  label: string;
  tone?: string;
  active: boolean;
  first?: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-semibold cursor-pointer"
      style={{
        fontSize: '0.85rem',
        padding: '0.45rem 0.85rem',
        borderLeft: first ? 'none' : '1px solid rgba(0,0,0,0.14)',
        backgroundColor: active ? tone : hovered ? 'rgba(0,0,0,0.03)' : 'transparent',
        color: active ? '#ffffff' : '#555',
        transition: 'background-color 140ms ease-out, color 140ms ease-out',
      }}
    >
      {label}
    </button>
  );
}

export default function LiveFlowV4Hub() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered =
    filter === 'all'
      ? WORK_ITEMS
      : filter === 'ai'
        ? WORK_ITEMS.filter((item) => item.themes.includes('ai'))
        : WORK_ITEMS.filter((item) => item.kind === filter);

  const ordered = [
    ...filtered.filter((item) => item.depth === 'deep'),
    ...filtered.filter((item) => item.depth !== 'deep'),
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0C1163 0%, #2E54AB 100%)',
          paddingTop: '10rem',
          paddingBottom: '5rem',
        }}
      >
        <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: 'var(--max-width)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="font-bold tracking-widest uppercase"
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '1.25rem',
              }}
            >
              LiveFlow &middot; Product Designer &middot; Series A
            </div>

            <h1
              className="font-sans font-bold tracking-tight text-white"
              style={{
                fontSize: 'clamp(2rem,4.5vw,3.5rem)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                maxWidth: '24ch',
              }}
            >
              Designing an ERP that closes its own books.
            </h1>
            <p
              className="text-white/85 leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem,2vw,1.3rem)', maxWidth: '40rem' }}
            >
              Flow closes the books, reconciles accounts, and consolidates across entities on its
              own. I design it, prototype it in real code, and build the systems that let it ship
              without me in the loop.
            </p>

          </motion.div>
        </div>
      </div>

      <div
        className="mx-auto px-6 lg:px-12"
        style={{ maxWidth: 'var(--max-width)', paddingTop: '5rem' }}
      >
        {/* --------------------------------------------------------- the stats */}
        <section
          className="lf-stats"
          style={{ marginBottom: '4rem', paddingBottom: '3rem' }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .lf-stats { display: flex; flex-wrap: wrap; gap: 3rem; }
                .lf-stats > div { flex: 0 1 14rem; }
              `,
            }}
          />
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div
                className="font-bold"
                style={{ fontSize: '2.75rem', color: '#2E54AB', lineHeight: 1.05 }}
              >
                {stat.value}
              </div>
              <div
                className="text-[#666] leading-snug"
                style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* ---------------------------------------------------------- the sell */}
        <section style={{ marginBottom: '5rem' }}>
          {CLAIMS.map((claim, i) => {
            const proof = WORK_ITEMS.find((w) => w.id === claim.proofId);
            return (
              <div
                key={claim.headline}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr]"
                style={{
                  gap: '1.5rem',
                  padding: '2rem 0',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.12)',
                  alignItems: 'start',
                }}
              >
                <h2
                  className="font-bold text-[#1a1a1a] tracking-tight"
                  style={{ fontSize: 'clamp(1.4rem,2.6vw,2rem)', lineHeight: 1.2 }}
                >
                  {claim.headline}
                </h2>

                <div>
                  <p
                    className="text-[#666] leading-[1.7]"
                    style={{ fontSize: '1.05rem', marginBottom: proof ? '1rem' : '0' }}
                  >
                    {claim.body}
                  </p>
                  {proof && (
                    <Link
                      href={`/work/liveflow-v4/${proof.id}`}
                      className="group inline-flex items-center font-bold hover:gap-3 transition-all"
                      style={{ gap: '0.5rem', fontSize: '0.9rem', color: '#2E54AB' }}
                    >
                      {claim.proofLabel}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* ------------------------------------------------------ the process */}
        <section style={{ marginBottom: '4.5rem' }}>
          <h2
            className="font-bold text-[#333] tracking-tight"
            style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}
          >
            The loop
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 bg-white border border-gray-200"
            style={{ gap: '1px', backgroundColor: 'rgba(0,0,0,0.1)' }}
          >
            {LOOP_STAGES.map((stage, i) => {
              const count = WORK_ITEMS.filter((w) => w.loopStage === stage.id).length;
              // Four across is too cramped to read - the last one wraps onto
              // its own full-width row instead.
              const spansRow = i === LOOP_STAGES.length - 1;
              return (
                <div
                  key={stage.id}
                  className="bg-white"
                  style={{
                    padding: '1.75rem',
                    gridColumn: spansRow ? '1 / -1' : 'auto',
                  }}
                >
                  <div
                    className="flex items-center"
                    style={{ gap: '0.625rem', marginBottom: '0.75rem' }}
                  >
                    <span
                      className="flex items-center justify-center font-bold flex-shrink-0"
                      style={{
                        width: '1.6rem',
                        height: '1.6rem',
                        backgroundColor: '#2E54AB',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-bold text-[#333]" style={{ fontSize: '1.15rem' }}>
                      {stage.title}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#bbb' }}>{count}</span>
                  </div>
                  <p
                    className="text-[#666] leading-[1.7]"
                    style={{ fontSize: '1rem', maxWidth: spansRow ? '52rem' : 'none' }}
                  >
                    {stage.blurb}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------- the work */}
        <section id="work">
          <h2
            className="font-bold text-[#333] tracking-tight"
            style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', marginBottom: '0.75rem' }}
          >
            The work
          </h2>
          <p
            className="text-[#666] leading-[1.8]"
            style={{ fontSize: '1.15rem', marginBottom: '2rem', maxWidth: '42rem' }}
          >
            Every piece has its own page. Filter by type or theme, then open whatever you care
            about.
          </p>

          {/* Filters. Sentence case and a segmented control rather than a wall
              of uppercase chips - the counts were shouting louder than the
              labels. */}
          <div
            className="flex flex-wrap items-center justify-between"
            style={{
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {/* One taxonomy, not two. Type answers "is this real?" and is
                already the card badge - a second theme axis meant learning two
                systems to browse a portfolio. */}
            <div className="flex flex-wrap" style={{ border: '1px solid rgba(0,0,0,0.14)' }}>
              <Segment label="All" first active={filter === 'all'} onClick={() => setFilter('all')} />
              <Segment
                label="AI"
                tone={AI_TONE}
                active={filter === 'ai'}
                onClick={() => setFilter(filter === 'ai' ? 'all' : 'ai')}
              />
              {KIND_ORDER.map((k) => (
                <Segment
                  key={k}
                  label={KIND_LABELS[k]}
                  tone={KIND_TONE[k]}
                  active={filter === k}
                  onClick={() => setFilter(filter === k ? 'all' : k)}
                />
              ))}
            </div>

            {filter !== 'all' && (
              <span style={{ fontSize: '0.85rem', color: '#888' }}>
                {filtered.length} of {WORK_ITEMS.length}
              </span>
            )}
          </div>

          {/* Cards stretch to their own row's height (grid's default) so tags
              line up along the bottom of each row. Explicitly NOT gridAutoRows
              1fr - that sizes every row to the tallest row in the entire grid,
              which is what made these enormous. */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                /* Plain stylesheet, not Tailwind and not styled-jsx. This
                   project's Turbopack build drops utilities intermittently -
                   it dropped grid-cols and col-span entirely - and styled-jsx
                   emitted no <style> tag here at all. This always renders.

                   One flow, two card widths. Flagship cards are half-width and
                   the rest are a third, and they simply pack next to each
                   other - so a leftover flagship sits beside a small card
                   instead of each stranding its own row. Widths never change,
                   including under a filter. */
                .lf-flow {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 1.25rem;
                  align-items: stretch;
                }
                .lf-flow > * { flex: 0 1 100%; min-width: 0; }
                @media (min-width: 640px) {
                  .lf-flow > .lf-card-lg { flex-basis: calc(50% - 0.625rem); }
                  .lf-flow > .lf-card-sm { flex-basis: calc(50% - 0.625rem); }
                }
                @media (min-width: 1024px) {
                  .lf-flow > .lf-card-lg { flex-basis: calc(50% - 0.625rem); }
                  .lf-flow > .lf-card-sm { flex-basis: calc(33.333% - 0.834rem); }
                }
              `,
            }}
          />

          {/* Flagship first, then the rest - one flow, so a leftover flagship
              packs beside the small cards rather than stranding a row. */}
          <div className="lf-flow">
            {ordered.map((work, i) => (
              <Tile key={work.id} work={work} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-[#999] italic" style={{ padding: '2rem 0' }}>
              Nothing matches that combination.
            </p>
          )}
        </section>
      </div>

      <CaseStudyNav next={{ href: '/work/orgo', title: 'Orgo: The App' }} />

      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: 'var(--max-width)' }}>
        <Footer />
      </div>
    </div>
  );
}
