'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, ArrowRight, BarChart3, Building2, Calendar, CircleAlert, CircleCheck, Clock, Eye, Link2, Lock, MessageSquare, Receipt, SquareCheck, Undo2 } from 'lucide-react';
import { LF } from '@/components/liveflow-demos/theme';

const ACCENT = LF.primary[900];

/** Advances 0..length-1 on a timer, looping. Pauses aren't needed here - these are short, ambient loops. */
function useCycle(length: number, intervalMs: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);
  return step;
}

/** A step in a process loop - filled and solid when active, a quiet outline otherwise. */
function Node({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <motion.div className="flex flex-col items-center" style={{ gap: '0.7rem' }} animate={{ scale: active ? 1.05 : 1 }} transition={{ duration: 0.3 }}>
      <motion.div
        className="flex items-center justify-center"
        animate={{
          backgroundColor: active ? ACCENT : 'rgba(0,0,0,0)',
          borderColor: active ? ACCENT : LF.grey[300],
          color: active ? '#fff' : LF.grey[500],
        }}
        transition={{ duration: 0.3 }}
        style={{ width: '4.25rem', height: '4.25rem', borderRadius: '999px', border: '1.5px solid' }}
      >
        {icon}
      </motion.div>
      <span className="font-semibold text-center" style={{ fontSize: '0.92rem', color: active ? LF.grey[900] : LF.grey[500] }}>
        {label}
      </span>
    </motion.div>
  );
}

function Arrow() {
  return <ArrowRight size={24} style={{ color: LF.grey[300], flexShrink: 0 }} />;
}

// Each demo account gets its own brand hue, rather than one flat accent for all four -
// echoes how the real product colors GL accounts/tags distinctly.
const DEMO_TXNS = [
  { label: 'Figma', domain: 'figma.com', amount: '$42', account: '6110 · Software & Subscriptions', hue900: LF.tertiary.violet900, hue50: LF.tertiary.violet50 },
  { label: 'Delta Air Lines', domain: 'delta.com', amount: '$318', account: '6210 · Travel & Entertainment', hue900: LF.tertiary.teal900, hue50: LF.tertiary.teal50 },
  { label: 'WeWork', domain: 'wework.com', amount: '$1,200', account: '6310 · Rent & Occupancy', hue900: LF.tertiary.lime900, hue50: LF.tertiary.lime50 },
  { label: 'Google Ads', domain: 'google.com', amount: '$85', account: '6410 · Advertising & Marketing', hue900: LF.tertiary.cherry900, hue50: LF.tertiary.cherry50 },
];

/** Real vendor logo via unavatar.io, falling back to a generic receipt icon if the fetch ever fails. */
function VendorLogo({ domain, size }: { domain: string; size: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Receipt size={size * 0.6} style={{ color: ACCENT }} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://unavatar.io/${domain}`}
      alt=""
      width={size}
      height={size}
      style={{ borderRadius: '0.3rem', objectFit: 'contain' }}
      onError={() => setFailed(true)}
    />
  );
}

