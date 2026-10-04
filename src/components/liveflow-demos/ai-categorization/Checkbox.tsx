'use client';

import { Check, Minus } from 'lucide-react';
import { LF } from '../theme';

/**
 * Real product checkboxes are custom (4px radius per LAYOUT-07, filled
 * primary-900 when checked) - a bare `<input type="checkbox">` renders the
 * OS default and looks out of place next to everything else here being
 * hand-styled.
 */
export default function Checkbox({
  checked,
  indeterminate,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) {
  const active = checked || indeterminate;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={label}
      onClick={onChange}
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: '0.95rem',
        height: '0.95rem',
        borderRadius: '4px',
        border: `1px solid ${active ? LF.primary[900] : LF.grey[300]}`,
        backgroundColor: active ? LF.primary[900] : LF.grey[0],
      }}
    >
      {indeterminate ? (
        <Minus size={11} color={LF.grey[0]} strokeWidth={3} />
      ) : checked ? (
        <Check size={11} color={LF.grey[0]} strokeWidth={3} />
      ) : null}
    </button>
  );
}
