'use client';

import { Blend, Check, Zap } from 'lucide-react';
import { LF } from '../theme';
import type { CategorizationSource } from './types';

/**
 * "Cat. by" column badge - green Rule / blue Flow / muted Manual, matching
 * the real SourceBadge + inline "Manual" span in components.tsx / draft-tab.tsx.
 */

export default function SourceBadge({ source }: { source: CategorizationSource }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    borderRadius: '0.4rem',
    padding: '0.3rem 0.5rem',
    fontSize: '0.7rem',
    fontWeight: 400,
  };

  if (source === 'rule') {
    return (
      <span style={{ ...base, background: LF.secondary.green50, color: LF.secondary.green900 }}>
        <Zap size={10} />
        Rule
      </span>
    );
  }
  if (source === 'llm') {
    return (
      <span style={{ ...base, background: LF.primary[50], color: LF.primary[900] }}>
        <Blend size={10} />
        Flow
      </span>
    );
  }
  return (
    <span style={{ ...base, background: LF.grey[50], color: LF.grey[600] }}>
      <Check size={10} />
      Manual
    </span>
  );
}