/** Loops through a few transactions, each landing on the account it belongs to - the mechanic in one glance. */
export function ContextDiagram() {
  const step = useCycle(DEMO_TXNS.length, 2200);
  const txn = DEMO_TXNS[step];

  return (
    <div className="flex flex-col items-center" style={{ gap: '1.5rem' }}>
      <div style={{ height: '3.75rem' }}>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: [0, 1, 1, 0], y: [-8, 0, 0, 6] }}
          transition={{ duration: 2.2, times: [0, 0.15, 0.75, 1], ease: 'easeInOut' }}
          className="inline-flex items-center font-semibold"
          style={{ gap: '0.75rem', fontSize: '1.2rem', color: LF.grey[900], border: `1px solid ${LF.grey[200]}`, borderRadius: '999px', padding: '0.6rem 1.5rem 0.6rem 0.6rem' }}
        >
          <VendorLogo domain={txn.domain} size={32} />
          {txn.label} &middot; {txn.amount}
        </motion.div>
      </div>

      <div className="flex items-center justify-center flex-wrap" style={{ gap: '0.6rem' }}>
        {DEMO_TXNS.map((t) => {
          const matched = t.account === txn.account;
          return (
            <motion.div
              key={t.account}
              animate={{
                borderColor: matched ? t.hue900 : LF.grey[200],
                backgroundColor: matched ? t.hue50 : 'rgba(0,0,0,0)',
                color: matched ? t.hue900 : LF.grey[500],
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center font-semibold"
              style={{ gap: '0.4rem', fontSize: '0.92rem', border: '1px solid', borderRadius: '999px', padding: '0.5rem 1rem' }}
            >
              <Building2 size={15} />
              {t.account}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center" style={{ gap: '0.4rem', color: LF.grey[400], fontSize: '0.9rem' }}>
        <ArrowRight size={15} />
        rolls up into
        <BarChart3 size={15} />
        the P&amp;L / balance sheet
      </div>
    </div>
  );
}

/** A grid of routine picks with one silent miss buried in it. */
export function ProblemDiagram() {
  const cells = Array.from({ length: 60 });
  const badIndex = 41;
  return (
    <div className="flex flex-col items-center" style={{ gap: '1rem' }}>
      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.4rem', width: 'min(28rem, 100%)' }}
      >
        {cells.map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{
              aspectRatio: '1',
              backgroundColor: i === badIndex ? LF.tertiary.peach50 : LF.grey[50],
              color: i === badIndex ? LF.tertiary.peach900 : LF.grey[300],
            }}
          >
            {i === badIndex && <CircleAlert size={14} />}
          </div>
        ))}
      </div>
      <span style={{ fontSize: '0.9rem', color: LF.grey[500] }}>
        one wrong pick, buried in thousands - nobody&apos;s looking for it
      </span>
    </div>
  );
}

const APPROACH_STEPS = [
  { icon: <MessageSquare size={24} />, label: 'Describe' },
  { icon: <Eye size={24} />, label: 'Preview scope' },
  { icon: <SquareCheck size={24} />, label: 'Apply as batch' },
  { icon: <Undo2 size={24} />, label: 'Undo the batch' },
];

/** The four-beat interaction loop the design centers on - one beat lit and filled at a time. */
export function ApproachDiagram() {
  const step = useCycle(APPROACH_STEPS.length, 1400);
  return (
    <div className="flex items-center justify-center flex-wrap" style={{ gap: '0.85rem' }}>
      {APPROACH_STEPS.map((s, i) => (
        <div key={s.label} className="flex items-center" style={{ gap: '0.85rem' }}>
          {i > 0 && <Arrow />}
          <Node icon={s.icon} label={s.label} active={i === step} />
        </div>
      ))}
    </div>
  );
}

const RECON_LINES = [
  { desc: 'WeWork - Office rent', amount: '$1,200.00' },
  { desc: 'Uber for Business', amount: '$84.50' },
  { desc: 'Stripe Payout', amount: '$2,450.00' },
  { desc: 'Google Workspace', amount: '$18.00' },
];

function LedgerPanel({ title, activeIndex }: { title: string; activeIndex: number }) {
  return (
    <div style={{ width: '17.5rem', border: `1px solid ${LF.grey[200]}`, borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: LF.grey[0] }}>
      <div
        className="font-bold"
        style={{ padding: '0.75rem 1rem', backgroundColor: LF.grey[25], borderBottom: `1px solid ${LF.grey[100]}`, fontSize: '0.85rem', color: LF.grey[900] }}
      >
        {title}
      </div>
      {RECON_LINES.map((l, i) => {
        const matched = i < activeIndex;
        const current = i === activeIndex;
        return (
          <motion.div
            key={i}
            animate={{ backgroundColor: current ? LF.primary[25] : matched ? LF.secondary.green50 : 'rgba(0,0,0,0)' }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-between"
            style={{ padding: '0.7rem 1rem', borderBottom: i < RECON_LINES.length - 1 ? `1px solid ${LF.grey[50]}` : 'none' }}
          >
            <span
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ fontSize: '0.85rem', color: current ? LF.grey[900] : LF.grey[600], fontWeight: current ? 600 : 400, maxWidth: '9.5rem' }}
            >
              {l.desc}
            </span>
            <span className="flex items-center flex-shrink-0" style={{ gap: '0.4rem', fontSize: '0.9rem', fontWeight: 700, color: LF.grey[900] }}>
              {l.amount}
              {matched && <CircleCheck size={15} style={{ color: LF.secondary.green900 }} />}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/** Two real ledgers, matched line by line - the actual mechanic of reconciliation, not just an abstract compare. */
export function BankReconContextDiagram() {
  const step = useCycle(RECON_LINES.length + 1, 1100);
  return (
    <div className="flex flex-col items-center" style={{ gap: '1.25rem' }}>
      <div className="flex items-start justify-center flex-wrap" style={{ gap: '1.5rem' }}>
        <LedgerPanel title="Bank statement" activeIndex={step} />
        <div className="flex items-center justify-center flex-shrink-0" style={{ height: '17.5rem' }}>
          <ArrowLeftRight size={20} style={{ color: LF.grey[300] }} />
        </div>
        <LedgerPanel title="Your books" activeIndex={step} />
      </div>
      <span style={{ fontSize: '0.9rem', color: LF.grey[500] }}>
        matching every line between the two, one at a time
      </span>
    </div>
  );
}

const RECON_MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul'];

/** One unresolved period blocks every period after it - shown as a locked chain. */
export function BankReconProblemDiagram() {
  return (
    <div className="flex flex-col items-center" style={{ gap: '1rem' }}>
      <div className="flex items-center justify-center flex-wrap" style={{ gap: '0.65rem' }}>
        {RECON_MONTHS.map((m, i) => {
          const isFlagged = i === 2;
          const isLocked = i > 2;
          const tone = isFlagged
            ? { border: LF.tertiary.peach900, bg: LF.tertiary.peach50, text: LF.tertiary.peach900 }
            : isLocked
              ? { border: LF.grey[200], bg: LF.grey[50], text: LF.grey[400] }
              : { border: LF.secondary.green900, bg: LF.secondary.green50, text: LF.secondary.green900 };
          return (
            <div key={m} className="flex items-center" style={{ gap: '0.65rem' }}>
              {i > 0 && <ArrowRight size={18} style={{ color: LF.grey[300] }} />}
              <div
                className="flex flex-col items-center justify-center font-bold"
                style={{
                  width: '4.5rem',
                  height: '4.5rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${tone.border}`,
                  backgroundColor: tone.bg,
                  color: tone.text,
                }}
              >
                {isLocked ? <Lock size={18} /> : isFlagged ? <CircleAlert size={20} /> : <CircleCheck size={20} />}
                <span style={{ fontSize: '0.78rem', marginTop: '0.3rem' }}>{m}</span>
              </div>
            </div>
          );
        })}
      </div>
      <span style={{ fontSize: '0.9rem', color: LF.grey[500] }}>one unresolved period, and everything after it waits</span>
    </div>
  );
}

const RECON_STEPS = [
  { icon: <Calendar size={20} />, label: 'Open the period' },
  { icon: <ArrowLeftRight size={20} />, label: 'Compare bank vs. books' },
  { icon: <Link2 size={20} />, label: 'Match transactions' },
  { icon: <SquareCheck size={20} />, label: 'Close the period' },
];

/** The four-beat reconciliation loop - one beat lit and filled at a time. */
export function BankReconApproachDiagram() {
  const step = useCycle(RECON_STEPS.length, 1400);
  return (
    <div className="flex items-center justify-center flex-wrap" style={{ gap: '0.85rem' }}>
      {RECON_STEPS.map((s, i) => (
        <div key={s.label} className="flex items-center" style={{ gap: '0.85rem' }}>
          {i > 0 && <Arrow />}
          <Node icon={s.icon} label={s.label} active={i === step} />
        </div>
      ))}
    </div>
  );
}

/** Centered, full-height layout for a prose slide: eyebrow label, optional graphic, then the text. */
export function SlideBody({
  eyebrow,
  graphic,
  children,
}: {
  eyebrow: string;
  graphic?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100%', padding: '2rem' }}>
      <div style={{ maxWidth: '46rem', width: '100%', textAlign: 'center' }}>
        <div
          className="font-bold tracking-widest uppercase"
          style={{ fontSize: '0.9rem', color: ACCENT, marginBottom: '2rem' }}
        >
          {eyebrow}
        </div>
        {graphic && <div style={{ marginBottom: '3rem' }}>{graphic}</div>}
        <div style={{ fontSize: '1.65rem', color: LF.grey[800], lineHeight: 1.6, fontWeight: 500 }}>{children}</div>
      </div>
    </div>
  );
}
