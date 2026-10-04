'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  KIND_LABELS,
  THEME_LABELS,
  WORK_ITEMS,
  type WorkItem,
  type WorkKind,
  type WorkTheme,
} from '@/content/liveflow';
import { Demo } from '@/components/liveflow-demos';
import { Figure } from './Primitives';

const KIND_ORDER: WorkKind[] = ['shipped', 'prototype', 'system', 'research'];
const THEME_ORDER: WorkTheme[] = [
  'ai',
  'multi-entity',
  'data-integrity',
  'accounting-core',
  'design-ops',
];

function Chip({
  label,
  count,
  active,
  onClick,
  brandColor,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
  brandColor: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer"
      style={{
        padding: '0.5rem 0.875rem',
        border: `1px solid ${active ? brandColor : 'rgba(0,0,0,0.12)'}`,
        backgroundColor: active ? brandColor : '#ffffff',
        color: active ? '#ffffff' : '#666',
      }}
    >
      {label}
      {count !== undefined && (
        <span style={{ marginLeft: '0.5rem', opacity: 0.7 }}>{count}</span>
      )}
    </button>
  );
}

function KindBadge({ kind }: { kind: WorkKind }) {
  const tone: Record<WorkKind, string> = {
    shipped: '#15803d',
    prototype: '#b45309',
    system: '#2E54AB',
    research: '#6d28d9',
  };
  return (
    <span
      className="inline-block text-[0.65rem] font-bold tracking-widest uppercase flex-shrink-0"
      style={{
        padding: '0.25rem 0.5rem',
        color: tone[kind],
        border: `1px solid ${tone[kind]}`,
      }}
    >
      {KIND_LABELS[kind]}
    </span>
  );
}

function Row({
  item,
  expanded,
  onToggle,
}: {
  item: WorkItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full text-left transition-colors duration-200 cursor-pointer hover:bg-[rgba(0,0,0,0.015)]"
        style={{ padding: '1.25rem 0.5rem', display: 'block' }}
      >
        <div
          className="flex items-start"
          style={{ gap: '1rem' }}
        >
          <KindBadge kind={item.kind} />
          <div className="flex-1 min-w-0">
            <div
              className="font-bold text-[1.05rem] text-[#333]"
              style={{ marginBottom: '0.25rem' }}
            >
              {item.title}
            </div>
            <div className="text-[0.95rem] text-[#666] leading-relaxed">{item.oneLiner}</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
            style={{
              marginTop: '0.25rem',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 250ms ease-out',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0.5rem 0.5rem 2.5rem 0.5rem' }}>
              <div style={{ maxWidth: '46rem' }}>
                <Detail label="The problem" body={item.problem} />
                <Detail label="What I did" body={item.action} />
                <Detail label="Outcome" body={item.outcome} />

                {item.media?.map((media) =>
                  media.type === 'demo' ? (
                    <div key={media.src} style={{ marginTop: '2rem' }}>
                      {media.src === 'command-bar' && <Demo demoKey="command-bar" />}
                      {media.caption && (
                        <p
                          className="text-[0.85rem] text-[#999] italic"
                          style={{ marginTop: '0.75rem' }}
                        >
                          {media.caption}
                        </p>
                      )}
                    </div>
                  ) : (
                    <Figure
                      key={media.src}
                      type={media.type}
                      src={media.src}
                      caption={media.caption}
                    />
                  )
                )}

                <div
                  className="flex flex-wrap"
                  style={{ gap: '0.5rem', marginTop: '1.5rem' }}
                >
                  {item.themes.map((theme) => (
                    <span
                      key={theme}
                      className="text-[0.7rem] font-semibold tracking-wider uppercase"
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        color: '#666',
                      }}
                    >
                      {THEME_LABELS[theme]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Detail({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        className="text-xs font-bold tracking-widest uppercase text-[#999]"
        style={{ marginBottom: '0.5rem' }}
      >
        {label}
      </div>
      <p className="text-[1.05rem] text-[#666] leading-[1.75]">{body}</p>
    </div>
  );
}

interface WorkIndexProps {
  brandColor: string;
  /** Hide the filter chips - used when embedding as a plain ledger. */
  filterable?: boolean;
  /** Restrict to a subset, e.g. a single loop stage or everything not deep. */
  items?: WorkItem[];
}

export default function WorkIndex({
  brandColor,
  filterable = true,
  items = WORK_ITEMS,
}: WorkIndexProps) {
  const [kind, setKind] = useState<WorkKind | null>(null);
  const [theme, setTheme] = useState<WorkTheme | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (kind === null || item.kind === kind) &&
          (theme === null || item.themes.includes(theme))
      ),
    [items, kind, theme]
  );

  const kindCount = (k: WorkKind) => items.filter((i) => i.kind === k).length;
  const themeCount = (t: WorkTheme) => items.filter((i) => i.themes.includes(t)).length;

  return (
    <div>
      {filterable && (
        <div style={{ marginBottom: '2rem' }}>
          <div
            className="flex flex-wrap items-center"
            style={{ gap: '0.5rem', marginBottom: '0.75rem' }}
          >
            <Chip
              label="All"
              count={items.length}
              active={kind === null}
              onClick={() => setKind(null)}
              brandColor={brandColor}
            />
            {KIND_ORDER.map((k) => (
              <Chip
                key={k}
                label={KIND_LABELS[k]}
                count={kindCount(k)}
                active={kind === k}
                onClick={() => setKind(kind === k ? null : k)}
                brandColor={brandColor}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center" style={{ gap: '0.5rem' }}>
            {THEME_ORDER.map((t) => (
              <Chip
                key={t}
                label={THEME_LABELS[t]}
                count={themeCount(t)}
                active={theme === t}
                onClick={() => setTheme(theme === t ? null : t)}
                brandColor={brandColor}
              />
            ))}
          </div>
        </div>
      )}

      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        {filtered.map((item) => (
          <Row
            key={item.id}
            item={item}
            expanded={expanded === item.id}
            onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[1rem] text-[#999] italic" style={{ padding: '2rem 0.5rem' }}>
          Nothing matches that combination.
        </p>
      )}
    </div>
  );
}
