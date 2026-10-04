'use client';

import {
  Blend,
  BookOpenText,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Undo2,
  type LucideIcon,
  X,
  Zap,
} from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import GuidedTour, { type TourStep } from '../GuidedTour';
import { usePrototypeExpanded } from '../PrototypeStage';
import { LF } from '../theme';
import AgentPanel, { type AgentExecution } from './AgentPanel';
import Checkbox from './Checkbox';
import ConfidencePill from './ConfidencePill';
import CustomSelect from './CustomSelect';
import SourceBadge from './SourceBadge';

const TOUR_STEPS: TourStep[] = [
  {
    target: 'command-bar',
    title: 'Describe what you want',
    body: 'Type something like "categorize AMAZON as Servers" and press Tab to accept the suggestion - or just click a vendor to filter.',
  },
  {
    target: 'grid',
    title: 'Nothing changes yet',
    body: 'AI-suggested accounts show tinted, not solid, until confirmed. Submitting a command opens a preview - it never edits a row directly.',
  },
  {
    target: 'toolbar',
    title: 'Batch apply, batch undo',
    body: 'Select rows or approve a whole group at once. One Undo always reverts one action, never a partial batch.',
  },
];
import { GL_ACCOUNTS, NAMED_RULES, TRANSACTIONS, accountName } from './data';
import type { CategorizationSource, FilterPill, GLAccount, GroupBy, Transaction } from './types';

/**
 * Faithful-but-trimmed port of the real Draft-tab core loop from
 * accounting/.../ai-categorization/{draft-tab,components,page}.tsx.
 *
 * Copied on purpose: command bar with inline ghost-text autocomplete: a
 * staged agent-panel preview that never mutates data until its terminal
 * button is pressed; bulk selection swapping the toolbar rather than
 * showing both at once; apply-then-undo as one clean batch; grouping with
 * per-group "categorize all as X"; and the manual-correction rule nudge.
 *
 * Deliberate deviation from the real source: the real page pushes one
 * undo-stack snapshot per onCorrect/onPost *call*, so a single "Categorize
 * & post N" agent action pushes N+1 snapshots and Undo has to be clicked
 * that many times to fully revert it. Here, saveUndo() is called exactly
 * once per user-visible action (see applyBatch / correctAccount /
 * bulkCorrect below), so one Undo always cleanly reverts one Apply.
 */

const money = (n: number) =>
  Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

