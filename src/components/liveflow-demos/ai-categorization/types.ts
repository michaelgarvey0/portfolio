/**
 * Simplified port of the real ai-categorization prototype's types.ts
 * (accounting/webapp/.../prototypes/ai-categorization/types.ts).
 *
 * Trimmed to what the Draft-tab core loop actually needs - no Posted/Rules/
 * Dashboard tab types, no rule-object modeling beyond the display name used
 * for the group-header tooltip.
 */

export type CategorizationSource = 'llm' | 'rule' | 'manual';

export type TransactionStatus = 'pending' | 'posted';

export interface GLAccount {
  id: string;
  code: string;
  name: string;
}

export interface Transaction {
  id: string;
  date: string; // ISO yyyy-mm-dd
  amount: number; // negative = money out, positive = money in
  memo: string;
  vendor: string;
  suggestedAccountId: string;
  reasoning: string;
  source: CategorizationSource;
  ruleId?: string;
  ruleName?: string;
  confidence: number; // 0 = no classification
  status: TransactionStatus;
  correctedAccountId?: string;
}

export interface NamedRule {
  id: string;
  name: string;
  condition: string;
  accountId: string;
}

export type GroupBy = 'none' | 'payee' | 'gl' | 'confidence' | 'rule';

export type FilterPill = 'rules' | 'ai' | 'needs-review' | null;
