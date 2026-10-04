'use client';

import AiCategorizationDemo from './ai-categorization/AiCategorizationDemo';
import BankReconciliationDemo from './bank-reconciliation/BankReconciliationDemo';
import PrototypeStage, { type PrototypeStep } from './PrototypeStage';

/**
 * Registry of interactive prototypes, keyed by the `src` of a WorkItem's
 * `demo` media entry. Every page renders demos through <Demo demoKey="..." />,
 * so the frame, the walkthrough, and the disclaimer stay identical everywhere
 * and adding a prototype is one entry here.
 */

interface DemoDefinition {
  title: string;
  summary: React.ReactNode;
  steps: PrototypeStep[];
  rationale?: React.ReactNode;
  disclaimer: string;
  fullBleed?: boolean;
  render: () => React.ReactNode;
}

export const DEMOS: Record<string, DemoDefinition> = {
  'command-bar': {
    title: 'AI transaction categorization',
    summary: (
      <>
        Describe what to categorize, preview the exact scope, apply as{' '}
        <strong>one reversible batch</strong>.
      </>
    ),
    steps: [
      {
        label: 'New here?',
        detail: 'Hit the ? next to the command bar for a 3-step walkthrough.',
      },
    ],
    rationale: (
      <>
        The failure mode is never speed - it&apos;s{' '}
        <strong>silent miscategorization nobody notices</strong>. So every
        change previews before it commits, and undo reverts a whole batch at
        once.
      </>
    ),
    disclaimer:
      'Interaction-fidelity port of the real feature, running locally against fixture data - no live model, no backend.',
    render: () => <AiCategorizationDemo />,
  },
  'bank-reconciliation': {
    title: 'Bank reconciliation',
    summary: (
      <>
        A monthly calendar of periods to reconcile, then a side-by-side of{' '}
        <strong>what the books say vs. what the bank says</strong>.
      </>
    ),
    steps: [
      {
        label: 'New here?',
        detail: 'Click "Reconcile" on the highlighted period to drill into an account.',
      },
    ],
    rationale: (
      <>
        Reconciliation only matters because books and banks{' '}
        <strong>drift apart silently</strong> - a missed fee, a delayed
        deposit, a duplicate entry. The variance column exists to make that
        drift impossible to miss.
      </>
    ),
    disclaimer:
      'Interaction-fidelity port of the real feature, running locally against fixture data - no live bank connection.',
    fullBleed: true,
    render: () => <BankReconciliationDemo />,
  },
};

export function Demo({ demoKey }: { demoKey: string }) {
  const demo = DEMOS[demoKey];
  if (!demo) return null;

  return (
    <PrototypeStage
      title={demo.title}
      summary={demo.summary}
      steps={demo.steps}
      rationale={demo.rationale}
      disclaimer={demo.disclaimer}
      fullBleed={demo.fullBleed}
    >
      {demo.render()}
    </PrototypeStage>
  );
}
