/**
 * Slide-length copy, separate from the long-form prose in content/liveflow.tsx
 * (which v4 and friends still use in full). A slide is glanced at, not read -
 * so this is deliberately much shorter than the case-study paragraphs.
 * Only covers work items that have a curated v7 deck; everything else falls
 * back to the long-form fields as-is.
 */

interface SlideCopy {
  context?: React.ReactNode;
  problem: React.ReactNode;
  action: React.ReactNode;
  outcome: React.ReactNode;
}

export const SLIDE_COPY: Record<string, SlideCopy> = {
  'ai-transaction-categorization': {
    context: (
      <>
        Every transaction needs a home - accountants call it a{' '}
        <strong>GL account</strong>. Group enough of those together and you
        get the two reports a business runs on: the{' '}
        <strong>P&amp;L</strong> and the <strong>balance sheet</strong>.
      </>
    ),
    problem: (
      <>
        Categorizing transactions is the most repetitive part of closing the
        books - thousands of picks a month. The real risk isn&apos;t
        speed, though: it&apos;s{' '}
        <strong>a wrong pick buried in the pile</strong> that nobody notices
        until the numbers are already wrong.
      </>
    ),
    action: (
      <>
        Built around intent, not rows: describe what you want,{' '}
        <strong>preview the exact scope</strong> before anything changes,
        then apply it as one batch you can undo in a single move.
      </>
    ),
    outcome: (
      <>
        [CONFIRM] Shipped as part of the categorization flow - real reception
        and results still need to go here.
      </>
    ),
  },
  'bank-reconciliation': {
    context: (
      <>
        Reconciliation is just checking two records against each other:{' '}
        <strong>what the bank says</strong> happened, against{' '}
        <strong>what your books say</strong> happened. When they agree, the
        period closes clean.
      </>
    ),
    problem: (
      <>
        A missed fee, a delayed deposit, a duplicate entry - books and banks
        drift apart quietly. The real risk isn&apos;t the gap itself,{' '}
        it&apos;s that <strong>an unresolved period blocks every period after it</strong>,
        since each month&apos;s opening balance depends on the last one closing clean.
      </>
    ),
    action: (
      <>
        A calendar keeps periods closing in order. A Bank/Flow/Deferred
        breakdown flags exactly which line drifted, and{' '}
        <strong>the transaction list cross-references the real statement</strong>{' '}
        so you see precisely what&apos;s unresolved - not just that a total is off.
      </>
    ),
    outcome: (
      <>
        [CONFIRM] Shipped as part of the reconciliation flow - real reception
        and results still need to go here.
      </>
    ),
  },
};
