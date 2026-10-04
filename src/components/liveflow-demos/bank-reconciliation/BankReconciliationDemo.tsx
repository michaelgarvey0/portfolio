'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Ban,
  BarChart3,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  FileText,
  HelpCircle,
  Landmark,
  List,
  Lock,
  MoreVertical,
  Search,
  Settings,
} from 'lucide-react';
import { LF, inter } from '../theme';
import { usePrototypeExpanded } from '../PrototypeStage';
import FloatingPanel from '../ai-categorization/FloatingPanel';
import { ACCOUNT, PERIODS, STATEMENT, TRANSACTIONS } from './data';
import type { PeriodStatus, ReconciliationPeriod, ReconTransaction } from './types';

// ── date + number helpers ───────────────────────────────────────────────

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function isoOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function money(n: number): string {
  return Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtSigned(n: number): string {
  return n < 0 ? `-$${money(n)}` : `$${money(n)}`;
}

function fmtGroupLabel(startIso: string, endIso: string): string {
  const start = parseISO(startIso);
  const end = parseISO(endIso);
  const month = start.toLocaleDateString('en-US', { month: 'short' });
  if (startIso === endIso) return `${month} ${start.getDate()}, ${start.getFullYear()}`;
  return `${month} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
}

function daysApart(a: string, b: string): number {
  return Math.round((parseISO(b).getTime() - parseISO(a).getTime()) / 86400000);
}

// ── mini calendar (shared between the period cards and the detail view) ──

/**
 * Exactly 5 or 6 rows (35 or 42 cells), whichever the actual date range needs -
 * never a fixed count. Matches the real product's calendar grid, which grows a
 * 6th row only when a period's weekday alignment doesn't fit in 5.
 */
function buildCalendarDays(start: Date, end: Date): Date[] {
  const gridStart = new Date(start);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const days: Date[] = [];
  for (let i = 0; i < 35; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  if (days[34].getTime() < end.getTime()) {
    for (let i = 35; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      days.push(d);
    }
  }
  return days;
}

function PeriodSwitcher({
  period,
  periods,
  onChange,
}: {
  period: ReconciliationPeriod;
  periods: ReconciliationPeriod[];
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  return (
    <>
      <button
        ref={(el) => {
          triggerRef.current = el;
          setAnchorEl(el);
        }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center w-full"
        style={{ gap: '0.375rem', cursor: 'pointer' }}
      >
        <span
          className="font-medium flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontSize: '0.875rem', color: LF.grey[800] }}
        >
          {period.label}
        </span>
        <ChevronDown size={16} style={{ color: LF.grey[600], flexShrink: 0 }} />
      </button>
      <FloatingPanel open={open} anchorEl={anchorEl}>
        <div
          style={{
            border: `1px solid ${LF.grey[100]}`,
            borderRadius: '0.6rem',
            backgroundColor: LF.grey[0],
            boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
            padding: '0.3rem',
          }}
        >
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onChange(p.id);
                setOpen(false);
              }}
              className="flex w-full items-center text-left"
              style={{
                fontSize: '0.8rem',
                padding: '0.4rem 0.5rem',
                borderRadius: '0.4rem',
                backgroundColor: p.id === period.id ? LF.grey[25] : 'transparent',
                color: LF.grey[800],
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </FloatingPanel>
    </>
  );
}

function MiniCalendar({ period, compact }: { period: ReconciliationPeriod; compact?: boolean }) {
  const start = parseISO(period.startDate);
  const end = parseISO(period.endDate);
  const days = buildCalendarDays(start, end);

  const cellSize = compact ? '22px' : '2.75rem';
  const fontSize = compact ? '0.65rem' : '0.85rem';
  const locked = period.status === 'locked';

  return (
    <div style={{ position: 'relative' }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: compact ? '3px' : '0.25rem' }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-center font-medium"
            style={{ height: compact ? '14px' : '1.3rem', fontSize: compact ? '0.6rem' : '0.65rem', color: LF.grey[400] }}
          >
            {d}
          </div>
        ))}
        {days.map((d, i) => {
          const iso = isoOf(d);
          const inPeriod = !locked && d.getTime() >= start.getTime() && d.getTime() <= end.getTime();
          const isException = inPeriod && period.exceptionDates.includes(iso);
          const isNoActivity = inPeriod && !isException && period.noActivityDates.includes(iso);

          // Four distinct states, matching the real design: padding day (before/after
          // the period, barely visible), no-activity (in period, nothing happened),
          // reconciled/has-activity (green), and flagged exception (peach outline).
          const tone = isException
            ? { bg: LF.tertiary.peach50, border: LF.tertiary.peach900, text: LF.tertiary.peach900 }
            : isNoActivity
              ? { bg: LF.grey[50], border: 'transparent', text: LF.grey[400] }
              : inPeriod
                ? { bg: LF.secondary.green50, border: 'transparent', text: LF.secondary.green900 }
                : { bg: 'transparent', border: 'transparent', text: LF.grey[100] };

          return (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                boxSizing: 'border-box',
                width: cellSize,
                height: cellSize,
                fontSize,
                borderRadius: compact ? '6px' : '8px',
                backgroundColor: tone.bg,
                border: `1px solid ${tone.border}`,
                color: tone.text,
              }}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>
      {locked && (
        <div
          className="flex items-center justify-center"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(253,253,253,0.6)',
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{ width: '2.25rem', height: '2.25rem', borderRadius: '999px', backgroundColor: LF.grey[100] }}
          >
            <Lock size={14} style={{ color: LF.grey[600] }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── status pill, shared by period cards and the account bar ─────────────

const STATUS_META: Record<PeriodStatus, { label: string; dot: string; bg: string; text: string }> = {
  reconciled: { label: 'Reconciled', dot: LF.secondary.green900, bg: LF.secondary.green50, text: LF.secondary.green900 },
  'needs-attention': { label: 'Needs attention', dot: LF.tertiary.peach900, bg: LF.tertiary.peach50, text: LF.tertiary.peach900 },
  locked: { label: 'Locked', dot: LF.grey[500], bg: LF.grey[50], text: LF.grey[600] },
};

function StatusPill({ status }: { status: PeriodStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center flex-shrink-0"
      style={{ gap: '0.375rem', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '31px', backgroundColor: meta.bg, color: meta.text, letterSpacing: '0.06px' }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '999px', backgroundColor: meta.dot }} />
      {meta.label}
    </span>
  );
}

// ── period card (list view) ──────────────────────────────────────────────

function PeriodCard({ period, onOpen }: { period: ReconciliationPeriod; onOpen: () => void }) {
  return (
    <div
      className="flex flex-col items-end"
      style={{
        flexShrink: 0,
        gap: '1.25rem',
        border: `1px solid ${LF.grey[100]}`,
        borderRadius: '1rem',
        backgroundColor: LF.grey[0],
        padding: '1.5rem',
      }}
    >
      <div className="flex items-center justify-between w-full" style={{ gap: '1rem' }}>
        <span className="font-medium" style={{ fontSize: '1.125rem', color: LF.grey[800] }}>
          {period.label}
        </span>
        <StatusPill status={period.status} />
      </div>

      {period.status === 'locked' ? (
        <div className="w-full" style={{ fontSize: '0.8rem', color: LF.grey[600], backgroundColor: LF.grey[25], padding: '0.75rem', borderRadius: '0.5rem' }}>
          A previous period is open. Reconcile that period first.
        </div>
      ) : (
        <div
          className="w-full"
          style={{ border: `1px solid ${LF.grey[100]}`, borderRadius: '0.75rem', backgroundColor: LF.grey[25], padding: '0.25rem' }}
        >
          <div className="flex items-center justify-between" style={{ padding: '0 0.75rem', height: '1.875rem', borderBottom: `1px solid ${LF.grey[100]}` }}>
            <span className="font-medium" style={{ fontSize: '0.75rem', color: LF.grey[600] }}>Opening</span>
            <span style={{ fontSize: '0.75rem', color: LF.grey[900] }}>${money(period.opening)}</span>
          </div>
          <div className="flex items-center justify-between" style={{ padding: '0 0.75rem', height: '1.875rem' }}>
            <span className="font-medium" style={{ fontSize: '0.75rem', color: LF.grey[600] }}>Closing</span>
            <span style={{ fontSize: '0.75rem', color: LF.grey[900] }}>${money(period.closing)}</span>
          </div>
        </div>
      )}

      <MiniCalendar period={period} />

      {period.status === 'reconciled' && (
        <button
          onClick={onOpen}
          className="inline-flex items-center font-medium"
          style={{ gap: '0.4rem', fontSize: '0.8rem', padding: '0.45rem 0.9rem', borderRadius: '0.5rem', border: `1px solid ${LF.grey[200]}`, color: LF.grey[700], cursor: 'pointer' }}
        >
          View report <FileText size={13} />
        </button>
      )}
      {period.status === 'needs-attention' && (
        <button
          onClick={onOpen}
          className="inline-flex items-center font-medium"
          style={{ gap: '0.375rem', fontSize: '0.875rem', padding: '0.5rem 0.75rem 0.5rem 0.625rem', borderRadius: '0.75rem', backgroundColor: LF.primary[900], color: LF.primary[50], cursor: 'pointer' }}
        >
          Reconcile <ChevronRight size={16} />
        </button>
      )}
      {period.status === 'locked' && (
        <button
          disabled
          className="inline-flex items-center font-medium"
          style={{ gap: '0.35rem', fontSize: '0.75rem', padding: '0.45rem 0.9rem', borderRadius: '0.75rem', backgroundColor: LF.primary[50], color: LF.primary[400], cursor: 'default' }}
        >
          <ChevronLeft size={13} /> Reconcile prior period first
        </button>
      )}
    </div>
  );
}

// ── period carousel: active card at 100%, each step out is 80% of the ──
// previous step's scale/opacity. Prev/next, arrow/Home/End keys, click a
// side card, and trackpad wheel all drive activeIndex.

const CAROUSEL_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const CAROUSEL_DURATION = 0.48;

function PeriodCarousel({
  periods,
  activeIndex,
  onActiveIndexChange,
  onOpen,
}: {
  periods: ReconciliationPeriod[];
  activeIndex: number;
  onActiveIndexChange: (updater: (i: number) => number) => void;
  onOpen: (id: string) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardSize, setActiveCardSize] = useState({ width: 320, height: 320 });
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const keyboardNavRef = useRef(false);
  const wheelLockRef = useRef(false);
  const wheelTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const measure = () => {
    const widths = cardRefs.current.map((el) => el?.offsetWidth ?? 0).filter(Boolean);
    const heights = cardRefs.current.map((el) => el?.offsetHeight ?? 0).filter(Boolean);
    if (widths.length) setActiveCardSize({ width: Math.max(...widths), height: Math.max(...heights) });
  };

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [periods.length]);

  useEffect(() => {
    if (keyboardNavRef.current) {
      cardRefs.current[activeIndex]?.querySelector('button')?.focus();
      keyboardNavRef.current = false;
    }
  }, [activeIndex]);

  const clampIndex = (i: number) => Math.min(periods.length - 1, Math.max(0, i));

  const go = (target: number | ((i: number) => number), viaKeyboard: boolean) => {
    onActiveIndexChange((i) => clampIndex(typeof target === 'function' ? target(i) : target));
    if (viaKeyboard) keyboardNavRef.current = true;
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 8) return;
    if (wheelLockRef.current) return;
    wheelLockRef.current = true;
    go((i) => i + (e.deltaX > 0 ? 1 : -1), false);
    window.clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 350);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go((i) => i + 1, true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go((i) => i - 1, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(periods.length - 1, true);
    }
  };

  const CARD_GAP = 32;
  const instant = reducedMotion;

  const cumulativeOffset = (n: number) => {
    const sign = n < 0 ? -1 : 1;
    const a = Math.abs(n);
    return sign * (4.5 * activeCardSize.width * (1 - Math.pow(0.8, a)) + a * CARD_GAP);
  };

  return (
    <div
      ref={viewportRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Reconciliation periods"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      style={{
        position: 'relative',
        height: activeCardSize.height + 120,
        overflow: 'visible',
        outline: 'none',
      }}
    >
      {periods.map((p, i) => {
        const signedOffset = i - activeIndex;
        const dist = Math.abs(signedOffset);
        const scale = Math.pow(0.8, dist);
        const opacity = Math.pow(0.8, dist);
        const x = cumulativeOffset(signedOffset);
        const isActive = i === activeIndex;
        const clickable = !isActive && Math.abs(i - activeIndex) <= 2;
        return (
          <div
            key={p.id}
            style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 - Math.round(dist * 10) }}
          >
            <motion.div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              animate={{ x, scale, opacity }}
              transition={instant ? { duration: 0 } : { duration: CAROUSEL_DURATION, ease: CAROUSEL_EASE }}
              style={{ transformOrigin: 'center center', pointerEvents: isActive || clickable ? 'auto' : 'none', cursor: isActive && p.status !== 'locked' ? 'pointer' : undefined }}
              onClick={() => {
                if (isActive) {
                  if (p.status !== 'locked') onOpen(p.id);
                } else if (clickable) {
                  go(i, false);
                }
              }}
              tabIndex={isActive ? 0 : -1}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <PeriodCard period={p} onOpen={() => onOpen(p.id)} />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// ── reconciliation status table (detail view) ────────────────────────────

function ReconTable({ period }: { period: ReconciliationPeriod }) {
  const rows = [
    { label: 'Opening balance', ...period.summary.openingBalance },
    { label: 'Money in', ...period.summary.moneyIn },
    { label: 'Money out', ...period.summary.moneyOut },
  ];
  const totals = rows.reduce(
    (acc, r) => ({ bank: acc.bank + r.bank, flow: acc.flow + r.flow, deferred: acc.deferred + r.deferred }),
    { bank: 0, flow: 0, deferred: 0 }
  );
  const variance = (r: { bank: number; flow: number; deferred: number }) => r.bank - r.flow - r.deferred;

  const cols = 'repeat(5, minmax(85px, 1fr))';

  return (
    <div
      className="flex flex-col justify-center"
      style={{ backgroundColor: LF.grey[25], border: `1px solid ${LF.grey[100]}`, borderRadius: '1rem', padding: '0.25rem', height: '100%', width: '100%', minWidth: 0, overflow: 'hidden' }}
    >
      <div className="grid" style={{ gridTemplateColumns: cols, flex: 1, minHeight: '36px', alignItems: 'center', borderBottom: `1px solid ${LF.grey[100]}` }}>
        <span className="font-medium" style={{ fontSize: '0.75rem', color: LF.grey[600], paddingLeft: '0.75rem' }}>Reconciliation status</span>
        <span className="text-right font-medium" style={{ fontSize: '0.75rem', color: LF.grey[600], paddingRight: '0.75rem' }}>Bank</span>
        <span className="text-right font-medium" style={{ fontSize: '0.75rem', color: LF.grey[600], paddingRight: '0.75rem' }}>Flow</span>
        <span className="text-right font-medium" style={{ fontSize: '0.75rem', color: LF.grey[600], paddingRight: '0.75rem' }}>Deferred</span>
        <span className="text-right font-medium" style={{ fontSize: '0.75rem', color: LF.grey[600], paddingRight: '0.75rem' }}>Variance</span>
      </div>
      {rows.map((r, i) => {
        const v = variance(r);
        const isLastDataRow = i === rows.length - 1;
        return (
          <div
            key={r.label}
            className="grid"
            style={{ gridTemplateColumns: cols, flex: 1, minHeight: '36px', alignItems: 'center', borderBottom: `1px solid ${isLastDataRow ? LF.grey[200] : LF.grey[100]}` }}
          >
            <span style={{ fontSize: '0.875rem', color: LF.grey[900], paddingLeft: '0.75rem' }}>{r.label}</span>
            <span className="text-right tabular-nums" style={{ fontSize: '0.875rem', color: LF.grey[900], paddingRight: '0.75rem' }}>${money(r.bank)}</span>
            <span className="text-right tabular-nums" style={{ fontSize: '0.875rem', color: LF.grey[900], paddingRight: '0.75rem' }}>${money(r.flow)}</span>
            <span className="text-right tabular-nums" style={{ fontSize: '0.875rem', color: LF.grey[900], paddingRight: '0.75rem' }}>${money(r.deferred)}</span>
            <span className="text-right tabular-nums font-medium" style={{ fontSize: '0.875rem', color: v !== 0 ? LF.tertiary.peach900 : LF.grey[900], paddingRight: '0.75rem' }}>
              ${money(v)}
            </span>
          </div>
        );
      })}
      <div className="grid" style={{ gridTemplateColumns: cols, flex: 1, minHeight: '36px', alignItems: 'center' }}>
        <span className="font-medium" style={{ fontSize: '0.875rem', color: LF.grey[900], paddingLeft: '0.75rem' }}>Variance</span>
        <span className="text-right tabular-nums" style={{ fontSize: '0.875rem', color: LF.grey[900], paddingRight: '0.75rem' }}>${money(totals.bank)}</span>
        <span className="text-right tabular-nums" style={{ fontSize: '0.875rem', color: LF.grey[900], paddingRight: '0.75rem' }}>${money(totals.flow)}</span>
        <span className="text-right tabular-nums" style={{ fontSize: '0.875rem', color: LF.grey[900], paddingRight: '0.75rem' }}>${money(totals.deferred)}</span>
        <span className="text-right tabular-nums font-medium" style={{ fontSize: '0.875rem', color: LF.tertiary.peach900, paddingRight: '0.75rem' }}>
          ${money(variance(totals))}
        </span>
      </div>
    </div>
  );
}

// ── transaction list, grouped by consecutive same-status days ───────────

interface TxnGroup {
  key: string;
  label: string;
  allMatched: boolean;
  txns: ReconTransaction[];
}

function buildGroups(transactions: ReconTransaction[]): TxnGroup[] {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  const groups: TxnGroup[] = [];
  for (const t of sorted) {
    const matched = t.matchStatus === 'matched';
    const last = groups[groups.length - 1];
    if (last && last.allMatched === matched && daysApart(last.txns[last.txns.length - 1].date, t.date) <= 1) {
      last.txns.push(t);
    } else {
      groups.push({ key: t.id, label: '', allMatched: matched, txns: [t] });
    }
  }
  return groups.map((g) => ({
    ...g,
    label: fmtGroupLabel(g.txns[0].date, g.txns[g.txns.length - 1].date),
  }));
}

function VendorAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0 font-bold"
      style={{ width: '20px', height: '20px', borderRadius: '999px', backgroundColor: `${color}1a`, color, fontSize: '0.5rem' }}
    >
      {initials}
    </div>
  );
}

function TransactionRow({ txn, onToggle, last }: { txn: ReconTransaction; onToggle: () => void; last: boolean }) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center cursor-pointer text-left"
      style={{ padding: '0.5rem 0', borderBottom: last ? 'none' : `1px solid ${LF.grey[100]}` }}
    >
      <div className="flex items-center flex-1" style={{ gap: '0.5rem', padding: '0 0.75rem', minWidth: 0 }}>
        <VendorAvatar initials={txn.vendorInitials} color={txn.vendorColor} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '0.875rem', color: LF.grey[800] }}>
            {txn.memo} - {txn.vendor}
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '0.75rem', color: LF.grey[600] }}>
            {txn.id} · {txn.source === 'quickbooks' ? 'QuickBooks' : 'Flow'}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end flex-shrink-0" style={{ width: '106px', padding: '0 0.75rem' }}>
        <span
          className="flex-shrink-0"
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.5rem',
            backgroundColor: txn.matchStatus === 'matched' ? LF.secondary.green50 : LF.tertiary.peach50,
            color: txn.matchStatus === 'matched' ? LF.secondary.green900 : LF.tertiary.peach900,
          }}
        >
          {txn.matchStatus === 'matched' ? 'Matched' : txn.matchStatus === 'in-bank-only' ? 'In Bank only' : 'In Flow only'}
        </span>
      </div>
      <div className="flex-shrink-0 text-right" style={{ width: '122px', padding: '0 0.75rem' }}>
        <span className="tabular-nums" style={{ fontSize: '0.875rem', color: LF.grey[800] }}>
          {fmtSigned(txn.amount)}
        </span>
      </div>
      <div className="flex items-center justify-center flex-shrink-0" style={{ width: '30px' }}>
        <MoreVertical size={16} style={{ color: LF.grey[400] }} />
      </div>
    </button>
  );
}

function FilterChip({
  children,
  icon,
  width,
  chevron = true,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  width?: string;
  chevron?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex items-center flex-shrink-0"
      style={{
        gap: '0.5rem',
        border: `1px solid ${LF.grey[100]}`,
        borderRadius: '0.75rem',
        height: '2.25rem',
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        color: LF.grey[600],
        backgroundColor: LF.grey[0],
        whiteSpace: 'nowrap',
        width,
      }}
    >
      {icon ?? null}
      <span
        className={width ? 'flex-1' : undefined}
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left' }}
      >
        {children}
      </span>
      {chevron && <ChevronDown size={16} style={{ color: LF.grey[600], flexShrink: 0 }} />}
    </button>
  );
}

function TransactionPanel({ transactions, onToggle }: { transactions: ReconTransaction[]; onToggle: (id: string) => void }) {
  const [search, setSearch] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () => transactions.filter((t) => (t.vendor + t.memo).toLowerCase().includes(search.toLowerCase())),
    [transactions, search]
  );
  const groups = useMemo(() => buildGroups(filtered), [filtered]);

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: LF.grey[0], border: `1px solid ${LF.grey[100]}`, borderRadius: '1.5rem', padding: '0.5rem', gap: '0.5rem', overflow: 'hidden', height: '100%' }}
    >
      <div
        className="flex items-center flex-shrink-0"
        style={{ gap: '0.5rem', height: '2.25rem', padding: '0.5rem 0.75rem 0.875rem', borderBottom: `1px solid ${LF.grey[100]}` }}
      >
        <Search size={16} style={{ color: LF.grey[600] }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions"
          className="w-full"
          style={{ fontSize: '0.875rem', outline: 'none', color: LF.grey[900] }}
        />
      </div>
      <div className="flex flex-col" style={{ padding: '0.75rem', gap: '0.75rem', flex: 1, minHeight: 0 }}>
        <div className="flex items-center flex-shrink-0" style={{ gap: '0.75rem' }}>
          <FilterChip width="200px">All statuses</FilterChip>
          <FilterChip>All directions</FilterChip>
          <FilterChip width="200px" icon={<CalendarDays size={16} style={{ color: LF.grey[600] }} />} chevron={false}>
            Select date range
          </FilterChip>
        </div>
        <div className="flex flex-col" style={{ gap: '0.75rem', flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {groups.map((g) => {
          const isOpen = openGroups[g.key] ?? !g.allMatched;
          return (
            <div key={g.key} className="flex flex-col" style={{ gap: '0.25rem' }}>
              <button
                onClick={() => setOpenGroups((prev) => ({ ...prev, [g.key]: !isOpen }))}
                className="flex items-center cursor-pointer"
                style={{ gap: '0.25rem', padding: '0.25rem 0.625rem 0.25rem 0.75rem' }}
              >
                <span
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: '24px', height: '24px', borderRadius: '999px' }}
                >
                  <ChevronDown
                    size={16}
                    style={{ color: LF.grey[600], transform: isOpen ? 'none' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }}
                  />
                </span>
                <span style={{ fontSize: '0.875rem', color: LF.tertiary.slate900 }}>{g.label}</span>
                {g.allMatched ? (
                  <CircleCheck size={12} style={{ color: LF.secondary.green900 }} />
                ) : (
                  <span style={{ width: '4px', height: '4px', borderRadius: '999px', backgroundColor: LF.tertiary.peach900 }} />
                )}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ backgroundColor: LF.grey[0], border: `1px solid ${LF.grey[100]}`, borderRadius: '0.875rem', padding: '0.25rem' }}>
                      {g.txns.map((t, i) => (
                        <TransactionRow key={t.id} txn={t} onToggle={() => onToggle(t.id)} last={i === g.txns.length - 1} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

// ── source-statement preview ─────────────────────────────────────────────

function StatementPanel() {
  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: LF.grey[0], border: `1px solid ${LF.grey[100]}`, borderRadius: '1.5rem', padding: '0.5rem', gap: '0.5rem', overflow: 'hidden', height: '100%' }}
    >
      <div
        className="flex items-center flex-shrink-0"
        style={{ gap: '0.5rem', height: '2.25rem', padding: '0.5rem 0.75rem 0.875rem', borderBottom: `1px solid ${LF.grey[100]}` }}
      >
        <Search size={16} style={{ color: LF.grey[600] }} />
        <span style={{ fontSize: '0.875rem', color: LF.grey[600] }}>Search statement</span>
      </div>
      <div style={{ padding: '0.75rem', flex: 1, minHeight: 0 }}>
      <div style={{ border: `1px solid ${LF.grey[100]}`, borderRadius: '0.875rem', overflow: 'hidden', height: '100%', overflowY: 'auto' }}>
        <div className="flex items-center" style={{ gap: '0.6rem', padding: '0.9rem 1rem', backgroundColor: LF.grey[25], borderBottom: `1px solid ${LF.grey[100]}` }}>
          <div className="flex items-center justify-center flex-shrink-0 font-bold" style={{ width: '1.75rem', height: '1.75rem', borderRadius: '999px', backgroundColor: LF.grey[900], color: '#fff', fontSize: '0.6rem' }}>
            UPB
          </div>
          <div>
            <div className="font-bold" style={{ fontSize: '0.85rem', color: LF.grey[900] }}>{STATEMENT.bankName}</div>
            <div style={{ fontSize: '0.7rem', color: LF.grey[600] }}>{STATEMENT.address}</div>
          </div>
        </div>
        <div className="grid grid-cols-2" style={{ gap: '0.5rem', padding: '0.9rem 1rem', fontSize: '0.75rem' }}>
          <div style={{ color: LF.grey[800] }}>{STATEMENT.accountHolder}</div>
          <div style={{ color: LF.grey[600] }}>Account: {STATEMENT.accountNumber}</div>
          <div style={{ color: LF.grey[600] }}>Statement date: {STATEMENT.statementDate}</div>
          <div style={{ color: LF.grey[600] }}>Period: {STATEMENT.periodCovered}</div>
        </div>
        <div style={{ padding: '0 1rem 0.9rem', fontSize: '0.75rem', color: LF.grey[700] }}>
          <div>Balance start: ${money(STATEMENT.balanceStart)}</div>
          <div>Total money in: ${money(STATEMENT.totalIn)}</div>
          <div>Total money out: ${money(STATEMENT.totalOut)}</div>
        </div>
        <div className="grid" style={{ gridTemplateColumns: '3.5rem 1fr 4rem 4rem 4.5rem', backgroundColor: LF.grey[900], padding: '0.5rem 1rem' }}>
          {['Date', 'Description', 'Debit', 'Credit', 'Balance'].map((h) => (
            <span key={h} className="font-semibold" style={{ fontSize: '0.65rem', color: '#fff' }}>{h}</span>
          ))}
        </div>
        {STATEMENT.lines.map((l, i) => (
          <div key={i} className="grid" style={{ gridTemplateColumns: '3.5rem 1fr 4rem 4rem 4.5rem', padding: '0.5rem 1rem', borderTop: `1px solid ${LF.grey[50]}` }}>
            <span style={{ fontSize: '0.72rem', color: LF.grey[700] }}>{l.date}</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '0.72rem', color: LF.grey[900] }}>{l.description}</span>
            <span style={{ fontSize: '0.72rem', color: LF.grey[700] }}>{l.withdrawal ? money(l.withdrawal) : ''}</span>
            <span style={{ fontSize: '0.72rem', color: LF.grey[700] }}>{l.deposit ? money(l.deposit) : ''}</span>
            <span style={{ fontSize: '0.72rem', color: LF.grey[700] }}>{money(l.balance)}</span>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

function SidebarIcon({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '0.5rem',
        backgroundColor: active ? LF.primary[50] : 'transparent',
        color: active ? LF.primary[900] : LF.grey[500],
      }}
    >
      {icon}
    </div>
  );
}

function Sidebar() {
  return (
    <div
      className="flex flex-col items-center flex-shrink-0"
      style={{ width: '3.5rem', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: LF.grey[0], borderRight: `1px solid ${LF.grey[100]}` }}
    >
      <div className="flex items-center justify-center" style={{ width: '2rem', height: '2rem', marginBottom: '1.5rem', color: LF.primary[900] }}>
        <Ban size={22} />
      </div>
      <div className="flex flex-col items-center" style={{ gap: '0.35rem', flex: 1 }}>
        <SidebarIcon icon={<Building2 size={17} />} />
        <SidebarIcon icon={<Search size={17} />} />
        <SidebarIcon icon={<Landmark size={17} />} active />
        <SidebarIcon icon={<FileText size={17} />} />
        <SidebarIcon icon={<List size={17} />} />
        <SidebarIcon icon={<ArrowUpFromLine size={17} />} />
        <SidebarIcon icon={<ArrowDownToLine size={17} />} />
        <SidebarIcon icon={<BarChart3 size={17} />} />
      </div>
      <div className="flex flex-col items-center" style={{ gap: '0.35rem' }}>
        <SidebarIcon icon={<HelpCircle size={17} />} />
        <SidebarIcon icon={<Settings size={17} />} />
      </div>
    </div>
  );
}

// ── real bank logo, falling back to a generic icon if the fetch ever fails ──

function BankLogo({ size }: { size: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Landmark size={size * 0.7} color={LF.primary[900]} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://unavatar.io/chase.com"
      alt="Chase"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
      onError={() => setFailed(true)}
    />
  );
}

// ── account bar (shared chrome above both views) ─────────────────────────

function AccountBar({
  onOpen,
  activePeriod,
  reconciledThroughLabel,
}: {
  onOpen: () => void;
  activePeriod: ReconciliationPeriod;
  reconciledThroughLabel: string;
}) {
  return (
    <div
      className="flex items-center justify-between flex-wrap"
      style={{ gap: '1rem', border: `1px solid ${LF.grey[100]}`, borderRadius: '0.75rem', backgroundColor: LF.grey[0], padding: '1rem 1.25rem', marginBottom: '1.5rem' }}
    >
      <div className="flex items-center" style={{ gap: '0.75rem' }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: '3rem', height: '3rem', borderRadius: '0.6rem', backgroundColor: LF.grey[0], border: `1px solid ${LF.grey[100]}` }}
        >
          <BankLogo size={34} />
        </div>
        <div>
          <div className="flex items-center" style={{ gap: '0.4rem' }}>
            <span className="font-bold" style={{ fontSize: '0.95rem', color: LF.grey[900] }}>{ACCOUNT.name}</span>
            {activePeriod.status === 'needs-attention' && <CircleAlert size={14} style={{ color: LF.tertiary.peach900 }} />}
          </div>
          <span style={{ fontSize: '0.78rem', color: LF.grey[600] }}>{ACCOUNT.glAccount} &middot; {ACCOUNT.entity}</span>
        </div>
        <ChevronDown size={16} style={{ color: LF.grey[400] }} aria-hidden="true" />
      </div>

      <div className="flex items-center" style={{ gap: '0.75rem' }}>
        <span className="italic" style={{ fontSize: '0.85rem', color: LF.grey[600] }}>Reconciled through {reconciledThroughLabel}</span>
        <button
          onClick={onOpen}
          className="inline-flex items-center font-semibold"
          style={{ gap: '0.4rem', fontSize: '0.85rem', padding: '0.6rem 1rem', borderRadius: '0.5rem', backgroundColor: LF.primary[900], color: '#fff', cursor: 'pointer' }}
        >
          Reconcile {activePeriod.label} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────

export default function BankReconciliationDemo() {
  const isFullscreen = usePrototypeExpanded();
  const [expanded, setExpanded] = useState(false);
  const [topBlockCollapsed, setTopBlockCollapsed] = useState(false);
  const [selectedPeriodId, setSelectedPeriodId] = useState('may15-jun14');
  const [transactions, setTransactions] = useState(TRANSACTIONS);

  const activePeriod = PERIODS.find((p) => p.id === selectedPeriodId) ?? PERIODS[2];
  const reconciledThrough = PERIODS.find((p) => p.status === 'reconciled')
    ? [...PERIODS].reverse().find((p) => p.status === 'reconciled')!
    : PERIODS[0];

  const toggleMatch = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, matchStatus: t.matchStatus === 'matched' ? 'in-flow-only' : 'matched' } : t))
    );
  };

  const openPeriod = (id: string) => {
    setSelectedPeriodId(id);
    setExpanded(true);
  };

  const activeCarouselIndex = PERIODS.findIndex((p) => p.id === selectedPeriodId);
  const setActiveCarouselIndex = (updater: (i: number) => number) => {
    setSelectedPeriodId((prevId) => {
      const prevIndex = PERIODS.findIndex((p) => p.id === prevId);
      const nextIndex = Math.min(PERIODS.length - 1, Math.max(0, updater(prevIndex)));
      return PERIODS[nextIndex].id;
    });
  };

  return (
    <div
      className={`${inter.className} flex`}
      style={{
        backgroundColor: '#faf9f7',
        borderRadius: isFullscreen ? 0 : '0.75rem',
        overflow: 'hidden',
        height: isFullscreen ? '100%' : undefined,
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0, padding: '1.5rem', overflowY: 'auto' }}>
      <h2 className={inter.className} style={{ fontWeight: 700, fontSize: '1.5rem', color: LF.grey[900], marginBottom: '1.5rem' }}>Cash and Cards</h2>

      {!expanded ? (
        <>
          <AccountBar
            onOpen={() => setExpanded(true)}
            activePeriod={activePeriod}
            reconciledThroughLabel={reconciledThrough.label.split(' - ')[1]}
          />
          <PeriodCarousel
            periods={PERIODS}
            activeIndex={activeCarouselIndex}
            onActiveIndexChange={setActiveCarouselIndex}
            onOpen={openPeriod}
          />
        </>
      ) : (
        <div>
          <div
            className="flex flex-col items-center"
            style={{ border: `1px solid ${LF.grey[100]}`, borderRadius: '1.5rem', backgroundColor: LF.grey[0], padding: '0.75rem 1rem 1rem 0.75rem', gap: '1.25rem', marginBottom: '1.5rem' }}
          >
            <div className="flex items-center justify-center w-full" style={{ gap: '1.5rem' }}>
              <button
                onClick={() => setExpanded(false)}
                className="flex items-center flex-1"
                style={{ gap: '0.75rem', cursor: 'pointer' }}
                aria-label="Back to all periods"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: '3rem', height: '3rem', borderRadius: '0.6rem', backgroundColor: LF.grey[0], border: `1px solid ${LF.grey[100]}` }}
                >
                  <BankLogo size={34} />
                </div>
                <div className="text-left">
                  <span className="font-bold block" style={{ fontSize: '0.95rem', color: LF.grey[900] }}>{ACCOUNT.name}</span>
                  <span style={{ fontSize: '0.78rem', color: LF.grey[600] }}>{ACCOUNT.glAccount} &middot; {ACCOUNT.entity}</span>
                </div>
                <ChevronDown size={16} style={{ color: LF.grey[400] }} aria-hidden="true" />
              </button>
              <div className="flex items-center flex-shrink-0" style={{ gap: '0.75rem' }}>
                <StatusPill status={activePeriod.status} />
                <button
                  onClick={() => setTopBlockCollapsed((v) => !v)}
                  className="flex items-center justify-center"
                  style={{ width: '2.25rem', height: '2.25rem', borderRadius: '999px', cursor: 'pointer' }}
                  aria-label={topBlockCollapsed ? 'Expand details' : 'Collapse details'}
                >
                  {topBlockCollapsed ? <ChevronDown size={20} style={{ color: LF.grey[600] }} /> : <ChevronUp size={20} style={{ color: LF.grey[600] }} />}
                </button>
              </div>
            </div>
            {!topBlockCollapsed && (
              <div className="w-full" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'stretch', gap: '1rem' }}>
                <div
                  className="flex flex-col items-start"
                  style={{ border: `1px solid ${LF.grey[100]}`, borderRadius: '1rem', padding: '0.75rem', justifyContent: 'space-between' }}
                >
                  <div style={{ padding: '0 4px', width: '100%' }}>
                    <PeriodSwitcher period={activePeriod} periods={PERIODS} onChange={setSelectedPeriodId} />
                  </div>
                  <MiniCalendar period={activePeriod} compact />
                </div>
                <ReconTable period={activePeriod} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '1.25rem' }}>
            <TransactionPanel transactions={transactions} onToggle={toggleMatch} />
            <StatementPanel />
          </div>
        </div>
      )}

      {!expanded && (
        <>
          <div className="flex items-center justify-center" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            {[
              { status: 'reconciled' as const, label: 'Reconciled' },
              { status: 'needs-attention' as const, label: 'Needs attention' },
              { status: 'locked' as const, label: 'No activity' },
            ].map(({ status, label }) => (
              <span key={status} className="inline-flex items-center" style={{ gap: '0.4rem', fontSize: '0.78rem', color: LF.grey[600] }}>
                <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '999px', border: `1.5px solid ${STATUS_META[status].dot}` }} />
                {label}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center" style={{ gap: '0.6rem', marginTop: '1rem' }}>
            <button
              onClick={() => setActiveCarouselIndex((i) => i - 1)}
              disabled={activeCarouselIndex === 0}
              aria-label="Previous period"
              className="flex items-center justify-center"
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '999px',
                border: `1px solid ${LF.grey[200]}`,
                color: activeCarouselIndex === 0 ? LF.grey[300] : LF.grey[600],
                cursor: activeCarouselIndex === 0 ? 'default' : 'pointer',
              }}
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setActiveCarouselIndex((i) => i + 1)}
              disabled={activeCarouselIndex === PERIODS.length - 1}
              aria-label="Next period"
              className="flex items-center justify-center"
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '999px',
                border: `1px solid ${LF.grey[200]}`,
                color: activeCarouselIndex === PERIODS.length - 1 ? LF.grey[300] : LF.grey[600],
                cursor: activeCarouselIndex === PERIODS.length - 1 ? 'default' : 'pointer',
              }}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
