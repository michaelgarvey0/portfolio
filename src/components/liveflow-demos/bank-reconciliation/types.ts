export type PeriodStatus = 'reconciled' | 'needs-attention' | 'locked';

export interface ReconciliationPeriod {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  status: PeriodStatus;
  opening: number;
  closing: number;
  /** ISO dates within this period flagged with a variance. */
  exceptionDates: string[];
  /** ISO dates within this period with no bank activity - shown grey, distinct from a flagged exception. */
  noActivityDates: string[];
  summary: {
    openingBalance: { bank: number; flow: number; deferred: number };
    moneyIn: { bank: number; flow: number; deferred: number };
    moneyOut: { bank: number; flow: number; deferred: number };
  };
}

export type MatchStatus = 'in-flow-only' | 'in-bank-only' | 'matched';

export interface ReconTransaction {
  id: string;
  date: string;
  vendor: string;
  vendorInitials: string;
  vendorColor: string;
  memo: string;
  amount: number;
  source: 'quickbooks' | 'flow';
  matchStatus: MatchStatus;
}

export interface BankStatementLine {
  /** Matches the id of the corresponding ReconTransaction, when one exists. */
  id?: string;
  date: string;
  description: string;
  withdrawal?: number;
  deposit?: number;
  balance: number;
}
