import type { GLAccount, NamedRule, Transaction } from './types';

/**
 * Fixture data for the AI-categorization demo, in the shape and spirit of
 * the real accounting/.../ai-categorization/data.ts - a subset of the same
 * GL accounts, the same rule-condition pattern, and vendor/confidence
 * variety chosen specifically to make grouping, rule-matches, AI
 * suggestions at every confidence band, a manual correction, and the
 * "create a rule?" nudge all demonstrable from ~15 rows instead of ~150.
 */

export const GL_ACCOUNTS: GLAccount[] = [
  { id: 'gl-1', code: '6010', name: 'Servers & Hosting' },
  { id: 'gl-2', code: '6020', name: 'Software Subscriptions' },
  { id: 'gl-3', code: '6030', name: 'Office Supplies' },
  { id: 'gl-4', code: '6040', name: 'Travel & Entertainment' },
  { id: 'gl-5', code: '6050', name: 'Professional Services' },
  { id: 'gl-6', code: '6060', name: 'Marketing & Advertising' },
  { id: 'gl-11', code: '6110', name: 'Legal Fees' },
  { id: 'gl-12', code: '6120', name: 'R&D Expenses' },
  { id: 'gl-16', code: '5100', name: 'Support and Delivery' },
];

export const NAMED_RULES: NamedRule[] = [
  {
    id: 'rule-1',
    name: 'Cloud hosting',
    condition: 'vendor contains "AMAZON WEB SVCS"',
    accountId: 'gl-1',
  },
  {
    id: 'rule-2',
    name: 'SaaS subscriptions',
    condition: 'vendor in [SLACK, FIGMA]',
    accountId: 'gl-2',
  },
];

