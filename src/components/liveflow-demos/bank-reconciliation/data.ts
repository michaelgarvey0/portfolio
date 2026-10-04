import type { BankStatementLine, ReconciliationPeriod, ReconTransaction } from './types';

export const ACCOUNT = {
  name: 'Exec. Credit Card *4804',
  glAccount: '2150 · Barclay Card Payable',
  entity: 'Liveflow UK, LTD.',
};

export const PERIODS: ReconciliationPeriod[] = [
  {
    id: 'mar15-apr14',
    label: 'Mar 15 - Apr 14',
    startDate: '2026-03-15',
    endDate: '2026-04-14',
    status: 'reconciled',
    opening: 9420.0,
    closing: 12580.0,
    exceptionDates: [],
    noActivityDates: ['2026-03-22', '2026-04-05'],
    summary: {
      openingBalance: { bank: 9420, flow: 9420, deferred: 0 },
      moneyIn: { bank: 15600, flow: 15600, deferred: 0 },
      moneyOut: { bank: 12440, flow: 12440, deferred: 0 },
    },
  },
  {
    id: 'apr15-may14',
    label: 'Apr 15 - May 14',
    startDate: '2026-04-15',
    endDate: '2026-05-14',
    status: 'reconciled',
    opening: 12580.0,
    closing: 587864.75,
    exceptionDates: [],
    noActivityDates: ['2026-04-20', '2026-05-01'],
    summary: {
      openingBalance: { bank: 12580, flow: 12580, deferred: 0 },
      moneyIn: { bank: 587864.75, flow: 587864.75, deferred: 0 },
      moneyOut: { bank: 12580, flow: 12580, deferred: 0 },
    },
  },
  {
    id: 'may15-jun14',
    label: 'May 15 - Jun 14',
    startDate: '2026-05-15',
    endDate: '2026-06-14',
    status: 'needs-attention',
    opening: 12580.0,
    closing: 587864.75,
    exceptionDates: ['2026-05-15', '2026-05-19', '2026-05-28', '2026-06-02'],
    noActivityDates: ['2026-05-17', '2026-05-29', '2026-06-03', '2026-06-07'],
    summary: {
      openingBalance: { bank: 12580, flow: 11580, deferred: 1000 },
      moneyIn: { bank: 18240, flow: 18160, deferred: 80 },
      moneyOut: { bank: 21540, flow: 21240, deferred: 120 },
    },
  },
  {
    id: 'jul15-aug14',
    label: 'Jul 15 - Aug 14',
    startDate: '2026-07-15',
    endDate: '2026-08-14',
    status: 'locked',
    opening: 587864.75,
    closing: 587864.75,
    exceptionDates: [],
    noActivityDates: [],
    summary: {
      openingBalance: { bank: 0, flow: 0, deferred: 0 },
      moneyIn: { bank: 0, flow: 0, deferred: 0 },
      moneyOut: { bank: 0, flow: 0, deferred: 0 },
    },
  },
];

export const TRANSACTIONS: ReconTransaction[] = [
  { id: 't1', date: '2026-05-15', vendor: 'WeWork', vendorInitials: 'WW', vendorColor: '#164F64', memo: 'Office rent - May', amount: -1200.0, source: 'quickbooks', matchStatus: 'in-flow-only' },
  { id: 't2', date: '2026-05-15', vendor: 'Uber for Business', vendorInitials: 'U', vendorColor: '#201F1D', memo: 'Ground transport', amount: -84.5, source: 'flow', matchStatus: 'in-flow-only' },
  { id: 't3', date: '2026-05-15', vendor: 'Stripe Payout', vendorInitials: 'S', vendorColor: '#4D1D95', memo: 'Payout received', amount: 2450.0, source: 'quickbooks', matchStatus: 'in-flow-only' },
  { id: 't4', date: '2026-05-17', vendor: 'Google Workspace', vendorInitials: 'G', vendorColor: '#2E54AD', memo: 'Monthly subscription', amount: -18.0, source: 'flow', matchStatus: 'matched' },
  { id: 't5', date: '2026-05-18', vendor: 'Gusto Payroll', vendorInitials: 'GP', vendorColor: '#B93809', memo: 'Payroll - May 17', amount: -9876.54, source: 'quickbooks', matchStatus: 'matched' },
  { id: 't6', date: '2026-05-19', vendor: 'Amazon Web Services', vendorInitials: 'AWS', vendorColor: '#67AE04', memo: 'Cloud hosting', amount: -412.3, source: 'flow', matchStatus: 'in-flow-only' },
  { id: 't7', date: '2026-05-19', vendor: 'Office Depot', vendorInitials: 'OD', vendorColor: '#14715B', memo: 'Supplies', amount: -96.2, source: 'quickbooks', matchStatus: 'in-flow-only' },
  { id: 't8', date: '2026-05-19', vendor: 'Delta Air Lines', vendorInitials: 'DL', vendorColor: '#BA0343', memo: 'Flight - conference', amount: -318.0, source: 'flow', matchStatus: 'in-flow-only' },
];

export const STATEMENT = {
  bankName: 'Union Peak Bank',
  address: '88 Meridian Ave, Austin, TX 78701',
  accountHolder: 'Liveflow UK, LTD.',
  accountNumber: '4041 5566 7788 4804',
  statementDate: '6/14/2026',
  periodCovered: '5/15/2026 - 6/14/2026',
  balanceStart: 12580.0,
  totalIn: 18240.0,
  totalOut: 21540.0,
  lines: [
    { id: 't1', date: '05/15', description: 'WEWORK OFFICE RENT', withdrawal: 1200.0, balance: 11380.0 },
    { id: 't2', date: '05/15', description: 'UBER TRIP 4471', withdrawal: 84.5, balance: 11295.5 },
    { id: 't3', date: '05/15', description: 'STRIPE PAYOUT', deposit: 2450.0, balance: 13745.5 },
    { id: 't4', date: '05/17', description: 'GOOGLE WORKSPACE', withdrawal: 18.0, balance: 13727.5 },
    { id: 't5', date: '05/18', description: 'GUSTO PAYROLL', withdrawal: 9876.54, balance: 3850.96 },
    { id: 't6', date: '05/19', description: 'AWS CLOUD SVC', withdrawal: 412.3, balance: 3438.66 },
  ] as BankStatementLine[],
};