function normStr(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findAccountByQuery(query: string): GLAccount | null {
  const q = normStr(query);
  const exact = GL_ACCOUNTS.find((a) => normStr(a.name) === q);
  if (exact) return exact;
  return GL_ACCOUNTS.find((a) => normStr(a.name).includes(q) || q.includes(normStr(a.name))) ?? null;
}

function parseAgentCommand(input: string): { vendorQuery: string; accountQuery: string } | null {
  const match = input.match(/(?:categorize|mark|assign)\s+(?:all\s+)?(.+?)\s+(?:as|to)\s+(.+)/i);
  if (match?.[1] && match?.[2]) return { vendorQuery: match[1].trim(), accountQuery: match[2].trim() };
  return null;
}

function getMostCommonAccountForVendor(transactions: Transaction[], vendor: string): string | null {
  const counts: Record<string, number> = {};
  for (const t of transactions) {
    if (t.vendor === vendor && t.suggestedAccountId) counts[t.suggestedAccountId] = (counts[t.suggestedAccountId] ?? 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

// ── Command bar ──────────────────────────────────────────────────────────

type CmdFilter = { id: string; label: string; type: 'vendor' | 'text'; value: string };

type Suggestion = {
  Icon: LucideIcon;
  label: string;
  sublabel?: string;
  filter?: CmdFilter;
  agentCommand?: { vendorQuery: string; accountId: string; accountName: string; rawCommand: string };
};

function buildSuggestions(input: string, transactions: Transaction[]): Suggestion[] {
  const lo = input.toLowerCase().trim();
  if (!lo) return [];
  const sugs: Suggestion[] = [];

  const agentVerb = /^(categorize|mark|assign)\s+/i.test(lo);
  if (agentVerb) {
    const afterVerb = lo.replace(/^(categorize|mark|assign)\s+(all\s+)?/i, '');
    const hasAs = /\s+(?:as|to)\s+/.test(afterVerb);

    if (hasAs) {
      const parts = afterVerb.split(/\s+(?:as|to)\s+/i);
      const vendorPart = parts[0];
      const accountPart = parts[1];
      if (!vendorPart) return sugs;
      const accountLo = normStr(accountPart ?? '');
      GL_ACCOUNTS.filter((a) => accountLo.length < 2 || normStr(a.name).includes(accountLo))
        .slice(0, 5)
        .forEach((a) => {
          const vendorQuery = vendorPart.trim();
          const count = transactions.filter((t) => t.vendor.toLowerCase().includes(vendorQuery.toLowerCase())).length;
          const rawCommand = `Categorize all ${vendorQuery.toUpperCase()} as ${a.name}`;
          sugs.push({
            Icon: Zap,
            label: rawCommand,
            sublabel: count > 0 ? `${count} transaction${count !== 1 ? 's' : ''}` : 'no matches',
            agentCommand: { vendorQuery, accountId: a.id, accountName: a.name, rawCommand },
          });
        });
    } else {
      const vendorLo = afterVerb.trim();
      const vendors = [...new Set(transactions.map((t) => t.vendor))].filter((v) => v.toLowerCase().includes(vendorLo)).slice(0, 3);
      vendors.forEach((v) => {
        const count = transactions.filter((t) => t.vendor === v).length;
        const accountId = getMostCommonAccountForVendor(transactions, v);
        const account = accountId ? GL_ACCOUNTS.find((a) => a.id === accountId) : null;
        const rawCommand = account ? `Categorize all ${v} as ${account.name}` : `Categorize all ${v} as…`;
        sugs.push({
          Icon: Zap,
          label: rawCommand,
          sublabel: `${count} transaction${count !== 1 ? 's' : ''}`,
          agentCommand: account ? { vendorQuery: v, accountId: account.id, accountName: account.name, rawCommand } : undefined,
        });
      });
    }
    return sugs.slice(0, 6);
  }

  const vendors = new Set(transactions.map((t) => t.vendor));
  [...vendors]
    .filter((v) => v.toLowerCase().includes(lo))
    .slice(0, 5)
    .forEach((v) => {
      const count = transactions.filter((t) => t.vendor === v).length;
      sugs.push({ Icon: Building2, label: `${v} (${count})`, filter: { id: `vendor-${v}`, label: v, type: 'vendor', value: v } });
    });

  return sugs.slice(0, 6);
}

function CommandBar({
  transactions,
  filters,
  onAdd,
  onRemove,
  onAgentCommand,
}: {
  transactions: Transaction[];
  filters: CmdFilter[];
  onAdd: (f: CmdFilter) => void;
  onRemove: (id: string) => void;
  onAgentCommand: (vendorQuery: string, accountId: string, accountName: string, rawCommand: string) => void;
}) {
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [sugIdx, setSugIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const sugs = buildSuggestions(input, transactions);

  const pick = (s: Suggestion) => {
    if (s.agentCommand) {
      onAgentCommand(s.agentCommand.vendorQuery, s.agentCommand.accountId, s.agentCommand.accountName, s.agentCommand.rawCommand);
    } else if (s.filter) {
      if (!filters.find((f) => f.id === s.filter!.id)) onAdd(s.filter);
    }
    setInput('');
    setSugIdx(-1);
    inputRef.current?.focus();
  };

  const topSug = sugIdx >= 0 ? sugs[sugIdx] : sugs[0];
  const topFillValue = topSug?.filter?.value ?? topSug?.agentCommand?.rawCommand ?? topSug?.label ?? '';
  const ghostSuffix =
    input && topFillValue && topFillValue.toLowerCase().startsWith(input.toLowerCase()) ? topFillValue.slice(input.length) : '';

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && ghostSuffix && topSug) {
      e.preventDefault();
      pick(topSug);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSugIdx((i) => Math.min(i + 1, sugs.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSugIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (sugIdx >= 0 && sugs[sugIdx]) {
        pick(sugs[sugIdx]!);
      } else if (sugs.length > 0) {
        pick(sugs[0]!);
      } else if (input.trim()) {
        const parsed = parseAgentCommand(input.trim());
        const account = parsed ? findAccountByQuery(parsed.accountQuery) : null;
        if (parsed && account) {
          onAgentCommand(parsed.vendorQuery, account.id, account.name, input.trim());
          setInput('');
        } else {
          const f: CmdFilter = { id: `text-${input.trim()}`, label: `"${input.trim()}"`, type: 'text', value: input.trim() };
          if (!filters.find((x) => x.id === f.id)) onAdd(f);
          setInput('');
        }
      }
    } else if (e.key === 'Backspace' && !input && filters.length > 0) {
      const last = filters[filters.length - 1];
      if (last) onRemove(last.id);
    } else if (e.key === 'Escape') {
      setInput('');
      setSugIdx(-1);
    }
  };

  return (
    <div
      className="flex items-center transition-all"
      style={{
        gap: '0.5rem',
        height: '2.75rem',
        padding: '0 1rem',
        borderRadius: '0.75rem',
        border: `1px solid ${focused ? LF.primary[900] : LF.grey[100]}`,
        boxShadow: focused ? `0 0 0 2px ${LF.primary[900]}26` : 'none',
        backgroundColor: LF.grey[0],
        cursor: 'text',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <Blend size={15} style={{ color: LF.primary[900], flexShrink: 0 }} />
      <div className="relative flex-1" style={{ display: 'grid' }}>
        {ghostSuffix && (
          <div
            aria-hidden
            className="pointer-events-none flex items-center whitespace-pre"
            style={{ gridArea: '1/1', fontSize: '0.85rem', color: LF.grey[600] }}
          >
            <span className="invisible">{input}</span>
            {ghostSuffix}
            <span
              className="inline-flex items-center"
              style={{
                marginLeft: '0.5rem',
                gap: '0.2rem',
                borderRadius: '0.35rem',
                border: `1px solid ${LF.grey[100]}`,
                backgroundColor: LF.grey[25],
                padding: '0.05rem 0.35rem',
                fontSize: '0.62rem',
                fontWeight: 600,
                color: LF.grey[600],
              }}
            >
              Tab <span style={{ opacity: 0.7 }}>to accept</span>
            </span>
          </div>
        )}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSugIdx(-1);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
          onKeyDown={onKey}
          placeholder="Search, filter, or tell Flow what to do…"
          className="bg-transparent outline-none"
          style={{ gridArea: '1/1', fontSize: '0.85rem', color: LF.grey[900], padding: '0.4rem 0' }}
        />
      </div>
      {input && (
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            setInput('');
          }}
          aria-label="Clear"
          style={{ color: LF.grey[600], flexShrink: 0 }}
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}

// ── Account select (GL Account cell) ────────────────────────────────────

function AccountSelect({
  value,
  source,
  onChange,
  onOpenChange,
}: {
  value: string;
  source: CategorizationSource;
  onChange: (accountId: string) => void;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const account = value ? GL_ACCOUNTS.find((a) => a.id === value) : null;
  const isLlm = source === 'llm';
  const Icon = isLlm ? Blend : source === 'rule' ? Zap : BookOpenText;
  const iconColor = isLlm ? LF.primary[900] : source === 'rule' ? LF.secondary.green900 : LF.grey[600];
  const textColor = isLlm ? LF.primary[900] : LF.grey[800];

  return (
    <div ref={ref} className="relative" style={{ width: '100%' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center text-left"
        style={{ gap: '0.35rem', fontSize: '0.8rem', padding: '0.3rem 0.35rem', borderRadius: '0.4rem' }}
      >
        {account ? (
          <>
            <Icon size={14} style={{ color: iconColor, flexShrink: 0 }} />
            <span style={{ color: LF.grey[600], flexShrink: 0 }}>{account.code}</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: textColor, fontWeight: isLlm ? 400 : 500 }}>
              {account.name}
            </span>
          </>
        ) : (
          <span className="italic" style={{ color: LF.grey[600] }}>
            + Select an account…
          </span>
        )}
      </button>
      {open && (
        <div
          className="absolute z-30"
          style={{
            top: 'calc(100% + 2px)',
            left: 0,
            minWidth: '15rem',
            maxHeight: '16rem',
            overflowY: 'auto',
            borderRadius: '0.6rem',
            border: `1px solid ${LF.grey[100]}`,
            backgroundColor: LF.grey[0],
            boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
            padding: '0.3rem',
          }}
        >
          {GL_ACCOUNTS.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                onChange(a.id);
                setOpen(false);
              }}
              className="flex w-full items-center text-left"
              style={{
                gap: '0.4rem',
                fontSize: '0.8rem',
                padding: '0.4rem 0.5rem',
                borderRadius: '0.4rem',
                backgroundColor: a.id === value ? LF.grey[25] : 'transparent',
                color: LF.grey[800],
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LF.grey[25])}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = a.id === value ? LF.grey[25] : 'transparent')}
            >
              <span style={{ color: LF.grey[600] }}>{a.code}</span>
              {a.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Grouping ─────────────────────────────────────────────────────────────

interface TxnGroup {
  key: string;
  label: string;
  transactions: Transaction[];
  totalAmount: number;
  suggestedAccountId: string | null;
  suggestedAccountName: string | null;
}

function getConfidenceTier(t: Transaction): string {
  if (!t.confidence) return 'unknown';
  if (t.confidence >= 90) return 'high';
  if (t.confidence >= 70) return 'medium';
  return 'low';
}

function getMostCommonAccount(txns: Transaction[]): string | null {
  const counts: Record<string, number> = {};
  for (const t of txns) if (t.suggestedAccountId) counts[t.suggestedAccountId] = (counts[t.suggestedAccountId] ?? 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

function buildGroups(transactions: Transaction[], groupBy: GroupBy): TxnGroup[] {
  const map = new Map<string, Transaction[]>();

  if (groupBy === 'rule') {
    for (const t of transactions) {
      const key = t.ruleName ?? 'Unknown rule';
      map.set(key, [...(map.get(key) ?? []), t]);
    }
  } else if (groupBy === 'payee') {
    const vendorCounts = new Map<string, number>();
    for (const t of transactions) vendorCounts.set(t.vendor, (vendorCounts.get(t.vendor) ?? 0) + 1);
    for (const t of transactions) {
      const key = (vendorCounts.get(t.vendor) ?? 0) >= 2 ? t.vendor : 'Other';
      map.set(key, [...(map.get(key) ?? []), t]);
    }
  } else if (groupBy === 'gl') {
    for (const t of transactions) {
      const key = accountName(t.suggestedAccountId) ?? 'Uncategorized';
      map.set(key, [...(map.get(key) ?? []), t]);
    }
  } else {
    const tierOrder = ['high', 'medium', 'low', 'unknown'];
    const tierLabels: Record<string, string> = {
      high: 'Flow - High confidence',
      medium: 'Flow - Medium confidence',
      low: 'Flow - Low confidence',
      unknown: 'Needs categorization',
    };
    for (const t of transactions) {
      const tier = getConfidenceTier(t);
      map.set(tier, [...(map.get(tier) ?? []), t]);
    }
    return tierOrder
      .filter((tier) => map.has(tier))
      .map((tier) => {
        const txns = map.get(tier)!;
        const total = txns.reduce((sum, t) => sum + t.amount, 0);
        const suggestedId = getMostCommonAccount(txns);
        return {
          key: tier,
          label: tierLabels[tier] ?? tier,
          transactions: txns,
          totalAmount: total,
          suggestedAccountId: suggestedId,
          suggestedAccountName: accountName(suggestedId),
        };
      });
  }

  return [...map.entries()]
    .sort((a, b) => {
      if (a[0] === 'Other') return 1;
      if (b[0] === 'Other') return -1;
      return b[1].length - a[1].length;
    })
    .map(([key, txns]) => {
      const total = txns.reduce((sum, t) => sum + t.amount, 0);
      const suggestedId = getMostCommonAccount(txns);
      return {
        key,
        label: key,
        transactions: txns,
        totalAmount: total,
        suggestedAccountId: suggestedId,
        suggestedAccountName: accountName(suggestedId),
      };
    });
}

// ── Grid ─────────────────────────────────────────────────────────────────

const GRID_TEMPLATE = '2.25rem 5.25rem 9.5rem minmax(6rem,1fr) 7.5rem 15.5rem 5.5rem 5.5rem 2.5rem';
/** Vertical grid line between columns, per TABLE-06 (grey-25, subtler than the grey-100 horizontal lines). Last column gets none. */
const colBorder = (i: number, last = 8) => ({ borderRight: i < last ? `1px solid ${LF.grey[25]}` : 'none' });

function GroupHeader({
  group,
  isExpanded,
  onToggle,
  onCategorizeAll,
  onApproveAll,
}: {
  group: TxnGroup;
  isExpanded: boolean;
  onToggle: () => void;
  onCategorizeAll: (accountId: string) => void;
  onApproveAll: () => void;
}) {
  const allCategorized = group.transactions.every((t) => t.suggestedAccountId);
  const hasUncategorized = group.transactions.some((t) => !t.suggestedAccountId);
  const rule = NAMED_RULES.find((r) => r.name === group.label);

  return (
    <div
      onClick={onToggle}
      className="flex cursor-pointer items-center transition-colors"
      style={{
        gap: '0.65rem',
        border: `1px solid ${LF.grey[100]}`,
        backgroundColor: LF.grey[0],
        padding: '0.6rem 0.9rem',
        borderRadius: isExpanded ? '0.6rem 0.6rem 0 0' : '0.6rem',
      }}
    >
      {isExpanded ? <ChevronDown size={14} style={{ color: LF.grey[600] }} /> : <ChevronRight size={14} style={{ color: LF.grey[600] }} />}
      <span
        className="flex items-center justify-center rounded-full"
        style={{ width: '1.15rem', height: '1.15rem', backgroundColor: rule ? LF.secondary.green900 : LF.primary[900], flexShrink: 0 }}
      >
        {rule ? <Zap size={10} color="#fff" /> : <Blend size={10} color="#fff" />}
      </span>
      <span className="font-semibold" style={{ fontSize: '0.82rem', color: LF.grey[900] }} title={rule?.condition}>
        {group.label}
      </span>
      <span className="tabular-nums" style={{ fontSize: '0.72rem', color: LF.grey[600] }}>
        {group.transactions.length} transaction{group.transactions.length !== 1 ? 's' : ''}
      </span>
      <span className="tabular-nums" style={{ fontSize: '0.72rem', color: LF.grey[600] }}>
        ${money(group.totalAmount)}
      </span>
      <div className="ml-auto flex items-center" style={{ gap: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
        {group.suggestedAccountId && hasUncategorized && (
          <button
            onClick={() => onCategorizeAll(group.suggestedAccountId!)}
            className="flex items-center"
            style={{
              gap: '0.3rem',
              borderRadius: '0.4rem',
              border: `1px solid ${LF.grey[100]}`,
              backgroundColor: LF.grey[0],
              padding: '0.3rem 0.6rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: LF.grey[800],
            }}
          >
            categorize all as {group.suggestedAccountName}
          </button>
        )}
        {allCategorized && group.transactions.length > 0 && (
          <button
            onClick={onApproveAll}
            className="flex items-center"
            style={{
              gap: '0.3rem',
              borderRadius: '0.4rem',
              padding: '0.3rem 0.75rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              backgroundColor: LF.secondary.green50,
              color: LF.secondary.green900,
            }}
          >
            <Check size={11} />
            Accept and post all
          </button>
        )}
      </div>
    </div>
  );
}

export default function AiCategorizationDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const expanded = usePrototypeExpanded();
  const [tourActive, setTourActive] = useState(false);
  // Plain ref, not state - it's a one-time "have we already auto-launched"
  // flag with no rendering consequence of its own, so it doesn't belong in
  // React state (and setting state synchronously in the effect below just
  // to record it would trip the set-state-in-effect lint rule for no
  // benefit).
  const tourSeenRef = useRef(false);

  // Auto-launch the guided tour the first time the demo is actually
  // expanded to fullscreen - not in the small inline card, where a
  // spotlight would just feel cramped (and where it'd otherwise cover the
  // whole page, since the collapsed card can be plenty wide on desktop).
  useEffect(() => {
    if (!expanded || tourSeenRef.current) return;
    tourSeenRef.current = true;
    const id = window.setTimeout(() => setTourActive(true), 500);
    return () => window.clearTimeout(id);
  }, [expanded]);

  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openAccountRowId, setOpenAccountRowId] = useState<string | null>(null);
  const [cmdFilters, setCmdFilters] = useState<CmdFilter[]>([]);
  const [activePill, setActivePill] = useState<FilterPill>(null);
  const [groupBy, setGroupBy] = useState<GroupBy>('none');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const [agentExecution, setAgentExecution] = useState<AgentExecution | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [dismissedVendors, setDismissedVendors] = useState<Set<string>>(new Set());
  const agentTimeouts = useRef<number[]>([]);
  const undoStack = useRef<Transaction[][]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const transactionsRef = useRef(transactions);
  useEffect(() => {
    transactionsRef.current = transactions;
  }, [transactions]);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  // Exactly one saveUndo() per user-visible action - see file header for
  // why this deliberately differs from the real source.
  const saveUndo = () => {
    undoStack.current = [...undoStack.current, transactionsRef.current];
    setCanUndo(true);
  };

  const handleUndo = () => {
    const prev = undoStack.current.at(-1);
    if (!prev) return;
    undoStack.current = undoStack.current.slice(0, -1);
    setCanUndo(undoStack.current.length > 0);
    setTransactions(prev);
  };

  // Categorize (and optionally post) a batch in one combined state update.
  const applyBatch = (ids: string[], accountId?: string) => {
    saveUndo();
    setTransactions((prev) =>
      prev.map((t) =>
        ids.includes(t.id)
          ? {
              ...t,
              status: 'posted',
              ...(accountId ? { suggestedAccountId: accountId, correctedAccountId: accountId, source: 'manual' as const } : {}),
            }
          : t,
      ),
    );
  };

  const correctAccount = (id: string, accountId: string) => {
    saveUndo();
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, suggestedAccountId: accountId, correctedAccountId: accountId, source: 'manual' as const } : t)),
    );
  };

  const bulkCorrect = (ids: string[], accountId: string) => {
    saveUndo();
    setTransactions((prev) =>
      prev.map((t) => (ids.includes(t.id) ? { ...t, suggestedAccountId: accountId, correctedAccountId: accountId, source: 'manual' as const } : t)),
    );
  };

  const fadeThenApply = (ids: string[], accountId: string | undefined, message: string) => {
    setExitingIds((prev) => new Set([...prev, ...ids]));
    window.setTimeout(() => {
      applyBatch(ids, accountId);
      flash(message);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        return next;
      });
      setExitingIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        return next;
      });
    }, 250);
  };

  // ── Agent task simulation ────────────────────────────────────────────
  const startAgentTask = (vendorQuery: string, accountId: string, accountNameStr: string, rawCommand: string) => {
    agentTimeouts.current.forEach(window.clearTimeout);
    agentTimeouts.current = [];

    const pending = transactions.filter((t) => t.status === 'pending');
    const matched = pending.filter((t) => t.vendor.toLowerCase().includes(vendorQuery.toLowerCase()));

    const exec: AgentExecution = {
      command: rawCommand,
      vendorQuery,
      accountId,
      accountName: accountNameStr,
      matchedTransactions: matched,
      steps: { scan: 'running', found: 'pending', categorize: 'pending', done: 'pending' },
      processedIds: [],
      status: 'running',
    };
    setAgentExecution(exec);

    const schedule = (fn: () => void, delay: number) => {
      agentTimeouts.current.push(window.setTimeout(fn, delay));
    };

    schedule(() => setAgentExecution((prev) => prev && { ...prev, steps: { ...prev.steps, scan: 'done', found: 'running' } }), 700);
    schedule(
      () =>
        setAgentExecution(
          (prev) =>
            prev && {
              ...prev,
              steps: { ...prev.steps, found: 'done', categorize: matched.length > 0 ? 'running' : 'done', done: matched.length > 0 ? 'pending' : 'done' },
              status: matched.length > 0 ? 'running' : 'complete',
            },
        ),
      1400,
    );

    if (matched.length > 0) {
      matched.forEach((t, i) => {
        schedule(() => setAgentExecution((prev) => prev && { ...prev, processedIds: [...prev.processedIds, t.id] }), 1900 + i * 300);
      });
      schedule(
        () => setAgentExecution((prev) => prev && { ...prev, steps: { ...prev.steps, categorize: 'done', done: 'running' } }),
        1900 + matched.length * 300,
      );
      schedule(
        () => setAgentExecution((prev) => prev && { ...prev, steps: { ...prev.steps, done: 'done' }, status: 'complete' }),
        1900 + matched.length * 300 + 400,
      );
    }
  };

  const handleAgentConfirm = () => {
    if (!agentExecution) return;
    const ids = agentExecution.matchedTransactions.map((t) => t.id);
    fadeThenApply(ids, agentExecution.accountId, `Categorized & posted ${ids.length} transaction${ids.length !== 1 ? 's' : ''}`);
    setAgentExecution(null);
  };

  // ── Rule nudge ────────────────────────────────────────────────────────
  const allAiSuggestions = useMemo(() => {
    const manual = transactions.filter((t) => t.source === 'manual' && t.correctedAccountId);
    const map: Record<string, { accountId: string; count: number }> = {};
    for (const t of manual) {
      const key = t.vendor;
      if (!map[key]) map[key] = { accountId: t.correctedAccountId!, count: 0 };
      if (map[key].accountId === t.correctedAccountId) map[key].count++;
    }
    return Object.entries(map)
      .filter(([vendor, d]) => d.count >= 2 && !dismissedVendors.has(vendor))
      .map(([vendor, d]) => ({ vendor, accountId: d.accountId, accountName: accountName(d.accountId) ?? d.accountId, count: d.count }))
      .sort((a, b) => b.count - a.count);
  }, [transactions, dismissedVendors]);
  const aiSuggestion = allAiSuggestions[0] ?? null;

  // ── Filtering ────────────────────────────────────────────────────────
  const pendingTransactions = transactions.filter((t) => t.status === 'pending');

  const cmdFiltered = pendingTransactions.filter((t) => {
    for (const f of cmdFilters) {
      if (f.type === 'vendor' && t.vendor !== f.value) return false;
      if (f.type === 'text') {
        const lo = f.value.toLowerCase();
        if (!t.vendor.toLowerCase().includes(lo) && !t.memo.toLowerCase().includes(lo)) return false;
      }
    }
    return true;
  });

  const filtered = cmdFiltered.filter((t) => {
    if (!activePill) return true;
    if (activePill === 'rules') return t.source === 'rule';
    if (activePill === 'ai') return t.source === 'llm' && t.confidence > 0;
    if (activePill === 'needs-review') return !t.confidence || t.confidence < 70;
    return true;
  });

  const groups = groupBy !== 'none' ? buildGroups(filtered, groupBy) : [];

  const ruleCount = cmdFiltered.filter((t) => t.source === 'rule').length;
  const aiCount = cmdFiltered.filter((t) => t.source === 'llm' && t.confidence > 0).length;
  const needsReviewCount = cmdFiltered.filter((t) => !t.confidence || t.confidence < 70).length;

  const someSelected = selectedIds.size > 0;
  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const allScopeSelected = filtered.length > 0 && filtered.every((t) => selectedIds.has(t.id));
  const someScopeSelected = filtered.some((t) => selectedIds.has(t.id));

  // ── Row renderer ─────────────────────────────────────────────────────
  const renderRow = (t: Transaction, isLast = false) => {
    const isExiting = exitingIds.has(t.id);
    const isSelected = selectedIds.has(t.id);
    return (
      <div
        key={t.id}
        className="group items-center transition-all duration-200"
        style={{
          display: 'grid',
          gridTemplateColumns: GRID_TEMPLATE,
          borderBottom: isLast ? 'none' : `1px solid ${LF.grey[50]}`,
          backgroundColor: isSelected ? `${LF.primary[900]}08` : 'transparent',
          opacity: isExiting ? 0 : 1,
          pointerEvents: isExiting ? 'none' : undefined,
          minHeight: '2.75rem',
        }}
      >
        <div className="flex items-center justify-center" style={{ ...colBorder(0), height: '100%' }}>
          <Checkbox checked={isSelected} onChange={() => toggleRow(t.id)} label={`Select ${t.vendor}`} />
        </div>
        <div className="flex items-center" style={{ ...colBorder(1), height: '100%', paddingLeft: '0.75rem', fontSize: '0.78rem', color: LF.grey[600] }}>
          {fmtDate(t.date)}
        </div>
        <div
          className="flex items-center font-medium overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ ...colBorder(2), height: '100%', paddingLeft: '0.75rem', fontSize: '0.8rem', color: LF.grey[900] }}
        >
          {t.vendor}
        </div>
        <div
          className="flex items-center overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ ...colBorder(3), height: '100%', paddingLeft: '0.75rem', fontSize: '0.78rem', color: LF.grey[600] }}
        >
          {t.memo || '-'}
        </div>
        <div
          className="flex items-center justify-end tabular-nums"
          style={{ ...colBorder(4), height: '100%', fontSize: '0.8rem', color: LF.grey[800], paddingRight: '0.75rem' }}
        >
          {t.amount >= 0 ? '+' : ''}${money(t.amount)}
        </div>
        <div
          className="flex items-center"
          style={{
            ...colBorder(5),
            height: '100%',
            minWidth: 0,
            paddingLeft: '0.5rem',
            boxShadow: openAccountRowId === t.id ? `inset 0 0 0 1px ${LF.primary[900]}` : undefined,
          }}
        >
          <AccountSelect
            value={t.suggestedAccountId}
            source={t.source}
            onChange={(accountId) => correctAccount(t.id, accountId)}
            onOpenChange={(open) => setOpenAccountRowId(open ? t.id : null)}
          />
        </div>
        <div className="flex items-center justify-center" style={{ ...colBorder(6), height: '100%' }}>
          {t.confidence ? <ConfidencePill confidence={t.confidence} reasoning={t.reasoning} /> : <span style={{ color: LF.grey[600], fontSize: '0.75rem' }}>-</span>}
        </div>
        <div className="flex items-center justify-center" style={{ ...colBorder(7), height: '100%' }}>
          {t.suggestedAccountId ? <SourceBadge source={t.source} /> : <span style={{ color: LF.grey[600], fontSize: '0.75rem' }}>-</span>}
        </div>
        <div className="flex items-center justify-end" style={{ paddingRight: '0.5rem' }}>
          <button
            onClick={() => fadeThenApply([t.id], undefined, 'Posted 1 transaction')}
            aria-label={`Post ${t.vendor}`}
            title="Post"
            className="flex items-center justify-center"
            style={{ width: '1.75rem', height: '1.75rem', color: LF.primary[900], borderRadius: '999px' }}
          >
            <CircleCheck size={16} />
          </button>
        </div>
      </div>
    );
  };

  const headerRow = (
    <div style={{ display: 'grid', gridTemplateColumns: GRID_TEMPLATE, borderBottom: `1px solid ${LF.grey[100]}`, minHeight: '2rem' }}>
      <div className="flex items-center justify-center" style={colBorder(0)}>
        <Checkbox
          checked={allScopeSelected}
          indeterminate={!allScopeSelected && someScopeSelected}
          label="Select all"
          onChange={() => {
            if (allScopeSelected) {
              setSelectedIds((prev) => {
                const next = new Set(prev);
                filtered.forEach((t) => next.delete(t.id));
                return next;
              });
            } else {
              setSelectedIds((prev) => new Set([...prev, ...filtered.map((t) => t.id)]));
            }
          }}
        />
      </div>
      {['Date', 'Payee', 'Memo', 'Amount', 'GL Account', 'Conf.', 'Cat. by', ''].map((h, i) => (
        <div
          key={h || i}
          className="flex items-center font-medium"
          style={{
            ...colBorder(i + 1),
            fontSize: '0.72rem',
            color: LF.grey[600],
            justifyContent: i === 3 ? 'flex-end' : i === 5 || i === 6 ? 'center' : 'flex-start',
            paddingLeft: i === 3 || i === 5 || i === 6 ? 0 : i === 4 ? '0.5rem' : '0.75rem',
            paddingRight: i === 3 ? '0.75rem' : 0,
          }}
        >
          {h}
        </div>
      ))}
    </div>
  );

  const nothingPending = pendingTransactions.length === 0;
  const nothingFiltered = filtered.length === 0;

  return (
    <div ref={rootRef} className="flex flex-col" style={{ gap: '0.75rem', minWidth: 0, position: 'relative' }}>
      <div className="flex items-center" style={{ gap: '0.5rem' }}>
        <div data-tour="command-bar" style={{ flex: 1, minWidth: 0 }}>
          <CommandBar
            transactions={pendingTransactions}
            filters={cmdFilters}
            onAdd={(f) => setCmdFilters((prev) => [...prev.filter((x) => x.id !== f.id), f])}
            onRemove={(id) => setCmdFilters((prev) => prev.filter((f) => f.id !== id))}
            onAgentCommand={(vendorQuery, accountId, accountNameStr, rawCommand) => startAgentTask(vendorQuery, accountId, accountNameStr, rawCommand)}
          />
        </div>
        {expanded && (
          <button
            onClick={() => setTourActive(true)}
            aria-label="Show guided walkthrough"
            title="Show guided walkthrough"
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', border: `1px solid ${LF.grey[100]}`, color: LF.primary[900] }}
          >
            <HelpCircle size={16} />
          </button>
        )}
      </div>

        {cmdFilters.length > 0 && (
          <div className="flex flex-wrap items-center" style={{ gap: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', color: LF.grey[600] }}>Filtered by</span>
            {cmdFilters.map((f) => (
              <span
                key={f.id}
                className="inline-flex items-center"
                style={{ gap: '0.3rem', borderRadius: '999px', border: `1px solid ${LF.primary[900]}33`, backgroundColor: `${LF.primary[900]}12`, padding: '0.2rem 0.6rem', fontSize: '0.72rem', fontWeight: 600, color: LF.primary[900] }}
              >
                {f.label}
                <button onClick={() => setCmdFilters((prev) => prev.filter((x) => x.id !== f.id))} style={{ opacity: 0.55 }}>
                  <X size={10} />
                </button>
              </span>
            ))}
            <button onClick={() => setCmdFilters([])} style={{ fontSize: '0.72rem', color: LF.grey[600] }}>
              Clear
            </button>
          </div>
        )}

        {agentExecution && <AgentPanel execution={agentExecution} onDismiss={() => setAgentExecution(null)} onConfirmApply={handleAgentConfirm} />}

        {!someSelected && aiSuggestion && (
          <div
            className="flex items-center"
            style={{ gap: '0.6rem', borderRadius: '0.75rem', border: `1px solid ${LF.primary[900]}33`, backgroundColor: `${LF.primary[900]}0C`, padding: '0.55rem 0.9rem' }}
          >
            <Blend size={14} style={{ color: LF.primary[900], flexShrink: 0 }} />
            <span className="flex-1" style={{ fontSize: '0.78rem', color: LF.grey[800] }}>
              You categorized <strong>{aiSuggestion.count}</strong> {aiSuggestion.vendor} → <strong>{aiSuggestion.accountName}</strong>. Create a rule?
            </span>
            <button
              onClick={() => {
                setDismissedVendors((prev) => new Set([...prev, aiSuggestion.vendor]));
                flash(`Rule created for ${aiSuggestion.vendor}`);
              }}
              style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: LF.primary[900], color: LF.primary[50], padding: '0.3rem 0.65rem', borderRadius: '0.5rem' }}
            >
              Create rule
            </button>
            <button onClick={() => setDismissedVendors((prev) => new Set([...prev, aiSuggestion.vendor]))} style={{ fontSize: '0.75rem', color: LF.grey[600] }}>
              Skip
            </button>
          </div>
        )}

        {/* Toolbar: filter pills <-> bulk action bar */}
        <div data-tour="toolbar" className="flex items-center flex-wrap" style={{ gap: '0.5rem' }}>
          {!someSelected ? (
            <>
              <PillButton active={activePill === null} onClick={() => { setActivePill(null); setGroupBy('none'); }} count={cmdFiltered.length}>
                All
              </PillButton>
              <PillButton
                active={activePill === 'rules'}
                disabled={ruleCount === 0}
                accent={LF.secondary.green900}
                onClick={() => { const next = activePill === 'rules' ? null : 'rules'; setActivePill(next); if (next === 'rules') setGroupBy('rule'); }}
                count={ruleCount}
                Icon={Zap}
              >
                Rule matches
              </PillButton>
              <PillButton
                active={activePill === 'ai'}
                disabled={aiCount === 0}
                accent={LF.primary[900]}
                onClick={() => { const next = activePill === 'ai' ? null : 'ai'; setActivePill(next); if (next === 'ai') setGroupBy('confidence'); }}
                count={aiCount}
                Icon={Blend}
              >
                Flow suggestions
              </PillButton>
              <PillButton
                active={activePill === 'needs-review'}
                disabled={needsReviewCount === 0}
                accent={LF.tertiary.peach900}
                onClick={() => { const next = activePill === 'needs-review' ? null : 'needs-review'; setActivePill(next); if (next === 'needs-review') setGroupBy('payee'); }}
                count={needsReviewCount}
                Icon={CircleAlert}
              >
                Needs review
              </PillButton>
              <div className="ml-auto flex items-center" style={{ gap: '0.6rem' }}>
                <span style={{ fontSize: '0.72rem', color: LF.grey[600] }}>Group by</span>
                <CustomSelect
                  value={groupBy}
                  onChange={(v) => setGroupBy(v as GroupBy)}
                  minWidth="9rem"
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'payee', label: 'Payee' },
                    { value: 'gl', label: 'GL Account' },
                    { value: 'confidence', label: 'Confidence' },
                    { value: 'rule', label: 'Rule' },
                  ]}
                />
                {canUndo && <UndoButton onClick={handleUndo} />}
              </div>
            </>
          ) : (
            <>
              <span className="font-semibold" style={{ fontSize: '0.82rem', color: LF.grey[900] }}>
                {selectedIds.size} selected
              </span>
              <CustomSelect
                value=""
                placeholder="Categorize…"
                color={LF.grey[600]}
                minWidth="11rem"
                onChange={(v) => {
                  if (v) bulkCorrect([...selectedIds], v);
                }}
                options={GL_ACCOUNTS.map((a) => ({ value: a.id, label: `${a.code} - ${a.name}` }))}
              />
              <button
                onClick={() => fadeThenApply([...selectedIds], undefined, `Posted ${selectedIds.size} transaction${selectedIds.size !== 1 ? 's' : ''}`)}
                style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: LF.primary[900], color: LF.primary[50], padding: '0.35rem 0.75rem', borderRadius: '0.5rem' }}
              >
                Post
              </button>
              <button onClick={() => setSelectedIds(new Set())} style={{ fontSize: '0.75rem', color: LF.grey[600] }}>
                Clear
              </button>
              <div className="ml-auto">{canUndo && <UndoButton onClick={handleUndo} />}</div>
            </>
          )}
        </div>

        {/* Grid */}
        <div data-tour="grid">
        {nothingPending || nothingFiltered ? (
          <div className="flex items-center justify-center" style={{ borderRadius: '0.75rem', border: `1px solid ${LF.grey[100]}`, padding: '3rem 1rem' }}>
            {nothingPending ? (
              <div className="flex flex-col items-center" style={{ gap: '0.4rem' }}>
                <Check size={26} style={{ color: LF.secondary.green900 }} />
                <p className="font-medium" style={{ fontSize: '0.85rem', color: LF.grey[800] }}>All caught up!</p>
                <p style={{ fontSize: '0.75rem', color: LF.grey[600] }}>No transactions awaiting review.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center" style={{ gap: '0.4rem' }}>
                <X size={26} style={{ color: LF.grey[300] }} />
                <p className="font-medium" style={{ fontSize: '0.85rem', color: LF.grey[800] }}>No matching transactions</p>
                <p style={{ fontSize: '0.75rem', color: LF.grey[600] }}>Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        ) : groupBy === 'none' ? (
          <div style={{ borderRadius: '0.75rem', border: `1px solid ${LF.grey[100]}`, overflow: 'hidden', padding: '0.25rem' }}>
            {headerRow}
            <div>{filtered.map((t, i) => renderRow(t, i === filtered.length - 1))}</div>
          </div>
        ) : (
          <div className="flex flex-col" style={{ gap: '0.9rem' }}>
            {groups.map((group) => {
              const isCollapsed = collapsedGroups.has(group.key);
              return (
                <div key={group.key}>
                  <GroupHeader
                    group={group}
                    isExpanded={!isCollapsed}
                    onToggle={() => toggleGroup(group.key)}
                    onCategorizeAll={(accountId) => bulkCorrect(group.transactions.filter((t) => !t.suggestedAccountId).map((t) => t.id), accountId)}
                    onApproveAll={() => fadeThenApply(group.transactions.map((t) => t.id), undefined, `Posted ${group.transactions.length} transaction${group.transactions.length !== 1 ? 's' : ''}`)}
                  />
                  {!isCollapsed && (
                    <div style={{ border: `1px solid ${LF.grey[100]}`, borderTop: 'none', borderRadius: '0 0 0.6rem 0.6rem', padding: '0.25rem' }}>
                      {headerRow}
                      <div>{group.transactions.map((t, i) => renderRow(t, i === group.transactions.length - 1))}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        </div>

      {toast && (
        <div
          className="fixed left-1/2 z-[200] -translate-x-1/2"
          style={{ top: '1.25rem', borderRadius: '0.75rem', backgroundColor: LF.grey[900], color: LF.grey[0], padding: '0.55rem 1rem', fontSize: '0.8rem', boxShadow: '0 12px 32px rgba(0,0,0,0.25)' }}
        >
          {toast}
        </div>
      )}

      {tourActive && expanded && <GuidedTour steps={TOUR_STEPS} onDone={() => setTourActive(false)} />}
    </div>
  );
}

function PillButton({
  children,
  active,
  disabled,
  onClick,
  count,
  accent,
  Icon,
}: {
  children: React.ReactNode;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  count: number;
  accent?: string;
  Icon?: LucideIcon;
}) {
  const color = active ? '#fff' : disabled ? LF.grey[300] : LF.grey[800];
  const bg = active ? (accent ?? LF.grey[900]) : LF.grey[0];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center transition-all"
      style={{
        gap: '0.35rem',
        borderRadius: '999px',
        border: `1px solid ${active ? bg : LF.grey[100]}`,
        backgroundColor: bg,
        padding: '0.35rem 0.75rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        color,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {Icon && <Icon size={11} />}
      {children}
      <span style={{ opacity: active ? 0.75 : 0.55 }}>{count}</span>
    </button>
  );
}

function UndoButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center" style={{ gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600, color: LF.grey[600], padding: '0.3rem 0.5rem' }}>
      <Undo2 size={13} />
      Undo
    </button>
  );
}
