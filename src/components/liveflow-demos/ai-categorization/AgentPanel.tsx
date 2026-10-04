'use client';

import { Blend, Check, X } from 'lucide-react';
import { LF } from '../theme';
import type { Transaction } from './types';

/**
 * Faithful port of the real AgentPanel + AgentStepRow from
 * accounting/.../ai-categorization/{draft-tab,components}.tsx.
 *
 * This staged reveal IS the design argument the case study is making:
 * submitting a command never mutates anything. It opens this panel, which
 * simulates scanning -> finding matches -> ticking them off one at a time
 * -> a terminal "Categorize & post N" button. Nothing in the ledger changes
 * until that button is pressed. The timing here is faked (setTimeout, same
 * as the real source) but the *structure* - four discrete steps, a
 * per-row checklist, a single confirm action - is copied exactly.
 */

export type AgentStepStatus = 'pending' | 'running' | 'done';

export interface AgentExecution {
  command: string;
  vendorQuery: string;
  accountId: string;
  accountName: string;
  matchedTransactions: Transaction[];
  steps: {
    scan: AgentStepStatus;
    found: AgentStepStatus;
    categorize: AgentStepStatus;
    done: AgentStepStatus;
  };
  processedIds: string[];
  status: 'running' | 'complete';
}

function StepRow({ status, label }: { status: AgentStepStatus; label: string }) {
  return (
    <div className="flex items-center" style={{ gap: '0.4rem', fontSize: '0.78rem' }}>
      {status === 'done' && <Check size={12} style={{ color: LF.secondary.green900, flexShrink: 0 }} />}
      {status === 'running' && (
        <svg
          className="animate-spin"
          style={{ width: 12, height: 12, color: LF.primary[900], flexShrink: 0 }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
      )}
      {status === 'pending' && (
        <div style={{ width: 12, height: 12, borderRadius: '999px', border: `1px solid ${LF.grey[200]}`, flexShrink: 0 }} />
      )}
      <span
        style={{
          color: status === 'pending' ? LF.grey[400] : status === 'running' ? LF.grey[900] : LF.grey[600],
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AgentPanel({
  execution,
  onDismiss,
  onConfirmApply,
}: {
  execution: AgentExecution;
  onDismiss: () => void;
  onConfirmApply: () => void;
}) {
  const n = execution.matchedTransactions.length;

  return (
    <div
      style={{
        borderRadius: '0.75rem',
        border: `1px solid ${LF.primary[900]}33`,
        background: `${LF.primary[900]}0C`,
        padding: '0.75rem 1rem',
      }}
    >
      <div className="flex items-center" style={{ gap: '0.45rem', marginBottom: '0.6rem' }}>
        <Blend
          size={14}
          className={execution.status === 'running' ? 'animate-pulse' : undefined}
          style={{ color: LF.primary[900], flexShrink: 0 }}
        />
        <span className="font-semibold" style={{ fontSize: '0.75rem', color: LF.grey[900] }}>
          Flow Agent
        </span>
        <span
          className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontSize: '0.75rem', color: LF.grey[500] }}
        >
          &ldquo;{execution.command}&rdquo;
        </span>
        {execution.status === 'complete' && n === 0 && (
          <button onClick={onDismiss} aria-label="Dismiss" style={{ color: LF.grey[400] }}>
            <X size={13} />
          </button>
        )}
      </div>

      <div className="flex flex-col" style={{ gap: '0.35rem' }}>
        <StepRow status={execution.steps.scan} label="Scanning transactions…" />

        {execution.steps.found !== 'pending' && (
          <StepRow
            status={execution.steps.found}
            label={
              n === 0
                ? `No transactions matching "${execution.vendorQuery}"`
                : `Found ${n} transaction${n !== 1 ? 's' : ''} matching "${execution.vendorQuery}"`
            }
          />
        )}

        {execution.steps.categorize !== 'pending' && n > 0 && (
          <div className="flex flex-col" style={{ gap: '0.25rem' }}>
            <StepRow status={execution.steps.categorize} label={`Will categorize as: ${execution.accountName}`} />
            <div className="flex flex-col" style={{ gap: '0.15rem', marginTop: '0.1rem', marginLeft: '1.15rem' }}>
              {execution.matchedTransactions.map((t) => {
                const done = execution.processedIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    className="flex items-center transition-colors duration-200"
                    style={{ gap: '0.35rem', fontSize: '0.75rem', color: done ? LF.grey[900] : LF.grey[400] }}
                  >
                    {done ? (
                      <Check size={11} style={{ color: LF.secondary.green900, flexShrink: 0 }} />
                    ) : (
                      <div
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: '0.2rem',
                          border: `1px solid ${LF.grey[200]}`,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span className="font-medium">{t.vendor}</span>
                    <span style={{ color: LF.grey[300] }}>·</span>
                    <span className="tabular-nums">${Math.abs(t.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {execution.steps.done !== 'pending' && (
          <StepRow
            status={execution.steps.done}
            label={n === 0 ? 'Nothing to do' : `Ready - ${n} transaction${n !== 1 ? 's' : ''} queued`}
          />
        )}

        {execution.status === 'complete' && n > 0 && (
          <div className="flex items-center" style={{ gap: '0.6rem', marginTop: '0.35rem' }}>
            <button
              onClick={onConfirmApply}
              className="font-semibold"
              style={{
                fontSize: '0.75rem',
                padding: '0.35rem 0.7rem',
                borderRadius: '0.5rem',
                backgroundColor: LF.primary[900],
                color: LF.primary[50],
              }}
            >
              Categorize &amp; post {n} transaction{n !== 1 ? 's' : ''}
            </button>
            <button onClick={onDismiss} style={{ fontSize: '0.75rem', color: LF.grey[500] }}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