export const TRANSACTIONS: Transaction[] = [
  // ── Rule matches ──────────────────────────────────────────────────────
  {
    id: 'txn-1',
    date: '2026-03-14',
    amount: -4829.17,
    memo: 'AWS-INVOICE-FEB2026',
    vendor: 'AMAZON WEB SVCS',
    suggestedAccountId: 'gl-1',
    reasoning: 'Rule: Cloud hosting',
    source: 'rule',
    ruleId: 'rule-1',
    ruleName: 'Cloud hosting',
    confidence: 99,
    status: 'pending',
  },
  {
    id: 'txn-2',
    date: '2026-03-13',
    amount: -3200.0,
    memo: 'AWS-DATATXFR-FEB2026',
    vendor: 'AMAZON WEB SVCS',
    suggestedAccountId: 'gl-1',
    reasoning: 'Rule: Cloud hosting',
    source: 'rule',
    ruleId: 'rule-1',
    ruleName: 'Cloud hosting',
    confidence: 99,
    status: 'pending',
  },
  {
    id: 'txn-3',
    date: '2026-03-12',
    amount: -299.0,
    memo: 'SUBSCRIPTION',
    vendor: 'SLACK TECHNOLOGIES',
    suggestedAccountId: 'gl-2',
    reasoning: 'Rule: SaaS subscriptions',
    source: 'rule',
    ruleId: 'rule-2',
    ruleName: 'SaaS subscriptions',
    confidence: 99,
    status: 'pending',
  },
  {
    id: 'txn-4',
    date: '2026-03-11',
    amount: -89.99,
    memo: 'FIGMA-SUB-0326',
    vendor: 'FIGMA INC',
    suggestedAccountId: 'gl-2',
    reasoning: 'Rule: SaaS subscriptions',
    source: 'rule',
    ruleId: 'rule-2',
    ruleName: 'SaaS subscriptions',
    confidence: 99,
    status: 'pending',
  },

  // ── AI suggestions - high confidence (>= 90) ────────────────────────────
  {
    id: 'txn-5',
    date: '2026-03-14',
    amount: -2574.0,
    memo: 'Customer support tooling and service delivery',
    vendor: 'HelpScout',
    suggestedAccountId: 'gl-16',
    reasoning: 'Similar to past HelpScout transactions categorized as Support and Delivery.',
    source: 'llm',
    confidence: 97,
    status: 'pending',
  },
  {
    id: 'txn-6',
    date: '2026-03-14',
    amount: -15000.0,
    memo: 'INV-MCK-2026-0234',
    vendor: 'MCKINSEY & CO',
    suggestedAccountId: 'gl-5',
    reasoning: 'McKinsey is a management consulting firm. Monthly strategy retainer.',
    source: 'llm',
    confidence: 99,
    status: 'pending',
  },
  {
    id: 'txn-7',
    date: '2026-03-13',
    amount: -2200.0,
    memo: 'GOOGLE ADS CPC MAR',
    vendor: 'GOOGLE ADS',
    suggestedAccountId: 'gl-6',
    reasoning: 'Google Ads cost-per-click advertising spend.',
    source: 'llm',
    confidence: 96,
    status: 'pending',
  },
  {
    id: 'txn-8',
    date: '2026-03-12',
    amount: -782.5,
    memo: 'TICKET 7743829 SFO-JFK',
    vendor: 'DELTA AIR LINES',
    suggestedAccountId: 'gl-4',
    reasoning: 'Delta flight - business travel.',
    source: 'llm',
    confidence: 94,
    status: 'pending',
  },

  // ── AI suggestions - medium confidence (70-89) ──────────────────────────
  {
    id: 'txn-9',
    date: '2026-03-11',
    amount: -1150.0,
    memo: 'API USAGE 022026',
    vendor: 'ANTHROPIC INC',
    suggestedAccountId: 'gl-12',
    reasoning:
      'Anthropic AI API usage. Could be R&D or Software - categorized as R&D since used for product development.',
    source: 'llm',
    confidence: 79,
    status: 'pending',
  },
  {
    id: 'txn-10',
    date: '2026-03-10',
    amount: -450.0,
    memo: 'INFRA MON 022026',
    vendor: 'DATADOG INC',
    suggestedAccountId: 'gl-1',
    reasoning:
      'Datadog infrastructure monitoring. Could be SaaS or Hosting - categorized as hosting since it monitors infra.',
    source: 'llm',
    confidence: 74,
    status: 'pending',
  },

  // ── AI suggestion - low confidence (< 70) ───────────────────────────────
  {
    id: 'txn-11',
    date: '2026-03-09',
    amount: -3200.0,
    memo: 'RETAINER FEB',
    vendor: 'JONES DAY',
    suggestedAccountId: 'gl-11',
    reasoning:
      'Jones Day is a law firm. Monthly retainer - but could be litigation hold or IP work. Uncertain classification.',
    source: 'llm',
    confidence: 62,
    status: 'pending',
  },

  // ── Needs review - no classification ────────────────────────────────────
  {
    id: 'txn-12',
    date: '2026-03-08',
    amount: -1250.0,
    memo: 'WIRE TRANSFER REF 8834',
    vendor: 'UNKNOWN MERCHANT',
    suggestedAccountId: '',
    reasoning: '',
    source: 'llm',
    confidence: 0,
    status: 'pending',
  },
  {
    id: 'txn-13',
    date: '2026-03-07',
    amount: 15000.0,
    memo: 'INV-2026-0089 PAYMENT',
    vendor: 'ACME CORP',
    suggestedAccountId: '',
    reasoning: '',
    source: 'llm',
    confidence: 0,
    status: 'pending',
  },

  // ── Same vendor, inconsistent suggestions - the rule-nudge setup ───────
  // Manually correcting both of these to the same account is what trips the
  // "create a rule?" nudge below.
  {
    id: 'txn-14',
    date: '2026-03-06',
    amount: -157.32,
    memo: '114-2938475 SUPPLIES',
    vendor: 'AMAZON.COM',
    suggestedAccountId: 'gl-3',
    reasoning: 'Amazon.com retail purchase - office supplies order.',
    source: 'llm',
    confidence: 85,
    status: 'pending',
  },
  {
    id: 'txn-15',
    date: '2026-03-05',
    amount: -234.5,
    memo: 'GIFT CARDS + SUPPLIES',
    vendor: 'AMAZON.COM',
    suggestedAccountId: 'gl-6',
    reasoning: 'Amazon.com retail purchase - mixed order, defaulted to marketing spend.',
    source: 'llm',
    confidence: 58,
    status: 'pending',
  },
];

export function accountName(accountId: string | null | undefined): string | null {
  if (!accountId) return null;
  return GL_ACCOUNTS.find((a) => a.id === accountId)?.name ?? null;
}
